import { Github } from "lucide-react"


function Navbar() {

  return (
    <div className=" w-[100%] p-2 bg-[#282828] flex justify-center"> 
    
    <div className="max-w-screen-lg w-screen grid grid-cols-3  items-center justify-between">


      <div className="text-2xl  flex ">
        Nakli-<span className="text-yellow-300">Code</span>
        <div className="pl-2 rounded-full "><img src="./logo.svg" className="h-[30px] w-[30px] " alt="" /></div>
       </div>

      <div>
        <input type="text" className=" outline-none py-[3px] px-4  rounded-xl bg-[#313131]  w-full" placeholder="Search anything..." />
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