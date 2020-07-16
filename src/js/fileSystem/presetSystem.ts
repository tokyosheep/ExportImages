import * as fs from "fs";
import * as path from "path";
import bs from "./basicSystem";
import {extFolder} from "./init.js";

const JSONPath = extFolder + "/preset.json";

export const readJSON = async() =>{
    const data = await bs.readFile(JSONPath).catch(e=> console.log(e));
    if(typeof data !== "string")return false;
    const JSONData = JSON.parse(data);
    console.log(JSONData);
    return JSONData;
}

