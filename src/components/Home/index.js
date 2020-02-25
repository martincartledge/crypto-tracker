import React, { useEffect, useState, useRef } from "react"
import Nav from "../Nav"
import SubscribeForm from "../SubscribeForm"
import TransactionFeed from "../TransactionFeed"

export default () => {
  // track and set transactions
  const [transactions, setTransactions] = useState([])
  // track and set crypto address
  const [address, setAddress] = useState("")
  // track and set subscribed address
  const [subscribedAddress, setSubscribedAddress] = useState("")
  // track and set isSubscribed status
  const [isSubscribed, setIsSubscribed] = useState(false)
  // track single socket instance
  const ws = useRef(null)
  // track and set current bitcoin -> usd price
  const [currentPrice, setCurrentPrice] = useState("")

  useEffect(() => {
    ws.current = new WebSocket("wss://ws.blockchain.info/inv")
    ws.current.onopen = () => console.log("ws opened")
    ws.current.onclose = () => console.log("ws closed")
    // get current bitcoin price
    fetch("https://blockchain.info/ticker")
      .then(res => res.json())
      .then(data => setCurrentPrice(parseFloat(data?.USD?.last)))
    // clean up function to close socket connection
    return () => {
      ws.current.close()
    }
  }, [])

  useEffect(() => {
    // if no current socket instance do nothing
    if (!ws.current) return
    // set transactions without mutating state
    ws.current.onmessage = e => {
      setTransactions(t =>
        t.concat(JSON.parse(e.data)?.x?.inputs?.[0]?.prev_out?.value)
      )
    }
  }, [transactions])

  return (
    <>
      <Nav currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} />
      {!isSubscribed && (
        <SubscribeForm
          address={address}
          setAddress={setAddress}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
          ws={ws}
          subscribedAddress={subscribedAddress}
          setSubscribedAddress={setSubscribedAddress}
        />
      )}
      {isSubscribed && (
        <TransactionFeed
          address={address}
          setIsSubscribed={setIsSubscribed}
          transactions={transactions}
        />
      )}
    </>
  )
}
