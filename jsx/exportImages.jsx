/*
var obj = {
    path:"/Users/kawanoshuji/Desktop/test_export",
        ext: {
            ext_jpg: true,
            ext_psd: false,
            ext_tiff: false,
            ext_png: false,
            ext_gif: false
        },
        options: {
            all: true,
            merge: true,
            transparency: false,
            sRGB: true,
            size_value: 3000,
            res_value: 72,
            qua_value: 10,
            resize: false
        },
        saves: {
            another: true,
            make_folder: false,
            exporting: true//exportは予約語
        },
        add_extensions: {
            ext_jpg: true,
            ext_psd: false,
            ext_tiff: false,
            ext_png: false,
            ext_gif: false
        }
        
}
export_document(obj);
*/
//test用オブジェクト


function export_document(obj){
    preferences.rulerUnits = Units.PIXELS;

    var Main_process = function(obj){
        this.obj = obj;
        this.save_path;//保存先のパスのプロパティ
        this.getpath();
        this.second = false;
    }

    Main_process.prototype.getpath = function(){


        //---------------別名保存用のパス------------------
        //====拡張子抜き出し=====
        
        var fPath = activeDocument.path;
        
        
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
        //オリジナルのファイルネームを保存しておく

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
        if(obj.saves.another){
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
    
    Main_process.prototype.make_path = function(extension){
        var save_path;
        if(this.obj.saves.make_folder && !this.second){
            makefolder(this.fPath+"/"+extension);
            save_path = this.fPath+"/"+ extension+"/"+ this.original_name;
        }else if(!this.second){
            save_path = this.fPath+"/"+this.purename;
        }else{
            save_path = this.fPath +"/"+this.original_name;
        }
        return save_path;
    }/*=========folder=========*/

    Main_process.prototype.saves = function(ext_obj){
        if(ext_obj.ext_jpg){
            this.jpeg();
        }

        if(ext_obj.ext_psd){
            this.PSD();
        }

        if(ext_obj.ext_tiff){
            this.tiff();
        }

        if(ext_obj.ext_png){
            this.PNG();
        }

        if(ext_obj.ext_gif){
            this.GIF();
        }
    }

    Main_process.prototype.process = function(){
        try{
            if(this.obj.options.resize){
                this.resize();
            }
            this.saves(this.obj.ext);
            this.second = true;//二回目の処理は必ずフォルダーを作らない
            if(this.obj.saves.exporting){
                this.fPath = this.obj.path;
                this.saves(this.obj.add_extensions);
            }
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);//最後にファイルを閉じる
        }catch(e){
            alert(e);
            return;
        }    
    }


    function makefolder(){
        for(var no =0; no<arguments.length; no++){//引数に渡された数だけフォルダを作る
            var folderObj = new Folder(arguments[no]);
            folderObj.create();
        }
    }

    Main_process.prototype.resize = function(){
        var Doper = parseFloat (this.obj.options.size_value);
        var w = activeDocument.width;
        var h = activeDocument.height;
        if(w>h){
            activeDocument.resizeImage(Doper,undefined,this.obj.options.res_value);
        }else{
            activeDocument.resizeImage(undefined,Doper,this.obj.options.res_value);
        }    
    }/*======resize========*/

    Main_process.prototype.PSD = function(){
        var  fileObj = new File(this.make_path("PSD"));
        
        psdOpt = new PhotoshopSaveOptions();
        psdOpt.alphaChannels = true;
        psdOpt.annotations = true;
        psdOpt.embedColorProfile = true;
        psdOpt.layers = true;
        psdOpt.spotColors = false;
        activeDocument.saveAs(fileObj, psdOpt, true, Extension.LOWERCASE);    
    }/*=====psd=======*/

    Main_process.prototype.jpeg = function(){
        var  fileObj = new File(this.make_path("jpeg"));  
          
          
        if(this.obj.options.sRGB){        
            activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
            app.activeDocument.convertProfile(
            "sRGB IEC61966-2.1",
            Intent.PERCEPTUAL,//知覚的
            true, true );//黒点補正、ディザ補正 
        }
        jpegOpt = new JPEGSaveOptions();
        jpegOpt.embedColorProfile = true;
        jpegOpt.quality = this.obj.options.qua_value;
        jpegOpt.formatOptions = FormatOptions.STANDARDBASELINE;
        jpegOpt.scans = 3;
        jpegOpt.matte = MatteType.NONE;
        activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);
    }/*=====jpeg=======*/

    Main_process.prototype.tiff = function(){
        var  fileObj = new File(this.make_path("tiff"));
        
        tiffOpt = new TiffSaveOptions();
        tiffOpt.alphaChannels = false;
        tiffOpt.annotations = true;
        tiffOpt.byteOrder = ByteOrder.MACOS;
        tiffOpt.embedColorProfile = true;
        tiffOpt.imageCompression = TIFFEncoding.NONE;
        tiffOpt.jpegQuality = 12;
        tiffOpt.layerCompression = LayerCompression.RLE;
        
        //---------------レイヤー情報-------------------------------------------------------------
      
        tiffOpt.layers = !this.obj.options.merge;//レイヤーを統合するかしないかのオプション  
        
        //--------------------------------------------------------------------------------------------
        
        
        tiffOpt.saveImagePyramid = false;
        tiffOpt.spotColors = false;
        
        //-----------------透過情報----------------------------------
        
        tiffOpt.transparency = this.obj.options.transparency;
    
        //------------------------------------------------------------------
        
        activeDocument.saveAs(fileObj, tiffOpt, true, Extension.LOWERCASE);    
    }/*=======tiff=======*/

    Main_process.prototype.PNG = function(){
        var  fileObj = new File(this.make_path("PNG")); 
        pngOpt = new PNGSaveOptions();
        pngOpt.interlaced = false;
        activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);    
    }/*===png=====*/

    Main_process.prototype.GIF = function(){
        var  fileObj = new File(this.make_path("GIF"));   
        gifOpt = new GIFSaveOptions();
        gifOpt.colors = 32;
        gifOpt.dither = Dither.NONE;
        gifOpt.interlacted = true;
        gifOpt.matte = MatteType.WHITE;
        gifOpt.palette = Palette.EXACT;
        gifOpt.preserveExactColors = false;
       
       
        gifOpt.transparency = this.obj.options.transparency;
        
       activeDocument.saveAs(fileObj, gifOpt, true, Extension.LOWERCASE);          
    }/*======gif======*/

    /*=============実行するポイント=============*/
    function isFolder(dir){//folderが存在するかどうかの関数
        var dirObj = new Folder(dir);
        return dirObj.exists;
    }
    if(!isFolder(obj.path) && obj.saves.exporting){//exportオプションが選ばれたいるのに選択ディレクトリーが存在しなかったら処理を中止
        alert("no exsist export folder");
        return;
    }
    if(documents.length == 0){
        alert("no one document opened");
        return;
    }


    if(obj.options.all){
        while(documents.length > 0){/*====batch======*/
            var files = new Main_process(obj);
            files.process();
        }
    }else{
        var one = new Main_process(obj);
        one.process();
    }
}/*======export_document========*/