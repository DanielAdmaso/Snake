import React, { useState, useEffect } from 'react';
import style from './Food.module.scss'
import { SIZES } from '../App/utils';

export const Food = ({foodCordinate}) =>{
    return <div className={style.food} style={{top:foodCordinate.y, left: foodCordinate.x, width: SIZES.peice, height:SIZES.peice }}></div>
}