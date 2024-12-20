import {Site} from "./site.ts";

export type Company = {
    name: string,
    id: number,
    sites: Site[]
}