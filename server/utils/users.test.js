const expect  = require('expect');

const {Users} = require('./users');

var users;

beforeEach(() => {
users = new Users();
users.user = [{
  id:'1',
  name:'Ruchi',
  room:'Node Course'
},{
  id:'2',
  name:'Sudhanshu',
  room:'React Course'
},{
  id:'3',
  name:'Gaurav',
  room:'Node Course'
}]
});

describe('Users',() => {
  it('should add new user',() => {
    var users = new Users();
    var user = {
      id:'123',
      name:'Andrew',
      room:'The Office Fans'
    };
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);

  });

  it('should return name for Node Course',() => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Ruchi','Gaurav']);
  });

  it('should return name for Node Course',() => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Sudhanshu']);
  });
});
