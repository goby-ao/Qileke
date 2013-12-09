$(function(){

$("#switchToDefault").click(function() {
chrome.tabs.update({url:"chrome-internal://newtab/"});
return false;
})

$("#tools").click(function(){

})

})

//added for dabase to save the mostvisit website , 2012 9 28...

/*var shadow = {};
shadow.storage = {};
shadow.storage.db = null;

shadow.storage.open = function() {
  var qilekedbSize = 1 * 1024 * 1024; // 2MB
  shadow.storage.db = openDatabase("shadow", "1.0", "qileke database", qilekedbSize);
}

  shadow.storage.createTable = function() {
  var db = shadow.storage.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS MostVisit(ID INTEGER PRIMARY KEY ASC, url TEXT, title TEXT,visits INTEGER , position INTEGER , userid INTEGER, added_on DATETIME)", []); 
  });
}

  shadow.storage.addMostVisit = function(urlText,titleText,counts) {
  var db = shadow.storage.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    // var visitCounts=0;
    var position=0;
    var userid=0;
    tx.executeSql("INSERT INTO MostVisit(url, title, visitCounts, position, userid, added_on) VALUES (?,?,?,?,?,?)",
        [urlText, titleText, counts, position, userid, addedOn],
        shadow.storage.onSuccess,
        shadow.storage.onError);
   });
}

  shadow.storage.onError = function(tx, e) {
    alert("There has been an error: " + e.message);
}

  shadow.storage.onSuccess = function(tx, r) {
  // re-render the data.
    shadow.storage.getAllMostVisit(loadMostVisit);
}

  shadow.storage.getAllMostVisit = function(renderFunc) {
  var db = shadow.storage.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM mostVisit", [], renderFunc,
        shadow.storage.onError);
  });
}*/


/*function loadMostVisit (){
}
*/