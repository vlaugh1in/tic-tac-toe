
//revealing module (lets you reveal api in return)

function Gameboard(){
  // constants
  const rows = 3;
  const columns = 3;
  let gameboard = [];
  

 //cache dom
 

 
 //bind events
  //$gameboard.delegate('div.move', 'click', selectMove);
  

  function render() {
    const consoleBoard = gameboard.map((row => row.map((cell) => cell.getValue())));
    console.log(consoleBoard);
  }
  
  function newGame(){
    generateNewBoard();
    let token = tokenPrompt();
    let AIToken = 0;

    if (token == 'X'){
      AIToken = 'O';
    } else if(token == 'O'){
      AIToken = 'X';    
    } else {
      console.log("Invalid input. X or O. Try again.");
      token = newGame().token;     
    }

    return {token, AIToken}
  }

  function tokenPrompt(){
    let token = prompt("Do you want to play as X or O?");
    return token;
  }
 
  function generateNewBoard(){
    gameboard = [];
    for(let i= 0; i< rows; i++){
      gameboard[i] = []
      for(let j=0; j<columns; j++){
        gameboard[i].push(Card());    
      }
     }
  }
  

  const selectCard = (row, column, player) =>{
    const freeCards = gameboard.filter((row) => row[column].getValue() === 0).map(row => row[column]);
    if (!freeCards.length){
      console.log("No moves left.");
      return;
    }
    gameboard[row][column].addCard(player);
  }


  // adds value to the card
  // 0 = no selection, 1 = X, 2 = O
  function Card(){
    let value = 0;

    const addCard = (player) => {
      value = player;
    }

    const getValue = () => value;

    return{
      addCard,
      getValue
    }

  }


  function selectMove(e) {
    console.log("clicked");

  }

  return {
    render,
    selectCard,
    newGame
  };

};

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
){
  const currentBoard = Gameboard();
  let game = currentBoard.newGame();
  const playerToken = game.token;
  const AIToken = game.AIToken;

  const printBoard = () => {
    currentBoard.render();
  }  

  const players = [
    {
      name: playerOneName,
      token: playerToken
    },
    {
      name: playerTwoName,
      token: AIToken
    },
    
  ];

  let activePlayer = players[0];
  
  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  printBoard();
  console.log(getActivePlayer().name+"'s turn. They are using "+ getActivePlayer().token+"s.");
  

  const newRound = () => {
    switchTurn();
    printBoard();
    console.log(getActivePlayer().name+"'s turn. They are using "+ getActivePlayer().token+"s.");
  }

  const playRound = (row, column) =>{
    row = prompt("What row do you want to place your move?");
    column = prompt("What column do you want to place your move?");
    currentBoard.selectCard(row, column, getActivePlayer().token);
    newRound();
    printBoard();
  }

  playRound();

  return {
    playRound,
    getActivePlayer
  }

}

let game = GameController();



