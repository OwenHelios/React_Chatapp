import { useEffect, useState } from "react"

export default function List({ getNum }) {
  const [num, setNum] = useState([])
  useEffect(() => {
    console.log("Testing")
    setNum(getNum())
  }, [getNum])
  return num.map(n => <div key={n}>{n}</div>)
}
