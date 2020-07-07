
const csInterface = new CSInterface();
const appID = csInterface.getApplicationID();
const Vulcan = VulcanMessage;
const VulcanInt = VulcanInterface;
const extensionId = csInterface.getExtensionID(); 
const extFolder = csInterface.getSystemPath(SystemPath.EXTENSION);
const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;

const init = () =>{
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    csInterface.evalScript(`$.evalFile("${extensionRoot}getAllFiles.jsx")`);
    csInterface.evalScript(`$.evalFile("${extensionRoot}decodeStr.jsx")`);
    if(appID=="PHXS"){
        csInterface.evalScript(`$.evalFile("${extensionRoot}saveFunc.jsx")`);
    }
}

export {csInterface,extensionRoot,filePath,extensionId,extFolder,appID,Vulcan,VulcanInt,init};