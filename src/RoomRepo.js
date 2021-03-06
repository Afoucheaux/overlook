class RoomRepo {
  constructor() {
    this.allRooms = [];
  }

  updateRoomsAvailable(numList, roomList) {
    numList.forEach(num => {
      let room = roomList.find(roomNum => roomNum.number === num);
      room.booked();
    })
  }

  filterRooms(roomList, keyInStr, value) {
    if (keyInStr === undefined || value === undefined || value === 0) {
      return roomList;
    } else {
      let newList = roomList.filter(room => room[keyInStr] === value);
      return newList;
    }
  }


}

export default RoomRepo;
