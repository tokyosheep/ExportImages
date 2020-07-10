import * as React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";
import {useMemo,useState} from "react";

import {StdButton} from "../parts/button";
import {PlacedImages} from "../../redux/reducer/index";
const AsideMenu = (prop) =>{
    const [documents,setDocument]:[PlacedImages,(PlacedImages)=>void] = useState(prop.state.AIPlacedImgs);
    useMemo(()=>setDocument(prop.state.AIPlacedImgs),[prop])
    const allCheck = arg =>{
        documents.forEach((doc)=> doc.placed.forEach(place=> place.checked = arg.flag));
        console.log(documents);
        prop.get_Placed(documents);
    }
    return(
        <aside className="asideMenuAI">
            <ul className="asideMenuAI__buttons">
                <li>
                    <StdButton name="all on" func={allCheck} arg={{flag:true}}/>
                </li>
                <li>
                    <StdButton name="all off" func={allCheck} arg={{flag:false}}/>
                </li>
            </ul>
        </aside>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(AsideMenu);