var db = firebase.firestore();
var remPlaces = document.getElementById("remaining-places");
var peopleData = {};
db.collection("general_info")
  .doc("people")
  .onSnapshot((snap) => {
    peopleData = snap.data();
    remPlaces.innerText = peopleData.total - peopleData.present;
  });
