import {server} from "./server.js"

  const form = document.querySelector("#form");
  const getURL = document.querySelector("#url");
  const setContent = document.querySelector("#content");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    setContent.classList.add("placeholder");
    const videoURL = getURL.value;
    if(!videoURL.includes("shorts")){
      return (setContent.textContent = "A URL digitada não corresponde a um vídeo do Youtube Shorts");
    }
    const [_, paramsVideoShorts] = videoURL.split("/shorts/");

    const [videoId] = paramsVideoShorts.split("?si");
    setContent.textContent = "Obtendo texto do aúdio...";

    const transcription = await server.get("/summary/" + videoId);
    setContent.textContent = "Realizando o resumo..."

    const summary = await server.post("/summary", {
      text: transcription.data.result,
    });

    setContent.textContent = summary.data.result
    setContent.classList.remove("placeholder")
  });
