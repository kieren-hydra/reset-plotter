import {useQuery} from "@tanstack/react-query";
import {webService} from "../utils/api-utils.ts";
import {Company} from "../types/company.ts";
import {Site} from "../types/site.ts";
import {useMemo} from "react";

export const useResetAPIData = (companyId: number | null = null, siteId: number | null = null) => {

    const {data, isLoading, error} = useQuery({
        queryKey: ['locations'],
        queryFn: () => webService.get('/test '),
    })

    const allData = data?.mandCompanies;



    const singleSiteData = useMemo(() => {
        if (!companyId || !siteId) {
            // console.error("no company id or site id to fetch single site data!");
            return null;
        }
        const parentCompany = allData?.find((company: Company) => company.id === companyId)
        const siteData = parentCompany ? parentCompany.sites?.find((site: Site) => site.id === siteId) : null;
        return {...siteData, parentCompanyName: parentCompany?.name}
    },[allData, companyId, siteId]);

    return {allData, singleSiteData, isLoading, error}
}

export default useResetAPIData