import { Genero } from "./genero";

export type MovieData = {
    id: number;
    title: string;
    subTitle: string;
    year: number;
    imgUrl: string;
    synopsis: string;
    genre: Genero [];
    
}