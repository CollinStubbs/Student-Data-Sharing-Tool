function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Student Data Sharing')
  .addItem("Create Sheets", "newSheets")
  //.addItem("Force Update", "forceUpdate")

  .addToUi();
}

function newSheets() {
  
}