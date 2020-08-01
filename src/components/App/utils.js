export const DIRECTIONS = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down'
}

export const SIZES = {
    peice: 30,
    scoreBox: 15
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

export const getRandomX = () => {
    return round(getRandomInt(window.innerWidth - SIZES.peice, 0))
}

export const getRandomY = () => {
    return round(getRandomInt(window.innerHeight - SIZES.peice, SIZES.peice))
}

export const round = (number) => {
    return Math.round(number * 1.0 / SIZES.peice) * SIZES.peice
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
            }else{
                return {}
            }
    }
}

export const getSimplePieceStyle = (x,y) =>{
    return {left: x, top: y, width: SIZES.peice, height: SIZES.peice}
}