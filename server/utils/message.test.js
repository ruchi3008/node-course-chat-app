var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generate Message',() =>{
  it('correct message object',() => {
    var from = 'Ruchi';
    var text = 'Hi';
    var message = generateMessage(from,text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });

  it('generate location message',() => {
    var from = "Ruchi";
    var latitude = 37.17;
    var longitude = 127;

    var message = generateLocationMessage(from,latitude,longitude);
    var url = `http://google.com/maps?q=${latitude},${longitude}`;
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  })
});
