import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {LargeButton} from "../parts/button";
import {sendFromPS} from "../../connection/PScommunicate";
import {getPhotoshopImages,validateProp} from "../../fileSystem/getPhotoshopImg";
import {SendHostScript} from "../../fileSystem/connectHostJsx";
import {extensionRoot} from "../../fileSystem/init.js";
import bs from "../../fileSystem/basicSystem";
const FooterMainButton = (prop) =>{
    const sendToIllustrator = async() =>{
        const images = await getPhotoshopImages();
        if(!Array.isArray(images)){
            alert("nothing");
            return false;
        }
        const send = sendFromPS();
        send.sendMsg(images);
    }
    const JSXprocess = async() =>{
        if(!validateProp(prop.state.PSReducer))return;
        const send = new SendHostScript("PSfunc");
        await bs.writeFile(extensionRoot+"data.json",prop.state.PSReducer);
        console.log(prop.state.PSReducer);
        const flag = await send.callHostScript(prop.state.PSReducer);
        console.log(flag);
    }
    return(
        <footer className="footer mainButtonForm">
            <ul>
                <li>
                    <LargeButton name="send to Illustrator images" func={sendToIllustrator}/>
                </li>
                <li>
                    <LargeButton name="done" func={JSXprocess}/>
                </li>
            </ul>
        </footer>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(FooterMainButton);