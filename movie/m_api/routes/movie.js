var express = require('express');
var router = express.Router();

const movieDetails = require("../data/movieDetails");

function requireJSON(req, res, next) {
  if (!req.is('json')) {
    res.json({msg: "Content type must be JSON"});
  } else {
    next();
  }
}

router.param(('movieId'), (req, res, next) => {
  next();
})

/* GET movie page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("hola movie!");
// });

// GET /movie/top_rated
router.get('/top_rated', (req, res, next) => {
  let page = req.query.page || 1;
  let results = movieDetails.sort((a,b) => {
    return b.vote_average - a.vote_average;
  });
  let start = ((page-1) * 20);
  let end = (start + 19);
  results = results.slice(start, end);
  res.json({
    page,
    results
  });
})

// POST /movie/{movie_id}/rating
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = Number(req.body.value);
  if((userRating < .5) || (userRating > 10)) {
    res.json({msg: "Rating must be between .5 and 10"});
  } else {
    res.json({
      status_code: 200,
      msg: "Thank you for your rating"
    });
  }
  
})

// DELETE /movie/{movie_id}/rating
router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;
  res.json({msg: "rating deleted"});
})

// GET /movie/movieId

router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;
  const results = movieDetails.filter((movie) => {
    return movie.id === Number(movieId);
  });

  if (!results) {
    res.json({
      msg: "not found",
    })
  } else {
    res.json(results[0]);
  }
})

module.exports = router;
