define("work_app/view/layout_child_account/layout_child_account", ["lofty/lang/class", "work_app/script/core/view", "work_app/script/core/application", "work_app/view/layout_child_account/layout_child_account.art", "jquery"],
  function(t, o, c, a) {
    return t(o, {
      tagName: "layout_child_account",
      event: {},
      init: function(t) {
        t || (t = {}),
          o.prototype.init.call(this, t)
      },
      boot: function() {
        var t = this;
        o.prototype.boot.call(this),
          t.render({
            tpl: a,
            callback: function() {
              t.afterRender(),
                t.trigger("after_init")
            }
          })
      },
      afterRender: function() {}
    })
  });
define("work_app/view/global_alibar/global_alibar.art",
  function() {
    return '<div class="global_alibar"></div>'
  });
define("work_app/view/global_alibar/global_alibar", ["lofty/lang/class", "work_app/script/core/view", "require", "util/cms-vm-jsonp/1.0", "work_app/script/core/application", "work_app/view/header_applist/header_applist", "work_app/script/widget/message_dialog/message_dialog", "work_app/view/global_alibar/global_alibar.art", "jquery"],
  function(a, t, i, e, l, o, r, s) {
    return a(t, {
      tagName: "global_alibar",
      event: {
        "click:.account-msg": "showMsg"
      },
      init: function(a) {
        a || (a = {}),
          t.prototype.init.call(this, a)
      },
      boot: function() {
        var a = this;
        t.prototype.boot.call(this),
          this.msgDialog = l.create(r, {},
            this),
          this.render({
            data: [],
            tpl: s,
            callback: function() {
              a.afterRender()
            }
          })
      },
      afterRender: function() {
        var a = this;
        e.get("universal_alibar_v4",
          function(t) {
            a.el().find(".global_alibar").html(t),
              i.use("sys/alibar/1.0")
          })
      },
      showMsg: function(a) {
        a.preventDefault(),
          this.msgDialog.show({
            start: [a.pageX, a.pageY]
          })
      },
      destroy: function() {
        t.prototype.destroy.call(this)
      }
    })
  });
define("work_app/view/global_server_message/global_server_message.art",
  function() {
    return '<div class="global_server_message">\n    {{if templateId == 1}}\n        <div class="global_server_message-wrapper">\n            <div class="type1">\n                <div class="type1-close close_btn">\u5173\u95ed</div>\n                <div class="type1-pic">\n                    {{if jsonData.serviceMsgImgUrl}}\n                        <a target="_blank" href="{{jsonData.serviceMsgImgUrl}}"><img  src="{{jsonData.serviceMsgImgSrc}}"/></a>\n                    {{else}}\n                        <img  src="{{jsonData.serviceMsgImgSrc}}"/>\n                    {{/if}}\n                </div>\n                <div class="type1-content">\n                    {{if jsonData.serviceMsgContentUrl}}\n                        <a target="_blank" href="{{jsonData.serviceMsgContentUrl}}">{{#jsonData.serviceMsgContent}}</a>\n                    {{else}}\n                        {{#jsonData.serviceMsgContent}}\n                    {{/if}}\n                </div>\n                <div class="type1-btn">\n                    <a target="_blank" href="{{jsonData.serviceMsgBtnUrl}}">{{jsonData.serviceMsgBtnSrc}}</a>\n                </div>\n            </div>\n\n        </div>\n    {{else if templateId ==2 }}\n        <div class="global_server_message-wrapper">\n            <div class="type2">\n                <div class="type2-close close_btn">\u5173\u95ed</div>\n                <div class="type2-pic">\n                    {{if jsonData.serviceMsgImgUrl}}\n                        <a target="_blank" href="{{jsonData.serviceMsgImgUrl}}"><img  src="{{jsonData.serviceMsgImgSrc}}"/></a>\n                    {{else}}\n                        <img  src="{{jsonData.serviceMsgImgSrc}}"/>\n                    {{/if}}\n                </div>\n                <div class="type2-content">\n                    {{if jsonData.serviceMsgContentUrl}}\n                        <a target="_blank" href="{{jsonData.serviceMsgContentUrl}}">{{#jsonData.serviceMsgContent}}</a>\n                    {{else}}\n                        {{#jsonData.serviceMsgContent}}\n                    {{/if}}\n                </div>\n            </div>\n\n\n        </div>\n    {{else if templateId ==3}}\n        <div class="global_server_message-wrapper">\n            <div class="type3" style="width: 100%;height: 100%;z-index:2300;position: fixed;left: 0;top: 0;;">\n\n                <div class="type3-dialog" style="">\n                    <div class="type3-dialog-close close_btn">\u5173\u95ed</div>\n                    <div class="type3-dialog-pic">\n                        {{if jsonData.serviceMsgImgUrl}}\n                            <a target="_blank" href="{{jsonData.serviceMsgImgUrl}}"><img src="{{jsonData.serviceMsgImgSrc}}"/></a>\n                        {{else}}\n                            <img  src="{{jsonData.serviceMsgImgSrc}}"/>\n                        {{/if}}\n                    </div>\n                    <div class="type3-dialog-right">\n                        <div class="type3-dialog-right-content">\n                            {{if jsonData.serviceMsgContentUrl}}\n                                <a target="_blank" href="{{jsonData.serviceMsgContentUrl}}">{{#jsonData.serviceMsgContent}}</a>\n                            {{else}}\n                                {{#jsonData.serviceMsgContent}}\n                            {{/if}}\n\n                        </div>\n                        <div class="type3-dialog-right-btn">\n                            <a target="_blank" href="{{jsonData.serviceMsgBtnUrl}}">{{jsonData.serviceMsgBtnSrc}}</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="type3-overlay">\n\n            </div>\n        </div>\n    {{/if}}\n</div>'
  });
