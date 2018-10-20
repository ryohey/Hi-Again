import { Store, Todo } from "./main"

let todos = [
  {
    title: "Todo title",
    description: "this is a task"
  },
  {
    title: "Todo 2",
    description: "this is a second task"
  }
]

export const store: Store = {
  getTodos: () => {
    return Promise.resolve(todos)
  },
  addTodo: (todo: Todo) => {
    todos.push(todo)
    return Promise.resolve()
  }
}
