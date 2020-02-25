import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import "./index.css"

export default ({ currentPrice }) => (
  <AppBar position="static">
    <Toolbar>
      <h1 variant="h6">Crypto Tracker</h1>
      <Typography variant="h6">BTC ${currentPrice} (USD)</Typography>
    </Toolbar>
  </AppBar>
)
