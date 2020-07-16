export type FormType<T>= {
    name:string,
    func?:(e?,arg?)=>void,
    arg?:object,
    value?:T,
    disabled?:boolean,
}

