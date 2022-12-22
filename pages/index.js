import NavBar from "../components/NavBar";
import Head from "next/head";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";

const API_KEY = "b59cfc002d15a1346cd5d1e8e9d3adae";
const BASE_URL = "https://api.themoviedb.org/3";
export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(BASE_URL + `/movie/popular?api_key=${API_KEY}`)
      ).json();
      console.log(results);
      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <Seo title={"Home"} />
      <h1 className="active">Home</h1>
      {!movies && <h4> loading ... </h4>}
      {movies?.map((item, index) => (
        <div className="movie" key={item.id}>
          {/* <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} /> */}
          <h4>{item.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
