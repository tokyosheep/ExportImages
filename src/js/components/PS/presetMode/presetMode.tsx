import * as React from "react";
import {useState,useEffect} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../../redux/actions/mapDispatchProps";

import {readJSON} from "../../../fileSystem/presetSystem";
import {InitPS} from "../../../redux/reducer/type";
import {Extension,Options,MoreOptions} from "../../../redux/reducer/type";
type PropType = InitPS & {name:string};
type Properties = Extension | Options | MoreOptions;

const ListElements = (obj:Properties) =>{
    const array = [];
    Object.entries(obj).forEach(([key,value])=>{
        array.push(<li key={key}>{key} :{value}</li>)
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
            <ul>
                {exts}
            </ul>
            <ul>
                {options}
            </ul>
            <ul>
                {moreOptions}
            </ul>
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
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(PresetMode);