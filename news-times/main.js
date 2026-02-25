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
    .map((news) => {
      // description 내용이 없으면 "내용없음", 200자 넘으면 이후 "..."으로 표시
      const description = news.description
        ? news.description.length > 200
          ? news.description.substring(0, 200) + "..."
          : news.description
        : "내용 없음";
      // news.urlToImage에 이미지가 없거나 null일 경우
      const imageUrl = news.urlToImage
        ? news.urlToImage
        : "https://cdn.vectorstock.com/i/500p/01/56/no-image-symbol-missing-available-icon-gallery-vector-44020156.jpg";

      // news.source.name (출처)가 없으면 'no source'
      const sourceName =
        news.source && news.source.name ? news.source.name : "no source";

      return `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${imageUrl}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${description}</p>
            <div>${sourceName} * ${news.publishedAt}</div>
          </div>
        </div>`;
    })
    .join("");
  // console.log("html", newsHTML);

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
