class BookingRepo {
  constructor() {
    this.allBookings = [];
  }

  filterAvailableByDate(dateLooking, bookingList) {
    let byDate = bookingList.filter(booking => booking.date === dateLooking);
    let numbList = byDate.map(book => book.roomNumber);
    return numbList;
  }
}

export default BookingRepo;
