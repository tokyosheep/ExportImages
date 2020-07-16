import {csInterface,Vulcan,VulcanInt} from "../fileSystem/init";
import {SendPs,messageHandle} from "./vulcanConnect";

const receive = async(message,set_List) =>{
    console.log(message);
    const msg = await messageHandle(message);
    console.log(msg);
    if(msg.app !== "illustrator")return false;
    set_List(msg.obj);
}

export const AIReceive = async(set_List):Promise<void> =>{
    const extensionId = csInterface.getExtensionID(); 
    console.log(csInterface);
    const vulcanNamespace = Vulcan.TYPE_PREFIX + extensionId;//ここで受信したい送信側のExtensionのIDを指定する
    VulcanInt.addMessageListener(vulcanNamespace,(e)=>receive(e,set_List));
}

export const sendFromAI = (app = "photoshop") =>{
    return new SendPs(app);
}