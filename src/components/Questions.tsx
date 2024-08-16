import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Colapisble from "./Colapisble";
import { calculateCompanies, calculateTags, updatedData } from "@/data";
import {  useEffect, useRef, useState } from "react";
import { Check, Link2Icon } from "lucide-react";


function Questions() {
  const [filteredData, setFilteredData] = useState<
    {
      id: number;
      title: string;
      slug: string;
      pattern: string[];
      difficulty: string;
      premium: boolean;
      companies: { name: string; slug: string; frequency: number }[];
    }[]
  >([]);
  const [showTags, setShowTags] = useState(false);
  const pageChangeRef = useRef<HTMLDivElement>(null)

  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState("");
  const [companies, setCompany] = useState("");
  const [pageSize, setPageSize] = useState(174);
  const [currentPage,setCurrentPage] = useState(1)

  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    setFilteredData(updatedData(difficulty, tags, companies));
  
    console.log(filteredData);
  }, [tags, difficulty, companies]);

  useEffect(()=>{
    setPageSize(filteredData.length)
  },[filteredData])

  const tagMenu: String[] = calculateTags();

  const companyMenu: string[] = calculateCompanies();
  const numbers = Array.from({ length: Math.ceil(pageSize / 15) }, (_: any, i: number) => i + 1);

  return (
    <div className="">
      <div className="px-6">
        <Colapisble data={filteredData} />
      </div>
      <div ref={pageChangeRef} className="flex gap-8 pt-2 ">
        <div className="w-[100px]">
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem value="status" className="bg-yellow-300">
                {" "}
                Status{" "}
              </SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[120px]">
          <Select
            onValueChange={(value: string) => {
              setDifficulty(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black ">
              <SelectItem value="Difficulty" className="bg-yellow-300">
                Difficulty
              </SelectItem>

              <SelectItem key={"Easy"} value={"Easy"}>
                Easy{" "}
              </SelectItem>
              <SelectItem key={"Medium"} value={"Medium"}>
                Medium{" "}
              </SelectItem>
              <SelectItem key={"Hard"} value={"Hard"}>
                Hard{" "}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[180px]">
          <Select
            onValueChange={(value: string) => {
              setTags(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black ">
              <SelectItem value="Tags" className="bg-yellow-300">
                Tags
              </SelectItem>

              {tagMenu.map((tagOption: any) => (
                <SelectItem value={tagOption} key={tagOption} className="">
                  {tagOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[180px]">
          <Select
            onValueChange={(value: string) => {
              setCompany(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Companies" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black ">
              <SelectItem value="companies" className="bg-yellow-300">
                Companies
              </SelectItem>

              {companyMenu.map((companyOption: any) => (
                <SelectItem
                  value={companyOption}
                  key={companyOption}
                  className=""
                >
                  {companyOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={() => setShowTags(!showTags)}
          className="flex items-center -p-1 border-[1px] z-10 border-white px-3"
        >
          Show topic tags
        </button>
      </div>

      <div className="flex pt-3 gap-3 flex-col">
        <div  className="  gap-12 grid grid-cols-9 ">
          <div>Status</div>
          <div className=" col-span-4">Questions</div>
          <div className="col-span-2 ">Difficulty</div>
          <div className="col-span-2  ">Company</div>
        </div>
        {filteredData.map((items, index) => {
          return (
            index >= (currentPage*15-15) &&
            index <= (currentPage*15-1) && (
              <div
                key={index}
                className="  gap-6 py-1 grid grid-cols-9 border-b-2 border-gray-800 "
              >
                <div className="">
                  <div className="bg-[#282828 ] w-[30px] flex items-center justify-center">
                    <Check color="#00bd1f" />
                  </div>{" "}
                </div>
                <div className=" col-span-4">
                  <a
                    href={
                      "https://leetcode.com/problems/" +
                      items.slug +
                      "/description/"
                    }
                    className="text-blue-400 flex items-center gap-2"
                    target="_blank"
                  >
                    {" "}
                    {items.title} <Link2Icon className="h-[20px]" />
                  </a>
                </div>

                <div className="col-span-2 pl-2">
                  {items.difficulty === "Easy" && (
                    <div className="text-green-400">{items.difficulty}</div>
                  )}
                  {items.difficulty === "Medium" && (
                    <div className="text-yellow-300">{items.difficulty}</div>
                  )}
                  {items.difficulty === "Hard" && (
                    <div className="text-red-400">{items.difficulty}</div>
                  )}
                </div>

                <div className="flex  gap-3">
                  {items.companies.map((company, ind) => {
                    return ind < 2 && <div>{company.name}</div>;
                  })}
                  {items.companies.length > 2 && (
                    <button
                      onClick={() => setShowCompany(!showCompany)}
                      className="bg-[#282828] text-sm items-center flex justify-center px-2 rounded-xl"
                    >
                      {items.companies.length - 2}+
                    </button>
                  )}

                
                 
                </div>
               
              </div>
            )
          );
        })}
      </div>
       
       {pageSize>1&&(
         <div className="  flex gap-4 text-lg pt-8 pb-4 justify-end">
         Pages...{
           numbers.map((number)=>(
           number==currentPage&&(
            <button onClick={()=>{setCurrentPage(number)
              if (pageChangeRef.current) {
                pageChangeRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="text-blue-400 border-[1px] px-2 border-white">{number}</button>
           )||(
            <button onClick={()=>{setCurrentPage(number)
              if (pageChangeRef.current) {
                pageChangeRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="border-[1px] px-2 border-white">{number}</button>
           )
           ))
           }</div>
       
       )}
    </div>
  );
}

export default Questions;
