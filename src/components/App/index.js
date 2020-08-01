import React, { useState, useEffect } from 'react';
import style from './App.module.scss';
import { Peice } from '../Peice';
import { DIRECTIONS, getSnakeHead, getRandomX, getRandomY, deepCopy, SIZES } from './utils';
import { Food } from '../Food';

let timeout = null;
let lastDirection = null;
let level = 1;
export const App = () => {
    const initialPecies = [{ x: 0, y: SIZES.peice }, { x: SIZES.peice, y: SIZES.peice, head: true }];
    const [isNewGame, setIsNewGame] = useState(true);
    const [pecies, setPecies] = useState(initialPecies);
    const [direction, setDirection] = useState(null);
    const [speed, setSpeed] = useState(8);
    const [foodCordinate, setFoodCordinate] = useState({ x: getRandomX(), y: getRandomY() })
    const [score, setScore] = useState(0);

    const handleMove = (e) => {
        switch (e.keyCode) {
            case 13:
                start()
                break;
            case 32:
                pause()
                break;
            case 37:
                !isNewGame && direction !== DIRECTIONS.RIGHT && setDirection(DIRECTIONS.LEFT)
                break;
            case 38:
                !isNewGame && direction !== DIRECTIONS.DOWN && setDirection(DIRECTIONS.UP)
                break;
            case 39:
                !isNewGame && direction !== DIRECTIONS.LEFT && setDirection(DIRECTIONS.RIGHT);
                break;
            case 40:
                !isNewGame && direction !== DIRECTIONS.UP && setDirection(DIRECTIONS.DOWN)
                break;
            default:
                setDirection(null)
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleMove);
        const cleanUp = () => {
            window.removeEventListener('keyup', handleMove);
        };
        return cleanUp;
    }, [handleMove]);


    useEffect(() => {
        if (!hasLose() && direction) {
            hasEat();
            lastDirection = direction;
            move();
        }
    }, [pecies, direction])


    useEffect(() => {
        if (score === level * 50) {
            level++;
            setSpeed(speed * 0.9);
        }
    }, [score])

    const hasLose = (e) => {
        const snakeHead = getSnakeHead(pecies);
        if (touchInLimits(snakeHead) || touchInBody()) {
            alert('lose');
            startNewGame();
            return true;
        }
    }


    const touchInLimits = (snakeHead) => {
        return snakeHead && (snakeHead.x >= window.innerWidth - 5 || snakeHead.x < 0 || snakeHead.y >= window.innerHeight - 5 || snakeHead.y < 15)
    }

    const touchInBody = () => {
        const snakeBody = deepCopy(pecies);
        const snakeHead = snakeBody.pop();
        return snakeBody.some(p => p.x === snakeHead.x && p.y === snakeHead.y);
    }

    const hasEat = () => {
        const snakeHead = getSnakeHead(pecies);
        // console.log({x:snakeHead.x, y: snakeHead.y, foodCordinateX: foodCordinate.x, foodCordinateY: foodCordinate.y})
        if (shouldEat(snakeHead)) {
            setScore(score + 10)
            const peiceToAdd = getPieceToAdd(snakeHead);
            snakeHead.head = false;
            pecies.push(peiceToAdd);
            setPecies(pecies);
            setFoodCordinate({ x: getRandomX(), y: getRandomY() })
        }
    }

    const shouldEat = (snakeHead) => {
        const { x: snakeX, y: snakeY } = snakeHead;
        const { x: foodX, y: foodY } = foodCordinate;
        switch (direction) {
            case DIRECTIONS.RIGHT:
                return snakeX === foodX - SIZES.peice && snakeY === foodY;
            case DIRECTIONS.LEFT:
                return snakeX === foodX + SIZES.peice && snakeY === foodY;
            case DIRECTIONS.UP:
                return snakeY === foodY + SIZES.peice && snakeX === foodX;
            case DIRECTIONS.DOWN:
                return snakeY === foodY - SIZES.peice && snakeX === foodX;
            default:
                break;
        }
    }
    const getPieceToAdd = (snakeHead) => {
        switch (direction) {
            case DIRECTIONS.RIGHT:
                return { ...snakeHead, x: snakeHead.x + SIZES.peice }
            case DIRECTIONS.LEFT:
                return { ...snakeHead, x: snakeHead.x - SIZES.peice }
            case DIRECTIONS.UP:
                return { ...snakeHead, y: snakeHead.y - SIZES.peice }
            case DIRECTIONS.DOWN:
                return { ...snakeHead, y: snakeHead.y + SIZES.peice }
            default:
                break;
        }
    }

    const start = () => {
        if (isNewGame) {
            setIsNewGame(false);
            setDirection(DIRECTIONS.RIGHT)
        }
    }

    const pause = () => {
        setDirection(direction ? null : lastDirection);
    }

    const startNewGame = () => {
        setDirection(null);
        setIsNewGame(true)
        setPecies(initialPecies);
        setSpeed(10)
        setScore(0)
        level = 1;
        lastDirection = null
    }

    const move = () => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            const snakeHead = getSnakeHead(pecies);
            const newPeices = pecies.slice(1);
            const newPiece = getPieceToAdd(snakeHead);
            newPeices.push(newPiece);
            snakeHead.head = false;
            setPecies(newPeices);
        }, speed * 20);
    }

    return <div className={style.app}>
        <div className={style.score} style={{ height: SIZES.peice }} > Score: {score} | Level: {level} </div>
        {pecies.map((peice, i) => <Peice key={`peice-${i}`} x={peice.x} y={peice.y} head={peice.head} direction={direction || lastDirection || DIRECTIONS.RIGHT} />)}
        {isNewGame &&<div className={style.startTitle}> <h1 >Click Enter to start</h1> </div>}
        {!isNewGame && <Food foodCordinate={foodCordinate} />}
    </div>
}

