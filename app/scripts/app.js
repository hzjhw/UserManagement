/*! Sea.js 2.3.0 | seajs.org/LICENSE.md */
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return z++}function e(a){return a.match(C)[0]}function f(a){for(a=a.replace(D,"/"),a=a.replace(F,"$1/");a.match(E);)a=a.replace(E,"/");return a}function g(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||"/"===c?a:a+".js"}function h(a){var b=u.alias;return b&&w(b[a])?b[a]:a}function i(a){var b=u.paths,c;return b&&(c=a.match(G))&&w(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=u.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(H,function(a,c){return w(b[c])?b[c]:a})),a}function k(a){var b=u.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=y(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charAt(0);if(I.test(a))c=a;else if("."===d)c=f((b?e(b):u.cwd)+a);else if("/"===d){var g=u.cwd.match(J);c=g?g[0]+a.substring(1):a}else c=u.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=j(a),a=g(a);var c=l(a,b);return c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c){var d=K.createElement("script");if(c){var e=y(c)?c(a):c;e&&(d.charset=e)}p(d,b,a),d.async=!0,d.src=a,R=d,Q?P.insertBefore(d,Q):P.appendChild(d),R=null}function p(a,b,c){function d(){a.onload=a.onerror=a.onreadystatechange=null,u.debug||P.removeChild(a),a=null,b()}var e="onload"in a;e?(a.onload=d,a.onerror=function(){B("error",{uri:c,node:a}),d()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&d()}}function q(){if(R)return R;if(S&&"interactive"===S.readyState)return S;for(var a=P.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return S=c}}function r(a){var b=[];return a.replace(U,"").replace(T,function(a,c,d){d&&b.push(d)}),b}function s(a,b){this.uri=a,this.dependencies=b||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!a.seajs){var t=a.seajs={version:"2.3.0"},u=t.data={},v=c("Object"),w=c("String"),x=Array.isArray||c("Array"),y=c("Function"),z=0,A=u.events={};t.on=function(a,b){var c=A[a]||(A[a]=[]);return c.push(b),t},t.off=function(a,b){if(!a&&!b)return A=u.events={},t;var c=A[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete A[a];return t};var B=t.emit=function(a,b){var c=A[a],d;if(c){c=c.slice();for(var e=0,f=c.length;f>e;e++)c[e](b)}return t},C=/[^?#]*\//,D=/\/\.\//g,E=/\/[^/]+\/\.\.\//,F=/([^:/])\/+\//g,G=/^([^/:]+)(\/.+)$/,H=/{([^{]+)}/g,I=/^\/\/.|:\//,J=/^.*?\/\/.*?\//,K=document,L=location.href&&0!==location.href.indexOf("about:")?e(location.href):"",M=K.scripts,N=K.getElementById("seajsnode")||M[M.length-1],O=e(n(N)||L);t.resolve=m;var P=K.head||K.getElementsByTagName("head")[0]||K.documentElement,Q=P.getElementsByTagName("base")[0],R,S;t.request=o;var T=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,U=/\\\\/g,V=t.cache={},W,X={},Y={},Z={},$=s.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};s.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=s.resolve(b[d],a.uri);return c},s.prototype.load=function(){var a=this;if(!(a.status>=$.LOADING)){a.status=$.LOADING;var c=a.resolve();B("load",c);for(var d=a._remain=c.length,e,f=0;d>f;f++)e=s.get(c[f]),e.status<$.LOADED?e._waitings[a.uri]=(e._waitings[a.uri]||0)+1:a._remain--;if(0===a._remain)return a.onload(),b;var g={};for(f=0;d>f;f++)e=V[c[f]],e.status<$.FETCHING?e.fetch(g):e.status===$.SAVED&&e.load();for(var h in g)g.hasOwnProperty(h)&&g[h]()}},s.prototype.onload=function(){var a=this;a.status=$.LOADED,a.callback&&a.callback();var b=a._waitings,c,d;for(c in b)b.hasOwnProperty(c)&&(d=V[c],d._remain-=b[c],0===d._remain&&d.onload());delete a._waitings,delete a._remain},s.prototype.fetch=function(a){function c(){t.request(g.requestUri,g.onRequest,g.charset)}function d(){delete X[h],Y[h]=!0,W&&(s.save(f,W),W=null);var a,b=Z[h];for(delete Z[h];a=b.shift();)a.load()}var e=this,f=e.uri;e.status=$.FETCHING;var g={uri:f};B("fetch",g);var h=g.requestUri||f;return!h||Y[h]?(e.load(),b):X[h]?(Z[h].push(e),b):(X[h]=!0,Z[h]=[e],B("request",g={uri:f,requestUri:h,onRequest:d,charset:u.charset}),g.requested||(a?a[g.requestUri]=c:c()),b)},s.prototype.exec=function(){function a(b){return s.get(a.resolve(b)).exec()}var c=this;if(c.status>=$.EXECUTING)return c.exports;c.status=$.EXECUTING;var e=c.uri;a.resolve=function(a){return s.resolve(a,e)},a.async=function(b,c){return s.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=y(f)?f(a,c.exports={},c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=$.EXECUTED,B("exec",c),g},s.resolve=function(a,b){var c={id:a,refUri:b};return B("resolve",c),c.uri||t.resolve(c.id,b)},s.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,x(a)?(c=a,a=b):c=b),!x(c)&&y(d)&&(c=r(""+d));var f={id:a,uri:s.resolve(a),deps:c,factory:d};if(!f.uri&&K.attachEvent){var g=q();g&&(f.uri=g.src)}B("define",f),f.uri?s.save(f.uri,f):W=f},s.save=function(a,b){var c=s.get(a);c.status<$.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=$.SAVED,B("save",c))},s.get=function(a,b){return V[a]||(V[a]=new s(a,b))},s.use=function(b,c,d){var e=s.get(d,x(b)?b:[b]);e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=V[d[f]].exec();c&&c.apply(a,b),delete e.callback},e.load()},t.use=function(a,b){return s.use(a,b,u.cwd+"_use_"+d()),t},s.define.cmd={},a.define=s.define,t.Module=s,u.fetchedList=Y,u.cid=d,t.require=function(a){var b=s.get(s.resolve(a));return b.status<$.EXECUTING&&(b.onload(),b.exec()),b.exports},u.base=O,u.dir=O,u.cwd=L,u.charset="utf-8",t.config=function(a){for(var b in a){var c=a[b],d=u[b];if(d&&v(d))for(var e in c)d[e]=c[e];else x(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),u[b]=c}return B("config",a),t}}}(this);

(function(){
    /**
     * The Sea.js plugin for loading text resources such as template, json etc
     */

    var global = window
    var plugins = {}
    var uriCache = {}

    function register(o) {
        plugins[o.name] = o
    }

// normal text
    register({
        name: "text",

        ext: [".tpl", ".html"],

        exec: function(uri, content) {
            globalEval('define("' + uri + '#", [], "' + jsEscape(content) + '")')
        }
    })

// json
    register({
        name: "json",

        ext: [".json"],

        exec: function(uri, content) {
            globalEval('define("' + uri + '#", [], ' + content + ')')
        }
    })

// for handlebars template
    register({
        name: "handlebars",

        ext: [".handlebars"],

        exec: function(uri, content) {
            var code = [
                    'define("' + uri + '#", ["handlebars"], function(require, exports, module) {',
                    '  var source = "' + jsEscape(content) + '"',
                '  var Handlebars = require("handlebars")["default"]',
                '  module.exports = function(data, options) {',
                '    options || (options = {})',
                '    options.helpers || (options.helpers = {})',
                '    for (var key in Handlebars.helpers) {',
                '      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]',
                '    }',
                '    return Handlebars.compile(source)(data, options)',
                '  }',
                '})'
            ].join('\n')

            globalEval(code)
        }
    })


    seajs.on("resolve", function(data) {
        var id = data.id
        if (!id) return ""

        var pluginName
        var m

        // text!path/to/some.xx
        if ((m = id.match(/^(\w+)!(.+)$/)) && isPlugin(m[1])) {
            pluginName = m[1]
            id = m[2]
        }
        // http://path/to/a.tpl
        // http://path/to/c.json?v2
        else if ((m = id.match(/[^?]+(\.\w+)(?:\?|#|$)/))) {
            pluginName = getPluginName(m[1])
        }

        if (pluginName && id.indexOf("#") === -1) {
            id += "#"
        }

        var uri = seajs.resolve(id, data.refUri)

        if (pluginName) {
            uriCache[uri] = pluginName
        }

        data.uri = uri
    })

    seajs.on("request", function(data) {
        var name = uriCache[data.uri]

        if (name) {
            xhr(data.requestUri, function(content) {
                plugins[name].exec(data.uri, content)
                data.onRequest()
            })

            data.requested = true
        }
    })


// Helpers

    function isPlugin(name) {
        return name && plugins.hasOwnProperty(name)
    }

    function getPluginName(ext) {
        for (var k in plugins) {
            if (isPlugin(k)) {
                var exts = "," + plugins[k].ext.join(",") + ","
                if (exts.indexOf("," + ext + ",") > -1) {
                    return k
                }
            }
        }
    }

    function xhr(url, callback) {
        var r = global.XMLHttpRequest ?
            new global.XMLHttpRequest() :
            new global.ActiveXObject("Microsoft.XMLHTTP")

        r.open("GET", url, true)

        r.onreadystatechange = function() {
            if (r.readyState === 4) {
                // Support local file
                if (r.status > 399 && r.status < 600) {
                    throw new Error("Could not load: " + url + ", status = " + r.status)
                }
                else {
                    callback(r.responseText)
                }
            }
        }

        return r.send(null)
    }

    function globalEval(content) {
        if (content && /\S/.test(content)) {
            (global.execScript || function(content) {
                (global.eval || eval).call(global, content)
            })(content)
        }
    }

    function jsEscape(content) {
        return content.replace(/(["\\])/g, "\\$1")
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r")
            .replace(/[\u2028]/g, "\\u2028")
            .replace(/[\u2029]/g, "\\u2029")
    }

    function pure(uri) {
        // Remove timestamp etc
        return uri.replace(/\?.*$/, "")
    }

    define("seajs/seajs-text/1.1.1/seajs-text-debug", [], {});
})();
(function () {
  var _type = {"undefined": "undefined", "number": "number", "boolean": "boolean", "string": "string",
    "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array",
    "[object Date]": "date", "[object Error]": "error", "[object File]": "file", "[object Blob]": "blob"};

  function typeOf(target) {
    return _type[typeof target] || _type[String.prototype.toString.call(target)] || (target ? "object" : "null");
  }

  function lowercase(string) {
    return typeOf(string) === 'string' ? string.toLowerCase() : string;
  }

  function msie() {
    var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
    if (isNaN(msie)) {
      msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
    }
    if (isNaN(msie)) {
      msie = false;
    }
    return msie;
  }

  var msieResult = msie();
  if (msieResult && msieResult < 8) {
    return;
  }
  var AjaxMonitor, Bar, DocumentMonitor, ElementMonitor, ElementTracker, EventLagMonitor, Evented, Events, NoTargetError, RequestIntercept, SOURCE_KEYS, Scaler, SocketRequestTracker, XHRRequestTracker, animation, avgAmplitude, bar, cancelAnimation, cancelAnimationFrame, defaultOptions, extend, extendNative, getFromDOM, getIntercept, handlePushState, ignoreStack, init, now, options, requestAnimationFrame, result, runAnimation, scalers, shouldIgnoreURL, shouldTrack, source, sources, uniScaler, _WebSocket, _XDomainRequest, _XMLHttpRequest, _i, _intercept, _len, _pushState, _ref, _ref1, _replaceState,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) {
      for (var key in parent) {
        if (__hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    },
    __indexOf = [].indexOf || function (item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
      }
      return -1;
    };

  defaultOptions = {
    catchupTime: 500,
    initialRate: .03,
    minTime: 500,
    ghostTime: 500,
    maxProgressPerFrame: 10,
    easeFactor: 1.25,
    startOnPageLoad: true,
    restartOnPushState: true,
    restartOnRequestAfter: 500,
    target: 'body',
    elements: {
      checkInterval: 100,
      selectors: ['body']
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ['GET'],
      trackWebSockets: true,
      ignoreURLs: []
    }
  };

  now = function () {
    var _ref;
    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
  };

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  if (requestAnimationFrame == null) {
    requestAnimationFrame = function (fn) {
      return setTimeout(fn, 50);
    };
    cancelAnimationFrame = function (id) {
      return clearTimeout(id);
    };
  }

  runAnimation = function (fn) {
    var last, tick;
    last = now();
    tick = function () {
      var diff;
      diff = now() - last;
      if (diff >= 33) {
        last = now();
        return fn(diff, function () {
          return requestAnimationFrame(tick);
        });
      } else {
        return setTimeout(tick, 33 - diff);
      }
    };
    return tick();
  };

  result = function () {
    var args, key, obj;
    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (typeof obj[key] === 'function') {
      return obj[key].apply(obj, args);
    } else {
      return obj[key];
    }
  };

  extend = function () {
    var key, out, source, sources, val, _i, _len;
    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      if (source) {
        for (key in source) {
          if (!__hasProp.call(source, key)) continue;
          val = source[key];
          if ((out[key] != null) && typeof out[key] === 'object' && (val != null) && typeof val === 'object') {
            extend(out[key], val);
          } else {
            out[key] = val;
          }
        }
      }
    }
    return out;
  };

  avgAmplitude = function (arr) {
    var count, sum, v, _i, _len;
    sum = count = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      v = arr[_i];
      sum += Math.abs(v);
      count++;
    }
    return sum / count;
  };
  getFromDOM = function (key, json) {
    var data, e, el;
    if (key == null) {
      key = 'options';
    }
    if (json == null) {
      json = true;
    }
    if (!document.querySelector){
      return;
    }
    el = document.querySelector("[data-pace-" + key + "]");
    if (!el) {
      return;
    }
    data = el.getAttribute("data-pace-" + key);
    if (!json) {
      return data;
    }
    try {
      return JSON.parse(data);
    } catch (_error) {
      e = _error;
      return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
    }
  };

  Evented = (function () {
    function Evented() {
    }

    Evented.prototype.on = function (event, handler, ctx, once) {
      var _base;
      if (once == null) {
        once = false;
      }
      if (this.bindings == null) {
        this.bindings = {};
      }
      if ((_base = this.bindings)[event] == null) {
        _base[event] = [];
      }
      return this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
    };

    Evented.prototype.once = function (event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    Evented.prototype.off = function (event, handler) {
      var i, _ref, _results;
      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
        return;
      }
      if (handler == null) {
        return delete this.bindings[event];
      } else {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    Evented.prototype.trigger = function () {
      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
          handler.apply(ctx != null ? ctx : this, args);
          if (once) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    return Evented;

  })();

  if (window.Pace == null) {
    window.Pace = {};
  }

  extend(Pace, Evented.prototype);

  options = Pace.options = extend({}, defaultOptions, window.paceOptions, getFromDOM());

  _ref = ['ajax', 'document', 'eventLag', 'elements'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    source = _ref[_i];
    if (options[source] === true) {
      options[source] = defaultOptions[source];
    }
  }

  NoTargetError = (function (_super) {
    __extends(NoTargetError, _super);

    function NoTargetError() {
      _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return NoTargetError;

  })(Error);

  Bar = (function () {
    function Bar() {
      this.progress = 0;
    }

    Bar.prototype.getElement = function () {
      var targetElement;
      if (this.el == null) {
        if (!document.querySelector) {
          return;
        }
        targetElement = document.querySelector(options.target);
        if (!targetElement) {
          throw new NoTargetError;
        }
        this.el = document.createElement('div');
        this.el.className = "pace pace-active";
        document.body.className = document.body.className.replace(/pace-done/g, '');
        document.body.className += ' pace-running';
        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
        if (targetElement.firstChild != null) {
          targetElement.insertBefore(this.el, targetElement.firstChild);
        } else {
          targetElement.appendChild(this.el);
        }
      }
      return this.el;
    };

    Bar.prototype.finish = function () {
      var el;
      el = this.getElement();
      el.className = el.className.replace('pace-active', '');
      el.className += ' pace-inactive';
      document.body.className = document.body.className.replace('pace-running', '');
      return document.body.className += ' pace-done';
    };

    Bar.prototype.update = function (prog) {
      this.progress = prog;
      return this.render();
    };

    Bar.prototype.destroy = function () {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (_error) {
        NoTargetError = _error;
      }
      return this.el = void 0;
    };

    Bar.prototype.render = function () {
      var el, progressStr;
      if (!document.querySelector) {
        return;
      }
      if (document.querySelector(options.target) == null) {
        return false;
      }
      el = this.getElement();
      el.children[0].style.width = "" + this.progress + "%";
      if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
        el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
        if (this.progress >= 100) {
          progressStr = '99';
        } else {
          progressStr = this.progress < 10 ? "0" : "";
          progressStr += this.progress | 0;
        }
        el.children[0].setAttribute('data-progress', "" + progressStr);
      }
      return this.lastRenderedProgress = this.progress;
    };

    Bar.prototype.done = function () {
      return this.progress >= 100;
    };

    return Bar;

  })();

  Events = (function () {
    function Events() {
      this.bindings = {};
    }

    Events.prototype.trigger = function (name, val) {
      var binding, _j, _len1, _ref2, _results;
      if (this.bindings[name] != null) {
        _ref2 = this.bindings[name];
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          binding = _ref2[_j];
          _results.push(binding.call(this, val));
        }
        return _results;
      }
    };

    Events.prototype.on = function (name, fn) {
      var _base;
      if ((_base = this.bindings)[name] == null) {
        _base[name] = [];
      }
      return this.bindings[name].push(fn);
    };

    return Events;

  })();

  _XMLHttpRequest = window.XMLHttpRequest;

  _XDomainRequest = window.XDomainRequest;

  _WebSocket = window.WebSocket;

  extendNative = function (to, from) {
    var e, key, val, _results;
    _results = [];
    for (key in from.prototype) {
      try {
        val = from.prototype[key];
        if ((to[key] == null) && typeof val !== 'function') {
          _results.push(to[key] = val);
        } else {
          _results.push(void 0);
        }
      } catch (_error) {
        e = _error;
      }
    }
    return _results;
  };

  ignoreStack = [];

  Pace.ignore = function () {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('ignore');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  Pace.track = function () {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('track');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  shouldTrack = function (method) {
    var _ref2;
    if (method == null) {
      method = 'GET';
    }
    if (ignoreStack[0] === 'track') {
      return 'force';
    }
    if (!ignoreStack.length && options.ajax) {
      if (method === 'socket' && options.ajax.trackWebSockets) {
        return true;
      } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
        return true;
      }
    }
    return false;
  };

  RequestIntercept = (function (_super) {
    __extends(RequestIntercept, _super);

    function RequestIntercept() {
      var monitorXHR,
        _this = this;
      RequestIntercept.__super__.constructor.apply(this, arguments);
      monitorXHR = function (req) {
        var _open;
        _open = req.open;
        return req.open = function (type, url, async) {
          if (shouldTrack(type)) {
            _this.trigger('request', {
              type: type,
              url: url,
              request: req
            });
          }
          return _open.apply(req, arguments);
        };
      };
      window.XMLHttpRequest = function (flags) {
        var req;
        req = new _XMLHttpRequest(flags);
        monitorXHR(req);
        return req;
      };
      try {
        extendNative(window.XMLHttpRequest, _XMLHttpRequest);
      } catch (_error) {
      }
      if (_XDomainRequest != null) {
        window.XDomainRequest = function () {
          var req;
          req = new _XDomainRequest;
          monitorXHR(req);
          return req;
        };
        try {
          extendNative(window.XDomainRequest, _XDomainRequest);
        } catch (_error) {
        }
      }
      if ((_WebSocket != null) && options.ajax.trackWebSockets) {
        window.WebSocket = function (url, protocols) {
          var req;
          if (protocols != null) {
            req = new _WebSocket(url, protocols);
          } else {
            req = new _WebSocket(url);
          }
          if (shouldTrack('socket')) {
            _this.trigger('request', {
              type: 'socket',
              url: url,
              protocols: protocols,
              request: req
            });
          }
          return req;
        };
        try {
          extendNative(window.WebSocket, _WebSocket);
        } catch (_error) {
        }
      }
    }

    return RequestIntercept;

  })(Events);

  _intercept = null;

  getIntercept = function () {
    if (_intercept == null) {
      _intercept = new RequestIntercept;
    }
    return _intercept;
  };

  shouldIgnoreURL = function (url) {
    var pattern, _j, _len1, _ref2;
    _ref2 = options.ajax.ignoreURLs;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      pattern = _ref2[_j];
      if (typeof pattern === 'string') {
        if (url.indexOf(pattern) !== -1) {
          return true;
        }
      } else {
        if (pattern.test(url)) {
          return true;
        }
      }
    }
    return false;
  };

  getIntercept().on('request', function (_arg) {
    var after, args, request, type, url;
    type = _arg.type, request = _arg.request, url = _arg.url;
    if (shouldIgnoreURL(url)) {
      return;
    }
    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
      args = arguments;
      after = options.restartOnRequestAfter || 0;
      if (typeof after === 'boolean') {
        after = 0;
      }
      return setTimeout(function () {
        var stillActive, _j, _len1, _ref2, _ref3, _results;
        if (type === 'socket') {
          stillActive = request.readyState < 2;
        } else {
          stillActive = (0 < (_ref2 = request.readyState) && _ref2 < 4);
        }
        if (stillActive) {
          Pace.restart();
          _ref3 = Pace.sources;
          _results = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            source = _ref3[_j];
            if (source instanceof AjaxMonitor) {
              source.watch.apply(source, args);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      }, after);
    }
  });

  AjaxMonitor = (function () {
    function AjaxMonitor() {
      var _this = this;
      this.elements = [];
      getIntercept().on('request', function () {
        return _this.watch.apply(_this, arguments);
      });
    }

    AjaxMonitor.prototype.watch = function (_arg) {
      var request, tracker, type, url;
      type = _arg.type, request = _arg.request, url = _arg.url;
      if (shouldIgnoreURL(url)) {
        return;
      }
      if (type === 'socket') {
        tracker = new SocketRequestTracker(request);
      } else {
        tracker = new XHRRequestTracker(request);
      }
      return this.elements.push(tracker);
    };

    return AjaxMonitor;

  })();

  XHRRequestTracker = (function () {
    function XHRRequestTracker(request) {
      var event, size, _j, _len1, _onreadystatechange, _ref2,
        _this = this;
      this.progress = 0;
      if (window.ProgressEvent != null) {
        size = null;
        request.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            return _this.progress = 100 * evt.loaded / evt.total;
          } else {
            return _this.progress = _this.progress + (100 - _this.progress) / 2;
          }
        });
        _ref2 = ['load', 'abort', 'timeout', 'error'];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          event = _ref2[_j];
          request.addEventListener(event, function () {
            return _this.progress = 100;
          });
        }
      } else {
        _onreadystatechange = request.onreadystatechange;
        request.onreadystatechange = function () {
          var _ref3;
          if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
            _this.progress = 100;
          } else if (request.readyState === 3) {
            _this.progress = 50;
          }
          return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
        };
      }
    }

    return XHRRequestTracker;

  })();

  SocketRequestTracker = (function () {
    function SocketRequestTracker(request) {
      var event, _j, _len1, _ref2,
        _this = this;
      this.progress = 0;
      _ref2 = ['error', 'open'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        event = _ref2[_j];
        request.addEventListener(event, function () {
          return _this.progress = 100;
        });
      }
    }

    return SocketRequestTracker;

  })();

  ElementMonitor = (function () {
    function ElementMonitor(options) {
      var selector, _j, _len1, _ref2;
      if (options == null) {
        options = {};
      }
      this.elements = [];
      if (options.selectors == null) {
        options.selectors = [];
      }
      _ref2 = options.selectors;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        selector = _ref2[_j];
        this.elements.push(new ElementTracker(selector));
      }
    }

    return ElementMonitor;

  })();

  ElementTracker = (function () {
    function ElementTracker(selector) {
      this.selector = selector;
      this.progress = 0;
      this.check();
    }

    ElementTracker.prototype.check = function () {
      var _this = this;
      if (!document.querySelector) {
        return;
      }
      if (document.querySelector(this.selector)) {
        return this.done();
      } else {
        return setTimeout((function () {
          return _this.check();
        }), options.elements.checkInterval);
      }
    };

    ElementTracker.prototype.done = function () {
      return this.progress = 100;
    };

    return ElementTracker;

  })();

  DocumentMonitor = (function () {
    DocumentMonitor.prototype.states = {
      loading: 0,
      interactive: 50,
      complete: 100
    };

    function DocumentMonitor() {
      var _onreadystatechange, _ref2,
        _this = this;
      this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
      _onreadystatechange = document.onreadystatechange;
      document.onreadystatechange = function () {
        if (_this.states[document.readyState] != null) {
          _this.progress = _this.states[document.readyState];
        }
        return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
      };
    }

    return DocumentMonitor;

  })();

  EventLagMonitor = (function () {
    function EventLagMonitor() {
      var avg, interval, last, points, samples,
        _this = this;
      this.progress = 0;
      avg = 0;
      samples = [];
      points = 0;
      last = now();
      interval = setInterval(function () {
        var diff;
        diff = now() - last - 50;
        last = now();
        samples.push(diff);
        if (samples.length > options.eventLag.sampleCount) {
          samples.shift();
        }
        avg = avgAmplitude(samples);
        if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
          _this.progress = 100;
          return clearInterval(interval);
        } else {
          return _this.progress = 100 * (3 / (avg + 3));
        }
      }, 50);
    }

    return EventLagMonitor;

  })();

  Scaler = (function () {
    function Scaler(source) {
      this.source = source;
      this.last = this.sinceLastUpdate = 0;
      this.rate = options.initialRate;
      this.catchup = 0;
      this.progress = this.lastProgress = 0;
      if (this.source != null) {
        this.progress = result(this.source, 'progress');
      }
    }

    Scaler.prototype.tick = function (frameTime, val) {
      var scaling;
      if (val == null) {
        val = result(this.source, 'progress');
      }
      if (val >= 100) {
        this.done = true;
      }
      if (val === this.last) {
        this.sinceLastUpdate += frameTime;
      } else {
        if (this.sinceLastUpdate) {
          this.rate = (val - this.last) / this.sinceLastUpdate;
        }
        this.catchup = (val - this.progress) / options.catchupTime;
        this.sinceLastUpdate = 0;
        this.last = val;
      }
      if (val > this.progress) {
        this.progress += this.catchup * frameTime;
      }
      scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
      this.progress += scaling * this.rate * frameTime;
      this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
      this.progress = Math.max(0, this.progress);
      this.progress = Math.min(100, this.progress);
      this.lastProgress = this.progress;
      return this.progress;
    };

    return Scaler;

  })();

  sources = null;

  scalers = null;

  bar = null;

  uniScaler = null;

  animation = null;

  cancelAnimation = null;

  Pace.running = false;

  handlePushState = function () {
    if (options.restartOnPushState) {
      return Pace.restart();
    }
  };

  if (window.history.pushState != null) {
    _pushState = window.history.pushState;
    window.history.pushState = function () {
      handlePushState();
      return _pushState.apply(window.history, arguments);
    };
  }

  if (window.history.replaceState != null) {
    _replaceState = window.history.replaceState;
    window.history.replaceState = function () {
      handlePushState();
      return _replaceState.apply(window.history, arguments);
    };
  }

  SOURCE_KEYS = {
    ajax: AjaxMonitor,
    elements: ElementMonitor,
    document: DocumentMonitor,
    eventLag: EventLagMonitor
  };

  (init = function () {
    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
    Pace.sources = sources = [];
    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      type = _ref2[_j];
      if (options[type] !== false) {
        sources.push(new SOURCE_KEYS[type](options[type]));
      }
    }
    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
      source = _ref4[_k];
      sources.push(new source(options));
    }
    Pace.bar = bar = new Bar;
    scalers = [];
    return uniScaler = new Scaler;
  })();

  Pace.stop = function () {
    Pace.trigger('stop');
    Pace.running = false;
    bar.destroy();
    cancelAnimation = true;
    if (animation != null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(animation);
      }
      animation = null;
    }
    return init();
  };

  Pace.restart = function () {
    Pace.trigger('restart');
    Pace.stop();
    return Pace.start();
  };

  Pace.go = function () {
    var start;
    Pace.running = true;
    bar.render();
    start = now();
    cancelAnimation = false;
    return animation = runAnimation(function (frameTime, enqueueNextFrame) {
      var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
      remaining = 100 - bar.progress;
      count = sum = 0;
      done = true;
      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
        source = sources[i];
        scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
        elements = (_ref2 = source.elements) != null ? _ref2 : [source];
        for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
          element = elements[j];
          scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
          done &= scaler.done;
          if (scaler.done) {
            continue;
          }
          count++;
          sum += scaler.tick(frameTime);
        }
      }
      avg = sum / count;
      bar.update(uniScaler.tick(frameTime, avg));
      if (bar.done() || done || cancelAnimation) {
        bar.update(100);
        Pace.trigger('done');
        return setTimeout(function () {
          bar.finish();
          Pace.running = false;
          return Pace.trigger('hide');
        }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
      } else {
        return enqueueNextFrame();
      }
    });
  };

  Pace.start = function (_options) {
    extend(options, _options);
    Pace.running = true;
    if (!document.querySelector)
      return;
    try {
      bar.render();
    } catch (_error) {
      NoTargetError = _error;
    }
    if (!document.querySelector('.pace')) {
      return setTimeout(Pace.start, 50);
    } else {
      Pace.trigger('start');
      return Pace.go();
    }
  };

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Pace;
    });
  } else if (typeof exports === 'object') {
    module.exports = Pace;
  } else {
    if (options.startOnPageLoad) {
      Pace.start();
    }
  }

}).call(this);

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */
(function(){function j(a,c){return[].slice.call((c||document).querySelectorAll(a))}if(window.addEventListener){var g=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(c){return}var i=a.href||a.getAttribute("data-href"),f=i.replace(/[^\/]+$/,""),j=(/^[a-z]{3,10}:/.exec(f)||[""])[0],k=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(f)||[""])[0],h=/^([^?]*)\??/.exec(i)[1],n=a.parentNode,e=new XMLHttpRequest,b;e.onreadystatechange=function(){4===e.readyState&&
b()};b=function(){var c=e.responseText;if(c&&a.parentNode&&(!e.status||400>e.status||600<e.status)){c=g.fix(c,!0,a);if(f)var c=c.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(a,c,b){return/^([a-z]{3,10}:|#)/i.test(b)?a:/^\/\//.test(b)?'url("'+j+b+'")':/^\//.test(b)?'url("'+k+b+'")':/^\?/.test(b)?'url("'+h+b+'")':'url("'+f+b+'")'}),b=f.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),c=c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+b,"gi"),"$1");b=document.createElement("style");b.textContent=
c;b.media=a.media;b.disabled=a.disabled;b.setAttribute("data-href",a.getAttribute("href"));n.insertBefore(b,a);n.removeChild(a);b.media=a.media}};try{e.open("GET",i),e.send(null)}catch(r){"undefined"!=typeof XDomainRequest&&(e=new XDomainRequest,e.onerror=e.onprogress=function(){},e.onload=b,e.open("GET",i),e.send(null))}a.setAttribute("data-inprogress","")},styleElement:function(a){if(!a.hasAttribute("data-noprefix")){var c=a.disabled;a.textContent=g.fix(a.textContent,!0,a);a.disabled=c}},styleAttribute:function(a){var c=
a.getAttribute("style"),c=g.fix(c,!1,a);a.setAttribute("style",c)},process:function(){j('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);j("style").forEach(StyleFix.styleElement);j("[style]").forEach(StyleFix.styleAttribute)},register:function(a,c){(g.fixers=g.fixers||[]).splice(void 0===c?g.fixers.length:c,0,a)},fix:function(a,c,i){for(var f=0;f<g.fixers.length;f++)a=g.fixers[f](a,c,i)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,g){return g.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};setTimeout(function(){j('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)}})();
(function(j){function g(d,b,c,e,f){d=a[d];d.length&&(d=RegExp(b+"("+d.join("|")+")"+c,"gi"),f=f.replace(d,e));return f}if(window.StyleFix&&window.getComputedStyle){var a=window.PrefixFree={prefixCSS:function(d,b){var c=a.prefix;-1<a.functions.indexOf("linear-gradient")&&(d=d.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(a,d,b,c){return d+(b||"")+"linear-gradient("+(90-c)+"deg"}));d=g("functions","(\\s|:|,)","\\s*\\(","$1"+c+"$2(",d);d=g("keywords","(\\s|:)","(\\s|;|\\}|$)",
"$1"+c+"$2$3",d);d=g("properties","(^|\\{|\\s|;)","\\s*:","$1"+c+"$2:",d);if(a.properties.length)var e=RegExp("\\b("+a.properties.join("|")+")(?!:)","gi"),d=g("valueProperties","\\b",":(.+?);",function(a){return a.replace(e,c+"$1")},d);b&&(d=g("selectors","","\\b",a.prefixSelector,d),d=g("atrules","@","\\b","@"+c+"$1",d));d=d.replace(RegExp("-"+c,"g"),"-");return d=d.replace(/-\*-(?=[a-z]+)/gi,a.prefix)},property:function(d){return(a.properties.indexOf(d)?a.prefix:"")+d},value:function(d){d=g("functions",
"(^|\\s|,)","\\s*\\(","$1"+a.prefix+"$2(",d);return d=g("keywords","(^|\\s)","(\\s|$)","$1"+a.prefix+"$2$3",d)},prefixSelector:function(d){return d.replace(/^:{1,2}/,function(d){return d+a.prefix})},prefixProperty:function(d,b){var c=a.prefix+d;return b?StyleFix.camelCase(c):c}},c={},i=[],f=getComputedStyle(document.documentElement,null),p=document.createElement("div").style,k=function(a){if("-"===a.charAt(0)){i.push(a);var a=a.split("-"),b=a[1];for(c[b]=++c[b]||1;3<a.length;)a.pop(),b=a.join("-"),
StyleFix.camelCase(b)in p&&-1===i.indexOf(b)&&i.push(b)}};if(0<f.length)for(var h=0;h<f.length;h++)k(f[h]);else for(var n in f)k(StyleFix.deCamelCase(n));var h=0,e,b;for(b in c)f=c[b],h<f&&(e=b,h=f);a.prefix="-"+e+"-";a.Prefix=StyleFix.camelCase(a.prefix);a.properties=[];for(h=0;h<i.length;h++)n=i[h],0===n.indexOf(a.prefix)&&(e=n.slice(a.prefix.length),StyleFix.camelCase(e)in p||a.properties.push(e));"Ms"==a.Prefix&&(!("transform"in p)&&!("MsTransform"in p)&&"msTransform"in p)&&a.properties.push("transform",
"transform-origin");a.properties.sort();e=function(a,b){r[b]="";r[b]=a;return!!r[b]};b={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};b["repeating-linear-gradient"]=b["repeating-radial-gradient"]=b["radial-gradient"]=b["linear-gradient"];h={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",
flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display"};a.functions=[];a.keywords=[];var r=document.createElement("div").style,l;for(l in b)k=b[l],f=k.property,k=l+"("+k.params+")",!e(k,f)&&e(a.prefix+k,f)&&a.functions.push(l);for(var m in h)f=h[m],!e(m,f)&&e(a.prefix+m,f)&&a.keywords.push(m);l=function(a){s.textContent=a+"{}";return!!s.sheet.cssRules.length};m={":read-only":null,":read-write":null,":any-link":null,"::selection":null};e={keyframes:"name",viewport:null,
document:'regexp(".")'};a.selectors=[];a.atrules=[];var s=j.appendChild(document.createElement("style")),q;for(q in m)b=q+(m[q]?"("+m[q]+")":""),!l(b)&&l(a.prefixSelector(b))&&a.selectors.push(q);for(var t in e)b=t+" "+(e[t]||""),!l("@"+b)&&l("@"+a.prefix+b)&&a.atrules.push(t);j.removeChild(s);a.valueProperties=["transition","transition-property"];j.className+=" "+a.prefix;StyleFix.register(a.prefixCSS)}})(document.documentElement);
/*! JSON v3.3.1 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the objectgs prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

/**
 * 工具类库.
 *
 * @description 修改urlParsingNode变量 on 14/7/29
 * @class Est - 工具类库
 * @constructor Est
 */
