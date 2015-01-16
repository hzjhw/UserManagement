/**
 * @description sample0
 * @class sample0
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
!
  function(e) {
    "use strict";
    if (!e.fmd) {
      var t = {},
        n = [],
        i = function(e) {
          return t[e]
        },
        o = function(e, o, r) {
          if (!t[e]) {
            if (r || (r = o, o = []), "function" == typeof r) {
              for (var u = [], l = 0, a = o.length; a > l; l++) u.push(i(o[l]));
              r = r.apply(null, u)
            }
            t[e] = r || 1,
              n.push(e)
          }
        };
      o.version = "0.2.5",
        o.cache = {
          parts: n
        },
        o("global", e),
        o("require",
          function() {
            return i
          }),
        o("env",
          function() {
            return o
          }),
        o("cache",
          function() {
            return o.cache
          }),
        e.fmd = o
    }
  } (this),
  fmd("lang",
    function() {
      "use strict";
      var e = {}.toString,
        t = Array.prototype,
        n = {
          isFunction: function(t) {
            return "[object Function]" === e.call(t)
          },
          isArray: Array.isArray ||
            function(t) {
              return "[object Array]" === e.call(t)
            },
          isString: function(e) {
            return "string" == typeof e
          },
          forEach: t.forEach ?
            function(e, t, n) {
              e.forEach(t, n)
            }: function(e, t, n) {
            for (var i = 0, o = e.length; o > i; i++) t.call(n, e[i], i, e)
          },
          map: t.map ?
            function(e, t, n) {
              return e.map(t, n)
            }: function(e, t, i) {
            var o = [];
            return n.forEach(e,
              function(e, n, r) {
                o.push(t.call(i, e, n, r))
              }),
              o
          },
          inArray: t.indexOf ?
            function(e, t) {
              return e.indexOf(t)
            }: function(e, t) {
            for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
            return - 1
          }
        };
      return n
    }),
  fmd("event", ["env", "cache"],
    function(e, t) {
      "use strict";
      var n = t.events = {},
        i = [].slice,
        o = {
          on: function(e, t) {
            var i = n[e] || (n[e] = []);
            i.push(t)
          },
          emit: function(e) {
            var t,
              o = i.call(arguments, 1),
              r = n[e],
              u = 0;
            if (r) for (; t = r[u++];) t.apply(null, o)
          },
          off: function(e, t) {
            var i = n[e];
            if (i) if (t) for (var o = i.length - 1; o >= 0; o--) i[o] === t && i.splice(o, 1);
            else delete n[e]
          }
        };
      return e.on = o.on,
        e.off = o.off,
        o
    }),
  fmd("config", ["env", "cache", "lang"],
    function(e, t, n) {
      "use strict";
      var i = t.config = {},
        o = t.configRules = {},
        r = "_rule_",
        u = 0,
        l = function(e, t, r) {
          var u,
            l = !1;
          for (var a in o) {
            if (l) break;
            u = o[a],
              l = n.inArray(u.keys, t) > -1 && void 0 === u.rule.call(i, e, t, r)
          }
          return l
        },
        a = {
          get: function(e) {
            return i[e]
          },
          set: function(e) {
            for (var t in e) {
              var n = i[t],
                o = e[t];
              l(n, t, o) || (i[t] = o)
            }
          },
          register: function(e) {
            var t;
            return n.isFunction(e.rule) && (e.name || (e.name = r + u++), t = o[e.name] = {
              rule: e.rule,
              keys: []
            }),
              t || (t = o[e.name]),
              t && e.keys && (n.isArray(e.keys) ? t.keys = t.keys.concat(e.keys) : t.keys.push(e.keys)),
              this
          }
        };
      return a.register({
        name: "object",
        rule: function(e, t, n) {
          if (!e) return ! 1;
          for (var i in n) e[i] = n[i]
        }
      }).register({
        name: "array",
        rule: function(e, t, n) {
          e ? e.push(n) : this[t] = [n]
        }
      }),
        e.config = function(e) {
          return n.isString(e) ? a.get(e) : void a.set(e)
        },
        a
    }),
  fmd("module", ["global", "env", "cache", "lang", "event"],
    function(e, t, n, i, o) {
      "use strict";
      var r,
        u = "",
        l = [],
        a = "_!_fmd_anonymous_",
        s = 0,
        c = n.modules = {},
        f = {
          require: function(e) {
            return e.require || d.makeRequire(e),
              o.emit("makeRequire", e.require, e),
              e.require
          },
          exports: function(e) {
            return e.exports
          },
          module: function(e) {
            return e.module = {
              id: e.id,
              exports: e.exports
            },
              e.module
          }
        },
        d = function(e, t, n) {
          var i = this;
          i.id = e,
            i.deps = t || [],
            i.factory = n,
            i.exports = {},
            i.unnamed() && (e = a + s, s++),
            i.uid = e
        };
      d.prototype = {
        unnamed: function() {
          return this.id === u
        },
        extract: function() {
          var e = this,
            t = e.deps,
            n = [];
          return i.isArray(t) && i.forEach(t,
            function(t) {
              var i,
                o; (o = f[t]) ? i = o(e) : (e.require || d.makeRequire(e), i = e.require(t)),
                n.push(i)
            }),
            n
        },
        compile: function() {
          var e = this;
          try {
            if (i.isFunction(e.factory)) {
              var t = e.extract(),
                n = e.factory.apply(null, t);
              n !== r ? e.exports = n: e.module && e.module.exports && (e.exports = e.module.exports),
                e.module && delete e.module
            } else e.factory !== r && (e.exports = e.factory);
            o.emit("compiled", e)
          } catch(u) {
            o.emit("compileFailed", u, e)
          }
        },
        autocompile: function() {
          this.unnamed() && this.compile()
        }
      },
        d.get = function(e) {
          return c[e]
        },
        d.has = function(e, t) {
          if (f[e]) return ! 0;
          var n = {
            id: e
          };
          return t && o.emit("alias", n),
            c[n.id] ? !0: !1
        },
        d.save = function(e) {
          c[e.uid] = e,
            o.emit("saved", e),
            e.autocompile()
        },
        d.require = function(e) {
          var t = d.get(e);
          return t ? (t.compiled || (t.compiled = !0, t.compile()), o.emit("required", t), t.exports) : (o.emit("requireFailed", {
            id: e
          }), null)
        },
        d.makeRequire = function(e) {
          e.require = function(t) {
            var n = {
              id: t
            };
            return o.emit("relative", n, e),
              o.emit("alias", n),
              d.require(n.id)
          }
        },
        d.define = function(e, t, n) {
          var r = arguments.length;
          return 1 === r ? (n = e, e = u) : 2 === r && (n = t, t = l, i.isString(e) || (t = e, e = u)),
            d.has(e, !0) ? (o.emit("existed", {
              id: e
            }), null) : void d.save(new d(e, t, n))
        },
        d.define.fmd = {};
      var g = e.define;
      return t.noConflict = function() {
        e.define = g
      },
        t.define = e.define = d.define,
        d
    }),
  fmd("alias", ["config", "event"],
    function(e, t) {
      "use strict";
      var n = "alias";
      e.register({
        keys: n,
        name: "object"
      }),
        t.on(n,
          function(t) {
            var i,
              o = e.get(n);
            o && (i = o[t.id]) && (t.id = i)
          })
    }),
  fmd("relative", ["lang", "event", "module"],
    function(e, t) {
      "use strict";
      var n = /.*\//,
        i = /\/\.\//,
        o = /[^\/]+\/\.\.\//,
        r = {
          cwd: function(e) {
            return e.match(n)[0]
          },
          isDotStart: function(e) {
            return "." === e.charAt(0)
          },
          hasSlash: function(e) {
            return e.lastIndexOf("/") > 0
          },
          resolve: function(e, t) {
            for (var n = (e + t).replace(i, "/"); n.match(o);) n = n.replace(o, "");
            return n
          }
        };
      return t.on("relative",
        function(e, t) {
          r.isDotStart(e.id) && t && r.hasSlash(t.id) && (t._cwd || (t._cwd = r.cwd(t.id)), e.id = r.resolve(t._cwd, e.id))
        }),
        r
    }),
  fmd("id2url", ["global", "event", "config"],
    function(e, t, n) {
      "use strict";
      var i = /^https?:\/\//i,
        o = (new Date).getTime(),
        r = "resolve",
        u = "stamp";
      n.set({
        baseUrl: function() {
          var t = /^\w+\:\/\/[\w\-\.:]+\//i,
            n = e.document.getElementsByTagName("script"),
            i = n[n.length - 1],
            o = i.hasAttribute ? i.src: i.getAttribute("src", 4),
            r = o ? o.match(t) : null;
          return r ? r[0] : ""
        } ()
      }),
        n.register({
          keys: r,
          name: "array"
        }).register({
          keys: u,
          name: "object"
        });
      var l = function(e) {
          var t,
            i = n.get(r);
          if (i) for (var o = 0, u = i.length; u > o && (t = i[o](e.id), t === e.id); o++);
          e.url = t ? t: e.id
        },
        a = function(e) {
          i.test(e.url) || (e.url = n.get("baseUrl") + e.url)
        },
        s = function(e) {
          var t = e.url;
          t.lastIndexOf(".") < t.lastIndexOf("/") && (e.url += ".js")
        },
        c = function(e) {
          var t = n.get("hasStamp") ? o: null,
            i = n.get(u);
          if (i) for (var r in i) if (new RegExp(r).test(e.id)) {
            t = i[r];
            break
          }
          t && (e.url += "?fmd.stamp=" + t)
        },
        f = function(e) {
          t.emit(r, e),
            a(e),
            s(e),
            t.emit(u, e)
        };
      t.on(r, l),
        t.on(u, c),
        t.on("id2url", f)
    }),
  fmd("assets", ["cache", "lang", "event", "config", "module"],
    function(e, t, n, i, o) {
      "use strict";
      var r = e.assets = {},
        u = {},
        l = {
          make: function(e, t) {
            var i = {
              id: e
            };
            return n.emit("analyze", i),
              n.emit("relative", i, t),
              n.emit("alias", i),
              u[i.id] ? r[u[i.id]] : (o.has(i.id) ? i.url = i.id: n.emit("id2url", i), u[i.id] = i.url, r[i.url] = i)
          },
          group: function(e) {
            return t.map(e.deps,
              function(t) {
                return l.make(t, e)
              })
          }
        };
      return l
    }),
  fmd("when",
    function() {
      "use strict";
      var e = function() {},
        t = function(t) {
          var n = this,
            i = [],
            o = 0,
            r = 0;
          t = t || 0;
          var u = function() {
              o + r === t && l()
            },
            l = function() {
              n.then = r ?
                function(e, t) {
                  t && t()
                }: function(e) {
                e && e()
              },
                l = e,
                a(r ? 1: 0),
                a = e,
                i = []
            },
            a = function(e) {
              for (var t, n, o = 0; t = i[o++];) n = t[e],
                n && n()
            };
          this.then = function(e, t) {
            i.push([e, t])
          },
            this.resolve = function() {
              o++,
                u()
            },
            this.reject = function() {
              r++,
                u()
            },
            u()
        },
        n = function() {
          for (var e, n = arguments.length, i = new t(n), o = 0; e = arguments[o++];) e(i);
          return i
        };
      return n
    }),
  fmd("request", ["global", "config", "event"],
    function(e, t, n) {
      "use strict";
      var i = e.document,
        o = e.setTimeout,
        r = /\.css(?:\?|$)/i,
        u = /loaded|complete/,
        l = /security|denied/i,
        a = /.*webkit\/?(\d+)\..*/,
        s = /mobile/,
        c = "requested",
        f = "charset",
        d = e.navigator.userAgent.toLowerCase(),
        g = d.match(a),
        m = g ? 1 * g[1] < 536: !1,
        p = m || !g && s.test(d),
        y = i && (i.head || i.getElementsByTagName("head")[0] || i.documentElement),
        h = function(e, o) {
          var r;
          return o ? (r = i.createElement("link"), r.rel = "stylesheet", r.href = e.url) : (r = i.createElement("script"), r.async = !0, r.src = e.url),
            t.get(f) && (r.charset = t.get(f)),
            n.emit("createNode", r, e),
            r
        },
        v = function(e, t, i) {
          var r,
            u,
            a = !1;
          try {
            r = e.sheet,
              r && (u = r.cssRules, a = u ? u.length > 0: void 0 !== u)
          } catch(s) {
            a = l.test(s.message)
          }
          o(function() {
              a ? (t && t(), n.emit(c, i)) : v(e, t, i)
            },
            20)
        },
        b = function(e, i, o, r, l) {
          function a() {
            e.onload = e.onreadystatechange = e.onerror = null,
              l || t.get("debug") || e.parentNode && e.parentNode.removeChild(e),
              e = void 0,
              i && i()
          }
          o ? (e.onload = function() {
            a(),
              n.emit(c, r)
          },
            e.onerror = function() {
              a(),
                n.emit("requestError", r)
            }) : e.onreadystatechange = function() {
            u.test(e.readyState) && (a(), n.emit(c, r))
          }
        },
        k = function(e, t, n, i) {
          return ! n || p ? void o(function() {
              v(e, t, i)
            },
            1) : void b(e, t, n, i, !0)
        },
        q = function(e, t) {
          var n = r.test(e.url),
            i = h(e, n),
            o = "onload" in i;
          n ? k(i, t, o, e) : b(i, t, o, e),
            y.appendChild(i)
        };
      return q
    }),
  fmd("loader", ["global", "event", "config", "request"],
    function(e, t, n, i) {
      "use strict";
      var o = "loading",
        r = "loaded",
        u = "requestComplete",
        l = function() {};
      n.set({
        timeout: 1e4
      }),
        t.on(u,
          function(e) {
            var t,
              n;
            for (e.state = r, n = e.onload; t = n.shift();) t()
          });
      var a = function(a, s) {
        return s || (s = l),
            a.state === r ? void s() : a.state === o ? void a.onload.push(s) : (a.state = o, a.onload = [s], t.emit("request", a, s), void(a.requested || (a.timer = e.setTimeout(function() {
            t.emit("requestTimeout", a)
          },
          n.get("timeout")), i(a,
          function() {
            e.clearTimeout(a.timer),
              t.emit(u, a)
          }))))
      };
      return a
    }),
  fmd("remote", ["lang", "event", "module", "assets", "when", "loader"],
    function(e, t, n, i, o, r) {
      "use strict";
      var u = {};
      return u.bring = u.get = function(t, i) {
        o.apply(null, e.map(t,
          function(e) {
            return function(t) {
              n.has(e.id) ? t.resolve() : r(e,
                function() {
                  t.resolve()
                })
            }
          })).then(i)
      },
        u.fetch = function(r, l) {
          var a = i.group(r);
          t.emit("fetch", a),
            u.bring(a,
              function() {
                o.apply(null, e.map(a,
                  function(e) {
                    return function(t) {
                      var i = n.get(e.id);
                      i && !i.compiled && i.deps.length ? u.fetch(i,
                        function() {
                          t.resolve()
                        }) : t.resolve()
                    }
                  })).then(function() {
                  l.call(null, a)
                })
              })
        },
        u
    }),
  fmd("use", ["lang", "event", "module", "remote"],
    function(e, t, n, i) {
      "use strict";
      t.on("makeRequire",
        function(t, o) {
          t.use = function(t, r) {
            e.isArray(t) || (t = [t]),
              i.fetch({
                  id: o.id,
                  deps: t
                },
                function(t) {
                  var i = e.map(t,
                    function(e) {
                      return n.require(e.id)
                    });
                  r && r.apply(null, i)
                })
          }
        })
    }),
  fmd("async", ["config", "module", "remote"],
    function(e, t, n) {
      "use strict";
      var i = t.prototype.autocompile,
        o = function() {
          var e = this;
          e.unnamed() && n.fetch(e,
            function() {
              e.compile()
            })
        };
      e.register({
        keys: "async",
        rule: function(e, n, r) {
          r = !!r,
            e !== r && (this.async = r, t.prototype.autocompile = r === !0 ? o: i)
        }
      }).set({
        async: !0
      })
    }),
  fmd("logger", ["global", "require", "env", "config", "assets", "loader", "console"],
    function(e, t, n, i, o, r, u) {
      "use strict";
      var l = n.log = function() {},
        a = e.console,
        s = function(e) {
          n.log = e ? a && a.warn ?
            function(e, t) {
              a[t || "log"](e)
            }: function(e, n) {
            u ? u(e, n) : r && r(o.make("fmd/console"),
              function() {
                u || (u = t("console")),
                  u(e, n)
              })
          }: l
        };
      i.register({
        keys: "debug",
        rule: function(e, t, n) {
          s(n),
            this.debug = n
        }
      })
    }),
  fmd("plugin", ["cache", "lang", "event", "config", "when", "remote"],
    function(e, t, n, i, o, r) {
      "use strict";
      var u = e.plugin = {},
        l = /(.+)!(.+)/,
        a = "analyze",
        s = {
          defaultPlugin: "async",
          register: function(e, t) {
            u[e] = t
          },
          sorting: function(e) {
            var n,
              i,
              o = [],
              r = {};
            return t.forEach(e,
              function(e) {
                r[e.plugin] > -1 ? i = o[r[e.plugin]] : (n = r[e.plugin] = o.length, i = o[n] = {
                  group: [],
                  execute: u[e.plugin]
                }),
                  i.group.push(e)
              }),
              o
          }
        };
      s.register(s.defaultPlugin,
        function(e) {
          r.get(this.group, e)
        });
      var c = function(e) {
          var t = e.id.match(l);
          t && (e.plugin = t[1], e.id = t[2]),
            !u[e.plugin] && (e.plugin = s.defaultPlugin)
        },
        f = function(e, n) {
          o.apply(null, t.map(s.sorting(e),
            function(e) {
              return function(t) {
                e.execute ? e.execute(function() {
                  t.resolve()
                }) : t.resolve()
              }
            })).then(n)
        };
      return i.register({
        keys: "plugin",
        rule: function(e, t, i) {
          i = !!i,
            e !== i && (this.plugin = i, i === !0 ? (n.on(a, c), r.bring = f) : (n.off(a, c), r.bring = r.get))
        }
      }).set({
        plugin: !0
      }),
        s
    }),
  fmd("preload", ["global", "lang", "event", "when", "request", "loader"],
    function(e, t, n, i, o, r) {
      "use strict";
      var u = e.document,
        l = "async" in u.createElement("script") || "MozAppearance" in u.documentElement.style || e.opera,
        a = "text/cache-javascript",
        s = "preloading",
        c = "preloaded";
      n.on("createNode",
        function(e, t) {
          t.isPreload && (e.async = !1, e.defer = !1, !l && (e.type = a))
        }),
        n.on("request",
          function(e, t) {
            e.preState && (e.preState === s ? (e.onpreload.push(function() {
              r(e, t)
            }), delete e.state, e.requested = !0) : (delete e.requested, delete e.isPreload))
          });
      var f = function(e) {
          e.preState || (e.preState = s, e.onpreload = [], o(e,
            function() {
              e.preState = c,
                t.forEach(e.onpreload,
                  function(e) {
                    e()
                  })
            }))
        },
        d = function(e, n) {
          i.apply(null, t.map(e,
            function(e) {
              return function(t) {
                e.isPreload = !0,
                  r(e,
                    function() {
                      t.resolve()
                    })
              }
            })).then(n)
        },
        g = function(e, n) {
          var i = e.slice(1);
          i.length ? (t.forEach(e,
            function(e) {
              e.isPreload || (e.isPreload = !0, f(e))
            }), r(e[0],
            function() {
              m(i, n)
            })) : r(e[0], n)
        },
        m = function(e, t) { (m = l ? d: g)(e, t)
        };
      return m
    }),
  fmd("non", ["plugin", "preload"],
    function(e, t) {
      "use strict";
      e.register("non",
        function(e) {
          t(this.group, e)
        })
    }),
  fmd("combo", ["cache", "lang", "event", "config", "module", "assets", "plugin", "when", "loader", "preload"],
    function(e, t, n, i, o, r, u, l, a, s) {
      "use strict";
      var c = e.combo = {},
        f = "async",
        d = "non",
        g = "_combo",
        m = "_combo_non",
        p = "comboSyntax",
        y = "comboMaxLength",
        h = "fetch",
        v = /\.css(?:\?|$)/i,
        b = /(^\w+\:\/\/[\w\-\.:]+\/)(.+)/i,
        k = ["??", ","],
        q = 1500,
        w = function(e) {
          var t = k[0],
            n = k[1];
          return t && e.indexOf(t) > 0 || n && e.indexOf(n) > 0
        },
        x = function(e) {
          return e.substring(e.lastIndexOf("."))
        },
        j = function(e, t) {
          var n = e.match(b);
          t._host = n[1],
            t._path = n[2]
        },
        E = function(e) {
          var t = e.url.split("?fmd.stamp")[0],
            n = x(t);
          return j(t, e),
            [n, e._host].join("_")
        },
        _ = function(e, t) {
          if (e.included.length > 1 || e.plugin === m) n.emit("stamp", e),
            c[e.url] = e,
            t.push(e);
          else {
            var i = e.included[0];
            delete i.requested
          }
        },
        S = function(e, t) {
          return e.url + k[e.url === t._host ? 0: 1] + t._path
        },
        A = function(e) {
          if (! (e.length < 2)) {
            i.get(p) && (k = i.get(p)),
              i.get(y) && (q = i.get(y));
            for (var n, u, l = [], a = 0; a < e.length; a++) n = e[a],
              n.plugin !== f && n.plugin !== d || n.comboed || n.state || n.preState || (!v.test(n.url) || w(n.url) ? n.url !== n.id ? w(n.url) || l.push(n) : (u = o.get(n.id), u && !u.compiled && t.forEach(u.deps,
              function(t) {
                e.push(r.make(t, u))
              })) : l.push(n));
            l.length && z(l, e)
          }
        },
        z = function(e, n) {
          var i,
            o,
            r,
            u,
            l = {},
            a = function(e, t) {
              var n = l[e] = {
                url: t._host,
                plugin: g,
                included: []
              };
              return n
            };
          t.forEach(e,
            function(e) {
              i = E(e),
                o = l[i] || a(i, e),
                r = S(o, e),
                r.length > q && (_(o, n), delete l[i], o = a(i, e), r = S(o, e)),
                o.url = r,
                o.included.push(e),
                e.plugin === d && (o.plugin = m, e.plugin = f),
                e.comboed = !0,
                e.requested = !0
            });
          for (u in l) _(l[u], n)
        },
        O = function(e) {
          t.forEach(e.included,
            function(e) {
              n.emit("requestComplete", e)
            })
        },
        C = function(e) {
          l.apply(null, t.map(this.group,
            function(e) {
              return function(t) {
                a(e,
                  function() {
                    O(e),
                      t.resolve()
                  })
              }
            })).then(e)
        },
        F = function(e) {
          var n = this.group;
          s(n,
            function() {
              t.forEach(n,
                function(e) {
                  O(e)
                }),
                e()
            })
        };
      i.register({
        keys: "combo",
        rule: function(e, t, i) {
          i = !!i,
            e !== i && (this.combo = i, i === !0 ? (n.on(h, A), u.register(g, C), u.register(m, F)) : (n.off(h, A), u.register(g, null), u.register(m, null)))
        }
      }).set({
        combo: !0
      })
    }),
  function(e) {
    if (!e.lofty) {
      var t = function(t) {
        e[t] = {
          define: fmd.define,
          log: function() {
            fmd.log.apply(null, arguments)
          },
          config: fmd.config,
          on: fmd.on,
          off: fmd.off
        }
      };
      t("lofty");
      var n = e.lofty;
      n.appframe = t,
        n.cache = fmd.cache;
      var i = /([a-z])([A-Z])/g;
      n.on("resolve",
        function(e) {
          e.url = e.url.replace(i,
            function(e, t, n) {
              return t + "-" + n
            }).toLowerCase()
        });
      var o = /\.art$/;
      n.on("resolve",
        function(e) {
          o.test(e.url) && (e.url += ".js")
        }),
        n.on("existed",
          function(e) {
            n.log(e.id + ": already exists.", "error")
          }),
        n.on("compiled",
          function(e) {
            n.log(e.uid + ": compiled.")
          }),
        n.on("compileFailed",
          function(e) {
            if (!n.config("hasCatch") || n.config("debug")) throw e
          }),
        n.on("required",
          function(e) {
            e.visits ? e.visits++:e.visits = 1,
              n.log(e.id + ": required " + e.visits + ".")
          }),
        n.on("requireFailed",
          function(e) {
            e.truth = !0,
              (!e.id || e.id.indexOf(".css") > 0) && (e.truth = !1),
              e.truth && n.log(e.id + ": not found!", "error")
          }),
        n.on("requested",
          function(e) {
            n.log(e.url + " requested.")
          }),
        n.on("requestTimeout",
          function(e) {
            n.log("request " + e.url + " timeout!", "error")
          });
      var r = /^https?:\/\//i,
        u = /\.css(?:\?|$)/;
      n.config({
        plugin: !1,
        combo: !1,
        resolve: function(e) {
          if (r.test(e)) return ! 1;
          var t = e.split("/"),
            n = t[0],
            i = u.test(e) ? "css/": "js/";
          switch (n) {
            case "lofty":
            case "lofty-mobile":
            case "gallery":
              e = "fdevlib/" + i + e;
              break;
            case "sys":
              e = "sys/" + i + t.slice(1).join("/");
              break;
            case "fmd":
              e = "fdevlib/" + i + "lofty/port/fmdjs/" + e
          }
          return e
        },
        debug: function() {
          return e.location.href.indexOf("lofty.debug=true") > 0
        } ()
      }),
        n.config({
          alias: {
            "lofty/observer": "lofty/lang/observer",
            "lofty/base": "lofty/lang/base",
            "lofty/class": "lofty/lang/class",
            "lofty/log": "lofty/lang/log",
            "lofty/aop": "lofty/lang/aop",
            "fui/widget/1.0": "lofty/ui/widget/1.0/widget",
            "fui/tabs/1.0": "lofty/ui/tabs/1.0/tabs",
            "fui/tabs/2.0": "lofty/ui/tabs/2.0/tabs",
            "fui/tip/1.0": "lofty/ui/tip/1.0/tip",
            "fui/autocomplete/1.0": "lofty/ui/autocomplete/1.0/autocomplete",
            "fui/autorender/1.0": "lofty/ui/autorender/1.0/autorender",
            "fui/suggestion/1.0": "lofty/ui/suggestion/1.0/suggestion",
            "fui/suggestion-all/1.0": "lofty/ui/suggestion/1.0/suggestion-all",
            "fui/progressbar/1.0": "lofty/ui/progressbar/1.0/progressbar",
            "fui/placeholder/1.0": "lofty/ui/placeholder/1.0/placeholder",
            "fui/paging/1.0": "lofty/ui/paging/1.0/paging",
            "fui/combobox/1.0": "lofty/ui/combobox/1.0/combobox",
            "fui/flash/1.0": "lofty/ui/flash/1.0/flash",
            "fui/flashchart/1.0": "lofty/ui/flashchart/1.0/flashchart",
            "fui/flashuploader/1.0": "lofty/ui/flashuploader/1.0/flashuploader",
            "fui/clipboard/1.0": "lofty/ui/flashclipboard/1.0/flashclipboard",
            "fui/mouse/1.0": "lofty/ui/sortable/1.0/mouse",
            "fui/sortable/1.0": "lofty/ui/sortable/1.0/sortable",
            "fui/dragdrop/1.0": "lofty/ui/dragdrop/1.0/dragdrop",
            "fui/dialog/1.0": "lofty/ui/dialog/1.0/dialog",
            "fui/position/1.0": "lofty/ui/position/1.0/position",
            "fui/timer/1.0": "lofty/ui/timer/1.0/timer",
            "fui/sidebar/2.0": "lofty/ui/sidebar/2.0/sidebar",
            "fui/datepicker/1.0": "lofty/ui/datepicker/1.0/datepicker",
            "fui/qrcode/1.0": "lofty/ui/qrcode/1.0/qrcode",
            "util/cookie/1.0": "lofty/util/cookie/1.0/cookie",
            "util/websocket/1.0": "lofty/util/websocket/1.0/websocket",
            "util/storage/1.0": "lofty/util/storage/1.0/storage",
            "util/misc/1.0": "lofty/util/misc/1.0/misc",
            "util/history/1.0": "lofty/util/history/1.0/history",
            "util/template/1.0": "lofty/util/template/1.0/template",
            "util/template/2.0": "lofty/util/template/2.0/template",
            "util/history-manager/1.0": "lofty/util/history/1.0/history-manager",
            "util/datalazyload/1.0": "lofty/util/datalazyload/1.0/datalazyload",
            "util/datalazyload/2.0": "lofty/util/datalazyload/2.0/datalazyload",
            "util/date/1.0": "lofty/util/date/1.0/date",
            "util/misc/2.0": "lofty/util/misc/2.0/misc",
            "util/string/1.0": "lofty/util/string/1.0/string",
            "util/webp/1.0": "lofty/util/webp/1.0/webp",
            "util/exposure/1.0": "lofty/util/exposure/1.0/exposure",
            "util/messenger/1.0": "lofty/util/messenger/1.0/messenger",
            "util/cms-vm/1.0": "lofty/util/cms-vm/1.0/cms-vm",
            "util/cms-vm-jsonp/1.0": "lofty/util/cms-vm/1.0/cms-vm-jsonp",
            "util/localstorage/1.0": "lofty/util/localstorage/1.0/localstorage",
            "alicn/now/1.0": "lofty/alicn/now/1.0/now",
            "alicn/now/2.0": "lofty/alicn/now/2.0/now",
            "alicn/geoinfo/1.0": "lofty/alicn/geoinfo/1.0/geoinfo",
            "alicn/subcookie/1.0": "lofty/alicn/subcookie/1.0/subcookie",
            "alicn/monitor/1.0": "lofty/alicn/monitor/1.0/monitor",
            "alicn/aliuser/1.0": "lofty/alicn/aliuser/1.0/aliuser",
            "alicn/alitalk/1.0": "lofty/alicn/alitalk/1.0/alitalk",
            "alicn/alitalk-shunt/1.0": "lofty/alicn/alitalk/1.0/alitalk-shunt",
            "sys/alibar/1.0": "sys/universal/alibar/standard-v5",
            "sys/logist/1.0": "sys/logist/logist-fdev5"
          }
        }),
        e.jQuery && (define("gallery/jquery/jqueryLatest",
        function() {
          return jQuery
        }), n.config({
        alias: {
          jquery: "gallery/jquery/jqueryLatest"
        }
      })),
        e.af && (define("gallery/appframework/appframework",
        function() {
          return af
        }), n.config({
        alias: {
          jquery: "gallery/appframework/appframework"
        }
      })),
        e.lofty && (e.lofty.test = {})
    }
  } (this);
