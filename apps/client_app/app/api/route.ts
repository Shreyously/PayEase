import { NextResponse , NextRequest} from "next/server"
import {PrismaClient} from "@prisma/client" 

const client = new PrismaClient ()

export async  function POST (req:NextRequest) {
 try {
    const data = await req.json()
     await client.user.create({
      data : {
          email : data.email,
          name: data.name,
          phoneNumber : data.phboneNumer,
          password: data.password
          
      }
      
    })
    return NextResponse.json({msg: "user added"})
 } catch (error) {
    return Response.json({"error" : error})
 }
 
}