import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../../redux/actions/mapDispatchProps";

import {InitPS} from "../../../redux/reducer/type";
import JsxButton from "../JsxButton";
import SwitchModeButton from "../switchMode";

const CompactMode = (prop:{state:{PSReducer:InitPS}}) =>{
    const [state,setState]:[InitPS,(v:InitPS)=>void] = useState(prop.state.PSReducer);
    useMemo(()=> setState(prop.state.PSReducer),[prop.state.PSReducer]);
    const isImport = state.moreOptions.export;
    const extList = [];
    Object.entries(isImport ? state.moreOptionsExt : state.extensions).forEach(([key,value])=>{
        extList.push(<li key={key} className={ value ? "checkedOn" : "checkedOff"}>{key}</li>);
    });
    const options = [];
    Object.entries(state.options).forEach(([key,value])=>{
        options.push(<li key={key} className={ value ? "checkedOn" : "checkedOff"}>{key}{typeof value === "number" ? " :"+ value : ""}</li>);
    });
    const moreOptions = [];
    Object.entries(state.moreOptions).forEach(([key,value])=>{
        moreOptions.push(<li key={key} className={ value ? "checkedOn" : "checkedOff"}>{key}</li>)
    })
    return(
        <div className="compactMode">
            <h3 className="head-small">extensions</h3>
            <ul className="compactMode__list">{extList}</ul>
            <h3 className="head-small">options</h3>
            <ul className="compactMode__list">{options}</ul>
            <ul className="compactMode__list">{moreOptions}</ul>
            <ul className="compactMode__buttons">
                <li>
                    <JsxButton />
                </li>
                <li>
                    <SwitchModeButton />
                </li>
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(CompactMode);