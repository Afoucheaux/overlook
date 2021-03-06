import chai from 'chai';
const expect = chai.expect;
import bookingsTestData from './booking-Test-Data';
import Booking from '../src/Booking';
import BookingRepo from '../src/BookingRepo';

describe('BookingRepo', function() {

  it('Should be a function', function() {
    expect(BookingRepo).to.be.a('function');
  });

  it('Should have a way to store bookings', function() {
    const bookingRepo = new BookingRepo();
    expect(bookingRepo.allBookings).to.deep.equal([]);
  });

  it('Should be able to store a booking', function() {
    const bookingRepo = new BookingRepo();
    const booking = new Booking(bookingsTestData[0]);
    bookingRepo.allBookings.push(booking);
    expect(bookingRepo.allBookings).to.deep.equal([booking]);
  })

  it('Should be able to store a booking', function() {
    const bookingRepo = new BookingRepo();
    const booking1 = new Booking(bookingsTestData[0]);
    const booking2 = new Booking(bookingsTestData[1]);
    const booking3 = new Booking(bookingsTestData[2]);
    bookingRepo.allBookings.push(booking1);
    bookingRepo.allBookings.push(booking2);
    bookingRepo.allBookings.push(booking3);
    expect(bookingRepo.allBookings.length).to.equal(3);
  })


});
