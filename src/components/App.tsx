import React, {
  Component, ReactEventHandler, KeyboardEventHandler
} from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux'

import {itemAction, State, ItemUpdate, ItemData} from "../stateStorage"
import './App.scss'

const CLASS = {
  TodoItem: 'todo-item',
  TodoItemContent: 'todo-item-content',
  TodoItemTransition: 'todo-item-transition',
  TodoItemIconToggle: 'todo-item-icon-toggle',
  TodoItemIconAdd: 'todo-item-icon-add',
  TodoItemIconRemove: 'todo-item-icon-remove',
  TodoItemTitle: 'todo-item-title',
}

const ID = {
  TodoItemAdd: 'todo-item-add'
}


interface ComponentProps {
  items: State['items']

  itemAdd: typeof itemAction.add,
  itemToggle: typeof itemAction.toggle,
  itemRemove: typeof itemAction.remove,
  itemEdit: typeof itemAction.edit
}

interface ComponentState {
  addItem: ItemData | null,
  editItem: ItemUpdate | null
}


class App extends Component<ComponentProps, ComponentState> {

  state:ComponentState = {
    addItem: null,
    editItem: null
  }

  currentInput:HTMLInputElement|null = null

  handleClickItemTitle:ReactEventHandler<HTMLElement> = evt => {
    const {items} = this.props
    const itemElement = evt.currentTarget.closest('.'+CLASS.TodoItemContent)

    if(itemElement) {
      const item = items.find(it => it.id === itemElement.id);
      if(item) {
        this.setState({
          editItem: item,
          addItem: null
        })
      }
    }
  }

  handleClickItemToggle:ReactEventHandler<HTMLElement> = evt => {
    const {itemToggle} = this.props;
    const itemElement = evt.currentTarget.closest('.'+CLASS.TodoItemContent);

    if(itemElement) {
      itemToggle(itemElement);
    }
  }

  handleClickItemAdd:ReactEventHandler<HTMLElement> = evt => {
    this.setState({
      editItem: null,
      addItem: {
        title: ''
      }
    })
  }

  handleClickItemDelete:ReactEventHandler<HTMLElement> = evt => {
    const {itemRemove} = this.props;
    const itemElement = evt.currentTarget.closest('.'+CLASS.TodoItemContent);

    if(itemElement) {
      itemRemove(itemElement)
    }
  }

  handleChangeItemTitle:ReactEventHandler<HTMLInputElement> = evt => {
    const {currentTarget:{value}} = evt;

    this.setState(state => ({
      editItem: state.editItem ? {
        ...state.editItem,
        title: value
      } : null,

      addItem: state.addItem ? {
        ...state.addItem,
        title: value
      } : null
    }))
  }

  handleBlurItemTitle:ReactEventHandler<HTMLInputElement> = evt => {
    this.setNewContent(true)
  }

  handleKeyDownItemTitle:KeyboardEventHandler<HTMLInputElement> = evt => {
    if(evt.key === 'Enter') {
      this.setNewContent(true)
    } else if(evt.key === 'Escape') {
      this.setNewContent(false)
    }
  }

  setNewContent(set: boolean) {

    if(set) {
      const {itemAdd, itemEdit} = this.props;
      const {addItem, editItem} = this.state;

      if(addItem && addItem.title) {
        itemAdd(addItem)
      } else if(editItem) {
        itemEdit(editItem)
      }
    }

    this.setState({
      editItem: null,
      addItem: null
    })
  }

  componentDidUpdate(prevProps: Readonly<ComponentProps>,
                     prevState: Readonly<ComponentState>,
                     snapshot?: any): void {
    if(this.currentInput) {
      this.currentInput.focus();
    }
  }

  renderList() {

    const {items} = this.props
    const {editItem} = this.state

    return (
        <TransitionGroup component={null} appear={false} enter={false}>
          {items.map(ent  =>
              <CSSTransition
                  timeout={500}
                  classNames={CLASS.TodoItemTransition}
                  key={ent.id}
              >
                <ListGroupItem as="li" action
                               className={CLASS.TodoItem}
                >
                  <div className={CLASS.TodoItemContent} id={ent.id}>
                    <div className={`${CLASS.TodoItemIconToggle} text-primary mr-2`}
                         onClick={this.handleClickItemToggle}>
                      <FontAwesomeIcon icon={ent.done ? ['fas', 'check-circle'] : ['far', 'circle']} size="lg"/>
                    </div>
                    {editItem && editItem.id === ent.id ?
                        <input className={CLASS.TodoItemTitle}
                               ref={thisInput => this.currentInput = thisInput}
                               onChange={this.handleChangeItemTitle}
                               onBlur={this.handleBlurItemTitle}
                               onKeyDown={this.handleKeyDownItemTitle}
                               value={editItem.title}
                        /> :
                        <div className={CLASS.TodoItemTitle + (ent.done ? ' text-black-50' : ' text-body')}
                             onClick={this.handleClickItemTitle}>
                          {ent.title}
                        </div>
                    }
                    <div className={`${CLASS.TodoItemIconRemove} text-danger ml-2`}
                         onClick={this.handleClickItemDelete}>
                      <FontAwesomeIcon icon={['fas', 'minus-circle']} size="lg"/>
                    </div>
                  </div>
                </ListGroupItem></CSSTransition>
          )}
        </TransitionGroup>
    )
  }

  render() {

    const {addItem} = this.state

    return (
        <Card className="App">
          <Card.Header as="h3">
            TODO app
          </Card.Header>
          <Card.Body className='px-0'>
            <ListGroup as="ul" variant="flush">
              {this.renderList()}
              <ListGroupItem as="li" action className={CLASS.TodoItem}
                             onClick={this.handleClickItemAdd}
              >
                <div className={CLASS.TodoItemContent} id={ID.TodoItemAdd}>
                  <div className={`${CLASS.TodoItemIconAdd} text-success mr-2`}>
                    <FontAwesomeIcon icon={['fas', 'plus-circle']} size="lg"/>
                  </div>
                  {
                    addItem &&
                    <input className={CLASS.TodoItemTitle}
                           ref={thisInput => this.currentInput = thisInput}
                           onChange={this.handleChangeItemTitle}
                           onBlur={this.handleBlurItemTitle}
                           onKeyDown={this.handleKeyDownItemTitle}
                           value={addItem.title}
                    />
                  }
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
    );
  }
}

export default connect(
    ({items}:State) => ({
      items
    }), {
      itemAdd: itemAction.add,
      itemToggle: itemAction.toggle,
      itemRemove: itemAction.remove,
      itemEdit: itemAction.edit
    }
)(App)
