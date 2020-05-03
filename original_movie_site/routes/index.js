var express = require('express');
var router = express.Router();
const request = require("request");

// // https://developers.themoviedb.org/3/getting-started/introduction
// const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
// const apiBaseUrl = 'http://api.themoviedb.org/3';
// const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
// const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'; //w300 == width 300, adjustable


// https://developers.themoviedb.org/3/getting-started/introduction
const apiKey = "1234";
const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'; //w300 == width 300, adjustable


router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    // console.error("movie DB is angry: " + error);
    console.info(movieData);
    const parsedData = JSON.parse(movieData);
    // const parsedData = movieData;
    // console.dir(parsedData);
    // res.json(parsedData);
    res.render("index", {
      parsedData: parsedData.results
    })
  });
});

router.get('/movie/:id', (req, res, next) => {
  // res.json(req.params.id);
  const movieId = req.params.id;
  const moviePath = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  // res.send(moviePath);
  request.get(moviePath, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    res.render("single-movie", {
      parsedData: parsedData
      // parsedData: movieData
    })
  })
});

router.post('/search', (req, res, next) => {
  // res.send("you did a search");
  const searchTerm = encodeURI(req.body.movieSearch);
  const searchCat = req.body.cat;
  // res.send(`${searchTerm}, ${searchCat}`);
  const searchUrl = `${apiBaseUrl}/search/${searchCat}?query=${searchTerm}&api_key=${apiKey}`
  // res.send(searchUrl);
  request.get(searchUrl, (error, response, searchData) => {
    let parsedData = JSON.parse(searchData);
    // res.json(parsedData);
    if (searchCat === "person") {
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData: parsedData.results
    })
  })
});

module.exports = router;
