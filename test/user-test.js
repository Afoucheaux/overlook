import chai from 'chai';
const expect = chai.expect;
import Room from '../src/Room';
import RoomRepo from '../src/RoomRepo';
import roomsTestData from './room-test-data';
import bookingsTestData from './booking-Test-Data';
import customersTestData  from './user-Test-Data';
import User from '../src/User';
import Booking from '../src/Booking';
import BookingRepo from '../src/BookingRepo';

describe('User', function() {

  let user;
  let bookingRepo;
  let roomRepo;

  beforeEach(() => {
    bookingRepo = new BookingRepo;
    roomRepo = new RoomRepo;
    bookingsTestData.forEach(booking => {
      let book = new Booking(booking);
      bookingRepo.allBookings.push(book);
    });
    roomsTestData.forEach(roomList => {
      let room = new Room(roomList);
      roomRepo.allRooms.push(room);
    });
    user = new User(customersTestData[0]);
   });

  it('Should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('Should have an user id', function() {
    expect(user.id).to.equal(1);
  });

  it('Should have a name', function() {
    expect(user.name).to.equal('Person One');
  });

  it('Should start with the default password of overlook2021', function() {
    expect(user.password).to.equal('overlook2021')
  });

  it('Should have a way to store their bookings', function() {
    expect(user.bookings).to.deep.equal([]);
  });

  it('Should be able to add bookings', function() {
    const userBooking = bookingRepo[0];
    user.bookings.push(userBooking);
    expect(user.bookings).to.deep.equal([userBooking]);
  });

  it('Should be able to see all their bookings', function() {
    user.findBookings(bookingRepo);
    expect(user.bookings).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6t5","userID":1,"date":"2020/01/24","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2020/01/10","roomNumber":2,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t7","userID":1,"date":"2020/02/16","roomNumber":3,"roomServiceCharges":[]}
    ]);
  });

  it('Should be able to see the total spent on all their books', function() {
    user.findBookings(bookingRepo);
    expect(user.totalSpent(roomRepo)).to.equal('1326.92');
  });

  it('Should be able to add a booking', function() {
    const userbooking = bookingRepo.allBookings[5];
    user.addBooking(userbooking);
    expect(user.bookings[0]).to.deep.equal(userbooking);
  });


});
