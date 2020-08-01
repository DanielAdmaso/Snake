import React from 'react';
import style from './Peice.module.scss';
import { SIZES, getSimplePieceStyle } from '../App/utils';
import { SnakeHead } from '../SnakeHead';

export const Peice = ({ x, y, head, direction }) => {
    const headStyle = getSimplePieceStyle(x,y);
    return head ? <SnakeHead x={x} y={y} direction={direction} /> : 
    <div className={style.peice} style={headStyle} />
}

