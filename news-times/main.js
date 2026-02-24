const API_KEY = `1ca1f4d7b9d44fa8bff490ce56226976`;
let news = [];

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
  );
  const response = await fetch(url); // url을 이용해서 fetch로 데이터를 가져온다.
  const data = await response.json();
  news = data.articles;
  console.log("dddd", news);
};

getLatestNews();

// for (let i = 0; i < 20; i++) {
//   console.log("after", i);
// }
