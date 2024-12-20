import { create } from 'zustand'

type DashboardStoreState = {
    selectedCompanyId: number | null,
    setSelectedCompanyId: (id: number | null) => void,

    selectedSiteId: number | null,
    setSelectedSiteId: (id: number | null) => void
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
    selectedCompanyId: null,
    setSelectedCompanyId: (id: number | null) => set({ selectedCompanyId: id }),

    selectedSiteId: null,
    setSelectedSiteId: (id: number | null) => set({ selectedSiteId: id }),
}))