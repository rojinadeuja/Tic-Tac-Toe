import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
        return(
            <button className="square" 
                    onClick = { props.onClick }> {/*--Every Square is a button*/}
                {props.value}
            </button>
        )
}

class Board extends React.Component{
    //Constructor here because board keeps track of the game's state
    constructor(props){
        super(props);
        this.state = { 
            squares: Array(9).fill(null),
            xIsNext: true, //First move is X by default
        }; //Use parent component Board to keep states of the child Square --Lifting a state
    }
    //Function to handle the click on the Square
    handleClick(i){
        const squares = this.state.squares.slice(); //slice() creates a copy of the sqaures array to modify instead of original
        if(calculateWinner(squares) || squares[i]){ //If someone has won or a square is already filled, return early
            return;
        }
        squares[i] = this.state.xIsNext ?  'X' : 'O'; //Check turns
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext, //Everytime a player clicks flip state of xIsNext
        });
    }
    renderSquare(i){
        return <Square 
                    value={this.state.squares[i]}
                    onClick= {()=> this.handleClick(i)} //handleClick passes the state/props from square to the board
                />
    }
    render(){
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner){
            status = 'Winner is: ' + winner;
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
        }
        return(
            <div>
                <div className = "status">
                    {status}
                </div>
                <div className = "board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
      //Given an array of 9 squares, the function will check for a winner.
      //Return X or O or null
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  //-------------------------------------------------

  ReactDOM.render(
      <Game />, document.getElementById("root")
  );