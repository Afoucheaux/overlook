import chai from 'chai';
const expect = chai.expect;
import Room from '../src/Room';
import roomsTestData from './room-test-data';
import bookingsTestData from './booking-Test-Data';
import customersTestData  from './user-Test-Data';
import User from '../src/User';
import Booking from '../src/Booking';
import BookingRepo from '../src/BookingRepo';

describe('User', function() {
  let user;
  let bookingRepo = new BookingRepo;

   beforeEach(() => {
     bookingsTestData.forEach(booking => {
       let book = new Booking(booking);
       bookingRepo.allBookings.push(book);
     });
     user = new User(customersTestData[0]);
   });

  it.skip('Should be a function', function() {
    expect(User).to.be.a('function');
  });

  it.skip('Should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it.skip('Should have an user id', function() {
    expect(user.id).to.equal(1);
  });

  it.skip('Should have a name', function() {
    expect(user.name).to.equal('Person One');
  });

  it.skip('Should start with the default password of overlook2021', function() {
    expect(user.password).to.equal('overlook2021')
  });

  it.skip('Should have a way to store their bookings', function() {
    expect(user.bookings).to.deep.equal([]);
  });

  it.skip('Should be able to add bookings', function() {
    const userbooking = bookingRepo[0];
    user.bookings.push(bookingRepo[0]);
    expect(user.bookings).to.deep.equal(userbooking);
  });

  it.skip('Should be able to see all there bookings', function() {
    expect(user.findBookings(bookingRepo)).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6t5","userID":1,"date":"2020/01/24","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2020/01/10","roomNumber":2,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t7","userID":1,"date":"2020/02/16","roomNumber":3,"roomServiceCharges":[]}
    ]);
  });

  it.skip('Should be able to see the total spent on all their books', function() {
    user.findBookings(bookingRepo);
    expect(user.totalSpent()).to.equal()
  });

});
