import ytdl from 'ytdl-core' 
import fs from 'fs'

// exporta a função dowload
export const download = (videoId) => new Promise ((resolve, reject) => {
  // Formata a url e acrescenta o id no final
  const videoURL = "https://www.youtube.com/shorts/" + videoId

  // captura o Id do vídeo
  console.log("Realizando dowload do vídeo:", videoId)

  // Chama a biblioteca, o conteúdo entre { } define os paramêtros de qualidade do vídeo
  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {

      // captura o tempo do vídeo e transforma em segundos
      const seconds = info.formats[0].approxDurationMs / 1000

      // Validação se o vídeo é maior que 60 segundos. se for lança um erro
      if (seconds > 60) {
        throw new Error("A duração desse vídeo é maior que 60 segundos")
      }
    })

    // revisar on
    .on("end", () => {
      console.log("Dowload do vídeo finalizado")
      resolve();
    })
    .on("error", (error) => {
      console.log(
        "Não foi possível fazer o dowload do vídeo. Detalhes do erro:",
        error
      )
      reject(error)
    })

    // Salva o arquivo de aúdio na pasta temp
    .pipe(fs.createWriteStream("./temp/audio.mp4"))
});