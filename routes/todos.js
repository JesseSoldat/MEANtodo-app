var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://jesse:ichiban987@ds056009.mlab.com:56009/4thapp');

router.get('/todos', function(req, res, next){
	db.todos.find(function(err, todos){
		if(err){
			res.send(err);
		} else {
			res.json(todos);
		}
	});
});

module.exports = router;