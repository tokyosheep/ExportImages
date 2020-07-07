import * as React from "react";
import {useMemo,useState,useEffect} from "react";
import LayoutPS from "./PS/LayoutPS";
import LayoutAI from "./AI/LayoutAI";

import {appID,init} from "../fileSystem/init";
const Base = ():React.ReactElement =>{
    const [app,setApp] = useState("");
    useEffect(()=>init(),[]);
    useMemo(()=>{
        console.log(appID);
        setApp(appID);
    },[appID]);
    let mainContent:unknown;
    if(app==="ILST")mainContent = <LayoutAI />;
    if(app=="PHXS")mainContent = <LayoutPS />;
    return(
        <>
            {mainContent}
        </>
    )
}

export default Base