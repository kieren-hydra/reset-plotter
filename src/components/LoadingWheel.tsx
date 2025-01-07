import { Oval } from 'react-loader-spinner'

type LoadingWheelProps = {
    size: "small" | "medium" | "large"
}

const LoadingWheel = ({ size }: LoadingWheelProps) => {

    //medium is default
    let heightWidth = 60

    if (size === "small") {
        heightWidth = 30
    } else if (size === "large") {
        heightWidth = 120
    }

    return (
        <div data-cy="loader" className="w-full h-full flex justify-center items-center">
            <Oval
                height={heightWidth}
                width={heightWidth}
                color="#F7941E"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#f8d49d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default LoadingWheel