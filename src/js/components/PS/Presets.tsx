import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import { useEffect } from "react";

import {StdButton} from "../parts/button";
import {StdTextBox} from "../parts/textBox";
import {PrestSelectForm} from "../parts/selectBox";
import {readJSON} from "../../fileSystem/presetSystem";
import bs from "../../fileSystem/basicSystem";
import {extFolder} from "../../fileSystem/init.js";

import {InitPS} from "../../redux/reducer/type";
const JSONPath = extFolder + "/preset.json";

const Prests = (prop) =>{
    const [selectList,setSelectList]:[InitPS[],(array:InitPS[])=>void] = useState([]);
    const [selected,setSeleted]:[string,(v:string)=>void] = useState("");
    const [text,setText]:[string,(v:string)=>void] = useState("");
    useEffect(()=>{
        (async()=>{
            const JsonData = await readJSON();
            setSelectList(JsonData);
            setSeleted(JsonData[0].name !== undefined ? JsonData[0].name : "");
        })();
    },[]);
    const setValue = (e) =>{
        setSeleted(e.target.value);
    }
    const handleTextBox = (e) =>{
        setText(e.target.value);
    }
    const writeJson = async() =>{
        const json = await readJSON().catch(e=> alert(e));
        const flag = json.map( d=> d.name).some(name=> name === text);
        if(flag){
            alert("the name was already registered");
            return false;
        }
        const data = prop.state.PSReducer;
        data.name = text;
        json.push(data);
        await bs.writeFile(JSONPath,json);
        setSelectList(json);
        alert("your preset was registered");
    }

    const deleteJson = async() =>{
        const da = await readJSON();
        const json = da.filter(d=> d.name !== selected);
        console.log(selected);
        console.log(json);
        await bs.writeFile(JSONPath,json);
        setSelectList(json);
        alert("your preset was deleted");
        setSeleted(json[0].name !== undefined ? json[0].name : "");
    }

    const applyJson = async() =>{
        try{
            const json = await readJSON();
            const applyData = json.find(d => d.name === selected);
            console.log(applyData);
            if(applyData === undefined)throw Error("json data was undefined");
            prop.set_Json(applyData);
        }catch(e){
            alert(e);
            return false;
        }
    }
    return(
        <div className="presets">
            <h3 className="head-small">presets</h3>
            <ul className="presetsForm">
                <li>
                    <PrestSelectForm jsonList={selectList} selected={selected} func={setValue}/>
                </li>
                <li>
                    <StdButton name="apply" func={applyJson} />
                </li>
                <li>
                    <StdButton name="delete" func={deleteJson}/>
                </li>
                    <StdTextBox name="pereset name" value={text} func={handleTextBox} />
                <li>
                    <StdButton name="add preset" func={writeJson}/>
                </li>
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(Prests);