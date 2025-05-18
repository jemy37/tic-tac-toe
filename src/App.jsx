import { useState } from "react"
import Player from "./components/Player" 
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combination"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X: "Play 1",
  O: "Play 2"
}

const INITIAL_GAME_BOARD =[
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

// get winner 
function deriveWinner(gameBoard,players){
  let winner;
    for (const conbination of WINNING_COMBINATIONS){
        const firstSymbol = gameBoard[conbination[0].row][conbination[0].column];
        const secondSymbol = gameBoard[conbination[1].row][conbination[1].column];
        const thirdSymbol = gameBoard[conbination[2].row][conbination[2].column];

      if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol 
      ){
        winner = players[firstSymbol];
      }     
  }
  return winner
}
// get the gameboard
function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array)=> [...array])];
    for (const turn of gameTurns){
        const {square,player} = turn;
        const{ row,col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard
}


function App() {
const [gameTurns, setGameTurns] = useState([]);
const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);  
  const winner = deriveWinner(gameBoard,players);
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

function handlePlayerNameChange(symbol, newName){
  setPlayers((prevPlayers) =>{
    return {
      ...prevPlayers,
      [symbol]:newName
    } }
  )
}


  return (
    <main>
      
      <div id = "game-container">
        <ol id="players" className="highlight-player">
        <Player initialName = {PLAYERS.X } symbol = "X" isActive= {activePlayer === "X"} onChangeName = {handlePlayerNameChange}/>  
        <Player initialName = {PLAYERS.O } symbol = "O" isActive = {activePlayer === "O"} onChangeName = {handlePlayerNameChange}/> 
        </ol>
        {(winner || hasDraw) && < GameOver winner = {winner} rematch = {handleRematch}/>}
        <GameBoard board = {gameBoard} onSelectSquare={handleSelectSquare}  />
      </div>
      
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
