!function(e,t){function r(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function n(){return E++}function s(e){return e.match(T)[0]}function o(e){for(e=e.replace(A,"/"),e=e.replace(N,"$1/");e.match(L);)e=e.replace(L,"/");return e}function i(e){var t=e.length-1,r=e.charAt(t);return"#"===r?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||"/"===r?e:e+".js"}function a(e){var t=b.alias;return t&&P(t[e])?t[e]:e}function u(e){var t,r=b.paths;return r&&(t=e.match(O))&&P(r[t[1]])&&(e=r[t[1]]+t[2]),e}function c(e){var t=b.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(_,function(e,r){return P(t[r])?t[r]:e})),e}function l(e){var t=b.map,r=e;if(t)for(var n=0,s=t.length;s>n;n++){var o=t[n];if(r=S(o)?o(e)||e:e.replace(o[0],o[1]),r!==e)break}return r}function f(e,t){var r,n=e.charAt(0);if(R.test(e))r=e;else if("."===n)r=o((t?s(t):b.cwd)+e);else if("/"===n){var i=b.cwd.match(C);r=i?i[0]+e.substring(1):e}else r=b.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function p(e,t){if(!e)return"";e=a(e),e=u(e),e=c(e),e=i(e);var r=f(e,t);return r=l(r)}function h(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function d(e,t,r){var n=U.createElement("script");if(r){var s=S(r)?r(e):r;s&&(n.charset=s)}g(n,t,e),n.async=!0,n.src=e,X=n,B?G.insertBefore(n,B):G.appendChild(n),X=null}function g(e,t,r){function n(){e.onload=e.onerror=e.onreadystatechange=null,b.debug||G.removeChild(e),e=null,t()}var s="onload"in e;s?(e.onload=n,e.onerror=function(){k("error",{uri:r,node:e}),n()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&n()}}function v(){if(X)return X;if(H&&"interactive"===H.readyState)return H;for(var e=G.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var r=e[t];if("interactive"===r.readyState)return H=r}}function m(e){var t=[];return e.replace(V,"").replace($,function(e,r,n){n&&t.push(n)}),t}function y(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var w=e.seajs={version:"2.3.0"},b=w.data={},x=r("Object"),P=r("String"),q=Array.isArray||r("Array"),S=r("Function"),E=0,j=b.events={};w.on=function(e,t){var r=j[e]||(j[e]=[]);return r.push(t),w},w.off=function(e,t){if(!e&&!t)return j=b.events={},w;var r=j[e];if(r)if(t)for(var n=r.length-1;n>=0;n--)r[n]===t&&r.splice(n,1);else delete j[e];return w};var k=w.emit=function(e,t){var r=j[e];if(r){r=r.slice();for(var n=0,s=r.length;s>n;n++)r[n](t)}return w},T=/[^?#]*\//,A=/\/\.\//g,L=/\/[^/]+\/\.\.\//,N=/([^:/])\/+\//g,O=/^([^/:]+)(\/.+)$/,_=/{([^{]+)}/g,R=/^\/\/.|:\//,C=/^.*?\/\/.*?\//,U=document,D=location.href&&0!==location.href.indexOf("about:")?s(location.href):"",M=U.scripts,I=U.getElementById("seajsnode")||M[M.length-1],F=s(h(I)||D);w.resolve=p;var X,H,G=U.head||U.getElementsByTagName("head")[0]||U.documentElement,B=G.getElementsByTagName("base")[0];w.request=d;var W,$=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,V=/\\\\/g,z=w.cache={},J={},K={},Q={},Y=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,r=[],n=0,s=t.length;s>n;n++)r[n]=y.resolve(t[n],e.uri);return r},y.prototype.load=function(){var e=this;if(!(e.status>=Y.LOADING)){e.status=Y.LOADING;var r=e.resolve();k("load",r);for(var n,s=e._remain=r.length,o=0;s>o;o++)n=y.get(r[o]),n.status<Y.LOADED?n._waitings[e.uri]=(n._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var i={};for(o=0;s>o;o++)n=z[r[o]],n.status<Y.FETCHING?n.fetch(i):n.status===Y.SAVED&&n.load();for(var a in i)i.hasOwnProperty(a)&&i[a]()}},y.prototype.onload=function(){var e=this;e.status=Y.LOADED,e.callback&&e.callback();var t,r,n=e._waitings;for(t in n)n.hasOwnProperty(t)&&(r=z[t],r._remain-=n[t],0===r._remain&&r.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function r(){w.request(i.requestUri,i.onRequest,i.charset)}function n(){delete J[a],K[a]=!0,W&&(y.save(o,W),W=null);var e,t=Q[a];for(delete Q[a];e=t.shift();)e.load()}var s=this,o=s.uri;s.status=Y.FETCHING;var i={uri:o};k("fetch",i);var a=i.requestUri||o;return!a||K[a]?(s.load(),t):J[a]?(Q[a].push(s),t):(J[a]=!0,Q[a]=[s],k("request",i={uri:o,requestUri:a,onRequest:n,charset:b.charset}),i.requested||(e?e[i.requestUri]=r:r()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var r=this;if(r.status>=Y.EXECUTING)return r.exports;r.status=Y.EXECUTING;var s=r.uri;e.resolve=function(e){return y.resolve(e,s)},e.async=function(t,r){return y.use(t,r,s+"_async_"+n()),e};var o=r.factory,i=S(o)?o(e,r.exports={},r):o;return i===t&&(i=r.exports),delete r.factory,r.exports=i,r.status=Y.EXECUTED,k("exec",r),i},y.resolve=function(e,t){var r={id:e,refUri:t};return k("resolve",r),r.uri||w.resolve(r.id,t)},y.define=function(e,r,n){var s=arguments.length;1===s?(n=e,e=t):2===s&&(n=r,q(e)?(r=e,e=t):r=t),!q(r)&&S(n)&&(r=m(""+n));var o={id:e,uri:y.resolve(e),deps:r,factory:n};if(!o.uri&&U.attachEvent){var i=v();i&&(o.uri=i.src)}k("define",o),o.uri?y.save(o.uri,o):W=o},y.save=function(e,t){var r=y.get(e);r.status<Y.SAVED&&(r.id=t.id||e,r.dependencies=t.deps||[],r.factory=t.factory,r.status=Y.SAVED,k("save",r))},y.get=function(e,t){return z[e]||(z[e]=new y(e,t))},y.use=function(t,r,n){var s=y.get(n,q(t)?t:[t]);s.callback=function(){for(var t=[],n=s.resolve(),o=0,i=n.length;i>o;o++)t[o]=z[n[o]].exec();r&&r.apply(e,t),delete s.callback},s.load()},w.use=function(e,t){return y.use(e,t,b.cwd+"_use_"+n()),w},y.define.cmd={},e.define=y.define,w.Module=y,b.fetchedList=K,b.cid=n,w.require=function(e){var t=y.get(y.resolve(e));return t.status<Y.EXECUTING&&(t.onload(),t.exec()),t.exports},b.base=F,b.dir=F,b.cwd=D,b.charset="utf-8",w.config=function(e){for(var t in e){var r=e[t],n=b[t];if(n&&x(n))for(var s in r)n[s]=r[s];else q(n)?r=n.concat(r):"base"===t&&("/"!==r.slice(-1)&&(r+="/"),r=f(r)),b[t]=r}return k("config",e),w}}}(this),function(){function e(e){a[e.name]=e}function t(e){return e&&a.hasOwnProperty(e)}function r(e){for(var r in a)if(t(r)){var n=","+a[r].ext.join(",")+",";if(n.indexOf(","+e+",")>-1)return r}}function n(e,t){var r=i.XMLHttpRequest?new i.XMLHttpRequest:new i.ActiveXObject("Microsoft.XMLHTTP");return r.open("GET",e,!0),r.onreadystatechange=function(){if(4===r.readyState){if(r.status>399&&r.status<600)throw new Error("Could not load: "+e+", status = "+r.status);t(r.responseText)}},r.send(null)}function s(e){e&&/\S/.test(e)&&(i.execScript||function(e){(i.eval||eval).call(i,e)})(e)}function o(e){return e.replace(/(["\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")}var i=window,a={},u={};e({name:"text",ext:[".tpl",".html"],exec:function(e,t){s('define("'+e+'#", [], "'+o(t)+'")')}}),e({name:"json",ext:[".json"],exec:function(e,t){s('define("'+e+'#", [], '+t+")")}}),e({name:"handlebars",ext:[".handlebars"],exec:function(e,t){var r=['define("'+e+'#", ["handlebars"], function(require, exports, module) {','  var source = "'+o(t)+'"','  var Handlebars = require("handlebars")["default"]',"  module.exports = function(data, options) {","    options || (options = {})","    options.helpers || (options.helpers = {})","    for (var key in Handlebars.helpers) {","      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]","    }","    return Handlebars.compile(source)(data, options)","  }","})"].join("\n");s(r)}}),seajs.on("resolve",function(e){var n=e.id;if(!n)return"";var s,o;(o=n.match(/^(\w+)!(.+)$/))&&t(o[1])?(s=o[1],n=o[2]):(o=n.match(/[^?]+(\.\w+)(?:\?|#|$)/))&&(s=r(o[1])),s&&-1===n.indexOf("#")&&(n+="#");var i=seajs.resolve(n,e.refUri);s&&(u[i]=s),e.uri=i}),seajs.on("request",function(e){var t=u[e.uri];t&&(n(e.requestUri,function(r){a[t].exec(e.uri,r),e.onRequest()}),e.requested=!0)}),define("seajs/seajs-text/1.1.1/seajs-text-debug",[],{})}(),function(){function e(e){return n[typeof e]||n[String.prototype.toString.call(e)]||(e?"object":"null")}function t(t){return"string"===e(t)?t.toLowerCase():t}function r(){var e=parseInt((/msie (\d+)/.exec(t(navigator.userAgent))||[])[1],10);return isNaN(e)&&(e=parseInt((/trident\/.*; rv:(\d+)/.exec(t(navigator.userAgent))||[])[1],10)),isNaN(e)&&(e=!1),e}var n={undefined:"undefined",number:"number","boolean":"boolean",string:"string","[object Function]":"function","[object RegExp]":"regexp","[object Array]":"array","[object Date]":"date","[object Error]":"error","[object File]":"file","[object Blob]":"blob"},s=r();if(!(s&&8>s)){var o,i,a,u,c,l,f,p,h,d,g,v,m,y,w,b,x,P,q,S,E,j,k,T,A,L,N,O,_,R,C,U,D,M,I,F,X,H,G,B,W,$,V,z,J,K,Q,Y,Z=[].slice,et={}.hasOwnProperty,tt=function(e,t){function r(){this.constructor=e}for(var n in t)et.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},rt=[].indexOf||function(e){for(var t=0,r=this.length;r>t;t++)if(t in this&&this[t]===e)return t;return-1};for(S={catchupTime:500,initialRate:.03,minTime:500,ghostTime:500,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},O=function(){var e;return null!=(e="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?e:+new Date},R=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,q=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==R&&(R=function(e){return setTimeout(e,50)},q=function(e){return clearTimeout(e)}),U=function(e){var t,r;return t=O(),(r=function(){var n;return n=O()-t,n>=33?(t=O(),e(n,function(){return R(r)})):setTimeout(r,33-n)})()},C=function(){var e,t,r;return r=arguments[0],t=arguments[1],e=3<=arguments.length?Z.call(arguments,2):[],"function"==typeof r[t]?r[t].apply(r,e):r[t]},E=function(){var e,t,r,n,s,o,i;for(t=arguments[0],n=2<=arguments.length?Z.call(arguments,1):[],o=0,i=n.length;i>o;o++)if(r=n[o])for(e in r)et.call(r,e)&&(s=r[e],null!=t[e]&&"object"==typeof t[e]&&null!=s&&"object"==typeof s?E(t[e],s):t[e]=s);return t},b=function(e){var t,r,n,s,o;for(r=t=0,s=0,o=e.length;o>s;s++)n=e[s],r+=Math.abs(n),t++;return r/t},k=function(e,t){var r,n,s;if(null==e&&(e="options"),null==t&&(t=!0),s=document.querySelector("[data-pace-"+e+"]")){if(r=s.getAttribute("data-pace-"+e),!t)return r;try{return JSON.parse(r)}catch(o){return n=o,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",n):void 0}}},f=function(){function e(){}return e.prototype.on=function(e,t,r,n){var s;return null==n&&(n=!1),null==this.bindings&&(this.bindings={}),null==(s=this.bindings)[e]&&(s[e]=[]),this.bindings[e].push({handler:t,ctx:r,once:n})},e.prototype.once=function(e,t,r){return this.on(e,t,r,!0)},e.prototype.off=function(e,t){var r,n,s;if(null!=(null!=(n=this.bindings)?n[e]:void 0)){if(null==t)return delete this.bindings[e];for(r=0,s=[];r<this.bindings[e].length;)s.push(this.bindings[e][r].handler===t?this.bindings[e].splice(r,1):r++);return s}},e.prototype.trigger=function(){var e,t,r,n,s,o,i,a,u;if(r=arguments[0],e=2<=arguments.length?Z.call(arguments,1):[],null!=(i=this.bindings)?i[r]:void 0){for(s=0,u=[];s<this.bindings[r].length;)a=this.bindings[r][s],n=a.handler,t=a.ctx,o=a.once,n.apply(null!=t?t:this,e),u.push(o?this.bindings[r].splice(s,1):s++);return u}},e}(),null==window.Pace&&(window.Pace={}),E(Pace,f.prototype),_=Pace.options=E({},S,window.paceOptions,k()),K=["ajax","document","eventLag","elements"],$=0,z=K.length;z>$;$++)F=K[$],_[F]===!0&&(_[F]=S[F]);h=function(e){function t(){return Q=t.__super__.constructor.apply(this,arguments)}return tt(t,e),t}(Error),i=function(){function e(){this.progress=0}return e.prototype.getElement=function(){var e;if(null==this.el){if(!document.querySelector)return;if(e=document.querySelector(_.target),!e)throw new h;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=e.firstChild?e.insertBefore(this.el,e.firstChild):e.appendChild(this.el)}return this.el},e.prototype.finish=function(){var e;return e=this.getElement(),e.className=e.className.replace("pace-active",""),e.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},e.prototype.update=function(e){return this.progress=e,this.render()},e.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(e){h=e}return this.el=void 0},e.prototype.render=function(){var e,t;if(document.querySelector)return null==document.querySelector(_.target)?!1:(e=this.getElement(),e.children[0].style.width=""+this.progress+"%",(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(e.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?t="99":(t=this.progress<10?"0":"",t+=0|this.progress),e.children[0].setAttribute("data-progress",""+t)),this.lastRenderedProgress=this.progress)},e.prototype.done=function(){return this.progress>=100},e}(),p=function(){function e(){this.bindings={}}return e.prototype.trigger=function(e,t){var r,n,s,o,i;if(null!=this.bindings[e]){for(o=this.bindings[e],i=[],n=0,s=o.length;s>n;n++)r=o[n],i.push(r.call(this,t));return i}},e.prototype.on=function(e,t){var r;return null==(r=this.bindings)[e]&&(r[e]=[]),this.bindings[e].push(t)},e}(),W=window.XMLHttpRequest,B=window.XDomainRequest,G=window.WebSocket,j=function(e,t){var r,n,s,o;o=[];for(n in t.prototype)try{s=t.prototype[n],o.push(null==e[n]&&"function"!=typeof s?e[n]=s:void 0)}catch(i){r=i}return o},L=[],Pace.ignore=function(){var e,t,r;return t=arguments[0],e=2<=arguments.length?Z.call(arguments,1):[],L.unshift("ignore"),r=t.apply(null,e),L.shift(),r},Pace.track=function(){var e,t,r;return t=arguments[0],e=2<=arguments.length?Z.call(arguments,1):[],L.unshift("track"),r=t.apply(null,e),L.shift(),r},I=function(e){var t;if(null==e&&(e="GET"),"track"===L[0])return"force";if(!L.length&&_.ajax){if("socket"===e&&_.ajax.trackWebSockets)return!0;if(t=e.toUpperCase(),rt.call(_.ajax.trackMethods,t)>=0)return!0}return!1},d=function(e){function t(){var e,r=this;t.__super__.constructor.apply(this,arguments),e=function(e){var t;return t=e.open,e.open=function(n,s){return I(n)&&r.trigger("request",{type:n,url:s,request:e}),t.apply(e,arguments)}},window.XMLHttpRequest=function(t){var r;return r=new W(t),e(r),r};try{j(window.XMLHttpRequest,W)}catch(n){}if(null!=B){window.XDomainRequest=function(){var t;return t=new B,e(t),t};try{j(window.XDomainRequest,B)}catch(n){}}if(null!=G&&_.ajax.trackWebSockets){window.WebSocket=function(e,t){var n;return n=null!=t?new G(e,t):new G(e),I("socket")&&r.trigger("request",{type:"socket",url:e,protocols:t,request:n}),n};try{j(window.WebSocket,G)}catch(n){}}}return tt(t,e),t}(p),V=null,T=function(){return null==V&&(V=new d),V},M=function(e){var t,r,n,s;for(s=_.ajax.ignoreURLs,r=0,n=s.length;n>r;r++)if(t=s[r],"string"==typeof t){if(-1!==e.indexOf(t))return!0}else if(t.test(e))return!0;return!1},T().on("request",function(e){var t,r,n,s,i;return s=e.type,n=e.request,i=e.url,M(i)?void 0:Pace.running||_.restartOnRequestAfter===!1&&"force"!==I(s)?void 0:(r=arguments,t=_.restartOnRequestAfter||0,"boolean"==typeof t&&(t=0),setTimeout(function(){var e,t,i,a,u,c;if(e="socket"===s?n.readyState<2:0<(a=n.readyState)&&4>a){for(Pace.restart(),u=Pace.sources,c=[],t=0,i=u.length;i>t;t++){if(F=u[t],F instanceof o){F.watch.apply(F,r);break}c.push(void 0)}return c}},t))}),o=function(){function e(){var e=this;this.elements=[],T().on("request",function(){return e.watch.apply(e,arguments)})}return e.prototype.watch=function(e){var t,r,n,s;return n=e.type,t=e.request,s=e.url,M(s)?void 0:(r="socket"===n?new m(t):new y(t),this.elements.push(r))},e}(),y=function(){function e(e){var t,r,n,s,o,i,a=this;if(this.progress=0,null!=window.ProgressEvent)for(r=null,e.addEventListener("progress",function(e){return a.progress=e.lengthComputable?100*e.loaded/e.total:a.progress+(100-a.progress)/2}),i=["load","abort","timeout","error"],n=0,s=i.length;s>n;n++)t=i[n],e.addEventListener(t,function(){return a.progress=100});else o=e.onreadystatechange,e.onreadystatechange=function(){var t;return 0===(t=e.readyState)||4===t?a.progress=100:3===e.readyState&&(a.progress=50),"function"==typeof o?o.apply(null,arguments):void 0}}return e}(),m=function(){function e(e){var t,r,n,s,o=this;for(this.progress=0,s=["error","open"],r=0,n=s.length;n>r;r++)t=s[r],e.addEventListener(t,function(){return o.progress=100})}return e}(),u=function(){function e(e){var t,r,n,s;for(null==e&&(e={}),this.elements=[],null==e.selectors&&(e.selectors=[]),s=e.selectors,r=0,n=s.length;n>r;r++)t=s[r],this.elements.push(new c(t))}return e}(),c=function(){function e(e){this.selector=e,this.progress=0,this.check()}return e.prototype.check=function(){var e=this;if(document.querySelector)return document.querySelector(this.selector)?this.done():setTimeout(function(){return e.check()},_.elements.checkInterval)},e.prototype.done=function(){return this.progress=100},e}(),a=function(){function e(){var e,t,r=this;this.progress=null!=(t=this.states[document.readyState])?t:100,e=document.onreadystatechange,document.onreadystatechange=function(){return null!=r.states[document.readyState]&&(r.progress=r.states[document.readyState]),"function"==typeof e?e.apply(null,arguments):void 0}}return e.prototype.states={loading:0,interactive:50,complete:100},e}(),l=function(){function e(){var e,t,r,n,s,o=this;this.progress=0,e=0,s=[],n=0,r=O(),t=setInterval(function(){var i;return i=O()-r-50,r=O(),s.push(i),s.length>_.eventLag.sampleCount&&s.shift(),e=b(s),++n>=_.eventLag.minSamples&&e<_.eventLag.lagThreshold?(o.progress=100,clearInterval(t)):o.progress=100*(3/(e+3))},50)}return e}(),v=function(){function e(e){this.source=e,this.last=this.sinceLastUpdate=0,this.rate=_.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=C(this.source,"progress"))}return e.prototype.tick=function(e,t){var r;return null==t&&(t=C(this.source,"progress")),t>=100&&(this.done=!0),t===this.last?this.sinceLastUpdate+=e:(this.sinceLastUpdate&&(this.rate=(t-this.last)/this.sinceLastUpdate),this.catchup=(t-this.progress)/_.catchupTime,this.sinceLastUpdate=0,this.last=t),t>this.progress&&(this.progress+=this.catchup*e),r=1-Math.pow(this.progress/100,_.easeFactor),this.progress+=r*this.rate*e,this.progress=Math.min(this.lastProgress+_.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},e}(),X=null,D=null,x=null,H=null,w=null,P=null,Pace.running=!1,A=function(){return _.restartOnPushState?Pace.restart():void 0},null!=window.history.pushState&&(J=window.history.pushState,window.history.pushState=function(){return A(),J.apply(window.history,arguments)}),null!=window.history.replaceState&&(Y=window.history.replaceState,window.history.replaceState=function(){return A(),Y.apply(window.history,arguments)}),g={ajax:o,elements:u,document:a,eventLag:l},(N=function(){var e,t,r,n,s,o,a,u;for(Pace.sources=X=[],o=["ajax","elements","document","eventLag"],t=0,n=o.length;n>t;t++)e=o[t],_[e]!==!1&&X.push(new g[e](_[e]));for(u=null!=(a=_.extraSources)?a:[],r=0,s=u.length;s>r;r++)F=u[r],X.push(new F(_));return Pace.bar=x=new i,D=[],H=new v})(),Pace.stop=function(){return Pace.trigger("stop"),Pace.running=!1,x.destroy(),P=!0,null!=w&&("function"==typeof q&&q(w),w=null),N()},Pace.restart=function(){return Pace.trigger("restart"),Pace.stop(),Pace.start()},Pace.go=function(){var e;return Pace.running=!0,x.render(),e=O(),P=!1,w=U(function(t,r){var n,s,o,i,a,u,c,l,f,p,h,d,g,m,y,w;for(l=100-x.progress,s=h=0,o=!0,u=d=0,m=X.length;m>d;u=++d)for(F=X[u],p=null!=D[u]?D[u]:D[u]=[],a=null!=(w=F.elements)?w:[F],c=g=0,y=a.length;y>g;c=++g)i=a[c],f=null!=p[c]?p[c]:p[c]=new v(i),o&=f.done,f.done||(s++,h+=f.tick(t));return n=h/s,x.update(H.tick(t,n)),x.done()||o||P?(x.update(100),Pace.trigger("done"),setTimeout(function(){return x.finish(),Pace.running=!1,Pace.trigger("hide")},Math.max(_.ghostTime,Math.max(_.minTime-(O()-e),0)))):r()})},Pace.start=function(e){E(_,e),Pace.running=!0;try{x.render()}catch(t){h=t}return document.querySelector(".pace")?(Pace.trigger("start"),Pace.go()):setTimeout(Pace.start,50)},"function"==typeof define&&define.amd?define(function(){return Pace}):"object"==typeof exports?module.exports=Pace:_.startOnPageLoad&&Pace.start()}}.call(this);