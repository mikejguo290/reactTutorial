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
    constructor(props){
      super(props);
      this.state={ 
        squares: Array(9).fill(null), // create a state key of squares and its value is an array of length 9, filled with nulls.
        xIsNext: true // X goes firest
      }
    }

    handleClick(i){
      // Replace this.state.squares, first create a copy, manipulate late it. then update it with setState
      const squares=this.state.squares.slice(); // take a copy of the this.state.squares array
      squares[i]=this.state.xIsNext? 'X': 'O';
      this.setState({
        squares: squares,
        xIsNext: ! this.state.xIsNext // always reverses the xIsNext state.
      });
    }

    renderSquare(i) {
      return (
      <Square 
        value={this.state.squares[i]} 
        onClick={()=> this.handleClick(i)}  
        />
      )
    }
  
    render() {
      const status = `Next player: ${this.state.xIsNext? 'X':'O' }`;
  
      return (
        <div>
          <div className="status">{status}</div>
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  