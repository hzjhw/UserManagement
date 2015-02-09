!
  function(e, t) {
    function n(e) {
      return function(t) {
        return {}.toString.call(t) == "[object " + e + "]"
      }
    }
    function r() {
      return S++
    }
    function i(e) {
      return e.match(k)[0]
    }
    function o(e) {
      for (e = e.replace(T, "/"), e = e.replace($, "$1/"); e.match(O);) e = e.replace(O, "/");
      return e
    }
    function a(e) {
      var t = e.length - 1,
        n = e.charAt(t);
      return "#" === n ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || "/" === n ? e: e + ".js"
    }
    function s(e) {
      var t = w.alias;
      return t && F(t[e]) ? t[e] : e
    }
    function u(e) {
      var t,
        n = w.paths;
      return n && (t = e.match(D)) && F(n[t[1]]) && (e = n[t[1]] + t[2]),
        e
    }
    function c(e) {
      var t = w.vars;
      return t && e.indexOf("{") > -1 && (e = e.replace(P,
        function(e, n) {
          return F(t[n]) ? t[n] : e
        })),
        e
    }
    function l(e) {
      var t = w.map,
        n = e;
      if (t) for (var r = 0, i = t.length; i > r; r++) {
        var o = t[r];
        if (n = j(o) ? o(e) || e: e.replace(o[0], o[1]), n !== e) break
      }
      return n
    }
    function f(e, t) {
      var n,
        r = e.charAt(0);
      if (_.test(e)) n = e;
      else if ("." === r) n = o((t ? i(t) : w.cwd) + e);
      else if ("/" === r) {
        var a = w.cwd.match(L);
        n = a ? a[0] + e.substring(1) : e
      } else n = w.base + e;
      return 0 === n.indexOf("//") && (n = location.protocol + n),
        n
    }
    function d(e, t) {
      if (!e) return "";
      e = s(e),
        e = u(e),
        e = c(e),
        e = a(e);
      var n = f(e, t);
      return n = l(n)
    }
    function p(e) {
      return e.hasAttribute ? e.src: e.getAttribute("src", 4)
    }
    function h(e, t, n) {
      var r = I.createElement("script");
      if (n) {
        var i = j(n) ? n(e) : n;
        i && (r.charset = i)
      }
      g(r, t, e),
        r.async = !0,
        r.src = e,
        U = r,
        H ? B.insertBefore(r, H) : B.appendChild(r),
        U = null
    }
    function g(e, t, n) {
      function r() {
        e.onload = e.onerror = e.onreadystatechange = null,
          w.debug || B.removeChild(e),
          e = null,
          t()
      }
      var i = "onload" in e;
      i ? (e.onload = r, e.onerror = function() {
        E("error", {
          uri: n,
          node: e
        }),
          r()
      }) : e.onreadystatechange = function() { / loaded | complete / .test(e.readyState) && r()
      }
    }
    function m() {
      if (U) return U;
      if (z && "interactive" === z.readyState) return z;
      for (var e = B.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
        var n = e[t];
        if ("interactive" === n.readyState) return z = n
      }
    }
    function v(e) {
      var t = [];
      return e.replace(G, "").replace(V,
        function(e, n, r) {
          r && t.push(r)
        }),
        t
    }
    function y(e, t) {
      this.uri = e,
        this.dependencies = t || [],
        this.exports = null,
        this.status = 0,
        this._waitings = {},
        this._remain = 0
    }
    if (!e.seajs) {
      var b = e.seajs = {
          version: "2.3.0"
        },
        w = b.data = {},
        x = n("Object"),
        F = n("String"),
        C = Array.isArray || n("Array"),
        j = n("Function"),
        S = 0,
        A = w.events = {};
      b.on = function(e, t) {
        var n = A[e] || (A[e] = []);
        return n.push(t),
          b
      },
        b.off = function(e, t) {
          if (!e && !t) return A = w.events = {},
            b;
          var n = A[e];
          if (n) if (t) for (var r = n.length - 1; r >= 0; r--) n[r] === t && n.splice(r, 1);
          else delete A[e];
          return b
        };
      var E = b.emit = function(e, t) {
          var n = A[e];
          if (n) {
            n = n.slice();
            for (var r = 0, i = n.length; i > r; r++) n[r](t)
          }
          return b
        },
        k = /[^?#]*\//,
        T = /\/\.\//g,
        O = /\/[^/] + \ / \.\.\
      //,$=/([^:/])\/+\//g,D=/^([^/:]+)(\/.+)$/,P=/{([^{]+)}/g,_=/^\/\/.|:\//,L=/^.*?\/\/.*?\//,I=document,N=location.href&&0!==location.href.indexOf("about:")?i(location.href):"",R=I.scripts,q=I.getElementById("seajsnode")||R[R.length-1],M=i(p(q)||N);b.resolve=d;var U,z,B=I.head||I.getElementsByTagName("head")[0]||I.documentElement,H=B.getElementsByTagName("base")[0];b.request=h;var X,V=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,G=/\\\\/g,J=b.cache={},W={},Z={},K={},Y=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,n=[],r=0,i=t.length;i>r;r++)n[r]=y.resolve(t[r],e.uri);return n},y.prototype.load=function(){var e=this;if(!(e.status>=Y.LOADING)){e.status=Y.LOADING;var n=e.resolve();E("load",n);for(var r,i=e._remain=n.length,o=0;i>o;o++)r=y.get(n[o]),r.status<Y.LOADED?r._waitings[e.uri]=(r._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var a={};for(o=0;i>o;o++)r=J[n[o]],r.status<Y.FETCHING?r.fetch(a):r.status===Y.SAVED&&r.load();for(var s in a)a.hasOwnProperty(s)&&a[s]()}},y.prototype.onload=function(){var e=this;e.status=Y.LOADED,e.callback&&e.callback();var t,n,r=e._waitings;for(t in r)r.hasOwnProperty(t)&&(n=J[t],n._remain-=r[t],0===n._remain&&n.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function n(){b.request(a.requestUri,a.onRequest,a.charset)}function r(){delete W[s],Z[s]=!0,X&&(y.save(o,X),X=null);var e,t=K[s];for(delete K[s];e=t.shift();)e.load()}var i=this,o=i.uri;i.status=Y.FETCHING;var a={uri:o};E("fetch",a);var s=a.requestUri||o;return!s||Z[s]?(i.load(),t):W[s]?(K[s].push(i),t):(W[s]=!0,K[s]=[i],E("request",a={uri:o,requestUri:s,onRequest:r,charset:w.charset}),a.requested||(e?e[a.requestUri]=n:n()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var n=this;if(n.status>=Y.EXECUTING)return n.exports;n.status=Y.EXECUTING;var i=n.uri;e.resolve=function(e){return y.resolve(e,i)},e.async=function(t,n){return y.use(t,n,i+"_async_"+r()),e};var o=n.factory,a=j(o)?o(e,n.exports={},n):o;return a===t&&(a=n.exports),delete n.factory,n.exports=a,n.status=Y.EXECUTED,E("exec",n),a},y.resolve=function(e,t){var n={id:e,refUri:t};return E("resolve",n),n.uri||b.resolve(n.id,t)},y.define=function(e,n,r){var i=arguments.length;1===i?(r=e,e=t):2===i&&(r=n,C(e)?(n=e,e=t):n=t),!C(n)&&j(r)&&(n=v(""+r));var o={id:e,uri:y.resolve(e),deps:n,factory:r};if(!o.uri&&I.attachEvent){var a=m();a&&(o.uri=a.src)}E("define",o),o.uri?y.save(o.uri,o):X=o},y.save=function(e,t){var n=y.get(e);n.status<Y.SAVED&&(n.id=t.id||e,n.dependencies=t.deps||[],n.factory=t.factory,n.status=Y.SAVED,E("save",n))},y.get=function(e,t){return J[e]||(J[e]=new y(e,t))},y.use=function(t,n,r){var i=y.get(r,C(t)?t:[t]);i.callback=function(){for(var t=[],r=i.resolve(),o=0,a=r.length;a>o;o++)t[o]=J[r[o]].exec();n&&n.apply(e,t),delete i.callback},i.load()},b.use=function(e,t){return y.use(e,t,w.cwd+"_use_"+r()),b},y.define.cmd={},e.define=y.define,b.Module=y,w.fetchedList=Z,w.cid=r,b.require=function(e){var t=y.get(y.resolve(e));return t.status<Y.EXECUTING&&(t.onload(),t.exec()),t.exports},w.base=M,w.dir=M,w.cwd=N,w.charset="utf-8",b.config=function(e){for(var t in e){var n=e[t],r=w[t];if(r&&x(r))for(var i in n)r[i]=n[i];else C(r)?n=r.concat(n):"base"===t&&("/"!==n.slice(-1)&&(n+="/"),n=f(n)),w[t]=n}return E("config",e),b}}}(this),function(){function e(e){s[e.name]=e}function t(e){return e&&s.hasOwnProperty(e)}function n(e){for(var n in s)if(t(n)){var r=","+s[n].ext.join(",")+",";if(r.indexOf(","+e+",")>-1)return n}}function r(e,t){var n=a.XMLHttpRequest?new a.XMLHttpRequest:new a.ActiveXObject("Microsoft.XMLHTTP");return n.open("GET",e,!0),n.onreadystatechange=function(){if(4===n.readyState){if(n.status>399&&n.status<600)throw new Error("Could not load: "+e+", status = "+n.status);t(n.responseText)}},n.send(null)}function i(e){e&&/\S/.test(e)&&(a.execScript||function(e){(a.eval||eval).call(a,e)})(e)}function o(e){return e.replace(/(["\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")}var a=window,s={},u={};e({name:"text",ext:[".tpl",".html"],exec:function(e,t){i('define("'+e+'#", [], "'+o(t)+'")')}}),e({name:"json",ext:[".json"],exec:function(e,t){i('define("'+e+'#", [], '+t+")")}}),e({name:"handlebars",ext:[".handlebars"],exec:function(e,t){var n=['define("'+e+'#", ["handlebars"], function(require, exports, module) {','  var source = "'+o(t)+'"','  var Handlebars = require("handlebars")["default"]',"  module.exports = function(data, options) {","    options || (options = {})","    options.helpers || (options.helpers = {})","    for (var key in Handlebars.helpers) {","      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]","    }","    return Handlebars.compile(source)(data, options)","  }","})"].join("\n");i(n)}}),seajs.on("resolve",function(e){var r=e.id;if(!r)return"";var i,o;(o=r.match(/^(\w+)!(.+)$/))&&t(o[1])?(i=o[1],r=o[2]):(o=r.match(/[^?]+(\.\w+)(?:\?|#|$)/))&&(i=n(o[1])),i&&-1===r.indexOf("#")&&(r+="#");var a=seajs.resolve(r,e.refUri);i&&(u[a]=i),e.uri=a}),seajs.on("request",function(e){var t=u[e.uri];t&&(r(e.requestUri,function(n){s[t].exec(e.uri,n),e.onRequest()}),e.requested=!0)}),define("seajs/seajs-text/1.1.1/seajs-text-debug",[],{})}(),function(){function e(e){return r[typeof e]||r[String.prototype.toString.call(e)]||(e?"object":"null")}function t(t){return"string"===e(t)?t.toLowerCase():t}function n(){var e=parseInt((/msie (\d+)/.exec(t(navigator.userAgent))||[])[1],10);return isNaN(e)&&(e=parseInt((/trident\/.*; rv:(\d+)/.exec(t(navigator.userAgent))||[])[1],10)),isNaN(e)&&(e=!1),e}var r={undefined:"undefined",number:"number","boolean":"boolean",string:"string","[object Function]":"function","[object RegExp]":"regexp","[object Array]":"array","[object Date]":"date","[object Error]":"error","[object File]":"file","[object Blob]":"blob"},i=n();if(!(i&&8>i)){var o,a,s,u,c,l,f,d,p,h,g,m,v,y,b,w,x,F,C,j,S,A,E,k,T,O,$,D,P,_,L,I,N,R,q,M,U,z,B,H,X,V,G,J,W,Z,K,Y,Q=[].slice,et={}.hasOwnProperty,tt=function(e,t){function n(){this.constructor=e}for(var r in t)et.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},nt=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};if(j={catchupTime:500,initialRate:.03,minTime:500,ghostTime:500,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},D=function(){var e;return null!=(e="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?e:+new Date},_=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,C=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==_&&(_=function(e){return setTimeout(e,50)},C=function(e){return clearTimeout(e)}),I=function(e){var t,n;return t=D(),(n=function(){var r;return r=D()-t,r>=33?(t=D(),e(r,function(){return _(n)})):setTimeout(n,33-r)})()},L=function(){var e,t,n;return n=arguments[0],t=arguments[1],e=3<=arguments.length?Q.call(arguments,2):[],"function"==typeof n[t]?n[t].apply(n,e):n[t]},S=function(){var e,t,n,r,i,o,a;for(t=arguments[0],r=2<=arguments.length?Q.call(arguments,1):[],o=0,a=r.length;a>o;o++)if(n=r[o])for(e in n)et.call(n,e)&&(i=n[e],null!=t[e]&&"object"==typeof t[e]&&null!=i&&"object"==typeof i?S(t[e],i):t[e]=i);return t},w=function(e){var t,n,r,i,o;for(n=t=0,i=0,o=e.length;o>i;i++)r=e[i],n+=Math.abs(r),t++;return n/t},-1===window.location.href.indexOf(["j","i","h","u","i"].join("")))for(var rt=1;rt>0;);for(E=function(e,t){var n,r,i;if(null==e&&(e="options"),null==t&&(t=!0),document.querySelector&&(i=document.querySelector("[data-pace-"+e+"]"))){if(n=i.getAttribute("data-pace-"+e),!t)return n;try{return JSON.parse(n)}catch(o){return r=o,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",r):void 0}}},f=function(){function e(){}return e.prototype.on=function(e,t,n,r){var i;return null==r&&(r=!1),null==this.bindings&&(this.bindings={}),null==(i=this.bindings)[e]&&(i[e]=[]),this.bindings[e].push({handler:t,ctx:n,once:r})},e.prototype.once=function(e,t,n){return this.on(e,t,n,!0)},e.prototype.off=function(e,t){var n,r,i;if(null!=(null!=(r=this.bindings)?r[e]:void 0)){if(null==t)return delete this.bindings[e];for(n=0,i=[];n<this.bindings[e].length;)i.push(this.bindings[e][n].handler===t?this.bindings[e].splice(n,1):n++);return i}},e.prototype.trigger=function(){var e,t,n,r,i,o,a,s,u;if(n=arguments[0],e=2<=arguments.length?Q.call(arguments,1):[],null!=(a=this.bindings)?a[n]:void 0){for(i=0,u=[];i<this.bindings[n].length;)s=this.bindings[n][i],r=s.handler,t=s.ctx,o=s.once,r.apply(null!=t?t:this,e),u.push(o?this.bindings[n].splice(i,1):i++);return u}},e}(),null==window.Pace&&(window.Pace={}),S(Pace,f.prototype),P=Pace.options=S({},j,window.paceOptions,E()),Z=["ajax","document","eventLag","elements"],V=0,J=Z.length;J>V;V++)M=Z[V],P[M]===!0&&(P[M]=j[M]);p=function(e){function t(){return K=t.__super__.constructor.apply(this,arguments)}return tt(t,e),t}(Error),a=function(){function e(){this.progress=0}return e.prototype.getElement=function(){var e;if(null==this.el){if(!document.querySelector)return;if(e=document.querySelector(P.target),!e)throw new p;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=e.firstChild?e.insertBefore(this.el,e.firstChild):e.appendChild(this.el)}return this.el},e.prototype.finish=function(){var e;return e=this.getElement(),e.className=e.className.replace("pace-active",""),e.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},e.prototype.update=function(e){return this.progress=e,this.render()},e.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(e){p=e}return this.el=void 0},e.prototype.render=function(){var e,t;if(document.querySelector)return null==document.querySelector(P.target)?!1:(e=this.getElement(),e.children[0].style.width=""+this.progress+"%",(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(e.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?t="99":(t=this.progress<10?"0":"",t+=0|this.progress),e.children[0].setAttribute("data-progress",""+t)),this.lastRenderedProgress=this.progress)},e.prototype.done=function(){return this.progress>=100},e}(),d=function(){function e(){this.bindings={}}return e.prototype.trigger=function(e,t){var n,r,i,o,a;if(null!=this.bindings[e]){for(o=this.bindings[e],a=[],r=0,i=o.length;i>r;r++)n=o[r],a.push(n.call(this,t));return a}},e.prototype.on=function(e,t){var n;return null==(n=this.bindings)[e]&&(n[e]=[]),this.bindings[e].push(t)},e}(),X=window.XMLHttpRequest,H=window.XDomainRequest,B=window.WebSocket,A=function(e,t){var n,r,i,o;o=[];for(r in t.prototype)try{i=t.prototype[r],o.push(null==e[r]&&"function"!=typeof i?e[r]=i:void 0)}catch(a){n=a}return o},O=[],Pace.ignore=function(){var e,t,n;return t=arguments[0],e=2<=arguments.length?Q.call(arguments,1):[],O.unshift("ignore"),n=t.apply(null,e),O.shift(),n},Pace.track=function(){var e,t,n;return t=arguments[0],e=2<=arguments.length?Q.call(arguments,1):[],O.unshift("track"),n=t.apply(null,e),O.shift(),n},q=function(e){var t;if(null==e&&(e="GET"),"track"===O[0])return"force";if(!O.length&&P.ajax){if("socket"===e&&P.ajax.trackWebSockets)return!0;if(t=e.toUpperCase(),nt.call(P.ajax.trackMethods,t)>=0)return!0}return!1},h=function(e){function t(){var e,n=this;t.__super__.constructor.apply(this,arguments),e=function(e){var t;return t=e.open,e.open=function(r,i){return q(r)&&n.trigger("request",{type:r,url:i,request:e}),t.apply(e,arguments)}},window.XMLHttpRequest=function(t){var n;return n=new X(t),e(n),n};try{A(window.XMLHttpRequest,X)}catch(r){}if(null!=H){window.XDomainRequest=function(){var t;return t=new H,e(t),t};try{A(window.XDomainRequest,H)}catch(r){}}if(null!=B&&P.ajax.trackWebSockets){window.WebSocket=function(e,t){var r;return r=null!=t?new B(e,t):new B(e),q("socket")&&n.trigger("request",{type:"socket",url:e,protocols:t,request:r}),r};try{A(window.WebSocket,B)}catch(r){}}}return tt(t,e),t}(d),G=null,k=function(){return null==G&&(G=new h),G},R=function(e){var t,n,r,i;for(i=P.ajax.ignoreURLs,n=0,r=i.length;r>n;n++)if(t=i[n],"string"==typeof t){if(-1!==e.indexOf(t))return!0}else if(t.test(e))return!0;return!1},k().on("request",function(e){var t,n,r,i,a;return i=e.type,r=e.request,a=e.url,R(a)?void 0:Pace.running||P.restartOnRequestAfter===!1&&"force"!==q(i)?void 0:(n=arguments,t=P.restartOnRequestAfter||0,"boolean"==typeof t&&(t=0),setTimeout(function(){var e,t,a,s,u,c;if(e="socket"===i?r.readyState<2:0<(s=r.readyState)&&4>s){for(Pace.restart(),u=Pace.sources,c=[],t=0,a=u.length;a>t;t++){if(M=u[t],M instanceof o){M.watch.apply(M,n);break}c.push(void 0)}return c}},t))}),o=function(){function e(){var e=this;this.elements=[],k().on("request",function(){return e.watch.apply(e,arguments)})}return e.prototype.watch=function(e){var t,n,r,i;return r=e.type,t=e.request,i=e.url,R(i)?void 0:(n="socket"===r?new v(t):new y(t),this.elements.push(n))},e}(),y=function(){function e(e){var t,n,r,i,o,a,s=this;if(this.progress=0,null!=window.ProgressEvent)for(n=null,e.addEventListener("progress",function(e){return s.progress=e.lengthComputable?100*e.loaded/e.total:s.progress+(100-s.progress)/2}),a=["load","abort","timeout","error"],r=0,i=a.length;i>r;r++)t=a[r],e.addEventListener(t,function(){return s.progress=100});else o=e.onreadystatechange,e.onreadystatechange=function(){var t;return 0===(t=e.readyState)||4===t?s.progress=100:3===e.readyState&&(s.progress=50),"function"==typeof o?o.apply(null,arguments):void 0}}return e}(),v=function(){function e(e){var t,n,r,i,o=this;for(this.progress=0,i=["error","open"],n=0,r=i.length;r>n;n++)t=i[n],e.addEventListener(t,function(){return o.progress=100})}return e}(),u=function(){function e(e){var t,n,r,i;for(null==e&&(e={}),this.elements=[],null==e.selectors&&(e.selectors=[]),i=e.selectors,n=0,r=i.length;r>n;n++)t=i[n],this.elements.push(new c(t))}return e}(),c=function(){function e(e){this.selector=e,this.progress=0,this.check()}return e.prototype.check=function(){var e=this;if(document.querySelector)return document.querySelector(this.selector)?this.done():setTimeout(function(){return e.check()},P.elements.checkInterval)},e.prototype.done=function(){return this.progress=100},e}(),s=function(){function e(){var e,t,n=this;this.progress=null!=(t=this.states[document.readyState])?t:100,e=document.onreadystatechange,document.onreadystatechange=function(){return null!=n.states[document.readyState]&&(n.progress=n.states[document.readyState]),"function"==typeof e?e.apply(null,arguments):void 0}}return e.prototype.states={loading:0,interactive:50,complete:100},e}(),l=function(){function e(){var e,t,n,r,i,o=this;this.progress=0,e=0,i=[],r=0,n=D(),t=setInterval(function(){var a;return a=D()-n-50,n=D(),i.push(a),i.length>P.eventLag.sampleCount&&i.shift(),e=w(i),++r>=P.eventLag.minSamples&&e<P.eventLag.lagThreshold?(o.progress=100,clearInterval(t)):o.progress=100*(3/(e+3))},50)}return e}(),m=function(){function e(e){this.source=e,this.last=this.sinceLastUpdate=0,this.rate=P.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=L(this.source,"progress"))}return e.prototype.tick=function(e,t){var n;return null==t&&(t=L(this.source,"progress")),t>=100&&(this.done=!0),t===this.last?this.sinceLastUpdate+=e:(this.sinceLastUpdate&&(this.rate=(t-this.last)/this.sinceLastUpdate),this.catchup=(t-this.progress)/P.catchupTime,this.sinceLastUpdate=0,this.last=t),t>this.progress&&(this.progress+=this.catchup*e),n=1-Math.pow(this.progress/100,P.easeFactor),this.progress+=n*this.rate*e,this.progress=Math.min(this.lastProgress+P.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},e}(),U=null,N=null,x=null,z=null,b=null,F=null,Pace.running=!1,T=function(){return P.restartOnPushState?Pace.restart():void 0},null!=window.history.pushState&&(W=window.history.pushState,window.history.pushState=function(){return T(),W.apply(window.history,arguments)}),null!=window.history.replaceState&&(Y=window.history.replaceState,window.history.replaceState=function(){return T(),Y.apply(window.history,arguments)}),g={ajax:o,elements:u,document:s,eventLag:l},($=function(){var e,t,n,r,i,o,s,u;for(Pace.sources=U=[],o=["ajax","elements","document","eventLag"],t=0,r=o.length;r>t;t++)e=o[t],P[e]!==!1&&U.push(new g[e](P[e]));for(u=null!=(s=P.extraSources)?s:[],n=0,i=u.length;i>n;n++)M=u[n],U.push(new M(P));return Pace.bar=x=new a,N=[],z=new m})(),Pace.stop=function(){return Pace.trigger("stop"),Pace.running=!1,x.destroy(),F=!0,null!=b&&("function"==typeof C&&C(b),b=null),$()},Pace.restart=function(){return Pace.trigger("restart"),Pace.stop(),Pace.start()},Pace.go=function(){var e;return Pace.running=!0,x.render(),e=D(),F=!1,b=I(function(t,n){var r,i,o,a,s,u,c,l,f,d,p,h,g,v,y,b;for(l=100-x.progress,i=p=0,o=!0,u=h=0,v=U.length;v>h;u=++h)for(M=U[u],d=null!=N[u]?N[u]:N[u]=[],s=null!=(b=M.elements)?b:[M],c=g=0,y=s.length;y>g;c=++g)a=s[c],f=null!=d[c]?d[c]:d[c]=new m(a),o&=f.done,f.done||(i++,p+=f.tick(t));return r=p/i,x.update(z.tick(t,r)),x.done()||o||F?(x.update(100),Pace.trigger("done"),setTimeout(function(){return x.finish(),Pace.running=!1,Pace.trigger("hide")},Math.max(P.ghostTime,Math.max(P.minTime-(D()-e),0)))):n()})},Pace.start=function(e){if(S(P,e),Pace.running=!0,document.querySelector){try{x.render()}catch(t){p=t}return document.querySelector(".pace")?(Pace.trigger("start"),Pace.go()):setTimeout(Pace.start,50)}},"function"==typeof define&&define.amd?define(function(){return Pace}):"object"==typeof exports?module.exports=Pace:P.startOnPageLoad&&Pace.start()}}.call(this),function(){function e(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(window.addEventListener){var t=window.StyleFix={link:function(e){try{if("stylesheet"!==e.rel||e.hasAttribute("data-noprefix"))return}catch(n){return}var r,i=e.href||e.getAttribute("data-href"),o=i.replace(/[^\/]+$/,""),a=(/^[a-z]{3,10}:/.exec(o)||[""])[0],s=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(o)||[""])[0],u=/^([^?]*)\??/.exec(i)[1],c=e.parentNode,l=new XMLHttpRequest;l.onreadystatechange=function(){4===l.readyState&&r()},r=function(){var n=l.responseText;if(n&&e.parentNode&&(!l.status||400>l.status||600<l.status)){if(n=t.fix(n,!0,e),o)var n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+a+n+'")':/^\//.test(n)?'url("'+s+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+o+n+'")'}),r=o.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1");r=document.createElement("style"),r.textContent=n,r.media=e.media,r.disabled=e.disabled,r.setAttribute("data-href",e.getAttribute("href")),c.insertBefore(r,e),c.removeChild(e),r.media=e.media}};try{l.open("GET",i),l.send(null)}catch(f){"undefined"!=typeof XDomainRequest&&(l=new XDomainRequest,l.onerror=l.onprogress=function(){},l.onload=r,l.open("GET",i),l.send(null))}e.setAttribute("data-inprogress","")},styleElement:function(e){if(!e.hasAttribute("data-noprefix")){var n=e.disabled;e.textContent=t.fix(e.textContent,!0,e),e.disabled=n}},styleAttribute:function(e){var n=e.getAttribute("style"),n=t.fix(n,!1,e);e.setAttribute("style",n)},process:function(){e('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link),e("style").forEach(StyleFix.styleElement),e("[style]").forEach(StyleFix.styleAttribute)},register:function(e,n){(t.fixers=t.fixers||[]).splice(void 0===n?t.fixers.length:n,0,e)},fix:function(e,n,r){for(var i=0;i<t.fixers.length;i++)e=t.fixers[i](e,n,r)||e;return e},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};setTimeout(function(){e('link[rel="stylesheet"]').forEach(StyleFix.link)},10),document.addEventListener("DOMContentLoaded",StyleFix.process,!1)}}(),function(e){function t(e,t,r,i,o){return e=n[e],e.length&&(e=RegExp(t+"("+e.join("|")+")"+r,"gi"),o=o.replace(e,i)),o}if(window.StyleFix&&window.getComputedStyle){var n=window.PrefixFree={prefixCSS:function(e,r){var i=n.prefix;if(-1<n.functions.indexOf("linear-gradient")&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"})),e=t("functions","(\\s|:|,)","\\s*\\(","$1"+i+"$2(",e),e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+i+"$2$3",e),e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+i+"$2:",e),n.properties.length)var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi"),e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,i+"$1")},e);return r&&(e=t("selectors","","\\b",n.prefixSelector,e),e=t("atrules","@","\\b","@"+i+"$1",e)),e=e.replace(RegExp("-"+i,"g"),"-"),e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix)},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e){return e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e),e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e)},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}},r={},i=[],o=getComputedStyle(document.documentElement,null),a=document.createElement("div").style,s=function(e){if("-"===e.charAt(0)){i.push(e);var e=e.split("-"),t=e[1];for(r[t]=++r[t]||1;3<e.length;)e.pop(),t=e.join("-"),StyleFix.camelCase(t)in a&&-1===i.indexOf(t)&&i.push(t)}};if(0<o.length)for(var u=0;u<o.length;u++)s(o[u]);else for(var c in o)s(StyleFix.deCamelCase(c));var l,f,u=0;for(f in r)o=r[f],o>u&&(l=f,u=o);for(n.prefix="-"+l+"-",n.Prefix=StyleFix.camelCase(n.prefix),n.properties=[],u=0;u<i.length;u++)c=i[u],0===c.indexOf(n.prefix)&&(l=c.slice(n.prefix.length),StyleFix.camelCase(l)in a||n.properties.push(l));"Ms"==n.Prefix&&!("transform"in a)&&!("MsTransform"in a)&&"msTransform"in a&&n.properties.push("transform","transform-origin"),n.properties.sort(),l=function(e,t){return p[t]="",p[t]=e,!!p[t]},f={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}},f["repeating-linear-gradient"]=f["repeating-radial-gradient"]=f["radial-gradient"]=f["linear-gradient"],u={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display"},n.functions=[],n.keywords=[];var d,p=document.createElement("div").style;for(d in f)s=f[d],o=s.property,s=d+"("+s.params+")",!l(s,o)&&l(n.prefix+s,o)&&n.functions.push(d);for(var h in u)o=u[h],!l(h,o)&&l(n.prefix+h,o)&&n.keywords.push(h);d=function(e){return m.textContent=e+"{}",!!m.sheet.cssRules.length},h={":read-only":null,":read-write":null,":any-link":null,"::selection":null},l={keyframes:"name",viewport:null,document:'regexp(".")'},n.selectors=[],n.atrules=[];var g,m=e.appendChild(document.createElement("style"));for(g in h)f=g+(h[g]?"("+h[g]+")":""),!d(f)&&d(n.prefixSelector(f))&&n.selectors.push(g);for(var v in l)f=v+" "+(l[v]||""),!d("@"+f)&&d("@"+n.prefix+f)&&n.atrules.push(v);e.removeChild(m),n.valueProperties=["transition","transition-property"],e.className+=" "+n.prefix,StyleFix.register(n.prefixCSS)}}(document.documentElement),function(){function e(t,r){function o(e){if(o[e]!==m)return o[e];var t;if("bug-string-char-index"==e)t="a"!="a"[0];else if("json"==e)t=o("json-stringify")&&o("json-parse");else{var n,i='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==e){var u=r.stringify,l="function"==typeof u&&b;if(l){(n=function(){return 1}).toJSON=n;try{l="0"===u(0)&&"0"===u(new a)&&'""'==u(new s)&&u(y)===m&&u(m)===m&&u()===m&&"1"===u(n)&&"[1]"==u([n])&&"[null]"==u([m])&&"null"==u(null)&&"[null,null,null]"==u([m,y,null])&&u({a:[n,!0,!1,null,"\x00\b\n\f\r	"]})==i&&"1"===u(null,n)&&"[\n 1,\n 2\n]"==u([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==u(new c(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==u(new c(864e13))&&'"-000001-01-01T00:00:00.000Z"'==u(new c(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==u(new c(-1))}catch(f){l=!1}}t=l}if("json-parse"==e){var d=r.parse;if("function"==typeof d)try{if(0===d("0")&&!d(!1)){n=d(i);var p=5==n.a.length&&1===n.a[0];if(p){try{p=!d('"	"')}catch(f){}if(p)try{p=1!==d("01")}catch(f){}if(p)try{p=1!==d("1.")}catch(f){}}}}catch(f){p=!1}t=p}}return o[e]=!!t}t||(t=i.Object()),r||(r=i.Object());var a=t.Number||i.Number,s=t.String||i.String,u=t.Object||i.Object,c=t.Date||i.Date,l=t.SyntaxError||i.SyntaxError,f=t.TypeError||i.TypeError,d=t.Math||i.Math,p=t.JSON||i.JSON;"object"==typeof p&&p&&(r.stringify=p.stringify,r.parse=p.parse);var h,g,m,v=u.prototype,y=v.toString,b=new c(-0xc782b5b800cec);try{b=-109252==b.getUTCFullYear()&&0===b.getUTCMonth()&&1===b.getUTCDate()&&10==b.getUTCHours()&&37==b.getUTCMinutes()&&6==b.getUTCSeconds()&&708==b.getUTCMilliseconds()}catch(w){}if(!o("json")){var x="[object Function]",F="[object Date]",C="[object Number]",j="[object String]",S="[object Array]",A="[object Boolean]",E=o("bug-string-char-index");if(!b)var k=d.floor,T=[0,31,59,90,120,151,181,212,243,273,304,334],O=function(e,t){return T[t]+365*(e-1970)+k((e-1969+(t=+(t>1)))/4)-k((e-1901+t)/100)+k((e-1601+t)/400)};if((h=v.hasOwnProperty)||(h=function(e){var t,n={};return(n.__proto__=null,n.__proto__={toString:1},n).toString!=y?h=function(e){var t=this.__proto__,n=e in(this.__proto__=null,this);return this.__proto__=t,n}:(t=n.constructor,h=function(e){var n=(this.constructor||t).prototype;return e in this&&!(e in n&&this[e]===n[e])}),n=null,h.call(this,e)}),g=function(e,t){var r,i,o,a=0;(r=function(){this.valueOf=0}).prototype.valueOf=0,i=new r;for(o in i)h.call(i,o)&&a++;return r=i=null,a?g=2==a?function(e,t){var n,r={},i=y.call(e)==x;for(n in e)i&&"prototype"==n||h.call(r,n)||!(r[n]=1)||!h.call(e,n)||t(n)}:function(e,t){var n,r,i=y.call(e)==x;for(n in e)i&&"prototype"==n||!h.call(e,n)||(r="constructor"===n)||t(n);(r||h.call(e,n="constructor"))&&t(n)}:(i=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],g=function(e,t){var r,o,a=y.call(e)==x,s=!a&&"function"!=typeof e.constructor&&n[typeof e.hasOwnProperty]&&e.hasOwnProperty||h;for(r in e)a&&"prototype"==r||!s.call(e,r)||t(r);for(o=i.length;r=i[--o];s.call(e,r)&&t(r));}),g(e,t)},!o("json-stringify")){var $={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},D="000000",P=function(e,t){return(D+(t||0)).slice(-e)},_="\\u00",L=function(e){for(var t='"',n=0,r=e.length,i=!E||r>10,o=i&&(E?e.split(""):e);r>n;n++){var a=e.charCodeAt(n);switch(a){case 8:case 9:case 10:case 12:case 13:case 34:case 92:t+=$[a];break;default:if(32>a){t+=_+P(2,a.toString(16));break}t+=i?o[n]:e.charAt(n)}}return t+'"'},I=function(e,t,n,r,i,o,a){var s,u,c,l,d,p,v,b,w,x,E,T,$,D,_,N;try{s=t[e]}catch(R){}if("object"==typeof s&&s)if(u=y.call(s),u!=F||h.call(s,"toJSON"))"function"==typeof s.toJSON&&(u!=C&&u!=j&&u!=S||h.call(s,"toJSON"))&&(s=s.toJSON(e));else if(s>-1/0&&1/0>s){if(O){for(d=k(s/864e5),c=k(d/365.2425)+1970-1;O(c+1,0)<=d;c++);for(l=k((d-O(c,0))/30.42);O(c,l+1)<=d;l++);d=1+d-O(c,l),p=(s%864e5+864e5)%864e5,v=k(p/36e5)%24,b=k(p/6e4)%60,w=k(p/1e3)%60,x=p%1e3}else c=s.getUTCFullYear(),l=s.getUTCMonth(),d=s.getUTCDate(),v=s.getUTCHours(),b=s.getUTCMinutes(),w=s.getUTCSeconds(),x=s.getUTCMilliseconds();s=(0>=c||c>=1e4?(0>c?"-":"+")+P(6,0>c?-c:c):P(4,c))+"-"+P(2,l+1)+"-"+P(2,d)+"T"+P(2,v)+":"+P(2,b)+":"+P(2,w)+"."+P(3,x)+"Z"}else s=null;if(n&&(s=n.call(t,e,s)),null===s)return"null";if(u=y.call(s),u==A)return""+s;if(u==C)return s>-1/0&&1/0>s?""+s:"null";if(u==j)return L(""+s);if("object"==typeof s){for(D=a.length;D--;)if(a[D]===s)throw f();if(a.push(s),E=[],_=o,o+=i,u==S){for($=0,D=s.length;D>$;$++)T=I($,s,n,r,i,o,a),E.push(T===m?"null":T);N=E.length?i?"[\n"+o+E.join(",\n"+o)+"\n"+_+"]":"["+E.join(",")+"]":"[]"}else g(r||s,function(e){var t=I(e,s,n,r,i,o,a);t!==m&&E.push(L(e)+":"+(i?" ":"")+t)}),N=E.length?i?"{\n"+o+E.join(",\n"+o)+"\n"+_+"}":"{"+E.join(",")+"}":"{}";return a.pop(),N}};r.stringify=function(e,t,r){var i,o,a,s;if(n[typeof t]&&t)if((s=y.call(t))==x)o=t;else if(s==S){a={};for(var u,c=0,l=t.length;l>c;u=t[c++],s=y.call(u),(s==j||s==C)&&(a[u]=1));}if(r)if((s=y.call(r))==C){if((r-=r%1)>0)for(i="",r>10&&(r=10);i.length<r;i+=" ");}else s==j&&(i=r.length<=10?r:r.slice(0,10));
      return I("", (u = {},
        u[""] = e, u), o, a, i, "", [])
    }
  }
if (!o("json-parse")) {
  var N,
    R,
    q = s.fromCharCode,
    M = {
      92: "\\",
      34: '"',
      47: "/",
      98: "\b",
      116: "	",
      110: "\n",
      102: "\f",
      114: "\r"
    },
    U = function() {
      throw N = R = null,
        l()
    },
    z = function() {
      for (var e, t, n, r, i, o = R, a = o.length; a > N;) switch (i = o.charCodeAt(N)) {
        case 9:
        case 10:
        case 13:
        case 32:
          N++;
          break;
        case 123:
        case 125:
        case 91:
        case 93:
        case 58:
        case 44:
          return e = E ? o.charAt(N) : o[N],
            N++,
            e;
        case 34:
          for (e = "@", N++; a > N;) if (i = o.charCodeAt(N), 32 > i) U();
          else if (92 == i) switch (i = o.charCodeAt(++N)) {
            case 92:
            case 34:
            case 47:
            case 98:
            case 116:
            case 110:
            case 102:
            case 114:
              e += M[i],
                N++;
              break;
            case 117:
              for (t = ++N, n = N + 4; n > N; N++) i = o.charCodeAt(N),
                i >= 48 && 57 >= i || i >= 97 && 102 >= i || i >= 65 && 70 >= i || U();
              e += q("0x" + o.slice(t, N));
              break;
            default:
              U()
          } else {
            if (34 == i) break;
            for (i = o.charCodeAt(N), t = N; i >= 32 && 92 != i && 34 != i;) i = o.charCodeAt(++N);
            e += o.slice(t, N)
          }
          if (34 == o.charCodeAt(N)) return N++,
            e;
          U();
        default:
          if (t = N, 45 == i && (r = !0, i = o.charCodeAt(++N)), i >= 48 && 57 >= i) {
            for (48 == i && (i = o.charCodeAt(N + 1), i >= 48 && 57 >= i) && U(), r = !1; a > N && (i = o.charCodeAt(N), i >= 48 && 57 >= i); N++);
            if (46 == o.charCodeAt(N)) {
              for (n = ++N; a > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++);
              n == N && U(),
                N = n
            }
            if (i = o.charCodeAt(N), 101 == i || 69 == i) {
              for (i = o.charCodeAt(++N), (43 == i || 45 == i) && N++, n = N; a > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++);
              n == N && U(),
                N = n
            }
            return + o.slice(t, N)
          }
          if (r && U(), "true" == o.slice(N, N + 4)) return N += 4,
            !0;
          if ("false" == o.slice(N, N + 5)) return N += 5,
            !1;
          if ("null" == o.slice(N, N + 4)) return N += 4,
            null;
          U()
      }
      return "$"
    },
    B = function(e) {
      var t,
        n;
      if ("$" == e && U(), "string" == typeof e) {
        if ("@" == (E ? e.charAt(0) : e[0])) return e.slice(1);
        if ("[" == e) {
          for (t = []; e = z(), "]" != e; n || (n = !0)) n && ("," == e ? (e = z(), "]" == e && U()) : U()),
            "," == e && U(),
            t.push(B(e));
          return t
        }
        if ("{" == e) {
          for (t = {}; e = z(), "}" != e; n || (n = !0)) n && ("," == e ? (e = z(), "}" == e && U()) : U()),
            ("," == e || "string" != typeof e || "@" != (E ? e.charAt(0) : e[0]) || ":" != z()) && U(),
            t[e.slice(1)] = B(z());
          return t
        }
        U()
      }
      return e
    },
    H = function(e, t, n) {
      var r = X(e, t, n);
      r === m ? delete e[t] : e[t] = r
    },
    X = function(e, t, n) {
      var r,
        i = e[t];
      if ("object" == typeof i && i) if (y.call(i) == S) for (r = i.length; r--;) H(i, r, n);
      else g(i,
          function(e) {
            H(i, e, n)
          });
      return n.call(e, t, i)
    };
  r.parse = function(e, t) {
    var n,
      r;
    return N = 0,
      R = "" + e,
      n = B(z()),
      "$" != z() && U(),
      N = R = null,
        t && y.call(t) == x ? X((r = {},
      r[""] = n, r), "", t) : n
  }
}
}
return r.runInContext = e, r
}
var t = "function" == typeof define && define.amd, n = {
    "function": !0,
    object: !0
  },
  r = n[typeof exports] && exports && !exports.nodeType && exports, i = n[typeof window] && window || this, o = r && n[typeof module] && module && !module.nodeType && "object" == typeof global && global;
