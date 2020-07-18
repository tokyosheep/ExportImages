var GetFolderPath = function(moreOptions,folder){
    this.export = moreOptions.export;
    this.eachFolder = moreOptions.eachFolder;
    this.asAnotherFile = moreOptions.asAnotherFile;
    this.folder = folder;
    this.second = false;
}

GetFolderPath.prototype.getpath = function(){
    //---------------別名保存用のパス------------------
    //====拡張子抜き出し=====
   var fPath = this.export ? this.folder : activeDocument.path;
   
   var fname = activeDocument.name//ドキュメントの名前を読み込み
   
   //ファイル名を取得
   var l = fname.length;//ファイル名の長さ
   var s = l-4//ファイル名の長さ-拡張子分の文字(4)
   var canname=fname.substr(s,l);//ファイル名の長さを元に拡張子以外を抜き出し
   
   
   var docName = activeDocument.fullName;//ドキュメントの絶対パス
   
   var PRF=docName.parent;//現在開いているドキュメントの親フォルダのパス
   var don=docName.length;//現在開いているドキュメントの階層のファイルの数
   
   
   var chr = fname.substr(0,s);//拡張子を除いたファイルの名前を抜き出し
   var original_name = chr;
   //オリジナルのファイルネームを保存してお
   var folderObj = new Folder(PRF);//現在開いているドキュメントの親フォルダのパスからフォルダー内のファイルを取得
   var fileList = folderObj.getFiles();//フォルダー内のファイルを取得
   var filenum =1
   for(var i=0 ; i <fileList.length; i++){//別名保存の場合はファイル名が重ならないようにするそのためのファイル名検索
       var filename = fileList[i];
       var fileObj = new File(filename);
       var fname = fileObj.name;//順番にファイルの名前を取得
       
       n = fname.indexOf(chr);
       
       if(n != -1){//同じファイル名があればおけつの数値を加算
           filenum++ 
       }   
   }
   var name;
   if(this.asAnotherFile){
        name = chr+"+"+filenum;  
    }else{
        name =  chr;  
    }  
       
   this.fPath = fPath;
   this.chr = chr;
   this.filenum = filenum
   this.docName = docName;
   this.purename = name;//name変数がファイル名になる
   this.fname = fname;
   this.original_name = original_name;
}/*=========== getpath=========*/
    
GetFolderPath.prototype.makePath = function(extension){
    var save_path;
    if(this.eachFolder && !this.second){
        makefolder(this.fPath+"/"+extension);
        save_path = this.fPath+"/"+ extension+"/"+ this.original_name;
    }else if(!this.second){
        save_path = this.fPath+"/"+this.purename;
    }else{
        save_path = this.fPath +"/"+this.original_name;
    }
    return save_path;
}/*=========folder=========*/

function makefolder(){
    for(var no =0; no<arguments.length; no++){//引数に渡された数だけフォルダを作る
        var folderObj = new Folder(arguments[no]);
        folderObj.create();
    }
}


var Main_process = function(options,moreOptions,extensions,moreOptionsExt,folder){

    this.save_path;//保存先のパスのプロパティ
    this.getPath = new GetFolderPath(moreOptions,folder);
    this.getPath.getpath();
    this.extension = moreOptions.export ? moreOptionsExt : extensions;

    this.sRGB = options.convertsRGB;
    this.merge = options.mergeLay;
    this.quality = options.quality;
    this.transfer = options.saveTrans;
}

Main_process.prototype.saveFiles = function(){
    try{
        if(this.extension.jpg)this.jpeg();
        if(this.extension.psd)this.PSD();
        if(this.extension.tiff)this.tiff();
        if(this.extension.png)this.PNG();
        if(this.extension.gif)this.GIF();
        if(this.extension.eps)this.EPS();
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);//最後にファイルを閉じる
    }catch(e){
        alert(e);
        return false;
    }
    return true;
}

