import visitsCsvService from '../service/visitsCsvService'

const visitsCsvController = async (request) => {

  const fileData = request.files.csvFile.data.toString()

  const sourceCountsMap = await visitsCsvService(fileData)

  const responseArray = Array.from(sourceCountsMap).map((el)=>{

    const sourceCount = {
      source:el[0],
      count:el[1],
    }

    return sourceCount
  })

  return responseArray

}

export default visitsCsvController