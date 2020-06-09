import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function Square(props) {
    let classes = Array()
    classes.push('square')
    if (props.isWinner) {
        classes.push('winner')
    }
    return (
        React.createElement('button', 
                            {
                                className: classes.join(' '), 
                                onClick: props.onClick
                            },
                            props.value)
    );
}

  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                isWinner={(this.props.winCombination.includes(i, 0))}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
  
    render() {
        let playBoard = []
        let rowSquares = Array()
        for (let cell = 0; cell < 9; cell++) {
            rowSquares.push(this.renderSquare(cell))
            if (rowSquares.length == 3) {
                playBoard.push(React.createElement('div', {className: 'board-row'}, rowSquares))
                rowSquares = Array()
            }
        }
        return playBoard
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const winCombination = getWinCombination(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Вернуться на ход #' + move : 'Начать заново';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Победитель: ' + winner + '!';
        } else if (this.state.stepNumber < 9) {
            status = 'Следующий игрок: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = 'Ничья!'
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        winCombination={winCombination}
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


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
        const [a, b, c] = WIN_COMBINATIONS[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null, null;
}


function getWinCombination(squares) {
    for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
        const [a, b, c] = WIN_COMBINATIONS[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return [-1, -1, -1];
}
  