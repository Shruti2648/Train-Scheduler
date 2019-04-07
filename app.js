var config = {
    apiKey: "AIzaSyCIQh1rEDJFElRgTDx1Y76fQgikPt3kN28",
    authDomain: "train-scheduler-63ed6.firebaseapp.com",
    databaseURL: "https://train-scheduler-63ed6.firebaseio.com",
    projectId: "train-scheduler-63ed6",
    storageBucket: "train-scheduler-63ed6.appspot.com",
    messagingSenderId: "740775079739"
  };
  firebase.initializeApp(config);

var database = firebase.database()
var index = 1
var name = ""
var destination = ""
var frequency = ""
var nextArrival = ""
var minutesAway = "" 

database.ref().on("child_added", function(snapshot) {
    var data = snapshot.val()
    console.log(data)
    createTrain(data)
})

function createTrain(data) {
    var train = data
    name = train.name
    destination = train.destination
    frequency = train.frequency
    index++

    var row = $("<tr>")
    var indexText = $("<th>").text(index)
    var nameText = $("<th>").text(name)
    var destinationText = $("<th>").text(destination)
    var frequencyText = $("<th>").text(frequency)
    var nextArrival2 = moment().endOf(frequency).fromNow()  
    var nextArrivalText = $("<th>").text(nextArrival2)
 
    row.append(indexText)
    row.append(nameText)
    row.append(destinationText)
    row.append(frequencyText)
    row.append(nextArrivalText)
    $("#train-table").append(row)
}

$(".submitForm").on("click", function(event) {

    event.preventDefault()
    name = $("#name").val().trim()
    destination = $("#destination").val().trim()
    frequency = $("#frequency").val().trim()
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })

})