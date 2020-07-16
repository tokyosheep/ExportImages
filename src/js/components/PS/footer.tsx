import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {LargeButton} from "../parts/button";
import {sendFromPS} from "../../connection/PScommunicate";
import {getPhotoshopImages} from "../../fileSystem/getPhotoshopImg";
import JsxButton from "./JsxButton";
import SwitchModeButton from "./switchMode";
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
    
    return(
        <footer className="footer mainButtonForm">
            <ul>
                <li>
                    <LargeButton name="send to Illustrator images" func={sendToIllustrator}/>
                </li>
                <li>
                    <JsxButton />
                </li>
                <li>
                    <SwitchModeButton />
                </li>
            </ul>
        </footer>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(FooterMainButton);