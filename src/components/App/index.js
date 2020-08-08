import React, { useState, useEffect } from 'react';
import style from './App.module.scss';
import { Piece } from '../Piece';
import { DIRECTIONS, getSnakeHead, hasLose, getPieceToAdd, shouldEat, SIZES, getRandomFoodCoordinate } from '../../utils/utils';
import { Food } from '../Food';
import { Snake } from '../Snake';

let moveTimeout = null;
let keyUpHandlerTimeout = null;
let lastDirection = null;
let level = 1;

export const App = () => {
    const initialPecies = [{ x: 0, y: SIZES.piece }, { x: SIZES.piece, y: SIZES.piece, head: true }];
    const [isNewGame, setIsNewGame] = useState(true);
    const [pecies, setPecies] = useState(initialPecies);
    const [direction, setDirection] = useState(null);
    const [speed, setSpeed] = useState(160);
    const [foodCoordinate, setFoodCoordinate] = useState(getRandomFoodCoordinate(initialPecies))
    const [score, setScore] = useState(0);

    const handleMove = (e) => {
        if (keyUpHandlerTimeout) {
            clearTimeout(keyUpHandlerTimeout)
        }
        keyUpHandlerTimeout = setTimeout(() => {
            switch (e.keyCode) {
                case 13:
                    isNewGame && start()
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
                    setDirection(lastDirection)
                    break;
            }
        }, speed)
    }

    useEffect(() => {
        window.addEventListener('keyup', handleMove);
        const cleanUp = () => {
            window.removeEventListener('keyup', handleMove);
        };
        return cleanUp;
    }, [handleMove]);


    useEffect(() => {
        if (hasLose(pecies)) {
            startNewGame();
            alert('lose');
        } else {
            if (direction) {
                lastDirection = direction;
                hasEat();
                move();
            }
        }
    }, [pecies, direction])


    useEffect(() => {
        if (score === level * 50) {
            level++;
            setSpeed(speed * 0.9);
        }
    }, [score])

    const hasEat = () => {
        const snakeHead = getSnakeHead(pecies);
        if (shouldEat(direction, snakeHead, foodCoordinate)) {
            setScore(score + 10)
            const peiceToAdd = getPieceToAdd(direction, snakeHead);
            snakeHead.head = false;
            pecies.push(peiceToAdd);
            setPecies(pecies);
            setFoodCoordinate(getRandomFoodCoordinate(pecies))
        }
    }

    const start = () => {
        setIsNewGame(false);
        setDirection(DIRECTIONS.RIGHT)
    }

    const pause = () => {
        setDirection(direction ? null : lastDirection);
    }

    const startNewGame = () => {
        lastDirection = null
        setDirection(null);
        setIsNewGame(true)
        setPecies(initialPecies);
        setSpeed(160)
        setScore(0)
        level = 1;
    }

    const move = () => {
        if (!isNewGame) {
            if (moveTimeout) {
                clearTimeout(moveTimeout)
            }
            moveTimeout = setTimeout(() => {
                const snakeHead = getSnakeHead(pecies);
                const newPeices = pecies.slice(1);
                const newPiece = getPieceToAdd(direction, snakeHead);
                newPeices.push(newPiece);
                snakeHead.head = false;
                setPecies(newPeices);
            }, speed);
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.score} style={{ height: SIZES.piece }} > <h2>Score: {score} | Level: {level}</h2> </div>
            <Snake pecies={pecies} direction={isNewGame ? DIRECTIONS.RIGHT : direction} lastDirection={lastDirection} />
            {isNewGame && <div className={style.startTitle}> <h1>Click Enter to start</h1> </div>}
            {!isNewGame && <Food foodCoordinate={foodCoordinate} />}
        </div>)
}

