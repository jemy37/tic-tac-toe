import { useState } from "react"
import Player from "./components/Player" 
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"


function App() {  
const [activePlayer, setActivePlayer] = useState("X");
const [gameTurns, setGameTurns] = useState([]);

function handleSelectSquare(rowIndex, colIndex){
  setActivePlayer((curActiveplayer) => curActiveplayer==="X" ? "O" :"X");
  setGameTurns((prevTurns) =>{
      let currentPlayer = "X"
      if(prevTurns.length >0 &&prevTurns[0].player === "X"){
        currentPlayer = "O"
      }
    
    const updatedTurns = [{square:{row:rowIndex, col:colIndex}, player :currentPlayer}, ...prevTurns]

    return updatedTurns;
  })
}


  return (
    <main>
      <div id = "game-container">
        <ol id="players" className="highlight-player">
        <Player initialName = "Play 1" symbol = "X" isActive= {activePlayer === "X"}/>  
        <Player initialName = "Play 2" symbol = "O" isActive = {activePlayer === "O"}/> 
        </ol>
        <GameBoard turns = {gameTurns} onSelectSquare={handleSelectSquare}  />
      </div>
      <Log />
    </main>
  )
}

export default App
