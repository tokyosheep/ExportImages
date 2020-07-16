import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {StdNumberBox} from "../parts/textBox";
import {StdCheckBox} from "../parts/checkBox";
import {Options} from "../../redux/reducer/type";

const MainOptions = (prop):React.ReactElement =>{
    const [options,setOptions]:[Options,(options:Options)=>void] = useState(prop.state.PSReducer.options);
    useMemo(()=>{
        setOptions(prop.state.PSReducer.options);
    },[prop.state.PSReducer.options]);

    const handleCheckBox = (e,arg) =>{
        prop.set_Prop("options",arg.key,e.target.checked);
    }

    const handleNumberBox = (e,arg)=>{
        prop.set_Prop("options",arg.key,parseFloat(e.target.value));
    }
    const optionList = [{name:"all opened",obj:options.allOpened,key:"allOpened"},
    {name:"convert sRGB(jpg)",obj:options.convertsRGB,key:"convertsRGB"},
    {name:"merge layer(tiff)",obj:options.mergeLay,key:"mergeLay"},
    {name:"save transfer(tiff)",obj:options.saveTrans,key:"saveTrans"}];
    const otherOptions = optionList.map(o=>{
        return <li key={o.name}><StdCheckBox name={o.name} value={o.obj} arg={{key:o.key}} func={handleCheckBox}/></li>
    });
    const disabled = !options.isResize;
    return(
        <main className="PSmain">
            <h2 className="head-small">options</h2>
            <StdCheckBox name="Resize" func={handleCheckBox} value={options.isResize} arg={{key:"isResize"}} />
            <ul className="PSmain__resizeForm">
                <li>
                    <StdNumberBox name="size" disabled={disabled} value={options.size} func={handleNumberBox} max={90000} min={1} arg={{key:"size"}}/>
                </li>
                <li>
                    <StdNumberBox name="resolution" disabled={disabled} value={options.resolution} func={handleNumberBox} max={1000} min={1} arg={{key:"resolution"}}/>
                </li>
                <li>
                    <StdNumberBox name="quality(jpg)" value={options.quality} func={handleNumberBox} max={12} min={1} arg={{key:"quality"}}/>
                </li>
            </ul>
            <ul className="PSmain__otherOptions">
                {otherOptions}
            </ul>
        </main>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(MainOptions);