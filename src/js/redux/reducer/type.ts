export type Extension = {
    jpg:boolean,
    psd:boolean,
    tiff:boolean,
    png:boolean,
    gif:boolean,
    eps:boolean
}

export type Options ={
    allOpened:boolean,
    mergeLay:boolean,
    saveTrans:boolean,
    convertsRGB:boolean,
    isResize:boolean,
    size:number,
    resolution:number,
    quality:number
}

export type MoreOptions ={
    asAnotherFile:boolean,
    eachFolder:boolean,
    export:boolean,
}

export type InitPS = {
    name?:string,
    extensions:Extension,
    options:Options,
    moreOptions:MoreOptions,
    moreOptionsExt:Extension,
    folder:string,
}