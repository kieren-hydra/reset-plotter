type ListItemContainerProps = {
    isSelected: boolean
    handleClick: () => void
    children: React.ReactNode
}
const ListItemContainer = ({isSelected, handleClick, children} : ListItemContainerProps) => {

    return (
        <div className="h-fit w-full">

            <div
                className={`${isSelected ? "text-orange border-orange" : "text-gray border-transparent"} border rounded-md w-full px-2 py-4 flex justify-between cursor-pointer `}
                onClick={() => handleClick()}>

                {children}
            </div>

        </div>

    )
}

export default ListItemContainer