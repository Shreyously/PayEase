"use client"

import  { ReactNode } from "react"

interface buttonType {
  children: ReactNode
  onClick?: () => void
  appName? : string
  className? :string
}

export function Button ({children, onClick  , appName , className}: buttonType){
  return(
    <button  onClick={onClick} className=" hidden lg:block text-white bg-black px-8 py-2 font-montserrat  border-2 rounded-lg ">{children}</button>
  )
}