export interface ListConfig{
    avatarInfo?:labelKeyconf
    mainInfo:labelKeyconf
    sub1Info?:labelKeyconf
    sub2Info?:labelKeyconf
    sub3Info?:labelKeyconf
    chip1Info?:labelKeyconf
    chip2Info?:labelKeyconf
}

export interface labelKeyconf{
    label?:string,key:string,show?:boolean,secKey?:string,trim?:number|null
}
export interface SecondaryCardConfig extends ListConfig{

}