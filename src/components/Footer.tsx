import { CopyrightIcon, Github, Linkedin } from "lucide-react"


function Footer() {
  return (
    <div className="pt-[40px] flex justify-between pb-[30px]">
        
       <div className="text-2xl  flex select-none    ">
        Nakli-<span className="text-yellow-300">Code</span>
        <div className="pl-2 rounded-full "><img src="./logo.svg" className="h-[30px] w-[30px] " alt="" /></div>
        <div className="flex pl-3 items-center opacity-75   gap-2 "><CopyrightIcon className="w-[15px]"/> <span className="text-sm">2024</span></div>
        <div className="text-sm items-center flex pl-3 opacity-75">by Tanishk Dhaka</div>
       </div>

       <div  className="flex gap-4">
        <a href="https://www.linkedin.com/in/tanishk-dhaka-82aab0217/" target="_blank" className="hover:scale-90"><Linkedin /></a>
        <a href="https://github.com/TanniJaat" target="_blank" className="hover:scale-90"> <Github/></a>

       
       </div>
    </div>
  )
}

export default Footer