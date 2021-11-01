import React from 'react'
import { connect } from 'react-redux'
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { CheckCircleOutline, CheckboxBlankCircleOutline } from 'mdi-material-ui'

import TodoItemEditor from './TodoItemEditor'
import { todoSelectors, todoActions, State } from 'stateStorage'
import { TodoItemType } from 'helpers'

const { getTodo } = todoSelectors
const { toggle } = todoActions

interface StateProps {
  todo: TodoItemType
}

interface OwnProps {
  id: string
  selected: boolean
  edited: boolean
  disabled?: boolean
  onMoreClick: (evt: React.MouseEvent<HTMLButtonElement>) => void
  onEditorApply: (title: string, description?: string) => void
  onEditorCancel: () => void
}

interface DispatchProps {
  toggle: typeof toggle
}

type TodoItemProps = OwnProps & StateProps & DispatchProps

const useStyles = makeStyles(_theme => ({
  itemTitle: ({ todo }: TodoItemProps) =>
    todo.done
      ? {
          textDecoration: 'line-through'
        }
      : {}
}))

const TodoItem: React.FC<TodoItemProps> = props => {
  const {
    id,
    selected,
    edited,
    disabled,
    onMoreClick,
    onEditorApply,
    onEditorCancel,
    todo: { title, description, done },
    toggle
  } = props

  const styles = useStyles(props)

  const handleItemCheck = () => {
    toggle(id)
  }

  return (
    <ListItem divider selected={selected} disabled={disabled || done}>
      <ListItemIcon>
        <Checkbox
          disabled={disabled || selected}
          color="default"
          disableRipple
          checkedIcon={<CheckCircleOutline />}
          icon={<CheckboxBlankCircleOutline />}
          onChange={handleItemCheck}
          checked={done}
        />
      </ListItemIcon>
      {edited ? (
        <TodoItemEditor
          initialTitle={title}
          initialDescription={description}
          onApply={onEditorApply}
          onCancel={onEditorCancel}
        />
      ) : (
        <ListItemText
          classes={{
            primary: styles.itemTitle
          }}
          primary={title}
          primaryTypographyProps={{
            noWrap: false
          }}
          secondary={description}
        />
      )}
      <ListItemSecondaryAction>
        <IconButton onClick={onMoreClick} disabled={disabled || edited}>
          <MoreVert color="action" fontSize="inherit" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default connect<StateProps, DispatchProps, OwnProps, State>(
  (state, props) => ({
    todo: getTodo(state, props)
  }),
  {
    toggle
  }
)(TodoItem)
