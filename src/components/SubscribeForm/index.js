import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Paper
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))

export default ({
  address,
  setAddress,
  setIsSubscribed,
  ws,
  subscribedAddress,
  setSubscribedAddress
}) => {
  const classes = useStyles()
  const subscribe = () => {
    // send subscription for current address
    ws.current.send(`{"op":"addr_sub", "addr":"${address}"}`)
    // unsubscribe if we already have an address and
    // if it is different from previous address
    subscribedAddress &&
      address !== subscribedAddress &&
      ws.current.send(`{"op":"addr_unsub", "addr":"${subscribedAddress}"}`)
    setSubscribedAddress(address)
    setIsSubscribed(true)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl>
              <InputLabel htmlFor="bitcoin-address">Bitcoin Address</InputLabel>
              <Input
                id="bitcoin-address"
                aria-describedby="bitcoin-address-registration"
                value={address}
                type="text"
                onChange={e => setAddress(e.target.value)}
                autoFocus
              />
              <FormHelperText id="bitcoin-address-registration">
                We'll never share your Bitcoin Address.
              </FormHelperText>
              <Button
                variant="contained"
                type="button"
                onClick={subscribe}
                color="primary"
              >
                Add Address
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