var pkgConfigBuild = {
  stamp: "20150115224443"
}; !
  function(e) {
    "use strict";
    var p = {
      resolve: function(e) {
        var p = e.split("/"),
          a = p[0];
        switch (a) {
          case "work_widget":
            e = "app/workwidget/widget/" + p[1].replace(".art", "") + "/" + p[1];
            break;
          case "work_widget_css":
            e = "app/workwidget/widget/" + p[1].replace(".css", "") + "/" + p[1];
            break;
          case "work_app":
            e = "app/aliwork/main_site/" + e.replace("work_app/", "");
            break;
          case "link":
            e = "fdevlib/js/app/link/1.0/" + e.replace("link/", "");
            break;
          case "hello_link":
            e = "app/aliwork/main_site/" + e.replace("work_app/", "")
        }
        return e
      },
      alias: {
        "work_app/view": "work_app/script/core/view",
        "work_app/class": "lofty/lang/class",
        "work_app/application": "work_app/script/core/application"
      },
      baseUrl: "http://style.c.aliimg.com/",
      dependApps: ["style-workwidget"]
    };
    "undefined" != typeof e.lofty && e.lofty.config(p),
      "undefined" != typeof exports && e === exports && (exports.configs = p)
  } (this);
window.jQuery ||
function(e, t) {
  function n(e) {
    var t = ht[e] = {};
    return K.each(e.split(tt),
      function(e, n) {
        t[n] = !0
      }),
      t
  }
  function r(e, n, r) {
    if (r === t && 1 === e.nodeType) {
      var i = "data-" + n.replace(mt, "-$1").toLowerCase();
      if (r = e.getAttribute(i), "string" == typeof r) {
        try {
          r = "true" === r ? !0: "false" === r ? !1: "null" === r ? null: +r + "" === r ? +r: gt.test(r) ? K.parseJSON(r) : r
        } catch(o) {}
        K.data(e, n, r)
      } else r = t
    }
    return r
  }
  function i(e) {
    var t;
    for (t in e) if (("data" !== t || !K.isEmptyObject(e[t])) && "toJSON" !== t) return ! 1;
    return ! 0
  }
  function o() {
    return ! 1
  }
  function a() {
    return ! 0
  }
  function s(e) {
    return ! e || !e.parentNode || 11 === e.parentNode.nodeType
  }
  function l(e, t) {
    do e = e[t];
    while (e && 1 !== e.nodeType);
    return e
  }
  function u(e, t, n) {
    if (t = t || 0, K.isFunction(t)) return K.grep(e,
      function(e, r) {
        var i = !!t.call(e, r, e);
        return i === n
      });
    if (t.nodeType) return K.grep(e,
      function(e) {
        return e === t === n
      });
    if ("string" == typeof t) {
      var r = K.grep(e,
        function(e) {
          return 1 === e.nodeType
        });
      if (qt.test(t)) return K.filter(t, r, !n);
      t = K.filter(t, r)
    }
    return K.grep(e,
      function(e) {
        return K.inArray(e, t) >= 0 === n
      })
  }
  function c(e) {
    var t = Wt.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) for (; t.length;) n.createElement(t.pop());
    return n
  }
  function f(e, t) {
    return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
  }
  function p(e, t) {
    if (1 === t.nodeType && K.hasData(e)) {
      var n,
        r,
        i,
        o = K._data(e),
        a = K._data(t, o),
        s = o.events;
      if (s) {
        delete a.handle,
          a.events = {};
        for (n in s) for (r = 0, i = s[n].length; i > r; r++) K.event.add(t, n, s[n][r])
      }
      a.data && (a.data = K.extend({},
        a.data))
    }
  }
  function d(e, t) {
    var n;
    1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), K.support.html5Clone && e.innerHTML && !K.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Vt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected: "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue: "script" === n && t.text !== e.text && (t.text = e.text), t.removeAttribute(K.expando))
  }
  function h(e) {
    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
  }
  function g(e) {
    Vt.test(e.type) && (e.defaultChecked = e.checked)
  }
  function m(e, t) {
    if (t in e) return t;
    for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = vn.length; i--;) if (t = vn[i] + n, t in e) return t;
    return r
  }
  function y(e, t) {
    return e = t || e,
      "none" === K.css(e, "display") || !K.contains(e.ownerDocument, e)
  }
  function v(e, t) {
    for (var n, r, i = [], o = 0, a = e.length; a > o; o++) n = e[o],
      n.style && (i[o] = K._data(n, "olddisplay"), t ? (!i[o] && "none" === n.style.display && (n.style.display = ""), "" === n.style.display && y(n) && (i[o] = K._data(n, "olddisplay", T(n.nodeName)))) : (r = nn(n, "display"), !i[o] && "none" !== r && K._data(n, "olddisplay", r)));
    for (o = 0; a > o; o++) n = e[o],
      n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? i[o] || "": "none"));
    return e
  }
  function b(e, t, n) {
    var r = fn.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }
  function x(e, t, n, r) {
    for (var i = n === (r ? "border": "content") ? 4: "width" === t ? 1: 0, o = 0; 4 > i; i += 2)"margin" === n && (o += K.css(e, n + yn[i], !0)),
      r ? ("content" === n && (o -= parseFloat(nn(e, "padding" + yn[i])) || 0), "margin" !== n && (o -= parseFloat(nn(e, "border" + yn[i] + "Width")) || 0)) : (o += parseFloat(nn(e, "padding" + yn[i])) || 0, "padding" !== n && (o += parseFloat(nn(e, "border" + yn[i] + "Width")) || 0));
    return o
  }
  function w(e, t, n) {
    var r = "width" === t ? e.offsetWidth: e.offsetHeight,
      i = !0,
      o = K.support.boxSizing && "border-box" === K.css(e, "boxSizing");
    if (0 >= r || null == r) {
      if (r = nn(e, t), (0 > r || null == r) && (r = e.style[t]), pn.test(r)) return r;
      i = o && (K.support.boxSizingReliable || r === e.style[t]),
        r = parseFloat(r) || 0
    }
    return r + x(e, t, n || (o ? "border": "content"), i) + "px"
  }
  function T(e) {
    if (hn[e]) return hn[e];
    var t = K("<" + e + ">").appendTo(R.body),
      n = t.css("display");
    return t.remove(),
      ("none" === n || "" === n) && (rn = R.body.appendChild(rn || K.extend(R.createElement("iframe"), {
      frameBorder: 0,
      width: 0,
      height: 0
    })), on && rn.createElement || (on = (rn.contentWindow || rn.contentDocument).document, on.write("<!doctype html><html><body>"), on.close()), t = on.body.appendChild(on.createElement(e)), n = nn(t, "display"), R.body.removeChild(rn)),
      hn[e] = n,
      n
  }
  function N(e, t, n, r) {
    var i;
    if (K.isArray(t)) K.each(t,
      function(t, i) {
        n || wn.test(e) ? r(e, i) : N(e + "[" + ("object" == typeof i ? t: "") + "]", i, n, r)
      });
    else if (n || "object" !== K.type(t)) r(e, t);
    else for (i in t) N(e + "[" + i + "]", t[i], n, r)
  }
  function C(e) {
    return function(t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r,
        i,
        o,
        a = t.toLowerCase().split(tt),
        s = 0,
        l = a.length;
      if (K.isFunction(n)) for (; l > s; s++) r = a[s],
        o = /^\+/.test(r),
        o && (r = r.substr(1) || "*"),
        i = e[r] = e[r] || [],
        i[o ? "unshift": "push"](n)
    }
  }
  function k(e, n, r, i, o, a) {
    o = o || n.dataTypes[0],
      a = a || {},
      a[o] = !0;
    for (var s, l = e[o], u = 0, c = l ? l.length: 0, f = e === _n; c > u && (f || !s); u++) s = l[u](n, r, i),
      "string" == typeof s && (!f || a[s] ? s = t: (n.dataTypes.unshift(s), s = k(e, n, r, i, s, a)));
    return (f || !s) && !a["*"] && (s = k(e, n, r, i, "*", a)),
      s
  }
  function E(e, n) {
    var r,
      i,
      o = K.ajaxSettings.flatOptions || {};
    for (r in n) n[r] !== t && ((o[r] ? e: i || (i = {}))[r] = n[r]);
    i && K.extend(!0, e, i)
  }
  function S(e, n, r) {
    var i,
      o,
      a,
      s,
      l = e.contents,
      u = e.dataTypes,
      c = e.responseFields;
    for (o in c) o in r && (n[c[o]] = r[o]);
    for (;
      "*" === u[0];) u.shift(),
      i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
    if (i) for (o in l) if (l[o] && l[o].test(i)) {
      u.unshift(o);
      break
    }
    if (u[0] in r) a = u[0];
    else {
      for (o in r) {
        if (!u[0] || e.converters[o + " " + u[0]]) {
          a = o;
          break
        }
        s || (s = o)
      }
      a = a || s
    }
    return a ? (a !== u[0] && u.unshift(a), r[a]) : void 0
  }
  function j(e, t) {
    var n,
      r,
      i,
      o,
      a = e.dataTypes.slice(),
      s = a[0],
      l = {},
      u = 0;
    if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), a[1]) for (n in e.converters) l[n.toLowerCase()] = e.converters[n];
    for (; i = a[++u];) if ("*" !== i) {
      if ("*" !== s && s !== i) {
        if (n = l[s + " " + i] || l["* " + i], !n) for (r in l) if (o = r.split(" "), o[1] === i && (n = l[s + " " + o[0]] || l["* " + o[0]])) {
          n === !0 ? n = l[r] : l[r] !== !0 && (i = o[0], a.splice(u--, 0, i));
          break
        }
        if (n !== !0) if (n && e["throws"]) t = n(t);
        else try {
            t = n(t)
          } catch(c) {
            return {
              state: "parsererror",
              error: n ? c: "No conversion from " + s + " to " + i
            }
          }
      }
      s = i
    }
    return {
      state: "success",
      data: t
    }
  }
  function A() {
    try {
      return new e.XMLHttpRequest
    } catch(t) {}
  }
  function L() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch(t) {}
  }
  function D() {
    return setTimeout(function() {
        Qn = t
      },
      0),
      Qn = K.now()
  }
  function H(e, t) {
    K.each(t,
      function(t, n) {
        for (var r = (er[t] || []).concat(er["*"]), i = 0, o = r.length; o > i; i++) if (r[i].call(e, t, n)) return
      })
  }
  function F(e, t, n) {
    var r,
      i = 0,
      o = Zn.length,
      a = K.Deferred().always(function() {
        delete s.elem
      }),
      s = function() {
        for (var t = Qn || D(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r, o = 0, s = l.tweens.length; s > o; o++) l.tweens[o].run(i);
        return a.notifyWith(e, [l, i, n]),
            1 > i && s ? n: (a.resolveWith(e, [l]), !1)
      },
      l = a.promise({
        elem: e,
        props: K.extend({},
          t),
        opts: K.extend(!0, {
            specialEasing: {}
          },
          n),
        originalProperties: t,
        originalOptions: n,
        startTime: Qn || D(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var r = K.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
          return l.tweens.push(r),
            r
        },
        stop: function(t) {
          for (var n = 0, r = t ? l.tweens.length: 0; r > n; n++) l.tweens[n].run(1);
          return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]),
            this
        }
      }),
      u = l.props;
    for (M(u, l.opts.specialEasing); o > i; i++) if (r = Zn[i].call(l, e, u, l.opts)) return r;
    return H(l, u),
      K.isFunction(l.opts.start) && l.opts.start.call(e, l),
      K.fx.timer(K.extend(s, {
        anim: l,
        queue: l.opts.queue,
        elem: e
      })),
      l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }
  function M(e, t) {
    var n,
      r,
      i,
      o,
      a;
    for (n in e) if (r = K.camelCase(n), i = t[r], o = e[n], K.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = K.cssHooks[r], a && "expand" in a) {
      o = a.expand(o),
        delete e[r];
      for (n in o) n in e || (e[n] = o[n], t[n] = i)
    } else t[r] = i
  }
  function O(e, t, n) {
    var r,
      i,
      o,
      a,
      s,
      l,
      u,
      c,
      f,
      p = this,
      d = e.style,
      h = {},
      g = [],
      m = e.nodeType && y(e);
    n.queue || (c = K._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function() {
      c.unqueued || f()
    }), c.unqueued++, p.always(function() {
      p.always(function() {
        c.unqueued--,
          K.queue(e, "fx").length || c.empty.fire()
      })
    })),
      1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === K.css(e, "display") && "none" === K.css(e, "float") && (K.support.inlineBlockNeedsLayout && "inline" !== T(e.nodeName) ? d.zoom = 1: d.display = "inline-block")),
      n.overflow && (d.overflow = "hidden", K.support.shrinkWrapBlocks || p.done(function() {
      d.overflow = n.overflow[0],
        d.overflowX = n.overflow[1],
        d.overflowY = n.overflow[2]
    }));
    for (r in t) if (o = t[r], Jn.exec(o)) {
      if (delete t[r], l = l || "toggle" === o, o === (m ? "hide": "show")) continue;
      g.push(r)
    }
    if (a = g.length) {
      s = K._data(e, "fxshow") || K._data(e, "fxshow", {}),
        "hidden" in s && (m = s.hidden),
        l && (s.hidden = !m),
        m ? K(e).show() : p.done(function() {
          K(e).hide()
        }),
        p.done(function() {
          var t;
          K.removeData(e, "fxshow", !0);
          for (t in h) K.style(e, t, h[t])
        });
      for (r = 0; a > r; r++) i = g[r],
        u = p.createTween(i, m ? s[i] : 0),
        h[i] = s[i] || K.style(e, i),
        i in s || (s[i] = u.start, m && (u.end = u.start, u.start = "width" === i || "height" === i ? 1: 0))
    }
  }
  function q(e, t, n, r, i) {
    return new q.prototype.init(e, t, n, r, i)
  }
  function _(e, t) {
    var n,
      r = {
        height: e
      },
      i = 0;
    for (t = t ? 1: 0; 4 > i; i += 2 - t) n = yn[i],
      r["margin" + n] = r["padding" + n] = e;
    return t && (r.opacity = r.width = e),
      r
  }
  function B(e) {
    return K.isWindow(e) ? e: 9 === e.nodeType ? e.defaultView || e.parentWindow: !1
  }
  var W,
    P,
    R = e.document,
    $ = e.location,
    I = e.navigator,
    z = e.jQuery,
    X = e.$,
    U = Array.prototype.push,
    Y = Array.prototype.slice,
    Q = Array.prototype.indexOf,
    V = Object.prototype.toString,
    J = Object.prototype.hasOwnProperty,
    G = String.prototype.trim,
    K = function(e, t) {
      return new K.fn.init(e, t, W)
    },
    Z = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
    et = /\S/,
    tt = /\s+/,
    nt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rt = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
    it = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    ot = /^[\],:{}\s]*$/,
    at = /(?:^|:|,)(?:\s*\[)+/g,
    st = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
    ut = /^-ms-/,
    ct = /-([\da-z])/gi,
    ft = function(e, t) {
      return (t + "").toUpperCase()
    },
    pt = function() {
      R.addEventListener ? (R.removeEventListener("DOMContentLoaded", pt, !1), K.ready()) : "complete" === R.readyState && (R.detachEvent("onreadystatechange", pt), K.ready())
    },
    dt = {};
  K.fn = K.prototype = {
    constructor: K,
    init: function(e, n, r) {
      var i,
        o,
        a;
      if (!e) return this;
      if (e.nodeType) return this.context = this[0] = e,
        this.length = 1,
        this;
      if ("string" == typeof e) {
        if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : rt.exec(e), i && (i[1] || !n)) {
          if (i[1]) return n = n instanceof K ? n[0] : n,
            a = n && n.nodeType ? n.ownerDocument || n: R,
            e = K.parseHTML(i[1], a, !0),
            it.test(i[1]) && K.isPlainObject(n) && this.attr.call(e, n, !0),
            K.merge(this, e);
          if (o = R.getElementById(i[2]), o && o.parentNode) {
            if (o.id !== i[2]) return r.find(e);
            this.length = 1,
              this[0] = o
          }
          return this.context = R,
            this.selector = e,
            this
        }
        return ! n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
      }
      return K.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), K.makeArray(e, this))
    },
    selector: "",
    jquery: "1.8.3",
    length: 0,
    size: function() {
      return this.length
    },
    toArray: function() {
      return Y.call(this)
    },
    get: function(e) {
      return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
    },
    pushStack: function(e, t, n) {
      var r = K.merge(this.constructor(), e);
      return r.prevObject = this,
        r.context = this.context,
          "find" === t ? r.selector = this.selector + (this.selector ? " ": "") + n: t && (r.selector = this.selector + "." + t + "(" + n + ")"),
        r
    },
    each: function(e, t) {
      return K.each(this, e, t)
    },
    ready: function(e) {
      return K.ready.promise().done(e),
        this
    },
    eq: function(e) {
      return e = +e,
          -1 === e ? this.slice(e) : this.slice(e, e + 1)
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq( - 1)
    },
    slice: function() {
      return this.pushStack(Y.apply(this, arguments), "slice", Y.call(arguments).join(","))
    },
    map: function(e) {
      return this.pushStack(K.map(this,
        function(t, n) {
          return e.call(t, n, t)
        }))
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: U,
    sort: [].sort,
    splice: [].splice
  },
    K.fn.init.prototype = K.fn,
    K.extend = K.fn.extend = function() {
      var e,
        n,
        r,
        i,
        o,
        a,
        s = arguments[0] || {},
        l = 1,
        u = arguments.length,
        c = !1;
      for ("boolean" == typeof s && (c = s, s = arguments[1] || {},
        l = 2), "object" != typeof s && !K.isFunction(s) && (s = {}), u === l && (s = this, --l); u > l; l++) if (null != (e = arguments[l])) for (n in e) r = s[n],
        i = e[n],
        s !== i && (c && i && (K.isPlainObject(i) || (o = K.isArray(i))) ? (o ? (o = !1, a = r && K.isArray(r) ? r: []) : a = r && K.isPlainObject(r) ? r: {},
        s[n] = K.extend(c, a, i)) : i !== t && (s[n] = i));
      return s
    },
    K.extend({
      noConflict: function(t) {
        return e.$ === K && (e.$ = X),
          t && e.jQuery === K && (e.jQuery = z),
          K
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function(e) {
        e ? K.readyWait++:K.ready(!0)
      },
      ready: function(e) {
        if (e === !0 ? !--K.readyWait: !K.isReady) {
          if (!R.body) return setTimeout(K.ready, 1);
          K.isReady = !0,
            e !== !0 && --K.readyWait > 0 || (P.resolveWith(R, [K]), K.fn.trigger && K(R).trigger("ready").off("ready"))
        }
      },
      isFunction: function(e) {
        return "function" === K.type(e)
      },
      isArray: Array.isArray ||
        function(e) {
          return "array" === K.type(e)
        },
      isWindow: function(e) {
        return null != e && e == e.window
      },
      isNumeric: function(e) {
        return ! isNaN(parseFloat(e)) && isFinite(e)
      },
      type: function(e) {
        return null == e ? String(e) : dt[V.call(e)] || "object"
      },
      isPlainObject: function(e) {
        if (!e || "object" !== K.type(e) || e.nodeType || K.isWindow(e)) return ! 1;
        try {
          if (e.constructor && !J.call(e, "constructor") && !J.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
        } catch(n) {
          return ! 1
        }
        var r;
        for (r in e);
        return r === t || J.call(e, r)
      },
      isEmptyObject: function(e) {
        var t;
        for (t in e) return ! 1;
        return ! 0
      },
      error: function(e) {
        throw new Error(e)
      },
      parseHTML: function(e, t, n) {
        var r;
        return e && "string" == typeof e ? ("boolean" == typeof t && (n = t, t = 0), t = t || R, (r = it.exec(e)) ? [t.createElement(r[1])] : (r = K.buildFragment([e], t, n ? null: []), K.merge([], (r.cacheable ? K.clone(r.fragment) : r.fragment).childNodes))) : null
      },
      parseJSON: function(t) {
        return t && "string" == typeof t ? (t = K.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : ot.test(t.replace(st, "@").replace(lt, "]").replace(at, "")) ? new Function("return " + t)() : void K.error("Invalid JSON: " + t)) : null
      },
      parseXML: function(n) {
        var r,
          i;
        if (!n || "string" != typeof n) return null;
        try {
          e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
        } catch(o) {
          r = t
        }
        return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && K.error("Invalid XML: " + n),
          r
      },
      noop: function() {},
      globalEval: function(t) {
        t && et.test(t) && (e.execScript ||
          function(t) {
            e.eval.call(e, t)
          })(t)
      },
      camelCase: function(e) {
        return e.replace(ut, "ms-").replace(ct, ft)
      },
      nodeName: function(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
      },
      each: function(e, n, r) {
        var i,
          o = 0,
          a = e.length,
          s = a === t || K.isFunction(e);
        if (r) if (s) {
          for (i in e) if (n.apply(e[i], r) === !1) break
        } else for (; a > o && n.apply(e[o++], r) !== !1;);
        else if (s) {
          for (i in e) if (n.call(e[i], i, e[i]) === !1) break
        } else for (; a > o && n.call(e[o], o, e[o++]) !== !1;);
        return e
      },
      trim: G && !G.call("\ufeff\xa0") ?
        function(e) {
          return null == e ? "": G.call(e)
        }: function(e) {
        return null == e ? "": (e + "").replace(nt, "")
      },
      makeArray: function(e, t) {
        var n,
          r = t || [];
        return null != e && (n = K.type(e), null == e.length || "string" === n || "function" === n || "regexp" === n || K.isWindow(e) ? U.call(r, e) : K.merge(r, e)),
          r
      },
      inArray: function(e, t, n) {
        var r;
        if (t) {
          if (Q) return Q.call(t, e, n);
          for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n: 0; r > n; n++) if (n in t && t[n] === e) return n
        }
        return - 1
      },
      merge: function(e, n) {
        var r = n.length,
          i = e.length,
          o = 0;
        if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o];
        else for (; n[o] !== t;) e[i++] = n[o++];
        return e.length = i,
          e
      },
      grep: function(e, t, n) {
        var r,
          i = [],
          o = 0,
          a = e.length;
        for (n = !!n; a > o; o++) r = !!t(e[o], o),
          n !== r && i.push(e[o]);
        return i
      },
      map: function(e, n, r) {
        var i,
          o,
          a = [],
          s = 0,
          l = e.length,
          u = e instanceof K || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || K.isArray(e));
        if (u) for (; l > s; s++) i = n(e[s], s, r),
          null != i && (a[a.length] = i);
        else for (o in e) i = n(e[o], o, r),
          null != i && (a[a.length] = i);
        return a.concat.apply([], a)
      },
      guid: 1,
      proxy: function(e, n) {
        var r,
          i,
          o;
        return "string" == typeof n && (r = e[n], n = e, e = r),
          K.isFunction(e) ? (i = Y.call(arguments, 2), o = function() {
            return e.apply(n, i.concat(Y.call(arguments)))
          },
            o.guid = e.guid = e.guid || K.guid++, o) : t
      },
      access: function(e, n, r, i, o, a, s) {
        var l,
          u = null == r,
          c = 0,
          f = e.length;
        if (r && "object" == typeof r) {
          for (c in r) K.access(e, n, c, r[c], 1, a, i);
          o = 1
        } else if (i !== t) {
          if (l = s === t && K.isFunction(i), u && (l ? (l = n, n = function(e, t, n) {
            return l.call(K(e), n)
          }) : (n.call(e, i), n = null)), n) for (; f > c; c++) n(e[c], r, l ? i.call(e[c], c, n(e[c], r)) : i, s);
          o = 1
        }
        return o ? e: u ? n.call(e) : f ? n(e[0], r) : a
      },
      now: function() {
        return (new Date).getTime()
      }
    }),
    K.ready.promise = function(t) {
      if (!P) if (P = K.Deferred(), "complete" === R.readyState) setTimeout(K.ready, 1);
      else if (R.addEventListener) R.addEventListener("DOMContentLoaded", pt, !1),
        e.addEventListener("load", K.ready, !1);
      else {
        R.attachEvent("onreadystatechange", pt),
          e.attachEvent("onload", K.ready);
        var n = !1;
        try {
          n = null == e.frameElement && R.documentElement
        } catch(r) {}
        n && n.doScroll &&
        function i() {
          if (!K.isReady) {
            try {
              n.doScroll("left")
            } catch(e) {
              return setTimeout(i, 50)
            }
            K.ready()
          }
        } ()
      }
      return P.promise(t)
    },
    K.each("Boolean Number String Function Array Date RegExp Object".split(" "),
      function(e, t) {
        dt["[object " + t + "]"] = t.toLowerCase()
      }),
    W = K(R);
  var ht = {};
  K.Callbacks = function(e) {
    e = "string" == typeof e ? ht[e] || n(e) : K.extend({},
      e);
    var r,
      i,
      o,
      a,
      s,
      l,
      u = [],
      c = !e.once && [],
      f = function(t) {
        for (r = e.memory && t, i = !0, l = a || 0, a = 0, s = u.length, o = !0; u && s > l; l++) if (u[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
          r = !1;
          break
        }
        o = !1,
          u && (c ? c.length && f(c.shift()) : r ? u = [] : p.disable())
      },
      p = {
        add: function() {
          if (u) {
            var t = u.length; !
              function n(t) {
                K.each(t,
                  function(t, r) {
                    var i = K.type(r);
                    "function" === i ? (!e.unique || !p.has(r)) && u.push(r) : r && r.length && "string" !== i && n(r)
                  })
              } (arguments),
              o ? s = u.length: r && (a = t, f(r))
          }
          return this
        },
        remove: function() {
          return u && K.each(arguments,
            function(e, t) {
              for (var n; (n = K.inArray(t, u, n)) > -1;) u.splice(n, 1),
                o && (s >= n && s--, l >= n && l--)
            }),
            this
        },
        has: function(e) {
          return K.inArray(e, u) > -1
        },
        empty: function() {
          return u = [],
            this
        },
        disable: function() {
          return u = c = r = t,
            this
        },
        disabled: function() {
          return ! u
        },
        lock: function() {
          return c = t,
            r || p.disable(),
            this
        },
        locked: function() {
          return ! c
        },
        fireWith: function(e, t) {
          return t = t || [],
            t = [e, t.slice ? t.slice() : t],
            u && (!i || c) && (o ? c.push(t) : f(t)),
            this
        },
        fire: function() {
          return p.fireWith(this, arguments),
            this
        },
        fired: function() {
          return !! i
        }
      };
    return p
  },
    K.extend({
      Deferred: function(e) {
        var t = [["resolve", "done", K.Callbacks("once memory"), "resolved"], ["reject", "fail", K.Callbacks("once memory"), "rejected"], ["notify", "progress", K.Callbacks("memory")]],
          n = "pending",
          r = {
            state: function() {
              return n
            },
            always: function() {
              return i.done(arguments).fail(arguments),
                this
            },
            then: function() {
              var e = arguments;
              return K.Deferred(function(n) {
                K.each(t,
                  function(t, r) {
                    var o = r[0],
                      a = e[t];
                    i[r[1]](K.isFunction(a) ?
                      function() {
                        var e = a.apply(this, arguments);
                        e && K.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === i ? n: this, [e])
                      }: n[o])
                  }),
                  e = null
              }).promise()
            },
            promise: function(e) {
              return null != e ? K.extend(e, r) : r
            }
          },
          i = {};
        return r.pipe = r.then,
          K.each(t,
            function(e, o) {
              var a = o[2],
                s = o[3];
              r[o[1]] = a.add,
                s && a.add(function() {
                  n = s
                },
                t[1 ^ e][2].disable, t[2][2].lock),
                i[o[0]] = a.fire,
                i[o[0] + "With"] = a.fireWith
            }),
          r.promise(i),
          e && e.call(i, i),
          i
      },
      when: function(e) {
        var t,
          n,
          r,
          i = 0,
          o = Y.call(arguments),
          a = o.length,
          s = 1 !== a || e && K.isFunction(e.promise) ? a: 0,
          l = 1 === s ? e: K.Deferred(),
          u = function(e, n, r) {
            return function(i) {
              n[e] = this,
                r[e] = arguments.length > 1 ? Y.call(arguments) : i,
                  r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
            }
          };
        if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && K.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --s;
        return s || l.resolveWith(r, o),
          l.promise()
      }
    }),
    K.support = function() {
      var t,
        n,
        r,
        i,
        o,
        a,
        s,
        l,
        u,
        c,
        f,
        p = R.createElement("div");
      if (p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
      i = R.createElement("select"),
        o = i.appendChild(R.createElement("option")),
        a = p.getElementsByTagName("input")[0],
        r.style.cssText = "top:1px;float:left;opacity:.5",
        t = {
          leadingWhitespace: 3 === p.firstChild.nodeType,
          tbody: !p.getElementsByTagName("tbody").length,
          htmlSerialize: !!p.getElementsByTagName("link").length,
          style: /top/.test(r.getAttribute("style")),
          hrefNormalized: "/a" === r.getAttribute("href"),
          opacity: /^0.5/.test(r.style.opacity),
          cssFloat: !!r.style.cssFloat,
          checkOn: "on" === a.value,
          optSelected: o.selected,
          getSetAttribute: "t" !== p.className,
          enctype: !!R.createElement("form").enctype,
          html5Clone: "<:nav></:nav>" !== R.createElement("nav").cloneNode(!0).outerHTML,
          boxModel: "CSS1Compat" === R.compatMode,
          submitBubbles: !0,
          changeBubbles: !0,
          focusinBubbles: !1,
          deleteExpando: !0,
          noCloneEvent: !0,
          inlineBlockNeedsLayout: !1,
          shrinkWrapBlocks: !1,
          reliableMarginRight: !0,
          boxSizingReliable: !0,
          pixelPosition: !1
        },
        a.checked = !0,
        t.noCloneChecked = a.cloneNode(!0).checked,
        i.disabled = !0,
        t.optDisabled = !o.disabled;
      try {
        delete p.test
      } catch(d) {
        t.deleteExpando = !1
      }
      if (!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", f = function() {
        t.noCloneEvent = !1
      }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", f)), a = R.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), p.appendChild(a), s = R.createDocumentFragment(), s.appendChild(p.lastChild), t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = a.checked, s.removeChild(a), s.appendChild(p), p.attachEvent) for (u in {
        submit: !0,
        change: !0,
        focusin: !0
      }) l = "on" + u,
        c = l in p,
        c || (p.setAttribute(l, "return;"), c = "function" == typeof p[l]),
        t[u + "Bubbles"] = c;
      return K(function() {
        var n,
          r,
          i,
          o,
          a = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
          s = R.getElementsByTagName("body")[0];
        s && (n = R.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", s.insertBefore(n, s.firstChild), r = R.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = r.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === i[0].offsetHeight, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === r.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(r, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(r, null) || {
          width: "4px"
        }).width, o = R.createElement("div"), o.style.cssText = r.style.cssText = a, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), "undefined" != typeof r.style.zoom && (r.innerHTML = "", r.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === r.offsetWidth, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== r.offsetWidth, n.style.zoom = 1), s.removeChild(n), n = r = i = o = null)
      }),
        s.removeChild(p),
        n = r = i = o = a = s = p = null,
        t
    } ();
  var gt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    mt = /([A-Z])/g;
  K.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: "jQuery" + (K.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function(e) {
      return e = e.nodeType ? K.cache[e[K.expando]] : e[K.expando],
        !!e && !i(e)
    },
    data: function(e, n, r, i) {
      if (K.acceptData(e)) {
        var o,
          a,
          s = K.expando,
          l = "string" == typeof n,
          u = e.nodeType,
          c = u ? K.cache: e,
          f = u ? e[s] : e[s] && s;
        if (f && c[f] && (i || c[f].data) || !l || r !== t) return f || (u ? e[s] = f = K.deletedIds.pop() || K.guid++:f = s),
          c[f] || (c[f] = {},
          u || (c[f].toJSON = K.noop)),
          ("object" == typeof n || "function" == typeof n) && (i ? c[f] = K.extend(c[f], n) : c[f].data = K.extend(c[f].data, n)),
          o = c[f],
          i || (o.data || (o.data = {}), o = o.data),
          r !== t && (o[K.camelCase(n)] = r),
          l ? (a = o[n], null == a && (a = o[K.camelCase(n)])) : a = o,
          a
      }
    },
    removeData: function(e, t, n) {
      if (K.acceptData(e)) {
        var r,
          o,
          a,
          s = e.nodeType,
          l = s ? K.cache: e,
          u = s ? e[K.expando] : K.expando;
        if (l[u]) {
          if (t && (r = n ? l[u] : l[u].data)) {
            K.isArray(t) || (t in r ? t = [t] : (t = K.camelCase(t), t = t in r ? [t] : t.split(" ")));
            for (o = 0, a = t.length; a > o; o++) delete r[t[o]];
            if (! (n ? i: K.isEmptyObject)(r)) return
          } (n || (delete l[u].data, i(l[u]))) && (s ? K.cleanData([e], !0) : K.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null)
        }
      }
    },
    _data: function(e, t, n) {
      return K.data(e, t, n, !0)
    },
    acceptData: function(e) {
      var t = e.nodeName && K.noData[e.nodeName.toLowerCase()];
      return ! t || t !== !0 && e.getAttribute("classid") === t
    }
  }),
    K.fn.extend({
      data: function(e, n) {
        var i,
          o,
          a,
          s,
          l,
          u = this[0],
          c = 0,
          f = null;
        if (e === t) {
          if (this.length && (f = K.data(u), 1 === u.nodeType && !K._data(u, "parsedAttrs"))) {
            for (a = u.attributes, l = a.length; l > c; c++) s = a[c].name,
              s.indexOf("data-") || (s = K.camelCase(s.substring(5)), r(u, s, f[s]));
            K._data(u, "parsedAttrs", !0)
          }
          return f
        }
        return "object" == typeof e ? this.each(function() {
          K.data(this, e)
        }) : (i = e.split(".", 2), i[1] = i[1] ? "." + i[1] : "", o = i[1] + "!", K.access(this,
          function(n) {
            return n === t ? (f = this.triggerHandler("getData" + o, [i[0]]), f === t && u && (f = K.data(u, e), f = r(u, e, f)), f === t && i[1] ? this.data(i[0]) : f) : (i[1] = n, void this.each(function() {
              var t = K(this);
              t.triggerHandler("setData" + o, i),
                K.data(this, e, n),
                t.triggerHandler("changeData" + o, i)
            }))
          },
          null, n, arguments.length > 1, null, !1))
      },
      removeData: function(e) {
        return this.each(function() {
          K.removeData(this, e)
        })
      }
    }),
    K.extend({
      queue: function(e, t, n) {
        var r;
        return e ? (t = (t || "fx") + "queue", r = K._data(e, t), n && (!r || K.isArray(n) ? r = K._data(e, t, K.makeArray(n)) : r.push(n)), r || []) : void 0
      },
      dequeue: function(e, t) {
        t = t || "fx";
        var n = K.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = K._queueHooks(e, t),
          a = function() {
            K.dequeue(e, t)
          };
        "inprogress" === i && (i = n.shift(), r--),
          i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)),
          !r && o && o.empty.fire()
      },
      _queueHooks: function(e, t) {
        var n = t + "queueHooks";
        return K._data(e, n) || K._data(e, n, {
          empty: K.Callbacks("once memory").add(function() {
            K.removeData(e, t + "queue", !0),
              K.removeData(e, n, !0)
          })
        })
      }
    }),
    K.fn.extend({
      queue: function(e, n) {
        var r = 2;
        return "string" != typeof e && (n = e, e = "fx", r--),
            arguments.length < r ? K.queue(this[0], e) : n === t ? this: this.each(function() {
          var t = K.queue(this, e, n);
          K._queueHooks(this, e),
            "fx" === e && "inprogress" !== t[0] && K.dequeue(this, e)
        })
      },
      dequeue: function(e) {
        return this.each(function() {
          K.dequeue(this, e)
        })
      },
      delay: function(e, t) {
        return e = K.fx ? K.fx.speeds[e] || e: e,
          t = t || "fx",
          this.queue(t,
            function(t, n) {
              var r = setTimeout(t, e);
              n.stop = function() {
                clearTimeout(r)
              }
            })
      },
      clearQueue: function(e) {
        return this.queue(e || "fx", [])
      },
      promise: function(e, n) {
        var r,
          i = 1,
          o = K.Deferred(),
          a = this,
          s = this.length,
          l = function() {--i || o.resolveWith(a, [a])
          };
        for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) r = K._data(a[s], e + "queueHooks"),
          r && r.empty && (i++, r.empty.add(l));
        return l(),
          o.promise(n)
      }
    });
  var yt,
    vt,
    bt,
    xt = /[\t\r\n]/g,
    wt = /\r/g,
    Tt = /^(?:button|input)$/i,
    Nt = /^(?:button|input|object|select|textarea)$/i,
    Ct = /^a(?:rea|)$/i,
    kt = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    Et = K.support.getSetAttribute;
  K.fn.extend({
    attr: function(e, t) {
      return K.access(this, K.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() {
        K.removeAttr(this, e)
      })
    },
    prop: function(e, t) {
      return K.access(this, K.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
      return e = K.propFix[e] || e,
        this.each(function() {
          try {
            this[e] = t,
              delete this[e]
          } catch(n) {}
        })
    },
    addClass: function(e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s;
      if (K.isFunction(e)) return this.each(function(t) {
        K(this).addClass(e.call(this, t, this.className))
      });
      if (e && "string" == typeof e) for (t = e.split(tt), n = 0, r = this.length; r > n; n++) if (i = this[n], 1 === i.nodeType) if (i.className || 1 !== t.length) {
        for (o = " " + i.className + " ", a = 0, s = t.length; s > a; a++) o.indexOf(" " + t[a] + " ") < 0 && (o += t[a] + " ");
        i.className = K.trim(o)
      } else i.className = e;
      return this
    },
    removeClass: function(e) {
      var n,
        r,
        i,
        o,
        a,
        s,
        l;
      if (K.isFunction(e)) return this.each(function(t) {
        K(this).removeClass(e.call(this, t, this.className))
      });
      if (e && "string" == typeof e || e === t) for (n = (e || "").split(tt), s = 0, l = this.length; l > s; s++) if (i = this[s], 1 === i.nodeType && i.className) {
        for (r = (" " + i.className + " ").replace(xt, " "), o = 0, a = n.length; a > o; o++) for (; r.indexOf(" " + n[o] + " ") >= 0;) r = r.replace(" " + n[o] + " ", " ");
        i.className = e ? K.trim(r) : ""
      }
      return this
    },
    toggleClass: function(e, t) {
      var n = typeof e,
        r = "boolean" == typeof t;
      return this.each(K.isFunction(e) ?
        function(n) {
          K(this).toggleClass(e.call(this, n, this.className, t), t)
        }: function() {
        if ("string" === n) for (var i, o = 0, a = K(this), s = t, l = e.split(tt); i = l[o++];) s = r ? s: !a.hasClass(i),
          a[s ? "addClass": "removeClass"](i);
        else("undefined" === n || "boolean" === n) && (this.className && K._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "": K._data(this, "__className__") || "")
      })
    },
    hasClass: function(e) {
      for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(xt, " ").indexOf(t) >= 0) return ! 0;
      return ! 1
    },
    val: function(e) {
      var n,
        r,
        i,
        o = this[0]; {
        if (arguments.length) return i = K.isFunction(e),
          this.each(function(r) {
            var o,
              a = K(this);
            1 === this.nodeType && (o = i ? e.call(this, r, a.val()) : e, null == o ? o = "": "number" == typeof o ? o += "": K.isArray(o) && (o = K.map(o,
              function(e) {
                return null == e ? "": e + ""
              })), n = K.valHooks[this.type] || K.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
          });
        if (o) return n = K.valHooks[o.type] || K.valHooks[o.nodeName.toLowerCase()],
            n && "get" in n && (r = n.get(o, "value")) !== t ? r: (r = o.value, "string" == typeof r ? r.replace(wt, "") : null == r ? "": r)
      }
    }
  }),
    K.extend({
      valHooks: {
        option: {
          get: function(e) {
            var t = e.attributes.value;
            return ! t || t.specified ? e.value: e.text
          }
        },
        select: {
          get: function(e) {
            for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null: [], s = o ? i + 1: r.length, l = 0 > i ? s: o ? i: 0; s > l; l++) if (n = r[l], !(!n.selected && l !== i || (K.support.optDisabled ? n.disabled: null !== n.getAttribute("disabled")) || n.parentNode.disabled && K.nodeName(n.parentNode, "optgroup"))) {
              if (t = K(n).val(), o) return t;
              a.push(t)
            }
            return a
          },
          set: function(e, t) {
            var n = K.makeArray(t);
            return K(e).find("option").each(function() {
              this.selected = K.inArray(K(this).val(), n) >= 0
            }),
              n.length || (e.selectedIndex = -1),
              n
          }
        }
      },
      attrFn: {},
      attr: function(e, n, r, i) {
        var o,
          a,
          s,
          l = e.nodeType;
        if (e && 3 !== l && 8 !== l && 2 !== l) return i && K.isFunction(K.fn[n]) ? K(e)[n](r) : "undefined" == typeof e.getAttribute ? K.prop(e, n, r) : (s = 1 !== l || !K.isXMLDoc(e), s && (n = n.toLowerCase(), a = K.attrHooks[n] || (kt.test(n) ? vt: yt)), r !== t ? null === r ? void K.removeAttr(e, n) : a && "set" in a && s && (o = a.set(e, r, n)) !== t ? o: (e.setAttribute(n, r + ""), r) : a && "get" in a && s && null !== (o = a.get(e, n)) ? o: (o = e.getAttribute(n), null === o ? t: o))
      },
      removeAttr: function(e, t) {
        var n,
          r,
          i,
          o,
          a = 0;
        if (t && 1 === e.nodeType) for (r = t.split(tt); a < r.length; a++) i = r[a],
          i && (n = K.propFix[i] || i, o = kt.test(i), o || K.attr(e, i, ""), e.removeAttribute(Et ? i: n), o && n in e && (e[n] = !1))
      },
      attrHooks: {
        type: {
          set: function(e, t) {
            if (Tt.test(e.nodeName) && e.parentNode) K.error("type property can't be changed");
            else if (!K.support.radioValue && "radio" === t && K.nodeName(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t),
                n && (e.value = n),
                t
            }
          }
        },
        value: {
          get: function(e, t) {
            return yt && K.nodeName(e, "button") ? yt.get(e, t) : t in e ? e.value: null
          },
          set: function(e, t, n) {
            return yt && K.nodeName(e, "button") ? yt.set(e, t, n) : void(e.value = t)
          }
        }
      },
      propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
      },
      prop: function(e, n, r) {
        var i,
          o,
          a,
          s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !K.isXMLDoc(e),
          a && (n = K.propFix[n] || n, o = K.propHooks[n]),
            r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i: e[n] = r: o && "get" in o && null !== (i = o.get(e, n)) ? i: e[n]
      },
      propHooks: {
        tabIndex: {
          get: function(e) {
            var n = e.getAttributeNode("tabindex");
            return n && n.specified ? parseInt(n.value, 10) : Nt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0: t
          }
        }
      }
    }),
    vt = {
      get: function(e, n) {
        var r,
          i = K.prop(e, n);
        return i === !0 || "boolean" != typeof i && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
      },
      set: function(e, t, n) {
        var r;
        return t === !1 ? K.removeAttr(e, n) : (r = K.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())),
          n
      }
    },
    Et || (bt = {
    name: !0,
    id: !0,
    coords: !0
  },
    yt = K.valHooks.button = {
      get: function(e, n) {
        var r;
        return r = e.getAttributeNode(n),
            r && (bt[n] ? "" !== r.value: r.specified) ? r.value: t
      },
      set: function(e, t, n) {
        var r = e.getAttributeNode(n);
        return r || (r = R.createAttribute(n), e.setAttributeNode(r)),
          r.value = t + ""
      }
    },
    K.each(["width", "height"],
      function(e, t) {
        K.attrHooks[t] = K.extend(K.attrHooks[t], {
          set: function(e, n) {
            return "" === n ? (e.setAttribute(t, "auto"), n) : void 0

          }
        })
      }), K.attrHooks.contenteditable = {
    get: yt.get,
    set: function(e, t, n) {
      "" === t && (t = "false"),
        yt.set(e, t, n)
    }
  }),
    K.support.hrefNormalized || K.each(["href", "src", "width", "height"],
    function(e, n) {
      K.attrHooks[n] = K.extend(K.attrHooks[n], {
        get: function(e) {
          var r = e.getAttribute(n, 2);
          return null === r ? t: r
        }
      })
    }),
    K.support.style || (K.attrHooks.style = {
    get: function(e) {
      return e.style.cssText.toLowerCase() || t
    },
    set: function(e, t) {
      return e.style.cssText = t + ""
    }
  }),
    K.support.optSelected || (K.propHooks.selected = K.extend(K.propHooks.selected, {
    get: function(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
        null
    }
  })),
    K.support.enctype || (K.propFix.enctype = "encoding"),
    K.support.checkOn || K.each(["radio", "checkbox"],
    function() {
      K.valHooks[this] = {
        get: function(e) {
          return null === e.getAttribute("value") ? "on": e.value
        }
      }
    }),
    K.each(["radio", "checkbox"],
      function() {
        K.valHooks[this] = K.extend(K.valHooks[this], {
          set: function(e, t) {
            return K.isArray(t) ? e.checked = K.inArray(K(e).val(), t) >= 0: void 0
          }
        })
      });
  var St = /^(?:textarea|input|select)$/i,
    jt = /^([^\.]*|)(?:\.(.+)|)$/,
    At = /(?:^|\s)hover(\.\S+|)\b/,
    Lt = /^key/,
    Dt = /^(?:mouse|contextmenu)|click/,
    Ht = /^(?:focusinfocus|focusoutblur)$/,
    Ft = function(e) {
      return K.event.special.hover ? e: e.replace(At, "mouseenter$1 mouseleave$1")
    };
  K.event = {
    add: function(e, n, r, i, o) {
      var a,
        s,
        l,
        u,
        c,
        f,
        p,
        d,
        h,
        g,
        m;
      if (3 !== e.nodeType && 8 !== e.nodeType && n && r && (a = K._data(e))) {
        for (r.handler && (h = r, r = h.handler, o = h.selector), r.guid || (r.guid = K.guid++), l = a.events, l || (a.events = l = {}), s = a.handle, s || (a.handle = s = function(e) {
          return "undefined" == typeof K || e && K.event.triggered === e.type ? t: K.event.dispatch.apply(s.elem, arguments)
        },
          s.elem = e), n = K.trim(Ft(n)).split(" "), u = 0; u < n.length; u++) c = jt.exec(n[u]) || [],
          f = c[1],
          p = (c[2] || "").split(".").sort(),
          m = K.event.special[f] || {},
          f = (o ? m.delegateType: m.bindType) || f,
          m = K.event.special[f] || {},
          d = K.extend({
              type: f,
              origType: c[1],
              data: i,
              handler: r,
              guid: r.guid,
              selector: o,
              needsContext: o && K.expr.match.needsContext.test(o),
              namespace: p.join(".")
            },
            h),
          g = l[f],
          g || (g = l[f] = [], g.delegateCount = 0, m.setup && m.setup.call(e, i, p, s) !== !1 || (e.addEventListener ? e.addEventListener(f, s, !1) : e.attachEvent && e.attachEvent("on" + f, s))),
          m.add && (m.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)),
          o ? g.splice(g.delegateCount++, 0, d) : g.push(d),
          K.event.global[f] = !0;
        e = null
      }
    },
    global: {},
    remove: function(e, t, n, r, i) {
      var o,
        a,
        s,
        l,
        u,
        c,
        f,
        p,
        d,
        h,
        g,
        m = K.hasData(e) && K._data(e);
      if (m && (p = m.events)) {
        for (t = K.trim(Ft(t || "")).split(" "), o = 0; o < t.length; o++) if (a = jt.exec(t[o]) || [], s = l = a[1], u = a[2], s) {
          for (d = K.event.special[s] || {},
                 s = (r ? d.delegateType: d.bindType) || s, h = p[s] || [], c = h.length, u = u ? new RegExp("(^|\\.)" + u.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, f = 0; f < h.length; f++) g = h[f],
            !(!i && l !== g.origType || n && n.guid !== g.guid || u && !u.test(g.namespace) || r && r !== g.selector && ("**" !== r || !g.selector) || (h.splice(f--, 1), g.selector && h.delegateCount--, !d.remove || !d.remove.call(e, g)));
          0 === h.length && c !== h.length && ((!d.teardown || d.teardown.call(e, u, m.handle) === !1) && K.removeEvent(e, s, m.handle), delete p[s])
        } else for (s in p) K.event.remove(e, s + t[o], n, r, !0);
        K.isEmptyObject(p) && (delete m.handle, K.removeData(e, "events", !0))
      }
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function(n, r, i, o) {
      if (!i || 3 !== i.nodeType && 8 !== i.nodeType) {
        var a,
          s,
          l,
          u,
          c,
          f,
          p,
          d,
          h,
          g,
          m = n.type || n,
          y = [];
        if (Ht.test(m + K.event.triggered)) return;
        if (m.indexOf("!") >= 0 && (m = m.slice(0, -1), s = !0), m.indexOf(".") >= 0 && (y = m.split("."), m = y.shift(), y.sort()), (!i || K.event.customEvent[m]) && !K.event.global[m]) return;
        if (n = "object" == typeof n ? n[K.expando] ? n: new K.Event(m, n) : new K.Event(m), n.type = m, n.isTrigger = !0, n.exclusive = s, n.namespace = y.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, f = m.indexOf(":") < 0 ? "on" + m: "", !i) {
          a = K.cache;
          for (l in a) a[l].events && a[l].events[m] && K.event.trigger(n, r, a[l].handle.elem, !0);
          return
        }
        if (n.result = t, n.target || (n.target = i), r = null != r ? K.makeArray(r) : [], r.unshift(n), p = K.event.special[m] || {},
          p.trigger && p.trigger.apply(i, r) === !1) return;
        if (h = [[i, p.bindType || m]], !o && !p.noBubble && !K.isWindow(i)) {
          for (g = p.delegateType || m, u = Ht.test(g + m) ? i: i.parentNode, c = i; u; u = u.parentNode) h.push([u, g]),
            c = u;
          c === (i.ownerDocument || R) && h.push([c.defaultView || c.parentWindow || e, g])
        }
        for (l = 0; l < h.length && !n.isPropagationStopped(); l++) u = h[l][0],
          n.type = h[l][1],
          d = (K._data(u, "events") || {})[n.type] && K._data(u, "handle"),
          d && d.apply(u, r),
          d = f && u[f],
          d && K.acceptData(u) && d.apply && d.apply(u, r) === !1 && n.preventDefault();
        return n.type = m,
          !(o || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === m && K.nodeName(i, "a") || !K.acceptData(i) || !f || !i[m] || ("focus" === m || "blur" === m) && 0 === n.target.offsetWidth || K.isWindow(i) || (c = i[f], c && (i[f] = null), K.event.triggered = m, i[m](), K.event.triggered = t, !c || !(i[f] = c))),
          n.result
      }
    },
    dispatch: function(n) {
      n = K.event.fix(n || e.event);
      var r,
        i,
        o,
        a,
        s,
        l,
        u,
        c,
        f,
        p = (K._data(this, "events") || {})[n.type] || [],
        d = p.delegateCount,
        h = Y.call(arguments),
        g = !n.exclusive && !n.namespace,
        m = K.event.special[n.type] || {},
        y = [];
      if (h[0] = n, n.delegateTarget = this, !m.preDispatch || m.preDispatch.call(this, n) !== !1) {
        if (d && (!n.button || "click" !== n.type)) for (o = n.target; o != this; o = o.parentNode || this) if (o.disabled !== !0 || "click" !== n.type) {
          for (s = {},
                 u = [], r = 0; d > r; r++) c = p[r],
            f = c.selector,
            s[f] === t && (s[f] = c.needsContext ? K(f, this).index(o) >= 0: K.find(f, this, null, [o]).length),
            s[f] && u.push(c);
          u.length && y.push({
            elem: o,
            matches: u
          })
        }
        for (p.length > d && y.push({
          elem: this,
          matches: p.slice(d)
        }), r = 0; r < y.length && !n.isPropagationStopped(); r++) for (l = y[r], n.currentTarget = l.elem, i = 0; i < l.matches.length && !n.isImmediatePropagationStopped(); i++) c = l.matches[i],
          (g || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) && (n.data = c.data, n.handleObj = c, a = ((K.event.special[c.origType] || {}).handle || c.handler).apply(l.elem, h), a !== t && (n.result = a, a === !1 && (n.preventDefault(), n.stopPropagation())));
        return m.postDispatch && m.postDispatch.call(this, n),
          n.result
      }
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
          e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, n) {
        var r,
          i,
          o,
          a = n.button,
          s = n.fromElement;
        return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || R, i = r.documentElement, o = r.body, e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)),
          !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement: s),
          !e.which && a !== t && (e.which = 1 & a ? 1: 2 & a ? 3: 4 & a ? 2: 0),
          e
      }
    },
    fix: function(e) {
      if (e[K.expando]) return e;
      var t,
        n,
        r = e,
        i = K.event.fixHooks[e.type] || {},
        o = i.props ? this.props.concat(i.props) : this.props;
      for (e = K.Event(r), t = o.length; t;) n = o[--t],
        e[n] = r[n];
      return e.target || (e.target = r.srcElement || R),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        e.metaKey = !!e.metaKey,
        i.filter ? i.filter(e, r) : e
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        delegateType: "focusin"
      },
      blur: {
        delegateType: "focusout"
      },
      beforeunload: {
        setup: function(e, t, n) {
          K.isWindow(this) && (this.onbeforeunload = n)
        },
        teardown: function(e, t) {
          this.onbeforeunload === t && (this.onbeforeunload = null)
        }
      }
    },
    simulate: function(e, t, n, r) {
      var i = K.extend(new K.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? K.event.trigger(i, null, t) : K.event.dispatch.call(t, i),
        i.isDefaultPrevented() && n.preventDefault()
    }
  },
    K.event.handle = K.event.dispatch,
    K.removeEvent = R.removeEventListener ?
      function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
      }: function(e, t, n) {
      var r = "on" + t;
      e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
    },
    K.Event = function(e, t) {
      return this instanceof K.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? a: o) : this.type = e, t && K.extend(this, t), this.timeStamp = e && e.timeStamp || K.now(), this[K.expando] = !0, void 0) : new K.Event(e, t)
    },
    K.Event.prototype = {
      preventDefault: function() {
        this.isDefaultPrevented = a;
        var e = this.originalEvent;
        e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
      },
      stopPropagation: function() {
        this.isPropagationStopped = a;
        var e = this.originalEvent;
        e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
      },
      stopImmediatePropagation: function() {
        this.isImmediatePropagationStopped = a,
          this.stopPropagation()
      },
      isDefaultPrevented: o,
      isPropagationStopped: o,
      isImmediatePropagationStopped: o
    },
    K.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      },
      function(e, t) {
        K.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function(e) {
            {
              var n,
                r = this,
                i = e.relatedTarget,
                o = e.handleObj;
              o.selector
            }
            return (!i || i !== r && !K.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
              n
          }
        }
      }),
    K.support.submitBubbles || (K.event.special.submit = {
    setup: function() {
      return K.nodeName(this, "form") ? !1: void K.event.add(this, "click._submit keypress._submit",
        function(e) {
          var n = e.target,
            r = K.nodeName(n, "input") || K.nodeName(n, "button") ? n.form: t;
          r && !K._data(r, "_submit_attached") && (K.event.add(r, "submit._submit",
            function(e) {
              e._submit_bubble = !0
            }), K._data(r, "_submit_attached", !0))
        })
    },
    postDispatch: function(e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && K.event.simulate("submit", this.parentNode, e, !0))
    },
    teardown: function() {
      return K.nodeName(this, "form") ? !1: void K.event.remove(this, "._submit")
    }
  }),
    K.support.changeBubbles || (K.event.special.change = {
    setup: function() {
      return St.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (K.event.add(this, "propertychange._change",
        function(e) {
          "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
        }), K.event.add(this, "click._change",
        function(e) {
          this._just_changed && !e.isTrigger && (this._just_changed = !1),
            K.event.simulate("change", this, e, !0)
        })), !1) : void K.event.add(this, "beforeactivate._change",
        function(e) {
          var t = e.target;
          St.test(t.nodeName) && !K._data(t, "_change_attached") && (K.event.add(t, "change._change",
            function(e) {
              this.parentNode && !e.isSimulated && !e.isTrigger && K.event.simulate("change", this.parentNode, e, !0)
            }), K._data(t, "_change_attached", !0))
        })
    },
    handle: function(e) {
      var t = e.target;
      return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    },
    teardown: function() {
      return K.event.remove(this, "._change"),
        !St.test(this.nodeName)
    }
  }),
    K.support.focusinBubbles || K.each({
      focus: "focusin",
      blur: "focusout"
    },
    function(e, t) {
      var n = 0,
        r = function(e) {
          K.event.simulate(t, e.target, K.event.fix(e), !0)
        };
      K.event.special[t] = {
        setup: function() {
          0 === n++&&R.addEventListener(e, r, !0)
        },
        teardown: function() {
          0 === --n && R.removeEventListener(e, r, !0)
        }
      }
    }),
    K.fn.extend({
      on: function(e, n, r, i, a) {
        var s,
          l;
        if ("object" == typeof e) {
          "string" != typeof n && (r = r || n, n = t);
          for (l in e) this.on(l, n, r, e[l], a);
          return this
        }
        if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = o;
        else if (!i) return this;
        return 1 === a && (s = i, i = function(e) {
          return K().off(e),
            s.apply(this, arguments)
        },
          i.guid = s.guid || (s.guid = K.guid++)),
          this.each(function() {
            K.event.add(this, e, i, r, n)
          })
      },
      one: function(e, t, n, r) {
        return this.on(e, t, n, r, 1)
      },
      off: function(e, n, r) {
        var i,
          a;
        if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
          K(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace: i.origType, i.selector, i.handler),
          this;
        if ("object" == typeof e) {
          for (a in e) this.off(a, n, e[a]);
          return this
        }
        return (n === !1 || "function" == typeof n) && (r = n, n = t),
          r === !1 && (r = o),
          this.each(function() {
            K.event.remove(this, e, r, n)
          })
      },
      bind: function(e, t, n) {
        return this.on(e, null, t, n)
      },
      unbind: function(e, t) {
        return this.off(e, null, t)
      },
      live: function(e, t, n) {
        return K(this.context).on(e, this.selector, t, n),
          this
      },
      die: function(e, t) {
        return K(this.context).off(e, this.selector || "**", t),
          this
      },
      delegate: function(e, t, n, r) {
        return this.on(t, e, n, r)
      },
      undelegate: function(e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
      },
      trigger: function(e, t) {
        return this.each(function() {
          K.event.trigger(e, t, this)
        })
      },
      triggerHandler: function(e, t) {
        return this[0] ? K.event.trigger(e, t, this[0], !0) : void 0
      },
      toggle: function(e) {
        var t = arguments,
          n = e.guid || K.guid++,
          r = 0,
          i = function(n) {
            var i = (K._data(this, "lastToggle" + e.guid) || 0) % r;
            return K._data(this, "lastToggle" + e.guid, i + 1),
              n.preventDefault(),
              t[i].apply(this, arguments) || !1
          };
        for (i.guid = n; r < t.length;) t[r++].guid = n;
        return this.click(i)
      },
      hover: function(e, t) {
        return this.mouseenter(e).mouseleave(t || e)
      }
    }),
    K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
      function(e, t) {
        K.fn[t] = function(e, n) {
          return null == n && (n = e, e = null),
              arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        },
          Lt.test(t) && (K.event.fixHooks[t] = K.event.keyHooks),
          Dt.test(t) && (K.event.fixHooks[t] = K.event.mouseHooks)
      }),
    function(e, t) {
      function n(e, t, n, r) {
        n = n || [],
          t = t || D;
        var i,
          o,
          a,
          s,
          l = t.nodeType;
        if (!e || "string" != typeof e) return n;
        if (1 !== l && 9 !== l) return [];
        if (a = w(t), !a && !r && (i = nt.exec(e))) if (s = i[1]) {
          if (9 === l) {
            if (o = t.getElementById(s), !o || !o.parentNode) return n;
            if (o.id === s) return n.push(o),
              n
          } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && T(t, o) && o.id === s) return n.push(o),
            n
        } else {
          if (i[2]) return q.apply(n, _.call(t.getElementsByTagName(e), 0)),
            n;
          if ((s = i[3]) && pt && t.getElementsByClassName) return q.apply(n, _.call(t.getElementsByClassName(s), 0)),
            n
        }
        return g(e.replace(G, "$1"), t, n, r, a)
      }
      function r(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return "input" === n && t.type === e
        }
      }
      function i(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e
        }
      }
      function o(e) {
        return W(function(t) {
          return t = +t,
            W(function(n, r) {
              for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
            })
        })
      }
      function a(e, t, n) {
        if (e === t) return n;
        for (var r = e.nextSibling; r;) {
          if (r === t) return - 1;
          r = r.nextSibling
        }
        return 1
      }
      function s(e, t) {
        var r,
          i,
          o,
          a,
          s,
          l,
          u,
          c = $[A][e + " "];
        if (c) return t ? 0: c.slice(0);
        for (s = e, l = [], u = b.preFilter; s;) { (!r || (i = Z.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])),
          r = !1,
          (i = et.exec(s)) && (o.push(r = new L(i.shift())), s = s.slice(r.length), r.type = i[0].replace(G, " "));
          for (a in b.filter)(i = st[a].exec(s)) && (!u[a] || (i = u[a](i))) && (o.push(r = new L(i.shift())), s = s.slice(r.length), r.type = a, r.matches = i);
          if (!r) break
        }
        return t ? s.length: s ? n.error(e) : $(e, l).slice(0)
      }
      function l(e, t, n) {
        var r = t.dir,
          i = n && "parentNode" === t.dir,
          o = M++;
        return t.first ?
          function(t, n, o) {
            for (; t = t[r];) if (i || 1 === t.nodeType) return e(t, n, o)
          }: function(t, n, a) {
          if (a) {
            for (; t = t[r];) if ((i || 1 === t.nodeType) && e(t, n, a)) return t
          } else for (var s, l = F + " " + o + " ", u = l + y; t = t[r];) if (i || 1 === t.nodeType) {
            if ((s = t[A]) === u) return t.sizset;
            if ("string" == typeof s && 0 === s.indexOf(l)) {
              if (t.sizset) return t
            } else {
              if (t[A] = u, e(t, n, a)) return t.sizset = !0,
                t;
              t.sizset = !1
            }
          }
        }
      }
      function u(e) {
        return e.length > 1 ?
          function(t, n, r) {
            for (var i = e.length; i--;) if (!e[i](t, n, r)) return ! 1;
            return ! 0
          }: e[0]
      }
      function c(e, t, n, r, i) {
        for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
        return a
      }
      function f(e, t, n, r, i, o) {
        return r && !r[A] && (r = f(r)),
          i && !i[A] && (i = f(i, o)),
          W(function(o, a, s, l) {
            var u,
              f,
              p,
              d = [],
              g = [],
              m = a.length,
              y = o || h(t || "*", s.nodeType ? [s] : s, []),
              v = !e || !o && t ? y: c(y, d, e, s, l),
              b = n ? i || (o ? e: m || r) ? [] : a: v;
            if (n && n(v, b, s, l), r) for (u = c(b, g), r(u, [], s, l), f = u.length; f--;)(p = u[f]) && (b[g[f]] = !(v[g[f]] = p));
            if (o) {
              if (i || e) {
                if (i) {
                  for (u = [], f = b.length; f--;)(p = b[f]) && u.push(v[f] = p);
                  i(null, b = [], u, l)
                }
                for (f = b.length; f--;)(p = b[f]) && (u = i ? B.call(o, p) : d[f]) > -1 && (o[u] = !(a[u] = p))
              }
            } else b = c(b === a ? b.splice(m, b.length) : b),
              i ? i(null, a, b, l) : q.apply(a, b)
          })
      }
      function p(e) {
        for (var t, n, r, i = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1: 0, c = l(function(e) {
            return e === t
          },
          a, !0), d = l(function(e) {
            return B.call(t, e) > -1
          },
          a, !0), h = [function(e, n, r) {
          return ! o && (r || n !== E) || ((t = n).nodeType ? c(e, n, r) : d(e, n, r))
        }]; i > s; s++) if (n = b.relative[e[s].type]) h = [l(u(h), n)];
        else {
          if (n = b.filter[e[s].type].apply(null, e[s].matches), n[A]) {
            for (r = ++s; i > r && !b.relative[e[r].type]; r++);
            return f(s > 1 && u(h), s > 1 && e.slice(0, s - 1).join("").replace(G, "$1"), n, r > s && p(e.slice(s, r)), i > r && p(e = e.slice(r)), i > r && e.join(""))
          }
          h.push(n)
        }
        return u(h)
      }
      function d(e, t) {
        var r = t.length > 0,
          i = e.length > 0,
          o = function(a, s, l, u, f) {
            var p,
              d,
              h,
              g = [],
              m = 0,
              v = "0",
              x = a && [],
              w = null != f,
              T = E,
              N = a || i && b.find.TAG("*", f && s.parentNode || s),
              C = F += null == T ? 1: Math.E;
            for (w && (E = s !== D && s, y = o.el); null != (p = N[v]); v++) {
              if (i && p) {
                for (d = 0; h = e[d]; d++) if (h(p, s, l)) {
                  u.push(p);
                  break
                }
                w && (F = C, y = ++o.el)
              }
              r && ((p = !h && p) && m--, a && x.push(p))
            }
            if (m += v, r && v !== m) {
              for (d = 0; h = t[d]; d++) h(x, g, s, l);
              if (a) {
                if (m > 0) for (; v--;) ! x[v] && !g[v] && (g[v] = O.call(u));
                g = c(g)
              }
              q.apply(u, g),
                w && !a && g.length > 0 && m + t.length > 1 && n.uniqueSort(u)
            }
            return w && (F = C, E = T),
              x
          };
        return o.el = 0,
          r ? W(o) : o
      }
      function h(e, t, r) {
        for (var i = 0, o = t.length; o > i; i++) n(e, t[i], r);
        return r
      }
      function g(e, t, n, r, i) {
        {
          var o,
            a,
            l,
            u,
            c,
            f = s(e);
          f.length
        }
        if (!r && 1 === f.length) {
          if (a = f[0] = f[0].slice(0), a.length > 2 && "ID" === (l = a[0]).type && 9 === t.nodeType && !i && b.relative[a[1].type]) {
            if (t = b.find.ID(l.matches[0].replace(at, ""), t, i)[0], !t) return n;
            e = e.slice(a.shift().length)
          }
          for (o = st.POS.test(e) ? -1: a.length - 1; o >= 0 && (l = a[o], !b.relative[u = l.type]); o--) if ((c = b.find[u]) && (r = c(l.matches[0].replace(at, ""), rt.test(a[0].type) && t.parentNode || t, i))) {
            if (a.splice(o, 1), e = r.length && a.join(""), !e) return q.apply(n, _.call(r, 0)),
              n;
            break
          }
        }
        return N(e, f)(r, t, i, n, rt.test(e)),
          n
      }
      function m() {}
      var y,
        v,
        b,
        x,
        w,
        T,
        N,
        C,
        k,
        E,
        S = !0,
        j = "undefined",
        A = ("sizcache" + Math.random()).replace(".", ""),
        L = String,
        D = e.document,
        H = D.documentElement,
        F = 0,
        M = 0,
        O = [].pop,
        q = [].push,
        _ = [].slice,
        B = [].indexOf ||
          function(e) {
            for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
            return - 1
          },
        W = function(e, t) {
          return e[A] = null == t || t,
            e
        },
        P = function() {
          var e = {},
            t = [];
          return W(function(n, r) {
              return t.push(n) > b.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            },
            e)
        },
        R = P(),
        $ = P(),
        I = P(),
        z = "[\\x20\\t\\r\\n\\f]",
        X = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
        U = X.replace("w", "w#"),
        Y = "([*^$|!~]?=)",
        Q = "\\[" + z + "*(" + X + ")" + z + "*(?:" + Y + z + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + z + "*\\]",
        V = ":(" + X + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + Q + ")|[^:]|\\\\.)*|.*))\\)|)",
        J = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + z + "*((?:-\\d)?\\d*)" + z + "*\\)|)(?=[^-]|$)",
        G = new RegExp("^" + z + "+|((?:^|[^\\\\])(?:\\\\.)*)" + z + "+$", "g"),
        Z = new RegExp("^" + z + "*," + z + "*"),
        et = new RegExp("^" + z + "*([\\x20\\t\\r\\n\\f>+~])" + z + "*"),
        tt = new RegExp(V),
        nt = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        rt = /[\x20\t\r\n\f]*[+~]/,
        it = /h\d/i,
        ot = /input|select|textarea|button/i,
        at = /\\(?!\\)/g,
        st = {
          ID: new RegExp("^#(" + X + ")"),
          CLASS: new RegExp("^\\.(" + X + ")"),
          NAME: new RegExp("^\\[name=['\"]?(" + X + ")['\"]?\\]"),
          TAG: new RegExp("^(" + X.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + Q),
          PSEUDO: new RegExp("^" + V),
          POS: new RegExp(J, "i"),
          CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + z + "*(even|odd|(([+-]|)(\\d*)n|)" + z + "*(?:([+-]|)" + z + "*(\\d+)|))" + z + "*\\)|)", "i"),
          needsContext: new RegExp("^" + z + "*[>+~]|" + J, "i")
        },
        lt = function(e) {
          var t = D.createElement("div");
          try {
            return e(t)
          } catch(n) {
            return ! 1
          } finally {
            t = null
          }
        },
        ut = lt(function(e) {
          return e.appendChild(D.createComment("")),
            !e.getElementsByTagName("*").length
        }),
        ct = lt(function(e) {
          return e.innerHTML = "<a href='#'></a>",
            e.firstChild && typeof e.firstChild.getAttribute !== j && "#" === e.firstChild.getAttribute("href")
        }),
        ft = lt(function(e) {
          e.innerHTML = "<select></select>";
          var t = typeof e.lastChild.getAttribute("multiple");
          return "boolean" !== t && "string" !== t
        }),
        pt = lt(function(e) {
          return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
              e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
        }),
        dt = lt(function(e) {
          e.id = A + 0,
            e.innerHTML = "<a name='" + A + "'></a><div name='" + A + "'></div>",
            H.insertBefore(e, H.firstChild);
          var t = D.getElementsByName && D.getElementsByName(A).length === 2 + D.getElementsByName(A + 0).length;
          return v = !D.getElementById(A),
            H.removeChild(e),
            t
        });
      try {
        _.call(H.childNodes, 0)[0].nodeType
      } catch(ht) {
        _ = function(e) {
          for (var t, n = []; t = this[e]; e++) n.push(t);
          return n
        }
      }
      n.matches = function(e, t) {
        return n(e, null, null, t)
      },
        n.matchesSelector = function(e, t) {
          return n(t, null, null, [e]).length > 0
        },
        x = n.getText = function(e) {
          var t,
            n = "",
            r = 0,
            i = e.nodeType;
          if (i) {
            if (1 === i || 9 === i || 11 === i) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) n += x(e)
            } else if (3 === i || 4 === i) return e.nodeValue
          } else for (; t = e[r]; r++) n += x(t);
          return n
        },
        w = n.isXML = function(e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return t ? "HTML" !== t.nodeName: !1
        },
        T = n.contains = H.contains ?
          function(e, t) {
            var n = 9 === e.nodeType ? e.documentElement: e,
              r = t && t.parentNode;
            return e === r || !!(r && 1 === r.nodeType && n.contains && n.contains(r))
          }: H.compareDocumentPosition ?
          function(e, t) {
            return t && !!(16 & e.compareDocumentPosition(t))
          }: function(e, t) {
          for (; t = t.parentNode;) if (t === e) return ! 0;
          return ! 1
        },
        n.attr = function(e, t) {
          var n,
            r = w(e);
          return r || (t = t.toLowerCase()),
            (n = b.attrHandle[t]) ? n(e) : r || ft ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? "boolean" == typeof e[t] ? e[t] ? t: null: n.specified ? n.value: null: null)
        },
        b = n.selectors = {
          cacheLength: 50,
          createPseudo: W,
          match: st,
          attrHandle: ct ? {}: {
            href: function(e) {
              return e.getAttribute("href", 2)
            },
            type: function(e) {
              return e.getAttribute("type")
            }
          },
          find: {
            ID: v ?
              function(e, t, n) {
                if (typeof t.getElementById !== j && !n) {
                  var r = t.getElementById(e);
                  return r && r.parentNode ? [r] : []
                }
              }: function(e, n, r) {
              if (typeof n.getElementById !== j && !r) {
                var i = n.getElementById(e);
                return i ? i.id === e || typeof i.getAttributeNode !== j && i.getAttributeNode("id").value === e ? [i] : t: []
              }
            },
            TAG: ut ?
              function(e, t) {
                return typeof t.getElementsByTagName !== j ? t.getElementsByTagName(e) : void 0
              }: function(e, t) {
              var n = t.getElementsByTagName(e);
              if ("*" === e) {
                for (var r, i = [], o = 0; r = n[o]; o++) 1 === r.nodeType && i.push(r);
                return i
              }
              return n
            },
            NAME: dt &&
              function(e, t) {
                return typeof t.getElementsByName !== j ? t.getElementsByName(name) : void 0
              },
            CLASS: pt &&
              function(e, t, n) {
                return typeof t.getElementsByClassName === j || n ? void 0: t.getElementsByClassName(e)
              }
          },
          relative: {
            ">": {
              dir: "parentNode",
              first: !0
            },
            " ": {
              dir: "parentNode"
            },
            "+": {
              dir: "previousSibling",
              first: !0
            },
            "~": {
              dir: "previousSibling"
            }
          },
          preFilter: {
            ATTR: function(e) {
              return e[1] = e[1].replace(at, ""),
                e[3] = (e[4] || e[5] || "").replace(at, ""),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
            },
            CHILD: function(e) {
              return e[1] = e[1].toLowerCase(),
                  "nth" === e[1] ? (e[2] || n.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && n.error(e[0]),
                e
            },
            PSEUDO: function(e) {
              var t,
                n;
              return st.CHILD.test(e[0]) ? null: (e[3] ? e[2] = e[3] : (t = e[4]) && (tt.test(t) && (n = s(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t), e.slice(0, 3))
            }
          },
          filter: {
            ID: v ?
              function(e) {
                return e = e.replace(at, ""),
                  function(t) {
                    return t.getAttribute("id") === e
                  }
              }: function(e) {
              return e = e.replace(at, ""),
                function(t) {
                  var n = typeof t.getAttributeNode !== j && t.getAttributeNode("id");
                  return n && n.value === e
                }
            },
            TAG: function(e) {
              return "*" === e ?
                function() {
                  return ! 0
                }: (e = e.replace(at, "").toLowerCase(),
                function(t) {
                  return t.nodeName && t.nodeName.toLowerCase() === e
                })
            },
            CLASS: function(e) {
              var t = R[A][e + " "];
              return t || (t = new RegExp("(^|" + z + ")" + e + "(" + z + "|$)")) && R(e,
                function(e) {
                  return t.test(e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
                })
            },
            ATTR: function(e, t, r) {
              return function(i) {
                var o = n.attr(i, e);
                return null == o ? "!=" === t: t ? (o += "", "=" === t ? o === r: "!=" === t ? o !== r: "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1: "$=" === t ? r && o.substr(o.length - r.length) === r: "~=" === t ? (" " + o + " ").indexOf(r) > -1: "|=" === t ? o === r || o.substr(0, r.length + 1) === r + "-": !1) : !0
              }
            },
            CHILD: function(e, t, n, r) {
              return "nth" === e ?
                function(e) {
                  var t,
                    i,
                    o = e.parentNode;
                  if (1 === n && 0 === r) return ! 0;
                  if (o) for (i = 0, t = o.firstChild; t && (1 !== t.nodeType || (i++, e !== t)); t = t.nextSibling);
                  return i -= r,
                    i === n || i % n === 0 && i / n >= 0
                }: function(t) {
                var n = t;
                switch (e) {
                  case "only":
                  case "first":
                    for (; n = n.previousSibling;) if (1 === n.nodeType) return ! 1;
                    if ("first" === e) return ! 0;
                    n = t;
                  case "last":
                    for (; n = n.nextSibling;) if (1 === n.nodeType) return ! 1;
                    return ! 0
                }
              }
            },
            PSEUDO: function(e, t) {
              var r,
                i = b.pseudos[e] || b.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
              return i[A] ? i(t) : i.length > 1 ? (r = [e, e, "", t], b.setFilters.hasOwnProperty(e.toLowerCase()) ? W(function(e, n) {
                for (var r, o = i(e, t), a = o.length; a--;) r = B.call(e, o[a]),
                  e[r] = !(n[r] = o[a])
              }) : function(e) {
                return i(e, 0, r)
              }) : i
            }
          },
          pseudos: {
            not: W(function(e) {
              var t = [],
                n = [],
                r = N(e.replace(G, "$1"));
              return r[A] ? W(function(e, t, n, i) {
                for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
              }) : function(e, i, o) {
                return t[0] = e,
                  r(t, null, o, n),
                  !n.pop()
              }
            }),
            has: W(function(e) {
              return function(t) {
                return n(e, t).length > 0
              }
            }),
            contains: W(function(e) {
              return function(t) {
                return (t.textContent || t.innerText || x(t)).indexOf(e) > -1
              }
            }),
            enabled: function(e) {
              return e.disabled === !1
            },
            disabled: function(e) {
              return e.disabled === !0
            },
            checked: function(e) {
              var t = e.nodeName.toLowerCase();
              return "input" === t && !!e.checked || "option" === t && !!e.selected
            },
            selected: function(e) {
              return e.parentNode && e.parentNode.selectedIndex,
                e.selected === !0
            },
            parent: function(e) {
              return ! b.pseudos.empty(e)
            },
            empty: function(e) {
              var t;
              for (e = e.firstChild; e;) {
                if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return ! 1;
                e = e.nextSibling
              }
              return ! 0
            },
            header: function(e) {
              return it.test(e.nodeName)
            },
            text: function(e) {
              var t,
                n;
              return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (n = e.getAttribute("type")) || n.toLowerCase() === t)
            },
            radio: r("radio"),
            checkbox: r("checkbox"),
            file: r("file"),
            password: r("password"),
            image: r("image"),
            submit: i("submit"),
            reset: i("reset"),
            button: function(e) {
              var t = e.nodeName.toLowerCase();
              return "input" === t && "button" === e.type || "button" === t
            },
            input: function(e) {
              return ot.test(e.nodeName)
            },
            focus: function(e) {
              var t = e.ownerDocument;
              return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
            },
            active: function(e) {
              return e === e.ownerDocument.activeElement
            },
            first: o(function() {
              return [0]
            }),
            last: o(function(e, t) {
              return [t - 1]
            }),
            eq: o(function(e, t, n) {
              return [0 > n ? n + t: n]
            }),
            even: o(function(e, t) {
              for (var n = 0; t > n; n += 2) e.push(n);
              return e
            }),
            odd: o(function(e, t) {
              for (var n = 1; t > n; n += 2) e.push(n);
              return e
            }),
            lt: o(function(e, t, n) {
              for (var r = 0 > n ? n + t: n; --r >= 0;) e.push(r);
              return e
            }),
            gt: o(function(e, t, n) {
              for (var r = 0 > n ? n + t: n; ++r < t;) e.push(r);
              return e
            })
          }
        },
        C = H.compareDocumentPosition ?
          function(e, t) {
            return e === t ? (k = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1: 1
          }: function(e, t) {
          if (e === t) return k = !0,
            0;
          if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
          var n,
            r,
            i = [],
            o = [],
            s = e.parentNode,
            l = t.parentNode,
            u = s;
          if (s === l) return a(e, t);
          if (!s) return - 1;
          if (!l) return 1;
          for (; u;) i.unshift(u),
            u = u.parentNode;
          for (u = l; u;) o.unshift(u),
            u = u.parentNode;
          n = i.length,
            r = o.length;
          for (var c = 0; n > c && r > c; c++) if (i[c] !== o[c]) return a(i[c], o[c]);
          return c === n ? a(e, o[c], -1) : a(i[c], t, 1)
        },
        [0, 0].sort(C),
        S = !k,
        n.uniqueSort = function(e) {
          var t,
            n = [],
            r = 1,
            i = 0;
          if (k = S, e.sort(C), k) {
            for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
            for (; i--;) e.splice(n[i], 1)
          }
          return e
        },
        n.error = function(e) {
          throw new Error("Syntax error, unrecognized expression: " + e)
        },
        N = n.compile = function(e, t) {
          var n,
            r = [],
            i = [],
            o = I[A][e + " "];
          if (!o) {
            for (t || (t = s(e)), n = t.length; n--;) o = p(t[n]),
              o[A] ? r.push(o) : i.push(o);
            o = I(e, d(i, r))
          }
          return o
        },
        D.querySelectorAll &&
        function() {
          var e,
            t = g,
            r = /'|\\/g,
            i = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            o = [":focus"],
            a = [":active"],
            l = H.matchesSelector || H.mozMatchesSelector || H.webkitMatchesSelector || H.oMatchesSelector || H.msMatchesSelector;
          lt(function(e) {
            e.innerHTML = "<select><option selected=''></option></select>",
              e.querySelectorAll("[selected]").length || o.push("\\[" + z + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
              e.querySelectorAll(":checked").length || o.push(":checked")
          }),
            lt(function(e) {
              e.innerHTML = "<p test=''></p>",
                e.querySelectorAll("[test^='']").length && o.push("[*^$]=" + z + "*(?:\"\"|'')"),
                e.innerHTML = "<input type='hidden'/>",
                e.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled")
            }),
            o = new RegExp(o.join("|")),
            g = function(e, n, i, a, l) {
              if (!a && !l && !o.test(e)) {
                var u,
                  c,
                  f = !0,
                  p = A,
                  d = n,
                  h = 9 === n.nodeType && e;
                if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
                  for (u = s(e), (f = n.getAttribute("id")) ? p = f.replace(r, "\\$&") : n.setAttribute("id", p), p = "[id='" + p + "'] ", c = u.length; c--;) u[c] = p + u[c].join("");
                  d = rt.test(e) && n.parentNode || n,
                    h = u.join(",")
                }
                if (h) try {
                  return q.apply(i, _.call(d.querySelectorAll(h), 0)),
                    i
                } catch(g) {} finally {
                  f || n.removeAttribute("id")
                }
              }
              return t(e, n, i, a, l)
            },
            l && (lt(function(t) {
            e = l.call(t, "div");
            try {
              l.call(t, "[test!='']:sizzle"),
                a.push("!=", V)
            } catch(n) {}
          }), a = new RegExp(a.join("|")), n.matchesSelector = function(t, r) {
            if (r = r.replace(i, "='$1']"), !w(t) && !a.test(r) && !o.test(r)) try {
              var s = l.call(t, r);
              if (s || e || t.document && 11 !== t.document.nodeType) return s
            } catch(u) {}
            return n(r, null, null, [t]).length > 0
          })
        } (),
        b.pseudos.nth = b.pseudos.eq,
        b.filters = m.prototype = b.pseudos,
        b.setFilters = new m,
        n.attr = K.attr,
        K.find = n,
        K.expr = n.selectors,
        K.expr[":"] = K.expr.pseudos,
        K.unique = n.uniqueSort,
        K.text = n.getText,
        K.isXMLDoc = n.isXML,
        K.contains = n.contains
    } (e);
  var Mt = /Until$/,
    Ot = /^(?:parents|prev(?:Until|All))/,
    qt = /^.[^:#\[\.,]*$/,
    _t = K.expr.match.needsContext,
    Bt = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  K.fn.extend({
    find: function(e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = this;
      if ("string" != typeof e) return K(e).filter(function() {
        for (t = 0, n = s.length; n > t; t++) if (K.contains(s[t], this)) return ! 0
      });
      for (a = this.pushStack("", "find", e), t = 0, n = this.length; n > t; t++) if (r = a.length, K.find(e, this[t], a), t > 0) for (i = r; i < a.length; i++) for (o = 0; r > o; o++) if (a[o] === a[i]) {
        a.splice(i--, 1);
        break
      }
      return a
    },
    has: function(e) {
      var t,
        n = K(e, this),
        r = n.length;
      return this.filter(function() {
        for (t = 0; r > t; t++) if (K.contains(this, n[t])) return ! 0
      })
    },
    not: function(e) {
      return this.pushStack(u(this, e, !1), "not", e)
    },
    filter: function(e) {
      return this.pushStack(u(this, e, !0), "filter", e)
    },
    is: function(e) {
      return !! e && ("string" == typeof e ? _t.test(e) ? K(e, this.context).index(this[0]) >= 0: K.filter(e, this).length > 0: this.filter(e).length > 0)
    },
    closest: function(e, t) {
      for (var n, r = 0, i = this.length, o = [], a = _t.test(e) || "string" != typeof e ? K(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
        if (a ? a.index(n) > -1: K.find.matchesSelector(n, e)) {
          o.push(n);
          break
        }
        n = n.parentNode
      }
      return o = o.length > 1 ? K.unique(o) : o,
        this.pushStack(o, "closest", e)
    },
    index: function(e) {
      return e ? "string" == typeof e ? K.inArray(this[0], K(e)) : K.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length: -1
    },
    add: function(e, t) {
      var n = "string" == typeof e ? K(e, t) : K.makeArray(e && e.nodeType ? [e] : e),
        r = K.merge(this.get(), n);
      return this.pushStack(s(n[0]) || s(r[0]) ? r: K.unique(r))
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject: this.prevObject.filter(e))
    }
  }),
    K.fn.andSelf = K.fn.addBack,
    K.each({
        parent: function(e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t: null
        },
        parents: function(e) {
          return K.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
          return K.dir(e, "parentNode", n)
        },
        next: function(e) {
          return l(e, "nextSibling")
        },
        prev: function(e) {
          return l(e, "previousSibling")
        },
        nextAll: function(e) {
          return K.dir(e, "nextSibling")
        },
        prevAll: function(e) {
          return K.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
          return K.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
          return K.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
          return K.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
          return K.sibling(e.firstChild)
        },
        contents: function(e) {
          return K.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: K.merge([], e.childNodes)
        }
      },
      function(e, t) {
        K.fn[e] = function(n, r) {
          var i = K.map(this, t, n);
          return Mt.test(e) || (r = n),
            r && "string" == typeof r && (i = K.filter(r, i)),
            i = this.length > 1 && !Bt[e] ? K.unique(i) : i,
            this.length > 1 && Ot.test(e) && (i = i.reverse()),
            this.pushStack(i, e, Y.call(arguments).join(","))
        }
      }),
    K.extend({
      filter: function(e, t, n) {
        return n && (e = ":not(" + e + ")"),
            1 === t.length ? K.find.matchesSelector(t[0], e) ? [t[0]] : [] : K.find.matches(e, t)
      },
      dir: function(e, n, r) {
        for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !K(o).is(r));) 1 === o.nodeType && i.push(o),
          o = o[n];
        return i
      },
      sibling: function(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n
      }
    });
  var Wt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Pt = / jQuery\d+="(?:null|\d+)"/g,
    Rt = /^\s+/,
    $t = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    It = /<([\w:]+)/,
    zt = /<tbody/i,
    Xt = /<|&#?\w+;/,
    Ut = /<(?:script|style|link)/i,
    Yt = /<(?:script|object|embed|option|style)/i,
    Qt = new RegExp("<(?:" + Wt + ")[\\s/>]", "i"),
    Vt = /^(?:checkbox|radio)$/,
    Jt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Gt = /\/(java|ecma)script/i,
    Kt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
    Zt = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""]
    },
    en = c(R),
    tn = en.appendChild(R.createElement("div"));
  Zt.optgroup = Zt.option,
    Zt.tbody = Zt.tfoot = Zt.colgroup = Zt.caption = Zt.thead,
    Zt.th = Zt.td,
    K.support.htmlSerialize || (Zt._default = [1, "X<div>", "</div>"]),
    K.fn.extend({
      text: function(e) {
        return K.access(this,
          function(e) {
            return e === t ? K.text(this) : this.empty().append((this[0] && this[0].ownerDocument || R).createTextNode(e))
          },
          null, e, arguments.length)
      },
      wrapAll: function(e) {
        if (K.isFunction(e)) return this.each(function(t) {
          K(this).wrapAll(e.call(this, t))
        });
        if (this[0]) {
          var t = K(e, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
              for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
              return e
            }).append(this)
        }
        return this
      },
      wrapInner: function(e) {
        return this.each(K.isFunction(e) ?
          function(t) {
            K(this).wrapInner(e.call(this, t))
          }: function() {
          var t = K(this),
            n = t.contents();
          n.length ? n.wrapAll(e) : t.append(e)
        })
      },
      wrap: function(e) {
        var t = K.isFunction(e);
        return this.each(function(n) {
          K(this).wrapAll(t ? e.call(this, n) : e)
        })
      },
      unwrap: function() {
        return this.parent().each(function() {
          K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
        }).end()
      },
      append: function() {
        return this.domManip(arguments, !0,
          function(e) { (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
          })
      },
      prepend: function() {
        return this.domManip(arguments, !0,
          function(e) { (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
          })
      },
      before: function() {
        if (!s(this[0])) return this.domManip(arguments, !1,
          function(e) {
            this.parentNode.insertBefore(e, this)
          });
        if (arguments.length) {
          var e = K.clean(arguments);
          return this.pushStack(K.merge(e, this), "before", this.selector)
        }
      },
      after: function() {
        if (!s(this[0])) return this.domManip(arguments, !1,
          function(e) {
            this.parentNode.insertBefore(e, this.nextSibling)
          });
        if (arguments.length) {
          var e = K.clean(arguments);
          return this.pushStack(K.merge(this, e), "after", this.selector)
        }
      },
      remove: function(e, t) {
        for (var n, r = 0; null != (n = this[r]); r++)(!e || K.filter(e, [n]).length) && (!t && 1 === n.nodeType && (K.cleanData(n.getElementsByTagName("*")), K.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
        return this
      },
      empty: function() {
        for (var e, t = 0; null != (e = this[t]); t++) for (1 === e.nodeType && K.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
        return this
      },
      clone: function(e, t) {
        return e = null == e ? !1: e,
          t = null == t ? e: t,
          this.map(function() {
            return K.clone(this, e, t)
          })
      },
      html: function(e) {
        return K.access(this,
          function(e) {
            var n = this[0] || {},
              r = 0,
              i = this.length;
            if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Pt, "") : t;
            if (! ("string" != typeof e || Ut.test(e) || !K.support.htmlSerialize && Qt.test(e) || !K.support.leadingWhitespace && Rt.test(e) || Zt[(It.exec(e) || ["", ""])[1].toLowerCase()])) {
              e = e.replace($t, "<$1></$2>");
              try {
                for (; i > r; r++) n = this[r] || {},
                  1 === n.nodeType && (K.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                n = 0
              } catch(o) {}
            }
            n && this.empty().append(e)
          },
          null, e, arguments.length)
      },
      replaceWith: function(e) {
        return s(this[0]) ? this.length ? this.pushStack(K(K.isFunction(e) ? e() : e), "replaceWith", e) : this: K.isFunction(e) ? this.each(function(t) {
          var n = K(this),
            r = n.html();
          n.replaceWith(e.call(this, t, r))
        }) : ("string" != typeof e && (e = K(e).detach()), this.each(function() {
          var t = this.nextSibling,
            n = this.parentNode;
          K(this).remove(),
            t ? K(t).before(e) : K(n).append(e)
        }))
      },
      detach: function(e) {
        return this.remove(e, !0)
      },
      domManip: function(e, n, r) {
        e = [].concat.apply([], e);
        var i,
          o,
          a,
          s,
          l = 0,
          u = e[0],
          c = [],
          p = this.length;
        if (!K.support.checkClone && p > 1 && "string" == typeof u && Jt.test(u)) return this.each(function() {
          K(this).domManip(e, n, r)
        });
        if (K.isFunction(u)) return this.each(function(i) {
          var o = K(this);
          e[0] = u.call(this, i, n ? o.html() : t),
            o.domManip(e, n, r)
        });
        if (this[0]) {
          if (i = K.buildFragment(e, this, c), a = i.fragment, o = a.firstChild, 1 === a.childNodes.length && (a = o), o) for (n = n && K.nodeName(o, "tr"), s = i.cacheable || p - 1; p > l; l++) r.call(n && K.nodeName(this[l], "table") ? f(this[l], "tbody") : this[l], l === s ? a: K.clone(a, !0, !0));
          a = o = null,
            c.length && K.each(c,
            function(e, t) {
              t.src ? K.ajax ? K.ajax({
                url: t.src,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
              }) : K.error("no ajax") : K.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Kt, "")),
                t.parentNode && t.parentNode.removeChild(t)
            })
        }
        return this
      }
    }),
    K.buildFragment = function(e, n, r) {
      var i,
        o,
        a,
        s = e[0];
      return n = n || R,
        n = !n.nodeType && n[0] || n,
        n = n.ownerDocument || n,
        1 === e.length && "string" == typeof s && s.length < 512 && n === R && "<" === s.charAt(0) && !Yt.test(s) && (K.support.checkClone || !Jt.test(s)) && (K.support.html5Clone || !Qt.test(s)) && (o = !0, i = K.fragments[s], a = i !== t),
        i || (i = n.createDocumentFragment(), K.clean(e, n, i, r), o && (K.fragments[s] = a && i)),
      {
        fragment: i,
        cacheable: o
      }
    },
    K.fragments = {},
    K.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      },
      function(e, t) {
        K.fn[e] = function(n) {
          var r,
            i = 0,
            o = [],
            a = K(n),
            s = a.length,
            l = 1 === this.length && this[0].parentNode;
          if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === s) return a[t](this[0]),
            this;
          for (; s > i; i++) r = (i > 0 ? this.clone(!0) : this).get(),
            K(a[i])[t](r),
            o = o.concat(r);
          return this.pushStack(o, e, a.selector)
        }
      }),
    K.extend({
      clone: function(e, t, n) {
        var r,
          i,
          o,
          a;
        if (K.support.html5Clone || K.isXMLDoc(e) || !Qt.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (tn.innerHTML = e.outerHTML, tn.removeChild(a = tn.firstChild)), !(K.support.noCloneEvent && K.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || K.isXMLDoc(e))) for (d(e, a), r = h(e), i = h(a), o = 0; r[o]; ++o) i[o] && d(r[o], i[o]);
        if (t && (p(e, a), n)) for (r = h(e), i = h(a), o = 0; r[o]; ++o) p(r[o], i[o]);
        return r = i = null,
          a
      },
      clean: function(e, t, n, r) {
        var i,
          o,
          a,
          s,
          l,
          u,
          f,
          p,
          d,
          h,
          m,
          y = t === R && en,
          v = [];
        for (t && "undefined" != typeof t.createDocumentFragment || (t = R), i = 0; null != (a = e[i]); i++) if ("number" == typeof a && (a += ""), a) {
          if ("string" == typeof a) if (Xt.test(a)) {
            for (y = y || c(t), f = t.createElement("div"), y.appendChild(f), a = a.replace($t, "<$1></$2>"), s = (It.exec(a) || ["", ""])[1].toLowerCase(), l = Zt[s] || Zt._default, u = l[0], f.innerHTML = l[1] + a + l[2]; u--;) f = f.lastChild;
            if (!K.support.tbody) for (p = zt.test(a), d = "table" !== s || p ? "<table>" !== l[1] || p ? [] : f.childNodes: f.firstChild && f.firstChild.childNodes, o = d.length - 1; o >= 0; --o) K.nodeName(d[o], "tbody") && !d[o].childNodes.length && d[o].parentNode.removeChild(d[o]); ! K.support.leadingWhitespace && Rt.test(a) && f.insertBefore(t.createTextNode(Rt.exec(a)[0]), f.firstChild),
              a = f.childNodes,
              f.parentNode.removeChild(f)
          } else a = t.createTextNode(a);
          a.nodeType ? v.push(a) : K.merge(v, a)
        }
        if (f && (a = f = y = null), !K.support.appendChecked) for (i = 0; null != (a = v[i]); i++) K.nodeName(a, "input") ? g(a) : "undefined" != typeof a.getElementsByTagName && K.grep(a.getElementsByTagName("input"), g);
        if (n) for (h = function(e) {
          return ! e.type || Gt.test(e.type) ? r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e) : void 0
        },
                      i = 0; null != (a = v[i]); i++) K.nodeName(a, "script") && h(a) || (n.appendChild(a), "undefined" != typeof a.getElementsByTagName && (m = K.grep(K.merge([], a.getElementsByTagName("script")), h), v.splice.apply(v, [i + 1, 0].concat(m)), i += m.length));
        return v
      },
      cleanData: function(e, t) {
        for (var n, r, i, o, a = 0, s = K.expando, l = K.cache, u = K.support.deleteExpando, c = K.event.special; null != (i = e[a]); a++) if ((t || K.acceptData(i)) && (r = i[s], n = r && l[r])) {
          if (n.events) for (o in n.events) c[o] ? K.event.remove(i, o) : K.removeEvent(i, o, n.handle);
          l[r] && (delete l[r], u ? delete i[s] : i.removeAttribute ? i.removeAttribute(s) : i[s] = null, K.deletedIds.push(r))
        }
      }
    }),
    function() {
      var e,
        t;
      K.uaMatch = function(e) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
        return {
          browser: t[1] || "",
          version: t[2] || "0"
        }
      },
        e = K.uaMatch(I.userAgent),
        t = {},
        e.browser && (t[e.browser] = !0, t.version = e.version),
        t.chrome ? t.webkit = !0: t.webkit && (t.safari = !0),
        K.browser = t,
        K.sub = function() {
          function e(t, n) {
            return new e.fn.init(t, n)
          }
          K.extend(!0, e, this),
            e.superclass = this,
            e.fn = e.prototype = this(),
            e.fn.constructor = e,
            e.sub = this.sub,
            e.fn.init = function(n, r) {
              return r && r instanceof K && !(r instanceof e) && (r = e(r)),
                K.fn.init.call(this, n, r, t)
            },
            e.fn.init.prototype = e.fn;
          var t = e(R);
          return e
        }
    } ();
  var nn,
    rn,
    on,
    an = /alpha\([^)]*\)/i,
    sn = /opacity=([^)]*)/,
    ln = /^(top|right|bottom|left)$/,
    un = /^(none|table(?!-c[ea]).+)/,
    cn = /^margin/,
    fn = new RegExp("^(" + Z + ")(.*)$", "i"),
    pn = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
    dn = new RegExp("^([-+])=(" + Z + ")", "i"),
    hn = {
      BODY: "block"
    },
    gn = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    mn = {
      letterSpacing: 0,
      fontWeight: 400
    },
    yn = ["Top", "Right", "Bottom", "Left"],
    vn = ["Webkit", "O", "Moz", "ms"],
    bn = K.fn.toggle;
  K.fn.extend({
    css: function(e, n) {
      return K.access(this,
        function(e, n, r) {
          return r !== t ? K.style(e, n, r) : K.css(e, n)
        },
        e, n, arguments.length > 1)
    },
    show: function() {
      return v(this, !0)
    },
    hide: function() {
      return v(this)
    },
    toggle: function(e, t) {
      var n = "boolean" == typeof e;
      return K.isFunction(e) && K.isFunction(t) ? bn.apply(this, arguments) : this.each(function() { (n ? e: y(this)) ? K(this).show() : K(this).hide()
      })
    }
  }),
    K.extend({
      cssHooks: {
        opacity: {
          get: function(e, t) {
            if (t) {
              var n = nn(e, "opacity");
              return "" === n ? "1": n
            }
          }
        }
      },
      cssNumber: {
        fillOpacity: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: {
        "float": K.support.cssFloat ? "cssFloat": "styleFloat"
      },
      style: function(e, n, r, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var o,
            a,
            s,
            l = K.camelCase(n),
            u = e.style;
          if (n = K.cssProps[l] || (K.cssProps[l] = m(u, l)), s = K.cssHooks[n] || K.cssHooks[l], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o: u[n];
          if (a = typeof r, "string" === a && (o = dn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(K.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" === a && !K.cssNumber[l] && (r += "px"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
            u[n] = r
          } catch(c) {}
        }
      },
      css: function(e, n, r, i) {
        var o,
          a,
          s,
          l = K.camelCase(n);
        return n = K.cssProps[l] || (K.cssProps[l] = m(e.style, l)),
          s = K.cssHooks[n] || K.cssHooks[l],
          s && "get" in s && (o = s.get(e, !0, i)),
          o === t && (o = nn(e, n)),
          "normal" === o && n in mn && (o = mn[n]),
            r || i !== t ? (a = parseFloat(o), r || K.isNumeric(a) ? a || 0: o) : o
      },
      swap: function(e, t, n) {
        var r,
          i,
          o = {};
        for (i in t) o[i] = e.style[i],
          e.style[i] = t[i];
        r = n.call(e);
        for (i in t) e.style[i] = o[i];
        return r
      }
    }),
    e.getComputedStyle ? nn = function(t, n) {
      var r,
        i,
        o,
        a,
        s = e.getComputedStyle(t, null),
        l = t.style;
      return s && (r = s.getPropertyValue(n) || s[n], "" === r && !K.contains(t.ownerDocument, t) && (r = K.style(t, n)), pn.test(r) && cn.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = r, r = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)),
        r
    }: R.documentElement.currentStyle && (nn = function(e, t) {
      var n,
        r,
        i = e.currentStyle && e.currentStyle[t],
        o = e.style;
      return null == i && o && o[t] && (i = o[t]),
        pn.test(i) && !ln.test(t) && (n = o.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), o.left = "fontSize" === t ? "1em": i, i = o.pixelLeft + "px", o.left = n, r && (e.runtimeStyle.left = r)),
          "" === i ? "auto": i
    }),
    K.each(["height", "width"],
      function(e, t) {
        K.cssHooks[t] = {
          get: function(e, n, r) {
            return n ? 0 === e.offsetWidth && un.test(nn(e, "display")) ? K.swap(e, gn,
              function() {
                return w(e, t, r)
              }) : w(e, t, r) : void 0
          },
          set: function(e, n, r) {
            return b(e, n, r ? x(e, t, r, K.support.boxSizing && "border-box" === K.css(e, "boxSizing")) : 0)
          }
        }
      }),
    K.support.opacity || (K.cssHooks.opacity = {
    get: function(e, t) {
      return sn.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
    },
    set: function(e, t) {
      var n = e.style,
        r = e.currentStyle,
        i = K.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")": "",
        o = r && r.filter || n.filter || "";
      n.zoom = 1,
        t >= 1 && "" === K.trim(o.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"), r && !r.filter) || (n.filter = an.test(o) ? o.replace(an, i) : o + " " + i)
    }
  }),
    K(function() {
      K.support.reliableMarginRight || (K.cssHooks.marginRight = {
        get: function(e, t) {
          return K.swap(e, {
              display: "inline-block"
            },
            function() {
              return t ? nn(e, "marginRight") : void 0
            })
        }
      }),
        !K.support.pixelPosition && K.fn.position && K.each(["top", "left"],
        function(e, t) {
          K.cssHooks[t] = {
            get: function(e, n) {
              if (n) {
                var r = nn(e, t);
                return pn.test(r) ? K(e).position()[t] + "px": r
              }
            }
          }
        })
    }),
    K.expr && K.expr.filters && (K.expr.filters.hidden = function(e) {
    return 0 === e.offsetWidth && 0 === e.offsetHeight || !K.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || nn(e, "display"))
  },
    K.expr.filters.visible = function(e) {
      return ! K.expr.filters.hidden(e)
    }),
    K.each({
        margin: "",
        padding: "",
        border: "Width"
      },
      function(e, t) {
        K.cssHooks[e + t] = {
          expand: function(n) {
            var r,
              i = "string" == typeof n ? n.split(" ") : [n],
              o = {};
            for (r = 0; 4 > r; r++) o[e + yn[r] + t] = i[r] || i[r - 2] || i[0];
            return o
          }
        },
          cn.test(e) || (K.cssHooks[e + t].set = b)
      });
  var xn = /%20/g,
    wn = /\[\]$/,
    Tn = /\r?\n/g,
    Nn = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    Cn = /^(?:select|textarea)/i;
  K.fn.extend({
    serialize: function() {
      return K.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        return this.elements ? K.makeArray(this.elements) : this
      }).filter(function() {
        return this.name && !this.disabled && (this.checked || Cn.test(this.nodeName) || Nn.test(this.type))
      }).map(function(e, t) {
        var n = K(this).val();
        return null == n ? null: K.isArray(n) ? K.map(n,
          function(e) {
            return {
              name: t.name,
              value: e.replace(Tn, "\r\n")
            }
          }) : {
          name: t.name,
          value: n.replace(Tn, "\r\n")
        }
      }).get()
    }
  }),
    K.param = function(e, n) {
      var r,
        i = [],
        o = function(e, t) {
          t = K.isFunction(t) ? t() : null == t ? "": t,
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
      if (n === t && (n = K.ajaxSettings && K.ajaxSettings.traditional), K.isArray(e) || e.jquery && !K.isPlainObject(e)) K.each(e,
        function() {
          o(this.name, this.value)
        });
      else for (r in e) N(r, e[r], n, o);
      return i.join("&").replace(xn, "+")
    };
  var kn,
    En,
    Sn = /#.*$/,
    jn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    An = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
    Ln = /^(?:GET|HEAD)$/,
    Dn = /^\/\//,
    Hn = /\?/,
    Fn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    Mn = /([?&])_=[^&]*/,
    On = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    qn = K.fn.load,
    _n = {},
    Bn = {},
    Wn = ["*/"] + ["*"];
  try {
    En = $.href
  } catch(Pn) {
    En = R.createElement("a"),
      En.href = "",
      En = En.href
  }
  kn = On.exec(En.toLowerCase()) || [],
    K.fn.load = function(e, n, r) {
      if ("string" != typeof e && qn) return qn.apply(this, arguments);
      if (!this.length) return this;
      var i,
        o,
        a,
        s = this,
        l = e.indexOf(" ");
      return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)),
        K.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (o = "POST"),
        K.ajax({
          url: e,
          type: o,
          dataType: "html",
          data: n,
          complete: function(e, t) {
            r && s.each(r, a || [e.responseText, t, e])
          }
        }).done(function(e) {
          a = arguments,
            s.html(i ? K("<div>").append(e.replace(Fn, "")).find(i) : e)
        }),
        this
    },
    K.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
      function(e, t) {
        K.fn[t] = function(e) {
          return this.on(t, e)
        }
      }),
    K.each(["get", "post"],
      function(e, n) {
        K[n] = function(e, r, i, o) {
          return K.isFunction(r) && (o = o || i, i = r, r = t),
            K.ajax({
              type: n,
              url: e,
              data: r,
              success: i,
              dataType: o
            })
        }
      }),
    K.extend({
      getScript: function(e, n) {
        return K.get(e, t, n, "script")
      },
      getJSON: function(e, t, n) {
        return K.get(e, t, n, "json")
      },
      ajaxSetup: function(e, t) {
        return t ? E(e, K.ajaxSettings) : (t = e, e = K.ajaxSettings),
          E(e, t),
          e
      },
      ajaxSettings: {
        url: En,
        isLocal: An.test(kn[1]),
        global: !0,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        processData: !0,
        async: !0,
        accepts: {
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          "*": Wn
        },
        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText"
        },
        converters: {
          "* text": e.String,
          "text html": !0,
          "text json": K.parseJSON,
          "text xml": K.parseXML
        },
        flatOptions: {
          context: !0,
          url: !0
        }
      },
      ajaxPrefilter: C(_n),
      ajaxTransport: C(Bn),
      ajax: function(e, n) {
        function r(e, n, r, a) {
          var u,
            f,
            v,
            b,
            w,
            N = n;
          2 !== x && (x = 2, l && clearTimeout(l), s = t, o = a || "", T.readyState = e > 0 ? 4: 0, r && (b = S(p, T, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (K.lastModified[i] = w), w = T.getResponseHeader("Etag"), w && (K.etag[i] = w)), 304 === e ? (N = "notmodified", u = !0) : (u = j(p, b), N = u.state, f = u.data, v = u.error, u = !v)) : (v = N, (!N || e) && (N = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || N) + "", u ? g.resolveWith(d, [f, N, T]) : g.rejectWith(d, [T, N, v]), T.statusCode(y), y = t, c && h.trigger("ajax" + (u ? "Success": "Error"), [T, p, u ? f: v]), m.fireWith(d, [T, N]), c && (h.trigger("ajaxComplete", [T, p]), --K.active || K.event.trigger("ajaxStop")))
        }
        "object" == typeof e && (n = e, e = t),
          n = n || {};
        var i,
          o,
          a,
          s,
          l,
          u,
          c,
          f,
          p = K.ajaxSetup({},
            n),
          d = p.context || p,
          h = d !== p && (d.nodeType || d instanceof K) ? K(d) : K.event,
          g = K.Deferred(),
          m = K.Callbacks("once memory"),
          y = p.statusCode || {},
          v = {},
          b = {},
          x = 0,
          w = "canceled",
          T = {
            readyState: 0,
            setRequestHeader: function(e, t) {
              if (!x) {
                var n = e.toLowerCase();
                e = b[n] = b[n] || e,
                  v[e] = t
              }
              return this
            },
            getAllResponseHeaders: function() {
              return 2 === x ? o: null
            },
            getResponseHeader: function(e) {
              var n;
              if (2 === x) {
                if (!a) for (a = {}; n = jn.exec(o);) a[n[1].toLowerCase()] = n[2];
                n = a[e.toLowerCase()]
              }
              return n === t ? null: n
            },
            overrideMimeType: function(e) {
              return x || (p.mimeType = e),
                this
            },
            abort: function(e) {
              return e = e || w,
                s && s.abort(e),
                r(0, e),
                this
            }
          };
        if (g.promise(T), T.success = T.done, T.error = T.fail, T.complete = m.add, T.statusCode = function(e) {
          if (e) {
            var t;
            if (2 > x) for (t in e) y[t] = [y[t], e[t]];
            else t = e[T.status],
              T.always(t)
          }
          return this
        },
          p.url = ((e || p.url) + "").replace(Sn, "").replace(Dn, kn[1] + "//"), p.dataTypes = K.trim(p.dataType || "*").toLowerCase().split(tt), null == p.crossDomain && (u = On.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === kn[1] && u[2] === kn[2] && (u[3] || ("http:" === u[1] ? 80: 443)) == (kn[3] || ("http:" === kn[1] ? 80: 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = K.param(p.data, p.traditional)), k(_n, p, n, T), 2 === x) return T;
        if (c = p.global, p.type = p.type.toUpperCase(), p.hasContent = !Ln.test(p.type), c && 0 === K.active++&&K.event.trigger("ajaxStart"), !p.hasContent && (p.data && (p.url += (Hn.test(p.url) ? "&": "?") + p.data, delete p.data), i = p.url, p.cache === !1)) {
          var N = K.now(),
            C = p.url.replace(Mn, "$1_=" + N);
          p.url = C + (C === p.url ? (Hn.test(p.url) ? "&": "?") + "_=" + N: "")
        } (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType),
          p.ifModified && (i = i || p.url, K.lastModified[i] && T.setRequestHeader("If-Modified-Since", K.lastModified[i]), K.etag[i] && T.setRequestHeader("If-None-Match", K.etag[i])),
          T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Wn + "; q=0.01": "") : p.accepts["*"]);
        for (f in p.headers) T.setRequestHeader(f, p.headers[f]);
        if (!p.beforeSend || p.beforeSend.call(d, T, p) !== !1 && 2 !== x) {
          w = "abort";
          for (f in {
            success: 1,
            error: 1,
            complete: 1
          }) T[f](p[f]);
          if (s = k(Bn, p, n, T)) {
            T.readyState = 1,
              c && h.trigger("ajaxSend", [T, p]),
              p.async && p.timeout > 0 && (l = setTimeout(function() {
                T.abort("timeout")
              },
              p.timeout));
            try {
              x = 1,
                s.send(v, r)
            } catch(E) {
              if (! (2 > x)) throw E;
              r( - 1, E)
            }
          } else r( - 1, "No Transport");
          return T
        }
        return T.abort()
      },
      active: 0,
      lastModified: {},
      etag: {}
    });
  var Rn = [],
    $n = /\?/,
    In = /(=)\?(?=&|$)|\?\?/,
    zn = K.now();
  K.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var e = Rn.pop() || K.expando + "_" + zn++;
      return this[e] = !0,
        e
    }
  }),
    K.ajaxPrefilter("json jsonp",
      function(n, r, i) {
        var o,
          a,
          s,
          l = n.data,
          u = n.url,
          c = n.jsonp !== !1,
          f = c && In.test(u),
          p = c && !f && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && In.test(l);
        return "jsonp" === n.dataTypes[0] || f || p ? (o = n.jsonpCallback = K.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, a = e[o], f ? n.url = u.replace(In, "$1" + o) : p ? n.data = l.replace(In, "$1" + o) : c && (n.url += ($n.test(u) ? "&": "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
          return s || K.error(o + " was not called"),
            s[0]
        },
          n.dataTypes[0] = "json", e[o] = function() {
          s = arguments
        },
          i.always(function() {
            e[o] = a,
              n[o] && (n.jsonpCallback = r.jsonpCallback, Rn.push(o)),
              s && K.isFunction(a) && a(s[0]),
              s = a = t
          }), "script") : void 0
      }),
    K.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /javascript|ecmascript/
      },
      converters: {
        "text script": function(e) {
          return K.globalEval(e),
            e
        }
      }
    }),
    K.ajaxPrefilter("script",
      function(e) {
        e.cache === t && (e.cache = !1),
          e.crossDomain && (e.type = "GET", e.global = !1)
      }),
    K.ajaxTransport("script",
      function(e) {
        if (e.crossDomain) {
          var n,
            r = R.head || R.getElementsByTagName("head")[0] || R.documentElement;
          return {
            send: function(i, o) {
              n = R.createElement("script"),
                n.async = "async",
                e.scriptCharset && (n.charset = e.scriptCharset),
                n.src = e.url,
                n.onload = n.onreadystatechange = function(e, i) { (i || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success"))
                },
                r.insertBefore(n, r.firstChild)
            },
            abort: function() {
              n && n.onload(0, 1)
            }
          }
        }
      });
  var Xn,
    Un = e.ActiveXObject ?
      function() {
        for (var e in Xn) Xn[e](0, 1)
      }: !1,
    Yn = 0;
  K.ajaxSettings.xhr = e.ActiveXObject ?
    function() {
      return ! this.isLocal && A() || L()
    }: A,
    function(e) {
      K.extend(K.support, {
        ajax: !!e,
        cors: !!e && "withCredentials" in e
      })
    } (K.ajaxSettings.xhr()),
    K.support.ajax && K.ajaxTransport(function(n) {
    if (!n.crossDomain || K.support.cors) {
      var r;
      return {
        send: function(i, o) {
          var a,
            s,
            l = n.xhr();
          if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s];
          n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
            !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (s in i) l.setRequestHeader(s, i[s])
          } catch(u) {}
          l.send(n.hasContent && n.data || null),
            r = function(e, i) {
              var s,
                u,
                c,
                f,
                p;
              try {
                if (r && (i || 4 === l.readyState)) if (r = t, a && (l.onreadystatechange = K.noop, Un && delete Xn[a]), i) 4 !== l.readyState && l.abort();
                else {
                  s = l.status,
                    c = l.getAllResponseHeaders(),
                    f = {},
                    p = l.responseXML,
                    p && p.documentElement && (f.xml = p);
                  try {
                    f.text = l.responseText
                  } catch(d) {}
                  try {
                    u = l.statusText
                  } catch(d) {
                    u = ""
                  }
                  s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200: 404
                }
              } catch(h) {
                i || o( - 1, h)
              }
              f && o(s, u, f, c)
            },
            n.async ? 4 === l.readyState ? setTimeout(r, 0) : (a = ++Yn, Un && (Xn || (Xn = {},
              K(e).unload(Un)), Xn[a] = r), l.onreadystatechange = r) : r()
        },
        abort: function() {
          r && r(0, 1)
        }
      }
    }
  });
  var Qn,
    Vn,
    Jn = /^(?:toggle|show|hide)$/,
    Gn = new RegExp("^(?:([-+])=|)(" + Z + ")([a-z%]*)$", "i"),
    Kn = /queueHooks$/,
    Zn = [O],
    er = {
      "*": [function(e, t) {
        var n,
          r,
          i = this.createTween(e, t),
          o = Gn.exec(t),
          a = i.cur(),
          s = +a || 0,
          l = 1,
          u = 20;
        if (o) {
          if (n = +o[2], r = o[3] || (K.cssNumber[e] ? "": "px"), "px" !== r && s) {
            s = K.css(i.elem, e, !0) || n || 1;
            do l = l || ".5",
              s /= l,
              K.style(i.elem, e, s + r);
            while (l !== (l = i.cur() / a) && 1 !== l && --u)
          }
          i.unit = r,
            i.start = s,
            i.end = o[1] ? s + (o[1] + 1) * n: n
        }
        return i
      }]
    };
  K.Animation = K.extend(F, {
    tweener: function(e, t) {
      K.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      for (var n, r = 0, i = e.length; i > r; r++) n = e[r],
        er[n] = er[n] || [],
        er[n].unshift(t)
    },
    prefilter: function(e, t) {
      t ? Zn.unshift(e) : Zn.push(e)
    }
  }),
    K.Tween = q,
    q.prototype = {
      constructor: q,
      init: function(e, t, n, r, i, o) {
        this.elem = e,
          this.prop = n,
          this.easing = i || "swing",
          this.options = t,
          this.start = this.now = this.cur(),
          this.end = r,
          this.unit = o || (K.cssNumber[n] ? "": "px")
      },
      cur: function() {
        var e = q.propHooks[this.prop];
        return e && e.get ? e.get(this) : q.propHooks._default.get(this)
      },
      run: function(e) {
        var t,
          n = q.propHooks[this.prop];
        return this.pos = t = this.options.duration ? K.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
          this.now = (this.end - this.start) * t + this.start,
          this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : q.propHooks._default.set(this),
          this
      }
    },
    q.prototype.init.prototype = q.prototype,
    q.propHooks = {
      _default: {
        get: function(e) {
          var t;
          return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = K.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t: 0) : e.elem[e.prop]
        },
        set: function(e) {
          K.fx.step[e.prop] ? K.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[K.cssProps[e.prop]] || K.cssHooks[e.prop]) ? K.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
        }
      }
    },
    q.propHooks.scrollTop = q.propHooks.scrollLeft = {
      set: function(e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
      }
    },
    K.each(["toggle", "show", "hide"],
      function(e, t) {
        var n = K.fn[t];
        K.fn[t] = function(r, i, o) {
          return null == r || "boolean" == typeof r || !e && K.isFunction(r) && K.isFunction(i) ? n.apply(this, arguments) : this.animate(_(t, !0), r, i, o)
        }
      }),
    K.fn.extend({
      fadeTo: function(e, t, n, r) {
        return this.filter(y).css("opacity", 0).show().end().animate({
            opacity: t
          },
          e, n, r)
      },
      animate: function(e, t, n, r) {
        var i = K.isEmptyObject(e),
          o = K.speed(t, n, r),
          a = function() {
            var t = F(this, K.extend({},
              e), o);
            i && t.stop(!0)
          };
        return i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
      },
      stop: function(e, n, r) {
        var i = function(e) {
          var t = e.stop;
          delete e.stop,
            t(r)
        };
        return "string" != typeof e && (r = n, n = e, e = t),
          n && e !== !1 && this.queue(e || "fx", []),
          this.each(function() {
            var t = !0,
              n = null != e && e + "queueHooks",
              o = K.timers,
              a = K._data(this);
            if (n) a[n] && a[n].stop && i(a[n]);
            else for (n in a) a[n] && a[n].stop && Kn.test(n) && i(a[n]);
            for (n = o.length; n--;) o[n].elem === this && (null == e || o[n].queue === e) && (o[n].anim.stop(r), t = !1, o.splice(n, 1)); (t || !r) && K.dequeue(this, e)
          })
      }
    }),
    K.each({
        slideDown: _("show"),
        slideUp: _("hide"),
        slideToggle: _("toggle"),
        fadeIn: {
          opacity: "show"
        },
        fadeOut: {
          opacity: "hide"
        },
        fadeToggle: {
          opacity: "toggle"
        }
      },
      function(e, t) {
        K.fn[e] = function(e, n, r) {
          return this.animate(t, e, n, r)
        }
      }),
    K.speed = function(e, t, n) {
      var r = e && "object" == typeof e ? K.extend({},
        e) : {
        complete: n || !n && t || K.isFunction(e) && e,
        duration: e,
        easing: n && t || t && !K.isFunction(t) && t
      };
      return r.duration = K.fx.off ? 0: "number" == typeof r.duration ? r.duration: r.duration in K.fx.speeds ? K.fx.speeds[r.duration] : K.fx.speeds._default,
        (null == r.queue || r.queue === !0) && (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
          K.isFunction(r.old) && r.old.call(this),
            r.queue && K.dequeue(this, r.queue)
        },
        r
    },
    K.easing = {
      linear: function(e) {
        return e
      },
      swing: function(e) {
        return.5 - Math.cos(e * Math.PI) / 2
      }
    },
    K.timers = [],
    K.fx = q.prototype.init,
    K.fx.tick = function() {
      var e,
        n = K.timers,
        r = 0;
      for (Qn = K.now(); r < n.length; r++) e = n[r],
        !e() && n[r] === e && n.splice(r--, 1);
      n.length || K.fx.stop(),
        Qn = t
    },
    K.fx.timer = function(e) {
      e() && K.timers.push(e) && !Vn && (Vn = setInterval(K.fx.tick, K.fx.interval))
    },
    K.fx.interval = 13,
    K.fx.stop = function() {
      clearInterval(Vn),
        Vn = null
    },
    K.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    },
    K.fx.step = {},
    K.expr && K.expr.filters && (K.expr.filters.animated = function(e) {
    return K.grep(K.timers,
      function(t) {
        return e === t.elem
      }).length
  });
  var tr = /^(?:body|html)$/i;
  K.fn.offset = function(e) {
    if (arguments.length) return e === t ? this: this.each(function(t) {
      K.offset.setOffset(this, e, t)
    });
    var n,
      r,
      i,
      o,
      a,
      s,
      l,
      u = {
        top: 0,
        left: 0
      },
      c = this[0],
      f = c && c.ownerDocument;
    if (f) return (r = f.body) === c ? K.offset.bodyOffset(c) : (n = f.documentElement, K.contains(n, c) ? ("undefined" != typeof c.getBoundingClientRect && (u = c.getBoundingClientRect()), i = B(f), o = n.clientTop || r.clientTop || 0, a = n.clientLeft || r.clientLeft || 0, s = i.pageYOffset || n.scrollTop, l = i.pageXOffset || n.scrollLeft, {
      top: u.top + s - o,
      left: u.left + l - a
    }) : u)
  },
    K.offset = {
      bodyOffset: function(e) {
        var t = e.offsetTop,
          n = e.offsetLeft;
        return K.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(K.css(e, "marginTop")) || 0, n += parseFloat(K.css(e, "marginLeft")) || 0),
        {
          top: t,
          left: n
        }
      },
      setOffset: function(e, t, n) {
        var r = K.css(e, "position");
        "static" === r && (e.style.position = "relative");
        var i,
          o,
          a = K(e),
          s = a.offset(),
          l = K.css(e, "top"),
          u = K.css(e, "left"),
          c = ("absolute" === r || "fixed" === r) && K.inArray("auto", [l, u]) > -1,
          f = {},
          p = {};
        c ? (p = a.position(), i = p.top, o = p.left) : (i = parseFloat(l) || 0, o = parseFloat(u) || 0),
          K.isFunction(t) && (t = t.call(e, n, s)),
          null != t.top && (f.top = t.top - s.top + i),
          null != t.left && (f.left = t.left - s.left + o),
            "using" in t ? t.using.call(e, f) : a.css(f)
      }
    },
    K.fn.extend({
      position: function() {
        if (this[0]) {
          var e = this[0],
            t = this.offsetParent(),
            n = this.offset(),
            r = tr.test(t[0].nodeName) ? {
              top: 0,
              left: 0
            }: t.offset();
          return n.top -= parseFloat(K.css(e, "marginTop")) || 0,
            n.left -= parseFloat(K.css(e, "marginLeft")) || 0,
            r.top += parseFloat(K.css(t[0], "borderTopWidth")) || 0,
            r.left += parseFloat(K.css(t[0], "borderLeftWidth")) || 0,
          {
            top: n.top - r.top,
            left: n.left - r.left
          }
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (var e = this.offsetParent || R.body; e && !tr.test(e.nodeName) && "static" === K.css(e, "position");) e = e.offsetParent;
          return e || R.body
        })
      }
    }),
    K.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
      },
      function(e, n) {
        var r = /Y/.test(n);
        K.fn[e] = function(i) {
          return K.access(this,
            function(e, i, o) {
              var a = B(e);
              return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : void(a ? a.scrollTo(r ? K(a).scrollLeft() : o, r ? o: K(a).scrollTop()) : e[i] = o)
            },
            e, i, arguments.length, null)
        }
      }),
    K.each({
        Height: "height",
        Width: "width"
      },
      function(e, n) {
        K.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
          },
          function(r, i) {
            K.fn[i] = function(i, o) {
              var a = arguments.length && (r || "boolean" != typeof i),
                s = r || (i === !0 || o === !0 ? "margin": "border");
              return K.access(this,
                function(n, r, i) {
                  var o;
                  return K.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? K.css(n, r, i, s) : K.style(n, r, i, s)
                },
                n, a ? i: t, a, null)
            }
          })
      }),
    e.jQuery = e.$ = K,
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [],
    function() {
      return K
    })
} (window),
  window.lofty && (jQuery.noConflict(), define("gallery/jquery/jqueryLatest",
  function() {
    return jQuery
  }), lofty.config({
  alias: {
    jquery: "gallery/jquery/jqueryLatest"
  }
}));
define("lofty/lang/class",
  function() {
    "use strict";
    function t() {}
    var e = {}.toString,
      n = function(t) {
        return "[object Function]" === e.call(t)
      },
      r = function(t, e) {
        var n,
          r;
        for (r in e) n = e[r],
          void 0 !== n && (t[r] = n);
        return t
      },
      i = function(e, i) {
        i || (i = e, e = null);
        var o = function() {
            var t = this.initialize || this.init;
            n(t) && t.apply(this, arguments)
          },
          s = {};
        return e && (t.prototype = o.superclass = n(e) ? e.prototype: e, s = new t),
          o.prototype = r(s, i),
          o.prototype.constructor = o,
          o
      };
    return i
  }),
  define("lofty/lang/attribute", ["lofty/lang/class"],
    function(t) {
      "use strict";
      function e(t) {
        return "[object String]" === g.call(t)
      }
      function n(t) {
        return null != t && t == t.window
      }
      function r(t) {
        if (!t || "[object Object]" !== g.call(t) || t.nodeType || n(t)) return ! 1;
        try {
          if (t.constructor && !v.call(t, "constructor") && !v.call(t.constructor.prototype, "isPrototypeOf")) return ! 1
        } catch(e) {
          return ! 1
        }
        var r;
        if (h) for (r in t) return v.call(t, r);
        for (r in t);
        return void 0 === r || v.call(t, r)
      }
      function i(t) {
        if (!t || "[object Object]" !== g.call(t)) return ! 1;
        for (var e in t) if (t.hasOwnProperty(e)) return ! 1;
        return ! 0
      }
      function o(t, e) {
        var n,
          i;
        for (n in e) if (e.hasOwnProperty(n)) {
          if (i = e[n], y(i)) i = i.slice();
          else if (r(i)) {
            var s = t[n];
            r(s) || (s = {}),
              i = o(s, i)
          }
          t[n] = i
        }
        return t
      }
      function s(t, e) {
        for (var n = [], r = e.constructor.prototype; r;) r.hasOwnProperty("options") || (r.options = {}),
          i(r.options) || n.unshift(r.options),
          r = r.constructor.superclass;
        for (var s = 0, a = n.length; a > s; s++) o(t, u(n[s]))
      }
      function a(t, e) {
        o(t, u(e, !0))
      }
      function l(t, e, n) {
        var r = {
          silent: !0
        };
        t.__initializingAttrs = !0;
        for (var i in n) n.hasOwnProperty(i) && e[i].setter && t.set(i, e[i].value, r);
        delete t.__initializingAttrs
      }
      function u(t, e) {
        var n = {};
        for (var i in t) {
          var o = t[i];
          n[i] = !e && r(o) && c(o, m) ? o: {
            value: o
          }
        }
        return n
      }
      function c(t, e) {
        for (var n = 0, r = e.length; r > n; n++) if (t.hasOwnProperty(e[n])) return ! 0;
        return ! 1
      }
      function f(t) {
        return null == t || (e(t) || y(t)) && 0 === t.length || i(t)
      }
      function p(t, e) {
        if (t === e) return ! 0;
        if (f(t) && f(e)) return ! 0;
        var n = g.call(t);
        if (n != g.call(e)) return ! 1;
        switch (n) {
          case "[object String]":
            return t == String(e);
          case "[object Number]":
            return t != +t ? e != +e: 0 == t ? 1 / t == 1 / e: t == +e;
          case "[object Date]":
          case "[object Boolean]":
            return + t == +e;
          case "[object RegExp]":
            return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase;
          case "[object Array]":
            var i = t.toString(),
              o = e.toString();
            return - 1 === i.indexOf("[object") && -1 === o.indexOf("[object") && i === o
        }
        if ("object" != typeof t || "object" != typeof e) return ! 1;
        if (r(t) && r(e)) {
          if (!p(b(t), b(e))) return ! 1;
          for (var s in t) if (t[s] !== e[s]) return ! 1;
          return ! 0
        }
        return ! 1
      }
      var h,
        d = t({
          initOptions: function(t) {
            var e = this.options = {};
            s(e, this),
              t && a(e, t),
              l(this, e, t)
          },
          get: function(t) {
            var e = this.options[t] || {},
              n = e.value;
            return e.getter ? e.getter.call(this, n, t) : n
          },
          set: function(t, n, i) {
            var s = {};
            e(t) ? s[t] = n: (s = t, i = n),
              i || (i = {});
            var a = i.silent,
              l = i.override,
              u = this.options,
              c = this.__changedAttrs || (this.__changedAttrs = {});
            for (t in s) if (s.hasOwnProperty(t)) {
              var f = u[t] || (u[t] = {});
              if (n = s[t], f.readOnly) throw new Error("This attribute is readOnly: " + t);
              f.setter && (n = f.setter.call(this, n, t));
              var h = this.get(t); ! l && r(h) && r(n) && (n = o(o({},
                h), n)),
                u[t].value = n,
                this.__initializingAttrs || p(h, n) || (a ? c[t] = [n, h] : this.trigger(t + "Changed", n, h, t))
            }
            return this
          },
          change: function() {
            var t = this.__changedAttrs;
            if (t) {
              for (var e in t) if (t.hasOwnProperty(e)) {
                var n = t[e];
                this.trigger(e + "Changed", n[0], n[1], e)
              }
              delete this.__changedAttrs
            }
            return this
          }
        }),
        g = Object.prototype.toString,
        v = Object.prototype.hasOwnProperty; !
        function() {
          function t() {
            this.x = 1
          }
          var e = [];
          t.prototype = {
            valueOf: 1,
            y: 1
          };
          for (var n in new t) e.push(n);
          h = "x" !== e[0]
        } ();
      var y = Array.isArray ||
          function(t) {
            return "[object Array]" === g.call(t)
          },
        b = Object.keys;
      b || (b = function(t) {
        var e = [];
        for (var n in t) t.hasOwnProperty(n) && e.push(n);
        return e
      });
      var m = ["value", "getter", "setter", "readOnly"];
      return d
    }),
  define("lofty/lang/observer",
    function() {
      "use strict";
      var t = {}.toString,
        e = function(e) {
          return "[object Function]" === t.call(e)
        },
        n = Array.isArray ||
          function(e) {
            return "[object Array]" === t.call(e)
          },
        r = function(t) {
          return "string" == typeof t
        },
        i = Array.prototype.slice,
        o = function(t, e) {
          var r;
          if (n(t)) for (; r = t.shift();) e(r);
          else e(t)
        },
        s = function(t, e, n, i) {
          if (r(e)) {
            var o = t[e] || (t[e] = []);
            o.push({
              listener: n,
              context: i
            })
          }
        },
        a = function(t, e, n, i) {
          var o,
            s;
          if (r(e) && (o = t[e])) if (n || i) for (var a = 0; a < o.length;) s = o[a],
              n && s.listener === n || i && s.context === i ? o.splice(a, 1) : a++;
          else delete t[e]
        },
        l = function(t, e, n) {
          var i,
            o;
          if (r(e) && (i = t[e])) for (var s = 0, a = i.length; a > s; s++) o = i[s],
            o.listener.apply(o.context || this._observer_context || this, n)
        },
        u = function(t) {
          this._observer_context = t
        };
      u.prototype = {
        attach: function(t, n, r) {
          var i;
          return e(n) ? (i = this._observer_group || (this._observer_group = {}), o(t,
            function(t) {
              s(i, t, n, r)
            }), this) : this
        },
        detach: function(t, e, n) {
          var r;
          return (r = this._observer_group) ? t ? (o(t,
            function(t) {
              a(r, t, e, n)
            }), this) : (delete this._observer_group, this) : this
        },
        notify: function(t) {
          var e,
            n,
            r;
          return (e = this._observer_group) ? (n = i.call(arguments, 1), r = this, o(t,
            function(t) {
              l.call(r, e, t, n)
            }), this) : this
        }
      },
        u.prototype.on = u.prototype.attach,
        u.prototype.off = u.prototype.detach,
        u.prototype.trigger = u.prototype.notify;
      var c = new u(window);
      return c.create = function(t) {
        return new u(t)
      },
        c.mixTo = function(t) {
          t = t || {};
          var e = u.prototype;
          for (var n in e) t[n] = e[n];
          return t
        },
        c
    }),
  define("lofty/lang/pluginhost", ["lofty/lang/class"],
    function(t) {
      "use strict";
      var e = t({
          install: function(t, e) {
            var n,
              o,
              s;
            if (this._plugins || (this._plugins = {}), i(t)) for (n = 0, o = t.length; o > n; n++) this.install(t[n]);
            else t && !r(t) && (e = t.cfg, t = t.plg),
              t && t.Name && (s = t.Name, e = e || {},
              e.host = this, this.hasPlugin(s) ? this[s].set && this[s].set(e) : (this[s] = new t(e), this._plugins[s] = t));
            return this
          },
          uninstall: function(t) {
            if (!this._plugins) return this;
            var e = t,
              n = this._plugins;
            if (t) r(t) && (e = t.Name, !e || n[e] && n[e] === t || (e = null)),
              e && (this[e] && (this[e].destroy && this[e].destroy(), delete this[e]), n[e] && delete n[e]);
            else for (e in this._plugins) this._plugins.hasOwnProperty(e) && this.uninstall(e);
            return this
          },
          hasPlugin: function(t) {
            return this._plugins ? this._plugins[t] && this[t] : !1
          }
        }),
        n = {}.toString,
        r = function(t) {
          return "[object Function]" === n.call(t)
        },
        i = Array.isArray ||
          function(t) {
            return "[object Array]" === n.call(t)
          };
      return e
    }),
  define("lofty/lang/base", ["lofty/lang/class", "lofty/lang/attribute", "lofty/lang/observer", "lofty/lang/pluginhost"],
    function(t, e, n, r) {
      "use strict";
      var i = function(t, e) {
          var n,
            r;
          e = e.prototype || e;
          for (r in e) n = e[r],
            void 0 !== n && (t[r] = n)
        },
        o = t({
          init: function(t) {
            this.initOptions(t),
              t && t.plugins && this.install(t.plugins)
          },
          destroy: function() {
            this.uninstall(),
              this.off();
            for (var t in this) this.hasOwnProperty(t) && delete this[t]
          }
        });
      return i(o.prototype, e),
        i(o.prototype, r),
        n.mixTo(o.prototype),
        o
    }),
  define("fdevlib/js/app/link/1.0/core/seed", ["lofty/lang/class", "lofty/lang/base", "jquery"],
    function(t, e, n) {
      return e.extend = function(e) {
        var r = this;
        n.each(e,
          function(t, e) {
            "function" == typeof e && (e.prototype.func = t, e.prototype.SuperClass = r)
          });
        var i = t(this, e);
        return i.extend = arguments.callee,
          i
      },
        e.extend({
          singleton: !1,
          debug: !1,
          init: function(t) {
            e.prototype.init.call(this),
              this.state = "init",
              this.tags = [],
              this.children = [],
              this.parent = void 0,
              this.init_param = t
          },
          _super: function(t, e, n) {
            var r,
              i,
              o;
            2 == arguments.length ? (r = {},
              i = t, o = e) : 1 == arguments.length ? (r = {},
              i = void 0, o = t) : (r = t, i = e, o = n);
            var s = o.callee.prototype.func;
            return i ? o.callee.prototype.SuperClass.prototype[s].call(i, r) : o.callee.prototype.SuperClass.prototype[s](r)
          },
          boot: function() {
            this.state = "live",
              this._id || console.error("\ufffd\u01f7\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\u02b9\ufffd\ufffdLink.create\ufffd\ufffd\ufffd\ufffd")
          },
          reload: function() {
            Link.create(this.getClass(), this.init_param),
              Link.destroy(this)
          },
          newTag: function(t) { - 1 == n.inArray(t, this.tags) && this.tags.push(t)
          },
          hasTag: function(t) {
            return - 1 == n.inArray(t, this.tags) ? !1: !0
          },
          breakLink: function(t) {
            var e = this;
            n.each(this.children,
              function(n, r) {
                r == t && (e.children.splice(n, 1), r.parent = void 0)
              }),
              this.parent == t && (this.parent = void 0, t.breakLink(this))
          },
          getOpt: function(t, e, n) {
            return t || (t = {}),
                n === !0 ? void 0 === t[e] ? !0: t[e] : "function" != typeof n ? t[e] || n: t[e] ? t[e] : void n()
          },
          getClass: function() {
            return this.constructor
          },
          destroy: function() {
            this.state = "die",
              e.prototype.destroy.call(this)
          }
        })
    }),
  !
    function() {
      function t(t) {
        return t.replace(m, "").replace(w, ",").replace(j, "").replace(x, "").replace(k, "").split($)
      }
      function e(t) {
        return "'" + t.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
      }
      function n(n, r) {
        function i(t) {
          return p += t.split(/\n/).length - 1,
            c && (t = t.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
            t && (t = b[1] + e(t) + b[2] + "\n"),
            t
        }
        function o(e) {
          var n = p;
          if (u ? e = u(e, r) : s && (e = e.replace(/\n/g,
            function() {
              return p++,
                "$line=" + p + ";"
            })), 0 === e.indexOf("=")) {
            var i = f && !/^=[=#]/.test(e);
            if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), i) {
              var o = e.replace(/\s*\([^\)]+\)/, "");
              h[o] || /^(include|print)$/.test(o) || (e = "$escape(" + e + ")")
            } else e = "$string(" + e + ")";
            e = b[1] + e + b[2]
          }
          return s && (e = "$line=" + n + ";" + e),
            y(t(e),
              function(t) {
                if (t && !g[t]) {
                  var e;
                  e = "print" === t ? w: "include" === t ? j: h[t] ? "$utils." + t: d[t] ? "$helpers." + t: "$data." + t,
                    x += t + "=" + e + ",",
                    g[t] = !0
                }
              }),
            e + "\n"
        }
        var s = r.debug,
          a = r.openTag,
          l = r.closeTag,
          u = r.parser,
          c = r.compress,
          f = r.escape,
          p = 1,
          g = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
          },
          v = "".trim,
          b = v ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
          m = v ? "$out+=text;return $out;": "$out.push(text);",
          w = "function(){var text=''.concat.apply('',arguments);" + m + "}",
          j = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + m + "}",
          x = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (s ? "$line=0,": ""),
          k = b[0],
          $ = "return new String(" + b[3] + ");";
        y(n.split(a),
          function(t) {
            t = t.split(l);
            var e = t[0],
              n = t[1];
            1 === t.length ? k += i(e) : (k += o(e), n && (k += i(n)))
          });
        var _ = x + k + $;
        s && (_ = "try{" + _ + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + e(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
          var O = new Function("$data", "$filename", _);
          return O.prototype = h,
            O
        } catch(S) {
          throw S.temp = "function anonymous($data,$filename) {" + _ + "}",
            S
        }
      }
      var r = function(t, e) {
        return "string" == typeof e ? v(e, {
          filename: t
        }) : s(t, e)
      };
      r.version = "3.0.0",
        r.config = function(t, e) {
          i[t] = e
        };
      var i = r.defaults = {
          openTag: "<%",
          closeTag: "%>",
          escape: !0,
          cache: !0,
          compress: !1,
          parser: null
        },
        o = r.cache = {};
      r.render = function(t, e) {
        return v(t, e)
      };
      var s = r.renderFile = function(t, e) {
        var n = r.get(t) || g({
          filename: t,
          name: "Render Error",
          message: "Template not found"
        });
        return e ? n(e) : n
      };
      r.get = function(t) {
        var e;
        if (o[t]) e = o[t];
        else if ("object" == typeof document) {
          var n = document.getElementById(t);
          if (n) {
            var r = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
            e = v(r, {
              filename: t
            })
          }
        }
        return e
      };
      var a = function(t, e) {
          return "string" != typeof t && (e = typeof t, "number" === e ? t += "": t = "function" === e ? a(t.call(t)) : ""),
            t
        },
        l = {
          "<": "&#60;",
          ">": "&#62;",
          '"': "&#34;",
          "'": "&#39;",
          "&": "&#38;"
        },
        u = function(t) {
          return l[t]
        },
        c = function(t) {
          return a(t).replace(/&(?![\w#]+;)|[<>"']/g, u)
        },
        f = Array.isArray ||
          function(t) {
            return "[object Array]" === {}.toString.call(t)
          },
        p = function(t, e) {
          var n,
            r;
          if (f(t)) for (n = 0, r = t.length; r > n; n++) e.call(t, t[n], n, t);
          else for (n in t) e.call(t, t[n], n)
        },
        h = r.utils = {
          $helpers: {},
          $include: s,
          $string: a,
          $escape: c,
          $each: p
        };
      r.helper = function(t, e) {
        d[t] = e
      };
      var d = r.helpers = h.$helpers;
      r.onerror = function(t) {
        var e = "Template Error\n\n";
        for (var n in t) e += "<" + n + ">\n" + t[n] + "\n\n";
        "object" == typeof console && console.error(e)
      };
      var g = function(t) {
          return r.onerror(t),
            function() {
              return "{Template Error}"
            }
        },
        v = r.compile = function(t, e) {
          function r(n) {
            try {
              return new l(n, a) + ""
            } catch(r) {
              return e.debug ? g(r)() : (e.debug = !0, v(t, e)(n))
            }
          }
          e = e || {};
          for (var s in i) void 0 === e[s] && (e[s] = i[s]);
          var a = e.filename;
          try {
            var l = n(t, e)
          } catch(u) {
            return u.filename = a || "anonymous",
              u.name = "Syntax Error",
              g(u)
          }
          return r.prototype = l.prototype,
            r.toString = function() {
              return l.toString()
            },
            a && e.cache && (o[a] = r),
            r
        },
        y = h.$each,
        b = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        m = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        w = /[^\w$]+/g,
        j = new RegExp(["\\b" + b.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        x = /^\d[^,]*|,\d[^,]*/g,
        k = /^,+|,+$/g,
        $ = /^$|,+/;
      i.openTag = "{{",
        i.closeTag = "}}";
      var _ = function(t, e) {
        var n = e.split(":"),
          r = n.shift(),
          i = n.join(":") || "";
        return i && (i = ", " + i),
          "$helpers." + r + "(" + t + i + ")"
      };
      i.parser = function(t) {
        t = t.replace(/^\s/, "");
        var e = t.split(" "),
          n = e.shift(),
          i = e.join(" ");
        switch (n) {
          case "if":
            t = "if(" + i + "){";
            break;
          case "else":
            e = "if" === e.shift() ? " if(" + e.join(" ") + ")": "",
              t = "}else" + e + "{";
            break;
          case "/if":
            t = "}";
            break;
          case "each":
            var o = e[0] || "$data",
              s = e[1] || "as",
              a = e[2] || "$value",
              l = e[3] || "$index",
              u = a + "," + l;
            "as" !== s && (o = "[]"),
              t = "$each(" + o + ",function(" + u + "){";
            break;
          case "/each":
            t = "});";
            break;
          case "echo":
            t = "print(" + i + ");";
            break;
          case "print":
          case "include":
            t = n + "(" + e.join(",") + ");";
            break;
          case "!":
            t = i;
            break;
          default:
            if (/^\s*\|\s*[\w\$]/.test(i)) {
              var c = !0;
              0 === t.indexOf("#") && (t = t.substr(1), c = !1);
              for (var f = 0, p = t.split("|"), h = p.length, d = p[f++]; h > f; f++) d = _(d, p[f]);
              t = (c ? "=": "=#") + d
            } else t = r.helpers[n] ? "=#" + n + "(" + e.join(",") + ");": "=" + t
        }
        return t
      },
          "function" == typeof define ? define("lofty/util/template/2.0/template", ["require", "exports", "module"],
        function(t, e, n) {
          n.exports = r
        }) : "undefined" != typeof exports ? module.exports = r: this.template = r
    } (),
  define("fdevlib/js/app/link/1.0/core/view", ["lofty/lang/class", "fdevlib/js/app/link/1.0/core/seed", "util/template/2.0", "jquery"],
    function(t, e, n, r) {
      return e.extend({
        event: {},
        tplHelper: {},
        init: function(t) {
          return this._super(t, this, arguments),
            t || (t = {}),
            t.container ? (this.container = "object" == typeof t.container ? this.getOpt(t, "container") : r(this.getOpt(t, "container")), this._el = r('<span class="view"></span>'), this.container.append(this._el), void this.newTag("view")) : (console.error("miss argument container"), !1)
        },
        boot: function() {
          var t = this;
          this._super(this, arguments),
            r.each(this.event,
              function(e, n) {
                var i,
                  o = e.match(/\w+(?=:)/)[0],
                  s = e.match(/:.*/)[0],
                  a = s.substring(1, s.length);
                i = "string" == typeof n ? r.proxy(t[n], t) : r.proxy(n, t);
                var l = function(t) {
                  i(t, this)
                };
                "" == a ? t.el().on(o + "." + t._id, l) : "window" == a ? r(window).on(o + "." + t._id, l) : "document" == a ? r(document).on(o + "." + t._id, l) : t.el().on(o + "." + t._id, a, l)
              })
        },
        el: function() {
          return this._el ? this._el: r()
        },
        compile: function(t) {
          return t || (t = {}),
            r.each(Link.tplHelper,
              function(t, e) {
                n.helper(t, e)
              }),
            r.each(this.tplHelper,
              function(t, e) {
                n.helper(t, e)
              }),
            n.compile(t.tpl || "")(t.data || {})
        },
        render: function(t) {
          t || (t = {});
          var e = this.compile({
            tpl: t.tpl,
            data: t.data
          });
          this.el().html(e)
        },
        renderAsync: function(t) {
          var e = this,
            n = r.Deferred();
          return t || (t = {}),
            Link.timer.addEvent(function() {
                var r = e.compile({
                  tpl: t.tpl,
                  data: t.data
                });
                e.el().html(r),
                  n.resolve()
              },
              {
                duration: 300
              }),
            n
        },
        appendTo: function() {},
        destroy: function() {
          var t = this;
          r.each(this.event,
            function(e) {
              var n = e.match(/\w+(?=:)/)[0],
                i = e.match(/:.*/)[0],
                o = i.substring(1, i.length);
              "" == o ? t.el().off(n + "." + t._id) : "window" == o ? r(window).off(n + "." + t._id) : "document" == o ? r(document).off(n + "." + t._id) : t.el().off(n + "." + t._id)
            }),
            this.el().remove(),
            e.prototype.destroy.call(this)
        }
      })
    }),
  define("lofty/util/json/1.0/json", ["jquery"],
    function($) {
      "use strict";
      function f(t) {
        return 10 > t ? "0" + t: t
      }
      function quote(t) {
        return escapable.lastIndex = 0,
          escapable.test(t) ? '"' + t.replace(escapable,
            function(t) {
              var e = meta[t];
              return "string" == typeof e ? e: "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
            }) + '"': '"' + t + '"'
      }
      function str(t, e) {
        var n,
          r,
          i,
          o,
          s,
          a = gap,
          l = e[t];
        switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(t)), "function" == typeof rep && (l = rep.call(e, t, l)), typeof l) {
          case "string":
            return quote(l);
          case "number":
            return isFinite(l) ? String(l) : "null";
          case "boolean":
          case "null":
            return String(l);
          case "object":
            if (!l) return "null";
            if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(l)) {
              for (o = l.length, n = 0; o > n; n += 1) s[n] = str(n, l) || "null";
              return i = 0 === s.length ? "[]": gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]": "[" + s.join(",") + "]",
                gap = a,
                i
            }
            if (rep && "object" == typeof rep) for (o = rep.length, n = 0; o > n; n += 1) r = rep[n],
              "string" == typeof r && (i = str(r, l), i && s.push(quote(r) + (gap ? ": ": ":") + i));
            else for (r in l) Object.hasOwnProperty.call(l, r) && (i = str(r, l), i && s.push(quote(r) + (gap ? ": ": ":") + i));
            return i = 0 === s.length ? "{}": gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}": "{" + s.join(",") + "}",
              gap = a,
              i
        }
      }
      window.JSON || (window.JSON = {});
      var JSON = window.JSON;
      "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
      },
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
          return this.valueOf()
        });
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
          "\b": "\\b",
          "	": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\"
        },
        rep;
      return "function" != typeof JSON.stringify && (JSON.stringify = function(t, e, n) {
        var r;
        if (gap = "", indent = "", "number" == typeof n) for (r = 0; n > r; r += 1) indent += " ";
        else "string" == typeof n && (indent = n);
        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
        return str("", {
          "": t
        })
      }),
        "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(t, e) {
          var n,
            r,
            i = t[e];
          if (i && "object" == typeof i) for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), void 0 !== r ? i[n] = r: delete i[n]);
          return reviver.call(t, e, i)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
          function(t) {
            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
          })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
            "function" == typeof reviver ? walk({
            "": j
          },
          "") : j;
        throw new SyntaxError("JSON.parse")
      }),
        JSON
    }),
  define("fdevlib/js/app/link/1.0/core/model", ["lofty/lang/class", "fdevlib/js/app/link/1.0/core/seed", "lofty/util/json/1.0/json", "jquery"],
    function(t, e, n, r) {
      return e.extend({
        data: {},
        init: function(t) {
          e.prototype.init.call(this, t),
            t || (t = {}),
            this.newTag("model")
        },
        boot: function() {
          e.prototype.boot.call(this)
        },
        map: function(t, e) {
          var n = function(t) {
            for (var r in t) null != t[r] && (t[r].constructor == Array || t[r].constructor == Object) && n(t[r]),
              e.call(this, r, t)
          };
          n(t)
        },
        toJSON: function(t) {
          return n.stringify(t)
        },
        push: function(t) {
          t.key || this.missArg("miss argument key"),
            t.keep || (t.keep = "inf"),
            this.data[t.key] = {
              data: r.extend(!0, {},
                t.data),
              keep: t.keep || "inf"
            }
        },
        pull: function(t) {
          return this.data[t] ? r.extend(!0, {},
            this.data[t].data) : void 0
        }
      })
    }),
  define("fdevlib/js/app/link/1.0/core/util", ["lofty/lang/class", "fdevlib/js/app/link/1.0/core/seed", "jquery"],
    function(t, e) {
      return e.extend({
        singleton: !0,
        init: function() {
          e.prototype.init.call(this)
        },
        boot: function() {},
        destroy: function() {
          e.prototype.destroy.call(this)
        }
      })
    }),
  define("fdevlib/js/app/link/1.0/core/factory", ["lofty/lang/class", "fdevlib/js/app/link/1.0/core/seed", "jquery"],
    function(t, e, n) {
      var r = new(e.extend({
        init: function() {
          this.objectList = {},
            this.idIndex = 0
        },
        create: function() {
          var t = this;
          arguments.length > 2 && console.log("not support mulit param now");
          var e,
            r = arguments[0],
            i = arguments[1] || {},
            o = function() {
              e = new r(i),
                e._id = t.idBuild(),
                t.objectList["link_obj_" + e._id] = e,
                i.context && (e.parent = i.context, i.context.children.push(e)),
                e.boot()
            };
          if (r.prototype.singleton) {
            var s;
            n.each(this.objectList,
              function(t, e) {
                e instanceof r && (s = e)
              }),
              s ? e = s: (i.context = void 0, o())
          } else o();
          return e
        },
        idBuild: function() {
          return this.idIndex++,
            this.idIndex
        },
        destroy: function(t) {
          if (t.singleton) return ! 1;
          if (t.children.length > 0) if (1 == Link.configs.dev) console.error("please destroy subObject first");
          else for (; t.children.length > 0;) Link.destroy(t.children[t.children.length - 1]);
          t.parent && (t.parent.breakLink(t), t.parent = void 0),
            delete this.objectList["link_obj_" + t._id],
            t.destroy()
        }
      }));
      return r
    }),
  define("fdevlib/js/app/link/1.0/core/router", ["lofty/lang/class", "fdevlib/js/app/link/1.0/core/seed", "jquery"],
    function(t, e, n) {
      var r = e.extend({
        singleton: !0,
        routers: {},
        init: function(t) {
          var r = this;
          if (t || (t = {}), e.prototype.init.call(this, t), n(window).bind("hashchange",
            function() {
              r.navigate()
            }), n.browser.msie && "7.0" == n.browser.version) {
            var i = r.urlResolve().hash;
            setInterval(function() {
                var t = r.urlResolve().hash;
                t != i && (r.navigate(), i = t)
              },
              500)
          }
        },
        urlResolve: function(t) {
          t || (t = document.location.href);
          var e = t.match(/^.[^#|?]*/);
          e && (e = e[0]);
          var r = t.match(/#.*$/);
          r && (r = r[0]);
          var i = {
              path: e || "",
              hash: r || ""
            },
            o = t.match(/(^.[^#]*)/)[0],
            s = o.match(/\?.[^#]*/);
          if (null == s) i.param = {};
          else {
            var a = s[0].substring(1, s[0].length).split("&"),
              l = {};
            n.each(a,
              function() {
                var t = this.split("=");
                l[t[0]] = t[1] || ""
              }),
              i.param = l
          }
          i.fullPath = o;
          var u = /http(|s):\/\/([^\/]+)/i;
          return i.domain = e.match(u).length > 0 ? e.match(u)[2] : "",
            i
        },
        resolve: function(t) {
          t = t.substring(1, t.length);
          var e = t.split("/"),
            n = {};
          n.param = [],
            n.action = e[0];
          for (var r = 1; r < e.length; r++) n.param.push(e[r]);
          return n
        },
        navigate: function(t) {
          if (t || (t = this.urlResolve().hash), "" == t) e = {
            action: ""
          };
          else var e = this.resolve(t);
          this.routers[e.action] ? this.routers[e.action].apply(this, [e.param]) : this.routers[""] && this.routers[""].apply(this, [])
        },
        bind: function(t, e) {
          this.routers[t] = e
        }
      });
      return new r
    }),
  define("fdevlib/js/app/link/1.0/core/timer", ["lofty/lang/class", "fdevlib/js/app/link/1.0/core/seed", "jquery"],
    function(t, e, n) {
      return e.extend({
        options: {},
        init: function(t) {
          t || (t = {}),
            e.prototype.init.call(this, t),
            this.set({
              delay: t.delay || 30,
              running: !1
            }),
            this.time = 0,
            this.taskList = []
        },
        addEvent: function(t, e) {
          e || (e = {}),
            e.loop || (e.loop = 1),
            e.context || (e.context = window),
            e.duration || (e.duration = 1);
          var n = parseInt(e.duration / this.get("delay"));
          0 == n && (n = 1);
          for (var r in this.taskList) if (this.taskList[r].fn === t) return ! 1;
          this.taskList.push({
            loop: e.loop,
            frame: n,
            context: e.context,
            fn: t
          })
        },
        removeEvent: function(t) {
          for (var e in this.taskList) this.taskList[e].fn === t && this.taskList.splice(e, 1)
        },
        start: function() {
          var t = this;
          return this.get("running") ? !1: (this.set("running", !0), void(this.timer = setInterval(function() {
              t.time++,
                n.each(t.taskList,
                  function() {
                    this.loop > 0 ? t.time % this.frame == 0 && (this.loop--, this.fn.call(this.context, t.time)) : "inf" == this.loop && t.time % this.frame == 0 && this.fn.call(this.context, t.time)
                  });
              for (var e = t.taskList.length; e > 0;) 0 == t.taskList[e - 1].loop && t.taskList.splice(e - 1, 1),
                e--
            },
            this.get("delay"))))
        },
        pause: function() {},
        reset: function() {
          clearInterval(this.timer),
            this.time = 0,
            this.set("running", !1)
        },
        stop: function() {
          clearInterval(this.timer),
            this.set("running", !1),
            this.time = 0
        },
        destroy: function() {
          this.stop(),
            e.prototype.destroy.call(this)
        }
      })
    }),
  define("fdevlib/js/app/link/1.0/link", ["fdevlib/js/app/link/1.0/core/seed", "fdevlib/js/app/link/1.0/core/view", "fdevlib/js/app/link/1.0/core/model", "fdevlib/js/app/link/1.0/core/util", "fdevlib/js/app/link/1.0/core/factory", "fdevlib/js/app/link/1.0/core/router", "fdevlib/js/app/link/1.0/core/timer", "jquery"],
    function(t, e, n, r, i, o, s, a) {
      return window.Link ? window.Link: (window.Link = new(t.extend({
        singleton: !0,
        init: function() {
          t.prototype.init.call(this),
            this.VERSION = "1.0.0",
            window.console || (window.console = {
            log: function() {},
            error: function() {},
            info: function() {}
          }),
            this.router = o,
            this.factory = i,
            this.timer = new s({
              delay: 30
            }),
            this.timer.start(),
            this.config()
        },
        config: function(t) {
          this.configs || (this.configs = {}),
            this.configs.dev = this.getOpt(t, "dev", !1)
        },
        create: function(t, e, n) {
          n && (e.context = n);
          var r = i.create(t, e);
          return r
        },
        extend: function(t, e) {
          return t || console.error("Class is undefined"),
            t.extend(e)
        },
        Seed: t,
        View: e,
        Model: n,
        Util: r,
        tplHelper: {},
        find: function(t) {
          var e = [];
          return a.each(i.objectList,
            function(n, r) {
              r.hasTag(t) && e.push(r)
            }),
            e
        },
        destroy: function(t) {
          i.destroy(t)
        }
      })), window.Link)
    }),
  define(["fdevlib/js/app/link/1.0/link"],
    function() {});
define("lofty/lang/class",
  function() {
    "use strict";
    function t() {}
    var n = {}.toString,
      r = function(t) {
        return "[object Function]" === n.call(t)
      },
      o = function(t, n) {
        var r,
          o;
        for (o in n) r = n[o],
          void 0 !== r && (t[o] = r);
        return t
      },
      i = function(n, i) {
        i || (i = n, n = null);
        var e = function() {
            var t = this.initialize || this.init;
            r(t) && t.apply(this, arguments)
          },
          u = {};
        return n && (t.prototype = e.superclass = r(n) ? n.prototype: n, u = new t),
          e.prototype = o(u, i),
          e.prototype.constructor = e,
          e
      };
    return i
  });
define("lofty/lang/attribute", ["lofty/lang/class"],
  function(t) {
    "use strict";
    function r(t) {
      return "[object String]" === p.call(t)
    }
    function n(t) {
      return null != t && t == t.window
    }
    function e(t) {
      if (!t || "[object Object]" !== p.call(t) || t.nodeType || n(t)) return ! 1;
      try {
        if (t.constructor && !y.call(t, "constructor") && !y.call(t.constructor.prototype, "isPrototypeOf")) return ! 1
      } catch(r) {
        return ! 1
      }
      var e;
      if (v) for (e in t) return y.call(t, e);
      for (e in t);
      return void 0 === e || y.call(t, e)
    }
    function i(t) {
      if (!t || "[object Object]" !== p.call(t)) return ! 1;
      for (var r in t) if (t.hasOwnProperty(r)) return ! 1;
      return ! 0
    }
    function o(t, r) {
      var n,
        i;
      for (n in r) if (r.hasOwnProperty(n)) {
        if (i = r[n], b(i)) i = i.slice();
        else if (e(i)) {
          var a = t[n];
          e(a) || (a = {}),
            i = o(a, i)
        }
        t[n] = i
      }
      return t
    }
    function a(t, r) {
      for (var n = [], e = r.constructor.prototype; e;) e.hasOwnProperty("options") || (e.options = {}),
        i(e.options) || n.unshift(e.options),
        e = e.constructor.superclass;
      for (var a = 0, s = n.length; s > a; a++) o(t, u(n[a]))
    }
    function s(t, r) {
      o(t, u(r, !0))
    }
    function c(t, r, n) {
      var e = {
        silent: !0
      };
      t.__initializingAttrs = !0;
      for (var i in n) n.hasOwnProperty(i) && r[i].setter && t.set(i, r[i].value, e);
      delete t.__initializingAttrs
    }
    function u(t, r) {
      var n = {};
      for (var i in t) {
        var o = t[i];
        n[i] = !r && e(o) && f(o, j) ? o: {
          value: o
        }
      }
      return n
    }
    function f(t, r) {
      for (var n = 0, e = r.length; e > n; n++) if (t.hasOwnProperty(r[n])) return ! 0;
      return ! 1
    }
    function l(t) {
      return null == t || (r(t) || b(t)) && 0 === t.length || i(t)
    }
    function h(t, r) {
      if (t === r) return ! 0;
      if (l(t) && l(r)) return ! 0;
      var n = p.call(t);
      if (n != p.call(r)) return ! 1;
      switch (n) {
        case "[object String]":
          return t == String(r);
        case "[object Number]":
          return t != +t ? r != +r: 0 == t ? 1 / t == 1 / r: t == +r;
        case "[object Date]":
        case "[object Boolean]":
          return + t == +r;
        case "[object RegExp]":
          return t.source == r.source && t.global == r.global && t.multiline == r.multiline && t.ignoreCase == r.ignoreCase;
        case "[object Array]":
          var i = t.toString(),
            o = r.toString();
          return - 1 === i.indexOf("[object") && -1 === o.indexOf("[object") && i === o
      }
      if ("object" != typeof t || "object" != typeof r) return ! 1;
      if (e(t) && e(r)) {
        if (!h(O(t), O(r))) return ! 1;
        for (var a in t) if (t[a] !== r[a]) return ! 1;
        return ! 0
      }
      return ! 1
    }
    var v,
      g = t({
        initOptions: function(t) {
          var r = this.options = {};
          a(r, this),
            t && s(r, t),
            c(this, r, t)
        },
        get: function(t) {
          var r = this.options[t] || {},
            n = r.value;
          return r.getter ? r.getter.call(this, n, t) : n
        },
        set: function(t, n, i) {
          var a = {};
          r(t) ? a[t] = n: (a = t, i = n),
            i || (i = {});
          var s = i.silent,
            c = i.override,
            u = this.options,
            f = this.__changedAttrs || (this.__changedAttrs = {});
          for (t in a) if (a.hasOwnProperty(t)) {
            var l = u[t] || (u[t] = {});
            if (n = a[t], l.readOnly) throw new Error("This attribute is readOnly: " + t);
            l.setter && (n = l.setter.call(this, n, t));
            var v = this.get(t); ! c && e(v) && e(n) && (n = o(o({},
              v), n)),
              u[t].value = n,
              this.__initializingAttrs || h(v, n) || (s ? f[t] = [n, v] : this.trigger(t + "Changed", n, v, t))
          }
          return this
        },
        change: function() {
          var t = this.__changedAttrs;
          if (t) {
            for (var r in t) if (t.hasOwnProperty(r)) {
              var n = t[r];
              this.trigger(r + "Changed", n[0], n[1], r)
            }
            delete this.__changedAttrs
          }
          return this
        }
      }),
      p = Object.prototype.toString,
      y = Object.prototype.hasOwnProperty; !
      function() {
        function t() {
          this.x = 1
        }
        var r = [];
        t.prototype = {
          valueOf: 1,
          y: 1
        };
        for (var n in new t) r.push(n);
        v = "x" !== r[0]
      } ();
    var b = Array.isArray ||
        function(t) {
          return "[object Array]" === p.call(t)
        },
      O = Object.keys;
    O || (O = function(t) {
      var r = [];
      for (var n in t) t.hasOwnProperty(n) && r.push(n);
      return r
    });
    var j = ["value", "getter", "setter", "readOnly"];
    return g
  });
define("lofty/lang/observer",
  function() {
    "use strict";
    var t = {}.toString,
      r = function(r) {
        return "[object Function]" === t.call(r)
      },
      e = Array.isArray ||
        function(r) {
          return "[object Array]" === t.call(r)
        },
      o = function(t) {
        return "string" == typeof t
      },
      n = Array.prototype.slice,
      i = function(t, r) {
        var o;
        if (e(t)) for (; o = t.shift();) r(o);
        else r(t)
      },
      s = function(t, r, e, n) {
        if (o(r)) {
          var i = t[r] || (t[r] = []);
          i.push({
            listener: e,
            context: n
          })
        }
      },
      c = function(t, r, e, n) {
        var i,
          s;
        if (o(r) && (i = t[r])) if (e || n) for (var c = 0; c < i.length;) s = i[c],
            e && s.listener === e || n && s.context === n ? i.splice(c, 1) : c++;
        else delete t[r]
      },
      u = function(t, r, e) {
        var n,
          i;
        if (o(r) && (n = t[r])) for (var s = 0, c = n.length; c > s; s++) i = n[s],
          i.listener.apply(i.context || this._observer_context || this, e)
      },
      f = function(t) {
        this._observer_context = t
      };
    f.prototype = {
      attach: function(t, e, o) {
        var n;
        return r(e) ? (n = this._observer_group || (this._observer_group = {}), i(t,
          function(t) {
            s(n, t, e, o)
          }), this) : this
      },
      detach: function(t, r, e) {
        var o;
        return (o = this._observer_group) ? t ? (i(t,
          function(t) {
            c(o, t, r, e)
          }), this) : (delete this._observer_group, this) : this
      },
      notify: function(t) {
        var r,
          e,
          o;
        return (r = this._observer_group) ? (e = n.call(arguments, 1), o = this, i(t,
          function(t) {
            u.call(o, r, t, e)
          }), this) : this
      }
    },
      f.prototype.on = f.prototype.attach,
      f.prototype.off = f.prototype.detach,
      f.prototype.trigger = f.prototype.notify;
    var a = new f(window);
    return a.create = function(t) {
      return new f(t)
    },
      a.mixTo = function(t) {
        t = t || {};
        var r = f.prototype;
        for (var e in r) t[e] = r[e];
        return t
      },
      a
  });
define("lofty/lang/pluginhost", ["lofty/lang/class"],
  function(t) {
    "use strict";
    var i = t({
        install: function(t, i) {
          var s,
            e,
            r;
          if (this._plugins || (this._plugins = {}), l(t)) for (s = 0, e = t.length; e > s; s++) this.install(t[s]);
          else t && !n(t) && (i = t.cfg, t = t.plg),
            t && t.Name && (r = t.Name, i = i || {},
            i.host = this, this.hasPlugin(r) ? this[r].set && this[r].set(i) : (this[r] = new t(i), this._plugins[r] = t));
          return this
        },
        uninstall: function(t) {
          if (!this._plugins) return this;
          var i = t,
            s = this._plugins;
          if (t) n(t) && (i = t.Name, !i || s[i] && s[i] === t || (i = null)),
            i && (this[i] && (this[i].destroy && this[i].destroy(), delete this[i]), s[i] && delete s[i]);
          else for (i in this._plugins) this._plugins.hasOwnProperty(i) && this.uninstall(i);
          return this
        },
        hasPlugin: function(t) {
          return this._plugins ? this._plugins[t] && this[t] : !1
        }
      }),
      s = {}.toString,
      n = function(t) {
        return "[object Function]" === s.call(t)
      },
      l = Array.isArray ||
        function(t) {
          return "[object Array]" === s.call(t)
        };
    return i
  });
define("lofty/lang/base", ["lofty/lang/class", "lofty/lang/attribute", "lofty/lang/observer", "lofty/lang/pluginhost"],
  function(t, i, n, o) {
    "use strict";
    var s = function(t, i) {
        var n,
          o;
        i = i.prototype || i;
        for (o in i) n = i[o],
          void 0 !== n && (t[o] = n)
      },
      l = t({
        init: function(t) {
          this.initOptions(t),
            t && t.plugins && this.install(t.plugins)
        },
        destroy: function() {
          this.uninstall(),
            this.off();
          for (var t in this) this.hasOwnProperty(t) && delete this[t]
        }
      });
    return s(l.prototype, i),
      s(l.prototype, o),
      n.mixTo(l.prototype),
      l
  });
define("work_app/script/core/core", ["lofty/lang/class", "lofty/lang/base", "jquery"],
  function(o, t) {
    return window.WORK = window.$UI = {},
      o(t, {
        init: function(o) {
          var i = this;
          o || (o = {}),
            t.prototype.init.call(this, o),
            setTimeout(function() {
                i.boot(),
                  i.trigger("after_boot")
              },
              0)
        },
        boot: function() {},
        missArg: function(o) {
          if (this.tagName) var t = this.tagName;
          "local" == WorkApplication.config.environment && console.error(o, t)
        },
        cons: function(o, t) {
          if (this.tagName) {
            this.tagName
          }
          "local" == WorkApplication.config.environment && console[t](o)
        }
      })
  });
define("work_app/script/core/mediator",
  function() {
    function s() {
      var s = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      };
      return s() + s() + "-" + s() + "-" + s() + "-" + s() + "-" + s() + s() + s()
    }
    function t(i, r, n) {
      return this instanceof t ? (this.id = s(), this.fn = i, this.options = r, this.context = n, void(this.channel = null)) : new t(i, r, n)
    }
    function i(s, t) {
      return this instanceof i ? (this.namespace = s || "", this._subscribers = [], this._channels = {},
        this._parent = t, void(this.stopped = !1)) : new i(s)
    }
    function r() {
      return this instanceof r ? void(this._channels = new i("")) : new r
    }
    return t.prototype = {
      update: function(s) {
        s && (this.fn = s.fn || this.fn, this.context = s.context || this.context, this.options = s.options || this.options, this.channel && this.options && void 0 !== this.options.priority && this.channel.setPriority(this.id, this.options.priority))
      }
    },
      i.prototype = {
        addSubscriber: function(s, i, r) {
          var n = new t(s, i, r);
          return i && void 0 !== i.priority ? (i.priority = i.priority >> 0, i.priority < 0 && (i.priority = 0), i.priority >= this._subscribers.length && (i.priority = this._subscribers.length - 1), this._subscribers.splice(i.priority, 0, n)) : this._subscribers.push(n),
            n.channel = this,
            n
        },
        stopPropagation: function() {
          this.stopped = !0
        },
        getSubscriber: function(s) {
          var t = 0,
            i = this._subscribers.length;
          for (i; i > t; t++) if (this._subscribers[t].id === s || this._subscribers[t].fn === s) return this._subscribers[t]
        },
        setPriority: function(s, t) {
          var i,
            r,
            n,
            e,
            o = 0,
            h = 0;
          for (h = 0, e = this._subscribers.length; e > h && (this._subscribers[h].id !== s && this._subscribers[h].fn !== s); h++) o++;
          i = this._subscribers[o],
            r = this._subscribers.slice(0, o),
            n = this._subscribers.slice(o + 1),
            this._subscribers = r.concat(n),
            this._subscribers.splice(t, 0, i)
        },
        addChannel: function(s) {
          this._channels[s] = new i((this.namespace ? this.namespace + ":": "") + s, this)
        },
        hasChannel: function(s) {
          return this._channels.hasOwnProperty(s)
        },
        returnChannel: function(s) {
          return this._channels[s]
        },
        removeSubscriber: function(s) {
          var t = this._subscribers.length - 1;
          if (!s) return void(this._subscribers = []);
          for (t; t >= 0; t--)(this._subscribers[t].fn === s || this._subscribers[t].id === s) && (this._subscribers[t].channel = null, this._subscribers.splice(t, 1))
        },
        publish: function(s) {
          var t,
            i,
            r,
            n = 0,
            e = this._subscribers.length,
            o = !1;
          for (e; e > n; n++) o = !1,
            t = this._subscribers[n],
            this.stopped || (i = this._subscribers.length, void 0 !== t.options && "function" == typeof t.options.predicate ? t.options.predicate.apply(t.context, s) && (o = !0) : o = !0),
            o && (t.options && void 0 !== t.options.calls && (t.options.calls--, t.options.calls < 1 && this.removeSubscriber(t.id)), t.fn.apply(t.context, s), r = this._subscribers.length, e = r, r === i - 1 && n--);
          this._parent && this._parent.publish(s),
            this.stopped = !1
        }
      },
      r.prototype = {
        getChannel: function(s, t) {
          var i = this._channels,
            r = s.split(":"),
            n = 0,
            e = r.length;
          if ("" === s) return i;
          if (r.length > 0) for (e; e > n; n++) {
            if (!i.hasChannel(r[n])) {
              if (t) break;
              i.addChannel(r[n])
            }
            i = i.returnChannel(r[n])
          }
          return i
        },
        subscribe: function(s, t, i, r) {
          var n = this.getChannel(s || "", !1);
          return i = i || {},
            r = r || {},
            n.addSubscriber(t, i, r)
        },
        once: function(s, t, i, r) {
          return i = i || {},
            i.calls = 1,
            this.subscribe(s, t, i, r)
        },
        getSubscriber: function(s, t) {
          var i = this.getChannel(t || "", !0);
          return i.namespace !== t ? null: i.getSubscriber(s)
        },
        remove: function(s, t) {
          var i = this.getChannel(s || "", !0);
          return i.namespace !== s ? !1: void i.removeSubscriber(t)
        },
        publish: function(s) {
          var t = this.getChannel(s || "", !0);
          if (t.namespace !== s) return null;
          var i = Array.prototype.slice.call(arguments, 1);
          i.push(t),
            t.publish(i)
        }
      },
      r.prototype.on = r.prototype.subscribe,
      r.prototype.bind = r.prototype.subscribe,
      r.prototype.emit = r.prototype.publish,
      r.prototype.trigger = r.prototype.publish,
      r.prototype.off = r.prototype.remove,
      r.Channel = i,
      r.Subscriber = t,
      r.version = "0.9.8",
      r
  });
define("work_app/script/util/util_string", ["jquery"],
  function() {
    return {
      random: function(n, r, t, e) {
        r || t || e || (r = t = e = !0),
          n || (n = 20);
        var o = [["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]],
          u = [],
          a = "";
        u = r ? u.concat(o[0]) : u,
          u = t ? u.concat(o[1]) : u,
          u = e ? u.concat(o[2]) : u;
        for (var c = 0; n > c; c++) a += u[Math.round(Math.random() * (u.length - 1))];
        return a
      },
      ObjToJson: function(n) {
        switch (typeof n) {
          case "object":
            var r = [];
            if (n instanceof Array) {
              for (var t = 0, e = n.length; e > t; t++) r.push(arguments.callee(n[t]));
              return "[" + r.toString(",") + "]"
            }
            if (n instanceof RegExp) return n.toString();
            for (var o in n) r.push('"' + o + '":' + arguments.callee(n[o]));
            return "{" + r.join(",") + "}";
          case "function":
            return "function(){}";
          case "number":
            return n.toString();
          case "string":
            return '"' + n.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
              function(n) {
                return "\n" == n ? "\\n": "\r" == n ? "\\r": "	" == n ? "\\t": ""
              }) + '"';
          case "boolean":
            return n.toString();
          default:
            return n.toString()
        }
      },
      backboneRoute: function(n) {
        n = n.substring(1, n.length);
        var r = n.split("/"),
          t = {};
        t.param = [],
          t.action = r[0];
        for (var e = 1; e < r.length; e++) t.param.push(r[e]);
        return t
      },
      Len: function(n) {
        return n.replace(/[^\x00-\xff]/g, "--").length
      },
      Cut: function(n, r, t) {
        return this.Len(n) <= r - t.length ? n: (r -= t.length, n.substr(0, r).replace(/([^\x00-\xff])/g, "$1 ").substr(0, r).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + t)
      },
      _oo_ooTooOoO: function(n) {
        return n.replace(/_[a-z]/g,
          function(n) {
            return n.toUpperCase().substr(1, 1)
          })
      },
      oOoOTo_oo_oo: function(n) {
        return n.replace(/[A-Z]/g,
          function(n) {
            return "_" + n.toLowerCase()
          })
      }
    }
  });
define("work_app/script/core/relation", ["lofty/lang/class", "lofty/lang/base"],
  function(t, e) {
    return t(e, {
      init: function(t) {
        e.prototype.init.call(this, t),
          this.set("data", t || {
            id: "0",
            content: "root",
            children: null
          }),
          this._setParents(this.get("data"))
      },
      _setParents: function(t) {
        var e = this;
        t.children && jQuery.each(t.children,
          function() {
            this.parent = t.id,
              e._setParents(this)
          })
      },
      getNode: function(t) {
        t || console.log(this.get("data").id);
        var e,
          n = function(i) {
            jQuery.each(i,
              function() {
                return this.id == t ? (e = this, !1) : void(this.children && n(this.children))
              })
          };
        return n([this.get("data")]),
          e
      },
      getDeep: function(t) {
        for (var e = 0, n = t; null != n;) n = this.getNode(n).parent,
          e++;
        return e
      },
      map: function(t) {
        t || (t = {}),
          t.nodeId || (t.nodeId = "0"),
          t.andSelf || (t.andSelf = "F");
        var e = this;
        return "T" == t.andSelf && t.callback(this.getNode(t.nodeId).content),
          function(n) {
            var i = arguments.callee;
            e.getNode(n).children && jQuery.each(e.getNode(n).children,
              function() {
                t.callback(this.content),
                  i(this.id)
              })
          } (t.nodeId),
          this
      },
      update: function(t, e) {
        var n = this;
        return this.getNode(t).children = e,
          n._setParents(this.get("data")),
          this
      },
      add: function(t, e) {
        var n = this;
        return e.children || (e.children = null),
          this.getNode(t).children || (this.getNode(t).children = []),
          this.getNode(t).children.push(e),
          n._setParents(this.get("data")),
          this
      },
      remove: function(t) {
        var e = this,
          n = this.getNode(t).parent;
        return jQuery.each(this.getNode(n).children,
          function(i) {
            return this.id == t ? (e.getNode(n).children.splice(i, 1), !1) : void 0
          }),
          0 == this.getNode(n).children.length && (this.getNode(n).children = null),
          jQuery.each(this.get("data"),
            function() {
              e._setParents(this)
            }),
          this
      }
    })
  });
define("work_app/script/core/factory", ["lofty/lang/class", "lofty/lang/base", "work_app/script/core/relation", "work_app/script/util/util_string", "jquery"],
  function(t, e, n, o, r) {
    if (window.__factory) return window.__factory;
    var a = function(t) {
        return t.tagName ? t.tagName + "~" + o.random() : t.wId ? t.wId + "~" + o.random() : o.random()
      },
      i = new(t(e, {
        debug: !0,
        init: function() {
          this.model = new n,
            1 == this.debug && (window.Factory = this)
        },
        create: function() {
          arguments.length > 2 && console.log("\u76ee\u524d\u4e0d\u652f\u6301\u591a\u53c2\u6570\u5f62\u5f0f\uff0c");
          var t,
            e = arguments[0],
            n = arguments[1] || {};
          if (e.prototype.singleton) {
            var o;
            this.model.map({
              callback: function(t) {
                t instanceof e && (o = t)
              }
            }),
              o ? t = o: (t = new e(n), t.set("_factoryId", a(t)))
          } else t = new e(n),
            t.set("_factoryId", a(t));
          var r,
            i = n.context;
          return r = i && i.get("_factoryId") ? i.get("_factoryId") : "0",
            this.model.add(r, {
              id: t.get("_factoryId"),
              content: t
            }),
            t
        },
        getRelation: function() {
          return this.model.get("data")
        },
        getDataModel: function() {
          return this.model
        },
        getParent: function(t) {
          return this.model.getNode(this.model.getNode(t).parent).content
        },
        destroy: function(t) {
          var e = this;
          if (t.singleton) return ! 1;
          if (!t.get("_factoryId")) return ! 1;
          var n = [];
          this.model.map({
            nodeId: t.get("_factoryId"),
            callback: function(t) {
              n.push(t)
            },
            andSelf: "T"
          }),
            n.reverse(),
            r.each(n,
              function() {
                if (this.singleton);
                else {
                  try {
                    e.model.remove(this.get("_factoryId"))
                  } catch(t) {}
                  this.destroy()
                }
              })
        }
      }));
    return window.__factory = i,
      i
  });
define("lofty/lang/aop",
  function() {
    "use strict";
    var t = function() {
      this._list = [],
        this.isAttached = !0
    };
    t.prototype = {
      before: function(t, e, n, a) {
        return r(this, t, e,
          function(t) {
            var r = a || t.target,
              e = n.call(r, t);
            if (e) return t.args = i(e) ? e: t.args,
              t.method.apply(t.target, t.args)
          }),
          this
      },
      after: function(t, e, n, i) {
        return r(this, t, e,
          function(t) {
            t.result = t.method.apply(t.target, t.args);
            var r = i || t.target,
              e = n.call(r, t);
            return void 0 === e ? t.result: e
          }),
          this
      },
      detach: function() {
        for (var t = this._list, r = t.length; r--;) {
          var e = t[r];
          e.target[e.name] = e.original
        }
        return this.isAttached = !1,
          this
      }
    };
    var r = function(t, r, n, a) {
        if (r = r || window, "string" == typeof n && (n = [n]), i(n)) for (var o = 0, f = n.length; f > o; o++) e(t, r, n[o], a);
        else if (n.test) for (var s in r) n.test(s) && "function" == typeof r[s] && e(t, r, s, a)
      },
      e = function(t, r, e, n) {
        var i = r[e];
        if ("function" != typeof i) throw new Error("target method not exist: " + e);
        var a = function() {
          var t = [].slice.call(arguments, 0);
          return n({
            target: r,
            name: e,
            args: t,
            method: i
          })
        };
        t._list.push({
          target: r,
          name: e,
          original: i,
          method: a
        }),
          t.isAttached && (r[e] = a)
      },
      n = Object.prototype.toString,
      i = function(t) {
        return "[object Array]" === n.apply(t)
      };
    return function() {
      for (var r = function(r) {
          t[r] = function(t, e, n, i) {
            var a = new this;
            return a[r](t, e, n, i)
          }
        },
             e = ["before", "after"], n = 0, i = e.length; i > n; n++) r(e[n])
    } (),
      t
  });
define("lofty/util/json/1.0/json", ["jquery"],
  function($) {
    "use strict";
    function f(t) {
      return 10 > t ? "0" + t: t
    }
    function quote(t) {
      return escapable.lastIndex = 0,
        escapable.test(t) ? '"' + t.replace(escapable,
          function(t) {
            var e = meta[t];
            return "string" == typeof e ? e: "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
          }) + '"': '"' + t + '"'
    }
    function str(t, e) {
      var n,
        r,
        o,
        f,
        u,
        i = gap,
        a = e[t];
      switch (a && "object" == typeof a && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), typeof a) {
        case "string":
          return quote(a);
        case "number":
          return isFinite(a) ? String(a) : "null";
        case "boolean":
        case "null":
          return String(a);
        case "object":
          if (!a) return "null";
          if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
            for (f = a.length, n = 0; f > n; n += 1) u[n] = str(n, a) || "null";
            return o = 0 === u.length ? "[]": gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]": "[" + u.join(",") + "]",
              gap = i,
              o
          }
          if (rep && "object" == typeof rep) for (f = rep.length, n = 0; f > n; n += 1) r = rep[n],
            "string" == typeof r && (o = str(r, a), o && u.push(quote(r) + (gap ? ": ": ":") + o));
          else for (r in a) Object.hasOwnProperty.call(a, r) && (o = str(r, a), o && u.push(quote(r) + (gap ? ": ": ":") + o));
          return o = 0 === u.length ? "{}": gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}": "{" + u.join(",") + "}",
            gap = i,
            o
      }
    }
    window.JSON || (window.JSON = {});
    var JSON = window.JSON;
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
    },
      String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
      });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      },
      rep;
    return "function" != typeof JSON.stringify && (JSON.stringify = function(t, e, n) {
      var r;
      if (gap = "", indent = "", "number" == typeof n) for (r = 0; n > r; r += 1) indent += " ";
      else "string" == typeof n && (indent = n);
      if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
      return str("", {
        "": t
      })
    }),
      "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
      function walk(t, e) {
        var n,
          r,
          o = t[e];
        if (o && "object" == typeof o) for (n in o) Object.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r: delete o[n]);
        return reviver.call(t, e, o)
      }
      var j;
      if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
        function(t) {
          return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
          "function" == typeof reviver ? walk({
          "": j
        },
        "") : j;
      throw new SyntaxError("JSON.parse")
    }),
      JSON
  });
