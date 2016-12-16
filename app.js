var express = require('express');
var app = express();

app.get('/hello_world',function(req,res){
  res.status(200).end();
});

app.use('/doc', express.static(__dirname + '/node_modules/swagger-ui/dist'));
app.use('/api', express.static(__dirname + '/api'));

  // res.status(200).send('wee');
  // express.static('node_modules/swagger-ui/dist')
// });

app.listen(8080,function(){
  console.log('Ouvindo 8080');
});
