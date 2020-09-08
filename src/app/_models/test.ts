export enum PhoneType {
    Mobile = "12333333",
    Hom = "12222223",
    Work = "1111",
}

export namespace PhoneType {
    export function values() {return Object.keys(PhoneType).filter((type) => isNaN(<any>type) && type !== 'values' );} //&& type !== 'values'
 }