function getAlldocs(){
    var docs = [];
    for(var i=0;i<app.documents.length;i++){
        docs[i] = app.documents[i];
    }
    return docs;
}
function doFuncAllFiles(func,obj){
    var docs = getAlldocs();
    for(var j=0;j<docs.length;j++){
        app.activeDocument = docs[j];
        func(obj);
    }
}