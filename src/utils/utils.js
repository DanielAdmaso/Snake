import { DIRECTIONS, SIZES } from '../utils/constants';

export const hasLose = (pecies) => touchInLimits(pecies) || touchInBody(pecies);

const touchInLimits = (pecies) => {
    const snakeHead = getSnakeHead(pecies);
    return snakeHead && (snakeHead.x >= window.innerWidth - SIZES.piece || snakeHead.x < 0 || snakeHead.y >= window.innerHeight - SIZES.piece || snakeHead.y < SIZES.piece)
}

const touchInBody = (pecies) => {
    const snakeBody = deepCopy(pecies);
    const snakeHead = snakeBody.pop();
    return snakeBody.some(p => p.x === snakeHead.x && p.y === snakeHead.y);
}

export const shouldEat = (direction, snakeHead, foodCoordinate) => {
    const { x: snakeX, y: snakeY } = snakeHead;
    const { x: foodX, y: foodY } = foodCoordinate;
    switch (direction) {
        case DIRECTIONS.RIGHT:
            return snakeX === foodX - SIZES.piece && snakeY === foodY;
        case DIRECTIONS.LEFT:
            return snakeX === foodX + SIZES.piece && snakeY === foodY;
        case DIRECTIONS.UP:
            return snakeY === foodY + SIZES.piece && snakeX === foodX;
        case DIRECTIONS.DOWN:
            return snakeY === foodY - SIZES.piece && snakeX === foodX;
        default:
            break;
    }
}

export const getPieceToAdd = (direction, snakeHead) => {
    switch (direction) {
        case DIRECTIONS.RIGHT:
            return { ...snakeHead, x: snakeHead.x + SIZES.piece }
        case DIRECTIONS.LEFT:
            return { ...snakeHead, x: snakeHead.x - SIZES.piece }
        case DIRECTIONS.UP:
            return { ...snakeHead, y: snakeHead.y - SIZES.piece }
        case DIRECTIONS.DOWN:
            return { ...snakeHead, y: snakeHead.y + SIZES.piece }
        default:
            break;
    }
}

export const getSnakeHead = (pecies) => {
    return pecies[pecies.length - 1]
}

export const getSnakeTail = (pecies) => {
    return pecies[0]
}

export const getRandomInt = (max, min) => {
    return Math.random() * (max - min) + min;
}

export const getRandomFoodCoordinate = (pecies) =>{
    const randomCoordinate = { x: getRandomX(), y: getRandomY() };
    if(pecies.some(p => p.x === randomCoordinate.x && p.y === randomCoordinate.y)){
        return getRandomFoodCoordinate(pecies)
    }
    return randomCoordinate;
} 

export const getRandomX = () => {
    return round(getRandomInt(window.innerWidth - SIZES.piece - 15, 0))
}

export const getRandomY = () => {
    return round(getRandomInt(window.innerHeight - SIZES.piece - 15, SIZES.piece))
}

export const round = (number) => {
    return Math.round(number * 1.0 / SIZES.piece) * SIZES.piece
}

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const getHeadRadius = (direction, lastDirection) => {
    switch (direction) {
        case DIRECTIONS.RIGHT:
            return {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0
            }
        case DIRECTIONS.LEFT:
            return {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8
            }
        case DIRECTIONS.UP:
            return {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 8
            }
        case DIRECTIONS.DOWN:
            return {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 0
            }
        default:
            if (lastDirection) {
                return getHeadRadius(lastDirection)
            } else {
                return {}
            }
    }
}

export const getHeadTransform = (direction) => {
    switch (direction) {
        case DIRECTIONS.RIGHT:
            return {
                transform: "rotate(-90deg)",
                top: "-14px",
                right: "10px"
            }
        case DIRECTIONS.LEFT:
            return {
                transform: "rotate(90deg)",
                top: "-14px",
                right: "18px"
            }
        case DIRECTIONS.UP:
            return {
                transform: "rotate(180deg)",
                top: "-19px",
                right: "14px"
            }
        case DIRECTIONS.DOWN:
            return {
                transform: "rotate(0deg)",
                top: "-9px",
                right: "14px"
            }
        default:
            if (direction) {
                return getHeadTransform(direction)
            } else {
                return {
                    transform: "rotate(-90deg)",
                    top: "-14px",
                    right: "10px"
                }
            }
    }
}

export const getSimplePieceStyle = (x, y) => {
    return { left: x, top: y, width: SIZES.piece, height: SIZES.piece }
}