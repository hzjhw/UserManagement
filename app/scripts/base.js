!function (e, t) {
  function n(e) {
    return function (t) {
      return{}.toString.call(t) == "[object " + e + "]"
    }
  }

  function r() {
    return A++
  }

  function i(e) {
    return e.match(k)[0]
  }

  function o(e) {
    for (e = e.replace(T, "/"), e = e.replace(P, "$1/"); e.match($);)e = e.replace($, "/");
    return e
  }

  function a(e) {
    var t = e.length - 1, n = e.charAt(t);
    return"#" === n ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || "/" === n ? e : e + ".js"
  }

  function u(e) {
    var t = b.alias;
    return t && x(t[e]) ? t[e] : e
  }

  function s(e) {
    var t, n = b.paths;
    return n && (t = e.match(L)) && x(n[t[1]]) && (e = n[t[1]] + t[2]), e
  }

  function c(e) {
    var t = b.vars;
    return t && e.indexOf("{") > -1 && (e = e.replace(C, function (e, n) {
      return x(t[n]) ? t[n] : e
    })), e
  }

  function l(e) {
    var t = b.map, n = e;
    if (t)for (var r = 0, i = t.length; i > r; r++) {
      var o = t[r];
      if (n = j(o) ? o(e) || e : e.replace(o[0], o[1]), n !== e)break
    }
    return n
  }

  function f(e, t) {
    var n, r = e.charAt(0);
    if (O.test(e))n = e; else if ("." === r)n = o((t ? i(t) : b.cwd) + e); else if ("/" === r) {
      var a = b.cwd.match(I);
      n = a ? a[0] + e.substring(1) : e
    } else n = b.base + e;
    return 0 === n.indexOf("//") && (n = location.protocol + n), n
  }

  function d(e, t) {
    if (!e)return"";
    e = u(e), e = s(e), e = c(e), e = a(e);
    var n = f(e, t);
    return n = l(n)
  }

  function p(e) {
    return e.hasAttribute ? e.src : e.getAttribute("src", 4)
  }

  function h(e, t, n) {
    var r = _.createElement("script");
    if (n) {
      var i = j(n) ? n(e) : n;
      i && (r.charset = i)
    }
    g(r, t, e), r.async = !0, r.src = e, z = r, H ? U.insertBefore(r, H) : U.appendChild(r), z = null
  }

  function g(e, t, n) {
    function r() {
      e.onload = e.onerror = e.onreadystatechange = null, b.debug || U.removeChild(e), e = null, t()
    }

    var i = "onload"in e;
    i ? (e.onload = r, e.onerror = function () {
      D("error", {uri: n, node: e}), r()
    }) : e.onreadystatechange = function () {
      /loaded|complete/.test(e.readyState) && r()
    }
  }

  function v() {
    if (z)return z;
    if (B && "interactive" === B.readyState)return B;
    for (var e = U.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
      var n = e[t];
      if ("interactive" === n.readyState)return B = n
    }
  }

  function m(e) {
    var t = [];
    return e.replace(W, "").replace(G, function (e, n, r) {
      r && t.push(r)
    }), t
  }

  function y(e, t) {
    this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
  }

  if (!e.seajs) {
    var w = e.seajs = {version: "2.3.0"}, b = w.data = {}, F = n("Object"), x = n("String"), E = Array.isArray || n("Array"), j = n("Function"), A = 0, S = b.events = {};
    w.on = function (e, t) {
      var n = S[e] || (S[e] = []);
      return n.push(t), w
    }, w.off = function (e, t) {
      if (!e && !t)return S = b.events = {}, w;
      var n = S[e];
      if (n)if (t)for (var r = n.length - 1; r >= 0; r--)n[r] === t && n.splice(r, 1); else delete S[e];
      return w
    };
    var D = w.emit = function (e, t) {
      var n = S[e];
      if (n) {
        n = n.slice();
        for (var r = 0, i = n.length; i > r; r++)n[r](t)
      }
      return w
    }, k = /[^?#]*\//, T = /\/\.\//g, $ = /\/[^/]+\/\.\.\//, P = /([^:/])\/+\//g, L = /^([^/:]+)(\/.+)$/, C = /{([^{]+)}/g, O = /^\/\/.|:\//, I = /^.*?\/\/.*?\//, _ = document, q = location.href && 0 !== location.href.indexOf("about:") ? i(location.href) : "", R = _.scripts, M = _.getElementById("seajsnode") || R[R.length - 1], N = i(p(M) || q);
    w.resolve = d;
    var z, B, U = _.head || _.getElementsByTagName("head")[0] || _.documentElement, H = U.getElementsByTagName("base")[0];
    w.request = h;
    var X, G = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, W = /\\\\/g, V = w.cache = {}, K = {}, Z = {}, J = {}, Y = y.STATUS = {FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6};
    y.prototype.resolve = function () {
      for (var e = this, t = e.dependencies, n = [], r = 0, i = t.length; i > r; r++)n[r] = y.resolve(t[r], e.uri);
      return n
    }, y.prototype.load = function () {
      var e = this;
      if (!(e.status >= Y.LOADING)) {
        e.status = Y.LOADING;
        var n = e.resolve();
        D("load", n);
        for (var r, i = e._remain = n.length, o = 0; i > o; o++)r = y.get(n[o]), r.status < Y.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1 : e._remain--;
        if (0 === e._remain)return e.onload(), t;
        var a = {};
        for (o = 0; i > o; o++)r = V[n[o]], r.status < Y.FETCHING ? r.fetch(a) : r.status === Y.SAVED && r.load();
        for (var u in a)a.hasOwnProperty(u) && a[u]()
      }
    }, y.prototype.onload = function () {
      var e = this;
      e.status = Y.LOADED, e.callback && e.callback();
      var t, n, r = e._waitings;
      for (t in r)r.hasOwnProperty(t) && (n = V[t], n._remain -= r[t], 0 === n._remain && n.onload());
      delete e._waitings, delete e._remain
    }, y.prototype.fetch = function (e) {
      function n() {
        w.request(a.requestUri, a.onRequest, a.charset)
      }

      function r() {
        delete K[u], Z[u] = !0, X && (y.save(o, X), X = null);
        var e, t = J[u];
        for (delete J[u]; e = t.shift();)e.load()
      }

      var i = this, o = i.uri;
      i.status = Y.FETCHING;
      var a = {uri: o};
      D("fetch", a);
      var u = a.requestUri || o;
      return!u || Z[u] ? (i.load(), t) : K[u] ? (J[u].push(i), t) : (K[u] = !0, J[u] = [i], D("request", a = {uri: o, requestUri: u, onRequest: r, charset: b.charset}), a.requested || (e ? e[a.requestUri] = n : n()), t)
    }, y.prototype.exec = function () {
      function e(t) {
        return y.get(e.resolve(t)).exec()
      }

      var n = this;
      if (n.status >= Y.EXECUTING)return n.exports;
      n.status = Y.EXECUTING;
      var i = n.uri;
      e.resolve = function (e) {
        return y.resolve(e, i)
      }, e.async = function (t, n) {
        return y.use(t, n, i + "_async_" + r()), e
      };
      var o = n.factory, a = j(o) ? o(e, n.exports = {}, n) : o;
      return a === t && (a = n.exports), delete n.factory, n.exports = a, n.status = Y.EXECUTED, D("exec", n), a
    }, y.resolve = function (e, t) {
      var n = {id: e, refUri: t};
      return D("resolve", n), n.uri || w.resolve(n.id, t)
    }, y.define = function (e, n, r) {
      var i = arguments.length;
      1 === i ? (r = e, e = t) : 2 === i && (r = n, E(e) ? (n = e, e = t) : n = t), !E(n) && j(r) && (n = m("" + r));
      var o = {id: e, uri: y.resolve(e), deps: n, factory: r};
      if (!o.uri && _.attachEvent) {
        var a = v();
        a && (o.uri = a.src)
      }
      D("define", o), o.uri ? y.save(o.uri, o) : X = o
    }, y.save = function (e, t) {
      var n = y.get(e);
      n.status < Y.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = Y.SAVED, D("save", n))
    }, y.get = function (e, t) {
      return V[e] || (V[e] = new y(e, t))
    }, y.use = function (t, n, r) {
      var i = y.get(r, E(t) ? t : [t]);
      i.callback = function () {
        for (var t = [], r = i.resolve(), o = 0, a = r.length; a > o; o++)t[o] = V[r[o]].exec();
        n && n.apply(e, t), delete i.callback
      }, i.load()
    }, w.use = function (e, t) {
      return y.use(e, t, b.cwd + "_use_" + r()), w
    }, y.define.cmd = {}, e.define = y.define, w.Module = y, b.fetchedList = Z, b.cid = r, w.require = function (e) {
      var t = y.get(y.resolve(e));
      return t.status < Y.EXECUTING && (t.onload(), t.exec()), t.exports
    }, b.base = N, b.dir = N, b.cwd = q, b.charset = "utf-8", w.config = function (e) {
      for (var t in e) {
        var n = e[t], r = b[t];
        if (r && F(r))for (var i in n)r[i] = n[i]; else E(r) ? n = r.concat(n) : "base" === t && ("/" !== n.slice(-1) && (n += "/"), n = f(n)), b[t] = n
      }
      return D("config", e), w
    }
  }
}(this), function () {
  function e(e) {
    u[e.name] = e
  }

  function t(e) {
    return e && u.hasOwnProperty(e)
  }

  function n(e) {
    for (var n in u)if (t(n)) {
      var r = "," + u[n].ext.join(",") + ",";
      if (r.indexOf("," + e + ",") > -1)return n
    }
  }

  function r(e, t) {
    var n = a.XMLHttpRequest ? new a.XMLHttpRequest : new a.ActiveXObject("Microsoft.XMLHTTP");
    return n.open("GET", e, !0), n.onreadystatechange = function () {
      if (4 === n.readyState) {
        if (n.status > 399 && n.status < 600)throw new Error("Could not load: " + e + ", status = " + n.status);
        t(n.responseText)
      }
    }, n.send(null)
  }

  function i(e) {
    e && /\S/.test(e) && (a.execScript || function (e) {
      (a.eval || eval).call(a, e)
    })(e)
  }

  function o(e) {
    return e.replace(/(["\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
  }

  var a = window, u = {}, s = {};
  e({name: "text", ext: [".tpl", ".html"], exec: function (e, t) {
    i('define("' + e + '#", [], "' + o(t) + '")')
  }}), e({name: "json", ext: [".json"], exec: function (e, t) {
    i('define("' + e + '#", [], ' + t + ")")
  }}), e({name: "handlebars", ext: [".handlebars"], exec: function (e, t) {
    var n = ['define("' + e + '#", ["handlebars"], function(require, exports, module) {', '  var source = "' + o(t) + '"', '  var Handlebars = require("handlebars")["default"]', "  module.exports = function(data, options) {", "    options || (options = {})", "    options.helpers || (options.helpers = {})", "    for (var key in Handlebars.helpers) {", "      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]", "    }", "    return Handlebars.compile(source)(data, options)", "  }", "})"].join("\n");
    i(n)
  }}), seajs.on("resolve", function (e) {
    var r = e.id;
    if (!r)return"";
    var i, o;
    (o = r.match(/^(\w+)!(.+)$/)) && t(o[1]) ? (i = o[1], r = o[2]) : (o = r.match(/[^?]+(\.\w+)(?:\?|#|$)/)) && (i = n(o[1])), i && -1 === r.indexOf("#") && (r += "#");
    var a = seajs.resolve(r, e.refUri);
    i && (s[a] = i), e.uri = a
  }), seajs.on("request", function (e) {
    var t = s[e.uri];
    t && (r(e.requestUri, function (n) {
      u[t].exec(e.uri, n), e.onRequest()
    }), e.requested = !0)
  }), define("seajs/seajs-text/1.1.1/seajs-text-debug", [], {})
}(), function () {
  function e(e) {
    return r[typeof e] || r[String.prototype.toString.call(e)] || (e ? "object" : "null")
  }

  function t(t) {
    return"string" === e(t) ? t.toLowerCase() : t
  }

  function n() {
    var e = parseInt((/msie (\d+)/.exec(t(navigator.userAgent)) || [])[1], 10);
    return isNaN(e) && (e = parseInt((/trident\/.*; rv:(\d+)/.exec(t(navigator.userAgent)) || [])[1], 10)), isNaN(e) && (e = !1), e
  }

  var r = {undefined: "undefined", number: "number", "boolean": "boolean", string: "string", "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array", "[object Date]": "date", "[object Error]": "error", "[object File]": "file", "[object Blob]": "blob"}, i = n();
  if (!(i && 8 > i)) {
    var o, a, u, s, c, l, f, d, p, h, g, v, m, y, w, b, F, x, E, j, A, S, D, k, T, $, P, L, C, O, I, _, q, R, M, N, z, B, U, H, X, G, W, V, K, Z, J, Y, Q = [].slice, et = {}.hasOwnProperty, tt = function (e, t) {
      function n() {
        this.constructor = e
      }

      for (var r in t)et.call(t, r) && (e[r] = t[r]);
      return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
    }, nt = [].indexOf || function (e) {
      for (var t = 0, n = this.length; n > t; t++)if (t in this && this[t] === e)return t;
      return-1
    };
    for (j = {catchupTime: 500, initialRate: .03, minTime: 500, ghostTime: 500, maxProgressPerFrame: 10, easeFactor: 1.25, startOnPageLoad: !0, restartOnPushState: !0, restartOnRequestAfter: 500, target: "body", elements: {checkInterval: 100, selectors: ["body"]}, eventLag: {minSamples: 10, sampleCount: 3, lagThreshold: 3}, ajax: {trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: []}}, L = function () {
      var e;
      return null != (e = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? e : +new Date
    }, O = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, E = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == O && (O = function (e) {
      return setTimeout(e, 50)
    }, E = function (e) {
      return clearTimeout(e)
    }), _ = function (e) {
      var t, n;
      return t = L(), (n = function () {
        var r;
        return r = L() - t, r >= 33 ? (t = L(), e(r, function () {
          return O(n)
        })) : setTimeout(n, 33 - r)
      })()
    }, I = function () {
      var e, t, n;
      return n = arguments[0], t = arguments[1], e = 3 <= arguments.length ? Q.call(arguments, 2) : [], "function" == typeof n[t] ? n[t].apply(n, e) : n[t]
    }, A = function () {
      var e, t, n, r, i, o, a;
      for (t = arguments[0], r = 2 <= arguments.length ? Q.call(arguments, 1) : [], o = 0, a = r.length; a > o; o++)if (n = r[o])for (e in n)et.call(n, e) && (i = n[e], null != t[e] && "object" == typeof t[e] && null != i && "object" == typeof i ? A(t[e], i) : t[e] = i);
      return t
    }, b = function (e) {
      var t, n, r, i, o;
      for (n = t = 0, i = 0, o = e.length; o > i; i++)r = e[i], n += Math.abs(r), t++;
      return n / t
    }, D = function (e, t) {
      var n, r, i;
      if (null == e && (e = "options"), null == t && (t = !0), i = document.querySelector("[data-pace-" + e + "]")) {
        if (n = i.getAttribute("data-pace-" + e), !t)return n;
        try {
          return JSON.parse(n)
        } catch (o) {
          return r = o, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
        }
      }
    }, f = function () {
      function e() {
      }

      return e.prototype.on = function (e, t, n, r) {
        var i;
        return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({handler: t, ctx: n, once: r})
      }, e.prototype.once = function (e, t, n) {
        return this.on(e, t, n, !0)
      }, e.prototype.off = function (e, t) {
        var n, r, i;
        if (null != (null != (r = this.bindings) ? r[e] : void 0)) {
          if (null == t)return delete this.bindings[e];
          for (n = 0, i = []; n < this.bindings[e].length;)i.push(this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : n++);
          return i
        }
      }, e.prototype.trigger = function () {
        var e, t, n, r, i, o, a, u, s;
        if (n = arguments[0], e = 2 <= arguments.length ? Q.call(arguments, 1) : [], null != (a = this.bindings) ? a[n] : void 0) {
          for (i = 0, s = []; i < this.bindings[n].length;)u = this.bindings[n][i], r = u.handler, t = u.ctx, o = u.once, r.apply(null != t ? t : this, e), s.push(o ? this.bindings[n].splice(i, 1) : i++);
          return s
        }
      }, e
    }(), null == window.Pace && (window.Pace = {}), A(Pace, f.prototype), C = Pace.options = A({}, j, window.paceOptions, D()), Z = ["ajax", "document", "eventLag", "elements"], G = 0, V = Z.length; V > G; G++)N = Z[G], C[N] === !0 && (C[N] = j[N]);
    p = function (e) {
      function t() {
        return J = t.__super__.constructor.apply(this, arguments)
      }

      return tt(t, e), t
    }(Error), a = function () {
      function e() {
        this.progress = 0
      }

      return e.prototype.getElement = function () {
        var e;
        if (null == this.el) {
          if (!document.querySelector)return;
          if (e = document.querySelector(C.target), !e)throw new p;
          this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != e.firstChild ? e.insertBefore(this.el, e.firstChild) : e.appendChild(this.el)
        }
        return this.el
      }, e.prototype.finish = function () {
        var e;
        return e = this.getElement(), e.className = e.className.replace("pace-active", ""), e.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
      }, e.prototype.update = function (e) {
        return this.progress = e, this.render()
      }, e.prototype.destroy = function () {
        try {
          this.getElement().parentNode.removeChild(this.getElement())
        } catch (e) {
          p = e
        }
        return this.el = void 0
      }, e.prototype.render = function () {
        var e, t;
        if (document.querySelector)return null == document.querySelector(C.target) ? !1 : (e = this.getElement(), e.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (e.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? t = "99" : (t = this.progress < 10 ? "0" : "", t += 0 | this.progress), e.children[0].setAttribute("data-progress", "" + t)), this.lastRenderedProgress = this.progress)
      }, e.prototype.done = function () {
        return this.progress >= 100
      }, e
    }(), d = function () {
      function e() {
        this.bindings = {}
      }

      return e.prototype.trigger = function (e, t) {
        var n, r, i, o, a;
        if (null != this.bindings[e]) {
          for (o = this.bindings[e], a = [], r = 0, i = o.length; i > r; r++)n = o[r], a.push(n.call(this, t));
          return a
        }
      }, e.prototype.on = function (e, t) {
        var n;
        return null == (n = this.bindings)[e] && (n[e] = []), this.bindings[e].push(t)
      }, e
    }(), X = window.XMLHttpRequest, H = window.XDomainRequest, U = window.WebSocket, S = function (e, t) {
      var n, r, i, o;
      o = [];
      for (r in t.prototype)try {
        i = t.prototype[r], o.push(null == e[r] && "function" != typeof i ? e[r] = i : void 0)
      } catch (a) {
        n = a
      }
      return o
    }, $ = [], Pace.ignore = function () {
      var e, t, n;
      return t = arguments[0], e = 2 <= arguments.length ? Q.call(arguments, 1) : [], $.unshift("ignore"), n = t.apply(null, e), $.shift(), n
    }, Pace.track = function () {
      var e, t, n;
      return t = arguments[0], e = 2 <= arguments.length ? Q.call(arguments, 1) : [], $.unshift("track"), n = t.apply(null, e), $.shift(), n
    }, M = function (e) {
      var t;
      if (null == e && (e = "GET"), "track" === $[0])return"force";
      if (!$.length && C.ajax) {
        if ("socket" === e && C.ajax.trackWebSockets)return!0;
        if (t = e.toUpperCase(), nt.call(C.ajax.trackMethods, t) >= 0)return!0
      }
      return!1
    }, h = function (e) {
      function t() {
        var e, n = this;
        t.__super__.constructor.apply(this, arguments), e = function (e) {
          var t;
          return t = e.open, e.open = function (r, i) {
            return M(r) && n.trigger("request", {type: r, url: i, request: e}), t.apply(e, arguments)
          }
        }, window.XMLHttpRequest = function (t) {
          var n;
          return n = new X(t), e(n), n
        };
        try {
          S(window.XMLHttpRequest, X)
        } catch (r) {
        }
        if (null != H) {
          window.XDomainRequest = function () {
            var t;
            return t = new H, e(t), t
          };
          try {
            S(window.XDomainRequest, H)
          } catch (r) {
          }
        }
        if (null != U && C.ajax.trackWebSockets) {
          window.WebSocket = function (e, t) {
            var r;
            return r = null != t ? new U(e, t) : new U(e), M("socket") && n.trigger("request", {type: "socket", url: e, protocols: t, request: r}), r
          };
          try {
            S(window.WebSocket, U)
          } catch (r) {
          }
        }
      }

      return tt(t, e), t
    }(d), W = null, k = function () {
      return null == W && (W = new h), W
    }, R = function (e) {
      var t, n, r, i;
      for (i = C.ajax.ignoreURLs, n = 0, r = i.length; r > n; n++)if (t = i[n], "string" == typeof t) {
        if (-1 !== e.indexOf(t))return!0
      } else if (t.test(e))return!0;
      return!1
    }, k().on("request", function (e) {
      var t, n, r, i, a;
      return i = e.type, r = e.request, a = e.url, R(a) ? void 0 : Pace.running || C.restartOnRequestAfter === !1 && "force" !== M(i) ? void 0 : (n = arguments, t = C.restartOnRequestAfter || 0, "boolean" == typeof t && (t = 0), setTimeout(function () {
        var e, t, a, u, s, c;
        if (e = "socket" === i ? r.readyState < 2 : 0 < (u = r.readyState) && 4 > u) {
          for (Pace.restart(), s = Pace.sources, c = [], t = 0, a = s.length; a > t; t++) {
            if (N = s[t], N instanceof o) {
              N.watch.apply(N, n);
              break
            }
            c.push(void 0)
          }
          return c
        }
      }, t))
    }), o = function () {
      function e() {
        var e = this;
        this.elements = [], k().on("request", function () {
          return e.watch.apply(e, arguments)
        })
      }

      return e.prototype.watch = function (e) {
        var t, n, r, i;
        return r = e.type, t = e.request, i = e.url, R(i) ? void 0 : (n = "socket" === r ? new m(t) : new y(t), this.elements.push(n))
      }, e
    }(), y = function () {
      function e(e) {
        var t, n, r, i, o, a, u = this;
        if (this.progress = 0, null != window.ProgressEvent)for (n = null, e.addEventListener("progress", function (e) {
          return u.progress = e.lengthComputable ? 100 * e.loaded / e.total : u.progress + (100 - u.progress) / 2
        }), a = ["load", "abort", "timeout", "error"], r = 0, i = a.length; i > r; r++)t = a[r], e.addEventListener(t, function () {
          return u.progress = 100
        }); else o = e.onreadystatechange, e.onreadystatechange = function () {
          var t;
          return 0 === (t = e.readyState) || 4 === t ? u.progress = 100 : 3 === e.readyState && (u.progress = 50), "function" == typeof o ? o.apply(null, arguments) : void 0
        }
      }

      return e
    }(), m = function () {
      function e(e) {
        var t, n, r, i, o = this;
        for (this.progress = 0, i = ["error", "open"], n = 0, r = i.length; r > n; n++)t = i[n], e.addEventListener(t, function () {
          return o.progress = 100
        })
      }

      return e
    }(), s = function () {
      function e(e) {
        var t, n, r, i;
        for (null == e && (e = {}), this.elements = [], null == e.selectors && (e.selectors = []), i = e.selectors, n = 0, r = i.length; r > n; n++)t = i[n], this.elements.push(new c(t))
      }

      return e
    }(), c = function () {
      function e(e) {
        this.selector = e, this.progress = 0, this.check()
      }

      return e.prototype.check = function () {
        var e = this;
        if (document.querySelector)return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
          return e.check()
        }, C.elements.checkInterval)
      }, e.prototype.done = function () {
        return this.progress = 100
      }, e
    }(), u = function () {
      function e() {
        var e, t, n = this;
        this.progress = null != (t = this.states[document.readyState]) ? t : 100, e = document.onreadystatechange, document.onreadystatechange = function () {
          return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof e ? e.apply(null, arguments) : void 0
        }
      }

      return e.prototype.states = {loading: 0, interactive: 50, complete: 100}, e
    }(), l = function () {
      function e() {
        var e, t, n, r, i, o = this;
        this.progress = 0, e = 0, i = [], r = 0, n = L(), t = setInterval(function () {
          var a;
          return a = L() - n - 50, n = L(), i.push(a), i.length > C.eventLag.sampleCount && i.shift(), e = b(i), ++r >= C.eventLag.minSamples && e < C.eventLag.lagThreshold ? (o.progress = 100, clearInterval(t)) : o.progress = 100 * (3 / (e + 3))
        }, 50)
      }

      return e
    }(), v = function () {
      function e(e) {
        this.source = e, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = I(this.source, "progress"))
      }

      return e.prototype.tick = function (e, t) {
        var n;
        return null == t && (t = I(this.source, "progress")), t >= 100 && (this.done = !0), t === this.last ? this.sinceLastUpdate += e : (this.sinceLastUpdate && (this.rate = (t - this.last) / this.sinceLastUpdate), this.catchup = (t - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = t), t > this.progress && (this.progress += this.catchup * e), n = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += n * this.rate * e, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
      }, e
    }(), z = null, q = null, F = null, B = null, w = null, x = null, Pace.running = !1, T = function () {
      return C.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (K = window.history.pushState, window.history.pushState = function () {
      return T(), K.apply(window.history, arguments)
    }), null != window.history.replaceState && (Y = window.history.replaceState, window.history.replaceState = function () {
      return T(), Y.apply(window.history, arguments)
    }), g = {ajax: o, elements: s, document: u, eventLag: l}, (P = function () {
      var e, t, n, r, i, o, u, s;
      for (Pace.sources = z = [], o = ["ajax", "elements", "document", "eventLag"], t = 0, r = o.length; r > t; t++)e = o[t], C[e] !== !1 && z.push(new g[e](C[e]));
      for (s = null != (u = C.extraSources) ? u : [], n = 0, i = s.length; i > n; n++)N = s[n], z.push(new N(C));
      return Pace.bar = F = new a, q = [], B = new v
    })(), Pace.stop = function () {
      return Pace.trigger("stop"), Pace.running = !1, F.destroy(), x = !0, null != w && ("function" == typeof E && E(w), w = null), P()
    }, Pace.restart = function () {
      return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function () {
      var e;
      return Pace.running = !0, F.render(), e = L(), x = !1, w = _(function (t, n) {
        var r, i, o, a, u, s, c, l, f, d, p, h, g, m, y, w;
        for (l = 100 - F.progress, i = p = 0, o = !0, s = h = 0, m = z.length; m > h; s = ++h)for (N = z[s], d = null != q[s] ? q[s] : q[s] = [], u = null != (w = N.elements) ? w : [N], c = g = 0, y = u.length; y > g; c = ++g)a = u[c], f = null != d[c] ? d[c] : d[c] = new v(a), o &= f.done, f.done || (i++, p += f.tick(t));
        return r = p / i, F.update(B.tick(t, r)), F.done() || o || x ? (F.update(100), Pace.trigger("done"), setTimeout(function () {
          return F.finish(), Pace.running = !1, Pace.trigger("hide")
        }, Math.max(C.ghostTime, Math.max(C.minTime - (L() - e), 0)))) : n()
      })
    }, Pace.start = function (e) {
      A(C, e), Pace.running = !0;
      try {
        F.render()
      } catch (t) {
        p = t
      }
      return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function () {
      return Pace
    }) : "object" == typeof exports ? module.exports = Pace : C.startOnPageLoad && Pace.start()
  }
}.call(this), function () {
  "use strict";
  function e(e, t) {
    this._chain = !!t, this._wrapped = e
  }

  function t(e) {
    return e
  }

  function n(e, t, n) {
    var r, i, o = !1, a = !1;
    if (null == e)return e;
    if (t = gn(t, n), e.length === +e.length)for (r = 0, i = e.length; i > r && (o = 0 === r ? !0 : !1, a = r === i - 1 ? !0 : !1, t(e[r], r, e, o, a) !== !1); r++); else {
      var u = ot(e);
      for (r = 0, i = u.length; i > r && (o = 0 === r ? !0 : !1, a = r === u.length - 1 ? !0 : !1, t(e[u[r]], u[r], e, r, o, a) !== !1); r++);
    }
    return e
  }

  function r(e) {
    function t() {
    }

    if (null == e)throw TypeError();
    if (Object.create)return Object.create(e);
    var n = typeof e;
    if ("object" !== n && "function" !== n)throw TypeError();
    return t.prototype = e, new t
  }

  function o(e) {
    function t(e) {
      if ("pending" === u)return void c.push(e);
      var t, n = "fulfilled" === u ? e.onFulfilled : e.onRejected;
      if (null === n)return n = "fulfilled" === u ? e.resolve : e.reject, void n(s);
      try {
        t = n(s), e.resolve(t)
      } catch (r) {
        e.reject(r)
      }
    }

    function r(e) {
      if (e && ("object" == typeof e || "function" == typeof e)) {
        var t = e.then;
        if ("function" == typeof t)return void t.call(e, r, i)
      }
      u = "fulfilled", s = e, a()
    }

    function i(e) {
      u = "rejected", s = e, a()
    }

    function a() {
      setTimeout(function () {
        n(c, function (e) {
          t(e)
        })
      }, 0)
    }

    var u = "pending", s = null, c = [];
    this.then = function (e, n) {
      return new o(function (r, i) {
        t({onFulfilled: e || null, onRejected: n || null, resolve: r, reject: i})
      })
    }, e(r, i)
  }

  function a(e) {
    return mn[typeof e] || mn[Kt.call(e)] || (e ? "object" : "null")
  }

  function u(e) {
    if (null === e)return"null";
    var t = typeof e;
    switch (t) {
      case"function":
      case"object":
        if (e.constructor) {
          if (e.constructor.name)return e.constructor.name;
          var n = e.constructor.toString().match(/^function (.+)\(.*$/);
          if (n)return n[1]
        }
        return Kt.call(e).match(/^\[object (.+)\]$/)[1];
      default:
        return t
    }
  }

  function s(e, t) {
    function r(e, t) {
      return n(t, function (n) {
        return n in e ? 1 !== t.length ? (t.shift(), r(e[n], t), !1) : void(o = e[n]) : !1
      }), o
    }

    var i, o;
    return arguments.length < 2 || "string" !== a(t) ? void console.error("参数不能少于2个， 且path为字符串") : (i = t.split("."), r(e, i))
  }

  function c(e, t, r) {
    function i(e, t, r) {
      n(t, function (n) {
        if (n in e) {
          if (1 !== t.length)return t.shift(), i(e[n], t, r), !1;
          e[n] = r
        }
      })
    }

    if (arguments.length < 3 || "string" !== a(t))return!1;
    var o = t.split(".");
    i(e, o, r)
  }

  function l(e, t, n) {
    for (t = t.split("."), i = 0; i < t.length - 1; i++)e = e[t[i]];
    e[t[i]] = n
  }

  function f(e) {
    var t = !0;
    if ("number" === a(e))return!1;
    if (!e)return t;
    var r = Kt.call(e), i = e.length;
    return"[object Array]" == r || "[object String]" == r || "[object Arguments]" == r || "[object Object]" == r && "number" == typeof i && pn.isFunction(e.splice) ? !i : (n(e, function () {
      return t = !1
    }), t)
  }

  function d(e) {
    return function () {
      return e
    }
  }

  function p(e) {
    return function (t, n) {
      e(n, t)
    }
  }

  function h(e, t) {
    return null != e && Zt.call(e, t)
  }

  function g(e) {
    var t, n = typeof e;
    return"object" == n && null !== e ? "function" == typeof(t = e.$$hashKey) ? t = e.$$hashKey() : void 0 === t && (t = e.$$hashKey = C()) : t = e, n + ":" + t
  }

  function v(e, t) {
    t ? e.$$hashKey = t : delete e.$$hashKey
  }

  function m(e, t, r) {
    var i, o = {};
    if ("function" === a(t))for (i in e) {
      var u = e[i];
      t.call(r, u, i, e) && (o[i] = u)
    } else {
      var s = Jt.apply([], Wt.call(arguments, 1));
      n(s, function (t) {
        t in e && (o[t] = e[t])
      })
    }
    return o
  }

  function y(e) {
    return function (t) {
      return t[e]
    }
  }

  function w(e, t) {
    return pt(e, y(t), null)
  }

  function b(e, t) {
    if ("function" !== a(e))throw new TypeError;
    return setTimeout(function () {
      e.apply(void 0, Wt.call(arguments))
    }, t)
  }

  function F(e) {
    var t = nn[e];
    if (!t.entity) {
      for (var n = [], r = 0; r < t.dependencies.length; r++)n.push(nn[t.dependencies[r]].entity ? nn[t.dependencies[r]].entity : this.use(t.dependencies[r]));
      t.entity = t.factory.apply(on, n)
    }
    return t.entity
  }

  function x(e) {
    e.length = 0, un.length < an && un.push(e)
  }

  function E(e) {
    e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null, sn.length < an && sn.push(e)
  }

  function j() {
    return un.pop() || []
  }

  function A() {
    return sn.pop() || {array: null, cache: null, criteria: null, "false": !1, index: 0, "null": !1, number: null, object: null, push: null, string: null, "true": !1, undefined: !1, value: null}
  }

  function S(e, t, r, i, o) {
    var u = a(e);
    if (r) {
      var s = r(e);
      if ("undefined" != typeof s)return s
    }
    if ("object" != typeof e || "null" === u)return e;
    switch (u) {
      case"function":
        return e;
      case"date":
        return new Date(+e);
      case"string":
        return new String(e);
      case"regexp":
        s = RegExp(e.source, /\w*$/.exec(e)), s.lastIndex = e.lastIndex
    }
    var c = "array" === u;
    if (t) {
      var l = !i;
      i || (i = j()), o || (o = j());
      for (var f = i.length; f--;)if (i[f] === e)return o[f];
      s = c ? Array(e.length) : {}
    } else s = c ? mt(e, 0, e.length) : extend({}, e);
    return c && (Zt.call(e, "index") && (s.index = e.index), Zt.call(e, "input") && (s.input = e.input)), t ? (i.push(e), o.push(s), n(e, function (e, n) {
      s[n] = S(e, t, r, i, o)
    }), l && (x(i), x(o)), s) : s
  }

  function D(e, t, n) {
    return t = "function" === a(t) && hn(t, n, 1), S(e, !1, t)
  }

  function k(e, t, n) {
    return t = "function" === a(t) && hn(t, n, 1), S(e, !0, t)
  }

  function T(e) {
    this.value = [].slice.call(e)
  }

  function $(e, t, n) {
    return function () {
      var r, i = !1, o = [].slice.call(arguments);
      return"function" == typeof t && (r = t.apply(this, o), r instanceof pn.setArguments ? o = r.value : (i = void 0 !== r) && o.push(r)), !i && o.push(e.apply(this, o)), r = "function" == typeof n ? n.apply(this, o.concat(i)) : void 0, void 0 !== r ? r : o.pop()
    }
  }

  function P(e, t, n) {
    return"function" === pn.typeOf(e[t]) ? e[t](n) : void console.log("No request handler found for " + t)
  }

  function L(e, t) {
    var n, r = !0;
    switch (t) {
      case"cellphone":
        n = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        break;
      case"email":
        n = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        break;
      case"url":
        n = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        break;
      case"number":
        n = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
        break;
      case"digits":
        n = /^\d+$/
    }
    return"array" === this.typeOf(e) ? this.each(e, function (e) {
      n.test(e) || (r = !1)
    }) : r = n.test(e), r
  }

  function C(e) {
    var t, n = en.length;
    for ("undefined" === a(e) && (e = ""); n;) {
      if (n--, t = en[n].charCodeAt(0), 57 == t)return en[n] = "A", e + en.join("");
      if (90 != t)return en[n] = String.fromCharCode(t + 1), e + en.join("");
      en[n] = "0"
    }
    return en.unshift("0"), e + en.join("")
  }

  function O(e) {
    return"string" === a(e) ? e.toLowerCase() : e
  }

  function I(e) {
    return"string" === a(e) ? e.toUpperCase() : e
  }

  function _(e, t) {
    for (var n = e, r = ""; t > 0 && (t % 2 == 1 && (r += n), 1 != t);)n += n, t >>= 1;
    return r
  }

  function q(e, t, n) {
    return n ? (n + e + n).indexOf(n + t + n) > -1 : e.indexOf(t) > -1
  }

  function R(e, t, n) {
    var r = e.substr(0, t.length);
    return n ? r.toLowerCase() === t.toLowerCase() : r === t
  }

  function M(e, t, n) {
    var r = e.substring(e.length - t.length);
    return n ? r.toLowerCase() === t.toLowerCase() : r === t
  }

  function N(e, t) {
    t = t ? t : 2;
    var n = new Array(t + 1).join("-");
    return e.replace(/[^\x00-\xff]/g, n).length
  }

  function z(e, t, n) {
    return t = t || 30, n = void 0 === n ? "..." : n, e.length > t ? e.slice(0, t - n.length) + n : String(e)
  }

  function B(e, t, n) {
    function r(e) {
      var t = e / 2 | 0;
      return t > 0 ? t : 1
    }

    if (!(e + "").length || !t || 0 >= +t)return"";
    var t = +t, n = "undefined" == typeof n ? "..." : n.toString(), i = this.byteLen(n);
    i > t && (n = "", i = 0);
    for (var o = t - i, a = 0, u = 0; o >= u;) {
      var s = r(o - u), c = this.byteLen(e.substr(a, s));
      if (0 == c)return e;
      u += c, a += s
    }
    return e.length - a > i || this.byteLen(e.substring(a - 1)) > i ? e.substr(0, a - 1) + n : e
  }

  function U(e, t, n) {
    var r = n ? "<" + t + "[^>]*>([\\S\\s]*?)<\\/" + t + ">" : "</?" + t + "[^>]*>";
    return String(e || "").replace(new RegExp(r, "img"), "")
  }

  function H(e) {
    return String(e || "").replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "")
  }

  function X(e) {
    return String(e || "").replace(/<[^>]+>/gim, "")
  }

  function G(e) {
    return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&#39;")
  }

  function W(e) {
    return e = e || "", e.replace(/&amp;/gm, "&").replace(/&lt;/gm, "<").replace(/&gt;/gm, ">").replace(/&quot;/gm, '"').replace(/&#([\d]+);/gm, function (e, t) {
      return String.fromCharCode(parseInt(t, 10))
    })
  }

  function V(e) {
    return e.replace(/([-.*+?^${}()|[\]\/\\])/gim, "\\$1")
  }

  function K(e, t, n, r, i, o) {
    var a = e.toString(i || 10), u = "", s = t;
    if (o && o.prefix && (s = t - o.prefix.length, u = o.prefix, 0 > s))throw new Error("n too small");
    for (n = n || "0"; a.length < s;)r ? a += n : a = n + a;
    return u + a
  }

  function Z(e, t) {
    var n = Array.prototype.slice.call(arguments, 1);
    return e.replace(/\\?\#{([^{}]+)\}/gm, function (e, r) {
      if ("\\" == e.charAt(0))return e.slice(1);
      var i = Number(r);
      return i >= 0 ? n[i] : t && void 0 !== t[r] ? t[r] : ""
    })
  }

  function J(e, t) {
    var n = /\W/.test(e) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("{{").join("	").replace(/((^|}})[^\t]*)'/g, "$1\r").replace(/\t(.*?)}}/g, "',$1,'").split("	").join("');").split("}}").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : cn[e] = cn[e] || J(e);
    return t ? n(t) : n
  }

  function Y(e) {
    for (var t = 0; t < e.length; t++)if (-1 === Qt.indexOf(e.charAt(t))) {
      e = e.substring(t);
      break
    }
    return-1 === Qt.indexOf(e.charAt(0)) ? e : ""
  }

  function Q(e) {
    for (var t = e.length - 1; t >= 0; t--)if (-1 === Qt.lastIndexOf(e.charAt(t))) {
      e = e.substring(0, t + 1);
      break
    }
    return-1 === Qt.lastIndexOf(e.charAt(e.length - 1)) ? e : ""
  }

  function et(e) {
    if (f(e))return null;
    for (var t = 0; t < e.length; t++)if (-1 === Qt.indexOf(e.charAt(t))) {
      e = e.substring(t);
      break
    }
    for (t = e.length - 1; t >= 0; t--)if (-1 === Qt.lastIndexOf(e.charAt(t))) {
      e = e.substring(0, t + 1);
      break
    }
    return-1 === Qt.indexOf(e.charAt(0)) ? e : ""
  }

  function tt(e) {
    return e.toString().replace(/\s*/gm, "")
  }

  function nt(e) {
    for (var t = "", n = e.length; n--;)t += e[n];
    return t
  }

  function rt(e, t) {
    return!!e.splice(t, 1).length
  }

  function it(e, t) {
    var n = gt(e, t);
    return-1 !== n && e.splice(n, 1), t
  }

  function ot(e) {
    if ("object" !== a(e))return[];
    if (Yt)return Yt(e);
    var t = [];
    for (var n in e)h(e, n) && t.push(n);
    return t
  }

  function at(e) {
    return function (t) {
      if (null == t)return f(e);
      if (t === e)return!0;
      for (var n in e)if (e[n] !== t[n])return!1;
      return!0
    }
  }

  function ut(e, t, r) {
    var i = [];
    if (!e)return vn;
    var o = hn(t, r);
    return n(e, function (e, t, n) {
      o(e, t, n) && i.push(e)
    }), i
  }

  function st(e, t, n) {
    var r = -1, i = e ? e.length : 0;
    for (t = hn(t, n); ++r < i;)if (t(e[r], r, e))return r;
    return-1
  }

  function ct(e, t, r) {
    var i = {};
    return n(e, function (e) {
      "undefined" !== a(e[t]) && (i[e[t]] = e[r])
    }), i
  }

  function lt(e, t, r) {
    var i = [];
    return"object" !== a(e) ? [] : (n(e, function (e, n) {
      var o = {};
      o[t] = n, o[r] = e, i.push(o)
    }), i)
  }

  function ft(e, t, n, r) {
    if (0 > t || t > e.length || 0 > n || n > e.length)throw new Error("method exchange: thisdx or targetdx is invalid !");
    var i = e[t], o = e[n], a = i, u = 0;
    r && "string" == typeof r.column && (u = s(i, r.column), c(i, r.column, s(o, r.column)), c(o, r.column, u)), r && "function" == typeof r.callback && r.callback.apply(null, [i, o]), e[t] = o, e[n] = a
  }

  function dt(e, t, n, r) {
    var i = [];
    if (n > t) {
      for (var o = t; n - 1 > o; o++)ft(e, o, o + 1, {column: r.column});
      i = e.slice(0).slice(t, n)
    } else {
      for (var o = t; o > n; o--)ft(e, o, o - 1, {column: r.column});
      i = e.slice(0).slice(n, t + 1)
    }
    "function" == typeof r.callback && r.callback.apply(null, [i])
  }

  function pt(e, t, r) {
    var i = [];
    return null === e ? i : (t = hn(t, r), n(e, function (e, n, r) {
      i.push(t(e, n, r))
    }), i)
  }

  function ht(e) {
    var t, n = {}, r = e.split(",");
    for (t = 0; t < r.length; t++)n[r[t]] = !0;
    return n
  }

  function gt(e, t) {
    if (e.indexOf)return e.indexOf(t);
    for (var n = 0, r = e.length; r > n; n++)if (t === e[n])return n;
    return-1
  }

  function vt(e, t, r) {
    var i = -1, o = "array" === a(t), u = e ? e.length : 0, s = Array("number" == typeof u ? u : 0);
    return o || (t = hn(t, r)), n(e, function (e, n, r) {
      var a = s[++i] = {};
      o ? a.criteria = pt(t, function (t) {
        return e[t]
      }) : (a.criteria = [])[0] = t(e, n, r), a.index = i, a.value = e
    }), u = s.length, s.sort(function (e, t) {
      for (var n = e.criteria, r = t.criteria, i = -1, o = n.length; ++i < o;) {
        var a = n[i], u = r[i];
        if (a !== u) {
          if (a > u || "undefined" == typeof a)return 1;
          if (u > a || "undefined" == typeof u)return-1
        }
      }
      return e.index - t.index
    }), w(s, "value")
  }

  function mt(e, t, n) {
    t || (t = 0), "undefined" == typeof n && (n = t < e.length - 1 ? t + 1 : e.length);
    for (var r = -1, i = n - t || 0, o = Array(0 > i ? 0 : i); ++r < i;)o[r] = e[t + r];
    return o
  }

  function yt(e, t) {
    if (!pn.isEmpty(e)) {
      var n = e.substring(e.lastIndexOf(".") + 1, e.length), r = e.lastIndexOf("_") > 0 ? !0 : !1;
      return e.substring(0, e.lastIndexOf(r ? "_" : ".")) + "_" + t + "." + n
    }
  }

  function wt(e, t, n, r, i) {
    var o = parseInt(e, 10), a = parseInt(t, 10), u = parseInt(n, 10), s = parseInt(r, 10), i = i || !1, c = {width: u, height: s, marginTop: 0, marginLeft: 0};
    if (0 != o && 0 != a) {
      var l = u / o, f = s / a;
      c = !i && l / f > 1.5 ? {width: "auto", height: s, marginTop: 0, marginLeft: Math.abs((u - o * f) / 2)} : !i && f / l > 1.5 ? {width: u, height: "auto", marginTop: Math.abs((s - a * l) / 2), marginLeft: 0} : f > l ? {width: o * f, height: s, marginTop: 0, marginLeft: -(o * f - u) / 2} : l > f ? {width: u, height: a * l, marginTop: -(a * l - s) / 2, marginLeft: 0} : {width: u, height: s, marginTop: -(a * f - s) / 2, marginLeft: -(o * f - u) / 2}
    }
    return c
  }

  function bt(e) {
    var t = e.inputFile, n = t.files, r = e.imgNode, i = 0, o = null;
    try {
      if (n && n[0])for (var a = n.length; a > i;) {
        if (o = n[i], o.type.match("image.*")) {
          var u = new FileReader;
          u.readAsDataURL(o), u.onloadend = function () {
            r.src = this.result
          }
        }
        i++
      } else {
        t.select();
        var s = document.selection.createRange().text, c = document.getElementById("localImag");
        c.style.width = "96px", c.style.height = "96px";
        try {
          c.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)", c.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = s
        } catch (l) {
          return alert("您上传的图片格式不正确，请重新选择!"), !1
        }
        r.style.display = "none", document.selection.empty()
      }
    } catch (l) {
      console.error(l)
    }
    return!0
  }

  function Ft(e) {
    if (!e.canvas)throw"A canvas is required";
    if (!e.image)throw"Image is required";
    var t = e.canvas, n = e.context2D, r = e.image, i = e.srcx || 0, o = e.srcy || 0, a = e.srcw || r.naturalWidth, u = e.srch || r.naturalHeight, s = e.desx || i, c = e.desy || o, l = e.desw || a, f = e.desh || u, d = e.auto, p = window.devicePixelRatio || 1, h = n.webkitBackingStorePixelRatio || n.mozBackingStorePixelRatio || n.msBackingStorePixelRatio || n.oBackingStorePixelRatio || n.backingStorePixelRatio || 1, g = p / h;
    if ("undefined" == typeof d && (d = !0), d && p !== h) {
      var v = t.width, m = t.height;
      t.width = v * g, t.height = m * g, t.style.width = v + "px", t.style.height = m + "px", n.scale(g, g)
    }
    n.drawImage(e.image, i, o, a, u, s, c, l, f)
  }

  function xt(e) {
    for (var e = {ow: parseFloat(e.containerWidth), cw: parseFloat(e.childWidth), cl: e.childLength, cm: parseFloat(e.childSpace), fn: e.callback}, t = Math.floor((e.ow - e.cm) / (e.cw + e.cm)), n = Math.floor((e.ow - e.cw * t) / (t - 1)), r = Math.ceil(e.cl / t), i = 0; r > i; i++)for (var o = t * i; t * (i + 1) > o; o++)o != t * (i + 1) - 1 ? e.fn(o, n) : e.fn(o, 0)
  }

  function Et(e, t, n) {
    var r = {categoryId: "category_id", belongId: "belong_id", childTag: "cates", dxs: []};
    if ("undefined" != typeof n && pn.extend(r, n), "undefined" != typeof r.dxs)for (var i = 0, o = r.dxs.length; o > i; i++)t.splice(r.dxs[i], 1);
    for (var a = 0, u = e.length; u > a; a++) {
      for (var s = e[a], c = [], l = 0, f = t.length; f > l; l++) {
        var d = t[l];
        s[r.categoryId] == d[r.belongId] && c.push(d)
      }
      s[r.childTag] = c.slice(0), c.length > 0 ? (s.hasChild = !0, Et(c, t, r)) : (s.hasChild = !1, s.cates = [])
    }
    return e
  }

  function jt(e, t, n) {
    var r = t;
    n.top = "undefined" == typeof n.top ? !0 : n.top;
    for (var i = 0, o = e.length; o > i; i++) {
      var a = "";
      if (!n.top)for (var u = 0; r > u; u++)a += "　";
      a += "|-", e[i][n.name] = a + e[i][n.name], e[i].hasChild && (n.top = !1, jt(e[i].cates, t = r + 2, n))
    }
    return e
  }

  function At(e) {
    function t(e) {
      for (var r = 0, i = e.length; i > r; r++)n.push(e[r]), e[r].hasChild && t(e[r].cates);
      return e
    }

    var n = [];
    return t(e), n
  }

  function St(e, t, r, i) {
    var o = [];
    return n(e, function (e) {
      e[t] === r && o.push(e), i && "function" === pn.typeOf(i.callback) && i.callback.call(this, e)
    }), i && "undefined" !== pn.typeOf(i.sortBy) && (o = pn.sortBy(o, function (e) {
      return e[i.sortBy]
    }), e = pn.sortBy(e, function (e) {
      return e[i.sortBy]
    })), Et(o, e, i)
  }

  function Dt(e, t, n, r, i) {
    var o = [], a = pn.filter(e, function (e) {
      return e[t] === n
    });
    if (0 === a.length)return o;
    o.unshift({nodeId: n, name: a[0][r]});
    var u = function (e, n) {
      var a = pn.filter(e, function (e) {
        return e[t] === n
      });
      a.length > 0 && (o.unshift({nodeId: a[0][t], name: a[0][r]}), u(e, a[0][i]))
    };
    return u(e, a[0][i]), o
  }

  function kt(e, t) {
    return e % t == 0 ? e / t : Math.floor(e / t) + 1
  }

  function Tt(e, t) {
    return e > t ? Math.ceil(e / t) : 1
  }

  function $t(e, t, n) {
    var e = e, r = e.length, i = new Array, o = this.getMaxPage(r, n);
    t = 1 > t ? 1 : t, t = t > o ? o : t;
    var a = 0 > (t - 1) * n ? 0 : (t - 1) * n, u = 0 > a + n ? 0 : a + n;
    u = u > r ? r : a + n;
    for (var s = a; u > s; s++)i.push(e[s]);
    return i
  }

  function Pt(e, t, n) {
    var e = parseInt(e, 10), t = parseInt(t, 10), r = 1, i = t, o = n || 11, a = [];
    if (t > o) {
      var u = (o - 1) / 2;
      u >= e ? (r = 1, i = 2 * u - 1) : e > t - u ? (r = t - 2 * u + 2, i = t) : (r = e - (u - 1), i = e + (u - 1))
    } else i = t;
    for (var s = r; i >= s; s++)a.push(s);
    return a
  }

  function Lt(e, t, n) {
    var r = {area: "templates", getData: null};
    pn.extend(r, n), t.cache = t.cache || {}, "undefined" == typeof t.cache[r.area] && (t.cache[r.area] = {});
    var i = t.cache[r.area][e];
    return i || (i = t.cache[r.area][e] = r.getData.call(null, i)), i
  }

  function Ct(e, t, n) {
    var r = "", i = n(e).hasClass(t), o = n(e).attr("id"), a = n(e).attr("class");
    return o.length > 0 ? r = "#" + o : a.length > 0 ? r = "." + n.trim(a).split(" ")[0] : (r = Ot(e), r = Ct(e.parentNode) + " " + r), i ? r : "#" + n(e).parents(".moveChild:first").attr("id") + " " + r
  }

  function Ot(e) {
    return e.tagName.toLowerCase()
  }

  function It(e) {
    var t = document.createElement("link");
    t.rel = "stylesheet", t.type = "text/css", t.href = e, document.body.appendChild(t)
  }

  function _t(e, t) {
    var e = e ? new Date(e) : new Date, n = {"M+": e.getMonth() + 1, "d+": e.getDate(), "h+": e.getHours(), "m+": e.getMinutes(), "s+": e.getSeconds(), "q+": Math.floor((e.getMonth() + 3) / 3), S: e.getMilliseconds()};
    t = t || "yyyy-MM-dd", /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
    try {
      for (var r in n)new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)))
    } catch (i) {
      console.log("【Error】: DateUtils.dataFormat " + i)
    }
    return t
  }

  function qt(e, t) {
    var n = /^0$|^2$|^4$|^6$|^7$|^9$|^11$/.test(t) ? 31 : /^3$|^5$|^8$|^10$/.test(t) ? 30 : /^1$/.test(t) ? e % 400 && (e % 4 || !(e % 100)) ? 28 : 29 : 0;
    return n
  }

  function Rt(e) {
    for (; e.firstChild;) {
      var t = e.removeChild(e.firstChild);
      t = null
    }
  }

  function Mt(e, t, n, r) {
    return this.validation([e, t, n, r], "number") ? {left: (parseInt(e, 10) - parseInt(n, 10)) / 2, top: (parseInt(t, 10) - parseInt(r, 10)) / 2} : {left: 0, top: 0}
  }

  function Nt() {
    var e = parseInt((/msie (\d+)/.exec(O(navigator.userAgent)) || [])[1], 10);
    return isNaN(e) && (e = parseInt((/trident\/.*; rv:(\d+)/.exec(O(navigator.userAgent)) || [])[1], 10)), isNaN(e) && (e = !1), e
  }

  function zt(e, t) {
    var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
    "undefined" !== a(t) && (t = t.substring(t.indexOf("?"), t.length));
    var r = t || window.location.search, i = r.substr(1).match(n);
    return null != i ? unescape(i[2]) : null
  }

  function Bt(e) {
    var t = e;
    return tn = document && document.createElement("a"), Nt() && (tn.setAttribute("href", t), t = tn.href), tn.setAttribute("href", t), {href: tn.href, protocol: tn.protocol ? tn.protocol.replace(/:$/, "") : "", host: tn.host, search: tn.search ? tn.search.replace(/^\?/, "") : "", hash: tn.hash ? tn.hash.replace(/^#/, "") : "", hostname: tn.hostname, port: tn.port, pathname: "/" === tn.pathname.charAt(0) ? tn.pathname : "/" + tn.pathname}
  }

  function Ut(e, t, n) {
    "function" == typeof t && (n = t, t = null), ln[e] = {templateId: t, controller: n}
  }

  function Ht() {
    var e = location.hash.slice(1) || "/", t = ln[e];
    return t && !t.templateId ? t.controller ? new t.controller : null : (fn = fn || document.getElementById("view"), dn && (Object.unobserve(dn.controller, dn.render), dn = null), void(fn && t && t.controller && (dn = {controller: new t.controller, template: J(document.getElementById(t.templateId).innerHTML), render: function () {
      fn.innerHTML = this.template(this.controller)
    }}, dn.render(), Object.observe(dn.controller, dn.render.bind(dn)))))
  }

  function Xt(e, t) {
    window.$dashFrame || (window.$dashedFrameLeft = t("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), window.$dashedFrameTop = t("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), window.$dashedFrameRight = t("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), window.$dashedFrameBottom = t("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"), t("body").append(window.$dashedFrameLeft), t("body").append(window.$dashedFrameTop), t("body").append(window.$dashedFrameRight), t("body").append(window.$dashedFrameBottom), window.$dashFrame = !0);
    var n = t(e).outerWidth(), r = t(e).outerHeight(), i = t(e).offset();
    window.$dashedFrameLeft.css({left: i.left, top: i.top, width: 0, height: r}).show(), window.$dashedFrameTop.css({left: i.left, top: i.top, width: n, height: 0}).show(), window.$dashedFrameRight.css({left: i.left + n, top: i.top, width: 0, height: r}).show(), window.$dashedFrameBottom.css({left: i.left, top: i.top + r, width: n, height: 0}).show()
  }

  var Gt = this, Wt = Array.prototype.slice, Vt = Array.prototype.push, Kt = Object.prototype.toString, Zt = Object.prototype.hasOwnProperty, Jt = Array.prototype.concat, Yt = (Array.isArray, Object.keys), Qt = (Object.prototype.bind, " \n\r	\f     \n               ​\u2028\u2029　"), en = ["0", "0", "0"], tn = null, nn = {}, rn = {}, on = function () {
  }, an = 40, un = [], sn = [], cn = {}, ln = {}, fn = null, dn = null, pn = function (t) {
    return t && "object" == typeof t && "array" !== a(t) && Zt.call(t, "_wrapped") ? t : new e(t)
  };
  pn.version = "1.1.0", "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = pn), exports.Est = pn) : Gt.Est = pn, pn.identity = t;
  var hn = function (e, t, n) {
    return null == e ? pn.identity : pn.isFunction(e) ? gn(e, t, n) : "object" === a(e) ? at(e) : "array" === a(e) ? e : y(e)
  }, gn = function (e, t, n) {
    if (!t)return e;
    switch (null == n ? 3 : n) {
      case 1:
        return function (n) {
          return e.call(t, n)
        };
      case 2:
        return function (n, r) {
          return e.call(t, n, r)
        };
      case 3:
        return function (n, r, i) {
          return e.call(t, n, r, i)
        };
      case 4:
        return function (n, r, i, o) {
          return e.call(t, n, r, i, o)
        }
    }
    return function () {
      return e.apply(this, arguments)
    }
  };
  pn.each = pn.forEach = n, pn.extend = function (e) {
    var t = e.$$hashKey;
    return"object" !== a(e) ? e : (n(Wt.call(arguments, 1), function (t) {
      for (var n in t)e[n] = t[n]
    }), v(e, t), e)
  }, pn.inherit = r, "function" != typeof/./ && (pn.isFunction = function (e) {
    return"function" == typeof e
  }), pn.functions = pn.methods = function (e) {
    var t = [];
    for (var n in e)pn.isFunction(e[n]) && t.push(n);
    return t.sort()
  }, pn.chain = function (t) {
    return t = new e(t), t._chain = !0, t
  };
  var vn = function (t) {
    return this._chain ? new e(t, !0) : t
  };
  pn.promise = o;
  var mn = {undefined: "undefined", number: "number", "boolean": "boolean", string: "string", "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array", "[object Date]": "date", "[object Error]": "error", "[object File]": "file", "[object Blob]": "blob"};
  pn.typeOf = a, pn.getType = u, pn.getValue = s, pn.setValue = c, pn.setToValue = l, pn.isEmpty = f, pn.valueFn = d, pn.reverseParams = p, pn.hasKey = h, pn.hashKey = g, pn.setHashKey = v, pn.pick = m, pn.property = y, pn.pluck = w, pn.delay = b, pn.define = function (e, t, n) {
    if ("function" == typeof define && define.amd)return define;
    if (!nn[e]) {
      var r = {name: e, dependencies: t, factory: n};
      nn[e] = r
    }
    return nn[e]
  }, pn.require = function (e, t) {
    function n() {
      for (var n = !0, r = 0; r < e.length; r++)if (!rn[e[r]]) {
        n = !1;
        break
      }
      n && t()
    }

    if ("function" == typeof define && define.amd)return require;
    for (var r = 0; r < e.length; r++) {
      var i = e[r];
      if (!rn[i]) {
        var o = document.getElementsByTagName("head")[0], a = document.createElement("script");
        a.type = "text/javascript", a.async = "true", a.src = i + ".js", a.onload = function () {
          rn[i] = !0, o.removeChild(a), n()
        }, o.appendChild(a)
      }
    }
  }, pn.use = F, pn.releaseArray = x, pn.releaseObject = E, pn.getArray = j, pn.getObject = A, pn.clone = D, pn.cloneDeep = k, pn.setArguments = T, pn.inject = $, pn.keyRoute = P, pn.validation = L, pn.nextUid = C, pn.lowercase = O, pn.uppercase = I, pn.repeat = _, pn.contains = q, pn.startsWidth = R, pn.endsWidth = M, pn.byteLen = N, pn.truncate = z, pn.cutByte = B, pn.stripTagName = U, pn.stripScripts = H, pn.stripTags = X, pn.escapeHTML = G, pn.unescapeHTML = W, pn.escapeRegExp = V, pn.pad = K, pn.format = Z, pn.template = J, pn.ltrim = Y, pn.rtrim = Q, pn.trim = et, pn.deepTrim = tt, pn.reverse = nt, pn.removeAt = rt, pn.arrayRemove = it, pn.keys = ot, pn.matches = at, pn.filter = ut, pn.findIndex = st, pn.arrayToObject = ct, pn.arrayFromObject = lt, pn.arrayExchange = ft, pn.arrayInsert = dt, pn.map = pt, pn.makeMap = ht, pn.indexOf = gt, pn.sortBy = vt, pn.take = pn.arraySlice = mt, pn.picUrl = yt, pn.imageCrop = wt, pn.imagePreview = bt, pn.drawImage = Ft, pn.girdJustify = xt, pn.bulidSubNode = Et, pn.bulidSelectNode = jt, pn.extendTree = At, pn.bulidTreeNode = St, pn.bulidBreakNav = Dt, pn.getMaxPage = kt, pn.getMaxPage_2 = Tt, pn.getListByPage = $t, pn.getPaginationNumber = Pt, pn.getCache = Lt, pn.getSelector = Ct, pn.getTagName = Ot, pn.loadCss = It, pn.dateFormat = _t, pn.getDays = qt, pn.clearAllNode = Rt, pn.center = Mt, pn.msie = Nt, pn.getUrlParam = zt, pn.urlResolve = Bt, window && window.addEventListener && (window.addEventListener("hashchange", Ht), window.addEventListener("load", Ht)), pn.route = Ut, pn.dashedFrame = Xt, pn.mixin = function (t, n) {
    var r = pn;
    "boolean" !== a(n) || n || (r = t), pn.each(pn.functions(t), function (e) {
      var n = r[e] = t[e];
      r.prototype[e] = function () {
        try {
          var e = [];
          "undefined" != typeof this._wrapped && e.push(this._wrapped)
        } catch (t) {
          console.error("_wrapped is not defined")
        }
        return Vt.apply(e, arguments), vn.apply(this, [n.apply(r, e), r])
      }
    }), e.prototype = r.prototype, pn.extend(r.prototype, {chain: function (t, n) {
      return t = new e(t, n), t._chain = !0, t
    }, value: function () {
      return this._wrapped
    }})
  }, pn.mixin(pn, !0), "function" == typeof define && define.amd ? define("Est", [], function () {
    return pn
  }) : "function" == typeof define && define.cmd ? define("Est", [], function (e, t, n) {
    n.exports = pn
  }) : pn.define("Est", [], function () {
    return pn
  })
}.call(this);
var Application = function (e) {
  this.options = e, Est.extend(this, e), this.initialize.apply(this, arguments)
};
Est.extend(Application.prototype, {initialize: function () {
  this.data = {itemActiveList: []}, this.instance = {}, this.modules = {}, this.routes = {}, this.templates = {}, this.panel = {}, this.dialog = []
}, addPanel: function (e, t) {
  var n = "string" === Est.typeOf(t.cid) ? !1 : !0;
  if (n) {
    e in this.panel && this.removePanel(e);
    var r = $(t.template);
    t.panel_id = Est.nextUid(), r.addClass("__panel_" + t.panel_id), $(t.el).append(r)
  }
  return this.panel[e] = t, n ? this : t
}, removePanel: function (e) {
  var t = this.panel[e];
  $(".__panel_" + t.panel_id, $(t.el)).off().remove(), delete this.panel[e]
}, getPanel: function (e) {
  return this.panel[e]
}, addView: function (e, t) {
  return e in this.instance && this.removeView(e), this.instance[e] = t, t
}, getView: function (e) {
  return this.instance[e]
}, removeView: function (e) {
  var t = this.getView(e);
  return t && (t._empty(), t.stopListening(), t.$el.off().remove()), delete this.instance[e], this
}, addDialog: function (e) {
  return this.dialog.push(e), e
}, emptyDialog: function () {
  Est.each(this.dialog, function (e) {
    e.close && e.close().remove()
  })
}, addData: function (e, t) {
  e in this.data && console.log("数据对象重复" + e), this.data[e] = t
}, getData: function (e) {
  return this.data[e]
}, addModule: function (e, t) {
  e in this.modules && console.log("已存在的模块：" + e), this.modules[e] = t
}, getModules: function () {
  return this.modules
}, addRoute: function (e, t) {
  e in this.routes && console.log("已存在的路由:" + e), this.routes[e] = t
}, getRoutes: function () {
  return this.routes
}, addTemplate: function (e, t) {
  e in this.templates && console.log("已存在的模板：" + e), this.templates[e] = t
}, getTemplates: function () {
  return this.templates
}}), window.console || (console = function (e) {
  function t() {
    e && (this.div = document.createElement("console"), this.div.id = "console", this.div.style.cssText = "filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;", document.body.appendChild(this.div))
  }

  function n() {
    return null == r && (r = new t), r
  }

  var r = null;
  return t.prototype = {log: function (t) {
    if (e) {
      var n = document.createElement("p");
      n.innerHTML = t, this.div.appendChild(n)
    }
  }}, n()
}(!1)), function () {
  var e, t;
  !function (n, r) {
    function i(e) {
      return function (t) {
        return{}.toString.call(t) == "[object " + e + "]"
      }
    }

    function o() {
    }

    var a = i("Function"), u = {};
    o.prototype.exec = function () {
      function e(e) {
        return o.get(e).exec()
      }

      var t = this;
      if (this.execed)return t.exports;
      this.execed = !0;
      var n = t.factory, i = a(n) ? n(e, t.exports = {}, t) : n;
      return i === r && (i = t.exports), delete t.factory, t.exports = i, i
    }, e = function (e, t, n) {
      var r = {id: e, deps: t, factory: n};
      o.save(r)
    }, o.save = function (e) {
      var t = o.get(e.id);
      t.id = e.id, t.dependencies = e.deps, t.factory = e.factory
    }, o.get = function (e) {
      return u[e] || (u[e] = new o)
    }, t = function (e) {
      var t = o.get(e);
      return t.execed || t.exec(), t.exports
    }
  }(this), e("bui/config", [], function () {
    var e = window.BUI = window.BUI || {};
    e.use = seajs.use, e.config = seajs.config
  }), t("bui/config")
}();