define("work_app/view/global_server_message/global_server_message", ["lofty/lang/class", "work_app/script/core/view", "work_app/action/action_message", "work_app/script/core/application", "alicn/subcookie/1.0", "work_app/view/global_server_message/global_server_message.art", "jquery"],
  function(e, o, t, r, s, a, i) {
    return e(o, {
      tagName: "global_server_message",
      event: {
        "click:.close_btn": "closeBox"
      },
      init: function(e) {
        e || (e = {}),
          o.prototype.init.call(this, e),
          this.actionMsg = r.create(t, {},
            this)
      },
      boot: function() {
        var e = this;
        return o.prototype.boot.call(this),
            "Y" != s.get("work2015_welcome_end") ? !1: void i.when(this.actionMsg.getServerMsg()).done(function(o) {
          e.renderHtmlInMemory({
            data: o,
            tpl: a,
            callback: function(o) {
              e.el().html(o)
            }
          })
        })
      },
      afterRender: function() {},
      closeBox: function() {
        this.destroy()
      },
      destroy: function() {
        o.prototype.destroy.call(this)
      }
    })
  });
define("work_app/view/slide_panel/slide_panel.art",
  function() {
    return '<div class="slide_panel">\n    <div class="slide_panel-user"><a href="http://me.1688.com/{{user.memberId}}.htm" target="_blank"><img src="{{user.memberImg}}" onerror="javascript:this.src=\'http://i01.c.aliimg.com/cms/upload/2012/305/793/397503_1921578814.png\'"/></a></div>\n    <div class="slide_panel-list">\n        {{each widget as item}}\n            <ul class="slide_panel-list-widget" data-widget_title="{{item.detailTitle}}" data-widget_name="{{item.widgetName}}" data-widget_label="\u6d4b\u8bd5\u4e0b"><img src="{{item.icon}}"/><br/>{{item.name}}</ul>\n        {{/each}}\n    </div>\n    <div class="slide_panel-other">\n        <!--<ul class="slide_panel-other-ask"><a href="http://ur.taobao.com/survey/view.htm?id=3004" target="_blank"><img src="http://img.china.alibaba.com/cms/upload/2014/180/411/2114081_790723559.png"/><br/>\u8c03\u67e5</a></ul>-->\n    </div>\n</div>'
  });
