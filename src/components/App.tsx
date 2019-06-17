import React, {
  FormEvent, KeyboardEvent, SyntheticEvent,
  RefObject
} from 'react';
import {Badge, Card, Button, ListGroup, ListGroupItem} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.scss'

const CLASS = {
  TodoItem: 'todo-item',
  TodoItemTransition: 'todo-item-transition',
  TodoItemCheck: 'todo-item-check',
  TodoItemAdd: 'todo-item-add',
  TodoItemDelete: 'todo-item-delete',
  TodoItemTitle: 'todo-item-title',
}

interface Entity {
  id: number;
  title: string;
  done: boolean;
}

interface Props {
}

interface State {
  entities: Entity[],
  editEntity: null | {
    index: number,
    newContent: {
      title: string
    }
  }
  nextId: number
}

class App extends React.Component<Props, State> {

  state: State = {
    entities: [
      {
        id: 1,
        title: 'Fix car',
        done: false
      },
      {
        id: 2,
        title: 'Buy some food',
        done: true
      },
      {
        id: 3,
        title: 'Go to doctor',
        done: false
      },
      {
        id: 4,
        title: 'Clean house',
        done: false
      }
    ],
    editEntity: null,
    nextId: 5
  }

  currentInput:HTMLInputElement|null = null

  handleClickItemTitle = (targetIndex: number, evt: SyntheticEvent<HTMLElement>) => {
    this.setState(state  => ({
      editEntity: {
        index: targetIndex,
        newContent: {
          title: targetIndex >= state.entities.length ? '' : state.entities[targetIndex].title
        }
      }
    }))
  }

  handleClickItemCheck = (targetIndex: number, evt: SyntheticEvent<HTMLElement>) => {
    this.setState(state => ({
      entities: state.entities.map((ent, idx) =>
          idx === targetIndex ? {...ent, done: !ent.done} : ent
      )
    }))
  }

  handleChangeItemTitle = (targetIndex: number, evt: FormEvent<HTMLInputElement>) => {
    const {currentTarget:{value}} = evt;

    this.setState((state: State) => {
      if(state.editEntity) {
        return {
          editEntity: {
            ...state.editEntity,
            newContent: {
              ...state.editEntity.newContent,
              title: value
            }
          }
        }
      }
      return state
    })
  }

  handleBlurItemTitle = (targetIndex: number, evt: SyntheticEvent<HTMLElement>) => {
    this.setNewContent(true);
  }

  handleKeyDownItemTitle = (targetIndex: number, evt: KeyboardEvent<HTMLElement>) => {
    if(evt.key === 'Enter') {
      this.setNewContent(true);
    } else if(evt.key === 'Escape') {
      this.setNewContent(false);
    }
  }

  handleClickItemDelete = (targetIndex: number, evt: SyntheticEvent<HTMLElement>) => {
    this.setState( (state: State) => ({
      entities: [...state.entities.slice(0, targetIndex), ...state.entities.slice(targetIndex+1)],
      editEntity: null
    }))
  }

  setNewContent(set: boolean) {
    if(set) {
      this.setState((state: State) => {
        if(state.editEntity) {
          const {index, newContent} = state.editEntity;

          //nothing to set
          if(Object.values(newContent).every(v => !v)) {
            return {editEntity:null}
          }

          return {
            entities: index >=  state.entities.length ? [...state.entities, {
                  ...newContent,
                  id: state.nextId,
                  done: false
                } ] :
                state.entities.map((ent, idx) => idx === index ? {...ent, ...newContent} : ent),
            editEntity: null,
            nextId: state.nextId + 1
          }
        }
        return state
      })
    } else {
      this.setState({
        editEntity: null
      })
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if(this.currentInput) {
      this.currentInput.focus();
    }
  }

  renderList() {
    const {entities, editEntity} = this.state;

    return (
        <TransitionGroup component={null} appear={false} enter={false}>
          {entities.map((ent, idx) =>
              <CSSTransition
                  key={ent.id}
                  timeout={500}
                  classNames={CLASS.TodoItemTransition}
              >
                <ListGroupItem as="li" action
                               className={`${CLASS.TodoItem}`}
                >
                  <div className={`${CLASS.TodoItemCheck} text-primary mr-2`}
                       onClick={this.handleClickItemCheck.bind(this, idx)}>
                    <FontAwesomeIcon icon={ent.done ? ['fas', 'check-circle'] : ['far', 'circle']} size="lg"/>
                  </div>
                  {editEntity && editEntity.index === idx ?
                      <input className={CLASS.TodoItemTitle}
                             ref={thisInput => this.currentInput = thisInput}
                             onChange={this.handleChangeItemTitle.bind(this, idx)}
                             onBlur={this.handleBlurItemTitle.bind(this, idx)}
                             onKeyDown={this.handleKeyDownItemTitle.bind(this, idx)}
                             value={editEntity.newContent.title}
                      /> :
                      <div className={CLASS.TodoItemTitle + (ent.done ? ' text-black-50' : ' text-body')}
                           onClick={this.handleClickItemTitle.bind(this, idx)}>
                        {ent.title}
                      </div>
                  }
                  <div className={`${CLASS.TodoItemDelete} text-danger ml-2`}
                       onClick={this.handleClickItemDelete.bind(this, idx)}>
                    <FontAwesomeIcon icon={['fas', 'minus-circle']} size="lg"/>
                  </div>
                </ListGroupItem></CSSTransition>
          )}
        </TransitionGroup>
    )
  }

  render() {

    const {entities, editEntity} = this.state;

    return (
        <Card className="App">
          <Card.Header as="h3">
            TODO app
          </Card.Header>
          <Card.Body className='px-0'>
            <ListGroup as="ul" variant="flush">
              {this.renderList()}
              <ListGroupItem as="li" action className={`${CLASS.TodoItem} d-flex`}
                             onClick={this.handleClickItemTitle.bind(this, entities.length)}
              >
                <div className={`${CLASS.TodoItemAdd} text-success mr-2`}>
                  <FontAwesomeIcon icon={['fas', 'plus-circle']} size="lg"/>
                </div>
                {
                  editEntity && editEntity.index >= entities.length &&
                  <input className={CLASS.TodoItemTitle}
                         ref={thisInput => this.currentInput = thisInput}
                         onChange={this.handleChangeItemTitle.bind(this, editEntity.index)}
                         onBlur={this.handleBlurItemTitle.bind(this, editEntity.index)}
                         onKeyDown={this.handleKeyDownItemTitle.bind(this, editEntity.index)}
                         value={editEntity.newContent.title}
                  />
                }
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
    );
  }
}

export default App;
