import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

const Loading = (props) =>{
    const [isLoad,isSetLoad] = useState(false);
    useMemo(()=>isSetLoad(props.state.LoadingState),[props.state.LoadingState]);
    const loadDisplay = {
        display: isLoad ? "block" : "none"
    }
    const lis = Array(10).map((emp,index)=><li className="loading__bars__li" key={index}></li>);
    return(
        <div className="loading" style={loadDisplay}>
            <h3 className="loading__title" >loading...</h3>
            <ul className="loading__bars">
                {lis}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(Loading);