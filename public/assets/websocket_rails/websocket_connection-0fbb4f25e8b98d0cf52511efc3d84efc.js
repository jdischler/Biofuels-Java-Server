/*
WebSocket Interface for the WebSocketRails client.
*/
(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};WebSocketRails.WebSocketConnection=function(){function t(t,n){this.url=t,this.dispatcher=n,this.flush_queue=e(this.flush_queue,this),this.on_error=e(this.on_error,this),this.on_close=e(this.on_close,this),this.on_message=e(this.on_message,this),this.trigger=e(this.trigger,this),this.url.match(/^wss?:\/\//)||(this.url="ws://"+this.url),this.message_queue=[],this._conn=new WebSocket(this.url),this._conn.onmessage=this.on_message,this._conn.onclose=this.on_close,this._conn.onerror=this.on_error}return t.prototype.trigger=function(e){return this.dispatcher.state!=="connected"?this.message_queue.push(e):this._conn.send(e.serialize())},t.prototype.on_message=function(e){var t;return t=JSON.parse(e.data),this.dispatcher.new_message(t)},t.prototype.on_close=function(e){var t;return t=new WebSocketRails.Event(["connection_closed",{}]),this.dispatcher.dispatch(t)},t.prototype.on_error=function(e){var t;return t=new WebSocketRails.Event(["connection_error",e!=null?e.data:void 0]),this.dispatcher.dispatch(t)},t.prototype.flush_queue=function(){var e,t,n,r;r=this.message_queue;for(t=0,n=r.length;t<n;t++)e=r[t],this._conn.send(e.serialize());return this.message_queue=[]},t}()}).call(this);