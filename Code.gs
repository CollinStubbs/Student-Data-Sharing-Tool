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
  var drive;
  if(DriveApp.getFoldersByName("Student Shared Data").hasNext()){
    drive = DriveApp.getFoldersByName("Student Shared Data").next();
  }else{
    drive = DriveApp.createFolder("Student Shared Data");
  }
    //NEED TO QUERY DTA HEADERS TOO FOR ADDITIONAL DATA

  for(var i = 0; i< studentData.length; i++){
    var email = studentData[i][0];
    var fName = studentData[i][1];
    var lName = studentData[i][2];
    //var info = studentData[i].slice(3, studentData[i].length); don't use this, make a =Query() function
    var newSS = SpreadsheetApp.create(lName+", "+fName);
    newSS.addViewer(email);
    file = newSS.getId();
    drive.addFile(DriveApp.getFileById(file))
    
    var newSheet = newSS.getActiveSheet();
    newSheet.getRange(1,1).setValue(lName);
    newSheet.getRange(1,2).setValue(fName);
    var newHeaders = newSheet.getRange(2,1, 1, headers.length);
    newHeaders.setValues([headers]);
    
    var cell = newSheet.getRange(3, 1);
    var query = "=QUERY(IMPORTRANGE(\"https://docs.google.com/spreadsheets/d/1pPBoPbChcyZuIQjX9S-KsF-hWxG5kgLl1AhGUdKeQeE/edit\",\"data!A2:Z\"), CONCATENATE(\"select * where Col3 = '\",A1, \"' AND Col2 = '\", B1, \"'\"), -1)";
    cell.setValue(query);
  }
}