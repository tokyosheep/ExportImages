import * as React from "react";
import {FormType} from "./type";

export const StdButton = ({name,arg,func}:FormType<boolean>) =>(
    <button className="stdButton" onClick={()=>func(arg)}>{name}</button>
)

export const LargeButton = ({name,arg,func}:FormType<boolean>) =>(
    <button className="largeButton" onClick={()=>func(arg)}>{name}</button>
)