define("work_app/view/slide_panel/slide_panel", ["lofty/lang/class", "work_app/script/core/view", "work_app/action/action_mbox", "work_app/action/action_message", "work_app/script/core/application", "work_app/script/util/util_ali", "work_app/view/slide_panel/slide_panel.art", "jquery"],
  function(e, t, i, a, n, r, s, o) {
    return e(t, {
      tagName: "slide_panel",
      event: {
        "click:.slide_panel-list-widget": "callWidget"
      },
      init: function(e) {
        e || (e = {}),
          t.prototype.init.call(this, e)
      },
      boot: function() {
        var e = this;
        t.prototype.boot.call(this),
          this.actionMsg = n.create(a, {},
            this),
          this.actionMbox = n.create(i, {},
            this),
          o.when(this.actionMbox.ajaxMbox({
            postData: {
              namespace: "myAccountInfo"
            }
          }), this.actionMsg.getWorkflow()).done(function(t, i) {
            var a = {
              user: t,
              widget: i
            };
            e.render({
              data: a,
              tpl: s,
              callback: function() {
                e.afterRender()
              }
            })
          })
      },
      afterRender: function() {
        var e = this,
          t = [];
        this.el().find(".slide_panel-list-widget").each(function() {
          t.push(o(this).data("widget_name"))
        }),
          this.trigger("after_render", this),
          this.actionMsg.getWorkflowNewMarks({
            widgetNames: t.join(","),
            slide_operation: "buyList,buyerCoupon,tradeBillRecord,remarkbuyer,supplierManage2,purchasePruductManage,receiveQuotations,portalManage,saleList,myCompany,marketingPlatform,orderPost,bpsProtection,showList,sellerRefundList,opportunityBusiness,logistic,bizservice"
          }).done(function(t) {
            o.each(t,
              function(t, i) {
                1 == i && r.addBadge({
                  tgt: e.el().find('.slide_panel-list-widget[data-widget_name="' + t + '"]')
                })
              })
          })
      },
      callWidget: function(e) {
        this.actionMsg.cleanWorkflowMark(o(e.currentTarget).data("widget_name")),
          o(e.currentTarget).find(".wk_badge").remove(),
          o(e.currentTarget).hasClass("active") ? (this.trigger("close_widget"), this.el().find(".slide_panel-list-widget").removeClass("active")) : (this.el().find(".slide_panel-list-widget").removeClass("active"), o(e.currentTarget).addClass("active"), this.trigger("call_widget", o(e.currentTarget).data("widget_name"), o(e.currentTarget).data("widget_title")))
      },
      closeAllWidget: function() {
        this.el().find(".slide_panel-list-widget").removeClass("active")
      },
      destroy: function() {
        t.prototype.destroy.call(this)
      }
    })
  });
define("work_app/script/widget/slide_tools/slide_tools", ["require", "lofty/lang/class", "work_app/script/core/core", "work_app/script/core/application", "work_app/view/slide_panel/slide_panel", "sys/side/full-site-help/cn-help-v2-lofty", "jquery"],
  function(t, e, i, s, o, l, n) {
    return e(i, {
      tagName: "widgetSlideTools",
      init: function() {
        var t = this;
        this.set("el", n('<div class="slidetools isclose animated"><div class="slidetools-content"><div class="slidetools-content-close"></div><div class="slidetools-content-name"></div><div class="slidetools-content-main"></div></div><div class="slidetools-main"><div class="slidetools-main-apps"></div><div class="slidetools-main-helper">\u670d\u52a1</div><div class="slidetools-main-close"></div><div class="slidetools-main-top" style="display:none"></div></div></div>')),
          n("body").append(this.get("el")),
          n("body").on("click.slide_tools",
            function(e) {
              0 == n(e.target).closest(".slidetools").length && t.contentState(1)
            }),
          n(window).on("scroll.slide_tools",
            function() {
              n(window).scrollTop() > 600 ? t.get("el").find(".slidetools-main-top").fadeIn(100) : t.get("el").find(".slidetools-main-top").fadeOut(100)
            }),
          this.bar = s.create(o, {
            el: this.get("el").find(".slidetools-main-apps")
          }),
          this.bar.on("call_widget",
            function(e, i) {
              t.showContent(e, i)
            }),
          this.bar.on("close_widget",
            function() {
              t.contentState(1)
            }),
          this.get("el").on("click", ".slidetools-content-close",
            function() {
              t.contentState(1)
            }),
          this.get("el").on("click", ".slidetools-main-close",
            function() {
              t.state(t.get("el").hasClass("isclose") ? 2: 1)
            }),
          this.get("el").on("click", ".slidetools-main-top",
            function() {
              t.gotop()
            }),
          l.init("1"),
          this.get("el").on("click", ".slidetools-main-helper",
            function() {
              var t;
              t = s.getViewByTagname("layout_iframe") ? s.getViewByTagname("layout_iframe").get("iframe_src") : location.href,
                n("body").trigger("fullhelp_showDialog", t)
            }),
          this.state(n(window).width() > 1280 ? 2: 1),
          n(window).on("resize.slide_tools",
            function() {
              t.get("el").hasClass("contentisshow") || n(window).width() > 1280 || t.state(1)
            })
      },
      state: function(t) {
        var e = this;
        if ("button" == this.get("state") && 1 == t || "bar" == this.get("state") && 2 == t) return ! 1;
        switch (t) {
          case 1:
            this.set("state", "button"),
              s.mediator.publish("slide_tool-state", "button"),
              this.get("el").animate({
                  right: "-50px"
                },
                function() {
                  e.get("el").addClass("isclose"),
                    e.contentState(1),
                    e.get("el").animate({
                      right: "0px"
                    })
                });
            break;
          case 2:
            this.set("state", "bar"),
              s.mediator.publish("slide_tool-state", "bar"),
              this.get("el").animate({
                  right: "-50px"
                },
                function() {
                  e.get("el").removeClass("isclose"),
                    e.get("el").animate({
                      right: "0px"
                    })
                })
        }
      },
      contentState: function(t) {
        var e = this;
        switch (t) {
          case 1:
            e.get("el").removeClass("contentisshow"),
              e.bar.closeAllWidget();
            break;
          case 2:
            e.get("el").addClass("contentisshow")
        }
      },
      showContent: function(e, i) {
        this.contentState(2),
          this.get("el").find(".slidetools-content-name").html(i);
        var o = this;
        o.currentWidget && s.destroy(o.currentWidget),
          t.use("work_widget/" + e,
            function(t) {
              o.currentWidget = s.create(t, {
                  el: o.get("el").find(".slidetools-content-main")
                },
                o)
            })
      },
      gotop: function() {
        var t = function() {
            this.v = n(window).scrollTop()
          },
          e = new t;
        n(e).animate({
            v: 0
          },
          {
            step: function() {
              n(window).scrollTop(e.v)
            },
            duration: 500
          })
      },
      destroy: function() {
        n(window).off("resize.slide_tools"),
          n(document).off("scroll.slide_tools"),
          n(document).off("click.slide_tools"),
          _this.get("el").remove(),
          i.prototype.destroy.call(this)
      }
    })
  });
