import jsonData from "@/data/questions.json";

interface Company {
  name: string;
  slug: string;
  frequency: number;
}

interface Question {
  id: number;
  title: string;
  slug: string;
  pattern: string[];
  difficulty: string;
  premium: boolean;
  companies: Company[];
}
export function updatedData(selectedDifficulty: string, selectedTag: string, selectedCompany: string): Question[] {
  return jsonData.filter(question => {
    return (!selectedDifficulty || selectedDifficulty === 'Difficulty' || question.difficulty === selectedDifficulty) &&
           (!selectedTag || selectedTag === 'Tags' || question.pattern.includes(selectedTag)) &&
           (!selectedCompany || selectedCompany === 'companies' || question.companies.some(comp => comp.name === selectedCompany));
  });
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


export function countSolved (data:any){
  let easy = 0;
  let medium = 0;
  let hard = 0;

  data.map((items: { difficulty: string; })=>{
    if(items.difficulty=="Easy") easy++;
    if(items.difficulty=="Medium") medium++;
    if(items.difficulty=="Hard") hard++;
  })
  return [easy, medium,hard]
  
}