Main_process.prototype.PSD = function(){
    var  fileObj = new File(this.getPath.makePath("PSD"));
    
    psdOpt = new PhotoshopSaveOptions();
    psdOpt.alphaChannels = true;
    psdOpt.annotations = true;
    psdOpt.embedColorProfile = true;
    psdOpt.layers = true;
    psdOpt.spotColors = false;
    activeDocument.saveAs(fileObj, psdOpt, true, Extension.LOWERCASE);    
}/*=====psd=======*/
Main_process.prototype.jpeg = function(){
    var  fileObj = new File(this.getPath.makePath("jpeg"));  
      
      
    if(this.sRGB){        
        activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
        app.activeDocument.convertProfile(
        "sRGB IEC61966-2.1",
        Intent.PERCEPTUAL,//知覚的
        true, true );//黒点補正、ディザ補正 
    }
    jpegOpt = new JPEGSaveOptions();
    jpegOpt.embedColorProfile = true;
    jpegOpt.quality = this.quality;
    jpegOpt.formatOptions = FormatOptions.STANDARDBASELINE;
    jpegOpt.scans = 3;
    jpegOpt.matte = MatteType.NONE;
    activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);
}/*=====jpeg=======*/
Main_process.prototype.tiff = function(){
    var  fileObj = new File(this.getPath.makePath("tiff"));
    tiffOpt = new TiffSaveOptions();
    tiffOpt.alphaChannels = false;
    tiffOpt.annotations = true;
    tiffOpt.byteOrder = ByteOrder.MACOS;
    tiffOpt.embedColorProfile = true;
    tiffOpt.imageCompression = TIFFEncoding.NONE;
    tiffOpt.jpegQuality = 12;
    tiffOpt.layerCompression = LayerCompression.RLE;
    
    //---------------レイヤー情報-------------------------------------------------------------
  
    tiffOpt.layers = !this.merge;//レイヤーを統合するかしないかのオプション  
    
    //--------------------------------------------------------------------------------------------
    tiffOpt.saveImagePyramid = false;
    tiffOpt.spotColors = false;
    
    //-----------------透過情報----------------------------------
    
    tiffOpt.transparency = this.transfer;

    //------------------------------------------------------------------
    
    activeDocument.saveAs(fileObj, tiffOpt, true, Extension.LOWERCASE);    
}/*=======tiff=======*/
Main_process.prototype.PNG = function(){
    var  fileObj = new File(this.getPath.makePath("PNG")); 
    pngOpt = new PNGSaveOptions();
    pngOpt.interlaced = false;
    activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);    
}/*===png=====*/
Main_process.prototype.GIF = function(){
    var  fileObj = new File(this.getPath.makePath("GIF"));   
    gifOpt = new GIFSaveOptions();
    gifOpt.colors = 32;
    gifOpt.dither = Dither.NONE;
    gifOpt.interlacted = true;
    gifOpt.matte = MatteType.WHITE;
    gifOpt.palette = Palette.EXACT;
    gifOpt.preserveExactColors = false;
   
   
    gifOpt.transparency = this.transfer;
    
   activeDocument.saveAs(fileObj, gifOpt, true, Extension.LOWERCASE);          
}/*======gif======*/

Main_process.prototype.EPS = function(){
    var fileObj = new File(this.getPath.makePath("EPS")); 
    var epsOpt = new EPSSaveOptions();
    epsOpt.embedColorProfile = true;
    epsOpt.encoding = SaveEncoding.JPEGMAXIMUM;
    epsOpt.halftoneScreen = false;
    epsOpt.interpolation = false;
    epsOpt.preview = Preview.MACOSJPEG;
    epsOpt.psColorManagement = false;
    epsOpt.transferFunction = false;
    epsOpt.transparentWhites = false;
    epsOpt.vectorData = false;
    activeDocument.saveAs(fileObj, epsOpt, true, Extension.LOWERCASE);  
}

