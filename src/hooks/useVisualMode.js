import React, { useState } from 'react'

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode)
  const [history, setHistory] = useState([initMode])
  console.log("MODE: ", mode)

  const transition = (newMode, replace = false) => {
    if (replace) {  //if replace is true, change mode, don't add to history so that back calls the last time replace was not true.
      setMode(newMode)
    } else {
      setMode(newMode)
      setHistory([...history, newMode]) //use spread because you want to copy everything that already exists in history AND newMode
    }
    console.log("TRANSITIONH: ", history)
  }

  const back = () => {
    if (history.length !== 0) {
      history.pop() //Remove last hist item
      setMode(history[history.length - 1])//set mode to new last hist item
  }
    } 

  return { mode, transition, back }
}