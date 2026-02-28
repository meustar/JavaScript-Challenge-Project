const API_KEY = `1ca1f4d7b9d44fa8bff490ce56226976`;
let newsList = [];
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`,
);

// pagination init
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResult = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewByCategory(event)),
);

const sideMenu = document.querySelectorAll(".side-bar-list button");
sideMenu.forEach((menu) =>
  menu.addEventListener("click", (event) => getSideBarByCategory(event)),
);

const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`,
  );
  getNews();
};

const getNewByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
  );
  getNews();
};

const getSideBarByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`,
  );
  getNews();
};

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

      // news.publishedAt의 시간을 moment.js를 이용해서 간지나게.
      const publishedDate = news.publishedAt;
      const now = moment();
      const articleDate = moment.utc(publishedDate).local(); // 기사 작성 시간

      const diffInHours = now.diff(articleDate, "hours"); // 현재 시간과 기사 게시 시간 차이

      let displayDate;
      if (diffInHours < 48) {
        displayDate = articleDate.fromNow(); // 24시간 이내인 경우 "몇 시간 전"
      } else {
        displayDate = articleDate.format("YYYY-MM-DD HH:mm");
      }

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
            <div>${sourceName} * ${displayDate}</div>
          </div>
        </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  const lastPage = pageGroup * groupSize;
  const firstPage = lastPage - (groupSize - 1);

  let paginationHTML = ``;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

getLatestNews();
