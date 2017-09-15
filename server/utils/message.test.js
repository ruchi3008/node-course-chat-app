var expect = require('expect');

var {generateMessage} = require('./message');

describe('generate Message',() =>{
  it('correct message object',() => {
    var from = 'Ruchi';
    var text = 'Hi';
    var message = generateMessage(from,text);
    expect(2).toBeA('number');
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
