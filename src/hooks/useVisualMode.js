import React, { useState } from 'react'

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode)
  const [history, setHistory] = useState([initMode])

  const transition = (newMode, replace = false) => {
    if (replace) {  //if replace is true, change mode, don't add to history so that back calls the last time replace was not true.
      setMode(newMode)
      setHistory(prev => [...prev])
    } else {
      setMode(newMode)
      setHistory(prev => [...prev, newMode]) 
      //use spread because you want to copy everything that already exists in history AND newMode
    }
  }

  const back = () => {
    if (history.length !== 0) {
      history.pop() //Remove last hist item
      setMode(history[history.length - 1])//set mode to new last hist item
    }
  }

  return { mode, transition, back }
}