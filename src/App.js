import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container } from "@material-ui/core"
import Home from "./components/Home"

const App = () => (
  <Router>
    <Container maxWidth="xl">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  </Router>
)

export default App
