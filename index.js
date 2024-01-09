const buttonEl = document.getElementById("btn");
const animeContainerEl = document.querySelector(".animeImageHolder");
const imageEl = document.getElementById("anime-image");
const nameEl = document.querySelector(".anime-name");

let data = null;
let currentIndex = 0; // Initialize the current index

// Fetch the data and store it in the 'data' variable
async function fetchData() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

// Function to display the next data entry
function displayNextData() {
  if (!data) {
    console.error("Data not loaded yet");
    return;
  }

  // Check if we've reached the end of the array
  if (currentIndex >= data.data.length) {
    currentIndex = 0; // If we've reached the end, start from the beginning
  }

  const currentData = data.data[currentIndex];

  buttonEl.disabled = true;
  buttonEl.innerText = "Loading";
  nameEl.innerText = "Updating...";
  imageEl.src = "loading icon.svg";

  // Display data for the current index
  imageEl.src = currentData.images.jpg.image_url; // Update the image source
  nameEl.textContent = currentData.title_english; // Display the title

  currentIndex++; // Move to the next data entry

  buttonEl.disabled = false;
  buttonEl.innerText = "Get Anime";

  animeContainerEl.style.display = "block";
}

buttonEl.addEventListener("click", displayNextData);

// Fetch the data when the page loads
window.addEventListener("load", fetchData);
