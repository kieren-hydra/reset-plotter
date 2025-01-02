import {useQuery} from "@tanstack/react-query";
import {webService} from "../utils/api-utils.ts";
import {Company} from "../types/company.ts";
import {Site} from "../types/site.ts";

const useResetAPIData = (companyId: number | null = null, siteId: number | null = null) => {

    const {data, isLoading, error} = useQuery({
        queryKey: ['locations'],
        queryFn: () => webService.get('/test '),
    })

    const allData = data?.data

    const getSingleSiteData = () => {
        if (!companyId || !siteId) {
            return
        }
        return allData?.companies?.find((company: Company) => company.id === companyId)?.sites?.find((site: Site) => site.id === siteId)
    }

    const singleSiteData = getSingleSiteData()

    return {allData, singleSiteData, isLoading, error}
}

export default useResetAPIData