import React, { useState, useEffect } from 'react';
import style from './Snake.module.scss';
import { Piece } from '../Piece';
import { DIRECTIONS } from '../../utils/utils';
import { SnakeHead } from '../SnakeHead';

export const Snake = ({ pecies, direction, lastDirection }) => {
    return pecies.map((piece, i) => {
        return piece.head ?
            <SnakeHead x={piece.x} y={piece.y} direction={direction || lastDirection || DIRECTIONS.RIGHT} /> :
            <Piece key={`piece-${i}`} x={piece.x} y={piece.y} />
    })
}