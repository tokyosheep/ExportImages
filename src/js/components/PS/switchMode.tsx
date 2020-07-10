import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {LargeButton} from "../parts/button";

const SwitchModeButton = (prop) =>{
    const [mode,setMode]:[string,(v:string)=>void] = useState(prop.state.PSModeReduce);
    useMemo(()=>setMode(prop.state.PSModeReduce),[prop.state.PSModeReduce]);
    const swtchMode = (arg:{mode:string}) =>{
        prop.set_Mode(arg.mode);
    }
    return(
        <LargeButton name="switch mode" arg={{mode:mode}} func={swtchMode}/>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(SwitchModeButton);