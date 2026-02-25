const API_KEY = `1ca1f4d7b9d44fa8bff490ce56226976`;
let newsList = [];

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
  );
  const response = await fetch(url); // url을 이용해서 fetch로 데이터를 가져온다.
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

// for (let i = 0; i < 20; i++) {
//   console.log("after", i);
// }

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function searchButton() {
  const inputArea = document.getElementById("input-area");
  const currentDisplay = window.getComputedStyle(inputArea).display;

  if (currentDisplay !== "none") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "flex";
  }
}

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${news.urlToImage}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name} * ${news.publishedAt}</div>
          </div>
        </div>`,
    )
    .join("");
  console.log("html", newsHTML);

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
