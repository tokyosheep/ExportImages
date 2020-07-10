import * as React from "react";
import {FormType} from "./type";
type Numbers = FormType<number> & {max:number,min:number};


export const StdNumberBox = ({name,max,min,value,func,arg,disabled=false}:Numbers) =>(
    <label className="stdNumber">
        <p>{name}</p>
        <input type="number" className="stdNumber__input" disabled={disabled} max={max} min={min} value={value} onChange={(e)=>func(e,arg)}/>
    </label>
);

export const StdTextBox = ({name,value,func,arg,disabled=false}:FormType<string>) =>(
    <label className="stdText">
        <p>{name}</p>
        <input type="text" className="stdText__input" disabled={disabled} value={value} onChange={(e)=>func(e,arg)}/>
    </label>
);