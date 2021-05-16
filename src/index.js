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
        xIsNext: true,
        stepNumber: 0,
      }
      this.handleClick=this.handleClick.bind(this); //
    }
    jumpTo(step){
      this.setState({
        // update both step and xIsNext states. should trigger render method to rerender the whole board. 
        xIsNext : (step % 2)===0, //if move number is even, then x is next. 
        stepNumber : step,
      })
    }

    handleClick(i){
      /* click event handler for squares. 
      handleClick needs to calculate a winner and set the history state with an updated array with each clicked square, conditional on logic. 
      It also has to update state stepNumber so the history gets to grow! 
      */

      // pattern is to first create a copy of the Squares in History, manipulate it. then update it with setState
      
      // want the history here to be linked to step. so if step< prev history.length, history shrinks
      const history=this.state.history.slice(0,this.state.stepNumber+1) // include stepNumber in array as both stepNumber and array are 0 indexed.
      //const history=this.state.history;
      const current=history[history.length-1];
      const squares=current.squares.slice(); // take a copy of the this.state.history[history.length-1].squares array
       
      const winner=calculateWinner(squares) 
      if (winner || squares[i]){
        // if there is either a winner or squares[i] is no longer null, i.e. 'X', 'O'
        return; // empty return. don't execute the rest of the function. No for putting code after this into else block. 
      }

      squares[i]=this.state.xIsNext? 'X': 'O';

      this.setState({
        history: history.concat([{squares: squares}]), // use history.concat([array]) instead of push to create a new array! keep it pure. 
        xIsNext: ! this.state.xIsNext, // always reverses the xIsNext state.
        stepNumber: history.length, // would this.state.stepNumber+1 do? is history.length more efficient?
      });
      console.log(this.state.history);  
    }

    render() {
      const history=this.state.history;
      const current=history[history.length-1]; //current board position
      const winner=calculateWinner(current.squares);

      let status;
      if (winner){
        status = 'Winner: ' + winner;
      }else{
        status = `Next player: ${this.state.xIsNext? 'X':'O' }`;
      }
      
      // map history of moves to React elements representing buttons buttons 
      const moves=history.map((step, move)=>{
        /* 
        array.map(function(currentValue, index, arr), thisValue)
        step = currentValue, the value in the function iterated over this step. the square
        move = index , hence move 1, move 2 etc in the descriptions. 
        we don't really need the step in const moves at all, 
        alternative way to do it is to have const moves = new Array(history.length).map((value,index)=> index);

        Whenever one is building dynamic lists, one should assign proper keys to list items to help React keep track of item updates.
        That is, the key should be unique for each item in the list.
        Furthermore, it should not be based on index, which is the default if key property is not assigned. This will allow it to track reorderings, additions etc in the rendered list. 
        
        history -> derive from history index -> jumpTo(move) event handler -> updates state's stepNumber
        */
        const desc = move? 
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={()=>{this.jumpTo(move)}}>{desc}</button>
          </li>
        );
      });

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
  