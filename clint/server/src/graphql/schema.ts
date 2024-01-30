export const typeDefs = `#graphql
  # Comments in GraphQL Strings (such as this one) start with the hash (#) symbol.

  type SearchResult {
    title: String
    link: String
    snippet: String
    date: String
    source: String
    imageUrl: String
    position: Int
  }

 
 
  type kyeWords {
    kyeWords: String
    newsTime: String
    articles: [String]
  }


  type Query {

    getAllData: [News]   
    getDetailsWithPosts: [News]  
    getDetailsWithoutPosts: [kyeWords]
  }


# type Mutation {
#     initializationDataToKafka:DataToKafka
#   }
`;