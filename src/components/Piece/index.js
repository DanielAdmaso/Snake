import React from 'react';
import style from './Piece.module.scss';
import { getSimplePieceStyle } from '../../utils/utils';

export const Piece = ({ x, y }) => {
    const pieceStyle = getSimplePieceStyle(x, y);
    return <div className={style.piece} style={pieceStyle} />
}

