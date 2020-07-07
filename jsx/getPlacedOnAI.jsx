(function(){
    var PlacedData = function(){
        this.path = decodeStr(activeDocument.fullName);
        this.name = decodeStr(activeDocument.name);
        this.placed = [];
    }
    PlacedData.prototype.getPlaced = function(places){
        for(var j=0;j<places.length;j++){
            this.placed[j] = getProp(places[j],j);
        }
        function getProp(placed,j){
            var obj={};
            var fileObj = placed.file;
            obj.name = decodeStr(fileObj.name);
            obj.path = decodeStr(fileObj.fullName);
            obj.index = j;
            obj.checked = false;
            return obj;
        }
    }

    var docs = getAlldocs();
    var files = [];
    for(var i=0;i<docs.length;i++){
        try{
            app.activeDocument = docs[i];
            var docData = new PlacedData();
            docData.getPlaced(activeDocument.placedItems);
            files[i] = docData;
        }catch(e){
            alert(e);
            continue;
        }
    }
    return JSON.stringify(files);
})();