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
import axios from 'axios'
const cardHeader = document.querySelector(".cards-container");

axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then((res) => {
        console.log(res.data.articles);
        const mainTopics = Object.entries(res.data.articles);
        mainTopics.forEach((subject) => {
            subject[1].forEach((data) => {
                const newCard = cardMaker({heading: data.headline, imageURL: data.authorPhoto, authorsName: data.authorName});
                cardHeader.append(newCard);
            });
        });
    })
    .catch((error) => {
        return alert(error);
    });



function cardMaker({heading, imageURL, authorsName}) {
    const card = document.createElement("div");
    const header = document.createElement("div");
    const cardAuthorBox = document.createElement("div");
    const cardImgCont = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardAuthor = document.createElement("span");
    card.classList.add("card");
    header.classList.add("headline");
    cardAuthorBox.classList.add("author");
    cardImgCont.classList.add("img-container");
    header.textContent = heading;
    cardImg.src = imageURL;
    cardAuthor.textContent = authorsName;
    card.append(header);
    card.append(cardAuthorBox);
    cardAuthorBox.append(cardImgCont);
    cardImgCont.append(cardImg);
    cardAuthorBox.append(cardAuthor);
    document.querySelector(".card");
    card.addEventListener("click", () => {
        console.log(header);
    });
    return card;
}