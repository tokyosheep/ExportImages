
/*
var obj = {
    "PSImage":{"path":"~/Desktop/sampledata/A/img/psd_bb4f33cf9f274350_1920.psd","name":"psd_bb4f33cf9f274350_1920.psd","checked":true},
    "AIImages":[{"path":"~/Desktop/exportImageText/testPrint.ai","name":"testPrint.ai","placed":[{"name":"cat.eps","path":"~/Desktop/exportImageText/cat.eps","index":1,"checked":true}]},{"path":"~/Desktop/sampledata/A/images.ai","name":"images.ai","placed":[{"name":"bb4f33cf9f274350_1920.jpg","path":"~/Desktop/sampledata/A/bb4f33cf9f274350_1920.jpg","index":0,"checked":true},{"name":"bb4b3cc09f294450_1920.jpg","path":"~/Desktop/sampledata/A/bb4b3cc09f294450_1920.jpg","index":1,"checked":true}]}],
    "func":"shiftImages"}
AIFunc(obj);

function decodeStr(str){
    return decodeURI(String(str));
}
*/
/*
#include "getAllFIles.jsx";
#include "saveFunc.jsx";
var obj = {"extensions":{"jpg":false,"psd":false,"tiff":true,"png":false,"gif":false,"eps":false},
"options":{"isResize":false,"size":1000,"resolution":72,"quality":12,"allOpened":true,"mergeLay":false,"saveTrans":false,"convertsRGB":false},"moreOptions":{"asAnotherFile":false,"eachFolder":false,"export":true},"moreOptionsExt":{"jpg":true,"psd":false,"tiff":false,"png":false,"gif":false,"eps":false},
"folder":"~/Desktop/export"}
PSfunc({prop:obj,func:"saveProcess"});
*/
function AIFunc(obj){
    switch(obj.func){
        case "shiftImages":
            shiftImages(obj.AIImages,obj.PSImage);
            break;
        
        default: 
            break;
    }
    return true;

    function shiftImages(docmentsData,PSImage){
        $.writeln(PSImage.path);
        for(var i=0;i<docmentsData.length;i++){
            try{
                app.activeDocument = app.documents[docmentsData[i].name];
                replaceImg(docmentsData[i],PSImage.path);
            }catch(e){
                alert(e);
                continue;
            }
        }
    }
    function replaceImg(docData,replace){
        var placedItems = activeDocument.placedItems;
        for(var j=0;j<placedItems.length;j++){
            isReplace(docData,placedItems[j],replace,j);
        }
    }
    function isReplace(docData,placedItem,replace,index){
        for(var l=0;l<docData.placed.length;l++){
            try{
                if(docData.placed[l].path === decodeStr(placedItem.file)&&parseFloat(docData.placed[l].index) === index){
                    placedItem.file = new File(replace);
                    $.writeln(true);
                    return true;
                } 
            }catch(e){
                alert(e);
                continue;
            }
        }
        return false;
    }
}

function PSfunc(obj){
    preferences.rulerUnits = Units.PIXELS;
    var OptionProcess = function(options,moreOptions,extensions,moreOptionsExt,folder){
        this.isResize = options.isResize;
        this.size = options.size;
        this.resolution = options.resolution;
        this.quality = options.quality;
        this.allOpened = options.allOpened;
        this.arg = {op:options,more:moreOptions,ext:extensions,moreExt:moreOptionsExt,folder:folder};
        //this.main_process = new Main_process(options,moreOptions,extensions);
    }

    OptionProcess.prototype.onFiles = function(){
        if(this.allOpened){
            var docs = getAlldocs();
            for(var j=0;j<docs.length;j++){
                app.activeDocument = docs[j];
                if(!this.process())return;
            }
        }else{
            if(this.process())return;
        }
    }

    OptionProcess.prototype.process = function(){
        try{
            var d = activeDocument.fullName;
        }catch(e){
            alert(e);
            return false;
        }
        if(this.isResize){
            this.resize();
        }
        $.writeln(this.arg.folder);
        var process = new Main_process(this.arg.op,this.arg.more,this.arg.ext,this.arg.moreExt,this.arg.folder);
        var flag = process.saveFiles();
        return true;
    }

    OptionProcess.prototype.resize = function(){
        var Doper = parseFloat (this.size);
        var w = activeDocument.width;
        var h = activeDocument.height;
        if(w>h){
            activeDocument.resizeImage(Doper,undefined,this.resolution);
        }else{
            activeDocument.resizeImage(undefined,Doper,this.resolution);
        }    
    }/*======resize========*/

    function isFolder(obj){
        var folder = new Folder(obj.folder);
        return obj.moreOptions.export&&!folder.exists;
    }

    function saveProcess(obj){
        if(isFolder(obj)){
            alert("please you check folder path");
            return false;
        }
        var pc = new OptionProcess(obj.options,obj.moreOptions,obj.extensions,obj.moreOptionsExt,obj.folder);
        pc.onFiles();
        return true;
    }

    function openImages(images){
        for(var l=0;l<images.length;l++){
            try{
                var f = new File(images[l]);
                app.open(f);
            }catch(e){
                alert(e);
                continue;
            }
        }
    }

    switch(obj.func){
        case "saveProcess":
            saveProcess(obj.prop);
            break;

        case "openImages":
            openImages(obj.images);
            break;
            
        default:
            break;
    }

    return true;
}