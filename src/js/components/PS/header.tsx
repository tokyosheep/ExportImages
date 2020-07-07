import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {ExtCheckBox} from "../parts/checkBox";

import {InitPS,Extension} from "../../redux/reducer/type";
const Header = (prop/*:{state:{PSReducer:InitPS}}*/) =>{
    console.log(prop);
    const [exts,setExt]:[Extension,(Extension:Extension)=>void] = useState(prop.state.PSReducer.extensions);
    useMemo(()=>{
        setExt(prop.state.PSReducer.extensions);
    },[prop.state.PSReducer.extensions]);

    const handleCheckBox = (e,arg) =>{
        prop.set_Prop("extensions",arg.key,e.target.checked);
    }

    const boxes = [];
    Object.entries(exts).forEach(([key,prop])=>{
        boxes.push(<li key={key}><ExtCheckBox name={key} value={prop} arg={{key:key}} func={handleCheckBox}/></li>);
    });
    return(
        <header className="header">
            <h1 className="header-large">export image</h1>
            <ul>
                {boxes}
            </ul>
        </header>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(Header);