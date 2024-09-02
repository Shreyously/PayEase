import React from "react"

interface TransferType {
  title: string,
  children: React.ReactNode
}

export  function Card ({title , children }:TransferType){
  return (
    <div className=" px-6 py-12 bg-white rounded-lg border-2  ">
      <div className="flex justify-center pb-2 border-b border-slate-300">
      <h1 className="text-3xl font-montserrat font-bold">{title} </h1>
      </div>
      <div>{children} </div> 
    </div>
  )
}

