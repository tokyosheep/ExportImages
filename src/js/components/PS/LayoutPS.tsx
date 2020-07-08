import * as React from "react";
import {useMemo} from "react";
import {StdButton} from "../parts/button";
import Header from "./header";
import MainOptions from "./main";
import AsideOptions from "./asideOptions";
import FooterMainButton from "./footer";
import CompactMode from "./compactMode/compactMain";
import PresetMode from "./presetMode/presetMode";

import Prests from "./Presets";
import {PSReceive} from "../../connection/PScommunicate";

const LayoutPS = ():React.ReactElement =>{
    useMemo(()=> {
        (async()=>{
            await PSReceive();
        })();
    },[])
    return(
        <div className="container-PS">
            <Header />
            <MainOptions />
            <AsideOptions />
            <Prests />
            <FooterMainButton />
        </div>
    )
}

export default LayoutPS;