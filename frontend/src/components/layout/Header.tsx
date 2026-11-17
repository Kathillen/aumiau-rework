
import {NavLink} from "react-router-dom"


export function Header(){

    return (
        <div className=" z-[9999] h-[40vh] w-full flex flex-inline gap-4">
            <h3 className="text-[42px] font-bold text-[#8A38F5] font-sour">AUMIAU</h3>

            <button
            className="bg-[#FFFFFF] border-1 border-black rounded-full w-[40px] h-[40px]">
            👤
            </button>
        </div>
    )
}