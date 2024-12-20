import CompanyItem from "./CompanyItem.tsx";
import {useQuery} from "@tanstack/react-query";
import {webService} from "../../utils/api-utils.ts";
import {Company} from "../../types/company.ts";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "../ErrorFallback.tsx";
import LoadingWheel from "../LoadingWheel.tsx";

const CompanyList = () => {

    const {data, isLoading, error} = useQuery({
        queryKey: ['locations'],
        queryFn: () => webService.get('/test '),
    })

    const companies = data?.data?.companies

    return (
        <ErrorBoundary fallback={<ErrorFallback/>}>

        <div className="h-fit w-full bg-white rounded-md border border-gray-300 p-2">

            {isLoading && <LoadingWheel size="small" />}

            {error && <ErrorFallback/>}

            {!isLoading && !error && (!companies || companies.length === 0) && (
                <div>
                    <p>No companies available.</p>
                </div>
            )}

            {companies && companies.length > 0 && companies.map((company : Company) => (
                <CompanyItem key={company.id} companyData={company} />
            ))}
        </div>

        </ErrorBoundary>
    )
}

export default CompanyList