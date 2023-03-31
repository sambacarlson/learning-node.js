const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // lodassh
  const num = _.random(0, 20);
  console.log('the number is ', num);
  
  res.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch(req.url) {
    case '/': 
      path+='index.html';
      res.statusCode = 200;
      break
    case '/about': 
      path+='about.html';
      res.statusCode = 200;
      break
    case '/about-me':
      res.statusCode = 301; ///permanently moved
      res.setHeader('Location', '/about'); ///redirects to about page
      res.end();
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if(err){
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      // res.end();
      res.end(data);
    }
  });
})

server.listen(3000, 'localhost', ()=>{
  console.log('listening on port 3000');
  console.log(_.random(0, 20));
})
