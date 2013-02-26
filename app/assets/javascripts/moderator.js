/*
 * File: app.js
 */

Ext.define('WsConnection',{
  singleton: true,
  webSocket: new WebSocketRails('localhost:3000/websocket'),
  id: ''

  /*webSocket.on_open = function() {
    console.log('the sockets are open')
  };
  webSocket.on_close = function() {
    console.log('websocket onClose!!');
  };
  webSocket.on_message = function(message) {

    console.log('received msg!')

  };
  webSocket.on_error = function() {
    console.log('websocket onError!!');
  };*/
});

Ext.application({
    autoCreateViewport: true,
    name: 'BiofuelsModerator',
    appFolder: '/assets/moderator',


    //--------------------------------------------------------------------------
    init: function(application) {
      Ext.Loader.setConfig({
          enabled: true
      });
    },

    //--------------------------------------------------------------------------
    launch: function(profile) {
    }

});
