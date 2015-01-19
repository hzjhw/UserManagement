/**
 * @description MobileNavList
 * @class MobileNavList
 * @author yongjin<zjut_wyj@163.com> 2015/1/17
 */
define('MobileNavList', ['BaseList', 'BaseCollection', 'BaseService', 'HandlebarsHelper', 'BaseUtils', 'BaseItem', 'MobileNavModel', 'template/mobile_nav_list',
    'template/mobile_nav_item'],
  function (require, exports, module) {
    var MobileNavList, BaseList, BaseCollection, BaseItem, BaseService, MobileNavModel, HandlebarsHelper, BaseUtils, itemTemp, listTemp, item, collection;

    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    MobileNavModel = require('MobileNavModel');
    itemTemp = require('template/mobile_nav_item');
    listTemp = require('template/mobile_nav_list');
    BaseUtils = require('BaseUtils');
    BaseService = require('BaseService');
    HandlebarsHelper = require('HandlebarsHelper');

    collection = BaseCollection.extend({
      model: MobileNavModel,
      initialize: function () {
        this._initialize.call(this);
      },
      url: CONST.API + '/mobile/navigator/list'
    });

    item = BaseItem.extend({
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
          model: MobileNavModel
        });
      },
      publish: function () {
        var ctx = this;
        this.publishing = false;
        var url = CONST.DOMAIN + "/rest/mobileStatic/" + app.getData('user').username + "/publish?thisPage=" +
          this.model.get('page');
        var button = this.$('.btn-publish');
        if (!this.publishing) {
          this.publishing = true;
          button.html('<i class="icon-white icon-globe"></i>发布中...');
          $.ajax({
            type: 'post',
            url: url,
            async: false,
            success: function (result) {
              ctx.publishing = false;
              setTimeout(function () {
                button.html('<i class="icon-globe"></i>发布');
              }, 500);
            }
          });
        }
      },
      seo: function () {
        BaseUtils.dialog({
          title: 'Seo优化',
          url: CONST.HOST + '/common/seo/seo_mobile_detail.html?id=' +
            this.model.get('page') + '&mobile=01',
          width: 600,
          height: 250,
          button: [
            {
              value: '保存',
              callback: function () {
                this.title('正在提交..');
                this.iframeNode.contentWindow.$("#submit").click();
                // 是否执行默认的关闭操作
                return false;
              }}
          ]
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
      },
      render: function () {
        this._render.call(this);
      }
    });

    MobileNavList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-category-add': 'openAddDialog',
        'click .btn-batch-del': 'batchDel',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-batch-collapse': 'btachCollapse',
        'click .btn-batch-extend': 'btachExtend',
        'click .btn-static': 'staticPage'
      },
      initialize: function () {
        this._initialize({
          model: MobileNavModel,
          item: item,
          collection: collection,
          template: listTemp,
          render: '.category-ul',

          subRender: '.node-tree',
          collapse: '.node-collapse',
          parentId: 'parentId',
          categoryId: 'navigatorId',
          rootId: 'grade',
          rootValue: 1
        });
      }, openAddDialog: function () {
        this._detail({
          title: '导航添加',
          height: 250,
          url: CONST.HOST + '/modules/mobile/mobile_nav_detail.html?time=' + new Date().getTime()
        });
      },
      staticPage: function () {
        BaseService.getStaticPage()
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
            BaseUtils.dialog({
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
                $button.addClass('publishing');
                $button.html('静态化中...');
                setTimeout(function () {
                  $.ajax({
                    type: 'post',
                    url: $button.attr('data-url'),
                    success: function (result) {
                      $button.html('完成');
                    }
                  });
                }, 500);
              });
            }, 500);
          });
      },
      // 批量删除
      batchDel: function () {
        var ctx = this;
        if (this.checkboxIds = this._getCheckboxIds()) {
          BaseUtils.comfirm({
            success: function () {
              $.ajax({
                type: 'POST',
                async: false,
                url: CONST.API + '/navigator/batch/del',
                data: {
                  ids: ctx.checkboxIds.join(',')
                },
                success: function (result) {
                  BaseUtils.tip('删除成功');
                  ctx._load();
                }
              });
            }
          });
        }
      },
      btachCollapse: function () {
        this.$('.node-tree').hide();
        this.$('.x-caret-left').removeClass('x-caret-down');
      },
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

    module.exports = MobileNavList;
  });