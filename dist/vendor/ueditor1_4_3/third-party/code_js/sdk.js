/*pub-1|2013-09-16 10:28:28*/if (!this.JSON) {
	this.JSON = {}
}
(function() {
	function f(n) {
		return n < 10 ? "0" + n : n
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function(key) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-"
					+ f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate())
					+ "T" + f(this.getUTCHours()) + ":"
					+ f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds())
					+ "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
				key) {
			return this.valueOf()
		}
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, rep;
	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"'
				+ string.replace(escapable, function(a) {
					var c = meta[a];
					return typeof c === "string" ? c : "\\u"
							+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + string + '"'
	}
	function str(key, holder) {
		var i, k, v, length, mind = gap, partial, value = holder[key];
		if (value && typeof value === "object"
				&& typeof value.toJSON === "function") {
			value = value.toJSON(key)
		}
		if (typeof rep === "function") {
			value = rep.call(holder, key, value)
		}
		switch (typeof value) {
		case "string":
			return quote(value);
		case "number":
			return isFinite(value) ? String(value) : "null";
		case "boolean":
		case "null":
			return String(value);
		case "object":
			if (!value) {
				return "null"
			}
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === "[object Array]") {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || "null"
				}
				v = partial.length === 0 ? "[]" : gap ? "[\n" + gap
						+ partial.join(",\n" + gap) + "\n" + mind + "]" : "["
						+ partial.join(",") + "]";
				gap = mind;
				return v
			}
			if (rep && typeof rep === "object") {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					k = rep[i];
					if (typeof k === "string") {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": " : ":") + v)
						}
					}
				}
			} else {
				for (k in value) {
					if (Object.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": " : ":") + v)
						}
					}
				}
			}
			v = partial.length === 0 ? "{}" : gap ? "{\n" + gap
					+ partial.join(",\n" + gap) + "\n" + mind + "}" : "{"
					+ partial.join(",") + "}";
			gap = mind;
			return v
		}
	}
	if (typeof JSON.stringify !== "function") {
		JSON.stringify = function(value, replacer, space) {
			var i;
			gap = "";
			indent = "";
			if (typeof space === "number") {
				for (i = 0; i < space; i += 1) {
					indent += " "
				}
			} else {
				if (typeof space === "string") {
					indent = space
				}
			}
			rep = replacer;
			if (replacer
					&& typeof replacer !== "function"
					&& (typeof replacer !== "object" || typeof replacer.length !== "number")) {
				throw new Error("JSON.stringify")
			}
			return str("", {
				"" : value
			})
		}
	}
	if (typeof JSON.parse !== "function") {
		JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value === "object") {
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v
							} else {
								delete value[k]
							}
						}
					}
				}
				return reviver.call(holder, key, value)
			}
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a) {
					return "\\u"
							+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				})
			}
			if (/^[\],:{}\s]*$/
					.test(text
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				j = eval("(" + text + ")");
				return typeof reviver === "function" ? walk({
					"" : j
				}, "") : j
			}
			throw new SyntaxError("JSON.parse")
		}
	}
}());
(function() {
	var d = document;
	var c = (function() {
		var e = false, f = location.hash;
		if (f.indexOf("#") == 0) {
			f = f.substr(1);
			e = ("&" + f + "&").indexOf("&log=1&") > -1
		}
		return e
	})();
	window.TOP = window.TOP
			|| {
				mix : function(g, h, e) {
					for ( var f in h) {
						if (e || typeof g[f] == "undefined") {
							g[f] = h[f]
						}
					}
					return g
				},
				namespace : function(f, g, e) {
					if (typeof f == "string") {
						f = a(f)
					}
					return TOP.mix(f, g, e)
				},
				guid : function(e) {
					e = e || "t";
					return e
							+ (Math.random() * (1 << 30)).toString(16).replace(
									".", "")
				},
				log : function(f, e) {
					e = e || "log";
					if (c && (typeof console != "undefined")) {
						console[e] && console[e](f + " (" + b() + ")")
					}
				}
			};
	function a(j) {
		var k = TOP, f = j ? j.split(".") : [];
		for ( var h = 0, e = f.length; h < e; h++) {
			var g = f[h];
			if (!k[g]) {
				k[g] = {}
			}
			k = k[g]
		}
		return k
	}
	function b() {
		var f = location.pathname, e = f.lastIndexOf("/");
		if (e == -1) {
			return f
		} else {
			return f.substr(e + 1)
		}
	}
})();
(function() {
	TOP.namespace("lang", {
		forEach : function(b, a) {
			if (!b || !a) {
				return
			}
			if (b.forEach) {
				b.forEach.call(b, a)
			} else {
				for ( var d = 0, c = b.length; d < c; d++) {
					a(b[d])
				}
			}
		},
		trim : function(a) {
			return a.replace(/^\s*|\s*$/g, "")
		},
		param : function(e, b, a) {
			if ((!TOP.lang.isPlainObject(e)) && (typeof e != "string")) {
				return ""
			}
			b = b || "&";
			a = a || "=";
			if (typeof e == "string") {
				e = TOP.lang.unparam(e, b, a)
			}
			var d = [];
			for ( var c in e) {
				var f = e[c];
				if (f !== null && typeof f !== "undefined"
						&& typeof f !== "function") {
					d.push(encodeURIComponent(c) + a + encodeURIComponent(f))
				}
			}
			d.sort();
			return d.join(b)
		},
		unparam : function(g, b, a) {
			b = b || "&";
			a = a || "=";
			var f = {}, d = g.split(b), c, e;
			for (c = 0; c < d.length; c++) {
				e = TOP.lang.trim(d[c]).split(a);
				if (e && (e.length == 2)) {
					f[decodeURIComponent(e[0])] = decodeURIComponent(e[1])
				}
			}
			return f
		},
		isString : function(a) {
			return typeof a === "string"
		},
		isUndefined : function(a) {
			return typeof a === "undefined"
		},
		isFunction : function(a) {
			return typeof a === "function"
		},
		isPlainObject : function(a) {
			return a && Object.prototype.toString.call(a) === "[object Object]"
					&& "isPrototypeOf" in a
		}
	})
})();
(function() {
	var c = navigator.userAgent, e = "", a = "mobile", g = e, l = e, h, k = [
			6, 10 ], p, j, n = "{{version}}", i = "<!--[if IE " + n
			+ "]><s></s><![endif]-->", b = document.createElement("div"), q, d = {}, f = function(
			m) {
		var o = 0;
		return parseFloat(m.replace(/\./g, function() {
			return (o++ === 0) ? "." : ""
		}))
	};
	b.innerHTML = i.replace(n, "");
	q = b.getElementsByTagName("s");
	if (q.length > 0) {
		l = "ie";
		d[g = "trident"] = 0.1;
		if ((h = c.match(/Trident\/([\d.]*)/)) && h[1]) {
			d[g] = f(h[1])
		}
		for (p = k[0], j = k[1]; p <= j; p++) {
			b.innerHTML = i.replace(n, p);
			if (q.length > 0) {
				d[l] = p;
				break
			}
		}
	} else {
		if ((h = c.match(/AppleWebKit\/([\d.]*)/)) && h[1]) {
			d[g = "webkit"] = f(h[1]);
			if ((h = c.match(/Chrome\/([\d.]*)/)) && h[1]) {
				d[l = "chrome"] = f(h[1])
			} else {
				if ((h = c.match(/\/([\d.]*) Safari/)) && h[1]) {
					d[l = "safari"] = f(h[1])
				}
			}
			if (/ Mobile\//.test(c)) {
				d[a] = "apple"
			} else {
				if ((h = c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
					d[a] = h[0].toLowerCase()
				}
			}
		} else {
			if ((h = c.match(/Presto\/([\d.]*)/)) && h[1]) {
				d[g = "presto"] = f(h[1]);
				if ((h = c.match(/Opera\/([\d.]*)/)) && h[1]) {
					d[l = "opera"] = f(h[1]);
					if ((h = c.match(/Opera\/.* Version\/([\d.]*)/)) && h[1]) {
						d[l] = f(h[1])
					}
					if ((h = c.match(/Opera Mini[^;]*/)) && h) {
						d[a] = h[0].toLowerCase()
					} else {
						if ((h = c.match(/Opera Mobi[^;]*/)) && h) {
							d[a] = h[0]
						}
					}
				}
			} else {
				if ((h = c.match(/MSIE\s([^;]*)/)) && h[1]) {
					d[g = "trident"] = 0.1;
					d[l = "ie"] = f(h[1]);
					if ((h = c.match(/Trident\/([\d.]*)/)) && h[1]) {
						d[g] = f(h[1])
					}
				} else {
					if ((h = c.match(/Gecko/))) {
						d[g = "gecko"] = 0.1;
						if ((h = c.match(/rv:([\d.]*)/)) && h[1]) {
							d[g] = f(h[1])
						}
						if ((h = c.match(/Firefox\/([\d.]*)/)) && h[1]) {
							d[l = "firefox"] = f(h[1])
						}
					}
				}
			}
		}
	}
	d.core = g;
	d.shell = l;
	d._numberify = f;
	TOP.ua = d
})();
(function() {
	var g = TOP.lang;
	var f = document;
	var c = "";
	TOP.namespace("dom", {
		get : function(h, j) {
			var i = TOP.dom.query(h, j);
			if (i.length) {
				i = i[0]
			} else {
				i = null
			}
			return i
		},
		query : function(h, j) {
			if (typeof h !== "string") {
				return [ h ]
			}
			j = j || f;
			var i = [], k, l = h.substr(0, 1);
			if (l == "#") {
				var k = f.getElementById(h.substr(1));
				if (k) {
					i.push(k)
				}
			} else {
				if (l == ".") {
					i = b(h.substr(1), j)
				} else {
					i = j.getElementsByTagName(h)
				}
			}
			return i
		},
		hasClass : function(h, i) {
			var k = TOP.dom.get(h);
			if (!k) {
				return false
			}
			var j = " " + k.className + " ";
			return j.indexOf(i) > -1
		},
		addClass : function(h, i) {
			var j = TOP.dom.get(h);
			if (!j) {
				return false
			}
			if (TOP.dom.hasClass(j, i)) {
				return
			} else {
				j.className = g.trim(j.className + " " + i)
			}
		},
		removeClass : function(h, k) {
			var l = TOP.dom.get(h), i;
			if ("undefined" === k) {
				i = ""
			} else {
				var j = new RegExp("\\s*" + k + "\\s*");
				i = l.className.replace(j, "")
			}
			if (l.className !== i) {
				l.className = i
			}
		},
		addStyleSheet : function(h, j) {
			var i;
			if (j && (j = j.replace("#", c))) {
				i = TOP.dom.get("#" + j)
			}
			if (i) {
				return
			}
			i = f.createElement("style");
			if (j) {
				i.id = j
			}
			TOP.dom.get("head").appendChild(i);
			if (i.styleSheet) {
				i.styleSheet.cssText = h
			} else {
				i.appendChild(f.createTextNode(h))
			}
		},
		style : function(h, j, k) {
			var i = arguments.length;
			if (i === 2) {
				if (typeof j === "string") {
					return a(h, j)
				} else {
					return e(h, j)
				}
			}
			return e(h, j, k)
		}
	});
	var b = f.getElementsByClassName ? function(h, i) {
		return i.getElementsByClassName(h)
	} : function(i, j) {
		var h = j.getElementsByTagName("*");
		h = d(h, function(k) {
			return TOP.dom.hasClass(k, i)
		});
		return h
	};
	function a(h, i) {
		var j = TOP.dom.get(h);
		return j.style[i]
	}
	function e(h, j, m) {
		var k = TOP.dom.get(h), i = arguments.length;
		if (!k) {
			return undefined
		}
		if (i === 3) {
			k.style[j] = m;
			return undefined
		}
		for ( var n in j) {
			e(k, n, j[n])
		}
		return undefined
	}
	function d(j, m) {
		var k = [];
		for ( var l = 0, h = j.length; l < h; l++) {
			var n = j[l];
			if (m(n)) {
				k.push(n)
			}
		}
		return k
	}
})();
(function() {
	var a = TOP.log, b = TOP.lang;
	TOP.namespace("io", {
		standardxdr : function(h, d, f, c) {
			h = h || "get";
			var e = new XMLHttpRequest(), g;
			e.onreadystatechange = function() {
				if (e.readyState == 4) {
					if (e.status == 200) {
						if (g) {
							clearTimeout(g)
						}
						c && c(JSON.parse(e.responseText))
					}
				}
			};
			if (typeof f != "string") {
				f = b.param(f)
			}
			if (h.toLowerCase() == "get") {
				d = d + "?" + f;
				f = null
			}
			e.open(h, d, true);
			e.setRequestHeader("Content-type",
					"application/x-www-form-urlencoded");
			e.withCredentials = "true";
			e.send(f);
			g = setTimeout(function() {
				e.abort();
				a("xdr failure", "warning")
			}, 10000)
		}
	})
})();
(function() {
	var h = TOP.lang;
	var e = document, b = undefined, g = {};
	var f = "http://a.tbcdn.cn/apps/top/x/kio.swf", c = "top-xdr";
	function d(j, m, i) {
		if (e.body) {
			var k = '<object id="'
					+ c
					+ '" type="application/x-shockwave-flash" data="'
					+ j
					+ '" width="0" height="0" ><param name="movie" value="'
					+ j
					+ '" /><param name="FlashVars" value="yid='
					+ m
					+ "&uid="
					+ i
					+ '&host=TOP.io.flashxdr" /><param name="allowScriptAccess" value="always" /></object>';
			var l = e.createElement("div");
			l.style.position = "absolute";
			l.style.left = "1px";
			l.style.top = "1px";
			e.body.insertBefore(l, e.body.firstChild);
			l.innerHTML = k;
			d = function() {
				return
			}
		} else {
			setTimeout(function() {
				d(f, c, 1)
			}, 50)
		}
	}
	function a(m, k, l, i) {
		var j = this;
		if (!(j instanceof a)) {
			return new a(m, k, l, i)
		}
		j.method = m;
		j.url = k;
		j.params = l;
		j.cb = i;
		j.send()
	}
	a.prototype = {
		send : function() {
			var i = this;
			if (!b) {
				setTimeout(function() {
					i.send()
				}, 100);
				return
			}
			i.uid = TOP.guid();
			g[i.uid] = i;
			var j = window.location.href;
			if (j.indexOf("#") > 0) {
				j = j.substr(0, j.indexOf("#"))
			}
			b.send(i.url, {
				id : i.uid,
				uid : i.uid,
				method : i.method.toUpperCase(),
				data : h.param(i.params),
				headers : {
					"Content-type" : "application/x-www-form-urlencoded",
					"Flash-referer" : j
				}
			})
		},
		abort : function() {
			b.abort(this.uid)
		},
		_xdrResponse : function(k, l) {
			var i = this;
			var j;
			i.responseText = decodeURI(l.c.responseText);
			switch (k) {
			case "success":
				i.cb && i.cb(JSON.parse(i.responseText));
				j = {
					status : 200,
					statusText : "success"
				};
				delete g[l.id];
				break;
			case "abort":
				delete g[l.id];
				break;
			case "timeout":
			case "transport error":
			case "failure":
				j = {
					status : 500,
					statusText : k
				};
				delete g[l.id];
				break
			}
		}
	};
	a.applyTo = function(m, p, l) {
		var k = p.split(".").slice(1), o = a;
		for ( var n = 0, j = k.length; n < j; n++) {
			o = o[k[n]]
		}
		o.apply(null, l)
	};
	a.xdrReady = function() {
		b = e.getElementById(c)
	};
	a.xdrResponse = function(i, k, l) {
		var j = g[k.uid];
		j && j._xdrResponse(i, k, l)
	};
	a.init = function() {
		d(f, c, 1)
	};
	TOP.namespace("io", {
		flashxdr : a
	})
})();
(function() {
	var b = TOP.log, e = TOP.lang;
	var d = document, a = document.getElementsByTagName("head")[0];
	TOP.namespace("io", {
		getStyle : function(g) {
			var h = d.createElement("link"), f = TOP.guid();
			h.href = g;
			h.rel = "stylesheet";
			h.id = f;
			a.appendChild(h);
			return h
		},
		getScript : function(h, f) {
			var i = d.createElement("script"), g = TOP.guid();
			i.src = h;
			i.id = g;
			i.charset = "utf-8";
			f && c(i, f);
			a.appendChild(i);
			return i
		},
		jsonp : function(h, j, f) {
			var g = TOP.guid(), i = "TOP.io.jsonpCbs." + g, h = h
					+ "?callback=" + i;
			if (j) {
				h = h + "&" + e.param(j)
			}
			if (h.length > 2000) {
				b("JSONP only support a maximum of 2000 bytes of input.",
						"error");
				return
			}
			TOP.io.jsonpCbs[g] = function(k) {
				f && f(k);
				delete TOP.io.jsonpCbs[g]
			};
			TOP.io.getScript(h)
		},
		jsonpCbs : {},
		get : function(g, h, f) {
			TOP.io.xdr("get", g, h, f)
		},
		post : function(g, h, f) {
			TOP.io.xdr("post", g, h, f)
		},
		xdr : function(i, g, h, f) {
		},
		isSupportXdr : (function() {
			var f = false;
			if (typeof XMLHttpRequest != "undefined") {
				var g = new XMLHttpRequest();
				if (g && "withCredentials" in g) {
					f = true
				}
			}
			return f
		})()
	});
	function c(g, f) {
		var h = f;
		f = function() {
			h && h();
			g.parentNode.removeChild(g)
		};
		if (d.addEventListener) {
			g.addEventListener("load", f, false)
		} else {
			g.onreadystatechange = function() {
				var i = g.readyState;
				if (/loaded|complete/i.test(i)) {
					f()
				}
			}
		}
	}
	if (TOP.io.isSupportXdr) {
		TOP.io.xdr = TOP.io.standardxdr
	} else {
		TOP.io.flashxdr.init();
		TOP.io.xdr = TOP.io.flashxdr
	}
})();
(function() {
	var e = document, a = 24 * 60 * 60 * 1000, c = encodeURIComponent, d = decodeURIComponent;
	function b(f) {
		return (typeof f == "string") && f !== ""
	}
	TOP.namespace("cookie", {
		get : function(h) {
			var g, f;
			if (b(h)) {
				if ((f = String(e.cookie).match(
						new RegExp("(?:^| )" + h + "(?:(?:=([^;]*))|;|$)")))) {
					g = f[1] ? d(f[1]) : ""
				}
			}
			return g
		},
		set : function(h, m, f, i, k, j) {
			var l = String(c(m)), g = f;
			if (typeof g === "number") {
				g = new Date();
				g.setTime(g.getTime() + f * a)
			}
			if (g instanceof Date) {
				l += "; expires=" + g.toUTCString()
			}
			if (b(i)) {
				l += "; domain=" + i
			}
			if (b(k)) {
				l += "; path=" + k
			}
			if (j) {
				l += "; secure"
			}
			e.cookie = h + "=" + l
		},
		remove : function(f, g, i, h) {
			TOP.cookie.set(f, "", -1, g, i, h)
		}
	})
})();
(function() {
	var f = TOP.dom, a = TOP.fields, b = TOP.ua;
	var e = window, d = document;
	TOP.namespace("", {
		getMainDomain : function(i) {
			var i = i || location.host;
			if (i.indexOf(":") > -1) {
				i = i.split(":")[0]
			}
			var h = i.split(".");
			if (h.length <= 2) {
				return h.join(".")
			} else {
				idx = -2;
				if (" com net org ".indexOf(" " + h[h.length - 2] + " ") > -1) {
					idx = -3
				}
				return h.slice(idx).join(".")
			}
		},
		ready : function(h) {
			if (d.readyState == "complete") {
				h(TOP)
			} else {
				g.push(h)
			}
		},
		closeWindow : function(h) {
			if (!b.ie) {
				return h.close()
			} else {
				if (6 < b.ie) {
					h.location.href = "";
					h.open("", "_self", "");
					h.close()
				} else {
					h.opener = null;
					h.close()
				}
			}
		}
	});
	var g = [];
	function c() {
		var h = g;
		g = [];
		while (h.length) {
			h.shift()(TOP)
		}
	}
	(function() {
		var h = d.documentElement.doScroll;
		eventType = h ? "onreadystatechange" : "DOMContentLoaded";
		if (d.addEventListener) {
			d.addEventListener(eventType, c, false);
			e.addEventListener("load", c, false)
		} else {
			d.attachEvent(eventType, function() {
				if (d.readyState == "complete") {
					c()
				}
			});
			e.attachEvent("onload", c)
		}
	})()
})();
(function() {
	var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	TOP.namespace("base64", {
		decode : function(e) {
			var c = "";
			var m, k, h;
			var l, j, g, f;
			var d = 0;
			e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (d < e.length) {
				l = a.indexOf(e.charAt(d++));
				j = a.indexOf(e.charAt(d++));
				g = a.indexOf(e.charAt(d++));
				f = a.indexOf(e.charAt(d++));
				m = (l << 2) | (j >> 4);
				k = ((j & 15) << 4) | (g >> 2);
				h = ((g & 3) << 6) | f;
				c = c + String.fromCharCode(m);
				if (g != 64) {
					c = c + String.fromCharCode(k)
				}
				if (f != 64) {
					c = c + String.fromCharCode(h)
				}
			}
			c = b(c);
			return c
		}
	});
	function b(d) {
		var e = "";
		var f = 0;
		var g = c1 = c2 = 0;
		while (f < d.length) {
			g = d.charCodeAt(f);
			if (g < 128) {
				e += String.fromCharCode(g);
				f++
			} else {
				if ((g > 191) && (g < 224)) {
					c2 = d.charCodeAt(f + 1);
					e += String.fromCharCode(((g & 31) << 6) | (c2 & 63));
					f += 2
				} else {
					c2 = d.charCodeAt(f + 1);
					c3 = d.charCodeAt(f + 2);
					e += String.fromCharCode(((g & 15) << 12)
							| ((c2 & 63) << 6) | (c3 & 63));
					f += 3
				}
			}
		}
		return e
	}
})();
(function() {
	TOP.namespace("fields", {
		apiUrl : "http://gw.api.taobao.com/widget",
		noSignApiUrl : "https://eco.taobao.com/widget",
		authUrl : "https://oauth.taobao.com/authorize",
		ie6AuthUrl : "http://container.api.taobao.com/container",
		logoutUrl : "https://oauth.taobao.com/logoff",
		uiUrl : "http://a.tbcdn.cn/apps/top/x/ui",
		noSignUiUrl : "http://gw.api.taobao.com/widget/ui",
		xdFlashUrl : "http://a.tbcdn.cn/apps/top/x/postmsg.swf",
		swfobjectUrl : "http://a.tbcdn.cn/apps/top/x/swfobject.js",
		appKey : null,
		channelUrl : null,
		isMainFrame : (function() {
			return window == window.top
		})(),
		mainFrame : window.top,
		frameId : null,
		iframes : [],
		user : null,
		getSdkScript : function() {
			var f = ".tbcdn.cn/apps/top/x/sdk.js", b = document
					.getElementsByTagName("script"), e;
			for ( var g = b.length - 1; g >= 0; g--) {
				var d = b[g];
				var c = d && d.src && d.src.indexOf(f) >= 0;
				var h = d && d.src && d.src.indexOf("sdk.js") >= 0
						&& d.src.indexOf("daily=true") > 0;
				if (c || h) {
					e = d;
					getSdkScript = function() {
						return e
					};
					return getSdkScript()
				}
			}
			TOP.log("please use http://a.tbcdn.cn/apps/top/x/sdk.js", "error")
		}
	});
	var a = TOP.fields.getSdkScript();
	if (a && a.src && a.src.indexOf("https") > 0) {
		TOP.fields.apiUrl = "https://eco.taobao.com/widget";
		TOP.fields.uiUrl = "https://s.tbcdn.cn/apps/top/x/ui";
		TOP.fields.noSignUiUrl = "https://eco.taobao.com/widget/ui";
		TOP.fields.xdFlashUrl = "https://s.tbcdn.cn/apps/top/x/postmsg.swf";
		TOP.fields.swfobjectUrl = "https://s.tbcdn.cn/apps/top/x/swfobject.js"
	}
	if (a && a.src && a.src.indexOf("daily=true") > 0) {
		TOP.fields.apiUrl = "http://api.daily.taobao.net/widget";
		TOP.fields.noSignApiUrl = "https://eco.daily.taobao.net/widget";
		TOP.fields.authUrl = "https://oauth.daily.taobao.net/authorize";
		TOP.fields.ie6AuthUrl = "http://container.api.daily.taobao.net/container";
		TOP.fields.logoutUrl = "https://oauth.daily.taobao.net/logoff";
		TOP.fields.uiUrl = "http://www.ui.com/ui";
		TOP.fields.noSignUiUrl = "http://www.ui.com/ui"
	}
	if (window.location.href.indexOf(TOP.fields.uiUrl) == -1
			&& window.location.href.indexOf(TOP.fields.noSignUiUrl) == -1) {
		TOP.fields.isMainFrame = true
	}
})();
(function() {
	var d = TOP.log, g = TOP.dom, a = TOP.fields;
	TOP.namespace("ev", {
		add : function(p, o, n, m) {
			if (typeof p == "string") {
				var l = g.query(p);
				if (l.length) {
					for ( var k = 0, j = l.length; k < j; k++) {
						b(l[k], o, n, m)
					}
				} else {
					e(p, o, n, m)
				}
			} else {
				b(p, o, n, m)
			}
		},
		remove : function(o, n, m) {
			if (typeof o == "string") {
				var l = g.query(o);
				if (l.length) {
					for ( var k = 0, j = l.length; k < j; k++) {
						h(l[k], n, m)
					}
				} else {
					f(o, n, m)
				}
			} else {
				h(o, n, m)
			}
		},
		fire : function(o, l, m, n) {
			if (c[o] && c[o][l]) {
				var k = c[o][l];
				for ( var j = k.length - 1; j >= 0; j--) {
					k[j](m)
				}
			}
			TOP.ev.afterFire(o, l, m, n)
		},
		afterFire : function(l, i, j, k) {
		},
		stopPropagation : function(i) {
			if (!i) {
				return
			}
			if (i.stopPropagation) {
				i.stopPropagation()
			}
			i.cancelBubble = true
		},
		preventDefault : function(i) {
			if (!i) {
				return
			}
			if (i.preventDefault) {
				i.preventDefault()
			} else {
				i.returnValue = false
			}
		}
	});
	TOP.ev.on = TOP.ev.add;
	function b(m, l, k, j) {
		if (j) {
			var i = k;
			k = function(n) {
				i.call(this, n);
				h(m, l, k)
			}
		}
		window.addEventListener ? m.addEventListener(l, k, false) : m
				.attachEvent("on" + l, k)
	}
	function h(k, j, i) {
		window.addEventListener ? k.removeEventListener(j, i, false) : k
				.detachEvent("on" + j, i)
	}
	var c = {};
	function e(m, l, k, j) {
		if (j) {
			var i = k;
			k = function(n) {
				i.call(this, n);
				f(m, l, k)
			}
		}
		if (!c[m]) {
			c[m] = {}
		}
		if (!c[m][l]) {
			c[m][l] = []
		}
		c[m][l].unshift(k)
	}
	function f(o, n, m) {
		if (!c[o]) {
			return
		}
		if (!c[o][n]) {
			return
		}
		var l = c[o][n];
		for ( var k = 0, j = l.length; k < j; k++) {
			if (l[k] == m) {
				l.splice(k, 1);
				return
			}
		}
	}
})();
(function() {
	var b = TOP.ua, f = TOP.io, c = TOP.ev, e = TOP.lang, a = TOP.fields;
	TOP
			.namespace(
					"xd",
					{
						init : function() {
							if (window.postMessage && !b.ie) {
								TOP.xd.html5Init()
							} else {
								TOP.xd.flashInit()
							}
						},
						postMessage : function(g, h) {
						},
						html5Init : function() {
							TOP.xd.postMessage = function(h, i) {
								if (i && i.contentWindow
										&& i.contentWindow.postMessage) {
									i.contentWindow.postMessage(h, "*")
								} else {
									window.parent.postMessage(h, "*")
								}
							};
							c.afterFire = d;
							var g = function(i) {
								var h = i.data;
								c.fire(h.name, h.ev, h.data, i.source)
							};
							c.add(window, "message", g)
						},
						flashInit : function() {
							c.afterFire = function(j, g, h, i) {
								TOP.xd.flashPostFns.push({
									name : j,
									ev : g,
									data : h,
									fromId : "_" + a.frameId
								})
							};
							if (typeof swfobject == "undefined") {
								f.getScript(a.swfobjectUrl, TOP.xd.insertSwf)
							} else {
								TOP.xd.insertSwf()
							}
						},
						flashPostFns : [],
						insertSwf : function() {
							TOP
									.ready(function() {
										var k = a.frameId, i = document
												.createElement("div");
										i.id = "top-xd-swf-box-" + k;
										document.body.appendChild(i);
										i.style.position = "absolute";
										i.style.left = "-1000px";
										i.style.top = "-1000px";
										var g = {};
										g.jsentry = "TOP.xd.swfCb";
										g.swfid = "top-xd-swf-" + k;
										g.name = "_" + k;
										var j = {};
										j.allowscriptaccess = "always";
										var h = {};
										swfobject
												.embedSWF(
														a.xdFlashUrl,
														"top-xd-swf-box-" + k,
														"1",
														"1",
														"9.0.0",
														false,
														g,
														j,
														h,
														function(l) {
															if (!l.success) {
																alert("\u60a8\u5f53\u524d\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u5347\u7ea7\u6d4f\u89c8\u5668\u6216\u5b89\u88c5flash\u64ad\u653e\u5668\u3002");
																TOP
																		.log(
																				"widget interaction need flash player or new browser.",
																				"error");
																return
															}
															TOP.xd.swfObj = l.ref
														})
									})
						},
						swfObj : null,
						swfCb : function(h, i) {
							switch (i.type) {
							case "swfReady":
								TOP.xd.postMessage = function(k, l) {
									l = l || "_" + a.mainFrameId;
									TOP.xd.swfObj.send(k, l)
								};
								c.afterFire = d;
								if (TOP.xd.flashPostFns.length) {
									while (TOP.xd.flashPostFns.length) {
										var g = TOP.xd.flashPostFns.shift();
										TOP.xd.postMessage(g)
									}
								}
								break;
							case "message":
								var j = i.msg;
								if (j.fromId != "_" + a.frameId) {
									c.fire(j.name, j.ev, j.data, j.fromId)
								}
								break
							}
						}
					});
	function d(h, r, n, g) {
		var k = {
			name : h,
			ev : r,
			data : n,
			fromId : "_" + a.frameId
		};
		if (a.isMainFrame) {
			var q = a.iframes;
			for ( var o = q.length - 1; o >= 0; o--) {
				var m = q[o];
				if (m != g) {
					if (m.contentWindow) {
						TOP.xd.postMessage(k, m)
					} else {
						for ( var l = 0, p = q.length; l < p; l++) {
							if (q[l] == m) {
								q.splice(l, 1)
							}
						}
					}
				}
			}
		} else {
			if (!g) {
				TOP.xd.postMessage(k)
			}
		}
	}
	TOP.xd.init()
})();
(function() {
	var c = TOP.lang, b = TOP.cookie, a = TOP.ua, e = TOP.fields, h = TOP.ev, d = TOP.log;
	var i = document, j = false;
	var f = 24 * 60 * 60, g = 2 * 60;
	TOP.namespace("", {
		auth : function(l) {
			if (!e.appKey) {
				d("init() must called first.", "error");
				return
			}
			c.isFunction(l) && h.on("auth", "auth", l, true);
			if (e.isMainFrame) {
				if (j) {
					return
				}
				j = true;
				var n = {
					response_type : "token",
					redirect_uri : e.channelUrl,
					state : TOP.getMainDomain() + "." + e.appKey
				};
				var m;
				if (a.ie == 6) {
					n.appkey = e.appKey;
					m = e.ie6AuthUrl
				} else {
					n.client_id = e.appKey;
					m = e.authUrl
				}
				m = m + "?" + c.param(n);
				if (a.ie) {
					window.location = m
				} else {
					window.open(m)
				}
			} else {
				h.fire("auth", "requireAuth", {})
			}
		},
		login : function(l) {
			TOP.auth(l)
		},
		logout : function(l) {
			c.isFunction(l) && h.on("auth", "logout", l, true);
			var m = [ e.logoutUrl,
					"?client_id=${clientId}&redirect_uri=${redirectUrl}",
					"?action=logout" ].join("").replace(/\${clientId}/g,
					e.appKey).replace(/\${redirectUrl}/g, e.channelUrl);
			if (a.ie) {
				window.location = m
			} else {
				window.open(m)
			}
		}
	});
	TOP.namespace("auth", {
		isAuth : function(l, m) {
			l = c.isFunction(l) ? l : function(p) {
				if (!p) {
					TOP.auth()
				}
			};
			var n = TOP.auth.getSession();
			if (n) {
				if (m) {
					var o = l;
					l = function(p) {
						if (p.length && p.length == 3) {
							o(true)
						} else {
							o(false)
						}
					};
					k(null, l)
				} else {
					TOP.auth.isLogin(l)
				}
			} else {
				l(false)
			}
		},
		isLogin : function(l, n) {
			l = c.isFunction(l) ? l : function(p) {
				if (!p) {
					TOP.login()
				}
			};
			var m = TOP.auth.getLoginCache();
			if (typeof m == "undefined") {
				n = true
			}
			if (n) {
				var o = l;
				l = function(p) {
					if (p.length && p[0]) {
						TOP.auth.setLoginCache();
						o(true)
					} else {
						TOP.auth.setLoginCache("0");
						o(false)
					}
				};
				k(null, l)
			} else {
				l(m === "1" ? true : false)
			}
		},
		getLoginStatus : function(m, l) {
			l = l || function(n) {
				if (!n.length || !n[0]) {
					TOP.login()
				}
			};
			k(m, l)
		},
		afterAuth : function(o) {
			if (!o) {
				return
			}
			var n = o.session;
			var m = o.expireIn;
			var p = o.uid;
			var l = o.nick;
			TOP.auth.setSession(n, m);
			p && TOP.auth.afterLogin(p, l);
			h.fire("auth", "auth", {
				session : n
			});
			j = false
		},
		afterLogin : function(m, l) {
			if (!m || !l) {
				return
			}
			TOP.auth.setUser(m, l);
			TOP.auth.setLoginCache();
			h.fire("auth", "login", {
				id : m,
				nick : l
			})
		},
		afterLogout : function() {
			TOP.auth.removeUser();
			TOP.auth.removeLoginCache();
			TOP.auth.removeSession();
			h.fire("auth", "logout", {})
		},
		getLoginCache : function() {
			return b.get("_t_login")
		},
		setLoginCache : function(l) {
			if (typeof l == "undefined") {
				l = "1"
			}
			b.set("_t_login", l, g / f, TOP.getMainDomain(), "/")
		},
		removeLoginCache : function() {
			b.remove("_t_login", TOP.getMainDomain(), "/")
		},
		getSession : function() {
			return b.get("_t_session") || e.session
		},
		setSession : function(m, l) {
			if (!m) {
				return
			}
			if (m != TOP.auth.getSession() && e.isMainFrame) {
				h.fire("auth", "sessionChange", {
					session : m
				})
			}
			if (l) {
				b.set("_t_session", m, l / f, TOP.getMainDomain(), "/")
			} else {
				e.session = m
			}
		},
		removeSession : function() {
			b.remove("_t_session", TOP.getMainDomain(), "/");
			e.session = null
		},
		getUser : function() {
			return e.user
		},
		setUser : function(m, l) {
			if (!m || !l) {
				return
			}
			e.user = {
				id : m,
				nick : l
			}
		},
		removeUser : function() {
			e.user = null
		},
		getSign : function() {
			return e.sign
		},
		setSign : function(l) {
			l && (e.sign = l)
		},
		getTimestamp : function() {
			return e.timestamp
		},
		setTimestamp : function(l) {
			l && (e.timestamp = l)
		},
		getNonce : function() {
			return e.nonce
		},
		setNonce : function(l) {
			l && (e.nonce = l)
		}
	});
	function k(m, l) {
		if (!e.appKey) {
			d("init() must called first.", "error")
		}
		var n = {
			method : "taobao.widget.loginstatus.get"
		};
		m && (n.nick = m);
		TOP.api(n, l)
	}
	if (e.isMainFrame) {
		h.on(window, "focus", TOP.auth.removeLoginCache);
		h.on(window, "focus", function() {
			j = false
		});
		h.on("auth", "statusChange", function(l) {
			j = l.isAuthing
		})
	} else {
		h.on(window, "focus", function() {
			h.fire("auth", "statusChange", {
				isAuthing : false
			})
		})
	}
})();
(function() {
	var g = TOP.log, h = TOP.fields, c = TOP.lang, b = TOP.cookie, i = TOP.io, e = TOP.auth;
	var d = {};
	var l = "post", k = "get", a = "rest", j = "tql";
	TOP.namespace("", {
		api : function(r, p, w) {
			var u, m, s = arguments, n = e.getNonce() ? h.noSignApiUrl
					: h.apiUrl;
			if (s.length > 3) {
				u = s[0];
				m = s[1];
				r = s[2];
				p = s[3];
				w = s[4]
			}
			if (c.isString(r)) {
				var t = r;
				r = c.unparam(r);
				if (!r.method && !r.ql) {
					r = {
						ql : t
					}
				}
			}
			for ( var v in r) {
				var o = r[v];
				if (c.isFunction(o)) {
					delete r[v]
				}
			}
			if (!u) {
				u = r.method ? a : j
			}
			if (!m) {
				if (TOP.ua.ie) {
					m = k
				} else {
					m = l
				}
			}
			if (!c.isFunction(p)) {
				g("TOP.api: callback must be a function.", "error");
				return
			}
			if (!(r.session || w)) {
				var t = c.param(r);
				var q = p;
				p = function(y) {
					var x = y.error_response;
					if (x && (x.code === 26 || x.code === 27)) {
						TOP.auth(function() {
							if (s.length == 2) {
								TOP.api(t, q)
							} else {
								TOP.api(u, m, t, q)
							}
						})
					} else {
						if (x && x.code === 9) {
							TOP.auth(function() {
								TOP.api(u, l, t, q)
							})
						} else {
							q(y)
						}
					}
				}
			}
			var r = f(r, w);
			r._t_sys = "args=" + s.length;
			if (!r.timestamp) {
				g("TOP.api: timestamp must not be null.", "error");
				return
			}
			if (!r.sign && !r.nonce) {
				g("TOP.api: sign must not be null.", "error");
				return
			}
			if (!r.app_key) {
				g("TOP.api: app_key must not be null.", "error");
				return
			}
			if (u == a) {
				n += "/rest"
			} else {
				n += "/tql/2.0/json"
			}
			if (m == l) {
				i.post(n, r, p)
			} else {
				i.jsonp(n, r, p)
			}
		}
	});
	function f(n, m) {
		if (c.isString(n)) {
			n = c.unparam(n)
		}
		n.app_key = h.appKey;
		n.nonce = n.nonce || e.getNonce();
		if (n.nonce) {
			n.sign = undefined
		} else {
			n.sign = n.sign || e.getSign()
		}
		n.timestamp = n.timestamp || e.getTimestamp();
		if (m) {
			n.session = undefined
		} else {
			if (!n.session) {
				n.session = TOP.auth.getSession() || h.session
			}
		}
		n.partner_id = "top-sdk-js-20120801";
		return n
	}
})();
(function() {
	var b = TOP.log, d = TOP.io, a = TOP.fields, c = TOP.auth;
	TOP.namespace("", {
		ui : function(h, f, i) {
			if (!h) {
				b("name is required for ui().", "error");
				return
			}
			var g = f.guid ? f.guid : TOP.guid();
			var e = f.version ? f.version : "1.0";
			if (TOP.ui[h]) {
				var j = TOP.ui[h](g, f);
				i && i(j)
			} else {
				d.getScript(a.uiUrl + "/" + h + "/" + e + "/" + h + ".js",
						function(k) {
							var l = TOP.ui[h](g, f);
							i && i(l)
						})
			}
		}
	})
})();
(function() {
	var f = TOP.log, c = TOP.lang, a = TOP.ua, e = TOP.dom, h = TOP.ev, b = TOP.cookie, g = TOP.fields, d = TOP.auth;
	var i = document;
	var j = "auto";
	TOP
			.namespace(
					"uihelper",
					{
						iframe : function(o, m) {
							if (!o || !m || !m.url) {
								f(
										"guid and cfg.url is required in TOP.uihelper.iframe().",
										"error");
								return
							}
							var n = m.url, l = m.width, q = m.height, r = m.container;
							n = k(o, n, m);
							var p = i.createElement("iframe");
							p.src = n;
							p.frameBorder = "0";
							l && (l != j) && (p.width = l);
							q && (q != j) && (p.height = q);
							r && e.get(r).appendChild(p);
							h.add(p, "load", function() {
								if (window.postMessage && !a.ie) {
									g.iframes.push(p)
								} else {
									g.iframes.push("_" + o)
								}
							});
							TOP.uihelper.adaptFrame(o, p);
							return p
						},
						adaptFrame : function(l, m) {
							h.add(l, "resize", function(n) {
								n = c.unparam(n);
								if (n) {
									n.h && !isNaN(n.h)
											&& (m.style.height = n.h + "px");
									n.w && !isNaN(n.w)
											&& (m.style.width = n.w + "px")
								}
							})
						},
						resizeFrame : function(o, l, n) {
							var s = document.documentElement, t = r(), q = p();
							function r() {
								return s.clientWidth
							}
							function p() {
								return s.clientHeight
							}
							function m() {
								if (t != r() || q != p()) {
									t = r();
									q = p();
									var u = o ? t : null, v = l ? q : null;
									h.fire(TOP.fields.frameId, "resize", "w="
											+ u + "&h=" + v)
								}
							}
							setInterval(m, 500)
						},
						insertIframe : function(n, m, l) {
							l = l || {};
							l.url = m;
							return TOP.uihelper.iframe(n, l)
						},
						dialog : function(l) {
							if (!l) {
								l = ""
							}
							var m = confirm(l
									+ "\u767b\u9646\u7b2c\u4e09\u65b9\u5e94\u7528\u5931\u8d25\uff01\u53ef\u80fd\u662f\u56e0\u4e3a\u60a8\u6d4f\u89c8\u5668\u7684\u8bbe\u7f6e\u9650\u5236\n\u70b9\u51fb\u786e\u8ba4\u67e5\u770b\u89e3\u51b3\u65b9\u6848\n\u70b9\u51fb\u53d6\u6d88\u7ee7\u7eed\u4f7f\u7528\n");
							if (m) {
								window.location = "http://open.taobao.com/doc/detail.htm?id=101194"
							}
						}
					});
	function k(o, n, l) {
		if (n.indexOf("#") == -1) {
			n += "#"
		} else {
			n += "&"
		}
		var p = {};
		p._t_s = d.getSign();
		p._t_ts = d.getTimestamp();
		p._t_ss = d.getSession();
		p._t_id = o;
		p._t_pid = g.frameId;
		p._t_key = g.appKey;
		p._t_w = l.width && l.width == j ? 1 : 0;
		p._t_h = l.height && l.height == j ? 1 : 0;
		var m = d.getUser();
		if (m) {
			p._t_id = m.id;
			p._t_nk = m.nick
		}
		return n + c.param(p)
	}
})();
(function() {
	var d = TOP.log, a = TOP.fields, b = TOP.ua, c = TOP.uihelper;
	lang = TOP.lang;
	var f = window, e = document;
	TOP.namespace("channel", {
		transport : function() {
			TOP.channel.transport = function() {
			};
			var o = f.location.hash.substr(1) || f.location.search.substr(1);
			if (o === "action=logout") {
				TOP.channel.dispart("afterLogout");
				if (!b.ie) {
					TOP.closeWindow(f)
				}
			} else {
				var g = o.match(/state=([^&]+)/);
				var m;
				var r;
				if (g) {
					var i = g[1].lastIndexOf(".");
					m = g[1].substring(0, i);
					r = g[1].substring(i + 1)
				}
				if (m && m === TOP.getMainDomain()) {
					if (o.match(/access_token=[^&]+|top_session=[^&]+/)) {
						var k = lang.unparam(o);
						var s = {};
						if (k.top_session) {
							s.session = k.top_session;
							var h = lang.unparam(TOP.base64
									.decode(k.top_parameters));
							s.expireIn = h.expires_in;
							s.uid = h.visitor_id;
							s.nick = h.visitor_nick
						} else {
							s.session = k.access_token;
							s.expireIn = k.expires_in;
							s.uid = k.taobao_user_id;
							s.nick = k.taobao_user_nick
						}
						var p = true;
						var q = true;
						var n = function() {
							TOP.channel.dispart("afterAuth", s);
							if (!b.ie) {
								TOP.closeWindow(f)
							} else {
								window.location.hash = "auth"
							}
						};
						if (q) {
							if (TOP.lang.trim(s.session) != "") {
								a.appKey = r;
								var j = {
									method : "taobao.widget.loginstatus.get",
									sign : "JSSDK",
									session : s.session,
									timestamp : new Date().getTime()
								};
								TOP.api("rest", "get", j, function(l) {
									if (l.length && !l[0] && p) {
										c.dialog("%>_<% ")
									}
									n()
								})
							}
						} else {
							n()
						}
					} else {
						if (o.match(/error=access_denied/)) {
							TOP.channel.dispart("authReject", o)
						}
					}
				}
			}
		},
		dispart : function(h, g) {
			if (h && typeof h === "string") {
				try {
					if (!b.ie && f.opener) {
						f.opener.TOP.auth[h](g)
					} else {
						f.TOP.auth[h](g)
					}
				} catch (i) {
					d("cannot find opener or opener don't has required method",
							"error")
				}
			}
		}
	});
	TOP.channel.transport()
})();
(function() {
	var h = TOP.log, c = TOP.lang, g = TOP.dom, l = TOP.ev, e = TOP.uihelper, b = TOP.cookie, k = TOP.fields, a = TOP.ua, f = TOP.auth;
	var m = document;
	var j = f.getSession();
	TOP.namespace("", {
		init : function(p) {
			if (!p.appKey) {
				h("cfg.appKey is required in init().", "error");
				return
			}
			k.appKey = p.appKey;
			if (p.channelUrl && !a.ie) {
				k.channelUrl = p.channelUrl
			} else {
				var r = window.location.href, o = r.indexOf("#");
				k.channelUrl = o < 0 ? r : r.substring(0, o)
			}
			try {
				var q = m.createElement("img");
				q.src = "http://gm.mmstat.com/connect.6.1?appkey="
						+ TOP.fields.appKey + "&cache=" + new Date().getTime()
			} catch (s) {
				h("atpanel get error", "error")
			}
			TOP.init = function() {
				TOP.log("init() can only be called one time.", "warn");
				return
			}
		},
		autoInit : function() {
			var p = k.getSdkScript();
			if (!p) {
				return
			}
			var r = p.src, s = r.indexOf("?") + 1;
			if (s < 1) {
				return
			}
			var q = r.substring(s, r.length), o = c.unparam(q);
			if (o.appkey) {
				TOP.init({
					appKey : o.appkey,
					channelUrl : o.channel
				})
			}
		}
	});
	if (k.isMainFrame) {
		f.setSign(b.get("sign"));
		f.setTimestamp(b.get("timestamp"));
		k.frameId = TOP.guid();
		TOP.autoInit();
		n();
		l.add("auth", "requireAuth", function(o) {
			f()
		})
	} else {
		d();
		var i = g.get("#top-nonce");
		if (i) {
			f.setNonce(i.getAttribute("data"));
			f.setTimestamp(g.get("#top-timestamp").getAttribute("data"))
		}
		l.add("auth", "sessionChange", function(o) {
			f.setSession(o.session)
		})
	}
	function n() {
		var o = function() {
			var p = f.getSession();
			if (p != j) {
				j = p;
				l.fire("auth", "sessionChange", {
					session : p
				})
			}
		};
		setInterval(o, 1 * 60 * 1000)
	}
	function d() {
		var o = c.unparam(window.location.hash.substr(1));
		f.setSign(o._t_s);
		f.setTimestamp(o._t_ts);
		o._t_ss && f.setSession(o._t_ss);
		k.frameId = o._t_id;
		k.mainFrameId = o._t_pid;
		k.appKey = o._t_key;
		o._t_id && f.setUser(o._t_id, o._t_nk);
		k.topId = o._t_id
	}
})();