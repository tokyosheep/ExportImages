import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {ExtCheckBox} from "../parts/checkBox";
import {InitPS,Extension} from "../../redux/reducer/type";


const borderHead = {
    background:"linear-gradient(45deg,rgb(6, 16, 33),rgb(0, 20, 255),rgb(6, 16, 33))",
    width:"300px",
    height:"3px",
    display:"block"
}

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
        <header className="PSheader">
            <h1 className="header-large">export image</h1>
            <div style={borderHead}></div>
            <ul className="PSheader__exts">
                {boxes}
            </ul>
        </header>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(Header);