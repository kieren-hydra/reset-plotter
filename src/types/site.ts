import {Terminal} from "./terminal.ts";
import {Boundary} from "./boundary.ts";

export type Site = {
    name: string
    id: number
    plottrData: Boundary
    terminals: Terminal[]
    parentCompanyName: string
}