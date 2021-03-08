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
let bookingRepo = [];
let userRepo = [];
let roomRepo = [];
let workingRoomlist = [];
let todaysDate = '2021/03/06';
const headerName = document.getElementById('headerName');
const userBookings = document.getElementById('userPast');
const bookingArea = document.getElementById('bookingArea');
const custSpent = document.getElementById('custSpent');
const dateForm = document.getElementById('dateForm');
const dateSub = document.getElementById('dateSub');
const dateInput = document.getElementById('dateInput');
const roomSelector = document.getElementById('roomSelector');
const dateFor = document.getElementById('dateFor');
const bookSubTwo = document.getElementById("bookSubTwo");
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
  custSpent.innerText =`${user.name} total $${spend}`
}

function formDate(event) {
  event.preventDefault();
  let fixDate = dateInput.value
  hide(dateFor);
  unHide(roomSelector);
  let roomlist = availableRooms(roomRepo.allRooms, fixDate);
  displayRooms(roomlist, bookingArea);
}

function availableRooms(list, date = todaysDate) {
  if (date < todaysDate) {
    date = todaysDate;
  }
  let roomNum = bookingRepo.filterAvailableByDate(date, list);
  roomRepo.updateRoomsAvailable(roomNum, roomRepo.allRooms);
  let roomsToLoad = roomRepo.filterRooms(roomRepo.allRooms, 'available', true);
  workingRoomlist = roomsToLoad;
  return roomsToLoad;
}

function displayRooms(array, displayElemt) {
  userBookings.innerText = `All the deals!`
  custSpent.innerText =`Book today to save.`
  displayElemt.innerHTML = ""
  array.forEach(room => {
    displayElemt.insertAdjacentHTML( 'afterbegin', `<option class="bookingList" id="${room.number}" value="default">Room ${room.number} with ${room.numBeds} ${room.bedSize} for $ ${room.costPerNight} a night.</option>`);
  })
}

function formTwo() {
  event.preventDefault();
  let bedCount = document.getElementById('numBed');
  let bidet = document.getElementById("bidet");
  let test = document.querySelectorAll('input[type="radio"]');
  let checkedTags = [];
  test.forEach(tag => {
    if (tag.checked) {
      checkedTags.push(tag.value)
    }
  })
  let filterOne = roomRepo.filterRooms(workingRoomlist, 'numBeds', bedCount.value * 1);
  let filterTwo = roomRepo.filterRooms(filterOne, 'bedSize', checkedTags[0]);
  let filterThree = roomRepo.filterRooms(filterTwo, 'bidet', bidet.checked);
  displayRooms(filterThree, bookingArea);
}

function hide(element) {
  element.classList.add('hidden')
}

function unHide(element) {
  element.classList.remove('hidden')
}

// ---- Event Listeners ----

dateSub.addEventListener('click', formDate);
bookSubTwo.addEventListener('click', formTwo);




// ---- nores ---



// function checkTags() {
//   var test = document.querySelectorAll('input[type="checkbox"]');
//   let checkedTags = []
//   test.forEach(tag => {
//     if (tag.checked) {
//       checkedTags.push(tag.name)
//     }
//   })
//   return checkedTags
// }

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');
