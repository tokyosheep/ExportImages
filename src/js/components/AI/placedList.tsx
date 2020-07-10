import * as React from "react";
import {useMemo,useState} from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/actions/mapStateProps";
import {mapDispatchProps} from "../../redux/actions/mapDispatchProps";

import {PlacedImages,Place} from "../../redux/reducer/index";
import {FileCheckBox} from "../parts/checkBox";

type SetChecked = {
    docIndex:number,
    imgIndex:number    
}

const ImageList = (places:Place[],docIndex:number,func:(e,SetChecked)=>void) =>{
    const images = places.map((place,index)=>{
        return(
            <li key={index}>
                <FileCheckBox name={place.name} value={place.checked} arg={{docIndex:docIndex,imgIndex:index}} func={func}/>
            </li>
        );
    });
    return images;
}

const PlacedList = (prop) =>{
    const [docImages,setDocImges]:[PlacedImages,(PlacedImages)=>void] = useState(prop.state.AIPlacedImgs);
    useMemo(()=>setDocImges(prop.state.AIPlacedImgs),[prop]);
    const handleCheckBox = (e,arg:SetChecked) =>{
        prop.set_Checked(arg.docIndex,arg.imgIndex,e.target.checked);
    };
    const documentImages = docImages.map((doc,docIndex)=>{
        const placedList = ImageList(doc.placed,docIndex,handleCheckBox);
        return(
            <li key={docIndex}>
                <p>{doc.name}</p>
                <ul className="PlacedList__images__documents">
                    {placedList}
                </ul>
            </li>
        );
    })
    return(
        <div className="PlacedList">
            <ul className="PlacedList__images">
                {documentImages}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(PlacedList);