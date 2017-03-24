/** Requires */
const {app, BrowserWindow} = require('electron');
const EventEmitter = require('events').EventEmitter;
const path = require('path');
const url = require('url');
const {Poneys} = require('./poney');
const {Deadpool} = require('./deadpool');
const {SpiderMan} = require('./spider-man');

/** Instanciation */
const eventTime = new EventEmitter();
const deadpool = new Deadpool(eventTime);
const ranch = [];
const nbPoneys = Math.floor(Math.random() * 10) + 10;
const spiderman = new SpiderMan(deadpool);
let dayTime = 'day';
let win;
let contents;

function viewSimulation() {
  win.webContents.send('dayTimeEvent', dayTime);
  win.webContents.send('init', ranch);
  setInterval(() => {
    win.webContents.send('update', spiderman);
  }, 500);
}

function createWindow() {
  win = new BrowserWindow({width: 564, height: 536});
  contents = win.webContents;

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null;
  });
  deadpool.setInformWebEvent(contents);
  viewSimulation();
}

/** Initialisation */
eventTime.setMaxListeners(nbPoneys + 2);
for (let i = 0; i < nbPoneys; ++i) {
  const poney = new Poneys(deadpool, eventTime);
  ranch.push(poney);
}
deadpool.setRanch(ranch);
app.on('ready', createWindow);

/** Starting time */
eventTime.emit('tickDayTime', dayTime);
setInterval(() => {
  if (dayTime === 'day') {
    dayTime = 'night';
  }	else {
    dayTime = 'day';
  }
  eventTime.emit('tickDayTime', dayTime);
  win.webContents.send('dayTimeEvent', dayTime);
}, 12000);
