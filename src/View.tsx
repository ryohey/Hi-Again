import * as React from "react"
import { Todo } from "./main"

interface State {
  todos: Todo[]
  modalTodo: Todo | null
  isCreateFormVisible: boolean
  formTitle: string
  formDescription: string
  onClickTodo: (todo: Todo) => void
  onClickCreateNew: () => void
  onClickModal: () => void
  onClickAdd: () => void
  onClickCancelCreation: () => void
}

export class AppView extends React.Component<{}, {}> {
  public state: State = {
    todos: [],
    modalTodo: null,
    isCreateFormVisible: false,
    formTitle: "",
    formDescription: "",
    onClickTodo: (todo: Todo) => {},
    onClickCreateNew: () => {},
    onClickModal: () => {},
    onClickAdd: () => {},
    onClickCancelCreation: () => {}
  }

  showTodos(todos: Todo[]) {
    return new Promise<["click-todo", Todo] | ["create-todo"]>(resolve => {
      this.setState({
        todos,
        modalTodo: null,
        onClickTodo: (todo: Todo) => resolve(["click-todo", todo]),
        onClickCreateNew: () => resolve(["create-todo"])
      })
    })
  }

  showTodo(todo: Todo) {
    return new Promise<["close"]>(resolve => {
      this.setState({
        modalTodo: todo,
        onClickModal: () => resolve(["close"])
      })
    })
  }

  closeTodo(todo: Todo): Promise<void> {
    this.setState({ modalTodo: null })
    return Promise.resolve()
  }

  showCreateForm() {
    return new Promise<["cancel"] | ["create", Todo]>(resolve => {
      this.setState({
        formTitle: "",
        formDescription: "",
        isCreateFormVisible: true,
        onClickCancelCreation: () => resolve(["cancel"]),
        onClickAdd: () =>
          resolve([
            "create",
            {
              title: this.state.formTitle,
              description: this.state.formDescription
            }
          ])
      })
    })
  }

  closeCreateForm() {
    this.setState({
      isCreateFormVisible: false
    })
    return Promise.resolve()
  }

  public render() {
    const {
      todos,
      modalTodo,
      isCreateFormVisible,
      formTitle,
      formDescription,
      onClickCreateNew,
      onClickTodo,
      onClickModal,
      onClickCancelCreation,
      onClickAdd
    } = this.state
    return (
      <>
        <ul>
          {todos.map((t, i) => (
            <li className="todo" onClick={() => onClickTodo(t)} key={i}>
              <p className="title">{t.title}</p>
              <p className="description">{t.description}</p>
            </li>
          ))}
        </ul>
        <button onClick={onClickCreateNew}>Create new To-Do</button>
        {modalTodo !== null && (
          <div className="modal">
            <p className="title">{modalTodo.title}</p>
            <p className="description">{modalTodo.description}</p>
            <button onClick={onClickModal}>Close</button>
          </div>
        )}
        {isCreateFormVisible && (
          <div className="modal create-todo-form">
            <label>title</label>
            <input
              type="text"
              value={formTitle}
              onChange={e => this.setState({ formTitle: e.target.value })}
            />
            <label>description</label>
            <input
              type="text"
              value={formDescription}
              onChange={e => this.setState({ formDescription: e.target.value })}
            />
            <button onClick={onClickCancelCreation}>Cancel</button>
            <button onClick={onClickAdd}>Add</button>
          </div>
        )}
      </>
    )
  }
}
