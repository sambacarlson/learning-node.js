const express = require ('express');


const app = express();
app.listen(3001);

//register the ejs view engine
app.set('view engine', 'ejs'); //assumes that templates found in views dir.

blogs = [
  {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet, consectetur adip'},
  {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet, consectetur adip'},
  {title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet, consectetur adip'},
]

//middleware and static files
app.use(function(req, res, next){
  console.log(req.path);
  console.log(req.hostname);
  console.log(req.method);
  next(); // next tells express to move to next middlewhere. 
})

// we need the static middleware shiped with express to give the browser access to static file. 
//since all files on server are private by default
app.use(express.static('public')); //makes dir 'puplic', public.


app.get('/', function(req, res) {
  res.render('index', {title: 'Blog', blogs,});
});

app.get('/about', function(req, res) {
  res.render('about', {title: 'About'});
});

app.get('/blogs/create', function(req, res) {
  res.render('create', {title: 'create new blog'});
})


//404s
app.use(function(req, res) {
  res.status(404).render('404', {title: '404 Not Found'});

}) 

