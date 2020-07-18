import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {useMemo,useState} from "react";
import {AIReceive} from "../../connection/AICommunicate";
import AIMain from "./AIMain";
import PlacedList from "./placedList";
import AsideMenu from "./asideMenu";
import {reloadEvent,resizeWindow} from "../../fileSystem/init.js";
import HeaderMainButtons from "./Header";
const LayoutAI = (prop) =>{
    console.log(prop);
    useMemo(()=>{
        (async()=>{
            resizeWindow(500,300);
            reloadEvent();
            AIReceive(prop.set_List);
        })();
    },[]);
    return(
        <div className="container-AI">
            <HeaderMainButtons />
            {/*<AsideMenu />*/}
            <AIMain />
            {/*<PlacedList />*/}
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(LayoutAI);