import React, { Component, ChangeEvent, KeyboardEvent } from 'react'
import { IconButton, TextField, Tooltip } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import { CheckCircleOutline } from 'mdi-material-ui'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'

import { TodoItemFields } from 'helpers'

const styles = createStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

interface TodoItemEditorProps {
  initialTitle: string
  initialDescription?: string
  onApply: (title: string, description?: string) => void
  onCancel: () => void
}

class TodoItemEditor extends Component<TodoItemEditorProps & WithStyles<typeof styles>, TodoItemFields> {
  state: TodoItemFields = {
    title: this.props.initialTitle,
    description: this.props.initialDescription
  }

  handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target

    this.setState(state => ({
      ...state,
      [name]: value
    }))
  }

  handleApplyClick = () => {
    const { title, description } = this.state
    this.props.onApply(title, description)
  }

  handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      this.handleApplyClick()
    } else if (evt.key === 'Escape') {
      this.props.onCancel()
    }
  }

  render() {
    const { title, description } = this.state
    const { classes, onCancel } = this.props
    const okButton = (
      <IconButton color="primary" onClick={this.handleApplyClick} disabled={!title}>
        <CheckCircleOutline />
      </IconButton>
    )

    return (
      <div className={classes.form}>
        <TextField
          name="title"
          label="Title"
          multiline
          autoFocus
          error={!title}
          value={title}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          value={description}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
        />
        <div className={classes.buttons}>
          <Tooltip title="Item title cannot be empty" open={!title}>
            <span>{title ? <Tooltip title="Enter">{okButton}</Tooltip> : okButton}</span>
          </Tooltip>
          <Tooltip title="Escape" placement="right">
            <IconButton color="secondary" onClick={onCancel}>
              <Cancel />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TodoItemEditor)
