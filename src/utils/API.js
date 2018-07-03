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
    return axios.get('http://localhost:3001/api/articles');
    // return axios.get('/api/articles');
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete('http://localhost:3001/api/articles/' + id);
    // return axios.delete('/api/articles/' + id);
  },
  // Saves a article to the database
  saveArticle: async function(articleData) {   
    console.log("Trying Axios Post");
    return await axios.post('http://localhost:3001/api/articles', articleData)
    // return await axios.post('/api/articles', articleData)
  }
};
