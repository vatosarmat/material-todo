import React from 'react'
import { connect } from 'react-redux'
import { List, Collapse } from '@material-ui/core'

import TodoItem from './TodoItem'
import TodoNewItem from './TodoNewItem'
import TodoItemMenu from './TodoItemMenu'
import { todoActions, todoSelectors, State } from 'stateStorage'

const { remove: removeTodo, edit: editTodo, add: addTodo } = todoActions
const { getTodoIds } = todoSelectors

interface StateProps {
  todoIds: string[]
}

interface DispatchProps {
  removeTodo: typeof removeTodo
  editTodo: typeof editTodo
  addTodo: typeof addTodo
}

type TodoListProps = StateProps & DispatchProps

const NEW_ITEM = 'NEW_ITEM'

interface TodoListState {
  menuAnchor?: HTMLElement
  activeItemId?: string
  activeItemStatus?: 'REMOVE_ANIMATION' | 'EDIT' | 'MENU' | 'ADD'
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
  state: TodoListState = {}

  resetActiveItem = () => {
    this.setState({
      menuAnchor: undefined,
      activeItemId: undefined,
      activeItemStatus: undefined
    })
  }

  //NewItem
  handleNewItemClick = () => {
    this.setState(state =>
      state.activeItemId
        ? state
        : {
            activeItemId: NEW_ITEM,
            activeItemStatus: 'ADD'
          }
    )
  }

  handleNewItemApply = (title: string, description?: string) => {
    const { addTodo } = this.props
    addTodo(title, description)
    this.resetActiveItem()
  }

  handleNewItemCancel = () => {
    this.resetActiveItem()
  }

  //Editor
  handleEditorApply = (id: string, title: string, description?: string) => {
    const { editTodo } = this.props
    editTodo(id, title, description)
    this.resetActiveItem()
  }

  handleEditorCancel = () => {
    this.resetActiveItem()
  }

  //Menu
  handleMoreClick = (id: string, evt: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = evt

    this.setState(state => ({
      ...state,
      menuAnchor: currentTarget,
      activeItemId: id,
      activeItemStatus: 'MENU'
    }))
  }

  handleClickEdit = () => {
    this.setState(state =>
      state.activeItemId
        ? {
            ...state,
            activeItemStatus: 'EDIT'
          }
        : state
    )
  }

  handleClickRemove = () => {
    this.setState(state =>
      state.activeItemId
        ? {
            ...state,
            activeItemStatus: 'REMOVE_ANIMATION'
          }
        : state
    )
  }

  handleMenuClose = () => {
    this.resetActiveItem()
  }

  handleRemoveAnimationDone = (id: string) => {
    const { removeTodo } = this.props
    removeTodo(id)
    this.resetActiveItem()
  }

  render() {
    const { todoIds } = this.props
    const { activeItemStatus, activeItemId, menuAnchor } = this.state

    return (
      <>
        <List>
          {todoIds.map(todoId => (
            <Collapse
              enter={false}
              appear={false}
              key={todoId}
              in={!(activeItemId === todoId && activeItemStatus === 'REMOVE_ANIMATION')}
              onExited={this.handleRemoveAnimationDone.bind(null, todoId)}
            >
              <TodoItem
                selected={todoId === activeItemId}
                edited={todoId === activeItemId && activeItemStatus === 'EDIT'}
                id={todoId}
                onMoreClick={this.handleMoreClick.bind(null, todoId)}
                onEditorApply={this.handleEditorApply.bind(null, todoId)}
                onEditorCancel={this.handleEditorCancel}
              />
            </Collapse>
          ))}
          <TodoNewItem
            editorOpened={activeItemId === 'NEW_ITEM' && activeItemStatus === 'ADD'}
            disabled={Boolean(activeItemId && activeItemId !== 'NEW_ITEM')}
            onNewItemClick={this.handleNewItemClick}
            onEditorApply={this.handleNewItemApply}
            onEditorCancel={this.handleNewItemCancel}
          />
        </List>
        <TodoItemMenu
          itemId={activeItemStatus === 'MENU' ? activeItemId : undefined}
          anchorEl={menuAnchor}
          onClickEdit={this.handleClickEdit}
          onClickRemove={this.handleClickRemove}
          onClose={this.handleMenuClose}
        />
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  state => ({
    todoIds: getTodoIds(state)
  }),
  {
    removeTodo,
    editTodo,
    addTodo
  }
)(TodoList)
