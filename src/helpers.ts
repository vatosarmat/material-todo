import { pick } from 'lodash'

export interface TodoItemType {
  id: string
  title: string
  description?: string
  done: boolean
}

export type TodoItemFields = Pick<TodoItemType, 'description' | 'title'>

export const pickTodoItemFields = <T extends Partial<TodoItemFields>>(obj: T) => {
  return pick(obj, ['description', 'title'])
}
