import React, {Component, ChangeEvent, MouseEvent, FocusEvent} from 'react';
import {
  Typography, Container, Box, Link,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Menu, MenuItem,
  Checkbox, InputBase, Input, IconButton, TextField, FormControl, FormGroup,
  Slide, Fade, Collapse
} from '@material-ui/core';
import {
  MoreVert, Cancel
} from '@material-ui/icons';
import {
  CheckCircleOutline, CheckboxBlankCircleOutline
} from 'mdi-material-ui'
import cuid, {slug} from 'cuid'
import {connect} from 'react-redux'

import {itemAction, State, Item, ItemUpdate, ItemData} from "../stateStorage"


interface ComponentState {
  readonly activeItem: ActiveItem | null
}

interface ComponentProps {
  items: State['items']

  itemAdd: typeof itemAction.add,
  itemToggle: typeof itemAction.toggle,
  itemRemove: typeof itemAction.remove,
  itemEdit: typeof itemAction.edit
}


interface ActiveItem extends Item {
  element: HTMLElement
  status: 'menu' |'edit' | 'exiting'
}

class App extends Component<ComponentProps, ComponentState> {
  state:ComponentState = {
    activeItem: null
  }

  resetActiveItem() {
    this.setState(state => ({
      ...state,
      activeItem: null
    }))
  }

  handleItemToggle = (id:string)=> {
    this.props.itemToggle({id})
  }

  handleActiveItemInputChange = (id:string, evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target

    this.setState(state => state.activeItem ? {
      activeItem: {
        ...state.activeItem,
        [name]: value
      }
    } : state)
  }

  handleMenuOpen = (id:string, evt: MouseEvent<HTMLButtonElement>) => {
    const element = evt.currentTarget;
    const newActive = this.props.items.find(item => item.id === id)

    if(newActive) {
      this.setState(state => ({
        ...state,
        activeItem: {
          ...newActive, element, status: 'menu'
        }
      }))
    }
  }

  handleMenuClose = () => {
    this.resetActiveItem()
  }

  handleMenuItemEdit = () => {
    this.setState(state => state.activeItem ? {
      ...state,
      activeItem: {
        ...state.activeItem,
        status: 'edit'
      }
    } : state)
  }

  handleMenuItemEditApply = () => {
    if(this.state.activeItem) {
      this.props.itemEdit({...this.state.activeItem})

      this.resetActiveItem()
    }
  }

  handleMenuItemEditCancel = () => {
    this.resetActiveItem()
  }

  handleMenuItemRemove = () => {
    this.setState(state => state.activeItem ? {
      ...state,
      activeItem: {
        ...state.activeItem,
        status: 'exiting'
      }
    } : state)
  }

  handleMenuItemRemoveExited = () => {
    if(this.state.activeItem) {
      this.props.itemRemove({...this.state.activeItem})

      this.resetActiveItem()
    }
  }

  renderMenu(activeItem: ActiveItem) {
    return  (
        <Menu
            id="item-menu"
            anchorEl={activeItem.element}
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
              onClick={this.handleMenuItemRemove}>Remove</MenuItem>
        </Menu>
    )
  }


  renderListItem(item: Item) {
    const {activeItem} = this.state;
    const isItemActive = !!activeItem && item.id === activeItem.id
    const isEdit = isItemActive && !!activeItem && activeItem.status === 'edit'

    return (
        <ListItem divider selected={isItemActive} disabled={item.done}>
          <ListItemIcon style={{
            minWidth: '48px'
          }}>
            <Checkbox
                disabled={isItemActive}
                color="default" disableRipple
                checkedIcon={<CheckCircleOutline />} icon={<CheckboxBlankCircleOutline/>}
                onChange={this.handleItemToggle.bind(this, item.id)}
                checked={item.done}
            />
          </ListItemIcon>
          {isEdit && activeItem ?
              <FormControl fullWidth>
                <TextField name='title' autoFocus error={!activeItem.title}
                           value={activeItem.title}
                           onChange={this.handleActiveItemInputChange.bind(this, item.id)}/>
                <TextField name='description' multiline
                           value={activeItem.description}
                           onChange={this.handleActiveItemInputChange.bind(this, item.id)}/>
                <FormGroup row style={{justifyContent: 'end'}}>
                  <IconButton color='primary' onClick={this.handleMenuItemEditApply} disabled={!activeItem.title}>
                    <CheckCircleOutline/>
                  </IconButton>
                  <IconButton color='secondary' onClick={this.handleMenuItemEditCancel}>
                    <Cancel/>
                  </IconButton>
                </FormGroup>
              </FormControl> :
              <ListItemText style = { item.done ? {
                              textDecoration: 'line-through'
                            } : undefined}
                            primary={item.title}
                            secondary={item.description}/>
          }
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleMenuOpen.bind(this, item.id)} disabled={isEdit}>
              <MoreVert color='action' fontSize='inherit'/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    )
  }


  render() {
    const {items} = this.props
    const {activeItem} = this.state

    return (
        <Container maxWidth="sm">
          {activeItem && activeItem.status === 'menu' && this.renderMenu(activeItem)}
          <Box>
            <List>
              {
                items.map( (item, idx)  => {
                  return (
                  <Collapse enter={false} appear={false} key={idx}
                      in={!(activeItem && activeItem.id === item.id && activeItem.status === 'exiting')}
                      onExited={this.handleMenuItemRemoveExited}
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
