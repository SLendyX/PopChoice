//https://openai-api-worker.slendyx2002.workers.dev/


function OpenaiObject(method = "chat.completions", model = "gpt-4o-mini", data = {}){
  this.method = method
  this.body = {}
  this.body.model = model
  for(const key of Object.keys(data))
    this.body[key] = data[key]
}

const object = new OpenaiObject("chat.completions", "gpt-4o-mini", 
  {messages: [
    {
      role:"system",
      content:"You are a helpful assitant"
    },
    {
      role: "user",
      content: "How does the ameba reproduce?"
    }
  ]})


async function getOpenai(object){
  const fileResponse = await fetch("./workerLink.txt.local")
  const url = await fileResponse.text()

  const response = await fetch(url, {
    method:'POST',
    headers:
    {
      "content-type": " application/javascript"
    },
    body: JSON.stringify(object)
  })

  const data = await response.json()

  return data
}




const placeholders = [
  `The Shawshank Redemption
Because it taught me to never give up hope no matter how hard life gets`,
  `I want to watch movies that were released after 1990`,
  `I want to watch something stupid and fun`
]
const inputs = document.getElementsByClassName("movie-input")
const movieForm = document.getElementById("movie-form")

for(let i=0; i<inputs.length; i++){
  inputs[i].placeholder = placeholders[i]
}

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(movieForm)
  const dataObject = {}

  formData.entries().forEach(entry => dataObject[entry[0]] = entry[1])

  console.log(dataObject)

  const reply = await getOpenai(object)
  console.log(reply.choices[0].message.content)
})