import {Site} from "../../types/site.ts";
import SiteItem from "./SiteItem.tsx";

type SiteListProps = {
    sites: Site[],
}

const SiteList = ({ sites }: SiteListProps) => {

    return (
        <div data-cy="site-list">
            <p className="font-bold my-4 mx-2">Available sites</p>
            <div>
                {sites && sites.length > 0 ? (
                    sites.map((site: Site) => <SiteItem key={site.id} siteData={site} />)
                ) : (
                    <p>No sites available.</p>
                )}
            </div>
        </div>
    );
};

export default SiteList;
