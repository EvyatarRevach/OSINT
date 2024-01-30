// App.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetDetailsWithPosts, getAllNews, getDetailsWithoutPosts } from "./functions/getData";
import { client } from "./main";
// import Overlays from "./components/Overlays";
import Map from "./components/Map";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetNews = async () => {
    try {
      setLoading(true);
      const result = await client.query({ query: GetDetailsWithPosts });
      setData(result.data.getDetailsWithPosts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllNews = async () => {
    try {
      setLoading(true);
      const result = await client.query({ query: getAllNews });
      setData(result.data.getAllData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDetailsWithoutPosts = async () => {
    try {
      setLoading(true);
      const result = await client.query({ query: getDetailsWithoutPosts });
      setData(result.data.getDetailsWithoutPosts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleGetNews}>Get News</button>
        <button onClick={handleGetAllNews}>Get All News</button>
        <button onClick={handleGetDetailsWithoutPosts}>
          Get Details Without Posts
        </button>
      </div>

      {loading && <p>Loading...</p>}
       {/* <Overlays /> */}
       <Map/>
    </>
  );
}

export default App;
