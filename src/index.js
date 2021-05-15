import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props){
      return (
        <button className="square" 
          onClick={props.onClick}
          >
          {props.value}
        </button>
      );

  }
  
  class Board extends React.Component {

    handleClick(i){
      // Replace this.state.squares, first create a copy, manipulate it. then update it with setState
      const squares=this.state.squares.slice(); // take a copy of the this.state.squares array

      const winner=calculateWinner(squares) 

      if (winner || squares[i]){
        // if there is either a winner or squares[i] is no longer null, i.e. 'X', 'O'
        return; // empty return. don't execute the rest of the function. No for putting code after this into else block. 
      }
      squares[i]=this.state.xIsNext? 'X': 'O';
      this.setState({
        squares: squares,
        xIsNext: ! this.state.xIsNext // always reverses the xIsNext state.
      });
      
    }

    renderSquare(i) {
      return (
      <Square 
        value={this.props.squares[i]} 
        onClick={()=> this.props.onClick(i)}  
        />
      )
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
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
    constructor(props){
      // store game's history of moves as an array of boards in terms of an array squares that existed as the state on Boards previously. 
      // Boards will then depict squares with the history. Game component has full control over the Board's data
      super(props);
      this.state={
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true
      }
    }
    
    handleClick(i){
      // Replace this.state.squares, first create a copy, manipulate it. then update it with setState
      const squares=this.state.squares.slice(); // take a copy of the this.state.squares array

      const winner=calculateWinner(squares) 

      if (winner || squares[i]){
        // if there is either a winner or squares[i] is no longer null, i.e. 'X', 'O'
        return; // empty return. don't execute the rest of the function. No for putting code after this into else block. 
      }
      squares[i]=this.state.xIsNext? 'X': 'O';
      this.setState({
        squares: squares,
        xIsNext: ! this.state.xIsNext // always reverses the xIsNext state.
      });
      
    }

    render() {
      const history=this.state.history;
      const current=history[history.length-1] //current board position
      const winner=calculateWinner(current.squares);

      let status;
      if (winner){
        status = 'Winner: ' + winner;
      }else{
        status = `Next player: ${this.state.xIsNext? 'X':'O' }`;
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
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
  
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  