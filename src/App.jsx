import { useState } from "react"
import Player from "./components/Player" 
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combination"
import GameOver from "./components/GameOver"


const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

// get the active player 
function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"
  if(gameTurns.length >0 &&gameTurns[0].player === "X"){
    currentPlayer = "O"
  }
  return currentPlayer;
}




function App() {
const [gameTurns, setGameTurns] = useState([]);
let winner = null;
let gameBoard = [...initialGameBoard.map((array)=> [...array])];

    let activePlayer = deriveActivePlayer(gameTurns);

    for (const turn of gameTurns){
        const {square,player} = turn;
        const{ row,col } = square;
        gameBoard[row][col] = player;
    }

    for (const conbination of WINNING_COMBINATIONS){
        const firstSymbol = gameBoard[conbination[0].row][conbination[0].column];
        const secondSymbol = gameBoard[conbination[1].row][conbination[1].column];
        const thirdSymbol = gameBoard[conbination[2].row][conbination[2].column];

      if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol 
      ){
        winner = firstSymbol;
      }     
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRematch(){
    setGameTurns([]);
  }

// handle the select square function
function handleSelectSquare(rowIndex, colIndex){

  setGameTurns((prevTurns) =>{
    const currentPlayer = deriveActivePlayer(prevTurns);
    
    const updatedTurns = [{square:{row:rowIndex, col:colIndex}, player :currentPlayer}, ...prevTurns];

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
        {(winner || hasDraw) && < GameOver winner = {winner} rematch = {handleRematch}/>}
        <GameBoard board = {gameBoard} onSelectSquare={handleSelectSquare}  />
      </div>
      
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
