import {InitPS} from "./type";

const initPSOptions:InitPS = {
    extensions:{
        jpg:false,
        psd:false,
        tiff:false,
        png:false,
        gif:false,
        eps:false
    },
    options:{
        isResize:false,
        size:1000,
        resolution:72,
        quality:12,
        allOpened:false,
        mergeLay:false,
        saveTrans:false,
        convertsRGB:false
    },
    moreOptions:{
        asAnotherFile:false,
        eachFolder:false,
        export:false,
    },
    moreOptionsExt:{
        jpg:false,
        psd:false,
        tiff:false,
        png:false,
        gif:false,
        eps:false
    },
    folder:"",
}

export type ActionPSReducer = {
    type:string,
    arg:{
        obj:string,
        prop:string,
        value:boolean
    }&{json:InitPS}&{folder:string},
}

export const PSReducer = (state = initPSOptions,action:ActionPSReducer) =>{
    switch(action.type){
        case "SETPROP":{
            const replace = {...state};
            replace[action.arg.obj][action.arg.prop] = action.arg.value;
            return replace;
        }

        case "SETJSON":{
            const JSON = {...action.arg.json};
            return JSON;
        }

        case "SETFOLDER":{
            const folder = action.arg.folder;
            const replace = {...state};
            replace.folder = folder;
            return replace;
        }
        default:
            return state;
    }
}

export type MODE = "normal" | "compact" | "preset";
export type MODEAction = {type:string,arg:{mode:MODE}};
const initMode = "normal";

export const PSModeReduce = (state = initMode,action:MODEAction) =>{
    switch(action.type){
        case "SETMODE":
            const mode = action.arg.mode;
            return mode;

        default:
            return state;
    }
}

export type ImageList ={
    name:string,
    path:string,
    checked:boolean,
}[];
const initAIReplaceList:ImageList = [];

type ActionAIReducer = {
    type:string,
    arg:{
        list:ImageList
    }
}

export const AIReplaceReducer = (state = initAIReplaceList,action:ActionAIReducer) =>{
    switch(action.type){
        case "SETLIST":{
            return action.arg.list;
        }
        default:
            return state;
    }
}

export type Place = {name:string,path:string,index:number,checked:boolean};

export type PlacedImages = {
    name:string,
    path:string,
    placed:Place[],
}[];

const initPlacedList:PlacedImages = [];

export type ActionAIPlacedImgs = {
    type:string,
    arg:{
        docIndex:number,
        imgIndex:number,
        value:boolean
    }
}&{
    type:string,
    arg:{
        list:PlacedImages
    }
}

export const AIPlacedImgs = (state = initPlacedList,action:ActionAIPlacedImgs) =>{
    console.log(action);
    switch(action.type){
        case "GETPLACED":{
            const list = [...action.arg.list];
            return list;
        }

        case "SETCHECKED":{
            const docs = [...state];
            docs[action.arg.docIndex].placed[action.arg.imgIndex].checked = action.arg.value;
            return docs;
        }

        default:
            return state;
    }
}
