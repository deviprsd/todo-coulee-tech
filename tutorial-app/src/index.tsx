import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return null;
}

// ========================================
/** Explicit type checks */
interface NullProps {}
interface NUllState {}

interface SquareProps {
  value: string,
  winSq: boolean,
  onClick: () => void
}

function Square(props: SquareProps): JSX.Element {
  return (
    <button className={`square ${props.winSq ? 'square-win' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: string[],
  width: number,
  winSqs: number[] | null,
  onClick: (i: number) => void
}

class Board extends React.Component<BoardProps, NUllState> {
  renderSquare(i: number): JSX.Element {
    console.log(this.props.winSqs?.includes(i), this.props.winSqs, i);
    return (
      <Square
        key={i.toString()}
        winSq={this.props.winSqs !== null && this.props.winSqs?.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render(): JSX.Element {
    const range = Array(this.props.width).fill(null)
    const board = range.map((v, i) => {
      return (
        <div className="board-row" key={i.toString()}>
          {range.map((x, j) => {
            return this.renderSquare((i * this.props.width) + j);
          })}
        </div>
      )
    });
    return <div>{board}</div>;
  }
}

interface History {
  squares: string[], 
  row: number, 
  col: number, 
  player: string
}

interface GameState {
  history: History[],
  stepNumber: number,
  xIsNext: boolean,
}

interface GameProps {
  width: number
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: -1,
          col: -1,
          player: '',
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          row: (i / this.props.width) | 0, // integer division
          col: (i % this.props.width),
          player: squares[i]
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winSqs = calculateWinner(current.squares);
    const winner = winSqs ? winSqs[0] : null;

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} | '${step.player}' (${step.row + 1} , ${step.col + 1})` :
        'Go to game start';
      const typographicDesc = this.state.stepNumber === move ?
        <b>{desc}</b> : 
        desc
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{typographicDesc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winSqs={winSqs}
            width={this.props.width}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game width={3} />, document.getElementById("root"));
