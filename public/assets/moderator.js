/*
 * File: app.js
 */
Ext.define("WsConnection",{singleton:!0,webSocket:new WebSocketRails("localhost:3000/websocket"),id:"",gameChannel:""}),Ext.application({autoCreateViewport:!0,name:"BiofuelsModerator",appFolder:"/assets/moderator",init:function(e){Ext.Loader.setConfig({enabled:!0})},launch:function(e){}});