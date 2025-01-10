
const ErrorFallback = () => {
    return (
        <div data-cy="error" className={"w-full h-full flex flex-col items-center justify-center text-orange"}>
            <p className={"mb-2 font-bold"}>Whoops! Something went wrong...</p>
            <p>Please try refreshing the page.</p>
        </div>
    )}

export default ErrorFallback