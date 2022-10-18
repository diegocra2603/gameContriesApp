export interface ILugar {
    nombre: string;
    id: number;
    type: string;
}

export enum ELugar {
    pais = 'pais',
    capital = 'capital',
}

export interface Country {
    name: Name;
    capital: string[];
}

export interface Name {
    common: string;
    official: string;
    nativeName: NativeName;
}

export interface NativeName {
    spa: Translation;
}

export interface Translation {
    official: string;
    common: string;
}