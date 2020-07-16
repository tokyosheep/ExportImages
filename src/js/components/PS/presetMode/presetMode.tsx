import * as React from "react";
import {useState,useEffect} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../../redux/actions/mapDispatchProps";

import {readJSON} from "../../../fileSystem/presetSystem";
import {InitPS} from "../../../redux/reducer/type";
import {Extension,Options,MoreOptions} from "../../../redux/reducer/type";
import SwitchModeButton from "../switchMode";
type PropType = InitPS & {name:string};
type Properties = Extension | Options | MoreOptions;

const ListElements = (obj:Properties) =>{
    const array = [];
    Object.entries(obj).forEach(([key,value])=>{
        array.push(<li key={key} className={value === true ? "checkedOn" : "checkedOff"}>{key} {typeof value === "number" ? " :" + value: ""}</li>)
    });
    return array;
}

const DataProperty = (prop:PropType) =>{
    const exts = ListElements(prop.extensions);
    const options = ListElements(prop.options);
    const moreOptions = ListElements(prop.moreOptions);
    return(
        <div className="jsonProp">
            <h3 className="head-small">{prop.name}</h3>
            <ul className="jsonProp__exts">
                {exts}
            </ul>
            <ul className="jsonProp__options">
                {options}
            </ul>
            <ul className="jsonProp__moreOptions">
                {moreOptions}
            </ul>
            <p>folder path :{prop.folder}</p>
        </div>
    )
}

const PresetMode = () =>{
    const [presets,setPrests]:[PropType[],(d:PropType[])=>void] = useState([]);
    useEffect(()=>{
        (async()=>{
            const json = await readJSON();
            setPrests(json);
        })();
    },[]);
    const JsonList = presets.map(data=> <li key={data.name}>{DataProperty(data)}</li>)
    return(
        <div className="presetContainer">
            <ul className="jsonList">
                {JsonList}
            </ul>
            <SwitchModeButton />
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(PresetMode);