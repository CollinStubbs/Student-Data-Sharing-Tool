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
  
  
  
}