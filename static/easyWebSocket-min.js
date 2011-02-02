EasyWebSocket=function(a){var b=this;this.url=a;this.resource=this.url.match(/.*:\/\/[^/]*\/(.+)/)[1];this.iframeOrigin="http://localhost:8080";this.iframeUrl=this.iframeOrigin+"/static/iframe.html";this._iframeCtor();this.onopen=function(){console.log("default onopen")};this.onmessage=function(){console.log("default onmessage")};this.onerror=function(){console.log("default onerror")};this.onclose=function(){console.log("default onclose")};window.addEventListener("message",function(c){c.origin==b.iframeOrigin&&
b._onWindowMessage(c)},false)};EasyWebSocket.prototype._onWindowMessage=function(a){a=JSON.parse(a.data);var b=a.type,c=a.data;console.log("recevied message from iframe",a);if(b=="connected")this.onopen();else b=="data"&&this.onmessage({data:c})};EasyWebSocket.prototype.send=function(a){this._iframeSendData(a)};EasyWebSocket.prototype.close=function(){this._iframeDtor()};
EasyWebSocket.prototype._iframeCtor=function(){var a=this;this.iframeId="EasyWebSocket-iframe-"+Math.floor(Math.random()*99999);var b=document.createElement("iframe");b.src=this.iframeUrl;b.id=this.iframeId;b.style.position="absolute";b.style.visibility="hidden";b.style.top=b.style.left="0";b.style.width=b.style.height="0";b.onload=function(){console.log("iframe loaded");a._iframeSendConnect()};document.getElementsByTagName("body")[0].appendChild(b)};
EasyWebSocket.prototype._iframeDtor=function(){var a=document.getElementById(this.iframeId);a.parent.removeChild(a)};EasyWebSocket.prototype._iframeExist=function(){return this.iframeId};EasyWebSocket.prototype._iframeSendRaw=function(a){console.log("iframeSendRaw(",a,")");document.getElementById(this.iframeId).contentWindow.postMessage(JSON.stringify(a),"*")};EasyWebSocket.prototype._iframeSendConnect=function(){this._iframeSendRaw({type:"connect",data:{resource:this.resource}})};
EasyWebSocket.prototype._iframeSendData=function(a){this._iframeSendRaw({type:"data",data:{message:a}})};EasyWebSocket.STATE={};EasyWebSocket.STATE.CONNECTING=0;EasyWebSocket.STATE.OPEN=1;EasyWebSocket.STATE.CLOSING=2;EasyWebSocket.STATE.CLOSED=3;
