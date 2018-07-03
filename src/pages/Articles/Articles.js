import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
// import Article from "../../../models/Article"
import API from "../../utils/API";

class Articles extends Component {
  // Initialize this.state.articles as an empty array
  state = {
    articles: [],
    savedArticles: []
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.loadArticles ();
  }

  loadArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ savedArticles: res.data})
      )
      .catch(err => console.log(err));
  };

  // Add code here to get all articles from the database and save them to this.state.articles
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    var title = document.getElementById("title").value;
    var startdate = document.getElementById("startDate").value;
    var enddate = document.getElementById("endDate").value;

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?api-key=928e9f1b82f8483585bbe7df0b793334';

    if (title !== ""){
      url += '&q=' + title;
    }

    if (startdate !== ""){
        url += '&begin_date=' + startdate;
    }
    
    if (enddate !== ""){
        url += '&end_date=' + enddate;
    }
    
    API.getArticles(url)
      .then(res => {
        // console.log(res.data);
        var articleBlocks = this.print(res.data);
        // console.log(articleBlocks);
        this.setState({ articles: articleBlocks})
      }).catch(err => console.log(err));

    
  };
  
  print(result){
    var articleBlocks = [];
    for (let i=0; i<10; i++) {
      var A = {
        // key = _id,
        title: result.response.docs[i].headline.main,
        url: result.response.docs[i].web_url,
        date: result.response.docs[i].pub_date.substring(0,10)
      }
      articleBlocks.push(A);
    }
    return articleBlocks;
  }
  
  handleDelete = (id) => {
    // console.log(id);
    API.deleteArticle(id).then(res => {
        // console.log(res.data);
        this.loadArticles();
      })
      .catch(err => console.log(err));
  };

  handleSave = (article) => {
    // const article = this.state.articles.find(article => article._id === id);
    console.log(article);
    API.saveArticle(article)
      .then(res => {
        this.loadArticles();
        // console.log(res.data);
      })
    //   .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <div>
                <h1 className="display-4">New York Times</h1>
                <p id ="text" className="lead">Enter below critieria to find relevent articles</p>
                <hr className="my-4" />
                <br />
              </div>
            </Jumbotron>
            <form>
              <label id="formHead">Search For:</label>
              <Input id = "title" name="title" placeholder="Enter Keyword (required)" />
              <label id="formHead">Start Date</label>
              <Input id = "startDate" name="Start Date" placeholder="YYYYMMDD" />
              <label id="formHead">End Date</label>
              <Input  id = "endDate" name="End Date" placeholder="YYYYMMDD" />
              {/* <TextArea  id = "endYear" name="End Date" placeholder="YYYYMMDD" /> */}
              <FormBtn className="btn btn-primary" onClick={this.handleFormSubmit}>Search NY Times</FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                      <strong>
                        {article.title}. {article.date}
                      </strong>
                    </a>
                    <SaveBtn onClick={() => this.handleSave(article)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={"/articles/" + article._id}>
                      <strong>
                        {article.title} on {article.url}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.handleDelete(article._id)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
