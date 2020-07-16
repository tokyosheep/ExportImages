import {csInterface,appID,Vulcan,VulcanInt} from "../fileSystem/init";
import {SendPs,messageHandle} from "./vulcanConnect";
import {SendHostScript} from "../fileSystem/connectHostJsx";

export const sendFromPS = (app = "illustrator") =>{
    return new SendPs(app);
}

const receive = async(message) =>{
    console.log(message);
    const msg = await messageHandle(message);
    console.log(msg);
    if(msg.app !== "photoshop")return;
    const send = new SendHostScript("PSfunc");
    const flag = await send.callHostScript({images:msg.obj,func:"openImages"}).catch(e=> console.log(e));
    console.log(flag);
}

export const PSReceive = async():Promise<void> =>{
    const extensionId = csInterface.getExtensionID(); 
    console.log(csInterface);
    const vulcanNamespace = Vulcan.TYPE_PREFIX + extensionId;//ここで受信したい送信側のExtensionのIDを指定する
    VulcanInt.addMessageListener(vulcanNamespace,(e)=>receive(e));
}