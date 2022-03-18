import { useCallback, useState, useEffect } from "react"
import List from "./List"

export default function Exp() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  const style = {
    backgroundColor: dark ? "#333" : "#fff",
    color: dark ? "#fff" : "#333",
  }

  function getNum() {}

  // getNum = () => {
  //   return [number, number + 1, number + 2]
  // }

  getNum = useCallback(() => {
    return [number, number + 1, number + 2]
  }, [number])

  // useEffect(() => {
  //   getNum = () => {
  //     return [number, number + 1, number + 2]
  //   }
  // }, [number])

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={style}
    >
      <input
        type="number"
        value={number}
        onChange={e => setNumber(parseFloat(e.target.value))}
      />
      <button className="primary" onClick={() => setDark(!dark)}>
        Toggle
      </button>
      <List getNum={getNum}></List>
    </div>
  )
}
