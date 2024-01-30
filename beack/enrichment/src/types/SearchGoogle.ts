    import SearchResult from "./SearchResult";

    interface SearchGoogle {
        results: SearchResult[],
        postCount: number,
        location:string[],
        kyeWord:string
    };

    export default SearchGoogle;