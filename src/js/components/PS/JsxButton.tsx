import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {SendHostScript} from "../../fileSystem/connectHostJsx";
import {extensionRoot} from "../../fileSystem/init.js";
import {validateProp} from "../../fileSystem/getPhotoshopImg";
import {LargeButton} from "../parts/button";
import bs from "../../fileSystem/basicSystem";
const JsxButton = (prop) =>{
    const JSXprocess = async() =>{
        if(!validateProp(prop.state.PSReducer))return;
        prop.set_On();
        try{
            const send = new SendHostScript("PSfunc");
            await bs.writeFile(extensionRoot+"data.json",prop.state.PSReducer);
            console.log(prop.state.PSReducer);
            const flag = await send.callHostScript({prop:prop.state.PSReducer,func:"saveProcess"});
            console.log(flag);
        }catch(e){
            alert(e);
        }finally{
            prop.set_Off();
        }
    }
    return(
        <LargeButton name="done" func={JSXprocess}/>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(JsxButton);