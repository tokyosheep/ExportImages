import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {useMemo,useState} from "react";
import {StdButton} from "../parts/button";

import {getPlacedImages} from "../../fileSystem/getImagesOnAi";
import {shifImages,replaceSelected} from "../../fileSystem/getImagesOnAi";
import {SendHostScript} from "../../fileSystem/connectHostJsx";
import {sendFromAI} from "../../connection/AICommunicate";
const HeaderMainButtons = (prop) =>{
    const handleGetPlaced = async():Promise<void|boolean> =>{
        const images = await getPlacedImages();
        if(!images)return false;
        prop.get_Placed(images);
    }
    /*
    const handleReplaceImages = async() =>{
        const AIimg = JSON.parse(JSON.stringify(prop.state.AIReplaceReducer));
        const replaces = JSON.parse(JSON.stringify(prop.state.AIPlacedImgs));
        await shifImages(AIimg,replaces);
        await handleGetPlaced();
    }
    */
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

    const handleReplace = async() =>{
        const image = prop.state.AIReplaceReducer.find(img=> img.checked);
        if(image === undefined){
            alert("please check image from photoshop");
            return false;
        }
        await replaceSelected(image.path);
    }
    /*
        <li>
            <StdButton name="get replaced images" func={handleGetPlaced}/>
        </li>
        <li>
            <StdButton name="replace Images" func={handleReplaceImages}/>
        </li>
    */

    return(
        <header className="AIheader">
            <h1 className="head-large">export images</h1>
            <ul className="AIheader__mainButtons">
                <li>
                    <StdButton name="replace selected image" func={handleReplace}/>
                </li>
                <li>
                    <StdButton name="send to Photoshop" func={sendPlacesPhotoshop}/>
                </li>
            </ul>
        </header>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(HeaderMainButtons);