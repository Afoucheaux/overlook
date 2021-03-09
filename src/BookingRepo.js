class BookingRepo {
  constructor() {
    this.allBookings = [];
  }

  filterAvailableByDate(dateLooking, bookingList) {
    let fixDate = dateLooking.replaceAll("-", "/");
    let byDate = bookingList.filter(booking => booking.date === fixDate);
    let numbList = byDate.map(book => book.roomNumber);
    return numbList;
  }
}

export default BookingRepo;
