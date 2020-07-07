import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {StdButton} from "../parts/button";
import {StdCheckBox} from "../parts/checkBox";
import {MoreOptions,Extension} from "../../redux/reducer/type";
import {setJSXFolder} from "../../fileSystem/getImagesOnAi";

const AsideOptions = (prop) =>{
    const [options,setOptions]:[MoreOptions,(MoreOptions:MoreOptions)=>void] = useState(prop.state.PSReducer.moreOptions);
    useMemo(()=>setOptions(prop.state.PSReducer.moreOptions),[prop.state.PSReducer.moreOptions]);
    
    const [extension,setExtension]:[Extension,(Extension)=>void] = useState(prop.state.PSReducer.moreOptionsExt);
    useMemo(()=>setExtension(prop.state.PSReducer.moreOptionsExt),[prop.state.PSReducer.moreOptionsExt]);
    const handleCheckBox = (e,arg) => {
        prop.set_Prop(arg.obj,arg.key,e.target.checked)
    };

    const [folderPath,setFolderPath]:[string,(f:string)=>void] = useState(prop.state.PSReducer.folder);
    useMemo(()=> setFolderPath(prop.state.PSReducer.folder),[prop.state.PSReducer.folder]);
    
    const optionList = [];
    Object.entries(options).forEach(([key,value])=>{
        optionList.push(<li key={key}><StdCheckBox name={key} value={value} func={handleCheckBox} arg={{key:key,obj:"moreOptions"}}/></li>);
    });
    const extensionList = [];
    Object.entries(extension).forEach(([key,value])=>{
        extensionList.push(<li key={key}><StdCheckBox name={key} value={value} func={handleCheckBox} arg={{key:key,obj:"moreOptionsExt"}} disabled={!options.export}/></li>);
    });

    const selectFolder = async(e) =>{
        const path = await setJSXFolder();
        if(typeof path !== "string")return false;
        prop.set_Folder(path);
    }

    return(
        <aside className="asideOptions">
            <div className="asideOptions__basic">
                <h3 className="head-middle">save options</h3>
                <ul className="asideOptions__basic__List">
                    {optionList}
                </ul>
            </div>
            <div className="asideOptions__folder">
                <StdButton name="folder" func={selectFolder}/>
                <p>{folderPath}</p>
            </div>
            <div className="asideOptions__extensions">
                <h3 className="head-small"></h3>
                <ul className="saveOptions__extensions__list">
                    {extensionList}
                </ul>
            </div>
        </aside>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(AsideOptions);