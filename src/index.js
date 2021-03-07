// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';
import './css/base.scss';
import Booking from './Booking';
import BookingRepo from './BookingRepo';
import User from './User';
import UserRepo from './UserRepo';
import Room from './Room';
import RoomRepo from './RoomRepo';
import Manager from './Manager';

// const singleCustUrl = 'http://localhost:3001/api/v1/customers/<id>'
const customersUrl = 'http://localhost:3001/api/v1/customers';
const roomsUrl = 'http://localhost:3001/api/v1/rooms';
const bookingsUrl = 'http://localhost:3001/api/v1/bookings';
const getCustomerData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());
let user = null;
let bookingData = [];
let userData = [];
let RoomRepo = [];
let todayDate = '2021/03/06';

function buildBookingData(getCustomerData) {
  getCustomerData.forEach(user => {
    userRepo.
  });
}

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');
