import React, { useEffect, useState } from "react";//rafce 
import GameCircle from "./GameCircle";

import Header from "./Hy"
import Footer from "./Footer";
import { isDraw, isWinner } from "../helper";

import { GAME_STATE_PLAYING, NO_CIRCLES, PLAYER_1, NO_PLAYER, GAME_STATE_WIN, PLAYER_2, GAME_STATE_DRAW } from "../Constant";

const GameBoard = () => {

    const [gameboard, setGameboard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setwinPlayer] = useState(NO_PLAYER);

    console.log(gameboard);
    useEffect(() => {
            initGame();
    }, []);
    const initGame = () => {
        setGameboard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
    }

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const circleClicked = (id) => {
        console.log(id);

        if (gameboard[id] != NO_PLAYER) return;
        if (gameState !== GAME_STATE_PLAYING) return;
        if (isWinner(gameboard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN);
            setwinPlayer(currentPlayer);
        }

        if (isDraw(gameboard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setwinPlayer(NO_PLAYER);
        }

        setGameboard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }

    const renderCircle = id => {
        return <GameCircle key={id} id={id} className={`player_${gameboard[id]}`} onCircleClicked={circleClicked} />
    }
    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameboard">
                {initBoard()}
            </div>
            <Footer onClickEvent={initGame} />
        </>

    )
}



export default GameBoard;