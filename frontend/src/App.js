import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/cars").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data[0] === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.map((car, i) => (
          <p key={i}>{car.name}</p>
        ))
      )}
    </div>
  )
}

export default App