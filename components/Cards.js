// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.
import axios from "axios";
axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then((res) => {
    const mainTopics = Object.entries(res.data.articles);
    mainTopics.forEach((article) => {
      article[1].forEach((data) => {
        const newCard = cardMaker({
          headline: data.headline,
          imageURL: data.authorPhoto,
          authorName: data.authorName,
        });
        document.querySelector(".cards-container").appendChild(newCard);
      });
    });
  })
  .catch((err) => {
    return alert(err);
  });

function cardMaker({ headline, imageURL, authorName }) {
  const card = document.createElement("div");
  const heading = document.createElement("div");
  const author = document.createElement("div");
  const imageCon = document.createElement("div");
  const image = document.createElement("img");
  const name = document.createElement("span");

  card.classList.add("card");
  heading.classList.add("headline");
  author.classList.add("author");
  imageCon.classList.add("img-container");

  heading.textContent = headline;
  image.src = imageURL;
  name.textContent = authorName;

  card.appendChild(heading);
  card.appendChild(author);
  author.appendChild(imageCon);
  author.appendChild(name);
  imageCon.appendChild(image);

  card.addEventListener("click", () => {
    console.log(heading);
  });

  return card;
}
