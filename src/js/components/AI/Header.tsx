import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {useMemo,useState} from "react";
import {StdButton} from "../parts/button";

import {getPlacedImages} from "../../fileSystem/getImagesOnAi";
import {shifImages} from "../../fileSystem/getImagesOnAi";
import {SendHostScript} from "../../fileSystem/connectHostJsx";
import {sendFromAI} from "../../connection/AICommunicate";
const HeaderMainButtons = (prop) =>{
    const handleGetPlaced = async():Promise<void|boolean> =>{
        const images = await getPlacedImages();
        if(!images)return false;
        prop.get_Placed(images);
    }

    const handleReplaceImages = async() =>{
        const AIimg = JSON.parse(JSON.stringify(prop.state.AIReplaceReducer));
        const replaces = JSON.parse(JSON.stringify(prop.state.AIPlacedImgs));
        await shifImages(AIimg,replaces);
        await handleGetPlaced();
    }

    const sendPlacesPhotoshop = async() =>{
        const send = new SendHostScript("getPlacedFullPath.jsx");
        let p = await send.callJsx().catch(e=> console.log(e));
        if(typeof p !== "string")return;
        const placedItems:string[] = JSON.parse(p);
        console.log(placedItems);
        if(!Array.isArray(placedItems) || placedItems.length < 1)return false;
        const connect = sendFromAI();
        connect.sendMsg(placedItems);
    }

    return(
        <header className="AIheader">
            <h1 className="head-large">export images</h1>
            <div className="AIheader__mainButtons">
                <StdButton name="get replaced images" func={handleGetPlaced}/>
                <StdButton name="replace Images" func={handleReplaceImages}/>
                <StdButton name="send to Photoshop" func={sendPlacesPhotoshop}/>
            </div>
        </header>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(HeaderMainButtons);