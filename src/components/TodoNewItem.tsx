import React from 'react'
import { Checkbox, ListItemIcon, ListItem, Tooltip } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import TodoItemEditor from './TodoItemEditor'

interface TodoNewItemProps {
  editorOpened: boolean
  disabled: boolean

  onNewItemClick: () => void
  onEditorApply: (title: string, description?: string) => void
  onEditorCancel: () => void
}

const TodoNewItem: React.FC<TodoNewItemProps> = ({
  editorOpened,
  disabled,
  onNewItemClick,
  onEditorApply,
  onEditorCancel
}) => {
  const icon = (
    <ListItemIcon>
      <Checkbox disabled color="default" disableRipple icon={<AddIcon />} checked={false} />
    </ListItemIcon>
  )

  if (editorOpened) {
    return (
      <ListItem divider>
        {icon}
        <TodoItemEditor initialTitle={''} onApply={onEditorApply} onCancel={onEditorCancel} />
      </ListItem>
    )
  }

  return (
    <Tooltip
      title="Click to add new TODO item"
      interactive={false}
      enterDelay={2000}
      enterNextDelay={2000}
      leaveDelay={250}
    >
      <ListItem button divider disabled={disabled} onClick={onNewItemClick}>
        {icon}
      </ListItem>
    </Tooltip>
  )
}

export default TodoNewItem
