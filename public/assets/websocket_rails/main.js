/*
WebsocketRails JavaScript Client

Setting up the dispatcher:
  var dispatcher = new WebSocketRails('localhost:3000');
  dispatcher.on_open = function() {
    // trigger a server event immediately after opening connection
    dispatcher.trigger('new_user',{user_name: 'guest'});
  })

Triggering a new event on the server
  dispatcherer.trigger('event_name',object_to_be_serialized_to_json);

Listening for new events from the server
  dispatcher.bind('event_name', function(data) {
    console.log(data.user_name);
  });
*/
(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};window.WebSocketRails=function(){function t(n,r){this.url=n,this.use_websockets=r!=null?r:!0,this.pong=e(this.pong,this),this.supports_websockets=e(this.supports_websockets,this),this.dispatch_channel=e(this.dispatch_channel,this),this.subscribe_private=e(this.subscribe_private,this),this.subscribe=e(this.subscribe,this),this.dispatch=e(this.dispatch,this),this.trigger_event=e(this.trigger_event,this),this.trigger=e(this.trigger,this),this.bind=e(this.bind,this),this.connection_established=e(this.connection_established,this),this.new_message=e(this.new_message,this),this.state="connecting",this.callbacks={},this.channels={},this.queue={},!this.supports_websockets()||!this.use_websockets?this._conn=new t.HttpConnection(n,this):this._conn=new t.WebSocketConnection(n,this),this._conn.new_message=this.new_message}return t.prototype.new_message=function(e){var n,r,i,s,o,u;u=[];for(i=0,s=e.length;i<s;i++)r=e[i],n=new t.Event(r),n.is_result()?((o=this.queue[n.id])!=null&&o.run_callbacks(n.success,n.data),this.queue[n.id]=null):n.is_channel()?this.dispatch_channel(n):n.is_ping()?this.pong():this.dispatch(n),this.state==="connecting"&&n.name==="client_connected"?u.push(this.connection_established(n.data)):u.push(void 0);return u},t.prototype.connection_established=function(e){this.state="connected",this.connection_id=e.connection_id,this._conn.flush_queue(e.connection_id);if(this.on_open!=null)return this.on_open(e)},t.prototype.bind=function(e,t){var n,r;return(r=(n=this.callbacks)[e])==null&&(n[e]=[]),this.callbacks[e].push(t)},t.prototype.trigger=function(e,n,r,i){var s;return s=new t.Event([e,n,this.connection_id],r,i),this.queue[s.id]=s,this._conn.trigger(s)},t.prototype.trigger_event=function(e){var t,n,r;return(r=(t=this.queue)[n=e.id])==null&&(t[n]=e),this._conn.trigger(e)},t.prototype.dispatch=function(e){var t,n,r,i,s;if(this.callbacks[e.name]==null)return;i=this.callbacks[e.name],s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(t(e.data));return s},t.prototype.subscribe=function(e){var n;return this.channels[e]==null?(n=new t.Channel(e,this),this.channels[e]=n,n):this.channels[e]},t.prototype.subscribe_private=function(e){var n;return this.channels[e]==null?(n=new t.Channel(e,this,!0),this.channels[e]=n,n):this.channels[e]},t.prototype.dispatch_channel=function(e){if(this.channels[e.channel]==null)return;return this.channels[e.channel].dispatch(e.name,e.data)},t.prototype.supports_websockets=function(){return typeof WebSocket=="function"||typeof WebSocket=="object"},t.prototype.pong=function(){var e;return e=new t.Event(["websocket_rails.pong",{},this.connection_id]),this._conn.trigger(e)},t}()}).call(this),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};WebSocketRails.Event=function(){function t(t,n,r){var i;this.success_callback=n,this.failure_callback=r,this.run_callbacks=e(this.run_callbacks,this),this.attributes=e(this.attributes,this),this.serialize=e(this.serialize,this),this.is_ping=e(this.is_ping,this),this.is_result=e(this.is_result,this),this.is_channel=e(this.is_channel,this),this.name=t[0],i=t[1],i!=null&&(this.id=i["id"]!=null?i.id:(1+Math.random())*65536|0,this.channel=i.channel!=null?i.channel:void 0,this.data=i.data!=null?i.data:i,this.connection_id=t[2],i.success!=null&&(this.result=!0,this.success=i.success))}return t.prototype.is_channel=function(){return this.channel!=null},t.prototype.is_result=function(){return this.result===!0},t.prototype.is_ping=function(){return this.name==="websocket_rails.ping"},t.prototype.serialize=function(){return JSON.stringify([this.name,this.attributes()])},t.prototype.attributes=function(){return{id:this.id,channel:this.channel,data:this.data}},t.prototype.run_callbacks=function(e,t){return e===!0?typeof this.success_callback=="function"?this.success_callback(t):void 0:typeof this.failure_callback=="function"?this.failure_callback(t):void 0},t}()}.call(this),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};WebSocketRails.HttpConnection=function(){function t(t,n){this.url=t,this.dispatcher=n,this.flush_queue=e(this.flush_queue,this),this.trigger=e(this.trigger,this),this.parse_stream=e(this.parse_stream,this),this.createXMLHttpObject=e(this.createXMLHttpObject,this),this._conn=this.createXMLHttpObject(),this.last_pos=0,this.message_queue=[],this._conn.onreadystatechange=this.parse_stream,this._conn.open("GET","/websocket",!0),this._conn.send()}return t.prototype.httpFactories=function(){return[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}]},t.prototype.createXMLHttpObject=function(){var e,t,n,r,i;n=!1,e=this.httpFactories();for(r=0,i=e.length;r<i;r++){t=e[r];try{n=t()}catch(s){continue}break}return n},t.prototype.parse_stream=function(){var e,t;if(this._conn.readyState===3)return e=this._conn.responseText.substring(this.last_pos),this.last_pos=this._conn.responseText.length,e=e.replace(/\]\]\[\[/g,"],["),t=JSON.parse(e),this.dispatcher.new_message(t)},t.prototype.trigger=function(e){return this.dispatcher.state!=="connected"?this.message_queue.push(e):this.post_data(this.dispatcher.connection_id,e.serialize())},t.prototype.post_data=function(e,t){return $.ajax("/websocket",{type:"POST",data:{client_id:e,data:t},success:function(){}})},t.prototype.flush_queue=function(e){var t,n,r,i;i=this.message_queue;for(n=0,r=i.length;n<r;n++)t=i[n],e!=null&&(t.connection_id=this.dispatcher.connection_id),this.trigger(t);return this.message_queue=[]},t}()}.call(this),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};WebSocketRails.WebSocketConnection=function(){function t(t,n){this.url=t,this.dispatcher=n,this.flush_queue=e(this.flush_queue,this),this.on_error=e(this.on_error,this),this.on_close=e(this.on_close,this),this.on_message=e(this.on_message,this),this.trigger=e(this.trigger,this),this.url.match(/^wss?:\/\//)||(this.url="ws://"+this.url),this.message_queue=[],this._conn=new WebSocket(this.url),this._conn.onmessage=this.on_message,this._conn.onclose=this.on_close,this._conn.onerror=this.on_error}return t.prototype.trigger=function(e){return this.dispatcher.state!=="connected"?this.message_queue.push(e):this._conn.send(e.serialize())},t.prototype.on_message=function(e){var t;return t=JSON.parse(e.data),this.dispatcher.new_message(t)},t.prototype.on_close=function(e){var t;return t=new WebSocketRails.Event(["connection_closed",{}]),this.dispatcher.dispatch(t)},t.prototype.on_error=function(e){var t;return t=new WebSocketRails.Event(["connection_error",e!=null?e.data:void 0]),this.dispatcher.dispatch(t)},t.prototype.flush_queue=function(){var e,t,n,r;r=this.message_queue;for(t=0,n=r.length;t<n;t++)e=r[t],this._conn.send(e.serialize());return this.message_queue=[]},t}()}.call(this),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};WebSocketRails.Channel=function(){function t(t,n,r){var i,s;this.name=t,this._dispatcher=n,this.is_private=r,this._failure_launcher=e(this._failure_launcher,this),this._success_launcher=e(this._success_launcher,this),this.dispatch=e(this.dispatch,this),this.trigger=e(this.trigger,this),this.bind=e(this.bind,this),this.is_private?s="websocket_rails.subscribe_private":s="websocket_rails.subscribe",i=new WebSocketRails.Event([s,{data:{channel:this.name}},this._dispatcher.connection_id],this._success_launcher,this._failure_launcher),this._dispatcher.trigger_event(i),this._callbacks={}}return t.prototype.bind=function(e,t){var n,r;return(r=(n=this._callbacks)[e])==null&&(n[e]=[]),this._callbacks[e].push(t)},t.prototype.trigger=function(e,t){var n;return n=new WebSocketRails.Event([e,{channel:this.name,data:t},this._dispatcher.connection_id]),this._dispatcher.trigger_event(n)},t.prototype.dispatch=function(e,t){var n,r,i,s,o;if(this._callbacks[e]==null)return;s=this._callbacks[e],o=[];for(r=0,i=s.length;r<i;r++)n=s[r],o.push(n(t));return o},t.prototype._success_launcher=function(e){if(this.on_success!=null)return this.on_success(e)},t.prototype._failure_launcher=function(e){if(this.on_failure!=null)return this.on_failure(e)},t}()}.call(this);