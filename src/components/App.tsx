import React, {Component, ChangeEvent, MouseEvent, FocusEvent} from 'react';
import {
  Typography, Container, Box, Link,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Menu, MenuItem,
  Checkbox, InputBase, Input, IconButton, TextField, FormControl, FormGroup,
  Slide, Fade, Collapse
} from '@material-ui/core';
import {
  MoreVert, AddCircleOutline, Cancel, Add
} from '@material-ui/icons';
import {
  CheckCircleOutline, CheckboxBlankCircleOutline
} from 'mdi-material-ui'
import {connect} from 'react-redux'

import {itemAction, State, Item, ItemId, ItemData} from "../stateStorage"
import ItemEditForm, {ItemEditFormProps} from "./ItemEditForm"


interface AppState {
  activeItem: ActiveItem | null
  addForm: boolean
}

interface AppProps {
  items: State['items']

  itemAdd: typeof itemAction.add,
  itemToggle: typeof itemAction.toggle,
  itemRemove: typeof itemAction.remove,
  itemEdit: typeof itemAction.edit
}


interface ActiveItem extends ItemId{
  menuAnchorElement: HTMLElement
  status: 'menu' |'edit' | 'exiting'
}


class App extends Component<AppProps, AppState> {
  state:AppState = {
    activeItem: null,
    addForm: false
  }

  resetActiveItem() {
    this.setState(state => ({
      ...state,
      activeItem: null
    }))
  }

  hideAddForm() {
    this.setState(state => ({
      ...state,
      addForm: false
    }))
  }

  handleItemToggle = (id:string)=> {
    this.props.itemToggle({id})
  }

  handleMenuOpen = (id:string, evt: MouseEvent<HTMLButtonElement>) => {
    const element = evt.currentTarget;
    const newActive = this.props.items.find(item => item.id === id)

    if(newActive) {
      this.setState(state => ({
        ...state,
        activeItem: {
          ...newActive, menuAnchorElement: element, status: 'menu'
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

  handleItemEditApply = (data: ItemData) => {
    if(this.state.activeItem) {
      this.props.itemEdit({...this.state.activeItem, ...data})

      this.resetActiveItem()
    }
  }

  handleItemEditCancel = () => {
    this.resetActiveItem()
  }

  handleItemAddFormOpen = () => {
    this.setState(state => ({
      ...state,
      addForm: true
    }))
  }

  handleItemAddApply = (data: ItemData) => {
    if(this.state.addForm) {
      this.hideAddForm()
      this.props.itemAdd(data)
    }
  }

  handleItemAddCancel = () => {
    this.hideAddForm()
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
    const {items} = this.props;

    return  (
        <Menu
            id="item-menu"
            anchorEl={activeItem.menuAnchorElement}
            MenuListProps={{
              //dense: true
            }}
            open
            onClose={this.handleMenuClose}
        >
          <MenuItem
              disabled={items.find(item => item.id === activeItem.id)!.done}
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
    const isEdit = isItemActive && activeItem!.status === 'edit'

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
          {isEdit ?
              <ItemEditForm
                  title={item.title} description={item.description}
                  onApply={this.handleItemEditApply}
                  onCancel={this.handleItemEditCancel}/>:
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


  renderAddItem() {
    const {addForm} = this.state

    const icon = (
        <ListItemIcon style={{
          minWidth: '48px'
        }}>
          <Checkbox
              disabled
              color="default" disableRipple
              icon={<Add/>}
              checked={false}
          />
        </ListItemIcon>
    )

    if(this.state.addForm) {
      return (
          <ListItem divider>
            {icon}
            <ItemEditForm
                onApply={this.handleItemAddApply}
                onCancel={this.handleItemAddCancel}/>
          </ListItem>
      )
    }

    return (
        <ListItem button divider onClick={this.handleItemAddFormOpen}>
          {icon}
        </ListItem>
    )
  }


  render() {
    const {items} = this.props
    const {activeItem} = this.state

    return (
        <Container maxWidth="sm" style={{
          marginTop: '1rem'
        }}>
          <Box>
            <Typography variant='h5' component='h1' align='center'>TODO</Typography>
            {activeItem && activeItem.status === 'menu' && this.renderMenu(activeItem)}
            <List>
              {
                items.map( (item, idx)  => {
                  return (
                  <Collapse enter={false} appear={false} key={idx}
                      in={!(activeItem && activeItem.id === item.id && activeItem.status === 'exiting')}
                      onExited={this.handleMenuItemRemoveExited}
                  >
                    {this.renderListItem(item)}
                  </Collapse>
                  )
                })
              }
              {
                this.renderAddItem()
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
