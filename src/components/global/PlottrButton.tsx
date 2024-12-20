type PlottrButtonProps = {
    handleClick: () => void
    label: string
    disabled?: boolean
    icon?: React.ReactNode
}
const PlottrButton = ({ handleClick, label, disabled = false, icon } : PlottrButtonProps) => {


    return (

            <button
                className="w-fit flex gap-2 items-center border border-gray-300 rounded-md px-4 py-3 text-gray hover:bg-gray-50"
                onClick={handleClick}
                disabled={disabled}
            >{icon}{label}</button>

    )
}

export default PlottrButton