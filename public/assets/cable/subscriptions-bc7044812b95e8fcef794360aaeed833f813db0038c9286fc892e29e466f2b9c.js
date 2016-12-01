(function(){var t=[].slice;Cable.Subscriptions=function(){function i(t){this.consumer=t,this.subscriptions=[],this.history=[]}return i.prototype.create=function(t,i){var n,e;return n=t,e="object"==typeof n?n:{channel:n},new Cable.Subscription(this,e,i)},i.prototype.add=function(t){return this.subscriptions.push(t),this.notify(t,"initialized"),this.sendCommand(t,"subscribe")},i.prototype.remove=function(t){if(this.forget(t),!this.findAll(t.identifier).length)return this.sendCommand(t,"unsubscribe")},i.prototype.reject=function(t){var i,n,e,r,o;for(e=this.findAll(t),r=[],i=0,n=e.length;i<n;i++)o=e[i],this.forget(o),r.push(this.notify(o,"rejected"));return r},i.prototype.forget=function(t){var i;return this.subscriptions=function(){var n,e,r,o;for(r=this.subscriptions,o=[],n=0,e=r.length;n<e;n++)i=r[n],i!==t&&o.push(i);return o}.call(this)},i.prototype.findAll=function(t){var i,n,e,r,o;for(e=this.subscriptions,r=[],i=0,n=e.length;i<n;i++)o=e[i],o.identifier===t&&r.push(o);return r},i.prototype.reload=function(){var t,i,n,e,r;for(n=this.subscriptions,e=[],t=0,i=n.length;t<i;t++)r=n[t],e.push(this.sendCommand(r,"subscribe"));return e},i.prototype.notifyAll=function(){var i,n,e,r,o,s,c;for(n=arguments[0],i=2<=arguments.length?t.call(arguments,1):[],o=this.subscriptions,s=[],e=0,r=o.length;e<r;e++)c=o[e],s.push(this.notify.apply(this,[c,n].concat(t.call(i))));return s},i.prototype.notify=function(){var i,n,e,r,o,s,c,h;for(c=arguments[0],n=arguments[1],i=3<=arguments.length?t.call(arguments,2):[],h="string"==typeof c?this.findAll(c):[c],s=[],e=0,o=h.length;e<o;e++)c=h[e],"function"==typeof c[n]&&c[n].apply(c,i),"initialized"===n||"connected"===n||"disconnected"===n||"rejected"===n?(r=c.identifier,s.push(this.record({notification:{identifier:r,callbackName:n,args:i}}))):s.push(void 0);return s},i.prototype.sendCommand=function(t,i){var n;return n=t.identifier,n===Cable.INTERNAL.identifiers.ping?this.consumer.connection.isOpen():this.consumer.send({command:i,identifier:n})},i.prototype.record=function(t){return t.time=new Date,this.history=this.history.slice(-19),this.history.push(t)},i.prototype.toJSON=function(){var t;return{history:this.history,identifiers:function(){var i,n,e,r;for(e=this.subscriptions,r=[],i=0,n=e.length;i<n;i++)t=e[i],r.push(t.identifier);return r}.call(this)}},i}()}).call(this);