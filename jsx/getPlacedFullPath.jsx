(function(){
    var places = app.activeDocument.placedItems;
    if(places.length < 1)return false;
    var files = [];
    for(var i=0;i<places.length;i++){
        if(places[i].selected)files.push(getFullPath(places[i]));
    }
    function getFullPath(placed){
        return decodeStr(placed.file);
    }
    return JSON.stringify(files);
})();