/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/
import "../css/styles.scss";
import "@babel/polyfill";

//import {themeManager} from "./import/themeManager.js";
import {prevent_drag_event} from "./import/prevent_draganddrop.js";
import {write_file_disk} from "./import/write_json.js";
import {read_json} from "./import/read_json.js";

window.onload = function(){
    `use strict`;
    
    const csInterface = new CSInterface();
    const fs = require(`fs`);
    const extensions = Array.from(document.querySelectorAll(`.ext li label input[type="checkbox"]`));
    console.log(extensions);
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = require(`path`).join(dir_home, `Desktop`);//デスクトップパ
    
    const compact_mode = document.getElementById(`compact_mode`);
    const container = document.getElementsByClassName(`container`)[0];
    
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
    const preset_list = document.getElementById(`preset_list`);
    
    const Done = Array.from(document.getElementsByClassName(`Done`));
    const Compact = document.getElementById(`Compact`);
    const to_back_face = document.getElementById(`to_back_face`);
    const SaveOptions = document.getElementById(`SaveOptions`);
    
    const json_data = document.getElementById(`json_data`);
    
    /*====================saves======================*/
    const save_checks = Array.from(document.querySelectorAll(`.exports label input[type="checkbox"]`));
    console.log(save_checks);
    
    const ext_folder = Array.from(document.querySelectorAll(`.exportImg li label input[type="checkbox"]`));
    console.log(ext_folder);
    const folder = document.getElementById(`folder`); 
    
    
    const WindowSize = {//各種ウインドウサイズ
        st_height:580,
        st_width:1000,
        com_height:200,
        com_width:240,
        data_height:800,
        data_width:1200
    }
    csInterface.resizeContent(WindowSize.st_width,WindowSize.st_height);//window sizeを通常のサイズに戻す。
    
    prevent_drag_event();
    //themeManager.init();
    
    const extensionId = csInterface.getExtensionID(); 
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const toJSX = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    const json_path = filePath + `preset.json`;
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
        constructor(btn,elms,push_elm,reverse){
            this.btn = btn;
            this.elms = elms;
            this.reverse = reverse;
            if(push_elm){//folderのelement追加（苦肉の策）
                this.elms.push(push_elm);
            }
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
            if(this.reverse){//another_name要素の場合、反転
                flag = !flag;
            }
            this.elms.forEach(v=>{
               v.disabled = flag; 
            });
        }
    }
    
    const export_ext = new Control_disable(document.getElementById(`exporting`),ext_folder,folder);
    const resize_fillboxs = new Control_disable(resize,[size_value,res_value]);
    const another_name = new Control_disable(document.getElementById(`make_folder`),[document.getElementById(`another`)],undefined,true);
    //another name、　拡張子事のファイルのフォルダー作成の有無
    folder.addEventListener(`click`,(e)=>{
        folder.disabled = true;
        const f = cep.fs.showOpenDialog(true,true,`open`,dir_desktop[`jpg`]);
        //adobe cepの選択ダイアログ　ウインドウパネルから直接ファイルしたい場合はこれが一番簡単だと思う
        if(isEmpty(f.data[0])){
            folder.value = `Empty!!`;
        }else{
            folder.value = f.data[0];
        }
        folder.disabled = false;
    },false);
    /*==========================================================================*/
   function isEmpty(str){
       return (str===undefined||str===null||str===``);
   }
    
    class Sort_form_data{
        constructor(){
            this.ext_data = {};
            this.options = {};
            this.saves = {};
            this.add_extensions = {};
        }
        
        get_data(){
            extensions.forEach(v=>{
                this.ext_data[v.id] = v.checked; 
            });
            console.log(this.ext_data);
            
            options.forEach(v=>{
               this.options[v.id] = v.checked; 
            });
                     
            [size_value,res_value,qua_value].forEach(v=>{
                this.options[v.id] = v.value;
            });
            this.options[resize.id] = resize.checked;
            console.log(this.options);
            
            
            save_checks.forEach(v=>{
                this.saves[v.id] = v.checked;
            });
            console.log(this.saves);
            
            extensions.forEach(v=>{
                this.add_extensions[v.id] = v.checked;
            });
            console.log(this.add_extensions);
        }
    }
    
    class ReadJSON extends Sort_form_data{
        constructor(){
            super();
            this.set_select_names();
            add_preset.addEventListener(`click`,()=>{
                this.push_preset();
            });
            apply.addEventListener(`click`,()=>{
                this.set_forms();
            });
            del.addEventListener(`click`,()=>{
               this.delete_preset(); 
            });
        }
        
        push_preset(){
            this.get_data();
            this.name = preset_name.value;
            if(isEmpty(this.name)){
                csInterface.evalScript(`alert("preset name is empty!!")`);
                return;
            }
            const json_list = read_json(json_path);
            json_list.push({name:this.name,
                            ext:this.ext_data,
                            options:this.options,
                            saves:this.saves,
                            add_extensions:this.add_extensions
                           });
            console.log(json_list);
            fs.writeFile(json_path,JSON.stringify(json_list,null,4),(err)=>{
                if(err){
                    alert(err);
                    return;
                } 
                csInterface.evalScript(`alert("your preset is saved")`);
                this.set_select_names();
            });
            
        }
        
        set_select_names(){//presetの名前をselectフォームに登録
            const json_list = read_json(json_path);
            while(preset_list.firstChild){
                preset_list.removeChild(preset_list.firstChild);
            }
            
            json_list.forEach(v=>{
                const op = document.createElement(`option`);
                op.value = v.name;
                op.textContent = v.name; 
                preset_list.appendChild(op);
            });
        }
        
        delete_preset(){
            const json_list = read_json(json_path);
            const selectIndex = preset_list.selectedIndex;
            json_list.splice(selectIndex,1);
            fs.writeFile(json_path,JSON.stringify(json_list,null,4),(err)=>{
                if(err){
                    alert(err);
                    return;
                } 
                csInterface.evalScript(`alert("your preset is deleted")`);
                this.set_select_names();
            });
        }
        
        set_forms(){
            const json_list = read_json(json_path);
            const selectIndex = preset_list.selectedIndex;
            console.log(selectIndex);
            console.log(json_list[selectIndex]);
            /*
            Object.keys(json_list[0].ext).forEach(v=>{
                console.log(v);
                console.log(json_list[0].ext[v]);
            });
            */
            adopt_forms(extensions,json_list[selectIndex].ext);
            resize.checked = json_list[selectIndex].options.resize;
            adopt_options(options,json_list[selectIndex].options);
            adopt_options([size_value,res_value],json_list[selectIndex].options);
            adopt_options(save_checks,json_list[selectIndex].saves);
            adopt_forms(ext_folder,json_list[selectIndex].add_extensions);
            
            /*===========disabled 状態を反応させる=================*/
            export_ext.handleEvent();
            resize_fillboxs.handleEvent();
            another_name.handleEvent();
            
            function adopt_forms(array,obj){
                array.forEach((v,i)=>{
                    for(let prop in obj){
                        const ext_name = prop.substring(prop.length-3,prop.length);
                        console.log(v.id === prop);
                        if(v.id.includes(ext_name)){
                            v.checked = obj[prop];
                        }
                    }    
                });
            }
            function adopt_options(array,obj){
                array.forEach((v,i)=>{
                    for(let prop in obj){
                        if(typeof obj[prop] === `boolean` && v.id === prop){//ブーリアンタイプとnumタイプで処理を分ける
                            v.checked = obj[prop];
                        }else if(v.id === prop){
                            v.value = obj[prop];
                        }else{
                            continue;
                        }
                    }
                });
            }
            console.log(json_list[selectIndex].ext.ext_jpg);
        }
        
        include_name(prop,value,target,elm){
            const flag = prop.includes(target);
            if(flag){
                 elm = value;   
            }
        }
    }//=========================
    console.log(typeof true);
    const f = new ReadJSON();
    
    class ToPhotoshop extends Sort_form_data{
        constructor(){
            super();
            Done.forEach(v=>{
               v.addEventListener(`click`,this); 
            });
                
        }
        
        handleEvent(){
            if(find_ext(extensions)||(find_ext(ext_folder) && document.getElementById(`exporting`).checked)){
                csInterface.evalScript(`alert("please check your option")`);
                return; 
            }
            
            if(folder.value===`Empty!!` && save_checks.exporting.checked){
                csInterface.evalScript(`alert("You havn't chosen directory")`);
                return;
            }
            this.get_data();
            
            const obj = ({path:folder.value,
                          folder:folder.value,
                            ext:this.ext_data,
                            options:this.options,
                            saves:this.saves,
                            add_extensions:this.add_extensions
                           });
            
            
            console.log(obj);
            csInterface.evalScript(`export_document(${JSON.stringify(obj)})`);
        }
    }
    
    function find_ext(array){
        return array.every(v => v.checked === false );
    }
    /*
    function isAvailableNum(val,min,max){
        return (val > min || val < max);
    }
    */
    const n = new ToPhotoshop();
    
    /*=============compact mode===============*/
    
    class Compact_mode{
        constructor(btn,com_flag){
            this.btn = btn;
            this.com_flag = com_flag;
            this.btn.addEventListener(`click`,this);
        }
        
        handleEvent(){
            if(this.com_flag){
                compact_mode.style.display = `block`;
                container.style.display = `none`;
                this.make_table();
                csInterface.resizeContent(WindowSize.com_width,WindowSize.com_height);
            }else{
                compact_mode.style.display = ``;
                container.style.display = ``;
                csInterface.resizeContent(WindowSize.st_width,WindowSize.st_height);
            }
        }
        
        make_table(){
            const lis = document.getElementsByClassName(`ext_on_compact`)[0].getElementsByTagName(`li`);
            extensions.forEach((v,i)=>{
                if(v.checked){
                    lis[i].classList.add(`check_on`);
                }else{
                    lis[i].classList.remove(`check_on`);
                }
            });    
            const com_options = Array.from(document.getElementsByClassName(`com_options`));
            console.log(com_options);
            com_options[0].textContent = isChecked(resize.checked);
            const numbers = [size_value,res_value,qua_value];
            com_options.forEach((v,i)=>{
               if(i===0){
                   return;
               } 
                v.textContent = numbers[i-1].value;
            });
            
            const com_sub_options = Array.from(document.getElementsByClassName(`com_sub_options`));
            com_sub_options.forEach((v,i)=>{    
                v.textContent = isChecked(options[i].checked);
            });
            
            
            function isChecked(flag){
                if(flag){
                    return `on`;
                }else{
                    return `off`;
                }
            }
        }
    }
    const turn_compact = new Compact_mode(Compact,true);
    const back_mode = new Compact_mode(to_back_face,false);
    
    /*======================================json=============================*/
    const in_json_menu = '<Menu> \
    <MenuItem Id="show_you" Label="Show preset" Enabled="true" Checked="false"/> \
    </Menu>';//プリセットモードへのメニュー
    
    const out_json_menu = '<Menu> \
    <MenuItem Id="out" Label="Back panel" Enabled="true" Checked="false"/> \
    </Menu>';//プリセットモードから元のパネルに戻るメニュー
    csInterface.setPanelFlyoutMenu(in_json_menu);
    function flyoutMenuClickedHandler(event){
        console.log(event);
        switch(event.data.menuId){
                case `show_you`:
                        //csInterface.requestOpenExtension( 'com.example.customCEPEvents.bill' ); 
                        container.style.display = `none`;
                        json_data.style.display = `block`;
                        csInterface.setPanelFlyoutMenu(out_json_menu);
                        csInterface.resizeContent(WindowSize.data_width,WindowSize.data_height);
                break;
                
                case `out`:
                        container.style.display = ``;
                        json_data.style.display = ``;
                        csInterface.setPanelFlyoutMenu(in_json_menu);
                        csInterface.resizeContent(WindowSize.st_width,WindowSize.st_height);
                default:
        }
    }
    csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", flyoutMenuClickedHandler);
    
    class Set_json_onTable{
        constructor(){
            this.json_list = read_json(json_path);
            /*
            for(let prop in this.json_list[0]){
                console.log(`prop:`+prop);
                console.log(`value:`+this.json_list[0][prop]);
                for(let p in this.json_list[0][prop]){
                    console.log(`elm in obj`+p);
                    console.log(`value in obj`,this.json_list[0][prop][p]);
                }
            }
            */
            json_data.innerHTML = '';
            
            this.json_list.forEach((v,i)=>{
                const h4 = document.createElement(`h4`);
                json_data.appendChild(h4);
                h4.textContent = v.name;
                
                const data_lists = document.createElement(`div`);
                json_data.appendChild(data_lists);
                data_lists.classList.add(`data_lists`);//最初にプリセット名と表の大枠を表示
                
                this.analyze_obj(v,i,data_lists);
            });
        }
        
        analyze_obj(obj,index,parent){//各種プリセットの大枠を作成する
            for(let prop in obj){
                if(prop === `name`){//valueがnameだったら処理しない
                        continue;
                }
                const div = document.createElement('div');
                parent.appendChild(div);
                div.classList.add(`data_list__element`);
                const h5 = document.createElement('h5');
                div.appendChild(h5);
                h5.textContent = prop;
                const table = document.createElement(`table`);
                div.appendChild(table);
                fill_out_data(obj[prop],table,1);
                fill_out_data(obj[prop],table,2);
                
            }
            
            function fill_out_data(obj,table,num){//tableの中身を作る関数
                const tr = document.createElement(`tr`);
                table.appendChild(tr);
                for(let p in obj){
                    const td = document.createElement(`td`);
                    tr.appendChild(td);
                    if(num === 1){//一回目の処理と二回目の処理で分ける
                        td.textContent = p;
                    }else{
                        td.textContent = obj[p];
                    }
                    
                }
            }/*=========================fill out data=================*/
        }
    }
    const set = new Set_json_onTable();
}