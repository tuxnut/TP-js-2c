require('electron').ipcRenderer.once('init', (event, poneys) => {
  console.log('caca');
  document.write('They are ' + poneys.length + ' poneys in the farm.<br></p>');
});
require('electron').ipcRenderer.on('update', (event, message) => {
  document.getElementById('deadpool_hp').innerHTML = 'Deadpool has ' +
  message.bff.hp + ' health points.';
  document.getElementById('nbUnicorn').innerHTML = 'They are ' +
  message.bff.nbUnicorn + ' unicorns.';
});
require('electron').ipcRenderer.on('transformToUnicornEvent', () => {
  document.getElementById('transformToUnicorn').innerHTML =
  'A poney has been transformed.';
  setTimeout(() => {
    document.getElementById('transformToUnicorn').innerHTML = '';
  }, 1500);
});
require('electron').ipcRenderer.on('fightingEvent', (event, amount) => {
  document.getElementById('deadpoolFighting').innerHTML =
  'Deadpool just fought ennemys and lost ' + amount + ' health points.';
  setTimeout(() => {
    document.getElementById('deadpoolFighting').innerHTML = '';
  }, 1500);
});
require('electron').ipcRenderer.on('ridingEvent', () => {
  document.getElementById('ridingEvent').innerHTML =
  'SpideMan just rode an unicorn.';
  setTimeout(() => {
    document.getElementById('ridingEvent').innerHTML = '';
  }, 1500);
});
require('electron').ipcRenderer.on('regenEvent', (event, amount) => {
  document.getElementById('regenEvent').innerHTML = 'Deadpool regenerated ' +
  amount + ' health points by using an unicorn energy.';
  setTimeout(() => {
    document.getElementById('regenEvent').innerHTML = '';
  }, 2500);
});

require('electron').ipcRenderer.on('dayTimeEvent', (event, dayTime) => {
  document.getElementById('dayTime').innerHTML = 'It is now the  ' + dayTime +
  ' .';
  setTimeout(() => {
    document.getElementById('dayTime').innerHTML = '';
  }, 2500);
});

require('electron').ipcRenderer.on('deadDeadpoolEvent', () => {
  document.getElementById('deadDeadpool').innerHTML = 'Deadpool is DEEAAAD.';
  setTimeout(() => {
    document.getElementById('deadDeadpool').innerHTML = '';
  }, 2500);
});
