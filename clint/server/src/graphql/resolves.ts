import { GraphQLError } from "graphql";
import { getAllDetails, getDetailsWithPosts, getDetailsWithoutPosts } from "../utils/functions";


export const resolvers = {
    Query: {
        getAllData: getAllDetails,
        getDetailsWithPosts: getDetailsWithPosts,
        getDetailsWithoutPosts: getDetailsWithoutPosts
    },


}