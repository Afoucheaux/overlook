import chai from 'chai';
const expect = chai.expect;
import roomsTestData from './room-test-data';
import Room from '../src/Room';
import RoomRepo from '../src/RoomRepo';

describe('RoomRepo', function() {

  it('Should be a function', function() {
    expect(RoomRepo).to.be.a('function');
  });

  it('Should have a way to store rooms', function() {
    const roomRepo = new RoomRepo();
    expect(roomRepo.allRooms).to.deep.equal([]);
  });

  it('Should be able to store a booking', function() {
    const roomRepo = new RoomRepo();
    const room = new Room(roomsTestData[0]);
    roomRepo.allRooms.push(room);
    expect(roomRepo.allRooms).to.deep.equal([room]);
  })

  it('Should be able to store a booking', function() {
    const roomRepo = new RoomRepo();
    const room2 = new Room(roomsTestData[1]);
    const room3 = new Room(roomsTestData[2]);
    roomRepo.allRooms.push(roomsTestData[0]);
    roomRepo.allRooms.push(room2);
    roomRepo.allRooms.push(room3);
    expect(roomRepo.allRooms.length).to.equal(3);
  })

  describe('Room Filters', function() {

    let roomRepo;
    beforeEach(() => {
      roomRepo = new RoomRepo;
      roomsTestData.forEach(roomList => {
        let room = new Room(roomList);
       roomRepo.allRooms.push(room);
      });
    });

    it('Should be able to filter rooms by number', function() {
      const numList = [1, 2, 3, 4];
      expect(roomRepo.filterByNumber(numList, roomRepo.allRooms).length).to.deep.equal(4)
    });


  });


});
