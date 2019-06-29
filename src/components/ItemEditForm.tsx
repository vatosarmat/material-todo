import React, {Component, ChangeEvent } from 'react';
import {
  IconButton, TextField, FormControl, FormGroup
} from '@material-ui/core';
import {
  Cancel
} from '@material-ui/icons';
import {
  CheckCircleOutline
} from 'mdi-material-ui'

import {ItemData} from "../stateStorage"


export interface ItemEditFormProps extends ItemData {
  onApply(data: ItemData): void
  onCancel(): void
}

export default class ItemEditForm extends Component<ItemEditFormProps, ItemData> {

  static defaultProps:ItemEditFormProps = {
    title: '',
    description: '',
    onApply: () => {},
    onCancel: () => {}
  }

  state:ItemData = {...this.props}

  handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target

    this.setState(state => ({
      ...state,
      [name]: value
    }))
  }

  handleApplyClick = () => {
    this.props.onApply({...this.state})
  }

  render() {
    const {title, description} = this.state
    const { onCancel} = this.props;

    return (
        <FormControl fullWidth>
          <TextField name='title' autoFocus error={!title}
                     value={title}
                     onChange={this.handleInputChange}/>
          <TextField name='description' multiline
                     value={description}
                     onChange={this.handleInputChange}/>
          <FormGroup row style={{justifyContent: 'end'}}>
            <IconButton color='primary' onClick={this.handleApplyClick} disabled={!title}>
              <CheckCircleOutline/>
            </IconButton>
            <IconButton color='secondary' onClick={onCancel}>
              <Cancel/>
            </IconButton>
          </FormGroup>
        </FormControl>
    )
  }
}
