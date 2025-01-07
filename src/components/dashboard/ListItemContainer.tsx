import { Link } from "react-router";

type ListItemContainerProps = {
    isSelected: boolean
    handleClick?: () => void
    children: React.ReactNode
    path?: string
    dataCy?: string
}
const ListItemContainer = ({isSelected, handleClick, children, path, dataCy} : ListItemContainerProps) => {

    return (
        <div className="h-fit w-full">

            <Link
                data-cy={dataCy}
                className={`${isSelected ? "text-orange border-orange" : "text-gray border-transparent"} border rounded-md w-full px-2 py-4 flex justify-between cursor-pointer `}
                onClick={() => handleClick ? handleClick() : null}
                to={path ? path : ""}
            >
                {children}
            </Link>

        </div>
    )
}

export default ListItemContainer