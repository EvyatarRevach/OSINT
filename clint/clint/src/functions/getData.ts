import { gql } from "@apollo/client";

export const GetDetailsWithPosts = gql`
  query GetDetailsWithPosts {
    getDetailsWithPosts {
      kyeWords
      newsTime
      articles {
        title
        link
        snippet
        date
        source
        imageUrl
        position
      }
      location
      postCount
    }
  }
`;

export const getAllNews = gql`
  query GetAllData {
    getAllData {
      kyeWords
      newsTime
      articles {
        title
        link
        snippet
        date
        source
        imageUrl
        position
      }
      location
      postCount
    }
  }
`;

export const getDetailsWithoutPosts = gql`
  query GetDetailsWithoutPosts {
    getDetailsWithoutPosts {
      kyeWords
      newsTime
      articles
    }
  }
`;