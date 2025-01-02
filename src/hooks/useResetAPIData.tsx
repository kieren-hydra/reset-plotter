import {useQuery} from "@tanstack/react-query";
import {webService} from "../utils/api-utils.ts";
import {Company} from "../types/company.ts";
import {Site} from "../types/site.ts";

export const useResetAPIData = (companyId: number | null = null, siteId: number | null = null) => {

    const {data, isLoading, error} = useQuery({
        queryKey: ['locations'],
        queryFn: () => webService.get('/test '),
    })

    const allData = data?.data

    const getSingleSiteData = () => {
        if (!companyId || !siteId) {
            return
        }
        const parentCompany = allData?.companies?.find((company: Company) => company.id === companyId)

        const siteData = parentCompany ? parentCompany.sites?.find((site: Site) => site.id === siteId) : null

        return {...siteData, parentCompanyName: parentCompany?.name}
    }

    const singleSiteData = getSingleSiteData()

    return {allData, singleSiteData, isLoading, error}
}

export default useResetAPIData