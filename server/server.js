const path = require('path');
const express = require('express');

var app = express();
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));


// app.get('/',(req,res) => {
//   res.send('abc');
// });

app.listen(port,() => {
  console.log(`Server listening on port ${port}`);
});