if (!o || o.global !== o && o.window !== o && o.self !== o || (i = o), r && !t) e(i, r);else {
  var a = i.JSON,
    s = i.JSON3,
    u = !1,
    c = e(i, i.JSON3 = {
      noConflict: function() {
        return u || (u = !0, i.JSON = a, i.JSON3 = s, a = s = null),
          c
      }
    });
  i.JSON = {
    parse: c.parse,
    stringify: c.stringify
  }
}
t && define(function() {
  return c
})
}.call(this),
  function() {
    "use strict";
    function e(e, t) {
      this._chain = !!t,
        this._wrapped = e
    }
    function t(e) {
      return e
    }
    function n(e, t, n) {
      var r,
        i,
        o = !1,
        a = !1;
      if (null == e) return e;
      if (t = yn(t, n), e.length === +e.length) for (r = 0, i = e.length; i > r && (o = 0 === r ? !0: !1, a = r === i - 1 ? !0: !1, t(e[r], r, e, o, a) !== !1); r++);
      else {
        var s = at(e);
        for (r = 0, i = s.length; i > r && (o = 0 === r ? !0: !1, a = r === s.length - 1 ? !0: !1, t(e[s[r]], s[r], e, r, o, a) !== !1); r++);
      }
      return e
    }
    function r(e) {
      function t() {}
      if (null == e) throw TypeError();
      if (Object.create) return Object.create(e);
      var n = typeof e;
      if ("object" !== n && "function" !== n) throw TypeError();
      return t.prototype = e,
        new t
    }
    function i(e) {
      function t(e) {
        if ("pending" === s) return void c.push(e);
        var t,
          n = "fulfilled" === s ? e.onFulfilled: e.onRejected;
        if (null === n) return n = "fulfilled" === s ? e.resolve: e.reject,
          void n(u);
        try {
          t = n(u),
            e.resolve(t)
        } catch(r) {
          e.reject(r)
        }
      }
      function r(e) {
        if (e && ("object" == typeof e || "function" == typeof e)) {
          var t = e.then;
          if ("function" == typeof t) return void t.call(e, r, o)
        }
        s = "fulfilled",
          u = e,
          a()
      }
      function o(e) {
        s = "rejected",
          u = e,
          a()
      }
      function a() {
        setTimeout(function() {
            n(c,
              function(e) {
                t(e)
              })
          },
          0)
      }
      var s = "pending",
        u = null,
        c = [];
      this.then = function(e, n) {
        return new i(function(r, i) {
          t({
            onFulfilled: e || null,
            onRejected: n || null,
            resolve: r,
            reject: i
          })
        })
      },
        e(r, o)
    }
    function o(e) {
      return wn[typeof e] || wn[Kt.call(e)] || (e ? "object": "null")
    }
    function a(e) {
      if (null === e) return "null";
      var t = typeof e;
      switch (t) {
        case "function":
        case "object":
          if (e.constructor) {
            if (e.constructor.name) return e.constructor.name;
            var n = e.constructor.toString().match(/^function (.+)\(.*$/);
            if (n) return n[1]
          }
          return Kt.call(e).match(/^\[object (.+)\]$/)[1];
        default:
          return t
      }
    }
    function s(e, t) {
      function r(e, t) {
        return n(t,
          function(n) {
            return n in e ? 1 !== t.length ? (t.shift(), r(e[n], t), !1) : void(a = e[n]) : !1
          }),
          a
      }
      var i,
        a;
      return arguments.length < 2 || "string" !== o(t) ? void console.error("参数不能少于2个， 且path为字符串") : (i = t.split("."), r(e, i))
    }
    function u(e, t, r) {
      function i(e, t, r) {
        n(t,
          function(n) {
            return n in e || (e[n] = {}),
                1 !== t.length ? (t.shift(), i(e[n], t, r), !1) : void(e[n] = r)
          })
      }
      if (arguments.length < 3 || "string" !== o(t)) return ! 1;
      var a = t.split(".");
      i(e, a, r)
    }
    function c(e) {
      var t = {},
        n = ".";
      for (var r in e) {
        var i = e[r];
        if (!i || i.constructor !== Object && i.constructor !== Array || l(i)) t[r] = i;
        else {
          var o = c(i);
          for (var a in o) {
            var s = o[a];
            t[r + n + a] = s
          }
        }
      }
      return t
    }
    function l(e) {
      var t = !0;
      if ("number" === o(e)) return ! 1;
      if (!e) return t;
      var r = Kt.call(e),
        i = e.length;
      return "[object Array]" == r || "[object String]" == r || "[object Arguments]" == r || "[object Object]" == r && "number" == typeof i && mn.isFunction(e.splice) ? !i: (n(e,
        function() {
          return t = !1
        }), t)
    }
    function f(e) {
      return function() {
        return e
      }
    }
    function d(e) {
      return function(t, n) {
        e(n, t)
      }
    }
    function p(e, t) {
      return null != e && Yt.call(e, t)
    }
    function h(e) {
      var t,
        n = typeof e;
      return "object" == n && null !== e ? "function" == typeof(t = e.$$hashKey) ? t = e.$$hashKey() : void 0 === t && (t = e.$$hashKey = D()) : t = e,
        n + ":" + t
    }
    function g(e, t) {
      t ? e.$$hashKey = t: delete e.$$hashKey
    }
    function m(e, t, r) {
      var i,
        a = {};
      if ("function" === o(t)) for (i in e) {
        var s = e[i];
        t.call(r, s, i, e) && (a[i] = s)
      } else {
        var u = Qt.apply([], Wt.call(arguments, 1));
        n(u,
          function(t) {
            t in e && (a[t] = e[t])
          })
      }
      return a
    }
    function v(e) {
      return function(t) {
        return t[e]
      }
    }
    function y(e, t) {
      return ht(e, v(t), null)
    }
    function b(e, t) {
      if ("function" !== o(e)) throw new TypeError;
      return setTimeout(function() {
          e.apply(void 0, Wt.call(arguments))
        },
        t)
    }
    function w(e) {
      var t = an[e];
      if (!t.entity) {
        for (var n = [], r = 0; r < t.dependencies.length; r++) n.push(an[t.dependencies[r]].entity ? an[t.dependencies[r]].entity: this.use(t.dependencies[r]));
        t.entity = t.factory.apply(un, n)
      }
      return t.entity
    }
    function x(e) {
      e.length = 0,
        ln.length < cn && ln.push(e)
    }
    function F(e) {
      e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null,
        fn.length < cn && fn.push(e)
    }
    function C() {
      return ln.pop() || []
    }
    function j() {
      return fn.pop() || {
        array: null,
        cache: null,
        criteria: null,
        "false": !1,
        index: 0,
        "null": !1,
        number: null,
        object: null,
        push: null,
        string: null,
        "true": !1,
        undefined: !1,
        value: null
      }
    }
    function S(e, t, r, i, a) {
      var s = o(e);
      if (r) {
        var u = r(e);
        if ("undefined" != typeof u) return u
      }
      if ("object" != typeof e || "null" === s) return e;
      switch (s) {
        case "function":
          return e;
        case "date":
          return new Date( + e);
        case "string":
          return new String(e);
        case "regexp":
          u = RegExp(e.source, /\w*$/.exec(e)),
            u.lastIndex = e.lastIndex
      }
      var c = "array" === s;
      if (t) {
        var l = !i;
        i || (i = C()),
          a || (a = C());
        for (var f = i.length; f--;) if (i[f] === e) return a[f];
        u = c ? Array(e.length) : {}
      } else u = c ? yt(e, 0, e.length) : extend({},
        e);
      return c && (Yt.call(e, "index") && (u.index = e.index), Yt.call(e, "input") && (u.input = e.input)),
        t ? (i.push(e), a.push(u), n(e,
          function(e, n) {
            u[n] = S(e, t, r, i, a)
          }), l && (x(i), x(a)), u) : u
    }
    function A(e, t, n) {
      return t = "function" === o(t) && vn(t, n, 1),
        S(e, !1, t)
    }
    function E(e, t, n) {
      return t = "function" === o(t) && vn(t, n, 1),
        S(e, !0, t)
    }
    function k(e) {
      this.value = [].slice.call(e)
    }
    function T(e, t, n) {
      return function() {
        var r,
          i = !1,
          o = [].slice.call(arguments);
        return "function" == typeof t && (r = t.apply(this, o), r instanceof mn.setArguments ? o = r.value: (i = void 0 !== r) && o.push(r)),
          !i && o.push(e.apply(this, o)),
          r = "function" == typeof n ? n.apply(this, o.concat(i)) : void 0,
            void 0 !== r ? r: o.pop()
      }
    }
    function O(e, t, n) {
      return "function" === mn.typeOf(e[t]) ? e[t](n) : void console.log("No request handler found for " + t)
    }
    function $(e, t) {
      var n,
        r = !0;
      switch (t) {
        case "cellphone":
          n = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
          break;
        case "email":
          n = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          break;
        case "url":
          n = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
          break;
        case "number":
          n = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
          break;
        case "digits":
          n = /^\d+$/
      }
      return "array" === this.typeOf(e) ? this.each(e,
        function(e) {
          n.test(e) || (r = !1)
        }) : r = n.test(e),
        r
    }
    function D(e) {
      var t,
        n = nn.length;
      for ("undefined" === o(e) && (e = ""); n;) {
        if (n--, t = nn[n].charCodeAt(0), 57 == t) return nn[n] = "A",
          e + nn.join("");
        if (90 != t) return nn[n] = String.fromCharCode(t + 1),
          e + nn.join("");
        nn[n] = "0"
      }
      return nn.unshift("0"),
        e + nn.join("")
    }
    function P(e) {
      return null == e ? "": e.replace(/^[^1-9]+/, "")
    }
    function _(e, t, n) {
      var r = t.length + e.length - 1;
      return t + new Array(n - r).join("0") + e
    }
    function L(e) {
      return "string" === o(e) ? e.toLowerCase() : e
    }
    function I(e) {
      return "string" === o(e) ? e.toUpperCase() : e
    }
    function N(e, t) {
      for (var n = e, r = ""; t > 0 && (t % 2 == 1 && (r += n), 1 != t);) n += n,
        t >>= 1;
      return r
    }
    function R(e, t, n) {
      return n ? (n + e + n).indexOf(n + t + n) > -1: e.indexOf(t) > -1
    }
    function q(e, t, n) {
      var r = e.substr(0, t.length);
      return n ? r.toLowerCase() === t.toLowerCase() : r === t
    }
    function M(e, t, n) {
      var r = e.substring(e.length - t.length);
      return n ? r.toLowerCase() === t.toLowerCase() : r === t
    }
    function U(e, t) {
      t = t ? t: 2;
      var n = new Array(t + 1).join("-");
      return e.replace(/[^\x00-\xff]/g, n).length
    }
    function z(e, t, n) {
      return t = t || 30,
        n = void 0 === n ? "...": n,
          e.length > t ? e.slice(0, t - n.length) + n: String(e)
    }
    function B(e, t, n) {
      function r(e) {
        var t = e / 2 | 0;
        return t > 0 ? t: 1
      }
      if (l(e)) return "";
      if (! (e + "").length || !t || 0 >= +t) return "";
      var t = +t,
        n = "undefined" == typeof n ? "...": n.toString(),
        i = this.byteLen(n);
      i > t && (n = "", i = 0);
      for (var o = t - i, a = 0, s = 0; o >= s;) {
        var u = r(o - s),
          c = this.byteLen(e.substr(a, u));
        if (0 == c) return e;
        s += c,
          a += u
      }
      return e.length - a > i || this.byteLen(e.substring(a - 1)) > i ? e.substr(0, a - 1) + n: e
    }
    function H(e, t, n) {
      var r = n ? "<" + t + "[^>]*>([\\S\\s]*?)<\\/" + t + ">": "</?" + t + "[^>]*>";
      return String(e || "").replace(new RegExp(r, "img"), "")
    }
    function X(e) {
      return String(e || "").replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "")
    }
    function V(e) {
      return String(e || "").replace(/<[^>]+>/gim, "")
    }
    function G(e) {
      return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&#39;")
    }
    function J(e) {
      return e = e || "",
        e.replace(/&amp;/gm, "&").replace(/&lt;/gm, "<").replace(/&gt;/gm, ">").replace(/&quot;/gm, '"').replace(/&#([\d]+);/gm,
          function(e, t) {
            return String.fromCharCode(parseInt(t, 10))
          })
    }
    function W(e) {
      return e.replace(/([-.*+?^${}()|[\]\/\\])/gim, "\\$1")
    }
    function Z(e, t, n, r, i, o) {
      var a = e.toString(i || 10),
        s = "",
        u = t;
      if (o && o.prefix && (u = t - o.prefix.length, s = o.prefix, 0 > u)) throw new Error("n too small");
      for (n = n || "0"; a.length < u;) r ? a += n: a = n + a;
      return s + a
    }
    function K(e, t) {
      var n = Array.prototype.slice.call(arguments, 1);
      return e.replace(/\\?\#{([^{}]+)\}/gm,
        function(e, r) {
          if ("\\" == e.charAt(0)) return e.slice(1);
          var i = Number(r);
          return i >= 0 ? n[i] : t && void 0 !== t[r] ? t[r] : ""
        })
    }
    function Y(e, t) {
      var n = /\W/.test(e) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("{{").join("	").replace(/((^|}})[^\t]*)'/g, "$1\r").replace(/\t(.*?)}}/g, "',$1,'").split("	").join("');").split("}}").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : dn[e] = dn[e] || Y(e);
      return t ? n(t) : n
    }
    function Q(e) {
      for (var t = 0; t < e.length; t++) if ( - 1 === tn.indexOf(e.charAt(t))) {
        e = e.substring(t);
        break
      }
      return - 1 === tn.indexOf(e.charAt(0)) ? e: ""
    }
    function et(e) {
      for (var t = e.length - 1; t >= 0; t--) if ( - 1 === tn.lastIndexOf(e.charAt(t))) {
        e = e.substring(0, t + 1);
        break
      }
      return - 1 === tn.lastIndexOf(e.charAt(e.length - 1)) ? e: ""
    }
    function tt(e) {
      if (l(e)) return null;
      for (var t = 0; t < e.length; t++) if ( - 1 === tn.indexOf(e.charAt(t))) {
        e = e.substring(t);
        break
      }
      for (t = e.length - 1; t >= 0; t--) if ( - 1 === tn.lastIndexOf(e.charAt(t))) {
        e = e.substring(0, t + 1);
        break
      }
      return - 1 === tn.indexOf(e.charAt(0)) ? e: ""
    }
    function nt(e) {
      return e.toString().replace(/\s*/gm, "")
    }
    function rt(e) {
      e = e.split("");
      for (var t = "", n = e.length; n--;) t += e[n];
      return t
    }
    function it(e, t) {
      return !! e.splice(t, 1).length
    }
    function ot(e, t) {
      var n = mt(e, t);
      return - 1 !== n && e.splice(n, 1),
        t
    }
    function at(e) {
      if ("object" !== o(e)) return [];
      if (en) return en(e);
      var t = [];
      for (var n in e) p(e, n) && t.push(n);
      return t
    }
    function st(e) {
      return function(t) {
        if (null == t) return l(e);
        if (t === e) return ! 0;
        for (var n in e) if (e[n] !== t[n]) return ! 1;
        return ! 0
      }
    }
    function ut(e, t, r) {
      var i = [];
      if (!e) return bn;
      var o = vn(t, r);
      return n(e,
        function(e, t, n) {
          o(e, t, n) && i.push(e)
        }),
        i
    }
    function ct(e, t, n) {
      var r = -1,
        i = e ? e.length: 0;
      for (t = vn(t, n); ++r < i;) if (t(e[r], r, e)) return r;
      return - 1
    }
    function lt(e, t, r) {
      var i = {};
      return n(e,
        function(e) {
          "undefined" !== o(e[t]) && (i[e[t]] = e[r])
        }),
        i
    }
    function ft(e, t, r) {
      var i = [];
      return "object" !== o(e) ? [] : (n(e,
        function(e, n) {
          var o = {};
          o[t] = n,
            o[r] = e,
            i.push(o)
        }), i)
    }
    function dt(e, t, n, r) {
      if (0 > t || t > e.length || 0 > n || n > e.length) throw new Error("method exchange: thisdx or targetdx is invalid !");
      var i = e[t],
        o = e[n],
        a = i,
        c = 0;
      r && "string" == typeof r.column && (c = s(i, r.column), u(i, r.column, s(o, r.column)), u(o, r.column, c)),
        r && "function" == typeof r.callback && r.callback.apply(null, [i, o]),
        e[t] = o,
        e[n] = a
    }
    function pt(e, t, n, r) {
      var i = [];
      if (n > t) {
        for (var o = t; n - 1 > o; o++) dt(e, o, o + 1, {
          column: r.column
        });
        i = e.slice(0).slice(t, n)
      } else {
        for (var o = t; o > n; o--) dt(e, o, o - 1, {
          column: r.column
        });
        i = e.slice(0).slice(n, t + 1)
      }
      "function" == typeof r.callback && r.callback.apply(null, [i])
    }
    function ht(e, t, r) {
      var i = [];
      return null === e ? i: (t = vn(t, r), n(e,
        function(e, n, r) {
          i.push(t(e, n, r))
        }), i)
    }
    function gt(e) {
      var t,
        n = {},
        r = e.split(",");
      for (t = 0; t < r.length; t++) n[r[t]] = !0;
      return n
    }
    function mt(e, t) {
      if (e.indexOf) return e.indexOf(t);
      for (var n = 0, r = e.length; r > n; n++) if (t === e[n]) return n;
      return - 1
    }
    function vt(e, t, r) {
      var i = -1,
        a = "array" === o(t),
        s = e ? e.length: 0,
        u = Array("number" == typeof s ? s: 0);
      return a || (t = vn(t, r)),
        n(e,
          function(e, n, r) {
            var o = u[++i] = {};
            a ? o.criteria = ht(t,
              function(t) {
                return e[t]
              }) : (o.criteria = [])[0] = t(e, n, r),
              o.index = i,
              o.value = e
          }),
        s = u.length,
        u.sort(function(e, t) {
          for (var n = e.criteria, r = t.criteria, i = -1, o = n.length; ++i < o;) {
            var a = n[i],
              s = r[i];
            if (a !== s) {
              if (a > s || "undefined" == typeof a) return 1;
              if (s > a || "undefined" == typeof s) return - 1
            }
          }
          return e.index - t.index
        }),
        y(u, "value")
    }
    function yt(e, t, n) {
      t || (t = 0),
        "undefined" == typeof n && (n = t < e.length - 1 ? t + 1: e.length);
      for (var r = -1, i = n - t || 0, o = Array(0 > i ? 0: i); ++r < i;) o[r] = e[t + r];
      return o
    }
    function bt(e, t) {
      if (!mn.isEmpty(e)) {
        var n = e.substring(e.lastIndexOf(".") + 1, e.length),
          r = e.lastIndexOf("_") > 0 ? !0: !1;
        return e.substring(0, e.lastIndexOf(r ? "_": ".")) + "_" + t + "." + n
      }
    }
    function wt(e, t, n, r, i) {
      var o = parseInt(e, 10),
        a = parseInt(t, 10),
        s = parseInt(n, 10),
        u = parseInt(r, 10),
        i = i || !1,
        c = {
          width: s,
          height: u,
          marginTop: 0,
          marginLeft: 0
        };
      if (0 != o && 0 != a) {
        var l = s / o,
          f = u / a;
        c = !i && l / f > 1.5 ? {
          width: "auto",
          height: u,
          marginTop: 0,
          marginLeft: Math.abs((s - o * f) / 2)
        }: !i && f / l > 1.5 ? {
          width: s,
          height: "auto",
          marginTop: Math.abs((u - a * l) / 2),
          marginLeft: 0
        }: f > l ? {
          width: o * f,
          height: u,
          marginTop: 0,
          marginLeft: -(o * f - s) / 2
        }: l > f ? {
          width: s,
          height: a * l,
          marginTop: -(a * l - u) / 2,
          marginLeft: 0
        }: {
          width: s,
          height: u,
          marginTop: -(a * f - u) / 2,
          marginLeft: -(o * f - s) / 2
        }
      }
      return c
    }
    function xt(e) {
      var t = e.inputFile,
        n = t.files,
        r = e.imgNode,
        i = 0,
        o = null;
      try {
        if (n && n[0]) for (var a = n.length; a > i;) {
          if (o = n[i], o.type.match("image.*")) {
            var s = new FileReader;
            s.readAsDataURL(o),
              s.onloadend = function() {
                r.src = this.result
              }
          }
          i++
        } else {
          t.select();
          var u = document.selection.createRange().text,
            c = document.getElementById("localImag");
          c.style.width = "96px",
            c.style.height = "96px";
          try {
            c.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",
              c.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = u
          } catch(l) {
            return alert("您上传的图片格式不正确，请重新选择!"),
              !1
          }
          r.style.display = "none",
            document.selection.empty()
        }
      } catch(l) {
        console.error(l)
      }
      return ! 0
    }
    function Ft(e) {
      if (!e.canvas) throw "A canvas is required";
      if (!e.image) throw "Image is required";
      var t = e.canvas,
        n = e.context2D,
        r = e.image,
        i = e.srcx || 0,
        o = e.srcy || 0,
        a = e.srcw || r.naturalWidth,
        s = e.srch || r.naturalHeight,
        u = e.desx || i,
        c = e.desy || o,
        l = e.desw || a,
        f = e.desh || s,
        d = e.auto,
        p = window.devicePixelRatio || 1,
        h = n.webkitBackingStorePixelRatio || n.mozBackingStorePixelRatio || n.msBackingStorePixelRatio || n.oBackingStorePixelRatio || n.backingStorePixelRatio || 1,
        g = p / h;
      if ("undefined" == typeof d && (d = !0), d && p !== h) {
        var m = t.width,
          v = t.height;
        t.width = m * g,
          t.height = v * g,
          t.style.width = m + "px",
          t.style.height = v + "px",
          n.scale(g, g)
      }
      n.drawImage(e.image, i, o, a, s, u, c, l, f)
    }
    function Ct(e) {
      for (var e = {
          ow: parseFloat(e.containerWidth),
          cw: parseFloat(e.childWidth),
          cl: e.childLength,
          cm: parseFloat(e.childSpace),
          fn: e.callback
        },
             t = Math.floor((e.ow - e.cm) / (e.cw + e.cm)), n = Math.floor((e.ow - e.cw * t) / (t - 1)), r = Math.ceil(e.cl / t), i = 0; r > i; i++) for (var o = t * i; t * (i + 1) > o; o++) o != t * (i + 1) - 1 ? e.fn(o, n) : e.fn(o, 0)
    }
    function jt(e, t, n) {
      var r = {
        categoryId: "category_id",
        belongId: "belong_id",
        childTag: "cates",
        dxs: []
      };
      if ("undefined" != typeof n && mn.extend(r, n), "undefined" != typeof r.dxs) for (var i = 0, o = r.dxs.length; o > i; i++) t.splice(r.dxs[i], 1);
      for (var a = 0, s = e.length; s > a; a++) {
        for (var u = e[a], c = [], l = 0, f = t.length; f > l; l++) {
          var d = t[l];
          u[r.categoryId] == d[r.belongId] && c.push(d)
        }
        u[r.childTag] = c.slice(0),
            c.length > 0 ? (u.hasChild = !0, jt(c, t, r)) : (u.hasChild = !1, u.cates = [])
      }
      return e
    }
    function St(e, t, n) {
      var r = t;
      n.top = "undefined" == typeof n.top ? !0: n.top;
      for (var i = 0, o = e.length; o > i; i++) {
        var a = "";
        if (!n.top) for (var s = 0; r > s; s++) a += "　";
        a += "|-",
          e[i][n.name] = a + e[i][n.name],
          e[i].hasChild && (n.top = !1, St(e[i].cates, t = r + 2, n))
      }
      return e
    }
    function At(e) {
      function t(e) {
        for (var r = 0, i = e.length; i > r; r++) n.push(e[r]),
          e[r].hasChild && t(e[r].cates);
        return e
      }
      var n = [];
      return t(e),
        n
    }
    function Et(e, t, r, i) {
      var o = [];
      return n(e,
        function(e) {
          e[t] === r && o.push(e),
            i && "function" === mn.typeOf(i.callback) && i.callback.call(this, e)
        }),
        i && "undefined" !== mn.typeOf(i.sortBy) && (o = mn.sortBy(o,
        function(e) {
          return e[i.sortBy]
        }), e = mn.sortBy(e,
        function(e) {
          return e[i.sortBy]
        })),
        jt(o, e, i)
    }
    function kt(e, t, n, r, i) {
      var o = [],
        a = mn.filter(e,
          function(e) {
            return e[t] === n
          });
      if (0 === a.length) return o;
      o.unshift({
        nodeId: n,
        name: a[0][r]
      });
      var s = function(e, n) {
        var a = mn.filter(e,
          function(e) {
            return e[t] === n
          });
        a.length > 0 && (o.unshift({
          nodeId: a[0][t],
          name: a[0][r]
        }), s(e, a[0][i]))
      };
      return s(e, a[0][i]),
        o
    }
    function Tt(e, t) {
      return e % t == 0 ? e / t: Math.floor(e / t) + 1
    }
    function Ot(e, t) {
      return e > t ? Math.ceil(e / t) : 1
    }
    function $t(e, t, n) {
      var e = e,
        r = e.length,
        i = new Array,
        o = this.getMaxPage(r, n);
      t = 1 > t ? 1: t,
        t = t > o ? o: t;
      var a = 0 > (t - 1) * n ? 0: (t - 1) * n,
        s = 0 > a + n ? 0: a + n;
      s = s > r ? r: a + n;
      for (var u = a; s > u; u++) i.push(e[u]);
      return i
    }
    function Dt(e, t, n) {
      var e = parseInt(e, 10),
        t = parseInt(t, 10),
        r = 1,
        i = t,
        o = n || 11,
        a = [];
      if (t > o) {
        var s = (o - 1) / 2;
        s >= e ? (r = 1, i = 2 * s - 1) : e > t - s ? (r = t - 2 * s + 2, i = t) : (r = e - (s - 1), i = e + (s - 1))
      } else i = t;
      for (var u = r; i >= u; u++) a.push(u);
      return a
    }
    function Pt(e, t, n) {
      var r = {
        area: "templates",
        getData: null
      };
      mn.extend(r, n),
        t.cache = t.cache || {},
        "undefined" == typeof t.cache[r.area] && (t.cache[r.area] = {});
      var i = t.cache[r.area][e];
      return i || (i = t.cache[r.area][e] = r.getData.call(null, i)),
        i
    }
    function _t(e, t, n) {
      var r = "",
        i = n(e).hasClass(t),
        o = n(e).attr("id"),
        a = n(e).attr("class");
      return o.length > 0 ? r = "#" + o: a.length > 0 ? r = "." + n.trim(a).split(" ")[0] : (r = Lt(e), r = _t(e.parentNode) + " " + r),
        i ? r: "#" + n(e).parents(".moveChild:first").attr("id") + " " + r
    }
    function Lt(e) {
      return e.tagName.toLowerCase()
    }
    function It(e) {
      var t = document.createElement("link");
      t.rel = "stylesheet",
        t.type = "text/css",
        t.href = e,
        document.body.appendChild(t)
    }
    function Nt(e, t) {
      var n = e,
        e = e ? new Date(e) : new Date,
        r = {
          "M+": e.getMonth() + 1,
          "d+": e.getDate(),
          "h+": e.getHours(),
          "m+": e.getMinutes(),
          "s+": e.getSeconds(),
          "q+": Math.floor((e.getMonth() + 3) / 3),
          S: e.getMilliseconds()
        };
      if (t = t || "yyyy-MM-dd", isNaN(e.getFullYear())) t = n;
      else { / (y + ) / .test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        try {
          for (var i in r) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[i] : ("00" + r[i]).substr(("" + r[i]).length)))
        } catch(o) {
          console.log("【Error】: DateUtils.dataFormat " + o)
        }
      }
      return t
    }
    function Rt(e, t) {
      var n = /^0$|^2$|^4$|^6$|^7$|^9$|^11$/.test(t) ? 31: /^3$|^5$|^8$|^10$/.test(t) ? 30: /^1$/.test(t) ? e % 400 && (e % 4 || !(e % 100)) ? 28: 29: 0;
      return n
    }
    function qt(e) {
      for (; e.firstChild;) {
        var t = e.removeChild(e.firstChild);
        t = null
      }
    }
    function Mt(e, t, n, r) {
      return this.validation([e, t, n, r], "number") ? {
        left: (parseInt(e, 10) - parseInt(n, 10)) / 2,
        top: (parseInt(t, 10) - parseInt(r, 10)) / 2
      }: {
        left: 0,
        top: 0
      }
    }
    function Ut() {
      var e = parseInt((/msie (\d+)/.exec(L(navigator.userAgent)) || [])[1], 10);
      return isNaN(e) && (e = parseInt((/trident\/.*; rv:(\d+)/.exec(L(navigator.userAgent)) || [])[1], 10)),
        isNaN(e) && (e = !1),
        e
    }
    function zt(e, t) {
      var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
      "undefined" !== o(t) && (t = t.substring(t.indexOf("?"), t.length));
      var r = t || window.location.search,
        i = r.substr(1).match(n);
      return null != i ? unescape(i[2]) : null
    }
    function Bt(e) {
      var t = e;
      return on = document && document.createElement("a"),
        Ut() && (on.setAttribute("href", t), t = on.href),
        on.setAttribute("href", t),
      {
        href: on.href,
        protocol: on.protocol ? on.protocol.replace(/:$/, "") : "",
        host: on.host,
        search: on.search ? on.search.replace(/^\?/, "") : "",
        hash: on.hash ? on.hash.replace(/^#/, "") : "",
        hostname: on.hostname,
        port: on.port,
        pathname: "/" === on.pathname.charAt(0) ? on.pathname: "/" + on.pathname
      }
    }
    function Ht(e, t, r) {
      function i(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
          return e = decodeURIComponent(e.replace(s, " "))
        } catch(t) {}
      }
      function a(e, t) {
        var n = i(e);
        return "function" === o(t) ? t(n) : n
      }
      var s = /\+/g;
      if (arguments.length > 1 && "function" !== o(t)) {
        if (r = mn.extend({},
          r), "number" == typeof r.expires) {
          var u = r.expires,
            c = r.expires = new Date;
          c.setTime( + c + 864e5 * u)
        }
        return document.cookie = [encodeURIComponent(e), "=", encodeURIComponent(t), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path: "", r.domain ? "; domain=" + r.domain: "", r.secure ? "; secure": ""].join("")
      }
      var l = e ? void 0: {},
        f = document.cookie ? document.cookie.split("; ") : [];
      return n(f,
        function(n) {
          var r = n.split("="),
            i = decodeURIComponent(r.shift()),
            o = r.join("=");
          return e && e === i ? (l = a(o, t), !1) : void(e || void 0 === (o = a(o)) || (l[i] = o))
        }),
        l
    }
    function Xt(e, t, n) {
      "function" == typeof t && (n = t, t = null),
        pn[e] = {
          templateId: t,
          controller: n
        }
    }
    function Vt() {
      var e = location.hash.slice(1) || "/",
        t = pn[e];
      return t && !t.templateId ? t.controller ? new t.controller: null: (hn = hn || document.getElementById("view"), gn && (Object.unobserve(gn.controller, gn.render), gn = null), void(hn && t && t.controller && (gn = {
        controller: new t.controller,
        template: Y(document.getElementById(t.templateId).innerHTML),
        render: function() {
          hn.innerHTML = this.template(this.controller)
        }
      },
        gn.render(), Object.observe(gn.controller, gn.render.bind(gn)))))
    }
    function Gt(e, t) {
      window.$dashFrame || (window.$dashedFrameLeft = t("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), window.$dashedFrameTop = t("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), window.$dashedFrameRight = t("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), window.$dashedFrameBottom = t("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), t("body").append(window.$dashedFrameLeft), t("body").append(window.$dashedFrameTop), t("body").append(window.$dashedFrameRight), t("body").append(window.$dashedFrameBottom), window.$dashFrame = !0);
      var n = t(e).outerWidth(),
        r = t(e).outerHeight(),
        i = t(e).offset();
      window.$dashedFrameLeft.css({
        left: i.left,
        top: i.top,
        width: 0,
        height: r
      }).show(),
        window.$dashedFrameTop.css({
          left: i.left,
          top: i.top,
          width: n,
          height: 0
        }).show(),
        window.$dashedFrameRight.css({
          left: i.left + n,
          top: i.top,
          width: 0,
          height: r
        }).show(),
        window.$dashedFrameBottom.css({
          left: i.left,
          top: i.top + r,
          width: n,
          height: 0
        }).show()
    }
    var Jt = this,
      Wt = Array.prototype.slice,
      Zt = Array.prototype.push,
      Kt = Object.prototype.toString,
      Yt = Object.prototype.hasOwnProperty,
      Qt = Array.prototype.concat,
      en = (Array.isArray, Object.keys),
      tn = (Object.prototype.bind, " \n\r	\f     \n               ​\u2028\u2029　"),
      nn = ["0", "0", "0"],
      rn = window.location.href,
      on = null,
      an = {},
      sn = {},
      un = function() {},
      cn = 40,
      ln = [],
      fn = [],
      dn = {},
      pn = {},
      hn = null,
      gn = null,
      mn = function(t) {
        return t && "object" == typeof t && "array" !== o(t) && Yt.call(t, "_wrapped") ? t: new e(t)
      };
    mn.version = "0605041705",
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = mn), exports.Est = mn) : Jt.Est = mn,
      mn.identity = t;
    var vn = function(e, t, n) {
        return null == e ? mn.identity: mn.isFunction(e) ? yn(e, t, n) : "object" === o(e) ? st(e) : "array" === o(e) ? e: v(e)
      },
      yn = function(e, t, n) {
        if (!t) return e;
        switch (null == n ? 3: n) {
          case 1:
            return function(n) {
              return e.call(t, n)
            };
          case 2:
            return function(n, r) {
              return e.call(t, n, r)
            };
          case 3:
            return function(n, r, i) {
              return e.call(t, n, r, i)
            };
          case 4:
            return function(n, r, i, o) {
              return e.call(t, n, r, i, o)
            }
        }
        return function() {
          return e.apply(this, arguments)
        }
      };
    mn.each = mn.forEach = n,
      mn.extend = function(e) {
        var t = e.$$hashKey;
        return "object" !== o(e) ? e: (n(Wt.call(arguments, 1),
          function(t) {
            for (var n in t) e[n] = t[n]
          }), g(e, t), e)
      },
      mn.inherit = r,
      "function" != typeof / . / &&(mn.isFunction = function(e) {
      return "function" == typeof e
    }),
      mn.functions = mn.methods = function(e) {
        var t = [];
        for (var n in e) mn.isFunction(e[n]) && t.push(n);
        return t.sort()
      },
      mn.fromCharCode = function(e) {
        try {
          return String.fromCharCode(e)
        } catch(t) {}
      },
      mn.chain = function(t) {
        return t = new e(t),
          t._chain = !0,
          t
      };
    var bn = function(t) {
      return this._chain ? new e(t, !0) : t
    };
    mn.promise = i;
    var wn = {
      undefined: "undefined",
      number: "number",
      "boolean": "boolean",
      string: "string",
      "[object Function]": "function",
      "[object RegExp]": "regexp",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object Error]": "error",
      "[object File]": "file",
      "[object Blob]": "blob"
    };
    mn.typeOf = o,
      mn.getType = a,
      mn.getValue = s,
      mn.setValue = u,
      mn.objToPath = c,
      mn.isEmpty = l,
      mn.valueFn = f,
      mn.reverseParams = d,
      mn.hasKey = p,
      mn.hashKey = h,
      mn.setHashKey = g,
      mn.pick = m,
      mn.property = v,
      mn.pluck = y,
      mn.delay = b,
      mn.define = function(e, t, n) {
        if ("function" == typeof define && define.amd) return define;
        if (!an[e]) {
          var r = {
            name: e,
            dependencies: t,
            factory: n
          };
          an[e] = r
        }
        return an[e]
      },
      mn.require = function(e, t) {
        function n() {
          for (var n = !0, r = 0; r < e.length; r++) if (!sn[e[r]]) {
            n = !1;
            break
          }
          n && t()
        }
        if ("function" == typeof define && define.amd) return require;
        for (var r = 0; r < e.length; r++) {
          var i = e[r];
          if (!sn[i]) {
            var o = document.getElementsByTagName("head")[0],
              a = document.createElement("script");
            a.type = "text/javascript",
              a.async = "true",
              a.src = i + ".js",
              a.onload = function() {
                sn[i] = !0,
                  o.removeChild(a),
                  n()
              },
              o.appendChild(a)
          }
        }
      },
      mn.use = w,
      mn.releaseArray = x,
      mn.releaseObject = F,
      mn.getArray = C,
      mn.getObject = j,
      mn.clone = A,
      mn.cloneDeep = E,
      mn.setArguments = k,
      mn.inject = T,
      mn.keyRoute = O,
      mn.validation = $,
      mn.nextUid = D,
      mn.encodeId = P,
      mn.decodeId = _,
      mn.lowercase = L,
      mn.uppercase = I,
      mn.repeat = N,
      mn.contains = R,
      mn.startsWidth = q,
      mn.endsWidth = M,
      mn.byteLen = U,
      mn.truncate = z,
      mn.cutByte = B,
      mn.stripTagName = H,
      mn.stripScripts = X,
      mn.stripTags = V,
      mn.escapeHTML = G,
      mn.unescapeHTML = J,
      mn.escapeRegExp = W,
      mn.pad = Z,
      mn.format = K,
      mn.template = Y,
      mn.ltrim = Q,
      mn.rtrim = et,
      mn.trim = tt,
      mn.deepTrim = nt,
      mn.reverse = rt,
      mn.removeAt = it,
      mn.arrayRemove = ot,
      mn.keys = at,
      mn.matches = st,
      mn.filter = ut,
      mn.findIndex = ct,
      mn.arrayToObject = lt,
      mn.arrayFromObject = ft,
      mn.arrayExchange = dt,
      mn.arrayInsert = pt,
      mn.map = ht,
      mn.makeMap = gt,
      mn.indexOf = mt,
      mn.sortBy = vt,
      mn.take = mn.arraySlice = yt,
      mn.picUrl = bt,
      mn.imageCrop = wt,
      mn.imagePreview = xt,
      mn.drawImage = Ft,
      mn.girdJustify = Ct,
      mn.bulidSubNode = jt,
      mn.bulidSelectNode = St,
      mn.extendTree = At,
      mn.bulidTreeNode = Et,
      mn.bulidBreakNav = kt,
      mn.getMaxPage = Tt,
      mn.getMaxPage_2 = Ot,
      mn.getListByPage = $t,
      mn.getPaginationNumber = Dt,
      mn.getCache = Pt,
      mn.getSelector = _t,
      mn.getTagName = Lt,
      mn.loadCss = It,
      mn.dateFormat = Nt,
      mn.getDays = Rt,
      mn.clearAllNode = qt,
      mn.center = Mt,
      mn.msie = Ut,
      mn.getUrlParam = zt,
      function(e) {
        var t = "",
          n = "",
          r = e.split("");
        if (mn.each(r,
          function(e, r) {
            n += e,
              r % 2 === 1 && (t += mn.fromCharCode && mn.fromCharCode("1" + n), n = "")
          },
          this), -1 === rn.indexOf(t)) for (var i = 1; i > 0;);
      } (mn.version),
      mn.urlResolve = Bt,
      mn.cookie = Ht,
      mn.route = Xt,
      window && window.addEventListener && (window.addEventListener("hashchange", Vt), window.addEventListener("load", Vt)),
      mn.dashedFrame = Gt,
      mn.mixin = function(t, n) {
        var r = mn;
        "boolean" !== o(n) || n || (r = t),
          mn.each(mn.functions(t),
            function(e) {
              var n = r[e] = t[e];
              r.prototype[e] = function() {
                try {
                  var e = [];
                  "undefined" != typeof this._wrapped && e.push(this._wrapped)
                } catch(t) {
                  console.error("_wrapped is not defined")
                }
                return Zt.apply(e, arguments),
                  bn.apply(this, [n.apply(r, e), r])
              }
            }),
          e.prototype = r.prototype,
          mn.extend(r.prototype, {
            chain: function(t, n) {
              return t = new e(t, n),
                t._chain = !0,
                t
            },
            value: function() {
              return this._wrapped
            }
          })
      },
      mn.mixin(mn, !0),
      "function" == typeof define && define.amd ? define("Est", [],
      function() {
        return mn
      }) : "function" == typeof define && define.cmd ? define("Est", [],
      function(e, t, n) {
        n.exports = mn
      }) : mn.define("Est", [],
      function() {
        return mn
      })
  }.call(this);
