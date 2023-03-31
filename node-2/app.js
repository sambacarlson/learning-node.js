const express = require ('express');

//create express app
const app = express();

//listen for requests
app.listen(3002);

app.get('/', function(req, res) {
  // res.send('<p>Homepage</p>'); ///send is express method. it inferes type of content, auto set content type header. also inferes status code.
  res.sendFile('./views/index.html', {root: __dirname}); //second arg tells us the absolute path. 
});

app.get('/about', function(req, res) {
  // res.send('<p>About page</p>');
  res.sendFile('./views/about.html', {root: __dirname});
});

//redirects
app.get('/about-us', function(req, res) {
  res.redirect('/about');
})

//404s
app.use((req, res)=>{  //fires for everysingle request regardless of url, if code execution reaches it. must therefore be at the bottom.
  res.status(404).sendFile('./views/404.html', {root: __dirname});
  //we have to manually set status code

}) 

