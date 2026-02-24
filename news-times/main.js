const API_KEY = `1ca1f4d7b9d44fa8bff490ce56226976`;
const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
  );
  const response = fetch(url); // url을 이용해서 fetch로 데이터를 가져온다.
};

getLatestNews();
for (let i = 0; i < 20; i++) {
  console.log("after", i);
}