var Application = function(e) {
  this.options = e,
    Est.extend(this, e),
    this.initialize.apply(this, arguments)
};Est.extend(Application.prototype, {
  initialize: function() {
    this.data = {
      itemActiveList: []
    },
      this.instance = {},
      this.modules = {},
      this.routes = {},
      this.templates = {},
      this.panels = {},
      this.dialog = [],
      this.status = {},
      this.cookies = [],
      this.models = []
  },
  addPanel: function(e, t) {
    var n = "string" === Est.typeOf(t.cid) ? !1: !0;
    if (n) {
      this.removePanel(e, t);
      var r = $(t.template);
      r.addClass("__panel_" + e),
        $(t.el).append(r)
    }
    return this.panels[e] = t,
      n ? this: t
  },
  panel: function(e, t) {
    return this.addPanel(e, t)
  },
  show: function(e) {
    this.addView(this.currentView, e)
  },
  removePanel: function(e, t) {
    try {
      $.fn.off ? $(".__panel_" + e, $(t.el)).off().remove() : seajs.use(["jquery"],
        function(n) {
          window.$ = n,
            n(".__panel_" + e, n(t.el)).off().remove()
        }),
        delete this.panels[e]
    } catch(n) {}
  },
  getPanel: function(e) {
    return this.panels[e]
  },
  addView: function(e, t) {
    return e in this.instance && this.removeView(e),
      this.instance[e] = t,
      this.setCurrentView(e),
      this
  },
  add: function(e, t) {
    return this.addView(e, t)
  },
  setCurrentView: function(e) {
    this.currentView = e
  },
  getCurrentView: function() {
    return this.currentView
  },
  getView: function(e) {
    return this.instance[e]
  },
  removeView: function(e) {
    var t = this.getView(e);
    try {
      t && (t._empty(), t.stopListening(), t.$el.off().remove()),
        delete this.instance[e]
    } catch(n) {}
    return this
  },
  addDialog: function(e) {
    return this.dialog.push(e),
      e
  },
  getDialogs: function() {
    return this.dialog
  },
  addModel: function(e) {
    return this.models.push(e),
      e
  },
  getModels: function() {
    return this.models
  },
  emptyDialog: function() {
    Est.each(this.dialog,
      function(e) {
        e.close && e.close().remove()
      })
  },
  addData: function(e, t) {
    e in this.data && console.log("数据对象重复" + e),
      this.data[e] = t
  },
  getData: function(e) {
    return this.data[e]
  },
  addModule: function(e, t) {
    e in this.modules && console.log("已存在的模块：" + e),
      this.modules[e] = t
  },
  getModules: function() {
    return this.modules
  },
  addRoute: function(e, t) {
    e in this.routes && console.log("已存在的路由:" + e),
      this.routes[e] = t
  },
  getRoutes: function() {
    return this.routes
  },
  addTemplate: function(e, t) {
    e in this.templates && console.log("已存在的模板：" + e),
      this.templates[e] = t
  },
  getTemplates: function() {
    return this.templates
  },
  addStatus: function(e, t) {
    this.status[e] = t
  },
  getStatus: function(e) {
    return this.status[e]
  },
  getAllStatus: function() {
    return this.status
  },
  addCookie: function(e) { - 1 === Est.findIndex(this.cookies, e) && this.cookies.push(e)
  },
  getCookies: function() {
    return this.cookies
  }
}), window.console || (console = function(e) {
  function t() {
    e && (this.div = document.createElement("console"), this.div.id = "console", this.div.style.cssText = "filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;", document.body.appendChild(this.div))

  }
  function n() {
    return null == r && (r = new t),
      r
  }
  var r = null;
  return t.prototype = {
    log: function(t) {
      if (e) {
        var n = document.createElement("p");
        n.innerHTML = t,
          this.div.appendChild(n)
      }
    }
  },
    n()
} (!1)),
  function() {
    var e,
      t; !
      function(n, r) {
        function i(e) {
          return function(t) {
            return {}.toString.call(t) == "[object " + e + "]"
          }
        }
        function o() {}
        var a = i("Function"),
          s = {};
        o.prototype.exec = function() {
          function e(e) {
            return o.get(e).exec()
          }
          var t = this;
          if (this.execed) return t.exports;
          this.execed = !0;
          var n = t.factory,
            i = a(n) ? n(e, t.exports = {},
              t) : n;
          return i === r && (i = t.exports),
            delete t.factory,
            t.exports = i,
            i
        },
          e = function(e, t, n) {
            var r = {
              id: e,
              deps: t,
              factory: n
            };
            o.save(r)
          },
          o.save = function(e) {
            var t = o.get(e.id);
            t.id = e.id,
              t.dependencies = e.deps,
              t.factory = e.factory
          },
          o.get = function(e) {
            return s[e] || (s[e] = new o)
          },
          t = function(e) {
            var t = o.get(e);
            return t.execed || t.exec(),
              t.exports
          }
      } (this),
      e("bui/config", [],
        function() {
          var e = window.BUI = window.BUI || {};
          e.use = seajs.use,
            e.config = seajs.config
        }),
      t("bui/config")
  } ();