import {SendHostScript} from "./connectHostJsx";
import {InitPS,Extension} from "../redux/reducer/type";

const isCHecked = (exts:Extension):boolean =>{
    let flag:boolean = false;
    Object.values(exts).forEach(value=>{
        if(value)flag = true;
    });
    return flag;
}

const isEmpty = (folder:unknown):boolean => folder === "" || folder === null || folder === undefined;

export const validateProp = (prop:InitPS):boolean =>{
    const exts = prop.moreOptions.export ? prop.moreOptionsExt : prop.extensions;
    if(!isCHecked(exts)){
        alert("you must check any extension");
        return false;
    }
    if(prop.moreOptions.export && isEmpty(prop.folder)){
        alert("folder path is invalid");
        return false;
    }
    if(exts.jpg&&(prop.options.quality > 12 || prop.options.quality < 1 || isNaN(prop.options.quality))){
        alert("jpeg quality is invalid");
        return false;
    }
    return true;
}

export const getPhotoshopImages = async():Promise<object|boolean> =>{
    const send = new SendHostScript("getPSImages.jsx");
    const images = await send.callJsx().catch(e=>console.log(e));
    if(typeof images !== "string")return false;
    console.log(images);
    return JSON.parse(images);
}