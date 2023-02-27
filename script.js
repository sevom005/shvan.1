const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/images/generations";

function generateImages() {
  const prompt = document.getElementById("prompt").value;
  const numImages = parseInt(document.getElementById("num_images").value);
  const promptLen = prompt.length;
  let width, height;

  if (promptLen <= 32) {
    width = 256;
    height = 256;
  } else if (promptLen <= 64) {
    width = 512;
    height = 512;
  } else {
    width = 1024;
    height = 1024;
  }

  const data = {
    model: "image-alpha-001",
    prompt,
    num_images: numImages,
    response_format: "url",
    size: `${width}x${height}`
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`
  };

  fetch(API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((responseJson) => {
      const imageContainer = document.getElementById("image-container");
      imageContainer.innerHTML = "";
      for (let i = 0; i < numImages; i++) {
        const imageUrl = responseJson.data[i].url;
        const image = document.createElement("img");
        image.setAttribute("src", imageUrl);
        imageContainer.appendChild(image);
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to generate images. Please try again later.");
    });
}