import React from 'react';
import style from './SnakeHead.module.scss';
import { getHeadTransform, getSimplePieceStyle } from '../../utils/utils';
import { SIZES } from '../../utils/constants';


export const SnakeHead = ({ x, y, direction }) => {
    const headWrapperStyle = { ...getSimplePieceStyle(x,y) };
    const headStyle = {width: SIZES.piece + 28, height: SIZES.piece + 28 ,...getHeadTransform(direction)};
    return <div className={style.headWrapper} style={headWrapperStyle}>
        <img src='/snake_head.png' className={style.head} style={headStyle} alt=''/>
    </div>
}

