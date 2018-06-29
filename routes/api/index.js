const router = require("express").Router();
const ArticleRoutes = require("./articles");

// Article routes
router.use("/articles", ArticleRoutes);

module.exports = router;
