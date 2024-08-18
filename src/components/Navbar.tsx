import { Github } from "lucide-react"
import { useState } from "react"
import jsonData from "@/data/questions.json";

function Navbar() {

  const [searchQuery, setSearchQuery ] = useState('')

  return (
    <div className=" w-[100%] p-2 bg-[#282828] flex justify-center"> 
    
    <div className="max-w-screen-lg w-screen grid grid-cols-3  items-center justify-between">


      <div className="text-2xl  flex ">
        Nakli-<span className="text-yellow-300">Code</span>
        <div className="pl-2 rounded-full "><img src="./logo.svg" className="h-[30px] w-[30px] " alt="" /></div>
       </div>

      <div className="relative">
        <input onChange={(event)=>setSearchQuery(event.target.value.toLowerCase())} type="text" className=" outline-none py-[3px] px-4  rounded-xl bg-[#313131]  w-full" placeholder="Search anything..." />

     
      {searchQuery&&(
         <div className="absolute flex flex-col gap-3 mt-3 p-3 rounded-xl w-full   ">
           {jsonData.filter((items)=>items.title.toLowerCase().includes(searchQuery)).map((its,index)=>(
           index<=5&&(
            <a  className="bg-[#282828] px-3 rounded-xl py-2" href={

              "https://leetcode.com/problems/" +
              its.slug +
              "/description/"
            } key={index}>{its.title}</a>
           )
           ))}
           </div>
        )}
    


      </div>
    
      <div className="flex items-end justify-end">
     <a href="https://github.com/TanniJaat/Nakli-code" target="_blank" className="">
     <div className="border-2 p-1 border-white rounded-full  h-[40px] w-[40px] flex items-center justify-center">
       
       <Github color="#ffffff" className="h-[25px] w-[25px]" />
        
      </div>
     </a>
     </div>
    </div>
    
    </div>
  )
}

export default Navbar