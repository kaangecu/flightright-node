import UserSet from '../object/UserSet';

const visitsCsvService = async (fileData) => {
  
  const userSet = new UserSet();
  const sourceCounts = new Map();

  const csvDataArray = fileData.replace(/(\r)/gm, '').split('\n').flat()

  // Remove first line since its headers 
  // Do this out of the pipeline since shift returns the removed item
  csvDataArray.shift();

  // Using forEach since with map we would not be able to skip empty userVisitData
  csvDataArray.filter((line)=>!line.startsWith(",") && !line.endsWith(","))
  .map(line=> line.split(',') )
  .filter(columns=>!columns.includes(""))
  .forEach((columns) => {

    const userData = {
      email: columns[0],
      phone: columns[1],
      source: columns[2],
    };

    if (userSet.add(userData)) {
      if (!sourceCounts.get(userData.source)) {
        sourceCounts.set(userData.source, 1);
      } else {
        const currentSourceCount = sourceCounts.get(userData.source)
        sourceCounts.set(userData.source, currentSourceCount+1)
      }
    }
    
  });

  return sourceCounts;

};

export default visitsCsvService;