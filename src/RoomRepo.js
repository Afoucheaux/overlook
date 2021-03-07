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

  



}

export default RoomRepo;
