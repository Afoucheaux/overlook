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
const getCustomersData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());
let user = null;
let bookingRepo= [];
let userRepo = [];
let roomRepo = [];
let todayDate = '2021/03/06';
const headerName = document.getElementById('headerName');
const userBookings = document.getElementById('userPast');
const bookingArea = document.getElementById('bookingArea');
const custSpent = document.getElementById('custSpent')
// ---- fetch functions and page builds ----

Promise.all([getRoomsData, getBookingsData, getCustomersData])
  .then((values) => {
    buildRoomsData(values[0]);
    buildBookingData(values[1]);
    buildCustomersData(values[2]);
    userLogIn('Leatha Ullrich', 'overlook2021');
  })

// --- function ---
function buildRoomsData(roomsObj) {
  roomRepo = new RoomRepo();
  roomsObj.rooms.forEach(room => {
    roomRepo.allRooms.push(new Room(room));
  });
}

function buildBookingData(bookingsObj) {
  bookingRepo = new BookingRepo();
  bookingsObj.bookings.forEach(user => {
    bookingRepo.allBookings.push(new Booking(user));
  });
}

function buildCustomersData(CustomersData) {
  userRepo = new UserRepo();
  CustomersData.customers.forEach(user => {
    userRepo.allUsers.push(new User(user));
  });
}

function userLogIn(name, password) {
  user = userRepo.allUsers.find(user => user.name === name);
  if (user.password === password) {
    user.findBookings(bookingRepo);
    buildDashboard();
  }
}

function buildDashboard() {
  headerName.innerText = user.name;
  userBookings.innerText = `${user.name} Bookings`
  displayUserBookings(user.bookings, bookingArea);
  updateCustomerSpent();
}

function displayUserBookings(array, displayElemt) {
  displayElemt.innerHTML = ""
  array.forEach(booking => {
    displayElemt.insertAdjacentHTML( 'afterbegin', `<option class="bookingList" id="${booking.id}" value="default">${booking.date} room ${booking.roomNumber}</option>`)
  })
}

function updateCustomerSpent() {
  let spend = user.totalSpent(roomRepo);
  custSpent.innerText =`${user.name} total $${spend}!`
}

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');
