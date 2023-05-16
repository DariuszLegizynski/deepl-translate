import fs from 'fs'

export const appendObjectToJson = (filePath, data) => {
  const parts = filePath.split('/')
  const fileName = parts.pop()
  const path = parts.join('/')

  if (!data) {
    throw new Error('Illegal Arguments, data is null')
  }
  
  let jsonArray = []
  let contentJson = null
  if(fs.existsSync(filePath)) {
    const readFile = fs.readFileSync(filePath, "utf-8")
    contentJson = JSON.parse(readFile)
    for(const i of contentJson) {
      jsonArray.push(i)
    }
  } else {
    fs.mkdirSync(path, { recursive: true })
  }
  
  jsonArray.push(data)
  jsonArray = JSON.stringify(jsonArray, null, 3)

  fs.writeFileSync(filePath, jsonArray)

  return
}