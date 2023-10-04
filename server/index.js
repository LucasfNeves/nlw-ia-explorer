import cors from "cors";
import express, { request } from "express";

import{convert} from "./convert.js"
import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import {summarize} from "./summarize.js"

// inicia o express
const app = express();
app.use(express.json())

// usa o corse para habilitar a conexão do Frontend com o Backend
app.use(cors());

// .get cria rota de requisição, no endreço colocamos o recurso /: e o paramêtro
app.get("/summary/:id", async (request, response) => {
  try{
  // passamos para nossa função de dowload o Id do vídeo
  await download(request.params.id);
  const audioConverted = await convert()
  console.log(audioConverted)
  const result = await transcribe(audioConverted)
  // estamos dizendo que queremos recuperar de dentro da requisoção o parâmetro que é um id
  return response.json({ result })

  }catch(error){
    console.log(error)
    return response.json({error})
  }
});

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })

  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
});

// o método listen estrá iniciando o servidor e indica em qual porta ele esta escutando
app.listen(3333, () => console.log("Server is running on port 3333"));
 