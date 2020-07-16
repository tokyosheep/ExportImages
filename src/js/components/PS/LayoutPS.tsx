import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {useMemo,useState} from "react";

import Header from "./header";
import MainOptions from "./main";
import AsideOptions from "./asideOptions";
import FooterMainButton from "./footer";
import CompactMode from "./compactMode/compactMain";
import PresetMode from "./presetMode/presetMode";

import Prests from "./Presets";
import {PSReceive} from "../../connection/PScommunicate";
import {resizeWindow} from "../../fileSystem/init.js";
const LayoutPS = (prop):React.ReactElement =>{
    const [mode,setMode]:[string,(v:string)=>void] = useState(prop.state.PSModeReduce);
    useMemo(()=>setMode(prop.state.PSModeReduce),[prop.state.PSModeReduce]);
    let htmlElemnts:React.ReactElement;
    window.scrollTo(0,0);
    switch(mode){
        case "normal":
            htmlElemnts = (
                <>
                    <Header />
                    <MainOptions />
                    <AsideOptions />
                    <Prests />
                    <FooterMainButton />
                </>
            );
            resizeWindow(1000,700);
        break;

        case "compact":
            htmlElemnts = (
                <CompactMode />
            );
            resizeWindow(450,400);
        break;

        case "preset":
            htmlElemnts = (
                <PresetMode />
            );
            resizeWindow(700,500);
        break; 
    }
    useMemo(()=> {
        (async()=>{
            await PSReceive();
        })();
    },[])
    return(
        <div className="container-PS">
            {htmlElemnts}
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(LayoutPS);