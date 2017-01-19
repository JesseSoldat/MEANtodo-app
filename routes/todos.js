var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://jesse:ichiban987@ds056009.mlab.com:56009/4thapp');

router.get('/todos', function(req, res, next){
	db.todos.find(function(err, todos){
		if(err){
			res.send(err);
			console.log('err')
		} else {
			res.json(todos);
			// console.log(todos)
		}
	}); 
});

router.post('/todo', function(req, res, next){
	console.log(req.body);
	var todo = req.body;
	if(!todo.title || !(todo.isComplete + '')){
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		db.todos.save(todo, function(err, result){
			if(err){
				res.send(err);
			} else {
				res.json(result);
			}
		});
	}
});

router.delete('/todo/:id', function(req, res, next){
	db.todos.remove({
		_id: mongojs.ObjectId(req.params.id)
	}, '', function(err, results){
		if(err){
			res.send(err);
		} else {
			res.json(results)
		}
	});
});

router.put('/todo/:id', function(req, res, next){
	var todo = req.body;
	var updObj = {};
	// console.log(req.body);

	if(todo.isCompleted){
		updObj.isCompleted = todo.isCompleted;
	}
	if(todo.title){
		updObj.title = todo.title;
	}
	if(!updObj){
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		db.todos.update({
			_id: mongojs.ObjectId(req.params.id)
		}, updObj, {}, function(err, result){
			if(err){
				res.send(err);
			} else {
				res.json(result);
			}
		});
	}

});

module.exports = router;