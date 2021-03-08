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

    it('Should be able to update the rooms availablity based on its room number', function() {
      const numList = [1];
      roomRepo.updateRoomsAvailable(numList, roomRepo.allRooms);
      expect(roomRepo.allRooms[0].available).to.equal(false);
    });

    it('Should be able to return a list of all unbooked rooms', function() {
      const numList = [1, 2, 3, 4];
      roomRepo.updateRoomsAvailable(numList, roomRepo.allRooms);
      expect(roomRepo.filterRooms(roomRepo.allRooms, 'available', true).length).to.deep.equal(6);
    });


    it('Should be able to filter rooms by bidet', function() {
      expect(roomRepo.filterRooms(roomRepo.allRooms, 'bidet', true).length).to.deep.equal(4);
    });

    it('Should be able to filter rooms by bed size', function() {
      expect(roomRepo.filterRooms(roomRepo.allRooms, 'bedSize', 'queen').length).to.deep.equal(4);
    });

    it('Should be able to filter rooms by type', function() {
      expect(roomRepo.filterRooms(roomRepo.allRooms, 'roomType', 'junior suite').length).to.deep.equal(2);
    });

    it('Should be able to number of beds', function() {
      expect(roomRepo.filterRooms(roomRepo.allRooms, 'numBeds', 2).length).to.deep.equal(3);
    });

    it('Should return the original list if keyInStr or value is undefined', function() {
      expect(roomRepo.filterRooms(roomRepo.allRooms)).to.deep.equal(roomRepo.allRooms);
    })

  });


});
