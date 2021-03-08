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
let workingDate = ''
let todaysDate = '2021/03/06';
let currentRoom = {};
const headerName = document.getElementById('headerName');
const userBookings = document.getElementById('userPast');
const bookingArea = document.getElementById('bookingArea');
const custSpent = document.getElementById('custSpent');
const dateForm = document.getElementById('dateForm');
const dateSub = document.getElementById('dateSub');
const dateInput = document.getElementById('dateInput');
const roomSelector = document.getElementById('roomSelector');
const dateFor = document.getElementById('dateFor');
const bookSubTwo = document.getElementById('bookSubTwo');
const loadRoom = document.getElementById('loadRoom');
const currentNum = document.getElementById('currentNum');
const currentType = document.getElementById('currentType');
const price = document.getElementById('price');
const bedCount = document.getElementById('numBed');
const bidet = document.getElementById("bidet");
const test = document.querySelectorAll('input[type="radio"]');
const custPick = document.getElementById("custPick");
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
    displayElemt.insertAdjacentHTML('afterbegin', `<option class="bookingList" id="${booking.id}" value="default">${booking.date} room ${booking.roomNumber}</option>`)
  })
}

function updateCustomerSpent() {
  let spend = user.totalSpent(roomRepo);
  custSpent.innerText =`${user.name} total $${spend}`
}

function formDate(event) {
  event.preventDefault();
  let fixDate = dateInput.value;
  workingDate = dateInput.value;
  hide(dateFor);
  unHide(roomSelector);
  let roomlist = availableRooms(roomRepo.allRooms, fixDate);
  displayRooms(roomlist, bookingArea);
}

function availableRooms(list, date = todaysDate) {
  checkDate(date);
  let roomNum = bookingRepo.filterAvailableByDate(date, list);
  roomRepo.updateRoomsAvailable(roomNum, roomRepo.allRooms);
  let roomsToLoad = roomRepo.filterRooms(roomRepo.allRooms, 'available', true);
  workingRoomlist = roomsToLoad;
  return roomsToLoad;
}

function checkDate(date) {
  if (date < todaysDate) {
    date = todaysDate;
    workingDate = todaysDate;
  }
}

function displayRooms(array, displayElemt) {
  message(array)
  displayElemt.innerHTML = ""
  array.forEach(room => {
    displayElemt.insertAdjacentHTML('afterbegin', `<option class="bookingList" id="${room.number}" value="default">Room ${room.number} with ${room.numBeds} ${room.bedSize} for $ ${room.costPerNight} a night.</option>`);
  })
}

function message(array) {
  if (array.length === 0) {
    userBookings.innerText = `We got nothing for you!`
    custSpent.innerText =`Don't be so hard on us!`
  } else {
    userBookings.innerText = `All the deals!`
    custSpent.innerText =`Book today to save.`
  }
}

function formTwo() {
  event.preventDefault();
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

function moveToBookingCard(event) {
  let num = (event.target.id) * 1;
  let toLeftCard = roomRepo.allRooms.find(room => room.number === num);
  currentRoom = toLeftCard
  hide(dateFor);
  hide(roomSelector);
  addMainRoomMessage(toLeftCard);
}

function addMainRoomMessage(room) {
    unHide(loadRoom);
    currentNum.innerText = `Book this ${room.roomType}.`
    currentType.innerText = `With ${room.numBeds} ${room.bedSize}.`
    price.innerText = `For only ${room.costPerNight} a night.`
}

function bookingMessage(booking) {
  user.bookings.push(booking)
  currentNum.innerText = `You have reserved.`
  currentType.innerText = `Room ${booking.roomNumber} on ${booking.date}.`
  price.innerText = `Confirmation number ${booking.id}.`
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
bookingArea.addEventListener('dblclick', moveToBookingCard);
custPick.addEventListener('click', bookRoom);

function bookRoom(event) {
event.preventDefault(event);
  let newBooking = { "userID": user.id, "date": workingDate, "roomNumber":  currentRoom.number};
  fetch(bookingsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBooking),
  })
    .then(response => response.json())
    .then(update => bookingMessage(update.newBooking))
    .catch(error => console.log(error))
}




// ---- nores --- {

// { "userID": 48, "date": "2019/09/23", "roomNumber": 4 }




// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');
