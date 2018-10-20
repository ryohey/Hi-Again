# hi-again

There is a gap between software specification and implementation.
If we could write the specifications with a simple DSL and even run it ...
This is just an idea, but we can do it.

## Business Logic

`main.ts` provides self-contained definitions in single source file.
`mainLoop` is infinite loop async function that never returns (Because it is a web page).
We can see the whole application logic.

```ts
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
```

## View

View is an async function that returns user interface events.

## Store

just storing objects.
