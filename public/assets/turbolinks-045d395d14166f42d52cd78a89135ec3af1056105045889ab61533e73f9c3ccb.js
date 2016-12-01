(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,n){return t.controller.visit(e,n)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,n;t.copyObject=function(t){var e,n,i;n={};for(e in t)i=t[e],n[e]=i;return n},t.closest=function(t,n){return e.call(t,n)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&n.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var n,i,r,o,s;return o=null!=e?e:{},s=o.target,n=o.cancelable,i=o.data,r=document.createEvent("Events"),r.initEvent(t,!0,n===!0),r.data=null!=i?i:{},(null!=s?s:document).dispatchEvent(r),r},t.match=function(t,e){return n.call(t,e)},n=function(){var t,e,n,i;return t=document.documentElement,null!=(e=null!=(n=null!=(i=t.matchesSelector)?i:t.webkitMatchesSelector)?n:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,n;for(n="",t=e=1;36>=e;t=++e)n+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return n}}).call(this),function(){t.Location=function(){function t(t){var e,n;null==t&&(t=""),n=document.createElement("a"),n.href=t.toString(),this.absoluteURL=n.href,e=n.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=n.hash.slice(1))}var e,n,i,r;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=n(t),this.isEqualTo(t)||r(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},n=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return i(t,"/")?t:t+"/"},r=function(t,e){return t.slice(0,e.length)===e},i=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function n(n,i,r){this.delegate=n,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(i).requestURL,this.referrer=t.Location.wrap(r).absoluteURL,this.createXHR()}return n.NETWORK_FAILURE=0,n.TIMEOUT_FAILURE=-1,n.timeout=60,n.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},n.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},n.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},n.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},n.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},n.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},n.prototype.requestCanceled=function(){return this.endRequest()},n.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},n.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},n.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},n.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},n.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},n.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},n}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var n;return n=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+n+"ms ease-out, opacity "+n/2+"ms "+n/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*n)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,n)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function n(n){this.controller=n,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var i,r,o,s;return s=t.HttpRequest,i=s.NETWORK_FAILURE,o=s.TIMEOUT_FAILURE,r=500,n.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},n.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},n.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},n.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},n.prototype.visitRequestCompleted=function(t){return t.loadResponse()},n.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case i:case o:return this.reload();default:return t.loadResponse()}},n.prototype.visitRequestFinished=function(){return this.hideProgressBar()},n.prototype.visitCompleted=function(t){return t.followRedirect()},n.prototype.pageInvalidated=function(){return this.reload()},n.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,r)},n.prototype.showProgressBar=function(){return this.progressBar.show()},n.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},n.prototype.reload=function(){return window.location.reload()},n}()}.call(this),function(){var e,n=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function i(t){this.delegate=t,this.onPopState=n(this.onPopState,this)}return i.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},i.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},i.prototype.push=function(e,n){return e=t.Location.wrap(e),this.update("push",e,n)},i.prototype.replace=function(e,n){return e=t.Location.wrap(e),this.update("replace",e,n)},i.prototype.onPopState=function(e){var n,i,r,o;return this.shouldHandlePopState()&&(o=null!=(i=e.state)?i.turbolinks:void 0)?(n=t.Location.wrap(window.location),r=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(n,r)):void 0},i.prototype.shouldHandlePopState=function(){return e===!0},i.prototype.update=function(t,e,n){var i;return i={turbolinks:{restorationIdentifier:n}},history[t+"State"](i,null,e)},i}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,n;n=t.head,e=t.body,this.head=null!=n?n:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,n;return n=null!=(e=this.getSetting("root"))?e:"/",new t.Location(n)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(t){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,n;return n=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=n[n.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var n;return t.render=function(){var t,n,i,r;return i=arguments[0],n=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],r=function(t,e,n){n.prototype=t.prototype;var i=new n,r=t.apply(i,e);return Object(r)===r?r:i}(this,t,function(){}),r.delegate=i,r.render(n),r},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,n(e,t),e)},n=function(t,e){var n,i,r,o,s,a,c;for(o=e.attributes,a=[],n=0,i=o.length;i>n;n++)s=o[n],r=s.name,c=s.value,a.push(t.setAttribute(r,c));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,n,o,s,a,c,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,c=l.length;c>s;s++)o=l[s],o.nodeType===Node.ELEMENT_NODE&&(a=o.outerHTML,n=null!=(e=this.elements)[a]?e[a]:e[a]={type:r(o),tracked:i(o),elements:[]},n.elements.push(o))}var e,n,i,r;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var n,i;n=this.elements,i=[];for(t in n)e=n[t].tracked,e&&i.push(t);return i}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var n,i,r,o,s,a;r=this.elements,s=[];for(i in r)o=r[i],a=o.type,n=o.elements,a!==t||e.hasElementWithKey(i)||s.push(n[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,n,i,r,o,s;n=[],i=this.elements;for(e in i)r=i[e],s=r.type,o=r.tracked,t=r.elements,null!=s||o?t.length>1&&n.push.apply(n,t.slice(1)):n.push.apply(n,t);return n},r=function(t){return e(t)?"script":n(t)?"stylesheet":void 0},i=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function i(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.SnapshotRenderer=function(n){function i(e,n){this.currentSnapshot=e,this.newSnapshot=n,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(i,n),i.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},i.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},i.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},i.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},i.prototype.copyNewHeadStylesheetElements=function(){var t,e,n,i,r;for(i=this.getNewHeadStylesheetElements(),r=[],e=0,n=i.length;n>e;e++)t=i[e],r.push(document.head.appendChild(t));return r},i.prototype.copyNewHeadScriptElements=function(){var t,e,n,i,r;for(i=this.getNewHeadScriptElements(),r=[],e=0,n=i.length;n>e;e++)t=i[e],r.push(document.head.appendChild(this.createScriptElement(t)));return r},i.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,n,i,r;for(i=this.getCurrentHeadProvisionalElements(),r=[],e=0,n=i.length;n>e;e++)t=i[e],r.push(document.head.removeChild(t));return r},i.prototype.copyNewHeadProvisionalElements=function(){var t,e,n,i,r;for(i=this.getNewHeadProvisionalElements(),r=[],e=0,n=i.length;n>e;e++)t=i[e],r.push(document.head.appendChild(t));return r},i.prototype.importBodyPermanentElements=function(){var t,e,n,i,r,o;for(i=this.getNewBodyPermanentElements(),o=[],e=0,n=i.length;n>e;e++)r=i[e],(t=this.findCurrentBodyPermanentElement(r))?o.push(r.parentNode.replaceChild(t,r)):o.push(void 0);return o},i.prototype.activateBodyScriptElements=function(){var t,e,n,i,r,o;for(i=this.getNewBodyScriptElements(),o=[],e=0,n=i.length;n>e;e++)r=i[e],t=this.createScriptElement(r),o.push(r.parentNode.replaceChild(t,r));return o},i.prototype.assignNewBody=function(){return document.body=this.newBody},i.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},i.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},i.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},i.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},i.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},i.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},i.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},i.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},i.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},i}(t.Renderer)}.call(this),function(){var e=function(t,e){function i(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.ErrorRenderer=function(t){function n(t){this.html=t}return e(n,t),n.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},n.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},n.prototype.activateBodyScriptElements=function(){var t,e,n,i,r,o;for(i=this.getScriptElements(),o=[],e=0,n=i.length;n>e;e++)r=i[e],t=this.createScriptElement(r),o.push(r.parentNode.replaceChild(t,r));return o},n.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},n}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var n,i,r;return r=t.snapshot,n=t.error,i=t.isPreview,this.markAsPreview(i),null!=r?this.renderSnapshot(r,e):this.renderError(n,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,n){return t.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,n){return t.ErrorRenderer.render(this.delegate,n,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,n;return e=t.x,n=t.y,window.scrollTo(e,n)},t.prototype.onScroll=function(){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var n;return e.prototype.has=function(t){var e;return e=n(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=n(t),this.snapshots[e]},e.prototype.write=function(t,e){var i;return i=n(t),this.snapshots[i]=e},e.prototype.touch=function(t){var e,i;return i=n(t),e=this.keys.indexOf(i),e>-1&&this.keys.splice(e,1),this.keys.unshift(i),this.trim()},e.prototype.trim=function(){var t,e,n,i,r;for(i=this.keys.splice(this.size),r=[],t=0,n=i.length;n>t;t++)e=i[t],r.push(delete this.snapshots[e]);return r},n=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function n(n,i,r){this.controller=n,this.action=r,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(i),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var i;return n.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},n.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},n.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},n.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},n.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=i(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},n.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},n.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},n.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},n.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var n;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(n=this.adapter).visitRendered&&n.visitRendered(this),t?void 0:this.complete()})):void 0},n.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},n.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},n.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},n.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},n.prototype.requestCompletedWithResponse=function(e,n){return this.response=e,null!=n&&(this.redirectedToLocation=t.Location.wrap(n)),this.adapter.visitRequestCompleted(this)},n.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},n.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},n.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},n.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},n.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},n.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},n.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},n.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},i=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},n.prototype.shouldIssueRequest=function(){return"restore"!==this.action||!this.hasCachedSnapshot()},n.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},n.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},n.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},n}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function n(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return n.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},n.prototype.disable=function(){return this.enabled=!1},n.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},n.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},n.prototype.visit=function(e,n){var i,r;return null==n&&(n={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(i=null!=(r=n.action)?r:"advance",this.adapter.visitProposedToLocationWithAction(e,i)):window.location=e:void 0},n.prototype.startVisitToLocationWithAction=function(e,n,i){var r;return t.supported?(r=this.getRestorationDataForIdentifier(i),this.startVisit(e,n,{restorationData:r})):window.location=e},n.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},n.prototype.stopHistory=function(){return this.history.stop()},n.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,n){return this.restorationIdentifier=n,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},n.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,n){return this.restorationIdentifier=n,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},n.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,n){var i;return this.restorationIdentifier=n,this.enabled?(i=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:i,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},n.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},n.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},n.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},n.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},n.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},n.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},n.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},n.prototype.render=function(t,e){return this.view.render(t,e)},n.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},n.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},n.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},n.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},n.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},n.prototype.clickBubbled=function(t){var e,n,i;return this.enabled&&this.clickEventIsSignificant(t)&&(n=this.getVisitableLinkForNode(t.target))&&(i=this.getVisitableLocationForLink(n))&&this.applicationAllowsFollowingLinkToLocation(n,i)?(t.preventDefault(),e=this.getActionForLink(n),this.visit(i,{action:e})):void 0},n.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var n;return n=this.notifyApplicationAfterClickingLinkToLocation(t,e),!n.defaultPrevented},n.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},n.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,n){return t.dispatch("turbolinks:click",{target:e,data:{url:n.absoluteURL},cancelable:!0})},n.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},n.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},n.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},n.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},n.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},n.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},n.prototype.startVisit=function(t,e,n){var i;return null!=(i=this.currentVisit)&&i.cancel(),this.currentVisit=this.createVisit(t,e,n),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},n.prototype.createVisit=function(e,n,i){
var r,o,s,a,c;return o=null!=i?i:{},a=o.restorationIdentifier,s=o.restorationData,r=o.historyChanged,c=new t.Visit(this,e,n),c.restorationIdentifier=null!=a?a:t.uuid(),c.restorationData=t.copyObject(s),c.historyChanged=r,c.referrer=this.location,c},n.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},n.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},n.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},n.prototype.getVisitableLocationForLink=function(e){var n;return n=new t.Location(e.getAttribute("href")),this.locationIsVisitable(n)?n:void 0},n.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},n.prototype.nodeIsVisitable=function(e){var n;return!(n=t.closest(e,"[data-turbolinks]"))||"false"!==n.getAttribute("data-turbolinks")},n.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},n.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},n.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},n}()}.call(this),function(){var e,n,i;t.start=function(){return n()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},n=function(){return null==window.Turbolinks&&(window.Turbolinks=t),i()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},i=function(){return window.Turbolinks===t},i()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);