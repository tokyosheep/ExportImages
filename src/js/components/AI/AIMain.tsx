import * as React from "react";
import {useState,useMemo} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {StdRadio} from "../parts/radio";
type FileList = {
    path:string,
    name:string,
    checked:boolean
}[];

const AIMain = (prop) =>{
    console.log(prop);
    const handleRadioButton = (e,arg) =>{
        const list = [...fileList];
        list.forEach(f => f.checked = false);
        list[arg.index].checked = true;
        prop.set_List(list);
    }
    const [fileList,setList]:[FileList,(FileList)=>void] = useState(prop.state.AIReplaceReducer);
    useMemo(()=>setList(prop.state.AIReplaceReducer),[prop]);
    const list = fileList.map((f,index)=> <li key={f.name}><StdRadio name={f.name} value={f.checked} func={handleRadioButton} arg={{index:index}}/></li>);
    return(
        <main className="AIMain">
            <ul className="PSimageList">
                {list}
            </ul>
        </main>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(AIMain);