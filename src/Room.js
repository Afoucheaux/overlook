class Room {
  constructor(theRoom) {
    this.number = theRoom.number;
    this.roomType = theRoom.roomType;
    this.bidet = theRoom.bidet;
    this.bedSize = theRoom.bedSize;
    this.numBeds = theRoom.numBeds;
    this.costPerNight = theRoom.costPerNight;
    this.available = true;
  }

  booked() {
    this.available = false;
  }

}

export default Room;
