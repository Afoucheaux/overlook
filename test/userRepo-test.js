import chai from 'chai';
const expect = chai.expect;
import customersTestData from './user-Test-Data';
import User from '../src/User';
import UserRepo from '../src/UserRepo';

describe('UserRepo', function() {

  it('Should be a function', function() {
    expect(UserRepo).to.be.a('function');
  });

  it('Should have a way to store users', function() {
    const userRepo = new UserRepo();
    expect(userRepo.allUsers).to.deep.equal([]);
  });

  it('Should be able to store a user', function() {
    const userRepo = new UserRepo();
    const user = new User(customersTestData[0]);
    userRepo.allUsers.push(user);
    expect(userRepo.allUsers).to.deep.equal([user]);
  })

  it('Should be able to store multiple users', function() {
    const userRepo = new UserRepo();
    const user1 = new User(customersTestData[0]);
    const user2 = new User(customersTestData[1]);
    const user3 = new User(customersTestData[2]);
    userRepo.allUsers.push(user1);
    userRepo.allUsers.push(user2);
    userRepo.allUsers.push(user3);
    expect(userRepo.allUsers.length).to.equal(3);
  })

});
