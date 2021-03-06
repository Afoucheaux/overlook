import chai from 'chai';
const expect = chai.expect;
import roomsTestData from './room-test-data';
import Room from '../src/Room';

describe('Room', function() {

  it('Should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('Should have a room number', function() {
    let room = new Room(roomsTestData[0]);
    expect(room.number).to.equal(1)
  });

  it('Should have a room type', function() {
    let room = new Room(roomsTestData[0]);
    expect(room.roomType).to.equal("residential suite");
  });

  it('Should have a bidet', function() {
    let room = new Room(roomsTestData[0]);
    expect(room.bidet).to.equal(true);
  });

  it('Should not have budget', function() {
    let room = new Room(roomsTestData[1]);
    expect(room.bidet).to.equal(false);
  });

  it('Should have a bed size', function() {
    let room = new Room(roomsTestData[1]);
    expect(room.bedSize).to.equal('full');
  });

  it('Should store the numbers of beds', function() {
    let room = new Room(roomsTestData[1]);
    expect(room.numBeds).to.equal(2);
  });

  it('Should have a cost per night', function() {
    let room = new Room(roomsTestData[9]);
    expect(room.costPerNight).to.equal(497.64);
  });

});
