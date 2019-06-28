import { createStandardAction, createReducer, ActionType } from 'typesafe-actions';
import cuid from 'cuid'


//toggle, edit, remove
export interface ItemId {
  readonly id: string
}

//add
export interface ItemData {
  readonly title: string
  readonly description?: string
}

//edit
export type ItemUpdate = ItemId & Partial<ItemData>

//state
export interface Item extends ItemId, ItemData {
  readonly done: boolean
}

export interface State {
  items: ReadonlyArray<Item>
}

const defaultState: State = {
  items: [],
};

const itemAction = {
  add: createStandardAction('ITEM/ADD')<ItemData>(),
  toggle: createStandardAction('ITEM/TOGGLE')<ItemId>(),
  remove: createStandardAction('ITEM/REMOVE')<ItemId>(),
  edit: createStandardAction('ITEM/EDIT')<ItemUpdate>()
}

type RootAction = ActionType<typeof itemAction>

const reducer = createReducer<State, RootAction>(defaultState, {
  'ITEM/ADD': (state, {payload}) => ({
    ...state,
    items: [...state.items, {id: 'item_'+cuid.slug(), done: false, ...payload}]
  }),

  'ITEM/TOGGLE': (state, {payload}) => ({
    ...state,
    items: state.items.map(item => item.id === payload.id ? {...item, done: !item.done} : item)
  }),

  'ITEM/REMOVE': (state, {payload}) => ({
    ...state,
    items: state.items.filter(item => item.id !== payload.id)
  }),

  'ITEM/EDIT': (state, {payload}) => ({
    ...state,
    items: state.items.map(item => item.id === payload.id ? {...item, ...payload} : item)
  })
})

export {reducer, itemAction}
