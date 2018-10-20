export interface Todo {
  title: string
  description: string
}

export interface Store {
  getTodos(): Promise<Todo[]>
  addTodo(todo: Todo): Promise<void>
}

export interface View {
  showTodos(todos: Todo[]): Promise<["click-todo", Todo] | ["create-todo"]>
  showTodo(Todo: Todo): Promise<["close"]>
  showCreateForm(): Promise<["cancel"] | ["create", Todo]>
  closeCreateForm(): Promise<void>
  closeTodo(Todo: Todo): Promise<void>
}

export const mainLoop = async (store: Store, view: View) => {
  initial: while (true) {
    const todos = await store.getTodos()
    const event = await view.showTodos(todos)

    switch (event[0]) {
      case "click-todo": {
        const e = await view.showTodo(event[1])
        switch (e[0]) {
          case "close":
            await view.closeTodo(event[1])
            continue initial
        }
        break
      }
      case "create-todo": {
        const e = await view.showCreateForm()
        switch (e[0]) {
          case "cancel":
            await view.closeCreateForm()
            continue initial
          case "create":
            await view.closeCreateForm()
            await store.addTodo(e[1])
            continue initial
        }
        break
      }
    }
  }
}
