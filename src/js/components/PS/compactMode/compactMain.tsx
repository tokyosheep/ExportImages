import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../../redux/actions/mapDispatchProps";

import {InitPS} from "../../../redux/reducer/type";

const CompactMode = (prop:{state:{PSReducer:InitPS}}) =>{
    const [state,setState]:[InitPS,(v:InitPS)=>void] = useState(prop.state.PSReducer);
    useMemo(()=> setState(prop.state.PSReducer),[prop.state.PSReducer]);
    const isImport = state.moreOptions.export;
    return(
        <div className="compactMode">

        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(CompactMode);