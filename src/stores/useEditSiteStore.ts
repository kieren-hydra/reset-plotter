import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import {Boundary} from "../types/boundary.ts";

type EditSiteStoreState = {
    siteId: number | null
    setSiteId: (siteId: number | null) => void

    companyName: string
    setCompanyName: (companyName: string) => void

    siteName: string
    setSiteName: (siteName: string) => void

    siteBoundary: Boundary
    setSiteBoundary: (siteBoundary: Boundary) => void

    initialVertexCount: number
    setInitialVertexCount: (initialVertexCount: number) => void

}

export const useEditSiteStore = create(
    persist<EditSiteStoreState>((set) => ({
        siteId: null,
        siteName: "",
        companyName: "",
        siteBoundary: [],
        initialVertexCount: 0,
        setSiteId: (siteId: number | null) => set({ siteId }),
        setCompanyName: (companyName: string) => set({ companyName }),
        setSiteName: (siteName: string) => set({ siteName }),
        setSiteBoundary: (siteBoundary: Boundary) => set({ siteBoundary }),
        setInitialVertexCount: (initialVertexCount: number) => set({ initialVertexCount }),
    }), {
        name: "reset-plottr-store",
    })
)