function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Student Data Sharing')
  .addItem("Create Sheets", "newSheets")
  //.addItem("Force Update", "forceUpdate")

  .addToUi();
}

function newSheets() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var data = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  
  var headers = data[0];
  var studentData = data.slice(1, data.length)//0 - email, 1 - fnam, 2 - lname, the rest is data

  for(var i = 0; i< studentData.length; i++){
    var email = studentData[i][0];
    var fName = studentData[i][1];
    var lName = studentData[i][2];
    //var info = studentData[i].slice(3, studentData[i].length); don't use this, make a =Query() function
    
    var newSS = SpreadsheetApp.create(lName+", "+fName);
    newSS.addViewer(email);
    var newSheet = newSS.getActiveSheet();
    var newHeaders = newSheet.getRange(1,1, 1, headers.length);
    newHeaders.setValues([headers]);
    
    var cell = newSheet.getRange(2, 1);
    //cell.setValue("=QUERY()") - finish this
    
  }
}