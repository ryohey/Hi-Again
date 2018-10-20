import * as React from "react"
import "./App.css"

import { AppView } from "./View"
import { mainLoop } from "./main"
import { store } from "./Store"

class App extends React.Component {
  private appView: AppView | null = null

  async componentDidMount() {
    if (this.appView === null) {
      throw new Error("view is not mounted")
    }
    await mainLoop(store, this.appView)
  }

  public render() {
    return <AppView ref={c => (this.appView = c)} />
  }
}

export default App
