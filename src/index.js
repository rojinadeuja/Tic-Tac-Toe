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
        }; //Use parent component Board to keep states of the child Square --Lifting a state
    }
    //Function to handle the click on the Square
    handleClick(i){
        const squares = this.state.squares.slice(); //slice() creates a copy of the sqaures array to modify instead of original
        squares[i] = 'X';
        this.setState({squares: squares});
    }
    renderSquare(i){
        return <Square 
                    value={this.state.squares[i]}
                    onClick= {()=> this.handleClick(i)} //handleClick passes the state/props from square to the board
                />
    }
    render(){
        const status = 'Next player: X';
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

  //-------------------------------------------------

  ReactDOM.render(
      <Game />, document.getElementById("root")
  );