import {SendHostScript} from "./connectHostJsx";
import {ImageList,PlacedImages} from "../redux/reducer";
import * as fs from "fs";
import {extensionRoot} from "./init.js";

export const setJSXFolder = async():Promise<string|boolean|void> =>{
    const send = new SendHostScript("folderSelect.jsx");
    const path = await send.callJsx().catch(e=>console.log(e));
    return path;
}

export const getPlacedImages = async():Promise<object[]|boolean> =>{
    const send = new SendHostScript("getPlacedOnAI.jsx");
    const images = await send.callJsx().catch(e=>console.log(e));
    if(typeof images !== "string")return false;
    console.log(images);
    return JSON.parse(images);
}

export const shifImages = async(PSImages:ImageList,AIImages:PlacedImages) =>{
    const newImg = PSImages.find(img => img.checked === true);
    if(newImg === undefined)return false;
    const send = new SendHostScript("AIFunc");
    const AIChecked = AIImages.map(doc=> {//チェックされたイメージのみ抽出
        doc.placed = doc.placed.filter(place=> place.checked === true)
        return doc;
    });
    console.log("newItems");
    console.log(newImg);
    console.log(AIChecked);
    fs.writeFileSync(`${extensionRoot}data.json`,JSON.stringify({PSImage:newImg,AIImages:AIChecked,func:"shiftImages"}));
    const flag = await send.callHostScript({PSImage:newImg,AIImages:AIChecked,func:"shiftImages"}).catch(e=> console.log(e));
    console.log(flag);
    return flag;
}