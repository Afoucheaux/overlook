import './css/styles.scss';
import './css/base.scss';
import './images/inn.jpg';
import Booking from './Booking';
import BookingRepo from './BookingRepo';
import User from './User';
import UserRepo from './UserRepo';
import Room from './Room';
import RoomRepo from './RoomRepo';

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
const inputRadio = document.querySelectorAll('input[type="radio"]');
const custPick = document.getElementById('custPick');
const backToDash = document.getElementById('backToDash');
const userDashboard = document.getElementById('userDashboard');
const loginCard = document.getElementById('loginCard');
const logButton = document.getElementById('logButton');
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const dateHeader = document.getElementById('dateHeader');
const loginFail = document.getElementById('loginFail')

Promise.all([getRoomsData, getBookingsData, getCustomersData])
  .then((values) => {
    buildRoomsData(values[0]);
    buildBookingData(values[1]);
    buildCustomersData(values[2]);
  })

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

function buildCustomersData(customersData) {
  userRepo = new UserRepo();
  customersData.customers.forEach(user => {
    userRepo.allUsers.push(new User(user));
  });
}

function bookRoom() {
  let fixDate = workingDate.replaceAll("-", "/");
  console.log(user.id);
  console.log(fixDate);
  console.log(currentRoom.number)
  let newBooking = { "userID": user.id, "date": fixDate, "roomNumber": currentRoom.number};
  fetch(bookingsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBooking),
  })
    .then(response => response.json())
    .then(update => bookingMessage(update.newBooking))
    .catch(error => serverDown(error))
}

function serverDown(error) {
  currentNum.innerText = `Server Down.`;
  console.log(error);
}

function userLogIn() {
  let theUserName = userName.value;
  let theUserPassword = password.value;
  user = userRepo.allUsers.find(user => user.name === theUserName && user.password === theUserPassword);
  if (user === null || user === undefined) {
    loginFail.innerText = `Login failed, please try again.`;
    return
  } else {
    buildLoginDash();
  }
}

function buildLoginDash() {
  unHide(userDashboard);
  user.findBookings(bookingRepo);
  buildDashboard();
  hide(loginCard);
}

function buildDashboard() {
  unHide(headerName);
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
  custSpent.innerText = `${user.name} total $${spend}`
}

function formDate() {
  let fixDate = dateInput.value;
  let dateTocheck = checkDate(fixDate);
  if (dateTocheck === false) {
    dateHeader.innerText = `Can not book on past dates.`
    return
  } else {
    hide(dateFor);
    unHide(roomSelector);
    let roomlist = availableRooms(roomRepo.allRooms, fixDate);
    displayRooms(roomlist, bookingArea);
  }
}

function availableRooms(list, date = todaysDate) {
  let roomNum = bookingRepo.filterAvailableByDate(date, list);
  roomRepo.updateRoomsAvailable(roomNum, roomRepo.allRooms);
  let roomsToLoad = roomRepo.filterRooms(roomRepo.allRooms, 'available', true);
  workingRoomlist = roomsToLoad;
  return roomsToLoad;
}

function dateStringToNum(date) {
  let dateConvert = date.split('');
  let numFilter = dateConvert.filter(num => num !== '-' && num !== '/');
  let toJoin = numFilter.join('');
  let toNumber = toJoin * 1;
  return toNumber;
}

function checkDate(date) {
  let toNum = dateStringToNum(date);
  let toNumTwo = dateStringToNum(todaysDate);
  if (toNum < toNumTwo) {
    return false;
  } else {
    workingDate = date;
    return date;
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
    custSpent.innerText = `Don't be so hard on us!`
  } else {
    userBookings.innerText = `All the deals!`
    custSpent.innerText = `Book today to save.`
  }
}

function formTwo() {
  const tags = checkEventTags()
  let filterOne = roomRepo.filterRooms(workingRoomlist, 'bidet', bidet.checked);
  let filterTwo = roomRepo.filterRooms(filterOne, 'numBeds', bedCount.value * 1);
  let filterThree = roomRepo.filterRooms(filterTwo, 'roomType', tags[0]);
  displayRooms(filterThree, bookingArea);
}


function checkEventTags() {
  let checkedTags = [];
  inputRadio.forEach(tag => {
    if (tag.checked) {
      checkedTags.push(tag.value)
    }
  })
  return checkedTags;
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
  currentNum.innerText = `Book this ${room.roomType}.`;
  currentType.innerText = `With ${room.numBeds} ${room.bedSize}.`;
  price.innerText = `For only ${room.costPerNight} a night.`;
}

function bookingMessage(booking) {
  hide(custPick);
  unHide(backToDash);
  user.bookings.push(booking);
  currentNum.innerText = `You have reserved.`;
  currentType.innerText = `Room ${booking.roomNumber} on ${booking.date}.`;
  price.innerText = `Confirmation number ${booking.id}.`;
}

function startFresh() {
  hide(loadRoom);
  unHide(dateFor);
  userLogIn(user.name, user.password);
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
bookingArea.addEventListener('click', moveToBookingCard);
custPick.addEventListener('click', bookRoom);
backToDash.addEventListener('click', startFresh);
logButton.addEventListener('click', userLogIn);

// ---- nores --- {




// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
