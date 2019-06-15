import React from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"

import './App.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

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

  handleClick = (evt: Event) => {
    const key = Number((evt.target as HTMLElement).dataset.key);

    this.setState( state => ({
      entities: state.entities.map(ent => ent.id === key ? {...ent, done: !ent.done} : ent)
    }))
  }

  render() {
    const {entities} = this.state;

    return (
        <Card className="App">
          <Card.Header as="h3">
            TODO app
          </Card.Header>
          <Card.Body>
            <ListGroup as="ul">
              {entities.map(ent =>
                <ListGroupItem as="li" action
                               key={ent.id} /*eventKey={ent.id}*/ data-key={ent.id}
                               onClick={this.handleClick}
                >
                  <FontAwesomeIcon
                      icon={ ent.done ? ['fas', 'check-circle'] : ['far', 'circle']} size="lg" className="mr-2"
                  /> {ent.title}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
    );
  }
}

export default App;
