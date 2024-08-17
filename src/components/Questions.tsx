import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import jsonData from "@/data/questions.json";
import Colapisble from "./Colapisble";
import { calculateCompanies, calculateTags, updatedData } from "@/data";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check, Link2Icon, Lock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";
import Component from "./PieChart";



const Color = [
  { difficulty: "Easy", class: "text-green-400" },
  { difficulty: "Medium", class: "text-yellow-400" },
  { difficulty: "Hard", class: "text-red-400" },
];

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
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showTags, setShowTags] = useState(false);
  const pageChangeRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(new Array(174).fill(false));
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState("");
  const [companies, setCompany] = useState("");
  const [pageSize, setPageSize] = useState(174);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData ] = useState<any>([])
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    const newFilteredData = updatedData(difficulty, tags, companies);
    
    const filteredWithStatus = newFilteredData.filter(item => {
      if (selectedStatus === "status") return true;
      if (selectedStatus === "solved") return status[item.id];
      if (selectedStatus === "todo") return !status[item.id];
      return true;
    });
    
    setFilteredData(filteredWithStatus);
    setPageSize(filteredWithStatus.length);
    setCurrentPage(1);
  }, [tags, difficulty, companies, selectedStatus, status]);

  useEffect(()=>{
    const dataForChart = jsonData.filter(item => {
     
      if ("solved" === "solved") return status[item.id];
      
      return true;
    });
    setChartData(dataForChart)
  },[status])

  useEffect(() => {
    const statusString = localStorage.getItem("Status");

    if (statusString) {
      const newLista: [] = JSON.parse(statusString);
      setStatus(newLista);
      
    }
  }, []);



 
  const check = (id: number) => {
    setStatus((prevStatus) => {
      const newList = [...prevStatus];
      newList[id] = !prevStatus[id];
      localStorage.setItem("Status", JSON.stringify(newList));
      return newList;
    });
  };
  const tagMenu = useMemo(() => calculateTags(), [tags]);
  const companyMenu = useMemo(() => calculateCompanies(), [companies]);

  const numbers = Array.from(
    { length: Math.ceil(pageSize / 15) },
    (_: any, i: number) => i + 1
  );

  const handlePageChange = useCallback(
    (page: SetStateAction<number>) => {
      setCurrentPage(page);
      if (pageChangeRef.current) {
        pageChangeRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [pageChangeRef]
  );
  
 
  return (
    <div className="">
      <div className="px-6">
        <Colapisble data={filteredData} />
      </div>
      <Component data={chartData}/>
      <div ref={pageChangeRef} className="flex gap-8 pt-2 ">
        <div className="w-[100px]">
          <Select 
          
          onValueChange={(value: string) => {
            setSelectedStatus(value);
          }}>
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
          {(showTags && (
            <div className="flex gap-3">
              {" "}
              Show topic tags{" "}
              <div className="w-[15px] mx-auto my-auto h-[15px] bg-green-600 rounded-full"></div>
            </div>
          )) || (
            <div className="flex gap-3">
              {" "}
              Show topic tags{" "}
              <div className="w-[15px] mx-auto my-auto h-[15px] bg-white rounded-full"></div>
            </div>
          )}
        </button>
      </div>

      <div className="flex pt-3 gap-3 flex-col">
        <div className=" opacity-60  gap-12 grid grid-cols-9 ">
          <div>Status</div>
          <div className=" col-span-4">Questions</div>
          <div className="col-span-2 ">Difficulty</div>
          <div className="col-span-2  ">Company</div>
        </div>
        {filteredData.map((items, index) => {
          return (
            index >= currentPage * 15 - 15 &&
            index <= currentPage * 15 - 1 && (
              <div
                key={index}
                className="  gap-6 py-1 grid grid-cols-9 border-b-2 border-gray-800 "
              >
                <div className="flex justify-center">
                  {(status[items.id] && (
                    <button
                      onClick={() => check(items.id)}
                      className=" bg-[#282828] w-[30px] h-[30px] flex items-center justify-center"
                    >
                      <Check color="#00bd1f" />
                    </button>
                  )) || (
                    <button
                      onClick={() => check(items.id)}
                      className=" bg-[#282828] w-[30px] h-[30px] flex items-center justify-center"
                    ></button>
                  )}
                </div>
                <div className=" grid grid-cols-1 grid-rows-2 col-span-4">
                  <a
                    href={
                      "https://leetcode.com/problems/" +
                      items.slug +
                      "/description/"
                    }
                    className="text-blue-400 flex items-center gap-2"
                    target="_blank"
                  >
                    {items.premium && (
                      <div>
                        <Lock className="w-[15px]" />
                      </div>
                    )}{" "}
                    {items.title} <Link2Icon className="h-[20px]" />
                  </a>
                  {showTags && (
                    <div className="flex  gap-3">
                      {items.pattern.map((patterns, ind) => {
                        return (
                          ind < 2 && (
                            <div className="bg-[#282828] px-2 rounded-xl">
                              {patterns}
                            </div>
                          )
                        );
                      })}
                      {items.pattern.length > 2 && (
                        <button
                          onClick={() => setShowCompany(!showCompany)}
                          className="bg-[#282828] text-sm items-center flex justify-center px-2 rounded-xl"
                        >
                          {items.pattern.length - 2}+
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="col-span-2 pl-2">
                  {Color.map((its, index) => {
                    return (
                      its.difficulty == items.difficulty && (
                        <div key={index} className={cn("", its.class)}>
                          {items.difficulty}
                        </div>
                      )
                    );
                  })}
                </div>

                <div className="grid grid-rows-2 col-span-2">
                  <div className=" flex relative gap-2">
                    {items.companies.map((company, ind) => {
                      return ind < 2 && <div key={ind}>{company.name}</div>;
                    })}
                    {items.companies.length > 2 && (
                      <Collapsible>
                        <CollapsibleTrigger className="bg-[#282828] flex items-center justify-center rounded-xl  px-2">
                          {items.companies.length - 2}+
                        </CollapsibleTrigger>
                        {(index <= currentPage * 15 - 4 && (
                          <CollapsibleContent className="absolute  rounded-xl w-[300px] overflow-hidden z-[1] top-0 left-0 bg-[#282828]">
                            <CollapsibleTrigger className="absolute  z-2 w-full h-full"></CollapsibleTrigger>
                            <div className="flex gap-3 p-2  flex-wrap w-[300px]">
                              {items.companies.map((company, ind) => (
                                <div key={ind} className=" gap-2 flex">
                                  <span className=" bg-[#1A1A1A] py-[1px] px-3 rounded-xl">
                                    {company.name}: {company.frequency}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        )) || (
                          <CollapsibleContent className="absolute  rounded-xl w-[300px] overflow-hidden z-[1] bottom-0 left-0 bg-[#282828]">
                            <CollapsibleTrigger className="absolute  z-2 w-full h-full"></CollapsibleTrigger>
                            <div className="flex gap-3 p-2  flex-wrap w-[300px]">
                              {items.companies.map((company, ind) => (
                                <div key={ind} className=" gap-2 flex">
                                  <span className=" bg-[#1A1A1A] py-[1px] px-3 rounded-xl">
                                    {company.name}: {company.frequency}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        )}
                      </Collapsible>
                    )}
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>

      {pageSize > 1 && (
        <div className="  flex gap-4 text-lg pt-8 pb-4 justify-end">
          Pages...
          {numbers.map(
            (number) =>
              (number == currentPage && (
                <button
                  key={number}
                  onClick={() => {
                    setCurrentPage(number);
                    if (pageChangeRef.current) {
                      pageChangeRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="text-blue-400 border-[1px] px-2 border-white"
                >
                  {number}
                </button>
              )) || (
                <button
                  key={number}
                  onClick={() => {
                    handlePageChange(number);
                  }}
                  className="border-[1px] px-2 border-white"
                >
                  {number}
                </button>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Questions;
