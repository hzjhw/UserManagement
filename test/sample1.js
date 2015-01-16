/**
 * @description sample1
 * @class sample1
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define("work_app/script/helper/helper_aop", ["work_app/script/helper/helper_sub_user", "work_app/script/helper/helper_trace", "work_app/script/helper/helper_trace_widget", "work_app/script/helper/helper_other", "jquery"],
  function(e, r, p, t, h) {
    var a = [],
      c = function(e) {
        h.each(e,
          function(e, r) {
            h.each(r,
              function(r, p) {
                var t = r.match(/:.+/)[0],
                  h = r.match(/\w+(?=:)/)[0],
                  c = t.substring(1, t.length);
                a.push({
                  tagName: e,
                  position: h,
                  event: c,
                  func: p
                })
              })
          })
      };
    return c(e),
      c(r),
      c(p),
      c(t),
      a
  });
define("work_app/script/widget/timer/timer", ["lofty/lang/class", "work_app/script/core/core", "jquery"],
  function(t, i, s) {
    return t(i, {
      options: {},
      init: function(t) {
        t || (t = {}),
          i.prototype.init.call(this, t),
          this.set({
            delay: t.delay || 30,
            running: !1
          }),
          this.time = 0,
          this.taskList = []
      },
      addEvent: function(t, i) {
        i || (i = {}),
          i.loop || (i.loop = 1),
          i.context || (i.context = window),
          i.frame || (i.frame = 1);
        for (var s in this.taskList) if (this.taskList[s].fn === t) return ! 1;
        this.taskList.push({
          loop: i.loop,
          frame: i.frame,
          context: i.context,
          fn: t
        })
      },
      removeEvent: function(t) {
        for (var i in this.taskList) this.taskList[i].fn === t && this.taskList.splice(i, 1)
      },
      start: function() {
        var t = this;
        return this.get("running") ? !1: (this.set("running", !0), void(this.timer = setInterval(function() {
            t.time++,
              s.each(t.taskList,
                function() {
                  this.loop > 0 ? t.time % this.frame == 0 && (this.loop--, this.fn.call(this.context, t.time)) : "inf" == this.loop && t.time % this.frame == 0 && this.fn.call(this.context, t.time)
                });
            for (var i = t.taskList.length; i > 0;) 0 == t.taskList[i - 1].loop && t.taskList.splice(i - 1, 1),
              i--
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
          i.prototype.destroy.call(this)
      }
    })
  });
define("work_app/model/model", ["lofty/lang/class", "work_app/script/core/core"],
  function(t, e) {
    return t(e, {
      init: function(t) {
        t || (t = {}),
          e.prototype.init.call(this, t)
      },
      boot: function() {
        e.prototype.boot.call(this),
          this.data = {}
      },
      push: function(t) {
        t.key || this.missArg("\u7f3a\u5c11\u53c2\u6570key"),
          t.keep || (t.keep = "inf"),
          this.data[t.key] = {
            data: jQuery.extend(!0, {},
              t.data),
            keep: t.keep || "inf"
          }
      },
      pull: function(t) {
        return this.data[t] ? jQuery.extend(!0, {},
          this.data[t].data) : void 0
      },
      destroy: function() {
        e.prototype.destroy.call(this)
      }
    })
  });
define("work_app/script/config",
  function() { !
    function() {
      window.workJsContent || (window.workJsContent = {}),
        workJsContent.environment || (workJsContent.environment = "online"),
        workJsContent.is_work_env || (workJsContent.is_work_env = !1),
        workJsContent.DEV_TOOLS || (workJsContent.DEV_TOOLS = !1),
        workJsContent.CURRENT_PATH = document.location.href.match(/(^.[^#]*)/)[0],
        workJsContent.WORK_SERVER = "http://work.1688.com/",
        workJsContent.MBOX_SERVER = "http://widget.1688.com/front/",
        workJsContent.WIDGET_SERVER = "http://work.1688.com/home/widget/",
        workJsContent.MSG_SERVER = "http://msg.me.1688.com/msg/",
        workJsContent.APP_SERVER = "http://work.1688.com/home/ajax/",
        workJsContent.STYLE_PATH = "http://style.c.aliimg.com/app/aliwork/main_site/",
        workJsContent.WORK_WIDGET_PATH = "http://style.c.aliimg.com/app/workwidget/widget/",
        workJsContent.TPL_PATH = workJsContent.STYLE_PATH + "js_tpl/",
        workJsContent.IMG_PATH = "http://img.china.alibaba.com/",
        workJsContent.APP_PATH = "http://work.1688.com",
        workJsContent.FEED_PATH = "http://work.1688.com/home/page/feedList.htm",
        workJsContent.CLOCK_TIME = 30,
        workJsContent.NEW_MSG_INTERVAL = 6e4,
          "local" == workJsContent.environment ? (workJsContent.WORK_SERVER = "http://work-test.1688.com:25100/", workJsContent.MBOX_SERVER = "http://widget-test.1688.com:8100/front/", workJsContent.WIDGET_SERVER = "http://work-test.1688.com:25100/home/widget/", workJsContent.MSG_SERVER = "http://msg-test.me.1688.com:3100/msg/", workJsContent.APP_SERVER = "http://work-test.1688.com:25100/home/ajax/", workJsContent.APP_PATH = "http://work2.1688.com/html/test.html", workJsContent.FEED_PATH = "http://work2.1688.com/html/feed.html", workJsContent.NEW_MSG_INTERVAL = 1e4, workJsContent.DEV_TOOLS = !0) : "dev" == workJsContent.environment && (workJsContent.WORK_SERVER = "http://work-test.1688.com:25100/", workJsContent.MBOX_SERVER = "http://widget-test.1688.com:8100/front/", workJsContent.WIDGET_SERVER = "http://work-test.1688.com:25100/home/widget/", workJsContent.MSG_SERVER = "http://msg-test.me.1688.com:3100/msg/", workJsContent.APP_SERVER = "http://work-test.1688.com:25100/home/ajax/", workJsContent.APP_PATH = "http://work-test.1688.com:25100/home/newIndex.html", workJsContent.FEED_PATH = "http://work-test.1688.com:25100/home/page/feedList.htm", workJsContent.NEW_MSG_INTERVAL = 6e4),
        workJsContent.CURRENT_OR_WORK_SERVER = -1 != location.href.indexOf(workJsContent.APP_PATH) ? workJsContent.CURRENT_PATH: workJsContent.APP_PATH
    } ()
  });
define("lofty/util/cookie/1.0/cookie",
  function() {
    function e() {
      if ("" === document.cookie) return {};
      for (var e = document.cookie.split("; "), t = {},
             r = 0, n = e.length; n > r; r++) {
        var i = e[r].split("=");
        t[i[0]] = i[1]
      }
      return t
    }
    function t(e) {
      return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
    }
    var r = {
      options: {
        path: "",
        domain: "",
        expires: 7,
        secure: !1,
        raw: !1
      },
      set: function(e, t, r) { (arguments.length < 3 || 3 == arguments.length && "undefined" == typeof r) && (r = {});
        var n = void 0 != r.expires ? r.expires: this.options.expires || "",
          i = typeof n;
        "string" === i && "" !== n ? n = new Date(n) : "number" === i && (n = new Date( + new Date + 864e5 * n)),
          "" !== n && "toUTCString" in n && (n = "; expires=" + n.toUTCString());
        var o = r.path || this.options.path;
        o = o ? "; path=" + o: "";
        var s = r.domain || this.options.domain;
        s = s ? "; domain=" + s: "";
        var u = "undefined" == typeof r.secure ? this.options.secure ? "; secure": "": r.secure ? "; secure": "",
          a = "undefined" != typeof r.raw ? r.raw: this.options.raw,
          p = a ?
            function(e) {
              return e
            }: escape;
        return document.cookie = a === !0 ? e + "=" + t + n + o + s + u: p(e) + "=" + p(t) + n + o + s + u,
          this
      },
      get: function(r, n) {
        n = n || {};
        var i = e(),
          o = n.raw ?
            function(e) {
              return e
            }: unescape;
        if (t(r)) {
          for (var s = {},
                 u = 0, a = r.length; a > u; u++) {
            var p = o(r[u]),
              f = i[p];
            "undefined" != typeof f && (f = o(f)),
              s[p] = f ? f: null
          }
          return s
        }
        r = o(r);
        var f = i[r];
        return "undefined" != typeof f && (f = o(f)),
          f = f ? f: null
      },
      remove: function(e) {
        if (t(e)) for (var r = 0, n = e.length; n > r; r++) this.set(e[r], "", {
          expires: -1
        });
        else "string" == typeof e && this.set(e, "", {
          expires: -1
        });
        return this
      }
    };
    return r
  });
define("lofty/alicn/subcookie/1.0/subcookie", ["jquery", "lofty/util/cookie/1.0/cookie"],
  function(e, t) {
    "use strict";
    function n(t, n) {
      if ("string" == typeof t) {
        var i = e.trim(t).match(/([^?#]*)(#.*)?$/),
          o = {};
        return i ? (e.each(i[1].split(n || "&"),
          function(t, n) {
            if ((n = n.split("="))[0]) {
              var i = decodeURIComponent(n.shift()),
                r = n.length > 1 ? n.join("=") : n[0];
              void 0 != r && (r = decodeURIComponent(r)),
                  i in o ? (e.isArray(o[i]) || (o[i] = [o[i]]), o[i].push(r)) : o[i] = r
            }
          }), o) : {}
      }
    }
    var i = "alicnweb",
      o = {
        get: function(e) {
          var o = n(t.get(i) || "", "|") || {};
          return void 0 === o[e] ? null: o[e]
        },
        set: function(o, r, a) {
          var u = n(t.get(i) || "", "|") || {};
          return a = a || {
            path: "/",
            domain: "1688.com",
            expires: new Date("January 1, 2050")
          },
              arguments.length > 1 ? (u[o] = r, t.set(i, e.param(u).replace(/&/g, "|"), a)) : null
        }
      };
    return o
  });
define("work_app/script/lib/ie-update", ["jquery", "alicn/subcookie/1.0"],
  function(i, e) {
    function t(i) {
      window.dmtrack && dmtrack.clickstat("http://stat.1688.com/tracelog/click.html", "?tracelog=" + i)
    }
    function s() {
      var s = {
        init: function() {
          if (this.hasInited !== !0 && void 0 != i.browser.msie && "" != i.browser.msie) {
            this.version = parseInt(i.browser.version);
            var e = navigator.userAgent;
            this.isWin7 = /Windows\sNT\s6\.1/g.test(e),
              this.isVista = /Windows\sNT\s6\.0/g.test(e),
              this.isXp = /Windows\sNT\s5\.[12]/g.test(e),
              7 === this.version && (e.indexOf("Trident/6") > -1 ? this.version = 10: e.indexOf("Trident/5") > -1 ? this.version = 9: e.indexOf("Trident/4") > -1 && (this.version = 8)),
              this.needUpdate = !1,
              this.version <= 6 && (this.needUpdate = !0),
              0 != this.needUpdate && (this.hostname = location.hostname, this.whiteList = [], this.whiteDomainReg = /work.1688.com/i, 0 == this.whiteDomainReg.test(this.hostname), this.showTip())
          }
        },
        addDownloadLink: function() {},
        setLog: function() {
          e.set("show-kill-ie", +new Date)
        },
        hasShowed: function() {
          return ! 1
        },
        showTip: function() {
          var e,
            s,
            o = this,
            n = i("body");
          i("div.iepush-banner", n).length && i("div.iepush-banner", n).remove(),
            i("div.kill-old-browser", n).length || 1 != o.hasShowed() && (n.append('<div id="kill-ie6-cover" style="display: none"></div><link href="http://style.c.aliimg.com/app/aliwork/main_site/style/lib/ie-update.css" rel="stylesheet"/>'), e = ['<div  class="kill-old-browser kill-old-browser-dialog">', '<div class="kill-container">', '<a href="#" class="kill-close" style="background-color:#ade2f4"></a>', '<a class="kill-download dl-360" href="http://dlsw.baidu.com/sw-search-sp/soft/57/17458/360cse_7.5.3.186.1407118683.exe" target="_blank"></a>', '<a class="kill-download dl-ie" href="http://dlsw.baidu.com/sw-search-sp/soft/41/23253/IE8-WindowsXP-x86-CHS.2728888507.exe" target="_blank"></a>', '<a class="kill-download dl-chrome" href="http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandaloneSetup.1407983598.exe" target="_blank"></a>', "</div>", "</div>"], n.append(e.join("")), i("#kill-ie6-cover").css({
            display: "block",
            backgroundColor: "#000",
            opacity: .8,
            position: "absolute",
            zIndex: 9998,
            left: 0,
            top: 0,
            width: i(document.body).outerWidth(!0),
            height: i(window).outerHeight(!0)
          }), i(".kill-old-browser").css({
            display: "block",
            position: "absolute",
            left: (i(window).outerWidth(!0) - 990) / 2,
            top: (i(window).outerHeight(!0) - 200) / 2
          }), o.container = s = i(".kill-old-browser", n), s.fadeIn(1e3), o.setLog(), o.addDownloadLink(), t("work2015_t_killie_show"), i("a.kill-close", s).click(function(e) {
            e.preventDefault(),
              t("work2015_t_killie_close"),
              s.hide(400,
                function() {
                  s.remove(),
                    i("#kill-ie6-cover").remove()
                })
          }), i(".kill-download", s).click(function() {
            t("work2015_t_killie_success")
          }), this.hasInited = !0)
        }
      };
      s.init()
    }
    i(function() {
      setTimeout(s, 500)
    })
  });
define("work_widget/config",
  function() { !
    function() {
      window.workWidgetJsContent || (window.workWidgetJsContent = {}),
        workWidgetJsContent.environment || "online" == workWidgetJsContent.environment,
        workWidgetJsContent.MBOX_SERVER = "http://widget.1688.com/front/",
        workWidgetJsContent.BING_SERVER = "http://go.1688.com/",
          "local" == workWidgetJsContent.environment ? (workWidgetJsContent.MBOX_SERVER = "http://widget-test.1688.com:8100/front/", workWidgetJsContent.BING_SERVER = "http://go-test.1688.com:7100/") : "dev" == workJsContent.environment && (workWidgetJsContent.MBOX_SERVER = "http://widget-test.1688.com:8100/front/", workWidgetJsContent.BING_SERVER = "http://go-test.1688.com:7100/")
    } ()
  });
define("work_app/script/core/application", ["lofty/lang/class", "work_app/script/core/core", "work_app/script/core/mediator", "work_app/script/util/util_string", "work_app/script/core/factory", "lofty/lang/aop", "work_app/script/helper/helper_aop", "work_app/script/widget/timer/timer", "work_app/model/model", "jquery", "work_app/script/config", "work_app/script/lib/ie-update", "work_widget/config"],
  function(t, e, i, o, n, r, a, c, p, s) {
    var l = t(e, {
      singleton: !0,
      debug: !0,
      tagName: "work_app/application",
      init: function(t) {
        t || (t = {}),
          e.prototype.init.call(this, t),
          window.WorkApplication = this,
          this.mediator = new i,
          this.config = window.workJsContent || {},
          this.widgetConfig = window.workWidgetJsContent || {};
        var o;
        o = this.config.CLOCK_TIME,
          this.clock = new c({
            delay: o
          }),
          this.clock.start(),
          this.model = new p
      },
      create: function(t, e, i) {
        i && (e.context = i);
        var t = n.create(t, e);
        return this.bingAop(t),
          t
      },
      bingAop: function(t) {
        s.each(a,
          function(e, i) {
            t.tagName == i.tagName && r[i.position](t, i.event, i.func, t)
          })
      },
      getRelation: function() {
        return n.getRelation()
      },
      getViewByTagname: function(t) {
        var e;
        return n.getDataModel().map({
          callback: function(i) {
            t == i.tagName && (e = i)
          }
        }),
          e
      },
      getViewByDom: function(t) {
        var e;
        return n.getDataModel().map({
          callback: function(i) {
            i.el && t.is(i.el()) && (e = i)
          }
        }),
          e
      },
      getParent: function(t) {
        return t || this.missArg("\u7f3a\u5c11\u5bf9\u8c61"),
          n.getParent(t.get("_factoryId"))
      },
      destroy: function(t) {
        n.destroy(t)
      }
    });
    return n.create(l)
  });
define("work_app/script/util/util_misc", ["jquery"],
  function(t) {
    return {
      urlResolve: function(a) {
        a || (a = document.location.href);
        var r = a.match(/^.[^#|?]*/);
        r && (r = r[0]);
        var n = a.match(/#.*$/);
        n && (n = n[0]);
        var i = {
            path: r || "",
            hash: n || ""
          },
          e = a.match(/(^.[^#]*)/)[0],
          c = e.match(/\?.[^#]*/);
        if (null == c) i.param = {};
        else {
          var l = c[0].substring(1, c[0].length).split("&"),
            h = {};
          t.each(l,
            function() {
              var t = this.split("=");
              h[t[0]] = t[1] || ""
            }),
            i.param = h
        }
        i.fullPath = e;
        var s = /http(|s):\/\/([^\/]+)/i;
        return i.domain = r.match(s).length > 0 ? r.match(s)[2] : "",
          i
      },
      isAlibabaUrl: function(a) {
        try {
          var r = this.urlResolve(a).domain
        } catch(n) {
          return ! 1
        }
        var i = ["1688.com", "alibaba.com", "alicdn.com", "taobao.com"],
          e = !1;
        return t.each(i,
          function(t) {
            var a = r.split(i[t]);
            a = a.reverse(),
              ("" == a[0] || 0 == a[0].indexOf(":")) && ("." == a[1].substr(a[1].length - 1, 1) || "" == a[1].substr(a[1].length - 1, 1)) && (e = !0)
          }),
          e
      }
    }
  });
define("work_app/script/core/router", ["lofty/lang/class", "work_app/script/core/core", "work_app/script/util/util_string", "work_app/script/util/util_misc", "jquery"],
  function(o, e, a, n, i) {
    return o(e, {
      init: function(o) {
        o || (o = {}),
          e.prototype.init.call(this, o)
      },
      boot: function() {
        var o = this;
        if (i(window).bind("hashchange",
          function() {
            o.navigate(n.urlResolve().hash)
          }), i.browser.msie && "7.0" == i.browser.version) {
          var e = n.urlResolve().hash;
          this.ie7LoopTimer = setInterval(function() {
              n.urlResolve().hash != e && (o.navigate(n.urlResolve().hash), e = n.urlResolve().hash)
            },
            500)
        }
      },
      navigate: function(o) {
        if ("" == n.urlResolve().hash) this.router.nav.apply(this, [["home"]]);
        else { ( - 1 != o.indexOf("app") || -1 != o.indexOf("menu") || -1 != o.indexOf("channel")) && -1 != o.indexOf("=") && -1 == o.indexOf("/") && this.oldHash(o);
          var e = a.backboneRoute(o);
          this.router[e.action] && this.router[e.action].apply(this, [e.param])
        }
        i(document).scrollTop(0)
      },
      oldHash: function(o) {
        var e = o.replace("#", "").split("&"),
          a = {
            app: "",
            menu: "",
            channel: ""
          };
        if (i.each(e,
          function(o, e) {
            var n = e.split("="),
              i = n[0],
              t = n[1];
            a[i] = t
          }), "" != a.app) document.location = WorkApplication.config.APP_PATH + "#app/" + a.app + "/" + a.menu + "/";
        else switch (a.channel.toLowerCase()) {
          case "home":
            document.location = WorkApplication.config.APP_PATH + "#nav/home";
            break;
          case "purchase":
            document.location = WorkApplication.config.APP_PATH + "#nav/purchase";
            break;
          case "wholesale":
            document.location = WorkApplication.config.APP_PATH + "#nav/wholesale";
            break;
          case "sale":
            document.location = WorkApplication.config.APP_PATH + "#nav/sale";
            break;
          case "appstore":
            document.location = WorkApplication.config.APP_PATH + "#nav/app";
            break;
          case "sns":
            document.location = WorkApplication.config.APP_PATH + "#app///http%3A%2F%2Fwork.1688.com%2Fhome%2Fpage%2Fcommunity.html";
            break;
          default:
            document.location = WorkApplication.config.APP_PATH + "#app/" + a.app + "/" + a.menu + "/"
        }
      }
    })
  });
!
  function() {
    function e(e) {
      return e.replace(y, "").replace(b, ",").replace(w, "").replace(x, "").replace(j, "").split(k)
    }
    function n(e) {
      return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }
    function t(t, r) {
      function a(e) {
        return p += e.split(/\n/).length - 1,
          u && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
          e && (e = v[1] + n(e) + v[2] + "\n"),
          e
      }
      function i(n) {
        var t = p;
        if (s ? n = s(n, r) : o && (n = n.replace(/\n/g,
          function() {
            return p++,
              "$line=" + p + ";"
          })), 0 === n.indexOf("=")) {
          var a = f && !/^=[=#]/.test(n);
          if (n = n.replace(/^=[=#]?|[\s;]*$/g, ""), a) {
            var i = n.replace(/\s*\([^\)]+\)/, "");
            $[i] || /^(include|print)$/.test(i) || (n = "$escape(" + n + ")")
          } else n = "$string(" + n + ")";
          n = v[1] + n + v[2]
        }
        return o && (n = "$line=" + t + ";" + n),
          m(e(n),
            function(e) {
              if (e && !g[e]) {
                var n;
                n = "print" === e ? b: "include" === e ? w: $[e] ? "$utils." + e: d[e] ? "$helpers." + e: "$data." + e,
                  x += e + "=" + n + ",",
                  g[e] = !0
              }
            }),
          n + "\n"
      }
      var o = r.debug,
        c = r.openTag,
        l = r.closeTag,
        s = r.parser,
        u = r.compress,
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
        h = "".trim,
        v = h ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
        y = h ? "$out+=text;return $out;": "$out.push(text);",
        b = "function(){var text=''.concat.apply('',arguments);" + y + "}",
        w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + y + "}",
        x = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (o ? "$line=0,": ""),
        j = v[0],
        k = "return new String(" + v[3] + ");";
      m(t.split(c),
        function(e) {
          e = e.split(l);
          var n = e[0],
            t = e[1];
          1 === e.length ? j += a(n) : (j += i(n), t && (j += a(t)))
        });
      var T = x + j + k;
      o && (T = "try{" + T + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + n(t) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
      try {
        var E = new Function("$data", "$filename", T);
        return E.prototype = $,
          E
      } catch(S) {
        throw S.temp = "function anonymous($data,$filename) {" + T + "}",
          S
      }
    }
    var r = function(e, n) {
      return "string" == typeof n ? h(n, {
        filename: e
      }) : o(e, n)
    };
    r.version = "3.0.0",
      r.config = function(e, n) {
        a[e] = n
      };
    var a = r.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
      },
      i = r.cache = {};
    r.render = function(e, n) {
      return h(e, n)
    };
    var o = r.renderFile = function(e, n) {
      var t = r.get(e) || g({
        filename: e,
        name: "Render Error",
        message: "Template not found"
      });
      return n ? t(n) : t
    };
    r.get = function(e) {
      var n;
      if (i[e]) n = i[e];
      else if ("object" == typeof document) {
        var t = document.getElementById(e);
        if (t) {
          var r = (t.value || t.innerHTML).replace(/^\s*|\s*$/g, "");
          n = h(r, {
            filename: e
          })
        }
      }
      return n
    };
    var c = function(e, n) {
        return "string" != typeof e && (n = typeof e, "number" === n ? e += "": e = "function" === n ? c(e.call(e)) : ""),
          e
      },
      l = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
      },
      s = function(e) {
        return l[e]
      },
      u = function(e) {
        return c(e).replace(/&(?![\w#]+;)|[<>"']/g, s)
      },
      f = Array.isArray ||
        function(e) {
          return "[object Array]" === {}.toString.call(e)
        },
      p = function(e, n) {
        var t,
          r;
        if (f(e)) for (t = 0, r = e.length; r > t; t++) n.call(e, e[t], t, e);
        else for (t in e) n.call(e, e[t], t)
      },
      $ = r.utils = {
        $helpers: {},
        $include: o,
        $string: c,
        $escape: u,
        $each: p
      };
    r.helper = function(e, n) {
      d[e] = n
    };
    var d = r.helpers = $.$helpers;
    r.onerror = function(e) {
      var n = "Template Error\n\n";
      for (var t in e) n += "<" + t + ">\n" + e[t] + "\n\n";
      "object" == typeof console && console.error(n)
    };
    var g = function(e) {
        return r.onerror(e),
          function() {
            return "{Template Error}"
          }
      },
      h = r.compile = function(e, n) {
        function r(t) {
          try {
            return new l(t, c) + ""
          } catch(r) {
            return n.debug ? g(r)() : (n.debug = !0, h(e, n)(t))
          }
        }
        n = n || {};
        for (var o in a) void 0 === n[o] && (n[o] = a[o]);
        var c = n.filename;
        try {
          var l = t(e, n)
        } catch(s) {
          return s.filename = c || "anonymous",
            s.name = "Syntax Error",
            g(s)
        }
        return r.prototype = l.prototype,
          r.toString = function() {
            return l.toString()
          },
          c && n.cache && (i[c] = r),
          r
      },
      m = $.$each,
      v = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
      y = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
      b = /[^\w$]+/g,
      w = new RegExp(["\\b" + v.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
      x = /^\d[^,]*|,\d[^,]*/g,
      j = /^,+|,+$/g,
      k = /^$|,+/;
    a.openTag = "{{",
      a.closeTag = "}}";
    var T = function(e, n) {
      var t = n.split(":"),
        r = t.shift(),
        a = t.join(":") || "";
      return a && (a = ", " + a),
        "$helpers." + r + "(" + e + a + ")"
    };
    a.parser = function(e) {
      e = e.replace(/^\s/, "");
      var n = e.split(" "),
        t = n.shift(),
        a = n.join(" ");
      switch (t) {
        case "if":
          e = "if(" + a + "){";
          break;
        case "else":
          n = "if" === n.shift() ? " if(" + n.join(" ") + ")": "",
            e = "}else" + n + "{";
          break;
        case "/if":
          e = "}";
          break;
        case "each":
          var i = n[0] || "$data",
            o = n[1] || "as",
            c = n[2] || "$value",
            l = n[3] || "$index",
            s = c + "," + l;
          "as" !== o && (i = "[]"),
            e = "$each(" + i + ",function(" + s + "){";
          break;
        case "/each":
          e = "});";
          break;
        case "echo":
          e = "print(" + a + ");";
          break;
        case "print":
        case "include":
          e = t + "(" + n.join(",") + ");";
          break;
        case "!":
          e = a;
          break;
        default:
          if (/^\s*\|\s*[\w\$]/.test(a)) {
            var u = !0;
            0 === e.indexOf("#") && (e = e.substr(1), u = !1);
            for (var f = 0, p = e.split("|"), $ = p.length, d = p[f++]; $ > f; f++) d = T(d, p[f]);
            e = (u ? "=": "=#") + d
          } else e = r.helpers[t] ? "=#" + t + "(" + n.join(",") + ");": "=" + e
      }
      return e
    },
        "function" == typeof define ? define("lofty/util/template/2.0/template", ["require", "exports", "module"],
      function(e, n, t) {
        t.exports = r
      }) : "undefined" != typeof exports ? module.exports = r: this.template = r
  } ();
define("work_app/script/helper/helper_art", ["jquery"],
  function() {
    return {
      absoluteAddress: function(r) {
        return - 1 != location.href.indexOf(WorkApplication.config.APP_PATH) ? WorkApplication.config.CURRENT_PATH + r: WorkApplication.config.APP_PATH + r
      },
      toFixed: function(r, n) {
        return n = n || 2,
          isNaN( + r) ? r: ( + r).toFixed(n)
      },
      urlTrace: function(r, n) {
        return - 1 != r.indexOf("?") ? r + "&tracelog=" + n: r + "?tracelog=" + n
      }
    }
  });
define("work_app/script/core/view", ["require", "lofty/lang/class", "work_app/script/core/core", "work_app/script/core/application", "util/template/2.0", "work_app/script/helper/helper_art", "jquery"],
  function(t, e, i, o, n, a, r) {
    return e(i, {
      options: {
        state: "init"
      },
      init: function(e) {
        var n = this;
        return e || (e = {}),
          this.init_opt = e,
          i.prototype.init.call(this, e),
          e.el ? ("object" == typeof e.el ? this.set("el", e.el) : this.set("el", r(e.el)), this.set("callback", e.callback || r.noop), this.set("place_holder", e.place_holder || "view_loading"), this.set("ef", e.ef || "fadeIn"), this.initing(), "local" != o.config.environment && (this.debug = !1), (o.config.DEV_TOOLS || 1 == this.debug) && t.use("work_app/script/widget/develop/develop",
            function(t) {
              return void 0 == n.get("state") ? !1: void(n.develop = o.create(t, {
                handle: n
              }))
            }), WorkApplication.mediator.publish("viewInit", {
            context: n
          }), void this._TplBindHelper()) : (this.missArg("\u7f3a\u5c11\u53c2\u6570el"), !1)
      },
      boot: function() {
        var t = this;
        i.prototype.boot.call(this),
          this.on("stateChanged",
            function() {
              "live" == t.get("state") && t.initComplete()
            }),
          r.each(this.event,
            function(e, i) {
              var o = e.match(/\w+(?=:)/)[0],
                n = e.match(/:.+/)[0],
                a = n.substring(1, n.length);
              "string" == typeof i ? t.el().on(o, a, r.proxy(t[i], t)) : t.el().on(o, a, r.proxy(i, t))
            }),
          WorkApplication.mediator.publish("viewBoot", {
            context: t
          })
      },
      _TplBindHelper: function() {
        r.each(a,
          function(t, e) {
            n.helper(t, e)
          })
      },
      initing: function() {
        var t = r('<div class="' + this.get("place_holder") + " " + this.tagName + '_l">\u6b63\u5728\u52a0\u8f7d...</div>');
        this.el().html(t),
          setTimeout(function() {
              t.css("opacity", 1)
            },
            500)
      },
      initComplete: function() {},
      onLoadError: function(t) {
        this.get("el").html(t.toString())
      },
      el: function() {
        return this.get("el") ? this.get("el") : r()
      },
      render: function(t) {
        var e = this,
          i = {
            tpl: t.tpl || "",
            data: t.data || {},
            isWidget: t.isWidget || "F",
            callback: t.callback || r.noop
          };
        if (i.data.tag_name = this.tagName, void 0 == e.get("state")) return ! 1;
        var a = n.compile(i.tpl)(i.data),
          s = function() {
            try {
              var t = r(a)
            } catch(o) {
              return WorkApplication.mediator.publish("viewError", {
                context: e,
                error: "RENDER_ERROR"
              }),
                !1
            }
            try {
              e.get("el").html(t)
            } catch(o) {} - 1 != navigator.userAgent.indexOf("Firefox") && -1 != navigator.userAgent.indexOf("Mac") && e.set("ef", "none"),
              "none" != e.get("ef") && (t.addClass("view_start " + e.get("ef")), setTimeout(function() {
                t.addClass("view_show " + e.get("ef")),
                  setTimeout(function() {
                      t.removeClass("view_show view_start " + e.get("ef"))
                    },
                    1e3)
              },
              10)),
              WorkApplication.mediator.publish("viewRender", {
                context: e
              }),
              i.callback(),
              "init" == e.get("state") && (e.get("callback")(), e.set("state", "live"))
          };
        o.clock.addEvent(s)
      },
      renderHtmlInMemory: function(t) {
        t || (t = {});
        var e = {
            data: t.data || {},
            tpl: t.tpl || "",
            isWidget: t.isWidget || "F",
            callback: t.callback || r.noop
          },
          i = n.compile(e.tpl)(e.data);
        e.callback(i)
      },
      renderHtmlByCustomTpl: function(t, e) {
        return e || (e = {}),
          n.compile(t)(e)
      },
      renderHtmlOnTgt: function(t) {
        t || (t = {});
        var e = t.html || "",
          i = t.callback || r.noop,
          n = this;
        if (void 0 == n.get("state")) return ! 1;
        var a = r(e),
          s = function() { - 1 != navigator.userAgent.indexOf("Firefox") && -1 != navigator.userAgent.indexOf("Mac") && n.set("ef", "none"),
            "none" != n.get("ef") && (a.addClass("view_start " + n.get("ef")), setTimeout(function() {
              a.addClass("view_show " + n.get("ef")),
                setTimeout(function() {
                    a.removeClass("view_show view_start " + n.get("ef"))
                  },
                  1e3)
            },
            10)),
            t.tgt ? t.tgt.html(a) : n.el().html(a),
            WorkApplication.mediator.publish("viewRender", {
              context: n
            }),
            i()
          }; ! r.browser.msie || "8.0" != r.browser.version && "7.0" != r.browser.version ? o.clock.addEvent(s, {
          frame: 1
        }) : o.clock.addEvent(s, {
          frame: 10
        })
      },
      reload: function() {
        var t = this;
        r.each(this.event,
          function(e, i) {
            var o = e.match(/\w+(?=:)/)[0],
              n = e.match(/:.+/)[0],
              a = n.substring(1, n.length);
            "string" == typeof i ? t.el().off(o, a, r.proxy(t[i], t)) : t.el().off(o, a, r.proxy(i, t))
          }),
          this.set("state", void 0),
          this.init(this.init_opt)
      },
      destroy: function(t) {
        var e = this;
        t || (t = {}),
          this.develop && o.destroy(this.develop),
          r.each(this.event,
            function(t, i) {
              var o = t.match(/\w+(?=:)/)[0],
                n = t.match(/:.+/)[0],
                a = n.substring(1, n.length);
              "string" == typeof i ? e.el().off(o, a, r.proxy(e[i], e)) : e.el().off(o, a, r.proxy(i, e))
            });
        var n = this.get("el").children();
        switch (t.ef || (t.ef = "none"), t.ef) {
          case "none":
            n.remove();
            break;
          case "fadeIn":
            n.fadeIn(function() {
              n.remove()
            })
        }
        this.set("state", void 0),
          i.prototype.destroy.call(this)
      }
    })
  });
define("lofty/ui/widget/1.0/widget", ["lofty/lang/class", "lofty/lang/base", "jquery"],
  function(t, n, e) {
    "use strict";
    function i() {
      return "fui_widget_" + c++
    }
    function o(t, n, i) {
      if ("document" === i) e(document).off(n);
      else if ("window" === i) e(window).off(n);
      else {
        var o = t.get("el");
        o.off(n, i)
      }
    }
    function r(t) {
      var n = document.documentElement;
      return e.contains ? e.contains(n, t) : !!(16 & n.compareDocumentPosition(t))
    }
    function s(t, n) {
      return t.replace(/{([^}]+)}/g,
        function(t, e) {
          for (var i, o = e.split("."), r = n; i = o.shift();) r = r === n.options ? n.get(i) : r[i];
          return u(r) ? r: ""
        })
    }
    var a = t(n, {
        options: {
          tpl: "<div></div>",
          extendTplData: null,
          container: {
            value: "body",
            getter: function(t) {
              return u(t) && (t = e(t)),
                t
            }
          },
          el: {
            getter: function(t) {
              return u(t) && (t = e(t)),
                t
            }
          }
        },
        events: null,
        init: function(t) {
          this.mixOptions(["tpl", "events"]),
            n.prototype.init.call(this, t || {}),
            this.buildElement(),
            this.bindEvent(),
            this._create()
        },
        destroy: function() {
          this.unbindEvent(),
            n.prototype.destroy.call(this)
        },
        _create: function() {},
        render: function(t) {
          t && this.set("container", t);
          var n = this.get("el"),
            e = this.get("container");
          return e && !r(n[0]) && n.appendTo(e),
            this
        },
        bindEvent: function(t) {
          t = t || this.get("events");
          for (var n in t) {
            var i = t[n];
            for (var o in i) {
              var n = s(n, this),
                r = s(o, this) + ".events-" + this.wId; !
                function(t, i) {
                  var o = function(n) {
                      h(t) ? t.call(i, n) : i[t](n)
                    },
                    s = i.get("el");
                  "" === n ? s.on(r, o) : "document" === n ? e(document).on(r, o) : "window" === n ? e(window).on(r, o) : s.on(r, n, o)
                } (i[o], this)
            }
          }
          return this
        },
        unbindEvent: function(t) {
          if (t) for (var n in t) {
            var e = t[n],
              n = s(n, this);
            for (var i in e) {
              var r = s(i, this) + ".events-" + this.wId;
              o(this, r, n)
            }
          } else {
            var r = ".events-" + this.wId;
            o(this, r)
          }
          return this
        },
        buildElement: function() {
          var t,
            n = "dynamic",
            o = this.get("tpl");
          if (this.wId = i(), u(o) ? ("." === o.charAt(0) || "#" === o.charAt(0) || "body" === o) && (t = e(o)) : t = o, t && t.length > 0 && ("SCRIPT" == t[0].nodeName.toUpperCase() ? (o = t.html(), this.set("tpl", o)) : n = "static"), this.set("renderType", n), "static" === n) this.set("el", t);
          else {
            var r = e(this.get("el"));
            if (this.handleTpl(), r && 0 !== r.length) {
              var s = this.get("container");
              s.append(e(this.get("tpl")))
            } else {
              var a = this.wId,
                o = e(this.get("tpl"));
              o.length > 1 ? o = e('<div id="' + a + '"></div>').append(o) : (a = o.attr("id") || this.wId, o.attr("id", a)),
                this.set("el", o)
            }
          }
          if (!this.get("el")) throw new Error("element is empty!")
        },
        mixOptions: function(t) {
          for (var n in t) {
            var e = t[n];
            this[e] && this.options && (this.options[e] = this[e])
          }
        },
        handleTpl: function() {}
      }),
      l = {}.toString,
      h = function(t) {
        return "[object Function]" === l.call(t)
      },
      u = function(t) {
        return "string" == typeof t
      },
      c = 0;
    return a
  });
!
  function(e) {
    var n = function(e, t) {
      return n["object" == typeof t ? "render": "compile"].apply(n, arguments)
    }; !
      function(e, n) {
        "use strict";
        e.version = "2.0.1",
          e.openTag = "<%",
          e.closeTag = "%>",
          e.isEscape = !1,
          e.isCompress = !1,
          e.parser = null,
          e.render = function(e, n) {
            var t = r(e);
            return void 0 === t ? o({
              id: e,
              name: "Render Error",
              message: "No Template"
            }) : t(n)
          },
          e.compile = function(n, r) {
            function a(t) {
              try {
                return new p(t) + ""
              } catch(i) {
                return u ? (i.id = n || r, i.name = "Render Error", i.source = r, o(i)) : e.compile(n, r, !0)(t)
              }
            }
            var c = arguments,
              u = c[2],
              s = "anonymous";
            "string" != typeof r && (u = c[1], r = c[0], n = s);
            try {
              var p = i(r, u)
            } catch(l) {
              return l.id = n || r,
                l.name = "Syntax Error",
                o(l)
            }
            return a.prototype = p.prototype,
              a.toString = function() {
                return p.toString()
              },
              n !== s && (t[n] = a),
              a
          },
          e.helper = function(n, t) {
            e.prototype[n] = t
          },
          e.onerror = function(e) {
            var t = "[template]:\n" + e.id + "\n\n[name]:\n" + e.name;
            e.message && (t += "\n\n[message]:\n" + e.message),
              e.line && (t += "\n\n[line]:\n" + e.line, t += "\n\n[source]:\n" + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, "")),
              e.temp && (t += "\n\n[temp]:\n" + e.temp),
              n.console && console.error(t)
          };
        var t = {},
          r = function(r) {
            var o = t[r];
            if (void 0 === o && "document" in n) {
              var i = document.getElementById(r);
              if (i) {
                var a = i.value || i.innerHTML;
                return e.compile(r, a.replace(/^\s*|\s*$/g, ""))
              }
            } else if (t.hasOwnProperty(r)) return o
          },
          o = function(n) {
            function t() {
              return t + ""
            }
            return e.onerror(n),
              t.toString = function() {
                return "{Template Error}"
              },
              t
          },
          i = function() {
            e.prototype = {
              $render: e.render,
              $escape: function(e) {
                return "string" == typeof e ? e.replace(/&(?![\w#]+;)|[<>"']/g,
                  function(e) {
                    return {
                      "<": "&#60;",
                      ">": "&#62;",
                      '"': "&#34;",
                      "'": "&#39;",
                      "&": "&#38;"
                    } [e]
                  }) : e
              },
              $string: function(e) {
                return "string" == typeof e || "number" == typeof e ? e: "function" == typeof e ? e() : ""
              }
            };
            var n = Array.prototype.forEach ||
                function(e, n) {
                  for (var t = this.length >>> 0, r = 0; t > r; r++) r in this && e.call(n, this[r], r, this)
                },
              t = function(e, t) {
                n.call(e, t)
              },
              r = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
              o = /\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,
              i = /[^\w$]+/g,
              a = new RegExp(["\\b" + r.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
              c = /\b\d[^,]*/g,
              u = /^,+|,+$/g,
              s = function(e) {
                return e = e.replace(o, "").replace(i, ",").replace(a, "").replace(c, "").replace(u, ""),
                  e = e ? e.split(/,+/) : []
              };
            return function(n, r) {
              function o(n) {
                return g += n.split(/\n/).length - 1,
                  e.isCompress && (n = n.replace(/[\n\r\t\s]+/g, " ")),
                  n = n.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n"),
                  n = w[1] + "'" + n + "'" + w[2],
                  n + "\n"
              }
              function i(n) {
                var t = g;
                if (l ? n = l(n) : r && (n = n.replace(/\n/g,
                  function() {
                    return g++,
                      "$line=" + g + ";"
                  })), 0 === n.indexOf("=")) {
                  var o = 0 !== n.indexOf("==");
                  if (n = n.replace(/^=*|[\s;]*$/g, ""), o && e.isEscape) {
                    var i = n.replace(/\s*\([^\)]+\)/, "");
                    m.hasOwnProperty(i) || /^(include|print)$/.test(i) || (n = "$escape($string(" + n + "))")
                  } else n = "$string(" + n + ")";
                  n = w[1] + n + w[2]
                }
                return r && (n = "$line=" + t + ";" + n),
                  a(n),
                  n + "\n"
              }
              function a(e) {
                e = s(e),
                  t(e,
                    function(e) {
                      $.hasOwnProperty(e) || (c(e), $[e] = !0)
                    })
              }
              function c(e) {
                var n;
                "print" === e ? n = x: "include" === e ? (h.$render = m.$render, n = E) : (n = "$data." + e, m.hasOwnProperty(e) && (h[e] = m[e], n = 0 === e.indexOf("$") ? "$helpers." + e: n + "===undefined?$helpers." + e + ":" + n)),
                  y += e + "=" + n + ","
              }
              var u = e.openTag,
                p = e.closeTag,
                l = e.parser,
                f = n,
                d = "",
                g = 1,
                $ = {
                  $data: !0,
                  $helpers: !0,
                  $out: !0,
                  $line: !0
                },
                m = e.prototype,
                h = {},
                y = "var $helpers=this," + (r ? "$line=0,": ""),
                v = "".trim,
                w = v ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                b = v ? "if(content!==undefined){$out+=content;return content}": "$out.push(content);",
                x = "function(content){" + b + "}",
                E = "function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);" + b + "}";
              t(f.split(u),
                function(e) {
                  e = e.split(p);
                  var n = e[0],
                    t = e[1];
                  1 === e.length ? d += o(n) : (d += i(n), t && (d += o(t)))
                }),
                f = d,
                r && (f = "try{" + f + "}catch(e){e.line=$line;throw e}"),
                f = "'use strict';" + y + w[0] + f + "return new String(" + w[3] + ")";
              try {
                var O = new Function("$data", f);
                return O.prototype = h,
                  O
              } catch(T) {
                throw T.temp = "function anonymous($data) {" + f + "}",
                  T
              }
            }
          } ()
      } (n, this),
        "function" == typeof define ? define("lofty/util/template/1.0/template", ["require", "exports", "module"],
      function(e, t, r) {
        r.exports = n
      }) : e.template = n
  } (window);
define("lofty/util/template/1.0/tplhandler", ["lofty/util/template/1.0/template", "jquery"],
  function(t, e) {
    var l = {
      process: function(l) {
        var i = this.get("extendTplData");
        if (i || l) {
          var a = e.extend(!0, {},
              l, i),
            n = this.get("tpl"),
            p = t.compile(n),
            r = p(a);
          this.set("tpl", r)
        }
      }
    };
    return l
  });
define("lofty/util/misc/2.0/misc", ["jquery"],
  function(e) {
    var t = {
      goTo: function(e, t) {
        var a = "_self";
        if (t = t || a, !this.isIE()) return window.open(e, t);
        var i = document.createElement("a"),
          o = document.body;
        i.setAttribute("href", e),
          i.setAttribute("target", t),
          i.style.display = "none",
          o.appendChild(i),
          i.click(),
          t !== a && setTimeout(function() {
            try {
              o.removeChild(i)
            } catch(e) {}
          },
          200)
      },
      isIE: function() {
        var e = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
          var t = navigator.userAgent,
            a = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
          null != a.exec(t) && (e = parseFloat(RegExp.$1))
        } else if ("Netscape" == navigator.appName) {
          var t = navigator.userAgent,
            a = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
          null != a.exec(t) && (e = parseFloat(RegExp.$1))
        }
        return - 1 !== e
      },
      isIE6: function() {
        return ! (!e.browser.msie || 6 != e.browser.version)
      },
      support: {
        JSON: "JSON" in window,
        localStorage: "localStorage" in window,
        WebSocket: "WebSocket" in window
      },
      addBgiframe: function(t) {
        if (this.isIE6()) {
          t = e.extend({
              top: "auto",
              left: "auto",
              width: "auto",
              height: "auto",
              zIndex: -1,
              opacity: 0,
              src: "about:blank"
            },
            t);
          var a = ['<iframe class="bgiframe"frameborder="0"tabindex="-1"src="', t.src, '"style="display:block;position:absolute;z-index:', t.zIndex, ";", t.opacity ? "": "filter:Alpha(Opacity='0');", "top:", "auto" == t.top ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')": t.top + "px", ";left:", "auto" == t.left ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')": t.left + "px", ";width:", "auto" == t.width ? "expression(this.parentNode.offsetWidth+'px')": t.width + "px", ";height:", "auto" == t.height ? "expression(this.parentNode.offsetHeight+'px')": t.height + "px", ';"/>'].join("");
          e(t.target).each(function() {
            var t = e(this);
            0 === t.children("iframe.bgiframe").length && this.insertBefore(e(a)[0], this.firstChild)
          })
        } else t.force && (t = e.extend({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            backgroundColor: "#FFF",
            opacity: 0
          },
          t), e(t.target).each(function() {
          var a = e(this);
          0 === a.children("div.bgiframe").length && a.prepend(e("<div>", {
            "class": "bgiframe",
            css: t
          }))
        }))
      },
      removeBgiframe: function(t) {
        e(t).each(function() {
          e(this).children(".bgiframe").remove()
        })
      },
      isAliDomain: function(e, t) {
        var a = ["tmall.com", "tmall.hk", "taobao.com", "taobaocdn.com", "tbcdn.cn", "1688.com", "alibaba.com", "aliyun.com", "alipay.com", "alisoft.com", "alimama.com", "hitao.com", "aliexpress.com", "laiwang.com", "etao.com", "kissyui.com", "95095.com", "taohua.com", "tmall.net", "tmall.com.hk", "taobao.net", "taobao.org", "alibaba-inc.com", "1688.net", "alibaba.net", "aliyun.net", "alipay.net", "alisoft.net", "alimama.net", "hitao.net", "aliexpress.net", "laiwang.net", "etao.net", "alicdn.com", "aliimg.com"];
        "undefined" != typeof t && (a = a.concat(t));
        var i = new RegExp("^http(s)?:\\/\\/[a-z0-9-\\.]*(" + a.join("|") + ")", "i");
        e += "";
        var o = e.match(i);
        return !! o
      }
    };
    return t
  });
define("lofty/ui/combobox/1.0/combobox", ["lofty/lang/class", "lofty/ui/widget/1.0/widget", "lofty/util/template/1.0/tplhandler", "jquery", "util/misc/2.0"],
  function(e, t, s, i, a) {
    "use strict";
    function l() {
      var e = this.get("itemList");
      if (i(e).is("select")) {
        var t = i(e);
        t.attr("name") && this.set("name", t.attr("name")),
          e = [],
          this.set("itemList", e);
        var s;
        i.each(t.find("option"),
          function(t, a) {
            s = {
              txt: i(a).html(),
              val: i(a).val()
            },
              i(a).attr("selected") && (s.selected = "selected"),
              e.push(s)
          }),
          t.remove()
      }
      this.get("name") && this.get("el").prepend('<input type="hidden" class="field" name="' + this.get("name") + '"></input>')
    }
    function n(e) {
      e.preventDefault();
      var t = this.get("classPrefix");
      if (this.get("el").hasClass(t + "-disabled") || (this.get("el").find("." + t + "-panel").css("display", "block"), this.get("el").addClass(t + "-show"), this.trigger("show")), !this.hasFired) {
        var s = this.get("showListener");
        if ("mouseenter" === s) {
          this.get("el").find(".trigger").on("click",
            function(e) {
              e.preventDefault()
            });
          var i = this;
          this.get("el").on("mouseleave",
            function() {
              i.get("el").hasClass(t + "-disabled") || (i.get("el").find("." + t + "-panel").css("display", "none"), i.get("el").removeClass(t + "-show"))
            })
        }
        this.hasFired = !0
      }
    }
    function r(e) {
      var t = e.target,
        s = this.get("classPrefix");
      i(t).hasClass(s + "-selected") || this.clickItem(t);
      var a = i(t).parents("." + s + "-panel");
      "none" != a.css("display") && (this.get("el").removeClass(s + "-show"), a.css("display", "none"), this.trigger("hide"))
    }
    function h(e) {
      var t = this.get("classPrefix");
      i(e.target).addClass(t + "-hover")
    }
    function d(e) {
      var t = this.get("classPrefix");
      i(e.target).removeClass(t + "-hover")
    }
    function o(e) {
      var t = this.get("classPrefix"),
        s = this,
        i = null;
      e.target !== s.get("el").find(".trigger")[0] && e.target !== s.get("el").find(".trigger .triangle-icon")[0] && e.target !== s.get("el").find(".result")[0] && e.target !== s.get("el").find(".trigger .fui-icon-16")[0] && (i = s.get("el").find("." + t + "-panel"), "none" != i.css("display") && (i.css("display", "none"), s.get("el").removeClass(t + "-show"), this.trigger("hide")))
    }
    var g = e(t, {
      options: {
        readonly: !1,
        disabled: !1,
        name: "",
        itemList: [],
        showListener: "click",
        height: 26,
        classPrefix: "fui-combobox"
      },
      _create: function() {
        this.render(),
          l.call(this),
          this.renderItemList(),
          this.on("show", this._onShow),
          this.on("hide", this._onHide)
      },
      events: {
        ".trigger,.result": {
          "{options.showListener}": n
        },
        ".{options.classPrefix}-item": {
          click: r,
          mouseenter: h,
          mouseleave: d
        },
        document: {
          click: o
        }
      },
      _onShow: function() {
        var e = this.get("classPrefix"),
          t = this.get("el").find("." + e + "-panel");
        t.attr("dataid", "combobox_" + (new Date).getTime()),
            0 == t.children(".bgiframe").length ? a.addBgiframe({
          target: "[dataid='" + t.attr("dataid") + "']",
          left: 0,
          top: 0,
          width: t.width(),
          height: t.height()
        }) : t.children(".bgiframe").show()
      },
      _onHide: function() {
        var e = this.get("classPrefix"),
          t = this.get("el").find("." + e + "-panel");
        t.children(".bgiframe").length > 0 && t.children(".bgiframe").hide()
      },
      renderItemList: function() {
        var e,
          t,
          s = this.get("itemList"),
          i = this.get("classPrefix"),
          a = [];
        for (a.push('<div class="list fd-clr"><ul>'), e = 0, t = s.length; t > e; e++) a.push('<li class="'),
          a.push(i),
          s[e].selected ? (a.push("-item "), a.push(i), a.push('-selected">'), this.setText(s[e].txt), this.setValue(s[e].val)) : a.push('-item">'),
          a.push(s[e].txt),
          a.push("</li>");
        a.push("</ul></div>"),
          this.get("el").find("." + i + "-panel").html(a.join(""))
      },
      updateItemList: function(e) {
        return this.set("itemList", e, {
          silent: !0
        }),
          this.renderItemList(),
          this
      },
      addItem: function(e, t) {
        var s = this.get("itemList");
        return t || (t = e, e = void 0),
            "undefined" != typeof e ? s.splice(e, 0, t) : s.push(t),
          this.updateItemList(s),
          this
      },
      removeItem: function(e) {
        var t = this.get("itemList");
        return t.splice(e, 1),
          this.updateItemList(t),
          this
      },
      getItemList: function() {
        return this.get("itemList")
      },
      getText: function() {
        return this.text
      },
      setText: function(e) {
        return this.get("el").find(".result").val(e),
          this.text = e,
          this
      },
      getValue: function() {
        return this.value
      },
      setValue: function(e) {
        return this.get("name") && this.get("el").find(".field").val(e),
          this.value = e,
          this
      },
      setIndex: function(e) {
        var t = this.get("classPrefix"),
          s = this.get("el"),
          i = s.find("." + t + "-item:eq(" + e + ")");
        return i.hasClass(t + "-selected") || (s.find("." + t + "-item").removeClass(t + "-selected"), i.addClass(t + "-selected"), this.setText(i.html()), this.setValue(this.get("itemList")[e].val), this.trigger("change", {
          val: this.getValue(),
          txt: this.getText()
        })),
          this
      },
      handleTpl: function() {
        var e = {
          classPrefix: this.get("classPrefix"),
          itemList: this.get("itemList"),
          readonly: this.get("readonly"),
          disabled: this.get("disabled"),
          name: this.get("name"),
          height: this.get("height")
        };
        s.process.call(this, e)
      },
      setReadonly: function(e) {
        var t = (this.get("classPrefix"), this.get("el").find(".result"));
        return e ? "readonly" !== t.attr("readonly") && t.attr("readonly", "readonly") : "readonly" === t.attr("readonly") && t.removeAttr("readonly"),
          this
      },
      setDisabled: function(e) {
        var t = this.get("classPrefix"),
          s = this.get("el").find(".result");
        return e ? "disabled" !== s.attr("disabled") && (s.attr("disabled", "disabled"), this.get("el").addClass(t + "-disabled")) : "disabled" === s.attr("disabled") && (s.removeAttr("disabled"), this.get("el").removeClass(t + "-disabled")),
          this
      },
      clickItem: function(e) {
        var t = this.get("classPrefix"),
          s = this.get("el").find("." + t + "-item");
        s.removeClass(t + "-selected"),
          i(e).addClass(t + "-selected");
        var a = s.index(e);
        this.setText(i(e).html()),
          this.setValue(this.get("itemList")[a].val),
          this.trigger("change", {
            val: this.getValue(),
            txt: this.getText()
          })
      },
      tpl: ['<div class="<%= classPrefix %><% if(height === 26){ %> <%= classPrefix %>-l <% } %><% if(disabled === true){ %> <%= classPrefix %>-disabled <% } %>">', '<input class="result" type="text" <% if(disabled === true){ %> disabled="disabled" <% } %> <% if(readonly === true){ %> readonly="readonly" <% } %> autocomplete="off">', '<a class="trigger" href="#" target="_self" hidefocus="true"><span class="fui-icon-16" style="display:none">&#xe60a;</span></a>', '<div class="<%= classPrefix %>-panel"></div>', "</div>"].join(""),
      end: 0
    });
    return g
  });
define("lofty/util/template/2.0/tplhandler", ["lofty/util/template/2.0/template", "jquery"],
  function(t, e) {
    var l = {
      process: function(l) {
        var i = this.get("extendTplData");
        if (i || l) {
          var a = e.extend(!0, {},
              l, i),
            n = this.get("tpl"),
            p = t.compile(n),
            r = p(a);
          this.set("tpl", r)
        }
      }
    };
    return l
  });
define("lofty/util/webp/1.0/webp", [],
  function() {
    var A = {},
      i = {
        isSupport: function(i, o) {
          if (o || (o = i, i = "lossy"), "function" == typeof o) {
            if (void 0 !== A[i]) return void o(A[i]);
            var c = function(c) {
              A[i] = c,
                o(c)
            };
            this._isSupport(i, c)
          }
        },
        isSupportAll: function(A, i) {
          if (i || (i = A, A = ["lossy", "lossless", "alpha", "animation"]), "function" == typeof i) for (var o = 0, c = A.length, t = !1, a = function(c) {
              if (c)++o == A.length && i(!0);
              else {
                if (t) return;
                t = !0,
                  i(!1)
              }
            },
                                                                                                            l = 0; c > l; l++) this.isSupport(A[l], a)
        },
        convertSrc: function(A, i) {
          var o = /http:\/\/(img.c.aliimg.com|img.china.alibaba.com|i00.c.aliimg.com|i01.c.aliimg.com|i02.c.aliimg.com|i03.c.aliimg.com|i04.c.aliimg.com|i05.c.aliimg.com|i06.c.aliimg.com|i07.c.aliimg.com|i08.c.aliimg.com|i09.c.aliimg.com|i10.c.aliimg.com|i11.c.aliimg.com|i12.c.aliimg.com|bimg.c.aliimg.com|i01.1688.alicdn.com|i02.1688.alicdn.com|i03.1688.alicdn.com|i04.1688.alicdn.com|i05.1688.alicdn.com)\/.*\.jpg$/i;
          if (!o.test(A)) return void i(A);
          var c = function(o) {
            i(o ? A + "_.webp": A)
          };
          this.isSupport(c)
        },
        _isSupport: function(A, i) {
          try {
            if (!window.localStorage) return void i(!1)
          } catch(c) {
            return void i(!1)
          }
          var t = "webpsupport_" + A;
          if (null !== window.localStorage.getItem(t)) {
            var a = window.localStorage.getItem(t);
            return void i("true" === a)
          }
          var l = new Image;
          l.onload = function() {
            var A = l.width > 0 && l.height > 0;
            window.localStorage.setItem(t, A.toString()),
              i(A)
          },
            l.onerror = function() {
              window.localStorage.setItem(t, "false"),
                i(!1)
            },
            l.src = "data:image/webp;base64," + o[A]
        }
      },
      o = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
      };
    return i
  });