import React,{useState} from "react";
import Board from "./Board";
const Game=()=>{
    const [history,setHistory]=useState([Array(9).fill(null)]);
    const [stepNumber,setStepNumber]=useState(0);
    const [xlsNext,setXlsNext]=useState(true);
    const handleClick=(i)=>{
        const historyCopy=history.slice(0,stepNumber+1);
        const current=historyCopy[historyCopy.length-1];
        const squares = [...current];
        if(calculateWinner(squares)|| squares[i]){return;}
        squares[i]=xlsNext?'✔️':'❌';
        setHistory([...historyCopy,squares]);
        setStepNumber(historyCopy.length);
        setXlsNext(!xlsNext);
    };
    const JumpTo=(step)=>{
        setStepNumber(step);
        setXlsNext(step%2===0);
    };
    const current=history[stepNumber];
    const winner=calculateWinner(current);
    const moves=history.map((step,move)=>{
        const desc=move ? `Go to move #${move}` : 'Go to game start';
        return(
            <li key={move}>
                <button onClick={()=>JumpTo(move)}>{desc}</button>
            </li>
        );
    });
    let status;
    if(winner){
        status = `Winner: ${winner}`;
    }else if(stepNumber===9){
        status='Draw';
    }else{
        status = `Nextplayer: ${xlsNext?'✔️':'❌'}`;
    }
    return(
        <div className="game">
            <h1 className="heading"> TIC TAC TOE </h1>
            <div className="game-board">
                <Board squares={current} onClick={handleClick}/>
            </div>
            <div className="game-info">
                <div> {status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};
const calculateWinner=(squares)=>{
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i=0;i<lines.length;i++){
        const [a,b,c]=lines[i];
        if (squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}
export default Game;