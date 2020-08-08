import React from 'react';
import { Piece } from '../Piece';
import { SnakeHead } from '../SnakeHead';
import { DIRECTIONS } from '../../utils/constants';

export const Snake = ({ pecies, direction, lastDirection }) => {
    return pecies.map((piece, i) => {
        return piece.head ?
            <SnakeHead  key={`piece-${i}`} x={piece.x} y={piece.y} direction={direction || lastDirection || DIRECTIONS.RIGHT} /> :
            <Piece key={`piece-${i}`} x={piece.x} y={piece.y} />
    })
}