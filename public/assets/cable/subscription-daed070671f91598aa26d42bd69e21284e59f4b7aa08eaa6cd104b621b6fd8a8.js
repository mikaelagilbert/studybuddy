(function(){Cable.Subscription=function(){function i(i,n,s){this.subscriptions=i,null==n&&(n={}),this.identifier=JSON.stringify(n),t(this,s),this.subscriptions.add(this),this.consumer=this.subscriptions.consumer}var t;return i.prototype.perform=function(i,t){return null==t&&(t={}),t.action=i,this.send(t)},i.prototype.send=function(i){return this.consumer.send({command:"message",identifier:this.identifier,data:JSON.stringify(i)})},i.prototype.unsubscribe=function(){return this.subscriptions.remove(this)},t=function(i,t){var n,s;if(null!=t)for(n in t)s=t[n],i[n]=s;return i},i}()}).call(this);