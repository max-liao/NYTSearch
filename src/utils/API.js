import axios from "axios";

export default {
  // Gets all articles
  getArticles: function(url) {
    return axios.get(url);
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Gets saved articles
  getSavedArticles: function(id) {
    return axios.get('https://localhost:3001/api/articles');
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete('https://localhost:3001/api/articles/' + id);
  },
  // Saves a article to the database
  saveArticle: async function(articleData) {   
    // var instance = axios.create({
    //   baseURL: 'http://localhost:3001/api/articles',
    //   timeout: 1000
    // }); 
    // console.log(articleData);
    console.log("Trying Axios Post");
    // const url = 'http://localhost:3001/api/articles'
    return await axios.post('https://localhost:3001/api/articles', articleData)
  }
};
