
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDtO3sD-Wjaa5BPVDjVjnFmgcRKb9uGZPA",
    authDomain: "timesheet-15465.firebaseapp.com",
    databaseURL: "https://timesheet-15465.firebaseio.com",
    projectId: "timesheet-15465",
    storageBucket: "timesheet-15465.appspot.com",
    messagingSenderId: "935580732376"
};
firebase.initializeApp(config);

let db = firebase.database();
let ref = db.ref("data");

$(document).on("click", "button[type='submit']", function() {
    ref.push({
        name: $("#name-input").val(), 
        role: $("#role-input").val(), 
        date: $("#date-input").val(),
        rate: $("#rate-input").val()
    });
})

$(document).ready(function() {

});


ref.on("child_added", function(snapshot, prevChildKey) {
    // console.log(snapshot.val());
    let startdate = moment(snapshot.val().date);
    let monthsWorked = moment().diff(startdate, "months")

    $("#table-body").append($("<tr>")
        .append($("<td>").html(snapshot.val().name))
        .append($("<td>").html(snapshot.val().role))
        .append($("<td>").html(snapshot.val().date))
        .append($("<td>").html(monthsWorked))
        .append($("<td>").html(snapshot.val().rate))
        .append($("<td>").html(monthsWorked * snapshot.val().rate))
    );
});