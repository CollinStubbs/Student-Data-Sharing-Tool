/**
TODO:
  - figure out a way to do headers with multiple rows
      - "MCR3U-1" is on a divider row from headers to data
      - two query's? 
      - just first row is headers to be copied over
  - set starting data row as variable
  - three classes in a row vertically - if empty email cell, skip ahead
  
Assumptions:
  - emails are the first column
  - first name are second
  - last name are third
  - 1 row of header data
  - students have unique firstname lastname pairings
  - the sheet creator will only be run once

**/

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
  var link = ss.getId();
  //var startpoint = 
  
  //var headers = data[0];
  var studentData = data.slice(1, data.length)//0 - email, 1 - fnam, 2 - lname, the rest is data
  var drive;
  if(DriveApp.getFoldersByName("Student Shared Data").hasNext()){
    drive = DriveApp.getFoldersByName("Student Shared Data").next();
  }else{
    drive = DriveApp.createFolder("Student Shared Data");
  }
    //NEED TO QUERY DTA HEADERS TOO FOR ADDITIONAL DATA
  var eCol = findEmailCol(sheet);
  var errorRow = 1;
  for(var i = 0; i< studentData.length; i++){
    var email = studentData[i][eCol];
    var fName = studentData[i][eCol+2];
    var lName = studentData[i][eCol+1];
    //var info = studentData[i].slice(3, studentData[i].length); don't use this, make a =Query() function
    var newSS = SpreadsheetApp.create(lName+", "+fName);
    try{
      newSS.addViewer(email);
    }
    catch(e){
      var check = 0
      var errorSheet;
      var temp = ss.getSheets();
      for(var k = 0; k<temp.length; k++){
        if(temp[k].getName() == "Error Emails"){
          check = 1;
        }
      }
      if(check == 0){
        errorSheet = ss.insertSheet("Error Emails");
      }
      else{
        errorSheet = ss.getSheetByName("Error Emails");
      }
      
      errorSheet.getRange(errorRow, 1).setValue(email);
      errorSheet.getRange(errorRow, 2).setValue(e);
    }
    file = newSS.getId();
    drive.addFile(DriveApp.getFileById(file))
    
    var newSheet = newSS.getActiveSheet();
    newSheet.getRange(1,1).setValue(lName);
    newSheet.getRange(1,2).setValue(fName);
//    var newHeaders = newSheet.getRange(2,1, 1, headers.length);
//    newHeaders.setValues([headers]);
    
    var cell = newSheet.getRange(2, 1);
    var query = "=QUERY(IMPORTRANGE(\"https://docs.google.com/spreadsheets/d/"+link+"/edit\",\"data!A1:Z\"), CONCATENATE(\"select * where Col3 = '\",B1, \"' AND Col2 = '\", A1, \"'\"), -1)";
    cell.setValue(query);
  }
}


function findEmailCol(sheet){
 var col = null;
 var row = null;

 var fullData = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  for(var i = 0; i < fullData.length; i++){
    for(var j = 0; j < fullData[i].length; j++){
      if(fullData[i][j] == "email" || fullData[i][j] == "Email" || fullData[i][j] == "EMAIL"){
        col = j;
        row = i; //eventually use this to determine where the headers end maybe??
        break;
      }
    }
  }
  
 return col;
  
}