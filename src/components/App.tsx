import React, {KeyboardEvent, RefObject, SyntheticEvent} from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"

import './App.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const CLASS = {
  TodoItem: 'todo-item',
  TodoItemCheck: 'todo-item-check',
  TodoItemTitle: 'todo-item-title',
}

interface Props {
}

interface State {
  entities: {
    id: number;
    title: string;
    done: boolean;
  }[]
}

class App extends React.Component<Props, State> {

  state = {
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
    ]
  }

  itemRefs:RefObject<HTMLDivElement>[] = []

  constructor(props: Props) {
    super(props);

    const {entities} = this.state;
    this.itemRefs = entities.map( _ => React.createRef<HTMLDivElement>());
  }

  componentDidMount(): void {
    for(let i = 0; i < this.state.entities.length; i++) {
      (this.itemRefs[i].current as HTMLElement).textContent = this.state.entities[i].title;
    }
  }

  getTargetItemKey(evt: SyntheticEvent) {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    if(!target) {
      return;
    }

    const todoItem = target.closest('.'+CLASS.TodoItem) as HTMLElement;

    if(!todoItem) {
      return;
    }

    return Number(todoItem.dataset.key);
  }

  handleItemKeyDown = (evt: KeyboardEvent) => {
    if(evt.key === 'Enter' || evt.key === 'Escape') {
      evt.preventDefault();
      //(evt.target as HTMLElement).blur();
    }
  }

  handleItemCheck = (evt: SyntheticEvent) => {
    const key = this.getTargetItemKey(evt);

    this.setState( state => ({
      entities: state.entities.map(ent => ent.id === key ? {...ent, done: !ent.done} : ent)
    }))
  }

  handleItemTitleInput = (evt: SyntheticEvent) => {
    const key = this.getTargetItemKey(evt);

    let inputIdx:number;

    this.setState( {
      entities: this.state.entities.map((ent, idx) => {
        if(ent.id === key) {
          inputIdx = idx;
          return {...ent, title: String( (this.itemRefs[idx].current as HTMLElement).textContent)}
        }

        return ent;
      })
    }, () => {
      (this.itemRefs[inputIdx].current as HTMLElement).textContent = this.state.entities[inputIdx].title;
    })
  }

  renderList() {
    const {entities} = this.state;

    return entities.map((ent, idx) =>
        <ListGroupItem as="li" action className={`${CLASS.TodoItem} d-flex`}
                       key={ent.id} /*eventKey={ent.id}*/ data-key={ent.id}
        >
          <div className="mr-2" onClick={this.handleItemCheck}>
            <FontAwesomeIcon
                icon={ent.done ? ['fas', 'check-circle'] : ['far', 'circle']} size="lg"
                className={CLASS.TodoItemCheck}
            />
          </div>
          <div className={CLASS.TodoItemTitle}
               contentEditable ref={this.itemRefs[idx]}
               onKeyDown={this.handleItemKeyDown} onInput={this.handleItemTitleInput} />
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