define("work_app/view/layout_global/layout_global.art",
  function() {
    return '<div class="layout_global">\n    <div class="layout_global-alibar"></div>\n    <div class="layout_global-header"></div>\n    <div class="layout_global-body">\n        <!--<div class="layout_global-body-nav">\u5de6\u4fa7\u83dc\u5355</div>-->\n        <div class="layout_global-body-content"></div>\n        <div class="layout_global-body-clearfloat"></div>\n    </div>\n\n    <div class="layout_global-test_popup"></div>\n    <div class="layout_global-server_message"></div>\n    <div class="layout_global-old"><a href="{{old_url}}?tracelog=work2015_ToOld"><img src="http://img.china.alibaba.com/cms/upload/2014/462/890/2098264_790723559.png"/></a></div>\n</div>'
  });
define("work_app/view/layout_global/layout_global", ["lofty/lang/class", "work_app/script/core/view", "work_app/script/core/application", "require", "work_app/action/action_app", "work_app/view/global_header/global_header", "work_app/view/layout_home/layout_home", "work_app/view/layout_purchase/layout_purchase", "work_app/view/layout_wholesale/layout_wholesale", "work_app/view/layout_sale/layout_sale", "work_app/view/layout_app_search/layout_app_search", "work_app/view/layout_app/layout_app", "work_app/view/layout_iframe/layout_iframe", "work_app/view/layout_child_account/layout_child_account", "work_app/view/global_alibar/global_alibar", "work_app/view/global_server_message/global_server_message", "work_app/script/widget/slide_tools/slide_tools", "work_app/view/layout_global/layout_global.art", "jquery"],
  function(e, a, t, o, l, r, i, p, c, _, n, s, h, u, d, y, w, f) {
    return e(a, {
      tagName: "layout_global",
      event: {},
      init: function(e) {
        e || (e = {}),
          a.prototype.init.call(this, e)
      },
      boot: function() {
        var e = this;
        a.prototype.boot.call(this),
          this.actionApp = t.create(l, {},
            this),
          this.render({
            tpl: f,
            data: {
              old_url: t.config.WORK_SERVER + "home/switch_version.html"
            },
            callback: function() {
              e.afterRender()
            }
          })
      },
      afterRender: function() {
        var e = this;
        this.header = t.create(r, {
            el: e.el().find(".layout_global-header"),
            place_holder: "layout_global-place_holder_header",
            callback: function() {}
          },
          this),
          this.slideTools = t.create(w, {},
            this),
          this.alibar = t.create(d, {
              el: e.el().find(".layout_global-alibar"),
              place_holder: "layout_global-place_holder_alibar",
              callback: function() {}
            },
            this);
        t.create(y, {
            el: e.el().find(".layout_global-server_message"),
            place_holder: "layout_global--place_holder_server_msg"
          },
          this);
        this.header.on("after_init",
          function() {
            e.trigger("after_init")
          })
      },
      refreshLayout: function(e) {
        var a = this;
        if (this.currentView && t.destroy(this.currentView), e.iframe_src) this.currentView = t.create(h, {
            el: this.el().find(".layout_global-body-content"),
            appCode: e.appCode,
            menuCode: e.menuCode,
            iframe_src: e.iframe_src,
            place_holder: "layout_global-place_holder_page"
          },
          this);
        else {
          var o = {
            el: this.el().find(".layout_global-body-content"),
            appCode: e.appCode,
            menuCode: e.menuCode,
            place_holder: "layout_global-place_holder_page"
          };
          "home" == e.appCode ? this.currentView = t.create(i, o, this) : "app" == e.appCode ? this.currentView = t.create(s, o, this) : "app_manage" == e.appCode ? (this.currentView = t.create(s, o, this), this.currentView.on("after_init",
            function() {
              a.currentView.editMode(1)
            })) : "purchase" == e.appCode ? this.currentView = t.create(p, o, this) : "wholesale" == e.appCode ? this.currentView = t.create(c, o, this) : "sale" == e.appCode ? this.currentView = t.create(_, o, this) : "child_account" == e.appCode && (this.currentView = t.create(u, o, this))
        }
        WorkApplication.mediator.publish("after_refresh_layout"),
          this.header.activeChannelByMenuListId(e.appCode)
      },
      loadSearchLayout: function(e) {
        this.currentView && t.destroy(this.currentView),
          this.currentView = t.create(n, {
              el: this.el().find(".layout_global-body-content"),
              key: e
            },
            this)
      },
      loadAppLayout: function(e) {
        var a = this;
        this.currentView && t.destroy(this.currentView),
          e.iframe_src ? this.currentView = t.create(h, {
              el: this.el().find(".layout_global-body-content"),
              appCode: e.appCode,
              menuCode: e.menuCode,
              iframe_src: e.iframe_src,
              place_holder: "layout_global-place_holder_page"
            },
            this) : this.actionApp.getAppInfo(e.appCode, e.menuCode).done(function(o) {
            a.currentView = t.create(h, {
                el: a.el().find(".layout_global-body-content"),
                appCode: e.appCode,
                menuCode: e.menuCode,
                iframe_src: o.url,
                place_holder: "layout_global-place_holder_page"
              },
              a)
          }),
          WorkApplication.mediator.publish("after_refresh_layout"),
          this.header.activeChannelByMenuListId(e.appCode)
      },
      destroy: function() {
        a.prototype.destroy.call(this)
      }
    })
  });
define(["lofty/lang/class", "work_app/script/core/application", "work_app/script/core/router", "work_app/view/layout_global/layout_global", "work_app/script/util/util_misc", "jquery"],
  function(o, e, a, t, r) {
    var n = e.create(t, {
        el: "#body"
      }),
      p = e.create(a);
    p.router = {
      search: function(o) {
        n.loadSearchLayout(decodeURIComponent(o[0]))
      },
      nav: function(o) {
        n.refreshLayout({
          appCode: o[0],
          menuCode: o[1]
        })
      },
      app: function(o) {
        n.loadAppLayout({
          appCode: o[0],
          menuCode: o[1],
          iframe_src: o[2]
        })
      }
    },
      n.on("after_init",
        function() {
          p.navigate("" != r.urlResolve().hash ? r.urlResolve().hash: "#nav/home")
        }),
      document.title = "\u6211\u7684\u963f\u91cc\uff0c\u4f01\u4e1a\u5de5\u4f5c\u5e73\u53f0\uff0c\u4e13\u4e1a\u3001\u667a\u80fd\u3001\u9ad8\u6548\uff0c1688.com"
  });