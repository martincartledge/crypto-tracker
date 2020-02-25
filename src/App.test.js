import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders crypto tracker title", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/crypto tracker/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders current price btc label", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/btc/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders helper input text", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/we'll never share your bitcoin address/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders add address button", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/add address/i)
  expect(linkElement).toBeInTheDocument()
})
