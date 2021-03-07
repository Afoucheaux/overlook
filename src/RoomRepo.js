class RoomRepo {
  constructor() {
    this.allRooms = [];
  }

  filterByNumber(numList, roomList) {
    let newList = [];
    numList.forEach(num => {
      let room = roomList.find(roomNum => roomNum.number === num);
      newList.push(room)
    })
    return newList;
  }

  filterRooms(roomList, keyInStr, value) {
    if (keyInStr === undefined || value === undefined) {
      return roomList;
    } else {
      let newList = roomList.filter(room => room[keyInStr] === value);
      return newList;
    }
  }


}

export default RoomRepo;
