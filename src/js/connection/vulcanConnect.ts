import {csInterface,Vulcan,VulcanInt} from "../fileSystem/init";
interface Communication{
    app:string
}
export class SendPs implements Communication{
    app:string
    constructor(app:string){
        this.app = app;
    }
    sendMsg(sendObj:object):void|boolean{
        if(!this.isAppRun()) return false;//通信先のアプリが立ち上がっていなかったら中断
        const extensionId = csInterface.getExtensionID(); 
        const vulcanNamespace = Vulcan.TYPE_PREFIX + extensionId;
        const msg = new Vulcan(vulcanNamespace);
        msg.setPayload(JSON.stringify({obj:sendObj,app:this.app}));//jsonも渡せる
        VulcanInt.dispatchMessage(msg);
    }
    isAppRun(){
        if(!VulcanInt.isAppRunning(this.app)){
            csInterface.evalScript(`alert("${this.app} hasn't started yet")`);
            return false;
        }
        return true;
    }
}

export const messageHandle = (message:object):Promise<{app:string,obj:object}> =>{
    return new Promise(resolve=>{
        const payload = VulcanInt.getPayload(message);
        const object = JSON.parse(payload);
        resolve(object);
    })
}

