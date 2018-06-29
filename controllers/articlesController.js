const db = require("../models");

// Defining methods for the ArticlesController
module.exports = {
  findAll: function(req, res) {
    db.Article.find({}, function(req,res){
     console.log(res);
    }).then(dbModel =>  res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // // console.log("Controller CREATE");
    console.log(req.body);
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};