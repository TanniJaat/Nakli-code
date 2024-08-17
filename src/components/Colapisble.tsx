import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { calculateTagFrequency } from "@/data";



import { Expand } from "lucide-react";
import {  useState } from "react";

interface cry{ data: { id: number; title: string; slug: string; pattern: string[]; difficulty: string; premium: boolean; companies: { name: string; slug: string; frequency: number; }[]; }[]; }

function Colapisble(props:cry) {
    const [collapse, setCollapse] = useState(false);
  
    const frequency = calculateTagFrequency(props.data)

  
  return (
    <div className="text-sm">
      <Collapsible>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-10 py-6 px-10">
          {Object.entries(frequency).map(([items,frequency],index)=>{
           return(
            index<=4&&(
              <div className="" key={index}>{items}  <span className="ml-2 bg-[#282828] rounded-xl px-2">{frequency}</span></div>
            )
           )
          })}
          </div>
          {collapse==false&&(<CollapsibleTrigger onClick={()=>setCollapse(true)} className="flex gap-2 items-center justify-center text-[#4D4E4F]">
            Expand <Expand color="#4D4E4F" className="h-[15px] w-[15px]" />
          </CollapsibleTrigger>)||(
            <CollapsibleTrigger  onClick={()=>setCollapse(false)} className="flex gap-2 items-center justify-center text-[#4D4E4F]">
            Collapse <Expand color="#4D4E4F" className="h-[15px] w-[15px]" />
          </CollapsibleTrigger>
          )}
        </div>
        <CollapsibleContent>
          <div className="flex justify-between pb-2 ">
            <div className="flex flex-wrap gap-10  py-2 px-10">
            {Object.entries(frequency).map(([items,frequency],index)=>{
           return(
            index>4&&(
              <div className="" key={index}>{items}  <span className="ml-2 -pt-4 bg-[#282828] rounded-xl px-2">{frequency}</span></div>
            )
           )
          })}
            </div>
          </div>
          
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default Colapisble;
