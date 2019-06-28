import React, {Component, ChangeEvent, MouseEvent, FocusEvent} from 'react';
import {
  Typography, Container, Box, Link,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Menu, MenuItem,
  Checkbox, InputBase, Input, IconButton, TextField, FormControl,
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
  readonly items: Item[]
}

interface Item {
  readonly id:string
  readonly title:string
  readonly done:boolean
  readonly description:string
}

interface ActiveItemInfo {
  id: string
  element: HTMLElement
  status: 'menu' |'edit' | 'exiting'
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
    this.setState(state => state.activeItemInfo ? {
      ...state,
      activeItemInfo: {
        ...state.activeItemInfo,
        status: 'edit'
      }
    } : state)
  }

  handleMenuItemEditBlur = (evt: FocusEvent<HTMLElement>) => {

    if(!evt.relatedTarget) {
      this.setState(state => ({
        ...state,
        activeItemInfo: null
      }))
    }
  }

  handleMenuItemDelete = (evt: MouseEvent<HTMLElement>) => {
    this.setState(state => state.activeItemInfo ? {
      ...state,
      activeItemInfo: {
        ...state.activeItemInfo,
        status: 'exiting'
      }
    } : state)
  }

  handleMenuItemDeleteExited = () => {
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

    return activeItem && activeItemInfo.status === 'menu' ? (
        <Menu
            id="item-menu"
            anchorEl={activeItemInfo.element}
            MenuListProps={{
              //dense: true
            }}
            open
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
              onClick={this.handleMenuItemDelete}>Delete</MenuItem>
        </Menu>
    ) : null
  }


  renderListItem(item: Item) {
    const {activeItemInfo} = this.state;
    const isItemActive = !!activeItemInfo && item.id === activeItemInfo.id

    return (
        <ListItem divider selected={isItemActive} disabled={item.done}>
          <ListItemIcon style={{
            minWidth: '48px'
          }}>
            <Checkbox
                disabled={isItemActive}
                color="default" disableRipple
                checkedIcon={<CheckCircleOutline />} icon={<CheckboxBlankCircleOutline/>}
                onChange={this.handleCheck.bind(this, item.id)}
                checked={item.done}
            />
          </ListItemIcon>
          {(isItemActive && activeItemInfo && activeItemInfo.status === 'edit') ?
              <FormControl fullWidth
                           onBlur={this.handleMenuItemEditBlur}
              >

                <TextField name='title' autoFocus
                           value={item.title}
                           onChange={this.handleInput.bind(this, item.id)}/>
                <TextField name='description' multiline
                           value={item.description}
                           onChange={this.handleInput.bind(this, item.id)}/>
              </FormControl> :
              <ListItemText style = { item.done ? {
                textDecoration: 'line-through'
              } : undefined}
                            primary={item.title}
                            secondary={item.description}/>
          }
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleMenuOpen.bind(this, item.id)}>
              <MoreVert color='action' fontSize='inherit'/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    )
  }


  render() {
    const {items, activeItemInfo} = this.state;

    return (
        <Container maxWidth="sm">
          {activeItemInfo && this.renderMenu(activeItemInfo)}
          <Box>
            <List>
              {
                items.map( (item, idx)  => {
                  return (
                  <Collapse enter={false} appear={false} key={idx}
                      in={!(activeItemInfo && activeItemInfo.id === item.id && activeItemInfo.status === 'exiting')}
                      onExited={this.handleMenuItemDeleteExited}
                  >
                    {this.renderListItem(item, )}
                  </Collapse>
                  )
                })
              }
            </List>
          </Box>
        </Container>
    );
  }
}