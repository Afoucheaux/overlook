const customersTestData = [
  {"id":1, "name": "Person One"},
  {"id":2, "name": "Person Two"},
  {"id":3, "name": "Person Three"},
  {"id":4, "name": "Person Four"},
  {"id":5, "name": "Person Five"},
  {"id":6, "name": "Person Six"},
  {"id":7, "name": "Person Seven"},
  {"id":8, "name": "Person Eight"},
  {"id":9, "name": "Person Nine"},
  {"id":10, "name": "Person Ten"}
];

const roomsTestData = [
  {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":350.50},
  {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":475.50},
  {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":490.75},
  {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":430.25},
  {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.15}
  {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":400.00},
  {"number":7,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":2,"costPerNight":495.50},
  {"number":8,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":375.55},
  {"number":9,"roomType":"residential suite","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":340.00},
  {"number":10,"roomType":"single room","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":430.99}
];

const bookingsTestData = [
  {"id":"5fwrgu4i7k55hl6t5","userID":1,"date":"2020/01/24","roomNumber":1,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2020/01/10","roomNumber":2,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t7","userID":1,"date":"2020/02/16","roomNumber":3,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t8","userID":2,"date":"2020/02/05","roomNumber":4,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t9","userID":2,"date":"2020/02/14","roomNumber":5,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6ta","userID":2,"date":"2020/01/11","roomNumber":6,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tb","userID":3,"date":"2020/02/06","roomNumber":7,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tc","userID":3,"date":"2020/01/30","roomNumber":8,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6td","userID":3,"date":"2020/01/31","roomNumber":9,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6te","userID":4,"date":"2020/01/19","roomNumber":10,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tf","userID":4,"date":"2020/01/25","roomNumber":1,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tg","userID":4,"date":"2020/02/03","roomNumber":2,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6th","userID":5,"date":"2020/02/26","roomNumber":3,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6sz","userID":5,"date":"2020/04/22","roomNumber":4,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t5","userID":5,"date":"2020/01/24","roomNumber":5,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t6","userID":6,"date":"2020/01/10","roomNumber":6,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t7","userID":6,"date":"2020/02/16","roomNumber":7,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t8","userID":6,"date":"2020/02/05","roomNumber":8,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6t9","userID":7,"date":"2020/02/14","roomNumber":9,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6ta","userID":7,"date":"2020/01/11","roomNumber":10,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tb","userID":7,"date":"2020/02/06","roomNumber":1,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tc","userID":8,"date":"2020/01/30","roomNumber":2,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6td","userID":8,"date":"2020/01/31","roomNumber":3,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6te","userID":8,"date":"2020/01/19","roomNumber":4,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tf","userID":9,"date":"2020/01/25","roomNumber":5,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tb","userID":9,"date":"2020/02/06","roomNumber":6,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tc","userID":9,"date":"2020/01/30","roomNumber":7,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6td","userID":10,"date":"2020/01/31","roomNumber":8,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6te","userID":10,"date":"2020/01/19","roomNumber":9,"roomServiceCharges":[]},
  {"id":"5fwrgu4i7k55hl6tf","userID":10,"date":"2020/01/25","roomNumber":10,"roomServiceCharges":[]}
];


export default bookingsTestData;
export default roomsTestData;
export default customersTestData;
