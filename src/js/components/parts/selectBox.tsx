import * as React from "react";

export const PrestSelectForm = ({jsonList,selected,func}:{jsonList:any[],selected:string,func:(e)=>void}) =>{
    const names = jsonList.map(data => <option key={data.name} value={data.name}>{data.name}</option>);
    return(
        <div className="selector-wrap">
            <select className="selector__select" value={selected} onChange={(e)=>func(e)}>
                {names}
            </select>
        </div>
    )
}