import * as React from "react";

import {FormType} from "./type"; 
export const StdRadio = ({name,func,arg,value}:FormType<boolean>) =>(
    <label className="stdRadio">
        <input type="radio" className="stdRadio__input" checked={value} onChange={(e)=>func(e,arg)} />
        {name}
        <div className="stdRadio__display"></div>
    </label>
);

export const ExtRadio = ({name,func,arg,value}:FormType<boolean>) =>(
    <label className="extRadio">
        <input type="radio" className="extRadio__input" checked={value} onChange={(e)=>func(e,arg)} />
        {name}
        <div className="extRadio__display"></div>
    </label>
)