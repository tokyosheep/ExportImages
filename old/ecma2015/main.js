import "../css/styles.scss";
import "@babel/polyfill";

import {themeManager} from "./import/themeManager.js.js";
import {prevent_drag_event} from "./import/prevent_draganddrop.js.js";

window.onload = ()=>{
    `use strict`;
    const csInterface = new CSInterface();
    //const fs = require(`fs`);
    const extensions = Array.from(document.querySelectorAll(`.ext li label input[type="checkbox"]`));
    console.log(extensions);
    
    const resize = document.getElementById(`resize`);/*button*/
    const size_value = document.getElementById(`size_value`);
    const res_value = document.getElementById(`res_value`);
    const qua_value = document.getElementById(`qua_value`);
    
    const options = Array.from(document.querySelectorAll(`.options li label input[type="checkbox"]`));
    console.log(options);
    
    /*===================preset====================*/
    const apply = document.getElementById(`apply`);
    const del = document.getElementById(`delete`);
    const preset_name = document.getElementById(`preset-name`); 
    const add_preset = document.getElementById(`add_preset`);
    
    const Done = Array.from(document.getElementsByClassName(`Done`));
    const Compact = document.getElementById(`Compact`);
    const SaveOptions = document.getElementById(`SaveOptions`);
    
    /*====================saves======================*/
    const checks = Array.from(document.querySelectorAll(`.exports label input[type="checkbox"]`));
    console.log(checks);
    
    const ext_folder = Array.from(document.querySelectorAll(`.exportImg li label input[type="checkbox"]`));
    console.log(ext_folder);
    
    
    
    prevent_drag_event();
    themeManager.init();
    
    const extensionId = csInterface.getExtensionID(); 
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const toJSX = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    
    /*
    const persistence = new CSEvent(`com.adobe.PhotoshopPersistent`,`APPLICATION`);
    persistence.extensionId = extensionId;
    csInterface.dispatchEvent(persistence);//persistence
    */
    function loadJSX (fileName) {
        csInterface.evalScript(`$.evalFile("${toJSX + fileName}")`);
    }
    loadJSX(`json2.js`);
     
    
    /*============================disable event===============================*/
    class Control_disable{
        constructor(btn,elms){
            this.btn = btn;
            this.elms = elms;
            console.log(this.btn.checked);
            this.btn.addEventListener(`change`,this);
        }
        
        handleEvent(){
            let flag; 
            if(this.btn.checked){
                flag = false;
            }else{
                flag = true;
            }
            this.elms.forEach(v=>{
               v.disabled = flag; 
            });
        }
    }
    const export_ext = new Control_disable(document.getElementById(`export`),ext_folder);
    const resize_fillboxs = new Control_disable(resize,[size_value,res_value]);
    /*==========================================================================*/
}