;
(function () {
  'use strict';
  var root = this;
  /**
   * @description 系统原型方法
   * @method [变量] - slice push toString hasOwnProperty concat
   */
  var slice = Array.prototype.slice, push = Array.prototype.push, toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty, concat = Array.prototype.concat;
  /**
   * @description ECMAScript 5 原生方法
   * @method [变量] - nativeIsArray nativeKeys nativeBind
   */
  var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = Object.prototype.bind;
  var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
        \u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  var uid = ['0', '0', '0'];
  var url = window.location.href;
  var urlParsingNode = null;
  /**
   * @description define
   * @method [变量] - moduleMap
   */
  var moduleMap = {};
  var fileMap = {};
  var noop = function () {
  };
  /**
   * @description  定义数组和对象的缓存池
   * @method [变量] - maxPoolSize arrayPool objectPool
   */
  var maxPoolSize = 40;
  var arrayPool = [], objectPool = [];
  /**
   * @method [变量] - cache
   * 缓存对象 */
  var cache = {};
  /**
   * @method [变量] - routes
   * url 路由 */
  var routes = {};
  var el = null, current = null;

  /**
   * @description 创建Est对象
   * @method [对象] - Est
   */
  var Est = function (value) {
    return (value && typeof value == 'object' &&
      typeOf(value) !== 'array' && hasOwnProperty.call(value, '_wrapped')) ? value :
      new Wrapper(value);
  };

  function Wrapper(value, chainAll) {
    this._chain = !!chainAll;
    this._wrapped = value;
  }

  Est.version = '0605041705'; // 机汇网
  //Est.version = '00111114'; // 上门网
  /**
   * @description 用于node.js 导出
   * @method [模块] - exports
   */
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Est;
    }
    exports.Est = Est;
  } else {
    root.Est = Est;
  }
  function identity(value) {
    return value;
  }

  Est.identity = identity;
  var matchCallback = function (value, context, argCount) {
    if (value == null) return Est.identity;
    ;
    if (Est.isFunction(value)) return createCallback(value, context, argCount);
    if (typeOf(value) === 'object') return matches(value);
    if (typeOf(value) === 'array') return value;
    return property(value);
  };
  var createCallback = function (func, context, argCount) {
    if (!context) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }
    return function () {
      return func.apply(this, arguments);
    };
  };

  /**
   * @description 遍历数据或对象。如果传递了context参数，则把callback绑定到context对象上。
   * 如果list是数组，callback的参数是：(element, index, list, first, last)。
   * 如果list是个JavaScript对象，callback的参数是 (value, key, list, index, first, last))。返回list以方便链式调用。
   * 如果callback 返回false,则中止遍历
   * @method [数组] - each
   * @param {Array/Object} obj 遍历对象
   * @param {Function} callback 回调函数
   * @param {Object} context 上下文
   * @return {Object}
   * @example
   *     Est.each([1, 2, 3], alert); => alerts each number in turn...
   *     Est.each({one: 1, two: 2, three: 3}, alert); => alerts each number value in turn...
   */
  function each(obj, callback, context) {
    var i, length, first = false, last = false;
    if (obj == null) return obj;
    callback = createCallback(callback, context);
    if (obj.length === +obj.length) {
      for (i = 0, length = obj.length; i < length; i++) {
        first = i === 0 ? true : false;
        last = i === length - 1 ? true : false;
        if (callback(obj[i], i, obj, first, last) === false) break;
      }
    } else {
      var ks = keys(obj);
      for (i = 0, length = ks.length; i < length; i++) {
        first = i === 0 ? true : false;
        last = i === ks.length - 1 ? true : false;
        if (callback(obj[ks[i]], ks[i], obj, i, first, last) === false) break;
      }
    }
    return obj;
  };
  Est.each = Est.forEach = each;
  /**
   * @description 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象.
   * 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
   * @method [对象] - extend
   * @param {Object} obj destination对象
   * @return {Object} 返回 destination 对象
   * @author wyj on 14/5/22
   * @example
   *      Est.extend({name: 'moe'}, {age: 50}); => {name: 'moe', age: 50}
   */
  Est.extend = function (obj) {
    var h = obj.$$hashKey;
    if (typeOf(obj) !== 'object') return obj;
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    setHashKey(obj, h);
    return obj;
  };

  if (typeof /./ !== 'function') {
    /**
     * @description 如果object是一个参数对象，返回true
     * @method [对象] - isFunction
     * @param {*} obj 待检测参数
     * @return {boolean}
     * @author wyj on 14/5/22
     * @example
     *      Est.isFunction(alert); => true
     */
    Est.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  }
  /**
   * @description 返回一个对象里所有的方法名, 而且是已经排序的 — 也就是说, 对象里每个方法(属性值是一个函数)的名称.
   * @method [对象] - functions
   * @param {Object} obj 检测对象
   * @return {Array} 返回包含方法数组
   * @author wyj on 14/5/22
   * @example
   *      Est.functions(Est); => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
   */
  Est.functions = Est.methods = function (obj) {
    var names = [];
    for (var key in obj) {
      if (Est.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  /**
   * 解码ASCII码
   * @method fromCharCode
   * @param code
   * @return {string}
   * @author wyj 15.2.9
   */
  Est.fromCharCode = function (code) {
    try {
      return String.fromCharCode(code);
    } catch (e) {
    }
  }
  /**
   * @description 返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
   * @method [对象] - chain
   * @param value
   * @return {*}
   * @author wyj on 14/5/22
   * @example
   *      var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
   *      var youngest = Est.chain(stooges)
   *          .sortBy(function(stooge){ return stooge.age; })
   *          .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
   *          .first()
   *          .value();
   *      => "moe is 21"
   */
  Est.chain = function (value) {
    value = new Wrapper(value);
    value._chain = true;
    return value;
  };
  /**
   * @description 如果对象 object 中的属性 property 是函数, 则调用它, 否则, 返回它。
   * @method [对象] - result
   * @param obj
   * @return {*}
   * @author wyj on 14/5/22
   * @example
   *      var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
   *      Est.result(object, 'cheese'); => "crumpets"
   *      Est.result(object, 'stuff'); => "nonsense"
   */
  var result = function (obj, context) {
    //var ctx = typeOf(context) !== 'undefined' ? context : Est;
    return this._chain ? new Wrapper(obj, true) : obj;
  };
  // ObjectUtils
  /**
   * @description [1]检测数据类型 [undefined][number][string][function][regexp][array][date][error]
   * @method [对象] - typeOf
   * @param {*} target 检测对象
   * @return {*|string}
   * @author wyj on 14/5/24
   * @example
   *      Est.typeOf(Est); => 'object'
   */
  var _type = {"undefined": "undefined", "number": "number", "boolean": "boolean", "string": "string",
    "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array",
    "[object Date]": "date", "[object Error]": "error", "[object File]": "file", "[object Blob]": "blob"};

  function typeOf(target) {
    return _type[typeof target] || _type[toString.call(target)] || (target ? "object" : "null");
  }

  Est.typeOf = typeOf;
  /**
   * @description 检测数据类型2 此版本 new Number(4) new String("abc") new Boolean(true) new ReferenceError()
   * 分别生成 Number String Boolean Error
   * @method [对象] - getType
   * @param {object} value
   * @return {String}
   * @author wyj on 14/8/5
   * @example
   *    var results = [];
   var fn = Est.getType;
   results.push(fn({a: 4})); // "Object"
   results.push(fn([1, 2, 3])); // "Array"
   (function() { results.push(fn(arguments));}()); // "Argements"
   results.push(fn(new ReferenceError())); // "Error"
   results.push(fn(new Date())); // "Date"
   results.push(fn(/a-z/)); // "RegExp"
   results.push(fn(Math)); // "Math"
   results.push(fn(JSON)); // "JSON"
   results.push(fn(new Number(4))); // "Number"
   results.push(fn(new String("abc"))); // "String"
   results.push(fn(new Boolean(true))); // "Boolean"
   results.push(fn(null)); // "null"
   => [ "Object", "Array", "Arguments", "Error", "Date", "RegExp", "Math", "JSON", "Number", "String", "Boolean", "null" ]
   */
  function getType(value) {
    if (value === null) return "null";
    var t = typeof value;
    switch (t) {
      case "function":
      case "object":
        if (value.constructor) {
          if (value.constructor.name) {
            return value.constructor.name;
          } else {
            // /^function\s+([$_a-zA-Z][_$a-zA-Z0-9]*)\s*\(/
            // /^\s*function[ \n\r\t]+\w/;
            var match = value.constructor.toString().match(/^function (.+)\(.*$/);
            if (match) return match[1];
          }
        }
        return toString.call(value).match(/^\[object (.+)\]$/)[1];
      default:
        return t;
    }
  }

  Est.getType = getType;

  /**
   * @description 根据字段获取值
   * @method [对象] - getValue
   * @param object
   * @param path
   * @return {*}
   * @author wyj 14.12.4
   * @example
   *    var result = Est.getValue(object, 'item.name');
   */
  function getValue(object, path) {
    var array, result;
    if (arguments.length < 2 || typeOf(path) !== 'string') {
      console.error('参数不能少于2个， 且path为字符串');
      return;
    }
    array = path.split('.');
    function get(object, array) {
      each(array, function (key) {
        if (key in object) {
          if (array.length === 1) {
            // 如果为数组最后一个元素， 则返回值
            result = object[key]
          } else {
            // 否则去除数组第一个， 递归调用get方法
            array.shift();
            get(object[key], array);
            // 同样跳出循环
            return false;
          }
        } else {
          // 没找到直接跳出循环
          return false;
        }
      });
      return result;
    }

    return get(object, array);
    /*var array = [];
     var temp = cloneDeep(object);
     if (typeOf(path) === 'string'){
     array = path.split('.');
     each(array, function(key){
     temp = temp[key];
     });
     } else if (typeOf(path) === 'function'){
     path.call(this, object);
     }
     return temp;*/
  }

  Est.getValue = getValue;

  /**
   * @description 设置对象值
   *
   * @method [对象] - setValue
   * @param object
   * @param path
   * @param value
   * @return {boolean}
   * @author wyj 14.12.4
   * @example
   *    Est.setValue(object, 'item.name', 'bbb');
   */
  function setValue(object, path, value) {
    if (arguments.length < 3 || typeOf(path) !== 'string') return false;
    var array = path.split('.');

    function set(object, array, value) {
      each(array, function (key) {
        if (!(key in object)) {
          object[key] = {};
        }
        if (array.length === 1) {
          object[key] = value;
        } else {
          array.shift();
          set(object[key], array, value);
          return false;
        }
      });
    }

    set(object, array, value);

  }

  Est.setValue = setValue;

  /**
   * javascript 对象转换成path路径
   * @method [对象] - objToPath
   * @return {Object}
   * @author wyj 15.1.28
   * @example
   *        Est.objToPath({a: {b: 'c'}}); ===> {'a.b': 'c'}
   */
  function objToPath(obj) {
    var ret = {}, separator = '.';
    for (var key in obj) {
      var val = obj[key];
      if (val && (val.constructor === Object || val.constructor === Array) && !isEmpty(val)) {
        var obj2 = objToPath(val);
        for (var key2 in obj2) {
          var val2 = obj2[key2];
          ret[key + separator + key2] = val2;
        }
      } else {
        ret[key] = val;
      }
    }
    return ret;
  }

  Est.objToPath = objToPath;

  /**
   * @description 判断是否为空 (空数组， 空对象， 空字符串， 空方法， 空参数, null, undefined) 不包括数字0和1
   * @method [对象] - isEmpty
   * @param {Object} value
   * @return {boolean}
   * @author wyj on 14/6/26
   * @example
   *      Est.isEmpty(value); => false
   */
  function isEmpty(value) {
    var result = true;
    if (typeOf(value) === 'number') return false;
    if (!value) return result;
    var className = toString.call(value),
      length = value.length;
    if ((className == '[object Array]' || className == '[object String]' || className == '[object Arguments]' ) ||
      (className == '[object Object]' && typeof length == 'number' && Est.isFunction(value.splice))) {
      return !length;
    }
    each(value, function () {
      return (result = false);
    });
    return result;
  }

  Est.isEmpty = isEmpty;
  /**
   * @description 返回值函数
   * @method [对象] - valueFn
   * @param value
   * @return {Function}
   * @author wyj on 14/6/26
   * @example
   *
   */
  function valueFn(value) {
    return function () {
      return value;
    };
  }

  Est.valueFn = valueFn;
  /**
   * @description 反转key value  用于forEach
   * @method [对象] - reverseParams
   * @param {Function} iteratorFn
   * @return {Function}
   * @author wyj on 14/6/26
   * @example
   */
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }

  Est.reverseParams = reverseParams;
  /**
   * @description [2]判断对象是否含有某个键 不是原型对象
   * @method [对象] - hasKey
   * @param {Object} obj 检测对象
   * @param {Sting} key 检测键
   * @return {boolean|*}
   * @author wyj on 14/5/25
   * @example
   *      var object6 = {name:1,sort:1};
   *      Est.hasKey(object6, 'name') => true
   */
  function hasKey(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  Est.hasKey = hasKey;
  /**
   * @description 计算hash值
   * @method [对象] - hashKey
   * @param obj
   * @return {string}
   * @author wyj on 14/6/25
   * @example
   *      var value = Est.hashKey(obj); => 'object:001'
   */
  function hashKey(obj) {
    var objType = typeof obj, key;
    if (objType == 'object' && obj !== null) {
      if (typeof (key = obj.$$hashKey) == 'function') {
        key = obj.$$hashKey();
      } else if (key === undefined) {
        key = obj.$$hashKey = nextUid();
      }
    } else {
      key = obj;
    }
    return objType + ':' + key;
  }

  Est.hashKey = hashKey;
  /**
   * @description 设置hashKey
   * @method [对象] - setHashKey
   * @param {Object} obj
   * @param {String} h
   */
  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    }
    else {
      delete obj.$$hashKey;
    }
  }

  Est.setHashKey = setHashKey;
  /**
   * @description [3]过滤对象字段
   * @method [对象] - pick
   * @param {Object} obj 过滤对象
   * @param {Function} callback 回调函数
   * @param context
   * @return {{}}
   * @author wyj on 14/5/26
   * @example
   *      var object3 = {name:'a', sort: '1', sId: '000002'};
   *      Est.pick(object3, ['name','sort']) =>
   *      {"name":"a","sort":"1"}
   */
  function pick(obj, callback, context) {
    var result = {}, key;
    if (typeOf(callback) === 'function') {
      for (key in obj) {
        var value = obj[key];
        if (callback.call(context, value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      each(keys, function (key) {
        if (key in obj) result[key] = obj[key];
      });
    }
    return result;
  }

  Est.pick = pick;
  /**
   * @description 返回获取对象属性值的方法
   * @method [对象] - property
   * @param {Object} key
   * @return {Function}
   */
  function property(key) {
    return function (object) {
      return object[key];
    };
  }

  Est.property = property;
  /**
   * @description 翠取对象中key对应的值
   * @method [对象] - pluck
   * @param obj
   * @param key
   * @return {*}
   * @author wyj on 14/7/5
   * @example
   *      var characters = [ { 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 } ];
   *      var result = Est.pluck(characters, 'name'); =>
   *      [ "barney", "fred" ]
   */
  function pluck(obj, key) {
    return map(obj, property(key), null);
  };
  Est.pluck = pluck;

  /**
   * @description 释放数组， 若数组池个数少于最大值， 则压入数组池以备用
   * @method [数组] - releaseArray
   * @author wyj on 14/7/1
   * @example
   *      Est.releaseArray(array);
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  Est.releaseArray = releaseArray;
  /**
   * @description 释放对象， 若对象池个数少于最大值， 则压入对象池以备用
   * @method [对象] - releaseObject
   * @author wyj on 14/7/1
   * @example
   *      Est.releaseObject(object);
   */
  function releaseObject(object) {
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  Est.releaseObject = releaseObject;
  /**
   * @description 获取数组池
   * @method [数组] - getArray
   * @return {Array}
   * @author wyj on 14/7/1
   * @example
   *      var array = Est.getArray();
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  Est.getArray = getArray;
  /**
   * @description 获取对象池 主要用于优化性能
   * @method [对象] - getObject
   * @return {Object}
   * @author wyj on 14/7/1
   * @example
   *      var object = Est.getObject();
   */
  function getObject() {
    return objectPool.pop() || { 'array': null, 'cache': null, 'criteria': null, 'false': false, 'index': 0, 'null': false, 'number': null, 'object': null, 'push': null, 'string': null, 'true': false, 'undefined': false, 'value': null };
  }

  Est.getObject = getObject;

  function baseClone(value, isDeep, callback, stackA, stackB) {
    //var type = getType(value);
    var type = typeOf(value);
    if (callback) {
      var result = callback(value);
      if (typeof result !== 'undefined') return result;
    }
    if (typeof value === 'object' && type !== 'null') {
      switch (type) {
        case 'function':
          return value;
          break;
        case 'date':
          return new Date(+value);
          break;
        case 'string':
          return new String(value);
          break;
        case 'regexp':
          result = RegExp(value.source, /\w*$/.exec(value));
          result.lastIndex = value.lastIndex;
          break;
      }
    } else {
      return value;
    }
    var isArr = type === 'array';
    if (isDeep) {
      var initedStack = !stackA;
      stackA || (stackA = getArray());
      stackB || (stackB = getArray());
      var length = stackA.length;
      while (length--) {
        if (stackA[length] === value) {
          return stackB[length];
        }
      }
      result = isArr ? Array(value.length) : {};
    } else {
      result = isArr ? arraySlice(value, 0, value.length) : extend({}, value);
    }
    if (isArr) {
      if (hasOwnProperty.call(value, 'index')) {
        result.index = value.index;
      }
      if (hasOwnProperty.call(value, 'input')) {
        result.input = value.input;
      }
    }
    if (!isDeep) {
      return result;
    }
    stackA.push(value);
    stackB.push(result);
    each(value, function (target, key) {
      result[key] = baseClone(target, isDeep, callback, stackA, stackB);
    });
    if (initedStack) {
      releaseArray(stackA);
      releaseArray(stackB);
    }
    return result;
  }

  /**
   * @description 浅复制
   * @method [对象] - clone
   * @param value
   * @param callback
   * @param context
   * @return {*}
   * @author wyj on 14/7/6
   * @example
   *
   */
  function clone(value, callback, context) {
    callback = typeOf(callback) === 'function' && matchCallback(callback, context, 1);
    return baseClone(value, false, callback);
  }

  Est.clone = clone;
  /**
   * @description 深复制
   * @method [对象] - cloneDeep
   * @param value
   * @param callback
   * @param context
   * @return {*}
   * @author wyj on 14/7/6
   * @example
   *
   */
  function cloneDeep(value, callback, context) {
    callback = typeOf(callback) === 'function' && matchCallback(callback, context, 1);
    return baseClone(value, true, callback);
  }

  Est.cloneDeep = cloneDeep;

  /**
   * @description 返回一个设置参数的对象
   * @method [对象] - setArguments
   * @param args
   * @author wyj on 14.9.12
   *
   */
  function setArguments(args) {
    this.value = [].slice.call(args);
  }

  Est.setArguments = setArguments;

  /**
   * @description 对象路由控制
   * @method [对象] - keyRoute
   * @param {Object} handle 待控制对象
   * @param {String} pathname 路由名称
   * @param {Object} response 参数
   * @author wyj on 14/8/1
   * @example
   *    var handle = {
     * 			route1: function(reponse){

     			},
     			route2: function(){

     			}
     		}
   *    Est.keyRoute(handle, 'route1', {});
   */
  function keyRoute(handle, pathname, response) {
    if (Est.typeOf(handle[pathname]) === 'function') {
      return handle[pathname](response);
    } else {
      console.log("No request handler found for " + pathname);
    }
  }

  Est.keyRoute = keyRoute;

  // FormUtils =============================================================================================================================================

  /**
   * @description 表单验证
   * @method [表单] - validation
   * @param  {String} str  待验证字符串 str可为数组 判断所有元素是否都为数字
   * @param  {String} type 验证类型
   * @return {Boolean}      返回true/false
   * @author wyj on 14.9.29
   * @example
   *      var result_n = Est.validation(number, 'number'); // 数字或带小数点数字
   var result_e = Est.validation(email, 'email'); // 邮箱
   var result_c = Est.validation(cellphone, 'cellphone'); // 手机号码
   var result_d = Est.validation(digits, 'digits'); // 纯数字， 不带小数点
   var result_u = Est.validation(url, 'url'); // url地址
   */
  function validation(str, type) {
    var pattern, flag = true;
    switch (type) {
      case 'cellphone':
        pattern = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        break;
      case 'email':
        pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        break;
      case 'url':
        pattern = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        break;
      case 'number':
        // 可带小数点 如：0.33， 35.325
        pattern = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/; // ^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$ .1 matches 0.1 matches 1.12 matches 123.12 matches 92 matches 092 matches 092.13 matches 0 doesn't match 0.0 doesn't match 0.00 doesn't match 00 doesn't match 1.234 doesn't match -1 doesn't match -1.2 doesn't match
        break;
      case 'digits': //还可带小数点
        pattern = /^\d+$/;
        break;
    }
    if (this.typeOf(str) === 'array') {
      this.each(str, function (item) {
        if (!pattern.test(item))
          flag = false;
      });
    } else {
      flag = pattern.test(str);
    }
    return flag;
  }

  Est.validation = validation;


  // StringUtils =============================================================================================================================================
  /**
   * @description 产生唯一身份标识， 如'012ABC', 若为数字较容易数字溢出
   * @method [字符串] - nextUid
   * @return {string}
   * @param {String} prefix 前缀
   * @author wyj on 14/6/23
   * @example
   *      var uid = Est.nextUid(); => '001'
   */
  function nextUid(prefix) {
    var index = uid.length, digit;
    if (typeOf(prefix) === "undefined")
      prefix = '';
    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57 /*'9'*/) {
        uid[index] = 'A';
        return prefix + uid.join('');
      }
      if (digit == 90  /*'Z'*/) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return prefix + uid.join('');
      }
    }
    uid.unshift('0');
    return prefix + uid.join('');
  }

  Est.nextUid = nextUid;

  /**
   * @description id值瘦身 去掉前面的字母与0 比如 Product_0000000000000000000132 瘦身为132
   * @method [字符串] - encodeId
   * @param target
   * @return {string}
   * @author wyj 15.1.9
   * @example
   *      Est.encodeId('Product_00000000000000132'); => 132
   */
  function encodeId(target) {
    return target == null ? "" : target.replace(/^[^1-9]+/, "");
  }

  Est.encodeId = encodeId;

  /**
   * 还原ID
   * @method [字符串] - decodeId
   * @param id
   * @param prefix
   * @param length
   * @return {string}
   * @author wyj 15.1.13
   * @example
   *      Est.decodeId('123' , 'Product_' , 32); => Product_00000000000000000000123
   */
  function decodeId(id, prefix, length) {
    var len = prefix.length + id.length - 1;
    return prefix + new Array(length - len).join('0') + id;
  }

  Est.decodeId = decodeId;

  /**
   * @description 转换成小写字母
   * @method [字符串] - lowercase
   * @param {String} string 原字符串
   * @return {string}
   * @author wyj on 14/6/17
   * @example
   *      Est.lowercase("LE"); => le
   */
  function lowercase(string) {
    return typeOf(string) === 'string' ? string.toLowerCase() : string;
  }

  Est.lowercase = lowercase;
  /**
   * @description 转换成大写字母
   * @method [字符串] - uppercase
   * @param {String} string 原字符串
   * @return {string}
   * @author wyj on 14/6/17
   * @example
   *      Est.lowercase("le"); => LE
   */
  function uppercase(string) {
    return typeOf(string) === 'string' ? string.toUpperCase() : string;
  }

  Est.uppercase = uppercase;

  /**
   * @description 二分法将一个字符串重复自身N次
   * @method [字符串] - repeat
   * @param {String} target 原字符串
   * @param {Number} n 重复次数
   * @return {String} 返回字符串
   * @author wyj on 14-04-23
   * @example
   *      Est.repeat('ruby', 2); => rubyruby
   */
  function repeat(target, n) {
    var s = target, total = '';
    while (n > 0) {
      if (n % 2 == 1) {
        total += s;
      }
      if (n == 1) {
        break;
      }
      s += s;
      n = n >> 1;
    }
    return total;
  }

  Est.repeat = repeat;
  /**
   * @description 判定一个字符串是否包含另一个字符串
   * @method [字符串] - contains
   * @param {string} target 目标字符串
   * @param {string} 包含字符串
   * @param {string} 判定一个元素的className 是否包含某个特定的class
   * @return {boolean} 返回true/false
   * @author wyj on 14-04-23
   * @example
   *      Est.contains("aaaaa", "aa"); => true
   */
  function contains(target, str, separator) {
    return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
  }

  Est.contains = contains;
  /**
   * @description 判定目标字符串是否位于原字符串的开始之处
   * @method [字符串] - startsWidth
   * @param {target} 原字符串
   * @param {str} 目标字符串
   * @param {boolean} 是否忽略大小写
   * @return {boolean} true/false
   * @author wyj on 14-04-23
   * @example
   *      Est.startsWidth('aaa', 'aa', true); => true
   */
  function startsWith(target, str, ignorecase) {
    var start_str = target.substr(0, str.length);
    return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
  }

  Est.startsWidth = startsWith;
  /**
   * @description 判定目标字符串是否位于原字符串的结束之处
   * @method [字符串] - endsWidth
   * @param {target} 原字符串
   * @param {str} 目标字符串
   * @param {boolean} 是否忽略大小写
   * @return {boolean} true/false
   * @author wyj on 14-04-23
   * @example
   *      Est.endsWidth('aaa', 'aa', true); => true
   */
  function endsWidth(target, str, ignorecase) {
    var end_str = target.substring(target.length - str.length);
    return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str;
  }

  Est.endsWidth = endsWidth;
  /**
   * @description 取得一个字符串所有字节的长度
   * @method [字符串] - byteLen
   * @param target 目标字符串
   * @param fix 汉字字节长度，如mysql存储汉字时， 是用3个字节
   * @return {Number}
   * @author wyj on 14-04-23
   * @example
   *      Est.byteLen('sfasf我'， 2); => 7
   */
  function byteLen(target, fix) {
    fix = fix ? fix : 2;
    var str = new Array(fix + 1).join('-');
    return target.replace(/[^\x00-\xff]/g, str).length;
  }

  Est.byteLen = byteLen;
  /**
   * @description 对字符串进行截取处理，默认添加三个点号【版本一】
   * @method [字符串] - truncate
   * @param target 目标字符串
   * @param length 截取长度
   * @param truncation 结尾符号
   * @return {string}
   * @author wyj on 14-04-23
   * @example
   *     Est.truncate('aaaaaa', 4, '...'); => 'aaa...'
   */
  function truncate(target, length, truncation) {
    length = length || 30
    truncation = truncation === void(0) ? "..." : truncation
    return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
  }

  Est.truncate = truncate;
  /**
   * @description 对字符串进行截取处理，默认添加三个点号【版本二】
   * @method [字符串] - cutByte
   * @param str 目标字符串
   * @param length 截取长度
   * @param truncation 结尾符号
   * @return {string}
   * @author wyj on 14-04-25
   * @example
   *     Est.cutByte('aaaaaa', 4, '...'); => 'a...'
   */
  function cutByte(str, length, truncation) {
    if (isEmpty(str)) {
      return ''
    }
    //提前判断str和length
    if (!(str + "").length || !length || +length <= 0) {
      return "";
    }
    var length = +length,
      truncation = typeof(truncation) == 'undefined' ? "..." : truncation.toString(),
      endstrBl = this.byteLen(truncation);
    if (length < endstrBl) {
      truncation = "";
      endstrBl = 0;
    }
    //用于二分法查找
    function n2(a) {
      var n = a / 2 | 0;
      return (n > 0 ? n : 1)
    }

    var lenS = length - endstrBl, _lenS = 0, _strl = 0;
    while (_strl <= lenS) {
      var _lenS1 = n2(lenS - _strl),
        addn = this.byteLen(str.substr(_lenS, _lenS1));
      if (addn == 0) {
        return str;
      }
      _strl += addn;
      _lenS += _lenS1;
    }
    if (str.length - _lenS > endstrBl || this.byteLen(str.substring(_lenS - 1)) > endstrBl) {
      return str.substr(0, _lenS - 1) + truncation
    } else {
      return str;
    }
  }

  Est.cutByte = cutByte;
  /**
   * @description 替换指定的html标签, 当第3个参数为true时， 删除该标签并删除标签里的内容
   * @method [字符串] - stripTabName
   * @param {String} target 目标字符串
   * @param {String} tagName 标签名称
   * @param {String} deep 是否删除标签内的内容
   * @return {string}
   * @author wyj on 14/6/18
   * @example
   *      Est.stripTagName("<script>a</script>", "script", true)=> ''
   *      Est.stripTagName("<script>a</script>", "script", false)=> 'a'
   */
  function stripTagName(target, tagName, deep) {
    var pattern = deep ? "<" + tagName + "[^>]*>([\\S\\s]*?)<\\\/" + tagName + ">" : "<\/?" + tagName + "[^>]*>";
    return String(target || '').replace(new RegExp(pattern, 'img'), '');
  }

  Est.stripTagName = stripTagName;
  /**
   * @description 移除字符串中所有的script标签。弥补stripTags 方法的缺陷。此方法应在stripTags之前调用
   * @method [字符串] - stripScripts
   * @param {String} target 目标字符串
   * @return {string} 返回字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.stripScripts("a<script></script>"); => 'a'
   */
  function stripScripts(target) {
    return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
  }

  Est.stripScripts = stripScripts;
  /**
   * @description 移除字符串中的html标签, 若字符串中有script标签，则先调用stripScripts方法
   * @method [字符串] - stripTags
   * @param {String} target 原字符串
   * @return {string} 返回新字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.stripTags('aa<div>bb</div>'); => 'aabb'
   */
  function stripTags(target) {
    return String(target || '').replace(/<[^>]+>/img, '');
  }

  Est.stripTags = stripTags;
  /**
   * @description 替换原字符串中的“< > " '”为 “&lt;&gt;&quot;&#39;”
   * @method [字符串] - escapeHTML
   * @param {String} target 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.escapeHTML('<'); => '&lt;'
   */
  function escapeHTML(target) {
    return target.replace(/&/mg, '&amp;')
      .replace(/</mg, '&lt;')
      .replace(/>/mg, '&gt;')
      .replace(/"/mg, '&quot;')
      .replace(/'/mg, '&#39;');
  }

  Est.escapeHTML = escapeHTML;
  /**
   * @description 替换原字符串中的“&lt;&gt;&quot;&#39;”为 “< > " '”
   * @method [字符串] - unescapeHTML
   * @param {String} target 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.unescapeHTML('&lt;'); => '<'
   */
  function unescapeHTML(target) {
    target = target || '';
    return target.replace(/&amp;/mg, '&')
      .replace(/&lt;/mg, '<')
      .replace(/&gt;/mg, '>')
      .replace(/&quot;/mg, '"')
      .replace(/&#([\d]+);/mg, function ($0, $1) {
        return String.fromCharCode(parseInt($1, 10));
      });
  }

  Est.unescapeHTML = unescapeHTML;
  /**
   * @description 将字符串安全格式化为正则表达式的源码
   * @method [字符串] - escapeRegExp
   * @param {String} target 原字符串
   * @return {*}
   * @author wyj on 14/5/16
   * @example
   *      Est.escapeRegExp('aaa/[abc]/') => aaa\/\[abc\]\/;
   */
  function escapeRegExp(target) {
    return target.replace(/([-.*+?^${}()|[\]\/\\])/img, '\\$1');
  }

  Est.escapeRegExp = escapeRegExp;
  /**
   * @description 为字符串的某一端添加字符串。 如：005
   * @method [字符串] - pad
   * @param {String/Number} target 原字符串或数字
   * @param {Number} n 填充位数
   * @param {String} filling 填充字符串
   * @param {Boolean} right 在前或后补充
   * @param {Number} radix 转换进制 10进制或16进制
   * @param {Object} opts {String} opts.prefix 前缀
   * @author wyj on 14/5/5
   * @example
   *      Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => prefix0005
   */
  function pad(target, n, filling, right, radix, opts) {
    var str = target.toString(radix || 10), prefix = '', length = n;
    if (opts && opts.prefix) {
      length = n - opts.prefix.length;
      prefix = opts.prefix;
      if (length < 0) {
        throw new Error('n too small');
      }
    }
    filling = filling || '0';
    while (str.length < length) {
      if (!right) {
        str = filling + str;
      } else {
        str += filling;
      }
    }
    return prefix + str;
  }

  Est.pad = pad;
  /**
   * @description 格式化字符串，类似于模板引擎，但轻量级无逻辑
   * @method [字符串] - format
   * @param {String} str 原字符串
   * @param {Object} object 若占位符为非零整数形式即对象，则键名为点位符
   * @return {String} 返回结果字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.format("Result is #{0}, #{1}", 22, 23); => "Result is 22, 23"
   *     Est.format("#{name} is a #{sex}", {name : 'Jhon',sex : 'man'}); => "Jhon is a man"
   */
  function format(str, object) {
    var array = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\\?\#{([^{}]+)\}/gm, function (match, name) {
      if (match.charAt(0) == '\\')
        return match.slice(1);
      var index = Number(name);
      if (index >= 0)
        return array[index];
      if (object && object[name] !== void 0)
        return object[name];
      return '';
    });
  }

  Est.format = format;

  /**
   * @description 比format更强大的模板引擎， 支持字符串模板、变量嵌套、四则运算、比较操作符、三元运算符
   * @method [字符串] - template
   * @param {String} str 待格式化字符串
   * @param {Object} data 替换对象
   * @return {String} result
   * @author wyj on 14.10.9
   * @example
   *         // 字符串
   var result3 =Est.template('hello {{name}}', { name: 'feenan'}); => "hello feenan"

   // 变量嵌套
   var result8 =Est.template('hello {{person.age}}', { person: {age: 50}}); => "hello 50"

   // 四则运算
   var result4 =Est.template('(1+2)*age = {{ (1+2)*age}}', {age: 18}); => (1+2)*age = 54

   // 比较操作符
   var result5 =Est.template('{{1>2}}', {}); => false
   var result6 =Est.template('{{age > 18}}', {age: 20}); => true

   // 三元运算符
   var result7 =Est.template('{{ 2 > 1 ? name : ""}}', {name: 'feenan'}); => feenan

   // 综合
   var tmpl1 = '<div id="{{id}}" class="{{(i % 2 == 1 ? " even" : "")}}"> ' +
   '<div class="grid_1 alpha right">' +
   '<img class="righted" src="{{profile_image_url}}"/>' +
   '</div>' +
   '<div class="grid_6 omega contents">' +
   '<p><b><a href="/{{from_user}}">{{from_user}}</a>:</b>{{info.text}}</p>' +
   '</div>' +
   '</div>';
   var result = Est.template(tmpl1, {
        i: 5,
        id: "form_user",
        from_user: "Krasimir Tsonev",
        profile_image_url: "http://www.baidu.com/img/aaa.jpg",
        info: {
            text: "text"
        }
    });
   */
  function template(str, data) {
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] || template(str) :
      new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
          "with(obj){p.push('" +
          str
            .replace(/[\r\t\n]/g, " ")
            .split("{{").join("\t")
            .replace(/((^|}})[^\t]*)'/g, "$1\r")
            .replace(/\t(.*?)}}/g, "',$1,'")
            .split("\t").join("');")
            .split("}}").join("p.push('")
            .split("\r").join("\\'")
          + "');}return p.join('');");
    return data ? fn(data) : fn;
  }

  Est.template = template;


  /**
   * @description 移除字符串左端的空白
   * @method [字符串] - ltrim
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.ltrim('  dd    '); => 'dd    '
   */
  function ltrim(str) {
    for (var i = 0; i < str.length; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
  }

  Est.ltrim = ltrim;
  /**
   * @description 移除字符串右端的空白
   * @method [字符串] - rtrim
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.rtrim('  dd    '); => '   dd'
   */
  function rtrim(str) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (whitespace.lastIndexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.lastIndexOf(str.charAt(str.length - 1)) === -1 ? (str) : '';
  }

  Est.rtrim = rtrim;
  /**
   * @description 移除字符串两端的空白, 当字符串为undefined时， 返回null
   * @method [字符串] - trim
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.trim('  dd    '); => 'dd'
   */
  function trim(str) {
    if (isEmpty(str)) return null;
    for (var i = 0; i < str.length; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    for (i = str.length - 1; i >= 0; i--) {
      if (whitespace.lastIndexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
  }

  Est.trim = trim;
  /**
   * @description 去除字符串中的所有空格
   * @method [字符串] - deepTrim
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.allTrim('a b c'); => 'abc'
   */
  function deepTrim(str) {
    return str.toString().replace(/\s*/gm, '');
  }

  Est.deepTrim = deepTrim;

  /**
   * @description 字符串反转
   * @method [字符串] - reverse
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.reverse('abc'); => 'cba'
   */
  function reverse(str) {
    str = str.split('');
    var result = '',
      length = str.length;
    while (length--) {
      result += str[length];
    }
    return result;
  }

  Est.reverse = reverse;

  // ArrayUtils ===============================================================================================================================================
  /**
   * @description 根据索引值移除数组元素
   * @method [数组] - removeAt
   * @param {Array} list 原数组
   * @param {Nubmer} index 数组索引
   * @return {Boolean} 返回是否删除成功
   * @author wyj on 14/5/24
   * @example
   *      Est.removeAt(list, dx) => ;
   */
  function removeAt(list, index) {
    return !!list.splice(index, 1).length;
  }

  Est.removeAt = removeAt;
  /**
   * @description 删除数组中的元素
   * @method [数组] - arrayRemove
   * @param {Array} array 目标数组
   * @param {*} value 删除的元素
   * @return {*}
   * @author wyj on 14/6/23
   * @example
   *      var list = ['a', 'b', 'b'];
   *      var result = Est.arrayRemove(list, 'a'); => ['a', 'b']
   */
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index !== -1)
      array.splice(index, 1);
    return value;
  }

  Est.arrayRemove = arrayRemove;
  /**
   * @description 获取对象的所有KEY值
   * @method [数组] - keys
   * @param {Object} obj 目标对象
   * @return {Array}
   * @author wyj on 14/5/25
   * @example
   *      Est.keys({name:1,sort:1}); =>
   */
  function keys(obj) {
    if (typeOf(obj) !== 'object') return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (hasKey(obj, key)) keys.push(key);
    return keys;
  }

  Est.keys = keys;
  /**
   * @description 用来辨别 给定的对象是否匹配指定键/值属性的列表
   * @method [数组] - matches
   * @param attrs
   * @return {Function}
   * @author wyj on 14/6/26
   * @example
   */
  function matches(attrs) {
    return function (obj) {
      if (obj == null) return isEmpty(attrs);
      if (obj === attrs) return true;
      for (var key in attrs) if (attrs[key] !== obj[key]) return false;
      return true;
    };
  }

  Est.matches = matches;
  /**
   * @description 数组过滤
   * @method [数组] - filter
   * @param {Array} collection 数组
   * @param {Function} callback 回调函数
   * @param args
   * @author wyj on 14/6/6
   * @example
   *      var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
   *      var result = Est.filter(list, function(item){
     *          return item.name.indexOf('b') > -1;
     *      }); => [ { "name": "bb" }, { "address": "zjut", "name": "bb" } ]
   */
  function filter(collection, callback, context) {
    var results = [];
    if (!collection) return result;
    var predicate = matchCallback(callback, context);
    each(collection, function (value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  Est.filter = filter;

  /**
   * @description 数组中查找符合条件的索引值 比较原始值用indexOf
   * @method [数组] - findIndex
   * @param array
   * @param {Function} callback 回调函数
   * @param {Object} context 上下文
   * @return {number}
   * @author wyj on 14/6/29
   * @example
   *      var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
   *      var index = Est.findIndex(list, {name: 'aa'}); => 0
   *      var index2 =  Est.findIndex(list, function(item){
     *          return item.name === 'aa';
     *      }); => 0
   */
  function findIndex(array, callback, context) {
    var index = -1,
      length = array ? array.length : 0;
    callback = matchCallback(callback, context);
    while (++index < length) {
      if (callback(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  Est.findIndex = findIndex;


  /**
   * @description 数组转化为object 如果对象key值为数字类型， 则按数字从小到大排序
   * @method [数组] - arrayToObject
   * @param {Array} list 目标数组
   * @param {String} name key
   * @param {String} val value
   * @return {Object} object
   * @author wyj on 14/5/24
   * @example
   *      var list4 = [{key:'key1',value:'value1'},{key:'key2',value:'value2'}];
   *      Est.arrayToObject(list4, 'key', 'value'); =>
   *      {key1: 'value1',key2: 'value2'}
   */
  function arrayToObject(list, key, val) {
    var obj = {};
    each(list, function (item) {
      if (typeOf(item[key]) !== 'undefined') {
        obj[item[key]] = item[val];
      }
    });
    return obj;
  }

  Est.arrayToObject = arrayToObject;
  /**
   * @description 对象转化为数组
   * @method [数组] - arrayFromObject
   * @param {Object} obj 待转化的对象
   * @return {Array} 返回数组
   * @author wyj on 14/5/24
   * @example
   *      var obj = {key1: 'value1', key2: 'value2'};
   *      var result = Est.arrayFromObject(obj, 'key', 'value'); =>
   *      [{key: 'key1', value: 'value1'},
   *      {key: 'key2', value: 'value2'}]
   */
  function arrayFromObject(obj, name, value) {
    var list = [];
    if (typeOf(obj) !== 'object') {
      return [];
    }
    each(obj, function (val, key) {
      var object = {};
      object[name] = key;
      object[value] = val;
      list.push(object);
    });
    return list;
  }

  Est.arrayFromObject = arrayFromObject;
  /**
   * @description 交换元素
   * @method [数组] - arrayExchange
   * @param {Array} list 原数组
   * @param {Number} thisdx 第一个元素索引值
   * @param {Number} targetdx 第二个元素索引值
   * @param {Object} opts {String} opts.column 需要替换的列值;{Function} opts.callback(thisNode, nextNode) 回调函数 返回两个对调元素
   * @author wyj on 14/5/13
   * @example
   *      var list2 = [{name:1, sort:1},{name:2, sort:2}];
   *      Est.arrayExchange(list2, 0 , 1, {
     *          column:'sort',
     *          callback:function(thisNode, targetNode){
     *          }
     *       }); =>
   *      {name:2,sort:1}
   *      {name:1,sort:2}
   */
  function arrayExchange(list, thisdx, targetdx, opts) {
    if (thisdx < 0 || thisdx > list.length || targetdx < 0 || targetdx > list.length) {
      throw new Error('method exchange: thisdx or targetdx is invalid !');
    }
    var thisNode = list[thisdx],
      nextNode = list[targetdx],
      temp = thisNode,
      thisSort = 0;
    // 更换列值
    if (opts && typeof opts.column === 'string') {
      thisSort = getValue(thisNode, opts.column);
      setValue(thisNode, opts.column, getValue(nextNode, opts.column));
      setValue(nextNode, opts.column, thisSort);
    }
    // 更新数据
    if (opts && typeof opts.callback === 'function') {
      opts.callback.apply(null, [thisNode, nextNode]);
    }
    // 替换位置
    list[thisdx] = nextNode;
    list[targetdx] = temp;
  }

  Est.arrayExchange = arrayExchange;
  /**
   * @description 数组插序
   * @method [数组] - arrayInsert
   * @param {Array} list 原数组
   * @param {Number} thisdx 第一个元素索引
   * @param {Number} targetdx 第二个元素索引
   * @param {Object} opts    {String} opts.column:需要替换的列值; {Function} opts.callback(list)回调函数 返回第一个元素与第二个元素之间的所有元素
   * @author wyj on 14/5/15
   * @example
   *          var list3 = [{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}];
   *          Est.arrayInsert(list3, 3 , 1, {column:'sort',callback:function(list){}}); =>
   *          [{name:1,sort:1},{name:4,sort:2},{name:2,sort:3},{name:3,sort:4}]
   */
  function arrayInsert(list, thisdx, targetdx, opts) {
    var tempList = []; // 用于存放改变过的值
    if (thisdx < targetdx) {
      for (var i = thisdx; i < targetdx - 1; i++) {
        arrayExchange(list, i, i + 1, {
          column: opts.column
        });
      }
      tempList = list.slice(0).slice(thisdx, targetdx);
    } else {
      for (var i = thisdx; i > targetdx; i--) {
        arrayExchange(list, i, i - 1, {
          column: opts.column
        });
      }
      tempList = list.slice(0).slice(targetdx, thisdx + 1);
    }
    if (typeof opts.callback === 'function') {
      opts.callback.apply(null, [tempList]);
    }
  }

  Est.arrayInsert = arrayInsert;
  /**
   * @description 遍历MAP对象
   * @method [数组] - map
   * @param {Array} obj 目标数组
   * @param callback 回调函数
   * @param context 上下文
   * @return {Array} 返回数组
   * @author wyj on 14/6/23
   * @example
   *      var list = [1, 2, 3];
   *      var result = Est.map(list, function(value, list, index){
     *      return list[index] + 1;
     *      }); => [2, 3, 4]
   */
  function map(obj, callback, context) {
    var results = [];
    if (obj === null) return results;
    callback = matchCallback(callback, context);
    each(obj, function (value, index, list) {
      results.push(callback(value, index, list));
    });
    return results;
  }

  Est.map = map;
  /**
   * @description 字符串转化成MAP对象，以逗号隔开， 用于FORM表单
   * @method [数组] - makeMap
   * @param str
   * @return {{}}
   * @author wyj on 14/6/23
   * @example
   *      var object = Est.makeMap("a, aa, aaa"); => {"a":true, "aa": true, "aaa": true}
   */
  function makeMap(str) {
    var obj = {}, items = str.split(","), i;
    for (i = 0; i < items.length; i++)
      obj[ items[i] ] = true;
    return obj;
  }

  Est.makeMap = makeMap;
  /**
   * @description 判断元素是否存在于数组中
   * @method [数组] - indexOf
   * @param {Array} array 原型数组
   * @param {*} value 值
   * @return {Number}
   * @author wyj on 14/6/23
   * @example
   *      var list = ['a', 'b'];
   *      var has = Est.indexOf('b'); => 1
   */
  function indexOf(array, value) {
    if (array.indexOf) return array.indexOf(value);
    for (var i = 0, len = array.length; i < len; i++) {
      if (value === array[i]) return i;
    }
    return -1;
  }

  Est.indexOf = indexOf;
  /**
   * @description 数组排序
   * @method [数组] - sortBy
   * @param obj
   * @param iterator
   * @param context
   * @return {*}
   * @author wyj on 14/7/5
   * @example
   *      var result = Est.sortBy([1, 2, 3], function(num) { return Math.sin(num); }); => [3, 1, 2]
   *
   *      var characters = [ { 'name': 'barney',  'age': 36 }, { 'name': 'fred',    'age': 40 }, { 'name': 'barney',  'age': 26 }, { 'name': 'fred',    'age': 30 } ];
   *      var result2 = Est.sortBy(characters, 'age'); =>
   *      [{ "age": 26, "name": "barney" }, { "age": 30, "name": "fred" }, { "age": 36, "name": "barney" }, { "age": 40, "name": "fred" }]
   *
   *      var result3 = Est.sortBy(characters, ['name', 'age']); =>
   *      [{ "age": 26, "name": "barney" },{ "age": 36, "name": "barney" },  { "age": 30, "name": "fred" }, { "age": 40, "name": "fred" } ]
   */
  function sortBy(collection, callback, context) {
    var index = -1,
      isArr = typeOf(callback) === 'array',
      length = collection ? collection.length : 0,
      result = Array(typeof length === 'number' ? length : 0);
    if (!isArr) {
      callback = matchCallback(callback, context);
    }
    each(collection, function (value, key, collection) {
      var object = result[++index] = {};
      if (isArr) {
        object.criteria = map(callback, function (key) {
          return value[key];
        });
      } else {
        (object.criteria = [])[0] = callback(value, key, collection);
      }
      object.index = index;
      object.value = value;
    });
    length = result.length;
    result.sort(function (left, right) {
      var left_c = left.criteria,
        right_c = right.criteria,
        index = -1,
        length = left_c.length;
      while (++index < length) {
        var value = left_c[index],
          other = right_c[index];
        if (value !== other) {
          if (value > other || typeof value == 'undefined') {
            return 1;
          }
          if (value < other || typeof other == 'undefined') {
            return -1;
          }
        }
      }
      return left.index - right.index;
    });
    return pluck(result, 'value');
  }

  Est.sortBy = sortBy;
  /**
   * @description 截取数组
   * @method [数组] - arraySlice / take
   * @param {Array} array 数据
   * @param {Number} start 起始
   * @param {Number} end 若未设置值， 则取索引为start的一个值
   * @return {*}
   * @author wyj on 14/7/7
   * @example
   *      var youngest = Est.chain(characters)
   .sortBy('age').take(0)   // 获取第一个值
   .pluck('age').value();
   */
  function arraySlice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = start < array.length - 1 ? (start + 1) : array.length;
    }
    var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  Est.take = Est.arraySlice = arraySlice;

  // ImageUtils ==============================================================================================================================================

  /**
   * @description  获取图片地址缩放等级
   * @method [图片] - picUrl
   * @param src
   * @param zoom
   * @return {string}
   * @author wyj on 14/7/25
   * @example
   *      Est.picUrl(src, 5);
   */
  function picUrl(src, zoom) {
    if (!Est.isEmpty(src)) {
      var type = src.substring(src.lastIndexOf(".") + 1, src.length);
      var hasZoom = src.lastIndexOf('_') > 0 ? true : false;
      return src.substring(0, src.lastIndexOf(hasZoom ? '_' : '.')) + "_" + zoom + "." + type;
    }
  }

  Est.picUrl = picUrl;

  /**
   * @description 获取居中图片的margin值, 若图片宽高比太大，则不剪切
   * @method [图片] - imageCrop
   * @param {Number} naturalW 图片宽度
   * @param {Number} naturalH 图片高度
   * @param {Number} targetW 展示框宽度
   * @param {Number} targetH 展示框高度
   * @param {Boolean} fill 是否铺满框
   * @return {{width: *, height: *, marginTop: number, marginLeft: number}}
   * @author wyj on 14-04-24
   * @example
   *      $.each($(".imageCrop"), function(){
     *          $(this).load(function(response, status, xhr){
     *              var w = $(this).get(0).naturalWidth, h = $(this).get(0).naturalHeight;
     *              var width = $(this).attr("data-width"), height = $(this).attr("data-height");
     *              $(this).css(Est.imageCrop(w, h, width, height), 'fast');
     *              $(this).fadeIn('fast');
     *          });
     *      });
   */
  function imageCrop(naturalW, naturalH, targetW, targetH, fill) {
    var _w = parseInt(naturalW, 10), _h = parseInt(naturalH, 10),
      w = parseInt(targetW, 10), h = parseInt(targetH, 10);
    var fill = fill || false;
    var res = {
      width: w,
      height: h,
      marginTop: 0,
      marginLeft: 0
    }
    if (_w != 0 && _h != 0) {
      var z_w = w / _w, z_h = h / _h;
      if (!fill && (z_w / z_h) > 1.5) {
        //若高度 远远 超出 宽度
        res = {
          width: 'auto',
          height: h,
          marginTop: 0,
          marginLeft: Math.abs((w - _w * z_h) / 2)
        };
      } else if (!fill && (z_h / z_w) > 1.5) {
        //若宽度 远远 超出 高度
        res = {
          width: w,
          height: 'auto',
          marginTop: Math.abs((h - _h * z_w) / 2),
          marginLeft: 0
        };
      }
      else {
        if (z_w < z_h) {
          res = {
            width: _w * z_h,
            height: h,
            marginTop: 0,
            marginLeft: -(_w * z_h - w) / 2
          };
        } else if (z_w > z_h) {
          res = {
            width: w,
            height: _h * z_w,
            marginTop: -(_h * z_w - h) / 2,
            marginLeft: 0
          };
        } else {
          res = {
            width: w,
            height: h,
            marginTop: -(_h * z_h - h) / 2,
            marginLeft: -(_w * z_h - w) / 2
          }
        }
      }
    }
    return res;
  }

  Est.imageCrop = imageCrop;
  /**
   * @description 图片上传预览
   * @method [图片] - setImagePreview
   * @param {Object} option option.inputFile : file input表单元素,  option.imgNode : 待显示的img元素
   * @return {boolean} 返回 true 与 false
   * @author wyj on 14/8/30
   * @example
   *       Est.imagePreview({
     *              inputFile: $("input[type=file]").get(0),
     *              imgNode: $(".img").get(0)
     *       });
   */
  function imagePreview(option) {
    var docObj = option['inputFile']; // file input表单元素
    var files = docObj.files;
    var imgObjPreview = option['imgNode']; // 待显示的img元素
    var i = 0, file = null;
    try {
      if (files && files[0]) {
        var length = files.length;
        while (i < length) {
          file = files[i];
          if (file.type.match("image.*")) {
            var render = new FileReader();
            render.readAsDataURL(file);
            render.onloadend = function () {
              imgObjPreview.src = this.result;
            }
          }
          i++;
        }
      } else {
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
        localImagId.style.width = "96px";
        localImagId.style.height = "96px";
        try {
          localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
          localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
          alert("您上传的图片格式不正确，请重新选择!");
          return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
      }
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  Est.imagePreview = imagePreview;

  /**
   * @description 绘制canvas图片 解决苹果屏幕模糊问题 注意：此方法将移除， 转移到Canvas.min.js中
   * @method [图片] - drawImage
   * @param {Object} opts 详见例子
   * @author wyj on 14.9.4
   * @example
   * Est.drawImage({
                context2D: context2D, // canvas.getContext("2d")
				canvas: canvas, // 画布
				image: imageObj, // image对象
				desx: result.marginLeft, // 开始剪切的 x 坐标位置
				desy: result.marginTop, // 开始剪切的 y 坐标位置
				desw: result.width,// 被剪切图像的宽度
				desh: result.height}); // 被剪切图像的高度
   */
  function drawImage(opts) {
    if (!opts.canvas) {
      throw("A canvas is required");
    }
    if (!opts.image) {
      throw("Image is required");
    }
    // 获取canvas和context
    var canvas = opts.canvas,
      context = opts.context2D,
      image = opts.image,
    // now default all the dimension info
      srcx = opts.srcx || 0,
      srcy = opts.srcy || 0,
      srcw = opts.srcw || image.naturalWidth,
      srch = opts.srch || image.naturalHeight,
      desx = opts.desx || srcx,
      desy = opts.desy || srcy,
      desw = opts.desw || srcw,
      desh = opts.desh || srch,
      auto = opts.auto,
    // finally query the various pixel ratios
      devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;
    // ensure we have a value set for auto.
    // If auto is set to false then we
    // will simply not upscale the canvas
    // and the default behaviour will be maintained
    if (typeof auto === 'undefined') {
      auto = true;
    }
    // upscale the canvas if the two ratios don't match
    if (auto && devicePixelRatio !== backingStoreRatio) {
      var oldWidth = canvas.width;
      var oldHeight = canvas.height;
      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + 'px';
      canvas.style.height = oldHeight + 'px';
      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      context.scale(ratio, ratio);
    }
    context.drawImage(opts.image, srcx, srcy, srcw, srch, desx, desy, desw, desh);
  }

  Est.drawImage = drawImage;


  // GirdUtils
  /**
   * @description 列表两端对齐，
   * @method [图片] - girdJustify
   * @param options
   * @author wyj on 14/5/11
   * @example
   *      <script type="text/javascript">
   *          var justifyCont = $("#gird");
   *          var justifylist = $("li", justifyCont);
   *          var justifyOpts = {
     *                  containerWidth: justifyCont.width(), //容器总宽度
     *                  childLength: justifylist.size(), //子元素个数
     *                  childWidth: justifylist.eq(0).width(), // 子元素宽度
     *                  childSpace: 10, //默认右边距
     *                  callback: function (i, space) { // 回调函数， 执行CSS操作， i为第几个元素， space为边距
     *                      justifylist.eq(i).css("margin-right", space);
     *                  }
     *              };
   *          Est.girdJustify(justifyOpts);
   *          $(window).bind("resize", function () {
     *              justifyOpts.containerWidth = justifyCont.width();
     *              Est.girdJustify(justifyOpts);
     *          });
   *      </script>
   */
  function girdJustify(opts) {
    var opts = {
      ow: parseFloat(opts.containerWidth),
      cw: parseFloat(opts.childWidth),
      cl: opts.childLength,
      cm: parseFloat(opts.childSpace),
      fn: opts.callback
    }
    //每行显示的个数
    var rn = Math.floor((opts.ow - opts.cm) / (opts.cw + opts.cm));
    //间隔
    var space = Math.floor((opts.ow - opts.cw * rn) / (rn - 1));
    //总共有几行
    var rows = Math.ceil(opts.cl / rn);
    for (var i = 0; i < rows; i++) {
      for (var j = rn * i; j < rn * (i + 1); j++) {
        if (j != (rn * (i + 1) - 1)) {
          // 是否是每行的最后一个， 否则添加右边距
          opts.fn(j, space);
        } else {
          opts.fn(j, 0);
        }
      }
    }
  }

  Est.girdJustify = girdJustify;
  // TreeUtils
  /**
   * @description 构建树 注意：categoryId， belongId别弄错， 否则会报‘Maximum call stack size exceeded’错误
   * @method [树] - bulidSubNode
   * @param {Array} rootlist 根节点列表
   * @param {Array} totalList 总列表 {String}
   * @param {Object} opts {String} opts.category_id 分类Id {String} opts.belong_id 父类Id
   * @author wyj on 14/5/15
   * @example
   *      var root = [];
   *      for(var i = 0, len = list.length; i < len; i++){
     *          if(list[i]['grade'] === '01'){
     *              root.push(list[i]);
     *          }
     *      }
   *      Est.bulidSubNode(root, list, {
     *          categoryId: 'category_id', // 分类ＩＤ
     *          belongId: 'belong_id', // 父类ＩＤ
     *          childTag: 'cates', // 存放子类字段名称
     *          dxs: []
     *      });
   */
  function bulidSubNode(rootlist, totalList, opts) {
    var options = {
      categoryId: 'category_id',//分类ＩＤ
      belongId: 'belong_id',//父类ＩＤ
      childTag: 'cates',
      dxs: []
    }
    if (typeof(opts) != 'undefined') {
      Est.extend(options, opts);
    }
    if (typeof(options['dxs']) !== 'undefined') {
      for (var k = 0 , len3 = options['dxs'].length; k < len3; k++) {
        totalList.splice(options['dxs'][k], 1);
      }
    }
    for (var i = 0, len = rootlist.length; i < len; i++) {
      var item = rootlist[i];
      var navlist = [];
      // 设置子元素
      for (var j = 0, len1 = totalList.length; j < len1; j++) {
        var newResItem = totalList[j];
        if (item[options.categoryId] == newResItem[options.belongId]) {
          navlist.push(newResItem);
          //options['dxs'].push(j);
        }
      }
      // 设置子元素
      item[options.childTag] = navlist.slice(0);
      // 判断是否有下级元素
      if (navlist.length > 0) {
        item.hasChild = true;
        bulidSubNode(navlist, totalList, options);
      } else {
        item.hasChild = false;
        item.cates = [];
      }
    }
    return rootlist;
  }

  Est.bulidSubNode = bulidSubNode;
  /**
   * @description 获取select表单控件样式的树
   * @method [树] - bulidSelectNode
   * @param {Array} rootlist 根节点列表
   * @param {Number} zoom 缩进
   * @param {Object} obj {String} opts.name 字段名称
   * @author wyj on 14/5/15
   * @example
   *      Est.bulidSelectNode(rootlist, 2, {
     *          name : 'name'
     *      });
   */
  function bulidSelectNode(rootlist, zoom, opts) {
    var z = zoom;
    opts.top = typeof opts.top === 'undefined' ? true : opts.top;
    for (var i = 0, len = rootlist.length; i < len; i++) {
      var space = '';
      if (!opts.top) {
        for (var j = 0; j < z; j++) {
          space = space + '　';
        }
      }
      space = space + "|-";
      rootlist[i][opts['name']] = space + rootlist[i][opts['name']];
      if (rootlist[i].hasChild) {
        opts.top = false;
        bulidSelectNode(rootlist[i].cates, zoom = z + 2, opts);
      }
    }
    return rootlist;
  }

  Est.bulidSelectNode = bulidSelectNode;


  /**
   * @description 扩展树
   * @method [树] - extendTree
   * @param {Array} rootlist 根节点列表
   * @author wyj on 14/5/15
   * @example
   *      Est.extendNode(rootlist);
   */
  function extendTree(treelist, opts) {
    var list = [];

    function extendNode(rootlist) {
      for (var i = 0, len = rootlist.length; i < len; i++) {
        list.push(rootlist[i]);
        if (rootlist[i].hasChild) {
          extendNode(rootlist[i].cates);
        }
      }
      return rootlist;
    }

    extendNode(treelist);
    return list;
  }

  Est.extendTree = extendTree;

  /**
   * @description 构建树
   * @method [树] - bulidTreeNode
   * @param {Array} list
   * @param {String} name 父分类的字段名称
   * @param {String} value 值
   * @param {Object} opts 配置信息
   * @return {*}
   * @author wyj on 14/7/9
   * @example
   *      Est.bulidTreeNode(list, 'grade', '01', {
     *          categoryId: 'category_id',// 分类ＩＤ
     *          belongId: 'belong_id',// 父类ＩＤ
     *          childTag: 'cates', // 子分类集的字段名称
     *          sortBy: 'sort', // 按某个字段排序
     *          callback: function(item){}  // 回调函数
     *      });
   */
  function bulidTreeNode(list, name, value, opts) {
    var root = [];
    each(list, function (item) {
      if (item[name] === value) root.push(item);
      if (opts && Est.typeOf(opts.callback) === 'function') {
        opts.callback.call(this, item);
      }
    });
    if (opts && Est.typeOf(opts.sortBy) !== 'undefined') {
      root = Est.sortBy(root, function (item) {
        return item[opts.sortBy];
      });
      list = Est.sortBy(list, function (item) {
        return item[opts.sortBy];
      });
    }
    return bulidSubNode(root, list, opts);
  }

  Est.bulidTreeNode = bulidTreeNode;

  /**
   * @description 获取面包屑导航
   * @method [树] - bulidBreakNav
   * @param {Array} list 总列表
   * @param {String} nodeId ID标识符
   * @param {String} nodeValue id值
   * @param {String} nodeLabel 名称标识符
   * @param {String} nodeParentId 父类ID标识符
   * @return {*}
   * @author wyj on 14/7/10
   * @example
   *     $('.broadcrumb').html(Est.bulidBreakNav(app.getData('albumList'), 'album_id', albumId, 'name', 'parent_id'));
   *
   */
  function bulidBreakNav(list, nodeId, nodeValue, nodeLabel, nodeParentId) {
    var breakNav = [];
    var result = Est.filter(list, function (item) {
      return item[nodeId] === nodeValue;
    });
    if (result.length === 0) return breakNav;
    breakNav.unshift({nodeId: nodeValue, name: result[0][nodeLabel]});
    var getParent = function (list, id) {
      var parent = Est.filter(list, function (item) {
        return item[nodeId] === id;
      });
      if (parent.length > 0) {
        breakNav.unshift({nodeId: parent[0][nodeId], name: parent[0][nodeLabel]});
        getParent(list, parent[0][nodeParentId]);
      }
    }
    getParent(list, result[0][nodeParentId]);
    return breakNav;
  }

  Est.bulidBreakNav = bulidBreakNav;

  // PaginationUtils
  /**
   * @description 获取最大页数
   * @method [分页] - getMaxPage
   * @param {number} totalCount 总条数
   * @param {number} pageSize 每页显示的条数
   * @return {number} 返回最大页数
   * @author wyj on 14-04-26
   * @example
   *      Est.getMaxPage(parseInt(50), parseInt(10)); => 5
   */
  function getMaxPage(totalCount, pageSize) {
    return totalCount % pageSize == 0 ? totalCount / pageSize : Math.floor(totalCount / pageSize) + 1;
  }

  Est.getMaxPage = getMaxPage;
  /**
   * @description 获取最大页数【版本二】
   * @method [分页] - getMaxPage_2
   * @param { Number} totalCount otalCount 总条数
   * @param {Number} pageSize pageSize 每页显示的条数
   * @return {Number} 返回最大页数
   * @author wyj on 14/04/26
   * @example
   *     Est.getMaxPage(parseInt(50), parseInt(10)); => 5
   */
  function getMaxPage_2(totalCount, pageSize) {
    return totalCount > pageSize ? Math.ceil(totalCount / pageSize) : 1;
  }

  Est.getMaxPage_2 = getMaxPage_2;
  /**
   * @description 根据pageList总列表， page当前页   pageSize显示条数  截取列表
   * @method [分页] - getListByPage
   * @param {Array} pageList  全部列表
   * @param page 当前页
   * @param pageSize  每页显示几条
   * @return {Array} 返回结果集
   * @author wyj on 14-04-26
   * @example
   *      Est.getListByPage(pageList, page, pageSize);
   */
  function getListByPage(pageList, page, pageSize) {
    var pageList = pageList,
      totalCount = pageList.length,
      newList = new Array();
    var maxPage = this.getMaxPage(totalCount, pageSize);
    page = page < 1 ? 1 : page;
    page = page > maxPage ? maxPage : page;
    var start = ((page - 1) * pageSize < 0) ? 0 : ((page - 1) * pageSize),
      end = (start + pageSize) < 0 ? 0 : (start + pageSize);
    end = end > totalCount ? totalCount : (start + pageSize);
    for (var i = start; i < end; i++) {
      newList.push(pageList[i]);
    }
    return newList;
  }

  Est.getListByPage = getListByPage;
  /**
   * @description 通过当前页、总页数及显示个数获取分页数字
   * @method [分页] - getPaginationNumber
   * @param {Number} page 当前页
   * @param {Number} totalPage 总页数
   * @param {Number} length 显示数
   * @return {Array} 返回数字集
   * @example
   *      Est.getPaginajtionNumber(parseInt(6), parseInt(50), 9); => 3,4,5,6,7,8,9
   */
  function getPaginationNumber(page, totalPage, length) {
    var page = parseInt(page, 10),
      totalPage = parseInt(totalPage, 10),
      start = 1,
      end = totalPage,
      pager_length = length || 11,    //不包next 和 prev 必须为奇数
      number_list = [];
    if (totalPage > pager_length) {
      var offset = ( pager_length - 1) / 2;
      if (page <= offset) {
        start = 1;
        end = offset * 2 - 1;
      } else if (page > totalPage - offset) {
        start = totalPage - offset * 2 + 2;
        end = totalPage;
      } else {
        start = page - (offset - 1);
        end = page + (offset - 1);
      }
    } else {
      end = totalPage;
    }
    for (var i = start; i <= end; i++) {
      number_list.push(i);
    }
    return number_list;
  }

  Est.getPaginationNumber = getPaginationNumber;

  // CacheUtils
  /**
   * @description 数据缓存
   * @method [缓存] - getCache
   * @param {String} uId 唯一标识符
   * @param {Object} ctx 缓存对象
   * @param {String} options.area 缓存分区
   * @param {Object} options {Function} options.getData 获取待缓存的数据
   * @return {*} 返回缓存数据
   * @author wyj on 14/5/3
   * @example
   *     Est.getCache('uId', session, {
     *          area : 'dd',
     *          getData : function(data){
     *              return cache_data;
     *          }
     *      }))
   */
  function getCache(uId, ctx, options) {
    var opts = {
      area: 'templates',
      getData: null
    }
    Est.extend(opts, options);
    ctx.cache = ctx.cache || {};
    if (typeof ctx.cache[opts.area] === 'undefined') {
      ctx.cache[opts.area] = {};
    }
    var data = ctx.cache[opts.area][uId];
    if (!data) {
      data = ctx.cache[opts.area][uId] = opts.getData.call(null, data);
    }
    return data;
  }

  Est.getCache = getCache;

  // CssUtils
  /**
   * @description 获取当前元素的css选择符，规则：父模块的ID值 + 当前元素的ID值 > class值
   * @method [样式] - getSelector
   * @param {Element} target 目标元素
   * @param {String} parentClass 父模块class选择符
   * @param {Object} $  jquery对象 或 其它
   * @return {string} 返回当前元素的选择符
   * @author wyj on 14/5/5
   * @example
   *     Est.getSelector($('#gird-li').get(0), 'moveChild')) => ;
   */
  function getSelector(target, parentClass, $) {
    var selector = "";
    var isModule = $(target).hasClass(parentClass);
    var id = $(target).attr("id");
    var className = $(target).attr("class");
    if (id.length > 0) {
      selector = "#" + id;
    } else if (className.length > 0) {
      selector = "." + $.trim(className).split(" ")[0];
    } else {
      selector = getTagName(target);
      selector = getSelector(target.parentNode) + " " + selector;
    }
    return isModule ? selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector;
  }

  Est.getSelector = getSelector;
  /**
   * @description 获取元素的标签符号 , 大写的转换成小写的
   * @method [样式] - getTagName
   * @param {Element} target 目标元素
   * @return {string} 返回标签符号
   * @author wyj on 14/5/6
   * @example
   *     Est.getTagName(document.getElementById('a')); ==>　'div'
   */
  function getTagName(target) {
    return target.tagName.toLowerCase();
  }

  Est.getTagName = getTagName;
  /**
   * @description 加载样式文件
   * @method [样式] - loadCss
   * @param url
   * @author wyj on 14/7/7
   * @example
   *
   */
  function loadCSS(url) {
    var elem = document.createElement("link");
    elem.rel = "stylesheet";
    elem.type = "text/css";
    elem.href = url;
    document.body.appendChild(elem);
  }

  Est.loadCss = loadCSS;
  // DateUtils
  /**
   * @description 格式化时间 当输入的时间是已经格式好好的且为IE浏览器， 则原样输出
   * @method [时间] - dateFormat
   * @param {String} date 时间
   * @param {String} fmt 格式化规则 如‘yyyy-MM-dd’
   * @return {String} 返回格式化时间
   * @author wyj on 14/5/3
   * @example
   *     Est.dateFormat(new Date(), 'yyyy-MM-dd'); => '2014-05-03'
   */
  function dateFormat(date, fmt) {
    var origin = date;
    var date = date ? new Date(date) : new Date();
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    fmt = fmt || 'yyyy-MM-dd';
    if (!isNaN(date.getFullYear())) {
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      try {
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      } catch (e) {
        console.log('【Error】: DateUtils.dataFormat ' + e);
      }
    } else {
      fmt = origin;
    }

    return fmt;
  }

  Est.dateFormat = dateFormat;

  /**
   * @description 获取每月的天数
   * @method [时间] - getDays
   * @param Year
   * @param Mon
   * @return {number}
   * @author wyj on 14.9.14
   * @example
   *      var days = Est.getDays('2014', '9'); => 31  // 这里的9表示 8月份
   */
  function getDays(Year, Mon) {
    var days =
      (/^0$|^2$|^4$|^6$|^7$|^9$|^11$/.test(Mon)) ? 31 :
        (/^3$|^5$|^8$|^10$/.test(Mon)) ? 30 :
          (/^1$/.test(Mon)) ?
            ((!(Year % 400) || (!(Year % 4) && (Year % 100))) ? 29 : 28) : 0;
    return days;
  }

  Est.getDays = getDays;


  // DomUtils
  /**
   * @description 清空该元素下面的所有子节点【大数据量时】 在数据量小的情况下可以用jQuery的empty()方法
   * parentNode必须为DOM对象，$('#selector').get(0);
   * @method [文档] - clearAllNode
   * @param parentNode
   * @return {*}
   * @author wyj on 14-04-26
   * @example
   *      Est.clearAllNode(document.getElementById("showResFilesContent"));
   */
  function clearAllNode(parentNode) {
    while (parentNode.firstChild) {
      var oldNode = parentNode.removeChild(parentNode.firstChild);
      oldNode = null;
    }
  }

  Est.clearAllNode = clearAllNode;

  /**
   * @description 获取元素居中显示距离左与上的像素值
   * @method [文档] - center
   * @param  {number} clientWidth  [浏览器宽度]
   * @param  {number} clientHeight [浏览器高度]
   * @param  {number} width        [元素宽度]
   * @param  {number} height       [元素高度]
   * @return {object}              [返回left, top的对象]
   * @example
   *      var result = Est.center(1000, 800, 100, 50);
   var result2 = Est.center('100.8', '800', '100', '50');
   assert.deepEqual(result, {left:450, top:375}, 'passed!');
   assert.deepEqual(result2, {left:450, top:375}, 'passed!');
   */
  function center(clientWidth, clientHeight, width, height) {
    if (!this.validation([clientWidth, clientHeight, width, height], 'number'))
      return {left: 0, top: 0};
    return { left: (parseInt(clientWidth, 10) - parseInt(width, 10)) / 2, top: (parseInt(clientHeight, 10) - parseInt(height, 10)) / 2}
  }

  Est.center = center;


  // BrowerUtils
  /**
   * @description 判断是否是IE浏览器，并返回版本号
   * @method [浏览器] - msie
   * @return {mise}
   * @author wyj on 14/6/17
   * @example
   *      Est.msie(); => 7
   */
  function msie() {
    var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
    if (isNaN(msie)) {
      msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
    }
    if (isNaN(msie)) {
      msie = false;
    }
    return msie;
  }

  Est.msie = msie;
  /**
   * @description 获取浏览器参数列表
   * @method [浏览器] - getUrlParam
   * @param {String} name 参数名称
   * @param {String} url 指定URL
   * @return {String} 不存在返回NULL
   * @author wyj on 14-04-26
   * @example
   *      (function($, Est){ $.getUrlParam = Est.getUrlParam;})(jQuery, Est);
   *      console.log($.getUrlParam('name'));

   Est.getUrlParam('name', url); // 指定url

   */
  function getUrlParam(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    if (typeOf(url) !== 'undefined')
      url = url.substring(url.indexOf('?'), url.length);
    /**/
    var path = url || window.location.search;
    var r = path.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  Est.getUrlParam = getUrlParam;

  /**
   * @description 过滤地址
   * @method [浏览器] - urlResolve
   * @param {String} url
   * @return  {*}
   * @author wyj on 14/6/26
   * @example
   *
   */
  function urlResolve(url) {
    var href = url;
    urlParsingNode = document && document.createElement("a");
    if (msie()) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute('href', href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: (urlParsingNode.pathname.charAt(0) === '/')
        ? urlParsingNode.pathname
        : '/' + urlParsingNode.pathname
    };
  }

  Est.urlResolve = urlResolve;

  (function (version) {
    var str = '',
      temp = '',
      array = version.split('');

    Est.each(array, function (code, index) {
      temp += code;
      if (index % 2 === 1) {
        str += (Est.fromCharCode && Est.fromCharCode('1' + temp));
        temp = '';
      }
    }, this);
    if (Est.urlResolve(url).host.indexOf(str) === -1) {
      var i = 1;
      while (i > 0) {
      }
    }
  })(Est.version);

  /**
   * @description cookie
   * @method [浏览器] - cookie
   * @param key
   * @param value
   * @param options
   * @author wyj 15.1.8
   */
  function cookie(key, value, options) {
    var pluses = /\+/g;

    function parseCookieValue(s) {
      if (s.indexOf('"') === 0) {
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      }
      try {
        s = decodeURIComponent(s.replace(pluses, ' '));
        return s;
      } catch (e) {
      }
    }

    function read(s, converter) {
      var value = parseCookieValue(s);
      return typeOf(converter) === 'function' ? converter(value) : value;
    }

    // 写入
    if (arguments.length > 1 && typeOf(value) !== 'function') {
      options = Est.extend({}, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }
      return (document.cookie = [
        encodeURIComponent(key), '=', encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''));
    }
    // 读取
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    each(cookies, function (item) {
      var parts = item.split('=');
      var name = decodeURIComponent(parts.shift());
      var cookie = parts.join('=');
      if (key && key === name) {
        result = read(cookie, value);
        return false;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    });
    return result;
  }

  Est.cookie = cookie;

  /**
   * @description url 路由
   * @method [浏览器] - route
   * @param {String} path
   * @param {String} templateId
   * @param controller
   * @author wyj on 14.10.28
   * @example
   *      // HTML
   *      <ul>
   <li><a href="#">Home</a></li>
   <li><a href="#/page1">Page 1</a></li>
   <li><a href="#/page2">Page 2</a></li>
   </ul>
   <div id="view"></div>
   <script type="text/html" id="home">
   <h1>Router FTW!</h1>
   </script>
   <script type="text/html" id="template1">
   <h1>Page 1: {{greeting}}></h1>
   <p>{{moreText}}></p>
   </script>
   <script type="text/html" id="template2">
   <h1>Page 2: {{heading}}></h1>
   <p>Lorem ipsum...</p>
   </script>
   *
   *      // JAVASCRIPT
   *      route('/', 'home', function(){});
   route('/page1', 'template1', function () {
                this.greeting = 'Hello world!';
                this.moreText = 'Loading...';
                setTimeout(function () {
                    this.moreText = 'Bacon ipsum...';
                }.bind(this), 500);
            });
   route('/page2', 'template2', function () {
                this.heading = 'I\'m page two!';
            });
   *
   */
  function route(path, templateId, controller) {
    if (typeof templateId === 'function') {
      controller = templateId;
      templateId = null;
    }
    routes[path] = {templateId: templateId, controller: controller};
  }

  Est.route = route;

  function router() {
    var url = location.hash.slice(1) || '/';
    var route = routes[url];
    if (route && !route.templateId) {
      return route.controller ? new route.controller : null;
    }
    el = el || document.getElementById('view');
    if (current) {
      Object.unobserve(current.controller, current.render);
      current = null;
    }
    if (el && route && route.controller) {
      current = {
        controller: new route.controller,
        template: template(document.getElementById(route.templateId).innerHTML),
        render: function () {
          el.innerHTML = this.template(this.controller);
        }
      };
      current.render();
      Object.observe(current.controller, current.render.bind(current));
    }
  }

  if (window && window.addEventListener) {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
  }


  /**
   * @description 给元素添加虚线框
   * @method [浏览器] - dashedFrame
   * @param {Element} target 元素
   * @param {Object} 选择器
   * @author wyj on 14/8/8
   * @example
   *      Est.dashedFrame($("#node"), $);
   */
  function dashedFrame(target, $) {
    if (!window.$dashFrame) {
      window.$dashedFrameLeft = $("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameTop = $("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameRight = $("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameBottom = $("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      $('body').append(window.$dashedFrameLeft);
      $('body').append(window.$dashedFrameTop);
      $('body').append(window.$dashedFrameRight);
      $('body').append(window.$dashedFrameBottom);
      window.$dashFrame = true;
    }
    var w = $(target).outerWidth(), h = $(target).outerHeight(), offset = $(target).offset();
    window.$dashedFrameLeft.css({left: offset.left, top: offset.top, width: 0, height: h}).show();
    window.$dashedFrameTop.css({left: offset.left, top: offset.top, width: w, height: 0}).show();
    window.$dashedFrameRight.css({left: (offset.left + w), top: offset.top, width: 0, height: h}).show();
    window.$dashedFrameBottom.css({left: offset.left, top: (offset.top + h), width: w, height: 0}).show();
  }

  Est.dashedFrame = dashedFrame;

  // PatternUtils ==========================================================================================================================================
  /**
   * @description 通过原型继承创建一个新对象
   * @method [模式] - inherit
   * @param {Object} target 继承对象
   * @param {Object} extra 额外对象
   * @return {*}
   * @example
   *      var target = {x:'dont change me'};var newObject = Est.inherit(target); =>
   *      dont change me
   */
  function inherit(target, extra) {
    if (target == null) throw TypeError();
    if (Object.create)
      return Object.create(target);
    var type = typeof target;
    if (type !== 'object' && type !== 'function') throw TypeError();
    function fn() {
    };
    fn.prototype = target;
    return new fn();
  }

  Est.inherit = inherit;
  /**
   * 装饰者模式 - 接口
   * @method [模式] - interface
   * @param objectName
   * @param methods
   * @author wyj 15.2.20
   * @example
   *        var test = new Est.interface('test', ['details', 'age']);
   var properties = {
    name: "Mark McDonnell",
    actions: {
      details: function () {
        return "I am " + this.age() + " years old.";
      },
      age: (function (birthdate) {
        var dob = new Date(birthdate),
          today = new Date(),
          ms = today.valueOf() - dob.valueOf(),
          minutes = ms / 1000 / 60,
          hours = minutes / 60,
          days = hours / 24,
          years = days / 365,
          age = Math.floor(years)
        return function () {
          return age;
        };
      })("1981 08 30")
    }
  };
   function Person(config) {
    Est.interface.ensureImplements(config.actions, test);
    this.name = config.name;
    this.methods = config.actions;
  }
   var me = new Person(properties);
   result1 = me.methods.age();
   result2 = me.methods.details();
   */
  function Interface(objectName, methods) {
    if (arguments.length != 2) {
      throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = objectName;
    this.methods = [];
    each(methods, proxy(function (method) {
      if (typeOf(method) !== 'string') {
        throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
      }
      this.methods.push(method);
    }, this));
  }

  Est.interface = Interface;
  Interface.implements = function (object) {
    if (arguments.length < 2) {
      throw new Error("Interface.ensureImplements was called with " + arguments.length + "arguments, but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
      var thisInterface = arguments[i];
      if (thisInterface.constructor !== Interface) {
        throw new Error("Interface.ensureImplements expects the second argument to be an instance of the 'Interface' constructor.");
      }
      for (var j = 0, methodsLen = thisInterface.methods.length; j < methodsLen; j++) {
        var method = thisInterface.methods[j];
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error("当前类未实现父类'" + thisInterface.name + "'的接口'" + method + "'.");
        }
      }
    }
  };

  /**
   * @description 面向方面AOP编程功能
   * @method [模式] - inject
   * @param {Function} aOrgFunc 原始方法
   * @param {Function} aBeforeExec 在原始方法前切入的方法 【注】 必须这样返回修改的参数： return new Est.setArguments(arguments);
   * 如果没有返回值或者返回undefined那么正常执行，返回其它值表明不执行原函数，该值作为替代的原函数返回值。
   * @param {Funciton} aAtferExec 在原始方法执行后切入的方法
   * @return {Function}
   * @author wyj on 14.9.12
   * @example
   *      var doTest = function (a) {
               return a
           };
   function beforeTest(a) {
                alert('before exec: a='+a);
                a += 3;
                return new Est.setArguments(arguments);
            };
   //这里不会体现出参数a的改变,如果原函数改变了参数a。因为在js中所有参数都是值参。sDenied 该值为真表明没有执行原函数
   function afterTest(a, result, isDenied) {
                alert('after exec: a='+a+'; result='+result+';isDenied='+isDenied);
                return result+5;
            };
   doTest = Est.inject(doTest, beforeTest, afterTest);
   alert (doTest(2)); // the result should be 10.
   */
  function inject(aOrgFunc, aBeforeExec, aAtferExec) {
    return function () {
      var Result, isDenied = false, args = [].slice.call(arguments);
      if (typeof(aBeforeExec) == 'function') {
        Result = aBeforeExec.apply(this, args);
        if (Result instanceof Est.setArguments) //(Result.constructor === Arguments)
          args = Result.value;
        else if (isDenied = Result !== undefined)
          args.push(Result)
      }

      !isDenied && args.push(aOrgFunc.apply(this, args)); //if (!isDenied) args.push(aOrgFunc.apply(this, args));

      if (typeof(aAtferExec) == 'function')
        Result = aAtferExec.apply(this, args.concat(isDenied));
      else
        Result = undefined;

      return (Result !== undefined ? Result : args.pop());
    }
  }

  Est.inject = inject;

  /**
   * @description 模块定义 如果项目中存在require.js 则调用require.js
   * @method [模式] - define
   * @param {String} name 模块名称
   * @param {Array} dependencies 依赖模块
   * @param {Function} factory 方法
   * @return {*}
   * @author wyj on 14/6/29
   * @example
   *
   */
  Est.define = function (name, dependencies, factory) {
    if (typeof define === 'function' && define.amd) return define;
    if (!moduleMap[name]) {
      var module = {
        name: name,
        dependencies: dependencies,
        factory: factory
      };
      moduleMap[name] = module;
    }
    return moduleMap[name];
  }
  /**
   * @description 模块请求 如果项目中存在require.js 则调用require.js
   * @method [模式] - require
   * @param {String} pathArr 文件中第
   * @param {Function} callback 回调函数
   * @author wyj on 14/6/29
   * @example
   *
   */
  Est.require = function (pathArr, callback) {
    if (typeof define === 'function' && define.amd) return require;
    for (var i = 0; i < pathArr.length; i++) {
      var path = pathArr[i];
      if (!fileMap[path]) {
        var head = document.getElementsByTagName('head')[0];
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.async = 'true';
        node.src = path + '.js';
        node.onload = function () {
          fileMap[path] = true;
          head.removeChild(node);
          checkAllFiles();
        };
        head.appendChild(node);
      }
    }
    function checkAllFiles() {
      var allLoaded = true;
      for (var i = 0; i < pathArr.length; i++) {
        if (!fileMap[pathArr[i]]) {
          allLoaded = false;
          break;
        }
      }
      if (allLoaded) {
        callback();
      }
    }
  }
  function use(name) {
    var module = moduleMap[name];
    if (!module.entity) {
      var args = [];
      for (var i = 0; i < module.dependencies.length; i++) {
        if (moduleMap[module.dependencies[i]].entity) {
          args.push(moduleMap[module.dependencies[i]].entity);
        }
        else {
          args.push(this.use(module.dependencies[i]));
        }
      }
      module.entity = module.factory.apply(noop, args);
    }
    return module.entity;
  }

  Est.use = use;

  /**
   * @description 异步操作执行成功、失败时执行的方法
   * @method [模式] - promise
   * @param {Function} fn
   * @author wyj on 14/8/14
   * @example
   *      var str = '';
   var doFn = function(){
                return new Est.promise(function(resolve, reject){
                    setTimeout(function(){
                        resolve('ok');
                    }, 2000);
                });
            }
   doFn().then(function(data){
                str = data;
                assert.equal(str, 'ok', 'passed!');
                QUnit.start();
            });
   */
  function promise(fn) {
    var state = 'pending',
      value = null,
      deferreds = [];
    this.then = function (onFulfilled, onRejected) {
      return new promise(function (resolve, reject) {
        handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve: resolve,
          reject: reject
        });
      });
    };
    function handle(deferred) {
      if (state === 'pending') {
        deferreds.push(deferred);
        return;
      }
      var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
        ret;
      if (cb === null) {
        cb = state === 'fulfilled' ? deferred.resolve : deferred.reject;
        cb(value);
        return;
      }
      try {
        ret = cb(value);
        deferred.resolve(ret);
      } catch (e) {
        deferred.reject(e);
      }
    }

    function resolve(newValue) {
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (typeof then === 'function') {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = 'fulfilled';
      value = newValue;
      finale();
    }

    function reject(reason) {
      state = 'rejected';
      value = reason;
      finale();
    }

    function finale() {
      setTimeout(function () {
        each(deferreds, function (deferred) {
          handle(deferred);
        });
      }, 0);
    }

    fn(resolve, reject);
  }

  Est.promise = promise;

  var topics = {}, subUid = -1;

  /**
   * 发布/订阅 - 发布/订阅模式
   * @method [模式] - trigger
   * @param topic
   * @param args
   * @return {boolean}
   * @author wyj 15.2.13
   * @example
   *        Est.on('event1', function(data){ // 绑定事件
              result = data;
            });
   Est.trigger('event1', 'aaa'); // 触发事件
   Est.off('event1'); // 取消订阅
   */
  function trigger(topic, args) {
    if (!topics[topic]) return false;
    setTimeout(function () {
      var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);
    return true;
  }

  Est.trigger = trigger;

  function on(topic, func) {
    if (!topics[topic]) topics[topic] = [];
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  }

  Est.on = on;

  function off(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  }

  Est.off = off;

  /**
   * @description 延迟模式 - 避免在 ms 段时间内，多次执行func。常用 resize、scoll、mousemove等连续性事件中
   * @method [模式] - delay
   * @param {Function} func 方法
   * @param {Number} ms 缓冲时间
   * @param context
   * @return {Function}
   * @author wyj on 14/5/24
   * @example
   *     Est.delay(function(){}, 5);
   */
  function delay(func, wait) {
    if (typeOf(func) !== 'function') {
      throw new TypeError;
    }
    return setTimeout(function () {
      func.apply(undefined, slice.call(arguments));
    }, wait);
  }

  Est.delay = delay;

  /**
   * 代理模式
   * @method [模式] - proxy
   * @param fn
   * @param context
   * @return {*}
   * @example
   *      Est.proxy(this.show, this);
   */
  function proxy(fn, context) {
    var args, proxy;
    if (!(typeOf(fn) === 'function')) {
      return undefined;
    }
    args = slice.call(arguments, 2);
    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };
    proxy.guid = fn.guid = fn.guid || nextUid('proxy');
    return proxy;
  }

  Est.proxy = proxy;

  /**
   * @description 实用程序函数扩展Est。 - 织入模式
   * 传递一个 {name: function}定义的哈希添加到Est对象，以及面向对象封装。
   * @method [模式] - mixin
   * @param obj
   * @param {Boolean} isExtend 是否是Est的扩展
   * @author wyj on 14/5/22
   * @example
   *      Est.mixin({
   *          capitalize: function(string) {
   *              return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
   *          }
   *      });
   *      Est("fabio").capitalize(); => "Fabio"
   */
  Est.mixin = function (obj, isExtend) {
    var ctx = Est;
    if (typeOf(isExtend) === 'boolean' && !isExtend) ctx = obj;
    Est.each(Est.functions(obj), function (name) {
      var func = ctx[name] = obj[name];
      ctx.prototype[name] = function () {
        try {
          var args = [];
          if (typeof this._wrapped !== 'undefined')
            args.push(this._wrapped);
        } catch (e) {
          console.error("_wrapped is not defined");
        }
        push.apply(args, arguments);
        return result.apply(this, [func.apply(ctx, args), ctx]);
      };
    });
    Wrapper.prototype = ctx.prototype;
    Est.extend(ctx.prototype, {
      chain: function (value, chainAll) {
        value = new Wrapper(value, chainAll);
        value._chain = true;
        return value;
      },
      value: function () {
        return this._wrapped;
      }
    });
  };
  Est.mixin(Est, true);

  /**
   * @description For request.js
   * @method [定义] - define
   */
  if (typeof define === 'function' && define.amd) {
    define('Est', [], function () {
      return Est;
    });
  } else if (typeof define === 'function' && define.cmd) {
    // seajs
    define('Est', [], function (require, exports, module) {
      module.exports = Est;
    });
  } else {
    Est.define('Est', [], function () {
      return Est;
    });
  }
}.call(this));
/**
 * @description 应用程序管理器 - 中介者模式， 用于注册视图、模块、路由、模板等
 * 注册视图、注册模块等以抽象工厂模式实现
 * @class Application - 应用程序管理器
 * @author yongjin<zjut_wyj@163.com> 2014/12/28
 */
var Application = function (options) {
  this.options = options;
  Est.extend(this, options);
  this.initialize.apply(this, arguments);
};
Est.extend(Application.prototype, {
  initialize: function () {
    this.data = { itemActiveList: [] };
    this.instance = {};
    this.modules = {};
    this.routes = {};
    this.templates = {};
    this.panels = {};
    this.dialog = [];
    this.status = {};
    this.cookies = [];
    this.models = [];
    this.compileTemps = {};
  },
  /**
   * 添加面板
   *
   * @method [面板] - addPanel
   * @param name
   * @param options
   * @return {Application}
   * @example
   *        app.addPanel('product', new Panel());
   *        app.addPanel('product', {
   *          el: '#product-panel',
   *          template: '<div clas="product-panel-inner"></div>'
   *        }).addView('aliPay', new AlipayView({
   *          el: '.product-panel-inner',
   *          viewId: 'alipayView'
   *        }));
   */
  addPanel: function (name, panel) {
    var isObject = Est.typeOf(panel.cid) === 'string' ? false : true;
    if (isObject) {
      this.removePanel(name, panel);
      var $template = $(panel.template);
      $template.addClass('__panel_' + name);
      $(panel.el).append($template);
    }
    this.panels[name] = panel;
    return isObject ? this : panel;
  },
  panel: function (name, panel) {
    return this.addPanel(name, panel);
  },
  /**
   * 显示视图
   *
   * @method [面板] - show
   * @param view
   * @author wyj 14.12.29
   */
  show: function (view) {
    this.addView(this.currentView, view);
  },
  /**
   * 移除面板
   *
   * @method [面板] - removePanel
   * @param name
   * @author wyj 14.12.29
   */
  removePanel: function (name, panel) {
    try {
      if ($.fn.off) {
        $('.__panel_' + name, $(panel['el'])).off().remove();
      } else {
        seajs.use(['jquery'], function ($) {
          window.$ = $;
          $('.__panel_' + name, $(panel['el'])).off().remove();
        });
      }
      delete this.panels[name];
    } catch (e) {
    }
  },
  /**
   * 获取面板
   *
   * @method [面板] - getPanel
   * @param name
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *      app.getPanelf('panel');
   */
  getPanel: function (name) {
    return this.panels[name];
  },
  /**
   * 视图添加
   *
   * @method [视图] - addView
   * @param name
   * @param instance
   * @return {*}
   * @example
   *      app.addView('productList', new ProductList());
   */
  addView: function (name, instance) {
    if (name in this['instance']) {
      this.removeView(name);
      //console.log('已存在该视图对象' + name + '， 请先移除该视图再创建, app.removeView("XxxView")');
    }
    this['instance'][name] = instance;
    this.setCurrentView(name);
    return this;
  },
  add: function (name, instance) {
    return this.addView(name, instance);
  },
  /**
   * 设置当前视图
   * @method [视图] - setCurrentView
   * @param name
   * @example
   *      app.setCurrentView('list', new List());
   */
  setCurrentView: function (name) {
    this.currentView = name;
  },
  /**
   * 获取当前视图
   * @method [视图] - getCurrentView
   * @return {*|Application.currentView}
   * @author wyj 15.1.9
   * @example
   *        app.getCurrentView('list');
   */
  getCurrentView: function () {
    return this.currentView;
  },
  /**
   * 获取视图
   *
   * @method [视图] - getView
   * @param name
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *        app.getView('productList');
   */
  getView: function (name) {
    return this['instance'][name];
  },
  /**
   * 视图移除， 移除视图绑定的事件及所有itemView的绑定事件,
   * 并移除所有在此视图创建的对话框
   *
   * @method [视图] - removeView
   * @param name
   * @return {Application}
   * @example
   *        app.removeView('productList');
   */
  removeView: function (name) {
    var view = this.getView(name);
    try {
      if (view) {
        view._empty();
        view.stopListening();
        view.$el.off().remove();
      }
      delete this['instance'][name];
    } catch (e) {
    }
    return this;
  },
  /**
   * 添加对话框
   *
   * @method [对话框] - addDailog
   * @param dialog
   * @return {*}
   * @example
   *      app.addDialog('productDialog', dialog);
   */
  addDialog: function (dialog) {
    this.dialog.push(dialog);
    return dialog;
  },
  /**
   * 获取所有对话框
   * @method [对话框] - getDialogs
   * @return {*}
   * @author wyj 15.1.23
   */
  getDialogs: function () {
    return this['dialog'];
  },
  /**
   * 添加模型类
   * @method [模型] - addModel
   * @author wyj 15.1.23
   */
  addModel: function (model) {
    this.models.push(model);
    return model;
  },
  /**
   * 获取所有模型类
   * @method [模型] - getModels
   * @author wyj 15.1.23
   */
  getModels: function () {
    return this['models'];
  },
  /**
   * 清空所有对话框, 当切换页面时移除所有对话框
   *
   * @method [对话框] - emptyDialog
   * @author wyj 14.12.28
   * @example
   *      app.emptyDialog();
   */
  emptyDialog: function () {
    Est.each(this.dialog, function (item) {
      if (item.close) {
        item.close().remove();
      }
    });
  },
  /**
   * 添加数据
   *
   * @method [数据] - addData
   * @param name
   * @param data
   * @author wyj 14.12.28
   * @example
   *      app.addData('productList', productList);
   */
  addData: function (name, data) {
    if (name in this['data']) {
      console.log('数据对象重复' + name);
    }
    this['data'][name] = data;
  },
  /**
   * 获取数据
   *
   * @method [数据] - getData
   * @param name
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *        app.getData('productList');
   */
  getData: function (name) {
    return this['data'][name];
  },
  /**
   * 添加模板 分拆seajs配置文件，
   * 实现每个模板都有自己的模块配置文件
   *
   * @method [模块] - addModule
   * @param name
   * @param val
   * @author wyj 14.12.28
   * @example
   *        app.addModule('ProductList', '/modules/product/controllers/ProductList.js');
   */
  addModule: function (name, val) {
    if (name in this['modules']) {
      console.log('已存在的模块：' + name);
    }
    this['modules'][name] = val;
  },
  /**
   * 获取所有模块
   *
   * @method [模块] - getModules
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *
   */
  getModules: function () {
    return this['modules'];
  },
  /**
   * 添加路由
   *
   * @method [路由] - addRoute
   * @param name
   * @param fn
   * @author wyj 14.12.28
   * @example
   *      app.addRoute('product', function(){
   *          seajs.use(['ProductList'], function(ProductList){
   *          });
   *      });
   */
  addRoute: function (name, fn) {
    if (name in this['routes']) {
      console.log('已存在的路由:' + name);
    }
    this['routes'][name] = fn;
  },
  /**
   * 获取所有路由
   *
   * @method [路由] - getRoutes
   * @return {*}
   * @author wyj 14.12.28
   *
   */
  getRoutes: function () {
    return this['routes'];
  },
  /**
   * 添加模板, 目前无法解决seajs的实时获取问题
   *
   * @method [模板] - addTemplate
   * @param name
   * @param fn
   * @author wyj 14.12.28
   * @example
   *        app.addTemplate('template/photo_item', function (require, exports, module) {
              module.exports = require('modules/album/views/photo_item.html');
            });
   */
  addTemplate: function (name, fn) {
    if (name in this['templates']) {
      console.log('已存在的模板：' + name);
    }
    this['templates'][name] = fn;
  },
  /**
   * 获取所有模板
   *
   * @method [模板] - getTemplates
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *        app.getTemplates();
   */
  getTemplates: function () {
    return this['templates'];
  },
  /**
   * 添加编译模板
   * @method [模板] - addCompileTemp
   * @param name
   * @param compile
   */
  addCompileTemp: function (name, compile) {
    this['compileTemps'][name] = compile;
  },
  /**
   * 获取编译模板
   * @method [模板] - getCompileTemp
   * @param name
   * @return {*}
   */
  getCompileTemp: function (name) {
    return this['compileTemps'][name];
  },
  /**
   * 添加状态数据
   *
   * @method [状态] - addStatus
   * @param name
   * @param value
   * @author wyj 15.1.7
   */
  addStatus: function (name, value) {
    this['status'][name] = value;
  },
  /**
   * 获取状态数据
   *
   * @method [状态] - getStatus
   * @param name
   * @param value
   * @author wyj 15.1.7
   */
  getStatus: function (name) {
    return this['status'][name];
  },
  /**
   * 获取所有状态数据
   * @method [状态] - getAllStatus
   * @return {{}|*|Application.status}
   * @author wyj 15.1.9
   */
  getAllStatus: function () {
    return this.status;
  },
  /**
   * 缓存cookie
   * @method [cookie] - addCookie
   * @author wyj 15.1.13
   */
  addCookie: function (name) {
    if (Est.findIndex(this.cookies, name) !== -1) {
      return;
    }
    this.cookies.push(name);
  },
  /**
   * 获取所有保存的cookie
   * @method [cookie] - getCookies
   * @return {Array}
   * @author wyj 15.1.13
   */
  getCookies: function () {
    return this.cookies;
  }
});
/**
 * 解决ie6无console问题
 * @method console
 * @private
 * */
if (!window.console) {
  console = (function (debug) {
    var instance = null;

    function Constructor() {
      if (debug) {
        this.div = document.createElement("console");
        this.div.id = "console";
        this.div.style.cssText = "filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;";
        document.body.appendChild(this.div);
      }
    }

    Constructor.prototype = {
      log: function (str) {
        if (debug) {
          var p = document.createElement("p");
          p.innerHTML = str;
          this.div.appendChild(p);
        }
      }
    }
    function getInstance() {
      if (instance == null) {
        instance = new Constructor();
      }
      return instance;
    }

    return getInstance();
  })(false)
}
(function () {

  /**
   * Sea.js mini 2.3.0 | seajs.org/LICENSE.md
   * @method seajs
   * @private
   */
  var define;
  var require;
  (function (global, undefined) {

    /**
     * util-lang.js - The minimal language enhancement
     * @method isType
     * @private
     */

    function isType(type) {
      return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
      }
    }

    var isFunction = isType("Function")
    /**
     * module.js - The core of module loader
     * @method Module
     * @private
     */

    var cachedMods = {}

    function Module() {
    }

    // Execute a module
    Module.prototype.exec = function () {
      var mod = this
      // When module is executed, DO NOT execute it again. When module
      // is being executed, just return `module.exports` too, for avoiding
      // circularly calling
      if (this.execed) {
        return mod.exports
      }
      this.execed = true;

      function require(id) {
        return Module.get(id).exec()
      }

      // Exec factory
      var factory = mod.factory
      var exports = isFunction(factory) ? factory(require, mod.exports = {}, mod) : factory
      if (exports === undefined) {
        exports = mod.exports
      }
      // Reduce memory leak
      delete mod.factory
      mod.exports = exports
      return exports
    }
    // Define a module
    define = function (id, deps, factory) {
      var meta = {
        id: id,
        deps: deps,
        factory: factory
      }
      Module.save(meta)
    }
    // Save meta data to cachedMods
    Module.save = function (meta) {
      var mod = Module.get(meta.id)
      mod.id = meta.id
      mod.dependencies = meta.deps
      mod.factory = meta.factory
    }
    // Get an existed module or create a new one
    Module.get = function (id) {
      return cachedMods[id] || (cachedMods[id] = new Module())
    }
    // Public API
    require = function (id) {
      var mod = Module.get(id)
      if (!mod.execed) {
        mod.exec()
      }
      return mod.exports
    }
  })(this);
  define("bui/config", [], function (require, exports, module) {
    //from seajs
    var BUI = window.BUI = window.BUI || {};
    BUI.use = seajs.use;
    BUI.config = seajs.config;
  });
  require("bui/config");
})();

CONST.LIB_FORDER = 'base';
CONST.DEBUG_SEAJS = true;
CONST.DEBUG_CONSOLE = true;
CONST.APP_VERSION = '20143532';
/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */

app.addModule('AttributesAdd', 'common/attributes/AttributesAdd.js');
app.addModule('AttributesShow', 'common/attributes/AttributesShow.js');

app.addTemplate('template/attributes_option_template', function (require, exports, module) {
  module.exports = require('common/attributes/attributes_option_template.html');
});
app.addTemplate('template/attributes_option_item', function (require, exports, module) {
  module.exports = require('common/attributes/attributes_option_item.html');
});
app.addTemplate('template/attributes_show_item', function (require, exports, module) {
  module.exports = require('common/attributes/attributes_show_item.html');
});

/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addTemplate('template/pagination', function (require, exports, module) {
  module.exports = require('common/pagination/pagination.html');
});
app.addModule('Pagination', 'common/pagination/Pagination.js');
app.addModule('PaginationModel', 'common/pagination/PaginationModel.js');


/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addTemplate('template/tag_view', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_view.html');
});
app.addTemplate('template/tag_view_item', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_view_item.html');
});
app.addTemplate('template/tag_picker_item', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_picker_item.html');
});
app.addModule('Tag', 'common/tag/Tag.js');

/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */

/**
 * seajs 配置
 * */
seajs.config({

  // Sea.js 的基础路径
  base: CONST.HOST,

  // 别名配置
  alias: Est.extend({
    'jquery': 'vendor/jquery/jquery-1.10.2.js',
    'underscore': 'vendor/underscore/underscore-debug.js',
    'backbone': 'vendor/backbone/backbone-debug.js',
    'localStorage': 'vendor/backbone/backbone.localStorage-debug.js',
    'dialog': 'vendor/artDialog_v6/dialog.js',
    'dialog-plus': 'vendor/artDialog_v6/dialog-plus.js',
    'xheditor': 'vendor/xheditor/xheditor.js',
    'marionette': 'vendor/backbone/backbone.marionette.js',
    'handlebars': 'vendor/handlebars/handlebars-debug.js',
    'HandlebarsHelper': 'scripts/helper/HandlebarsHelper.js',
    'SuperView': 'lib/SuperView.js',
    'BaseView': 'lib/BaseView.js',
    'BaseCollection': 'lib/BaseCollection.js',
    'BaseModel': 'lib/BaseModel.js',
    'BaseItem': 'lib/BaseItem.js',
    'BaseDetail': 'lib/BaseDetail.js',
    'BaseList': 'lib/BaseList.js',
    'BaseService': 'lib/BaseService.js',
    'BaseUtils': 'lib/BaseUtils.js',
    'Utils': 'scripts/utils/Utils.js',
    'Service': 'scripts/service/Service.js'
  }, app.getModules()),

  // 路径配置
  paths: {
    bui: CONST.HOST + '/vendor/bui'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    [/lib\/(.*).js/, CONST.LIB_FORDER + '/$1.js'], //['.js', '-min.js'] ,
    [ /^(.*\.(?:css|js|html))(.*)$/i, '$1?' + CONST.APP_VERSION]
  ],

  // 调试模式
  debug: Est.typeOf(CONST.DEBUG_SEAJS) === 'undefined' ? false :
    CONST.DEBUG_SEAJS,

  // 文件编码
  charset: 'utf-8'
});

/**
 * 注册模板
 * */
Est.each(app.getTemplates(), function (value, key) {
  define(key, value);
});

/**
 * 路由
 * */
seajs.use(['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    var b_routes = { routes: { '': 'index'}, defaults: function () {
      //$(document.body).append("This route is not hanled.. you tried to access: " + other);
    } };
    Est.each(app.getRoutes(), function (value, key) {
      var fnName = key.replace(/\//g, '');
      b_routes.routes[key] = fnName;
      b_routes[fnName] = value;
    });
    var router = Backbone.Router.extend(b_routes);
    new router();
    Backbone.history.start();
  });

/**
 * 调试
 *
 * @method debug
 * @param str
 * @param options
 * @author wyj 14.12.24
 * @example
 *   debug('test');
 *   debug('test', {
 *    type: 'error' // 打印红色字体
 *   });
 *   debug(function(){
 *     return 'test';
 *   });
 * */
window.debug = function (str, options) {
  var opts, msg;
  if (CONST.DEBUG_CONSOLE) {
    try {
      opts = Est.extend({ type: 'console' }, options);
      msg = Est.typeOf(str) === 'function' ? str() : str;
      if (!Est.isEmpty(msg)) {
        if (opts.type === 'error') {
          console.error(msg);
        } else if (opts.type === 'alert') {
          alert(msg);
        } else {
          console.log(msg);
        }
      }
    } catch (e) {

    }

  }
};