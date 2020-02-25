import React from "react"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))

export default ({ address, setIsSubscribed, transactions }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <p>Your Bitcoin Address is: {address}</p>
            <Button
              variant="contained"
              type="button"
              onClick={() => setIsSubscribed(false)}
              color="primary"
            >
              Change address?
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>All Transactions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.length === 0 && (
                  <TableRow key="no-data">
                    <TableCell component="th" scope="row">
                      No Transactions!
                    </TableCell>
                  </TableRow>
                )}
                {transactions.map(t => (
                  <TableRow key={t}>
                    <TableCell component="th" scope="row">
                      {t}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}
