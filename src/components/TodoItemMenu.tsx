import React from 'react'
import { connect } from 'react-redux'
import { Menu, MenuProps, MenuItem } from '@material-ui/core'

import { todoSelectors, State } from 'stateStorage'

const { isTodoDone } = todoSelectors

interface StateProps {
  disabledEdit: boolean
}

interface OwnProps {
  itemId?: string
  anchorEl: MenuProps['anchorEl']

  onClickEdit: () => void
  onClickRemove: () => void
  onClose: () => void
}

type TodoItemMenuProps = StateProps & OwnProps

const TodoItemMenu: React.FC<TodoItemMenuProps> = ({
  itemId,
  anchorEl,
  disabledEdit,
  onClickEdit,
  onClickRemove,
  onClose
}) => {
  return (
    <Menu id="item-menu" anchorEl={anchorEl} open={Boolean(itemId && anchorEl)} onClose={onClose}>
      <MenuItem disabled={disabledEdit} onClick={onClickEdit}>
        Edit
      </MenuItem>
      <MenuItem onClick={onClickRemove}>Remove</MenuItem>
    </Menu>
  )
}

export default connect<StateProps, {}, OwnProps, State>((state, { itemId: id }) => ({
  disabledEdit: isTodoDone(state, { id })
}))(TodoItemMenu)