define("work_app/action/action", ["lofty/lang/class", "work_app/script/core/core", "lofty/util/json/1.0/json"],
  function(t, o, i) {
    "use strict";
    return t(o, {
      options: {
        url: "",
        state: "normal",
        success: function() {},
        fail: function() {},
        always: function() {}
      },
      init: function(t) {
        t || (t = {}),
          o.prototype.init.call(this, t)
      },
      boot: function() {
        o.prototype.boot.call(this)
      },
      ajax: function(t) {
        var o = this,
          a = jQuery.Deferred();
        t || (t = {}),
          t.action || this.missArg("\u7f3a\u5c11\u5e94\u7528\u53c2\u6570action"),
          t.postData || this.missArg("\u7f3a\u5c11postData\u6570\u636e");
        var n = !0;
        if (t.cache) {
          var e = encodeURIComponent(t.action + "|" + i.stringify(t.postData)),
            r = WorkApplication.model.pull(e);
          if (void 0 != r) {
            if (WorkApplication.mediator.publish("actionCacheLoad", {
              context: o,
              action: t
            }), "normal" != o.get("state")) return ! 1;
            o.get("success")(a, r),
              o.get("always")(a),
              n = !1
          }
        }
        return 1 == n && jQuery.ajax({
          url: o.get("url")(t.action),
          data: t.postData,
          type: "get",
          timeout: 5e4,
          dataType: "jsonp",
          beforeSend: function(i, a) {
            t.postUrl = a.url,
              WorkApplication.mediator.publish("actionPost", {
                context: o,
                action: t
              })
          }
        }).done(function(n) {
          if ("normal" != o.get("state")) return ! 1;
          if (n.hasError || null == n.content) WorkApplication.mediator.publish("actionError", {
            context: o,
            action: t
          }),
            o.get("fail")(a, n);
          else if (WorkApplication.mediator.publish("actionSuccess", {
            context: o,
            action: t
          }), o.get("success")(a, n), t.cache) {
            var e = encodeURIComponent(t.action + "|" + i.stringify(t.postData));
            WorkApplication.model.push({
              key: e,
              data: n
            }),
              WorkApplication.mediator.publish("actionCacheSave", {
                context: o,
                action: t
              })
          }
        }).fail(function(i, n) {
          return "normal" != o.get("state") ? !1: (WorkApplication.mediator.publish("actionError", {
            context: o,
            action: t
          }), void o.get("fail")(a, n))
        }).always(function(i, n) {
          return "normal" != o.get("state") ? !1: ("parsererror" == n && (WorkApplication.mediator.publish("actionSessionExpired", {
            context: o,
            action: t
          }), o.get("fail")(a, n)), void o.get("always")(a))
        }),
          a
      },
      destroy: function() {
        this.set("state", "abort"),
          o.prototype.destroy.call(this)
      }
    })
  });
