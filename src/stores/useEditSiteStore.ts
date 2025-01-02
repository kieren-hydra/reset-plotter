import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import {Boundary} from "../types/boundary.ts";

type EditSiteStoreState = {
    siteId: number | null
    setSiteId: (siteId: number | null) => void

    siteName: string
    setSiteName: (siteName: string) => void

    siteBoundary: Boundary
    setSiteBoundary: (siteBoundary: Boundary) => void
}

export const useEditSiteStore = create(
    persist<EditSiteStoreState>((set) => ({
        siteId: null,
        siteName: "",
        siteBoundary: [],
        setSiteId: (siteId: number | null) => set({ siteId }),
        setSiteName: (siteName: string) => set({ siteName }),
        setSiteBoundary: (siteBoundary: Boundary) => set({ siteBoundary }),
    }), {
        name: "reset-plottr-store",
    })
)