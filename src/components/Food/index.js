import React from 'react';
import style from './Food.module.scss'
import { SIZES } from '../../utils/constants';


export const Food = ({ foodCoordinate }) => {
    const foodStyle = { top: foodCoordinate.y, left: foodCoordinate.x, width: SIZES.piece, height: SIZES.piece };
    return <div className={style.food} style={foodStyle}>
        <img src='/apple.png' className={style.apple} width={SIZES.piece + 10} height={SIZES.piece + 10} alt=''/>
    </div>
}