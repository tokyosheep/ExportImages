import {SetValue,SetList,GetPlaced,SetChecked,SetLoad} from "./app";


export const mapDispatchProps = dispatch =>{
    return{
        set_On:()=>dispatch(SetLoad.setOn()),
        set_Off:()=>dispatch(SetLoad.setOff()),
        set_Prop:(obj,prop,value)=>dispatch(SetValue.setValue({obj,prop,value})),
        set_Json:(json)=>dispatch(SetValue.setJson({json})),
        set_Folder:(folder)=>dispatch(SetValue.setFolder({folder})),
        set_Mode:(mode)=>dispatch(SetValue.setMode({mode})),
        set_List:(list)=>dispatch(SetList.setList({list})),
        get_Placed:(list)=>dispatch(GetPlaced.getPlaced({list})),
        set_Checked:(docIndex,imgIndex,value)=>dispatch(SetChecked.setChecked({docIndex,imgIndex,value})),
    }
}