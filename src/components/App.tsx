import React, {Component, ChangeEvent, MouseEvent} from 'react';
import {
  Typography, Container, Box, Link,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,
  Checkbox, InputBase, IconButton, Menu, MenuItem,
  Slide, Fade, Collapse
} from '@material-ui/core';
import {
  MoreVert
} from '@material-ui/icons';
import {
  CheckCircleOutline, CheckboxBlankCircleOutline
} from 'mdi-material-ui'
import cuid, {slug} from 'cuid'


interface State {
  readonly activeItemInfo: ActiveItemInfo | null
  readonly items: {
    readonly id:string
    readonly title:string
    readonly done:boolean
    readonly description:string
  }[]
}

interface ActiveItemInfo {
  id: string
  element: HTMLElement
  status: 'menu' | 'edit' | 'exiting'
}

export default class App extends Component<{}, State> {

  state:State = {
    activeItemInfo: null,

    items: [
      {
        id: slug(),
        title: 'Vasya',
        done: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta hic iure nemo nobis non reprehenderit?'
      },
      {
        id: slug(),
        title: 'Peter',
        done: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, saepe?'
      },
      {
        id: slug(),
        title: 'John',
        done: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dolores quisquam sed!'
      },
      {
        id: slug(),
        title: 'Nicolas',
        done: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt expedita nemo neque quo.'
      }
    ]
  }

  handleCheck = (id:string, evt: ChangeEvent<HTMLInputElement>, checked: boolean )=> {
    this.setState(state => ({
      ...state,
      items: state.items.map( item => item.id === id ? {...item, done: checked} : item)
    }))
  }

  handleInput = (id:string, evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target

    this.setState(state => ({
      ...state,
      items: state.items.map(item => item.id === id ? {...item, [name]: value} : item)
    }))
  }

  handleMenuOpen = (id:string, evt: MouseEvent<HTMLButtonElement>) => {
    const element = evt.currentTarget;

    this.setState(state => ({
      ...state,
      activeItemInfo: {
        id, element,
        status: 'menu'
      }
    }))
  }

  handleMenuClose = (evt: MouseEvent<HTMLButtonElement>) => {
    this.setState(state => ({
      ...state,
      activeItemInfo: null
    }))
  }

  handleMenuItemEdit = (evt: MouseEvent<HTMLElement>) => {

  }

  handleMenuItemDeleteStart = (evt: MouseEvent<HTMLElement>) => {
    this.setState(state => state.activeItemInfo ? {
      ...state,
      activeItemInfo: {
        ...state.activeItemInfo,
        status: 'exiting'
      }
    } : state)
  }

  handleMenuItemDeleteEnd = () => {
    this.setState(state => {
      const {items, activeItemInfo} = state;

      return activeItemInfo ? {
        ...state,
        items: items.filter(item => item.id !== activeItemInfo.id ),
        activeItemInfo: null
      } : state
    })
  }

  renderMenu(activeItemInfo: ActiveItemInfo) {
    const {items} = this.state;
    const activeItem = items.find(item => item.id === activeItemInfo.id);

    return activeItem ? (
        <Menu
            id="item-menu"
            anchorEl={activeItemInfo.status === 'menu' ? activeItemInfo.element : null}
            keepMounted
            MenuListProps={{
              //dense: true
            }}
            open={activeItemInfo.status === 'menu'}
            onClose={this.handleMenuClose}
        >
          <MenuItem
              disabled={activeItem.done}
              style={{
                minHeight: '24px'
              }}
              onClick={this.handleMenuItemEdit}>Edit</MenuItem>
          <MenuItem
              style={{
                minHeight: '24px'
              }}
              onClick={this.handleMenuItemDeleteStart}>Delete</MenuItem>
        </Menu>
    ) : null
  }


  render() {
    const {items, activeItemInfo} = this.state;

    console.log('render start')
    for(const item of items) {
      console.log(!(activeItemInfo && activeItemInfo.id === item.id && activeItemInfo.status === 'exiting'));
    }
    console.log('render end')

    return (
        <Container maxWidth="sm">
          <Box>
            <List>
              {
                items.map( (item, idx)  => {
                  return (
                  <Collapse enter={false} appear={false} key={idx}
                      in={!(activeItemInfo && activeItemInfo.id === item.id && activeItemInfo.status === 'exiting')}
                      onExited={this.handleMenuItemDeleteEnd}
                  >
                    <ListItem divider selected={!!activeItemInfo && item.id === activeItemInfo.id} disabled={item.done}>
                      <ListItemIcon style={{
                        minWidth: '48px'
                      }}>
                        <Checkbox
                            color="default" disableRipple
                            checkedIcon={<CheckCircleOutline />} icon={<CheckboxBlankCircleOutline/>}
                            onChange={this.handleCheck.bind(this, item.id)}
                            checked={item.done}
                        />
                      </ListItemIcon>
                      <ListItemText
                          style = { item.done ? {
                            textDecoration: 'line-through'
                          } : undefined}
                          primary={item.title} secondary={item.description}/>
                      <ListItemSecondaryAction>
                        <IconButton onClick={this.handleMenuOpen.bind(this, item.id)}>
                          <MoreVert color='action' fontSize='inherit'/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Collapse>
                  )
                })
              }
            </List>
          </Box>
          {activeItemInfo && this.renderMenu(activeItemInfo)}
        </Container>
    );
  }
}