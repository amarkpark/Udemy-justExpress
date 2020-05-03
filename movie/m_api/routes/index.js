var express = require('express');
var router = express.Router();

const movies = require("../data/movies");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/most_popular", (req, res, next) => {
  // let page = req.query.page || 1;
  let page = req.query.page;
  if (page === undefined) { page = 1 };

  let results = movies.filter((movie) => {
    return movie.most_popular;
  })
  let start = ((page-1) * 20);
  let end = (start + 19);
  results = results.slice(start, end);
  res.json({
    page,
    results
  });
  
})

module.exports = router;
