export interface TodoItemType {
  id: string
  title: string
  description?: string
  done: boolean
}

export type TodoItemFields = Pick<TodoItemType, 'description' | 'title'>

export const pickTodoItemFields = <T extends Partial<TodoItemFields>>(obj: T) => {
  return {
    description: obj.description as T['description'],
    title: obj.title as T['title']
  }
}
