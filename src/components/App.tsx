import React, {
  FormEvent, KeyboardEvent, SyntheticEvent,
  RefObject
} from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import './App.scss'

const CLASS = {
  TodoItem: 'todo-item',
  TodoItemCheck: 'todo-item-check',
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
    editEntity: null
  }

  currentInput:HTMLInputElement|null = null

  handleClickItemTitle = (targetIndex: number, evt: SyntheticEvent<HTMLElement>) => {
    this.setState(state  => ({
      editEntity: {
        index: targetIndex,
        newContent: {
          title: state.entities[targetIndex].title
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

  setNewContent(set: boolean) {
    if(set) {
      this.setState((state: State) => {
        if(state.editEntity) {
          const {index, newContent} = state.editEntity;
          return {
            entities: state.entities.map((ent, idx) => idx === index ? {...ent, ...newContent} : ent),
            editEntity: null
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

    return entities.map((ent, idx) =>
        <ListGroupItem as="li" action className={`${CLASS.TodoItem} d-flex`}
                       key={ent.id} /*eventKey={ent.id}*/
        >
          <div className="mr-2" onClick={this.handleClickItemCheck.bind(this, idx)}>
            <FontAwesomeIcon
                icon={ent.done ? ['fas', 'check-circle'] : ['far', 'circle']} size="lg"
                className={CLASS.TodoItemCheck}
            />
          </div>
          { editEntity && editEntity.index === idx ?
            <input className={CLASS.TodoItemTitle}
                   ref={thisInput => this.currentInput = thisInput}
                   onChange={this.handleChangeItemTitle.bind(this, idx)}
                   onBlur={this.handleBlurItemTitle.bind(this, idx)}
                   value={editEntity.newContent.title}
            /> :
            <div className={CLASS.TodoItemTitle}
                 onClick={this.handleClickItemTitle.bind(this, idx)}>
              {ent.title}
            </div>
          }
        </ListGroupItem>
    )
  }

  render() {
    return (
        <Card className="App">
          <Card.Header as="h3">
            TODO app
          </Card.Header>
          <Card.Body>
            <ListGroup as="ul">
              {this.renderList()}
            </ListGroup>
          </Card.Body>
        </Card>
    );
  }
}

export default App;
