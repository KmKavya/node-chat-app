const expect=require('expect');

const {Users}=require('./users');

var users;
beforeEach(() => {
  users=new Users();
  users.users=[{
    id:'1',
    name:'NAvya',
    room:'node course'
  },{
    id:'2',
    name:'NAvya2',
    room:'react course'
  },{
    id:'3',
    name:'NAvya3',
    room:'node course'
  }];
});

describe('Users', ()=> {
it('shld add new user', ()=> {
  var users=new Users();
  var user={
    id:'123',
    name:'kavya',
    room:'Developers'
  };
  var res=users.addUser(user.id,user.name,user.room);
  expect(users.users).toEqual([user]);
});

it('should remove a user',()=> {
  var userID='1';
  var user=users.removeUser(userID);
    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
});
it('should  not remove a user',()=> {
  var userID='99';
  var user=users.removeUser(userID);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
});
it('should find a user',()=> {
  var userID='2';
  var user=users.getUser(userID);
  expect(user.id).toBe(userID);

});
it('should nt find a user',()=> {
  var userID='99';
  var user=users.getUser(userID);
  expect(user).toNotExist();
});

it('shld return names node crse',()=> {
  var userList=users.getUserList('node course');
  expect(userList).toEqual(['NAvya','NAvya3']);

});

it('shld return names react crse',()=> {
  var userList=users.getUserList('react course');
  expect(userList).toEqual(['NAvya2']);

});


});
