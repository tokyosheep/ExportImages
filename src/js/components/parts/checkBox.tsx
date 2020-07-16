import * as React from "react";
import {FormType} from "./type";


export const ExtCheckBox = ({name,arg,func,value,disabled=false}:FormType<boolean>) =>(
    <label className="ExtCheckbox">
        <input type="checkbox" className="ExtCheckbox__input" checked={value} onChange={(e)=>func(e,arg)} disabled={disabled}/>
        <div className="ExtCheckbox__display">{name}</div>
    </label>
);

export const StdCheckBox = ({name,arg,func,value,disabled=false}:FormType<boolean>) =>(
    <label className="StdCheckbox">
        <input type="checkbox" className="StdCheckbox__input" checked={value} onChange={(e)=>func(e,arg)} disabled={disabled}/>
        <div className="StdCheckbox__display">{name}</div>
    </label>
);

export const FileCheckBox = ({name,arg,func,value,disabled=false}:FormType<boolean>) =>(
    <label className="FileCheckbox">
        <input type="checkbox" className="FileCheckbox__input" checked={value} onChange={(e)=>func(e,arg)} disabled={disabled}/>
        <div className="FileCheckbox__display">{name}</div>
    </label>
);
