

export const SetValue ={
    setValue:({obj,prop,value})=>{
        return {type:"SETPROP",arg:{obj,prop,value}};
    },
    setJson:({json})=>{
        return {type:"SETJSON",arg:{json}}
    },
    setFolder:({folder})=>{
        return {type:"SETFOLDER",arg:{folder}}
    },
    setMode:({mode})=>{
        return {type:"SETMODE",arg:{mode}}
    }
}

export const SetList ={
    setList:({list})=>{
        return {type:"SETLIST",arg:{list}};
    }
}

export const GetPlaced ={
    getPlaced:({list})=>{
        return {type:"GETPLACED",arg:{list}};
    }
}

export const SetChecked ={
    setChecked:({docIndex,imgIndex,value})=>{
        return {type:"SETCHECKED",arg:{docIndex,imgIndex,value}};
    }
}