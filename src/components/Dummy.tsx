import React, {
  Component
} from 'react';
import {Badge, Card, Button, ListGroup, ListGroupItem} from "react-bootstrap"


export default function Dummy() {
  return (
      <div>
        <ListGroup id="my-items">
          <ListGroupItem id="item1">
            Hello world
          </ListGroupItem>
          <ListGroupItem id="item2">
            Hello world
          </ListGroupItem>
          <ListGroupItem id="item3">
            Hello world
          </ListGroupItem>
          <ListGroupItem id="item4">
            Hello world
          </ListGroupItem>
        </ListGroup>
      </div>
  )
}
