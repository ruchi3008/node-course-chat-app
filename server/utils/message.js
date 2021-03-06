var moment = require('moment');
var generateMessage =(from,text) => {
  return{
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage = (from,latitude,longitude) => {
  var url = `http://google.com/maps?q=${latitude},${longitude}`;
  return {
    from,
    url,
    createAt : moment().valueOf()
  }
};

module.exports ={
  generateMessage,
  generateLocationMessage
};
