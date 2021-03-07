import chai from 'chai';
const expect = chai.expect;
import bookingsTestData from './booking-Test-Data';
import Booking from '../src/Booking';

describe('Booking', function() {

  it('Should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('Should have an id', function() {
    const booking = new Booking(bookingsTestData[0]);
    expect(booking.id).to.equal("5fwrgu4i7k55hl6t5");
  });

  it('Should store a user id', function() {
    const booking = new Booking(bookingsTestData[1]);
    expect(booking.userID).to.equal(1);
  });

  it('Should store a the date', function() {
    const booking = new Booking(bookingsTestData[3]);
    expect(booking.date).to.equal("2020/02/05");
  });

  it('Should store the room number', function() {
    const booking = new Booking(bookingsTestData[9]);
    expect(booking.roomNumber).to.equal(10);
  });

  it('Should store room service charges', function () {
    const booking = new Booking(bookingsTestData[5]);
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });

});
