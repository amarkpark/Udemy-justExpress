var express = require('express');
var router = express.Router();
const request = require("request");
const passport = require("passport");

// https://developers.themoviedb.org/3/getting-started/introduction
const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'; //w300 == width 300, adjustable

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // user info:
  console.log(req.user);
  request.get(nowPlayingUrl, (error, response, movieData) => {
    console.info(movieData);
    const parsedData = JSON.parse(movieData);
    res.render("index", {
      parsedData: parsedData.results
    })
  });
});

router.get('/favorites', (req, res) => {
  res.json(req.user);
})

router.get('/auth', passport.authenticate("github", {
  successRedirect: "/",
  failureRedirect: "/loginFailed"
}));

router.get('/login', passport.authenticate("github"));

router.get('/loginFailed', (req, res, next) => {
  res.json({msg: "login failed"});
});

router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const moviePath = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(moviePath, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    res.render("single-movie", {
      parsedData: parsedData
    })
  })
});

router.post('/search', (req, res, next) => {
  const searchTerm = encodeURI(req.body.movieSearch);
  const searchCat = req.body.cat;
  const searchUrl = `${apiBaseUrl}/search/${searchCat}?query=${searchTerm}&api_key=${apiKey}`
  request.get(searchUrl, (error, response, searchData) => {
    let parsedData = JSON.parse(searchData);
    if (searchCat === "person") {
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData: parsedData.results
    })
  })
});

module.exports = router;
