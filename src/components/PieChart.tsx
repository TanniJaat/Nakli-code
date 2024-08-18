"use client"

import { Label,  PolarRadiusAxis,  RadialBar,  RadialBarChart } from "recharts"

import {
  Card,
  CardContent,

} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { countSolved } from "@/data"





const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Easy:{
    label:"Easy",
    color:"#47DE80"
  },
  Medium:{
    label:"Medium",
    color:"#FACC16"
  },
  Hard:{
    label:"Hard",
    color:"#F8654A"
  },
  Unsolved:{
    label:"Unsolved",
    color:"#282828"
  }
} satisfies ChartConfig

 function Component( data:any) {


  const dis = countSolved(data.data)
  const solved = dis[0]+dis[1]+dis[2];
  const unsolved = 174  -solved;

  const chartData = [{ month: "january", Easy: dis[0], Medium:dis[1], Hard: dis[2] , Unsolved: unsolved}]
  const totalVisitors = 174

  return (
    <Card className="flex mb-3 h-[250px] ">
      
      <CardContent className="  flex pb-0">
      <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            barSize={20}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-white text-xl font-bold"
                        >
                          {174-unsolved}/{totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-white"
                        >
                          Questions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Unsolved"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Unsolved)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Hard"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Hard)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Medium"
              fill="var(--color-Medium)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
             <RadialBar
              dataKey="Easy"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Easy)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      
      </CardContent>
      
      <div className="flex flex-col w-[200px] pt-2 ml-10">
        <div className="flex  flex-col gap-6 ">
          <div className="justify-between flex">
            <div className="text-green-400">Easy</div> <div>{dis[0]}/37</div>
        
          </div>
          <div className="w-full bg-[#282828] flex items-center h-[6px]"> <div className="bg-green-400 h-[8px] rounded-xl"   style={{ width: `${(dis[0] / 37) * 100}%` }} ></div></div>
          <div>
         
          </div>
        </div>
        
        <div className="flex  flex-col gap-6 ">
          <div className="justify-between flex">
            <div className="text-yellow-400">Medium</div> <div>{dis[1]}/107</div>
        
          </div>
          <div className="w-full bg-[#282828] flex items-center h-[6px]"> <div className="bg-yellow-400 h-[8px] rounded-xl"   style={{ width: `${(dis[1] / 107) * 100}%` }} ></div></div>
          <div>
         
          </div>
        </div>
        <div className="flex  flex-col gap-2 ">
          <div className="justify-between flex">
            <div className="text-red-400">Hard</div> <div>{dis[2]}/30</div>
        
          </div>
        <div className="w-full bg-[#282828] flex items-center h-[6px]"> <div className="bg-red-400 h-[8px] rounded-xl"   style={{ width: `${(dis[2] / 30) * 100}%` }} ></div></div>
          <div>
         
          </div>
        </div>
      </div>
    </Card>
  )
}


export default Component