define("work_app/action/action_app", ["lofty/lang/class", "work_app/action/action"],
  function(e, t) {
    return e(t, {
      options: {
        url: function(e) {
          return WorkApplication.config.APP_SERVER + e + ".json"
        },
        success: function(e, t) {
          e.resolve(t.content)
        },
        fail: function(e) {
          e.reject([{
            code: "404",
            msg: "\u8bf7\u6c42\u8d85\u65f6"
          }])
        },
        always: function() {}
      },
      tagName: "actionApp",
      init: function(e) {
        e || (e = {}),
          t.prototype.init.call(this, e)
      },
      getMenu: function(e) {
        var t = jQuery.Deferred(),
          n = {
            appCode: e.appCode || "",
            menuCode: e.menuCode || ""
          };
        return this.ajax({
          action: "getMenu",
          postData: n
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      getCustomApp: function() {
        var e = jQuery.Deferred(),
          t = {};
        return this.ajax({
          action: "getCustomApp",
          postData: t,
          cache: !0
        }).done(function(t) {
          e.resolve(t)
        }).fail(function(t) {
          e.reject(t)
        }),
          e
      },
      getTotalApp: function() {
        var e = jQuery.Deferred(),
          t = {};
        return this.ajax({
          action: "myAppList",
          postData: t
        }).done(function(t) {
          e.resolve(t)
        }).fail(function(t) {
          e.reject(t)
        }),
          e
      },
      getAppInfo: function(e, t) {
        var n = jQuery.Deferred(),
          o = {
            appCode: e || "",
            menuCode: t || ""
          };
        return this.ajax({
          action: "getAppData",
          postData: o
        }).done(function(e) {
          n.resolve(e)
        }).fail(function(e) {
          n.reject(e)
        }),
          n
      },
      updateCustomMenu: function(e) {
        var t = jQuery.Deferred(),
          n = {
            displayCodes: e.displayCodes,
            noDisplayCodes: e.noDisplayCodes,
            appCode: e.appCode
          };
        return this.ajax({
          action: "updateCustomMenu",
          postData: n
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      updateMyAppList: function(e) {
        var t = jQuery.Deferred(),
          n = {
            apps: e
          };
        return this.ajax({
          action: "updateCustomApp",
          postData: n
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      search: function(e) {
        var t = jQuery.Deferred(),
          n = {
            keyword: e
          };
        return this.ajax({
          action: "search",
          postData: n
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      usuallyLink: function(e) {
        var t = jQuery.Deferred();
        e || (e = {});
        var n = {
          limit: e.limit || 10
        };
        return this.ajax({
          action: "getUsualLink",
          postData: n,
          cache: !0
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      recentApp: function(e) {
        e || (e = {});
        var t = jQuery.Deferred(),
          n = {
            limit: e.limit || 10
          };
        return this.ajax({
          action: "getRecentApp",
          postData: n
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      appCatList: function(e) {
        e || (e = {});
        var t = jQuery.Deferred();
        return this.ajax({
          action: "getAppCat",
          postData: {}
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      setLanding: function() {
        _opt || (_opt = {});
        var e = jQuery.Deferred();
        return this.ajax({
          action: "UpdateDefaultChannel",
          postData: {}
        }).done(function(t) {
          e.resolve(t)
        }).fail(function(t) {
          e.reject(t)
        }),
          e
      },
      getUserInfo: function(e) {
        e || (e = {});
        var t = jQuery.Deferred();
        return this.ajax({
          action: "userInfo",
          postData: {}
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      },
      switchVersion: function() {
        _opt || (_opt = {});
        var e = jQuery.Deferred();
        return this.ajax({
          action: "switchVersion",
          postData: {}
        }).done(function(t) {
          e.resolve(t)
        }).fail(function(t) {
          e.reject(t)
        }),
          e
      },
      interfereDubboMenu: function(e) {
        e || (e = {});
        var t = jQuery.Deferred(),
          n = {
            appId: e.appId || "",
            appCode: e.appCode || this.missArg("\u7f3a\u5c11appCode"),
            menuCode: e.menuCode || ""
          };
        return this.ajax({
          action: "interfereDubboMenu",
          postData: n
        }).done(function(e) {
          t.resolve(e)
        }).fail(function(e) {
          t.reject(e)
        }),
          t
      }
    })
  });
define("work_app/script/helper/helper_sub_user", ["work_app/action/action_app", "jquery"],
  function(e) {
    return {
      global_header: {
        "before:afterRender": function(a) {
          var t = WorkApplication.create(e);
          return t.getUserInfo().done(function(e) {
            1 == e.childAccount && (a.target.el().find(".global_header-wrapper-menu-item").hide(), a.target.el().find(".global_header-wrapper-menu-item.app").show(), a.target.el().off("click"), a.target.el().find(".global_header-wrapper-menu-bg").hide())
          }),
            !0
        }
      },
      layout_global: {
        "before:refreshLayout": function(a) {
          var t = WorkApplication.create(e);
          t.getUserInfo().done(function(e) {
            1 == e.childAccount ? -1 != location.hash.indexOf("http") || -1 != location.hash.indexOf("child_account") ? a.method.apply(a.target, a.args) : document.location = "#nav/child_account": a.method.apply(a.target, a.args)
          }).fail(function() {
            a.method.apply(a.target, a.args)
          })
        }
      },
      layout_page: {
        "before:loadNavLayout": function(a) {
          var t = WorkApplication.create(e);
          t.getUserInfo().done(function(e) {
            1 == e.childAccount ? -1 != location.hash.indexOf("http") || -1 != location.hash.indexOf("child_account") ? a.method.apply(a.target, a.args) : document.location = "#nav/child_account": a.method.apply(a.target, a.args)
          }).fail(function() {
            a.method.apply(a.target, a.args)
          })
        }
      }
    }
  });
define("work_app/script/util/util_ali", ["jquery"],
  function(e) {
    return {
      wrapperIframeUrl: function(e) {
        return e || (e = {}),
          e.app_code || (e.app_code = ""),
          e.menu_code || (e.menu_code = ""),
          e.iframe_src || (e.iframe_src = ""),
          WorkApplication.config.APP_PATH + "#app/" + e.app_code + "/" + e.menu_code + "/" + encodeURIComponent(e.iframe_src)
      },
      addBadge: function(t) {
        var a = this;
        t || (t = {}),
          t.tgt || console.error("\u7f3a\u5c11\u76ee\u6807\u53c2\u6570"),
          t.evt || (t.evt = e.noop),
          t.num || (t.num = "");
        var c;
        t.tgt.find(".wk_badge").length > 0 ? (t.tgt.find(".wk_badge").html(t.num), c = t.tgt.find(".wk_badge")) : (c = e('<div class="wk_badge">' + t.num + "</div>"), e(t.tgt).css("position", "relative").append(c)),
          "" == c.html() && c.css({
          width: "4px",
          "min-width": "4px",
          height: "4px",
          overflow: "hidden"
        }),
          c.off().on("click",
            function(e) {
              e.stopImmediatePropagation(),
                e.stopPropagation(),
                e.preventDefault(),
                a.traceLog("work2015_message_passthrough"),
                t.evt(e)
            })
      },
      traceLog: function(e) {
        try {
          dmtrack.clickunite("tracelog=" + e)
        } catch(t) {
          console.log("\u672c\u5730\u73af\u5883\u65e0\u6253\u70b9\u4ee3\u7801\uff0c\u6253\u70b9\u53c2\u6570\u4e3atracelog=" + e)
        }
      },
      irecomTrace: function(t) {
        var a = t.el,
          c = a.find("[data-alg]"),
          o = [];
        c.each(function(t, a) {
          var c = e(a);
          o.push(c.data("object_id")),
            o.push(","),
            o.push(c.data("alg")),
            o.push(";")
        });
        var i = ["http://ctr.1688.com/ctr.html", "?ctr_type=27", "&page_area=", t.recId, "&interface_id=", t.recId, "&page_id=", window.dmtrack_pageid, "&object_type=", t.objectType, "&object_ids=", o.join(""), "&ctr_ns="].join(""); (new Image).src = i,
          c.filter("a.irecom_watch").on("mousedown",
            function() {
              var e = $(this),
                a = ["http://stat.1688.com/bt/1688_click.html", "?page=27", "&recId=", t.recId, "&interface_id=", t.recId, "&st_page_id=", window.dmtrack_pageid, "&objectType=", t.objectType, "&objectId=", e.data("object_id"), "&alg=", e.data("alg"), "&ctr_ns="].join(""); (new Image).src = a
            }),
          c.on("mousedown", "a.irecom_watch",
            function(a) {
              var c = e(a.delegateTarget),
                o = ["http://stat.1688.com/bt/1688_click.html", "?page=27", "&recId=", t.recId, "&interface_id=", t.recId, "&st_page_id=", window.dmtrack_pageid, "&objectType=", t.objectType, "&objectId=", c.data("object_id"), "&alg=", c.data("alg"), "&ctr_ns="].join(""); (new Image).src = o
            })
      }
    }
  });
define("work_app/script/helper/helper_trace", ["work_app/script/util/util_ali", "jquery"],
  function(e, a) {
    return {
      layout_global: {
        "before:refreshLayout": function() {
          return ! 0
        },
        "before:loadSearchLayout": function() {
          return ! 0
        }
      },
      layout_home: {
        "after:boot": function() {
          e.traceLog("work2015_nav_shy")
        }
      },
      layout_purchase: {
        "after:boot": function() {
          e.traceLog("work2015_nav_shchcg")
        },
        "after:afterRender": function(t) {
          t.target.el().find("." + t.target.tagName + "-main-item").each(function() {
            e.traceLog("work2015_purchase_widget_" + a(this).data("module_name"))
          })
        },
        "after:showAddDialog": function(a) {
          e.traceLog("work2015_" + a.target.tagName.replace("layout_", "") + "_center_addmore")
        }
      },
      layout_wholesale: {
        "after:boot": function() {
          e.traceLog("work2015_nav_pfjh")
        },
        "after:afterRender": function(t) {
          t.target.el().find("." + t.target.tagName + "-main-item").each(function() {
            e.traceLog("work2015_wholesale_widget_" + a(this).data("module_name"))
          })
        },
        "after:showAddDialog": function(a) {
          e.traceLog("work2015_" + a.target.tagName.replace("layout_", "") + "_center_addmore")
        }
      },
      layout_sale: {
        "after:boot": function() {
          e.traceLog("work2015_nav_xsh")
        },
        "after:afterRender": function(t) {
          t.target.el().find("." + t.target.tagName + "-main-item").each(function() {
            e.traceLog("work2015_sale_widget_" + a(this).data("module_name"))
          })
        },
        "after:showAddDialog": function(a) {
          e.traceLog("work2015_" + a.target.tagName.replace("layout_", "") + "_center_addmore")
        }
      },
      layout_app: {
        "after:boot": function() {
          e.traceLog("work2015_nav_yy")
        },
        "before:editMode": function(a) {
          return 1 == a.args[0] ? e.traceLog("work2015_apphome_edit") : 0 == a.args[0] && e.traceLog("work2015_apphome_done"),
            !0
        },
        "after:goAppstore": function() {
          e.traceLog("work2015_apphome_toapphome")
        },
        "before:openApp": function(t) {
          return e.traceLog("work2015_apphome_" + a(t.args[0].currentTarget).parent().data("app_code")),
            !0
        },
        "before:filterByCat": function(a) {
          var t = {
            "\u5168\u90e8": "allapp",
            "\u57fa\u7840\u670d\u52a1": "basicservice",
            "\u5e97\u94fa\u7ba1\u7406": "winportmanage",
            "\u5546\u54c1\u7ba1\u7406": "offermange",
            "\u4ea4\u6613\u7ba1\u7406": "trademanage",
            "\u8fd0\u8425\u63a8\u5e7f": "promotionmanage",
            "\u751f\u4ea7\u4f9b\u5e94\u7ba1\u7406": "supplymanage",
            "\u4ee5\u5546\u4f1a\u53cb": "quan",
            "\u589e\u503c\u670d\u52a1": "vas"
          };
          return e.traceLog("work2015_apphome_cate_" + t[a.args[0]]),
            !0
        }
      },
      layout_app_search: {
        "before:openAppMenu": function(t) {
          return a(t.args[0].currentTarget).hasClass("layout_app_search-result_menu-list-item") ? e.traceLog("work2015_apphome_search_function") : a(t.args[0].currentTarget).hasClass("layout_app_search-result_app-list-item") && e.traceLog("work2015_apphome_search_application"),
            !0
        }
      },
      global_nav: {
        "before:openMenu": function(t) {
          return e.traceLog("work2015_" + t.target.get("appCode") + "_" + a(t.args[0].currentTarget).data("menu_code")),
            !0
        },
        "before:showSetup": function(a) {
          return e.traceLog("work2015_" + a.target.get("appCode") + "_custom"),
            !0
        }
      },
      global_footer: {
        "after:showSuggestion": function(a) {
          var t;
          switch (t = WorkApplication.getParent(a.target).tagName.replace("layout_", ""), WorkApplication.getParent(a.target).tagName) {
            case "layout_home":
              t = "homePage";
              break;
            case "layout_app":
              t = "apphome"
          }
          e.traceLog("work2015_" + t + "_bottom_suggest")
        },
        "after:showHelper": function(a) {
          var t;
          switch (t = WorkApplication.getParent(a.target).tagName.replace("layout_", ""), WorkApplication.getParent(a.target).tagName) {
            case "layout_home":
              t = "homepage";
              break;
            case "layout_app":
              t = "apphome"
          }
          e.traceLog("work2015_" + t + "_bottom_online")
        },
        "after:gotop": function(a) {
          var t;
          switch (t = WorkApplication.getParent(a.target).tagName.replace("layout_", ""), WorkApplication.getParent(a.target).tagName) {
            case "layout_home":
              t = "homepage";
              break;
            case "layout_app":
              t = "apphome"
          }
          e.traceLog("work2015_" + t + "_bottom_top")
        }
      },
      global_alibar: {
        "after:showMsg": function() {
          e.traceLog("work2015_alibar_message")
        }
      },
      home_usually: {
        "after:openUsually": function(t) {
          e.traceLog("work2015_homepage_cygn_" + a(t.args[0].currentTarget).data("app_code") + "_" + a(t.args[0].currentTarget).data("menu_code"))
        }
      },
      home_recent: {
        "after:openApp": function(t) {
          e.traceLog("work2015_homepage_zjsy_" + a(t.args[0].currentTarget).data("app_code"))
        }
      },
      home_myapp: {
        "after:openMyApp": function(t) {
          e.traceLog("work2015_homepage_wdyy_" + a(t.args[0].currentTarget).data("app_code"))
        }
      },
      global_header: {
        "before:getSearchResult": function(a) {
          return "" != a.target.el().find(".global_header-wrapper-search-input-input").val() && e.traceLog("work2015_nav_search_" + a.target.combo.getValue()),
            !0
        }
      },
      header_applist: {
        "after:loadLayoutAppManage": function() {
          e.traceLog("work2015_apphome_dropdownbox_edit")
        },
        "after:loadLayoutApp": function() {
          e.traceLog("work2015_apphome_dropdownbox_allapp")
        },
        "before:openApp": function(t) {
          return a(t.args[0].currentTarget).hasClass("header_applist-myapp-wrapper-info-list-block") && e.traceLog("work2015_apphome_dropdownbox_" + a(t.args[0].currentTarget).data("app_code")),
            a(t.args[0].currentTarget).hasClass("header_applist-lastused_app-wrapper-list-block") && e.traceLog("work2015_apphome_dropdownbox_lastused_" + a(t.args[0].currentTarget).data("app_code")),
            !0
        }
      },
      slide_panel: {
        "after:callWidget": function(t) {
          e.traceLog("work2015_workflow_" + a(t.args[0].currentTarget).data("widget_name"))
        }
      },
      message_box: {
        "after:loadMsgList": function(a) {
          e.traceLog("all" == a.args[0].msg_group_id ? "work2015_message_all": "work2015_message" + a.args[0].msg_group_id)
        },
        "after:showSetupPanel": function(a) {
          1 == a.args[0] ? e.traceLog("work2015_message_set") : 0 == a.args[0] && e.traceLog("work2015_message_set_return")
        }
      },
      message_list: {
        "after:clearUnreadMsg": function() {
          e.traceLog("work2015_message_nav_read")
        }
      },
      widget_slide_tools: {
        "before:state": function(a) {
          return 1 == a.args[0] ? e.traceLog("work2015_workflow_hidden") : 2 == a.args[0] && e.traceLog("work2015_workflow_appear"),
            !0
        },
        "after:gotop": function() {
          e.traceLog("work2015_workflow_top")
        }
      }
    }
  });
define("work_app/script/helper/helper_trace_widget", ["work_app/script/util/util_ali", "jquery"],
  function() {
    return {
      work_company: {}
    }
  });
define("work_app/script/helper/helper_other", ["require", "jquery"],
  function(e, t) {
    return {
      global_nav: {
        "before:afterRender": function(e) {
          var t;
          if (t = "online" == WorkApplication.config.environment ? "http://go.1688.com/": "http://go-test.1688.com:7100/", "supplier" == e.target.el().find(".global_nav").data("app_code") ? e.target.el().find(".global_nav-extend").html('<div style="padding: 10px;padding-left: 30px;position: relative;"><a href="' + t + 'buyoffer/dashboard.htm?tracelog=bing_cg_cd_cggl&__app_code__=procurement" target="_blank" style="color:#000;"><img style="position: relative;top: 10px;margin-right: 10px;" src="http://i05.c.aliimg.com/cms/upload/2014/864/880/2088468_1681200473.png"/>\u91c7\u8d2d\u7ba1\u7406</a></div>') : "procurement" == e.target.el().find(".global_nav").data("app_code") && (e.target.el().find(".global_nav-extend").html('<div style="padding: 10px;padding-left: 30px;position: relative;"><a href="' + t + 'quotation/purchase_supplier.htm?tracelog=bing_gy_cd_gygl&__app_code__=supplier" target="_blank" style="color:#000;"><img style="position: relative;top: 10px;margin-right: 10px;" src="http://i03.c.aliimg.com/cms/upload/2014/664/880/2088466_1681200473.png"/>\u62a5\u4ef7\u7ba1\u7406</a></div>'), e.target.set("extCode", '<div style="padding: 10px;padding-left: 30px;position: relative;"><a href="http://go.1688.com/quotation/purchase_supplier.htm?tracelog=bing_gy_cd_gygl&__app_code__=supplier" target="_blank" style="color:#000;"><img style="position: relative;top: 10px;margin-right: 10px;" src="http://i00.c.aliimg.com/images/app/platform/workplace/appicon32/purchasematch.png"/>\u4f9b\u5e94\u7ba1\u7406</a></li>')), "supplier" == e.target.get("appCode")) {
            var a = e.target.el().find('.global_nav-list-nav-menu-item[data-menu_code="myCompany"]');
            if (a.length > 0) {
              var r = a.attr("href");
              a.attr("href", r.replace("/supplier/", "/winporter/"))
            }
          }
          return ! 0
        },
        "before:openMenu": function(e) {
          var a = t(e.args[0].currentTarget);
          return - 1 != t.inArray(a.data("menu_code"), ["supplierInformation", "goodsManage", "iwantjoinin", "receipt"]) ? (e.args[0].preventDefault(), window.open(a.data("orig_href")), !1) : !0
        }
      }
    }
  });