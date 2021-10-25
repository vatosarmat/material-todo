import React from 'react'
import { connect } from 'react-redux'
import { List, Collapse, Button } from '@material-ui/core'

import TodoItem from './TodoItem'
import TodoNewItem from './TodoNewItem'
import TodoItemMenu from './TodoItemMenu'
import { todoActions, todoSelectors, State } from 'stateStorage'

const { remove: removeTodo, edit: editTodo, add: addTodo, clear: clearTodos } = todoActions
const { getTodoIds, getDoneTodoIds } = todoSelectors

interface StateProps {
  todoIds: string[]
  doneTodoIds: Set<string>
}

interface DispatchProps {
  removeTodo: typeof removeTodo
  editTodo: typeof editTodo
  addTodo: typeof addTodo
  clearTodos: typeof clearTodos
}

type TodoListProps = StateProps & DispatchProps

const NEW_ITEM = 'NEW_ITEM'

interface TodoListState {
  menuAnchor?: HTMLElement
  activeItemId?: string
  activeItemStatus?: 'REMOVE_ANIMATION' | 'EDIT' | 'MENU' | 'ADD'
  clearing: boolean
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
  state: TodoListState = { clearing: false }

  clearing?: Set<string>

  resetActiveItem = () => {
    this.setState({
      menuAnchor: undefined,
      activeItemId: undefined,
      activeItemStatus: undefined,
      clearing: false
    })
  }

  //NewItem
  handleNewItemClick = () => {
    this.setState(state =>
      state.activeItemId
        ? state
        : {
            activeItemId: NEW_ITEM,
            activeItemStatus: 'ADD',
            clearing: false
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

  handleClear = () => {
    this.setState(state => ({
      ...state,
      clearing: true
    }))
  }

  handleMenuClose = () => {
    this.resetActiveItem()
  }

  handleRemoveAnimationDone = (id: string) => {
    const { removeTodo } = this.props
    removeTodo(id)
    this.resetActiveItem()
  }

  handleClearingAnimation = (id: string) => {
    const { clearTodos, doneTodoIds } = this.props

    if (!this.clearing) {
      this.clearing = new Set(doneTodoIds)
    }

    this.clearing.delete(id)
    if (this.clearing.size === 0) {
      this.clearing = undefined
      clearTodos()
      this.setState({ clearing: false })
    }
  }

  render() {
    const { todoIds, doneTodoIds } = this.props

    const { activeItemStatus, activeItemId, menuAnchor, clearing } = this.state

    const collapseProps = clearing
      ? (todoId: string) => ({
          in: !(clearing && doneTodoIds.has(todoId)),
          onExited: this.handleClearingAnimation.bind(null, todoId)
        })
      : (todoId: string) => ({
          in: !(activeItemId === todoId && activeItemStatus === 'REMOVE_ANIMATION'),
          onExited: this.handleRemoveAnimationDone.bind(null, todoId)
        })

    return (
      <>
        <List>
          {todoIds.map(todoId => (
            <Collapse enter={false} appear={false} key={todoId} {...collapseProps(todoId)}>
              <TodoItem
                disabled={clearing}
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
            disabled={Boolean(clearing) || Boolean(activeItemId && activeItemId !== 'NEW_ITEM')}
            onNewItemClick={this.handleNewItemClick}
            onEditorApply={this.handleNewItemApply}
            onEditorCancel={this.handleNewItemCancel}
          />
        </List>
        {doneTodoIds.size > 0 && (
          <Button size="small" onClick={this.handleClear}>
            Clear done
          </Button>
        )}
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
    todoIds: getTodoIds(state),
    doneTodoIds: getDoneTodoIds(state)
  }),
  {
    removeTodo,
    editTodo,
    addTodo,
    clearTodos
  }
)(TodoList)
