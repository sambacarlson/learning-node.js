const express = require ('express');
const mongoose = require ('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://testuser:test1234@learningnode.rtkmm20.mongodb.net/node-tuts?retryWrites=true&w=majority'
// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}); // incase of deprecation warnings. not compulsory to do this
mongoose.connect(dbURI)
  .then(result => {app.listen(3001); console.log('connected to db')})
  .catch(error => {console.log('error: ', error.message)});



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
app.use(express.urlencoded({extended: true})); // takes url encoded data and parses it into an object that we can use in the request object


// mongoose and mongo sandbox routes
app.get('/add-blog', function(req, res) {
  const blog = new Blog({  //create on a new instance of blog collection
    title: 'New Blog 2',
    snippet: 'about my new blog 2',
    body: 'learn more about this new blog 2'
  }); 
  
  //save to db
  blog.save()
    .then(result => res.send(result))
    .catch(err => console.log(err.message));
});

// retrieve blogs
app.get('/all-blogs', function(req, res) {
  Blog.find() //run the find() directly on Blog
    .then(result => res.send(result))
    .catch(err => console.log(err.message));
})

app.get('/single-blog', function(req, res){
  Blog.findById('64258019ac66e717ae14a9ca')
    .then(result => res.send(result))
    .catch(err => res.send(err))
})

//basic routes
app.get('/', function(req, res) {
  // res.render('index', {title: 'Blog', blogs,});
  res.redirect('/blogs');
});

app.get('/about', function(req, res) {
  res.render('about', {title: 'About'});
});


//blog routes
app.use('/blogs', blogRoutes);



//404s
app.use(function(req, res) {
  res.status(404).render('404', {title: '404 Not Found'});

}) 

