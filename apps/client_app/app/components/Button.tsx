import { MouseEventHandler } from "react"

interface MybuttonType {
    content: string,
    onClick : MouseEventHandler<HTMLButtonElement>
}

export function Buttonsinginsignup ({onClick,content}:MybuttonType) {
    return (
        <div className="px-6">
            <button onClick={onClick} className="w-full  font-roboto py-2 rounded-full bg-Myblue text-white border-2">{content}</button>
        </div>
    )
}
