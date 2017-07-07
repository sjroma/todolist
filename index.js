// Import and use the following modules
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const path = require('path');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serve images, CSS files & JavaScript files from a directory named 'public' at the same level as where you call node
app.use(express.static(path.join(__dirname, 'public')));
// expressValidator must come after bodyParser
app.use(expressValidator());

// Routes
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Todo list'});
});

//app.get('/', function(req, res) {
//	res.render('index')
//});

app.post('/', function (req, res) {
	//Call req.checkBody function.
	//Pass inputs to validate.
	//Tell middleware which validators to apply (chain one or more).
	req.checkBody("task", "You must enter a to-do!").notEmpty();
	
	var errors = req.validationErrors();
  if (errors) {
    // Render validation error messages
    res.render('index', {errors: errors});
  } else {
    res.send("Congratulations! Your data was validated.");
  }
});

// ex. from Daily Project: Build a todo list
//app.get("/", function (req, res) {
//  res.render('index', { todos: todos });
//});
//
//app.post("/", function (req, res) {
//  todos.push(req.body.todo);
//  res.redirect('/');
//})


app.listen(3000, function () {
	console.log('todolist app listening on port 3000')
});
