//Modules
const { BrowserWindow } = require("electron");

//OffScreen BrowserWindow
let OffScreenWindow;

//Exported readItem function
module.exports = (url, callback) => {
  //Create offScreen window
  OffScreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  //Load item url
  OffScreenWindow.loadURL(url);

  //Wait for content finish loading
  OffScreenWindow.webContents.on("did-finish-load", (e) => {
    //Get page title
    let title = OffScreenWindow.getTitle();

    //Get screenshot (thumbnail)
    OffScreenWindow.webContents.capturePage().then((image) => {
      //Get image as dataURL
      let screenshot = image.toDataURL();

      //Execute callback new item objects
      callback({ title, screenshot, url });

      //Clean up //
      OffScreenWindow.close();
      OffScreenWindow = null;
    });
  });
};
