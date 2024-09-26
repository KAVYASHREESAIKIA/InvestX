var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', { title: 'InvestX' });
});

router.get('/events/:date1/:date2/:event', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.render('events', { title: 'InvestX', date1: req.params.date1, date2: req.params.date2, event : req.params.event });
  }
});


router.get('/terminal', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    const stocks = await Stock.find({ Symbol: "RELIANCE", Date: { $gte: '2023-01-01', $lte: '2024-01-01' } });
    res.render('simulator', { title: 'InvestX', data: stocks });
  }
});

router.get('/getdata/:date1/:date2/:stock', async (req, res) => {
  const stocks = await Stock.find({ Symbol: req.params.stock, Date: { $gte: req.params.date1, $lte: req.params.date2 } });
  res.status(200).json(stocks);
});


router.get('/getdata/:num', async (req, res) => {
  const stocks = await Stock.find({ Symbol: "RELIANCE", Date: { $gte: '2023-01-01', $lte: '2024-01-01' } }).limit(Number(req.params.num));
  res.status(200).json(stocks);
});

router.get('/visual', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.render('visualization', { title: 'InvestX' });
  }
});

router.get('/visual/:stock', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.render('visualization', { title: 'InvestX', stockwithoutBSE: req.params.stock.toUpperCase() });
  }
});





module.exports = router;
