var router = require('express').Router();
var pool = require('../pool');

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT COUNT(*) FROM users',function(err,result){
    data = 'Number of users: '+result.rows[0].count;
    res.render('index', { title: 'Express', data: data });
  });
});

module.exports = router;
