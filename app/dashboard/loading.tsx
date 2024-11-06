import { Spinner } from "@radix-ui/themes"

const Loading = () => {
    return <div className="flex justify-center items-center w-full h-[60vh]">
        <Spinner />
    </div>
}

export default Loading;