const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8410fdd153cc4501858609c7cb98c316');


export async function searchByTopic(topic: string , from: string) {

  try {
    const response = await newsapi.v2.everything({
        q: `${topic}`,
        from: `${from}`,
        sortBy: 'popularity',
        
      });
    
    console.log(response);

  } catch (error) {
    console.error(error);
  }

}

