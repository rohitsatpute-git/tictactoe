import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//comment to see changes

function Square (props) {
   
 
      return (
        <button className="square" onClick={()=>
           {props.onClick()}
        }>
          {props.value}
        </button>
      );
    
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state={
            squares :Array(9).fill(null),
            cur:'X',
            gameover:false,
            hasstart:false
        };
    }
    renderSquare(i) {
      return (<Square 
      value={this.state.squares[i]}
      onClick={()=>{this.handleclick(i)}}
      />
      );
    
    }
  handlestart=()=>{
    return this.state.hasstart;
  }

    handleclick=(i)=>{
     this.setState({hasstart:true});
    const squares=this.state.squares.slice();
    if(this.calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i]=this.state.cur;

    let cnt=0;
    for(let i=0; i<9; i++){
      if(squares[i]) {
        cnt=cnt+1;
      }
    }
    if(this.state.cur=='X') {
      this.setState({cur:'O'});
  }else{
      this.setState({cur:'X'})
  }
  this.setState({squares:squares});
   
    if(cnt==9) {
      this.state.gameover=1;
      return;
    }
    
    }

     calculateWinner=(squares)=> {
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
  
    render() {
     
    const winner=this.calculateWinner(this.state.squares);
    let status;
    if(winner){
        status='Winner: ' +winner
     }else if(this.state.gameover){
        status='Draw';
     }
     else if(this.handlestart()){
         status=  'Next player: '+
         this.state.cur
     }else{
      status='Lets Begin'
     }

      return (
        <div>
          <div className="status">
          
          {status}
            </div>
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

  class Board2 extends React.Component{

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
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  