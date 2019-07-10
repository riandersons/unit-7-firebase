





// ------------------------------
// 
// Steps to complete:  1. Initialize Firebase - proper reference, errors in call to firebase

// 1. Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLf3YSBmITp9dExicHCWXg75-x23O8jTs",
  authDomain: "train-schedule-61d93.firebaseapp.com",
  databaseURL: "https://train-schedule-61d93.firebaseio.com",
  projectId: "train-schedule-61d93",
  storageBucket: "",
  messagingSenderId: "96321649908",
  appId: "1:96321649908:web:cf2464d61ac2cbb9"
};
  
  firebase.initializeApp(firebaseConfig);
  
  const database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    const trainName = $("#train-name-input").val().trim();
    const destination = $("#destination-input").val().trim();
    const firstTime = $("#first-time-input").val().trim();
    // const empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    const frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    const newTrain = {
      name: trainName,
      destination: destination,
      time: firstTime,
      frequency: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());



  
    // Store everything into a variable.
    const trainName = childSnapshot.val().name;
    const destination = childSnapshot.val().destination;
    const firstTime = childSnapshot.val().time;
    const frequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
  
      
 // First Time (pushed back 1 year to make sure it comes before current time)
 let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 console.log(firstTimeConverted);

 // Current Time
 let currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 let tRemainder = diffTime % frequency;
 console.log(tRemainder);

 // Minute Until Train
 let tMinutesTillTrain = frequency - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 let nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 
    // Create the new row
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").prepend(newRow);
  });
  


   