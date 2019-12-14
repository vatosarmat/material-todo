import { DeepReadonly } from 'utility-types'
import { createAction, createReducer, ActionType } from 'typesafe-actions'
import cuid from 'cuid'
import { omit } from 'lodash'

import { TodoItemType, pickTodoItemFields } from 'helpers'

export type State = DeepReadonly<{
  items: Record<string, TodoItemType>
}>

const defaultState: State = {
  items: {}
}

export const todoActions = {
  add: createAction('ITEM/ADD', (title: string, description?: string) =>
    description
      ? {
          title,
          description
        }
      : { title }
  )(),
  toggle: createAction('ITEM/TOGGLE')<string>(),
  remove: createAction('ITEM/REMOVE')<string>(),
  edit: createAction('ITEM/EDIT', (id: string, title: string, description?: string) =>
    description
      ? {
          id,
          title,
          description
        }
      : { id, title }
  )()
}

export type RootAction = ActionType<typeof todoActions>

export default createReducer<State, RootAction>(defaultState, {
  'ITEM/ADD': (state, { payload }) => {
    const id = 'item_' + cuid.slug()

    return {
      ...state,
      items: {
        ...state.items,
        [id]: {
          id,
          ...pickTodoItemFields(payload),
          done: false
        }
      }
    }
  },

  'ITEM/EDIT': (state, { payload: { id, ...rest } }) => ({
    ...state,
    items: {
      ...state.items,
      [id]: {
        ...state.items[id],
        ...pickTodoItemFields(rest)
      }
    }
  }),

  'ITEM/TOGGLE': (state, { payload: id }) => ({
    ...state,
    items: {
      ...state.items,
      [id]: {
        ...state.items[id],
        done: !state.items[id].done
      }
    }
  }),

  'ITEM/REMOVE': (state, { payload: id }) => ({
    ...state,
    items: omit(state.items, id)
  })
})

const getTodoIds = (state: State) => {
  return Object.keys(state.items)
}

const getTodo = (state: State, { id }: { id: string }) => {
  return state.items[id]
}

const isTodoDone = (state: State, { id }: { id?: string }) => {
  return id ? state.items[id].done : false
}

export const todoSelectors = {
  getTodoIds,
  getTodo,
  isTodoDone
}
