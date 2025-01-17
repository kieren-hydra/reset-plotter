import {create} from 'zustand'
import {persist} from 'zustand/middleware';
import {Boundary} from "../types/boundary.ts";
import {Coordinate} from "../types/coordinate.ts";

type EditSiteStoreState = {
    siteId: number | null
    setSiteId: (siteId: number | null) => void

    companyName: string
    setCompanyName: (companyName: string) => void

    siteName: string
    setSiteName: (siteName: string) => void

    siteBoundary: Boundary
    setSiteBoundary: (siteBoundary: Boundary) => void

    lastPinLocation: { index: number, coords : Coordinate } | null
    setLastPinLocation: (lastPinLocation: { index: number, coords : Coordinate}) => void
}

export const useEditSiteStore = create(
    persist<EditSiteStoreState>((set) => ({
        siteId: null,
        siteName: "",
        companyName: "",
        siteBoundary: [],
        lastPinLocation: null,
        setSiteId: (siteId: number | null) => set({siteId}),
        setCompanyName: (companyName: string) => set({companyName}),
        setSiteName: (siteName: string) => set({siteName}),
        setSiteBoundary: (siteBoundary: Boundary) => set({siteBoundary}),
        setLastPinLocation: (lastPinLocation: { index: number, coords : Coordinate}) => set({lastPinLocation}),
    }), {
        name: import.meta.env.VITE_LOCAL_STORAGE_KEY,
    })
)