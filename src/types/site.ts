import {Terminal} from "./terminal.ts";
import {Boundary} from "./boundary.ts";

export type Site = {
    name: string
    id: number
    boundary: Boundary
    terminals: Terminal[]
    parentCompanyName: string
}