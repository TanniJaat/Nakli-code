import jsonData from "@/data/questions.json";


export function updatedData(selecteddifficulty:string, selectedTag:string,selectedCompany:string){
  let data = jsonData;
 
  if( selecteddifficulty && selecteddifficulty  !== 'Difficulty'){
 
    const newData =  difficulty(selecteddifficulty,data)
    data = newData
  }
 if (selectedTag && selectedTag!=="Tags" ) {
    const newData = tags(selectedTag, data);
    data = newData;
  }
  

  if(selectedCompany && selectedCompany!=="companies"){
    const newData= company(selectedCompany, data)
    data = newData
  }


  return data
  
}

export const calculateTags = () => {
  const tags: string[] = [];

  jsonData.forEach((question) => {
    question.pattern.forEach((tag: string) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort()
  return tags;
};
export const calculateCompanies = () => {
  const companyNames: string[] = [];

  jsonData.forEach((question) => {
    question.companies.forEach((company) => {
      if (!companyNames.includes(company.name)) {
        companyNames.push(company.name);
      }
    });
  });
  companyNames.sort()

  return companyNames;
};


export const calculateTagFrequency = (data:any) => {
  const tagFrequency: { [key: string]: number } = {};

  data.forEach((question: { pattern: any[]; }) => {
    question.pattern.forEach((tag) => {
      if (!tagFrequency[tag]) {
        tagFrequency[tag] = 1;
      } else {
        tagFrequency[tag]++;
      }
    });
  });

  const sortedTagFrequency = Object.keys(tagFrequency).sort((a, b) => tagFrequency[b] - tagFrequency[a]).reduce((acc: { [key: string]: number }, key) => {
    acc[key] = tagFrequency[key];
    return acc;
  }, {} as { [key: string]: number });
 
   return sortedTagFrequency
};

export function difficulty(difficulty:string, data:any) {
  const filteredData = data.filter((question: { difficulty: string; })=>question.difficulty===difficulty);
  return filteredData
}


export function tags(tag:string, data:any) {
  const filteredData = data.filter((question: { pattern: any[]; })=>question.pattern.some((patterns)=> patterns===tag));
  return filteredData
}
export function company(company:string, data:any) {
  const filteredData = data.filter((question: { companies: { name: string; }[]; })=>question.companies.some((compan: { name: string; })=> compan.name===company));
  return filteredData
}







