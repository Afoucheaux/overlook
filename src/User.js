class User {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.password = 'overlook2021';
    this.bookings = [];
  }

  findBookings(bookingList) {
    this.bookings = bookingList.allBookings.filter(booking => booking.userID === this.id);
  }

  totalSpent(roomlist) {
    let totalSpend = this.bookings.reduce((acc, booking) => {
      let room = roomlist.allRooms.find(romNum => romNum.number === booking.roomNumber);
      acc += room.costPerNight;
      return acc
    }, 0)
    return totalSpend.toFixed(2);
  }

  addBooking(userbooking) {
    this.bookings.push(userbooking);
  }

}

export default User;
