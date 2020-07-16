import * as fs from "fs";
import * as path from "path";

const readFile = (path:string):Promise<string|Error> =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(path,"utf-8",(err,data)=>{
            if(err)reject(err);
            resolve(data);
        });
    })
};

const writeFile = (path:string,data:object):Promise<boolean|Error> =>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,JSON.stringify(data),(err)=>{
            if(err)reject(err);
            resolve(true);
        })
    });
}

export default {readFile:readFile,writeFile:writeFile}; 