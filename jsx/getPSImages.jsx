(function(){
    var docs = getAlldocs();
    var files = [];
    for(var i=0;i<docs.length;i++){
        try{
            app.activeDocument = docs[i];
            files[i] = {path:decodeStr(activeDocument.fullName),name:decodeStr(activeDocument.name),checked:false};
        }catch(e){
            alert(e);
            continue;
        }
    }
    return JSON.stringify(files);
})();