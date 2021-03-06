/**
 * @description NavigateList
 * @namespace NavigateList
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('NavigateList', ['BaseList', 'BaseCollection', 'BaseItem', 'Utils', 'Service', 'NavigateModel',
    'template/navigate_list', 'template/navigate_item', 'template/website_static', 'HandlebarsHelper'],
  function (require, exports, module) {
    var NavigateList, BaseList, BaseCollection, BaseItem, Utils, Service, itemTemp, listTemp, NavigateCollection,
      NavigateItem, NavigateModel, staticTemp, HandlebarsHelper;

    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    NavigateModel = require('NavigateModel');
    Utils = require('Utils');
    itemTemp = require('template/navigate_item');
    listTemp = require('template/navigate_list');
    Service = require('Service');
    staticTemp = require('template/website_static');
    HandlebarsHelper = require('HandlebarsHelper');

    NavigateCollection = BaseCollection.extend({
      url: CONST.API + '/navigator/list',
      model: NavigateModel,
      initialize: function () {
        this._initialize();
      }
    });

    NavigateItem = BaseItem.extend({
      tagName: 'li',
      className: 'cate-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .btn-delete': '_del',
        'click .btn-edit': 'editItem',
        'click .btn-display': 'setDisplay',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'change .input-sort': 'changeSort',
        'change .pro-cate-name': 'editName',
        'click .btn-publish': 'publish',
        'click .btn-seo': 'seo'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          model: NavigateModel
        });
      },
      render: function () {
        this._render();
      },
      // 页面发布
      publish: function () {
        var ctx = this;
        this.publishing = false;
        var url = CONST.DOMAIN + "/rest/static/" + app.getData('user').username + "/publish?thisPage=" +
          this.model.get('page');
        var $button = this.$('.btn-publish');

        setTimeout(function () {
          if ($button.hasClass('publishing'))return;
          if (!ctx.isStatic) {
            ctx.isStatic = true;
            $button.addClass('publishing');
            $button.html('<i class="icon-time"></i>发布中...');
            setTimeout(function () {
              $.ajax({
                type: 'post',
                url: url,
                success: function (result) {
                  ctx.isStatic = false;
                  $button.html('<i class="icon-ok"></i>完成');
                }
              });
            }, 500);
          }
        }, 500);
      },
      // seo优化
      seo: function () {
        this._dialog({
          moduleId: 'SeoDetail',
          title: 'Seo优化',
          id: this.model.get('page')
        });
      },
      // 修改名称
      editName: function () {
        var name = Est.trim(this.$(".pro-cate-name").val());
        if (Est.isEmpty(name)) return;
        this.model._saveField({
          id: this.model.get('id'),
          name: name
        }, this, { hideTip: true });
      },
      // 修改分类
      editItem: function () {
        var options = {
          title: '导航修改',
          height: 250,
          url: CONST.HOST + '/modules/website/navigate_detail.html?id=' + this.model.id
        }
        this._edit(options);
      },
      // 修改排序
      changeSort: function (e) {
        e.stopImmediatePropagation();
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model.stopCollapse = true;
        this.model._saveField({ id: this.model.get('id'), sort: sort
        }, ctx, { success: function () {
          ctx.model.set('sort', sort);
          ctx.model.stopCollapse = false;
        }, hideTip: true
        });
      },
      // 显示/隐藏
      setDisplay: function (e) {
        e.stopImmediatePropagation();
        this.model.stopCollapse = true;
        this.model.set('display', this.model.get('display') === '1' ? '0' : '1');
        this.model._saveField({
          id: this.model.get('id'),
          display: this.model.get('display')
        }, this, { // ctx须初始化initModel
          success: function () {
          },
          async: false,
          hideTip: true
        });
        this.model.stopCollapse = false;
      }
    });

    NavigateList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-category-add': 'add',
        'click .btn-batch-del': 'batchDel',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-batch-collapse': 'btachCollapse',
        'click .btn-batch-extend': 'btachExtend',
        'click .btn-static': 'staticPage'
      },
      initialize: function () {
        this._initialize({
          model: NavigateModel,
          item: NavigateItem,
          collection: NavigateCollection,
          render: '.category-ul',
          template: listTemp,

          subRender: '.node-tree',
          collapse: '.node-collapse',
          parentId: 'parentId',
          categoryId: 'navigatorId',
          rootId: 'grade',
          rootValue: 1
        });
      },
      // 导航添加
      add: function () {
        this._dialog({
          moduleId: 'NavigateDetail',
          title: '添加导航',
          onClose: function () {
            this._reload();
          }
        }, this);
      },
      // 静态化
      staticPage: function () {
        var ctx = this;
        ctx.isStatic = false;
        Service.getStaticPage()
          .then(function (result) {
            var pages = [];
            result = Est.pluck(result, 'pages');
            Est.each(result, function (item) {
              var array = [];
              Est.each(Est.arrayFromObject(item, 'sort', 'obj'), function (target) {
                var keyValue = Est.keys(target.obj)[0];
                array.push({
                  name: keyValue,
                  url: target.obj[keyValue]
                });
              });
              pages.push({
                item: array
              });
            });
            debug(pages);
            this.staticTemp = HandlebarsHelper.compile(staticTemp);
            Utils.dialog({
              id: 'staticPage',
              title: '页面静态化',
              width: 900,
              padding: 10,
              content: this.staticTemp({
                pages: pages
              })
            });
            setTimeout(function () {
              $('#static-container .static-ul li .button').click(function () {
                var $button = $(this);
                if ($button.hasClass('publishing'))return;
                if (!ctx.isStatic) {
                  ctx.isStatic = true;
                  $button.addClass('publishing');
                  $button.html('静态化中...');
                  setTimeout(function () {
                    $.ajax({
                      type: 'post',
                      url: $button.attr('data-url'),
                      success: function (result) {
                        ctx.isStatic = false;
                        $button.html('完成');
                      }
                    });
                  }, 500);
                }
              });
            }, 500);
          });
      },
      // 批量删除
      batchDel: function () {
        var ctx = this;
        this.checkboxIds = this._getCheckboxIds();
        if (this.checkboxIds.length === 0) {
          Utils.tip('请至少选择一项！')
          return;
        }
        Utils.comfirm({
          success: function () {
            $.ajax({
              type: 'POST',
              async: false,
              url: CONST.API + '/navigator/batch/del',
              data: {
                ids: ctx.checkboxIds.join(',')
              },
              success: function (result) {
                Utils.tip('删除成功');
                ctx._load();
              }
            });
          }
        });
      },
      // 收缩
      btachCollapse: function () {
        this.$('.node-tree').hide();
        this.$('.x-caret-left').removeClass('x-caret-down');
      },
      // 展开
      btachExtend: function () {
        this.$('.node-tree').show();
        this.$('.x-caret-left').addClass('x-caret-down');
        this.$('.x-caret-left-gray').removeClass('x-caret-down');
      },
      // 批量转移分类
      batchCategory: function (category) {

      },
      render: function () {
        this._render();
      }
    });

    module.exports = NavigateList;
  });