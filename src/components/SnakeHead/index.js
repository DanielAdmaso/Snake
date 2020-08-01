import React from 'react';
import style from './SnakeHead.module.scss';
import { SIZES, getHeadRadius, getSimplePieceStyle } from '../App/utils';

export const SnakeHead = ({ x, y, direction }) => {
    const headStyle = { ...getSimplePieceStyle(x,y), ...getHeadRadius(direction) };
    return <div className={style.headWrapper} style={headStyle}>
    </div>
}

