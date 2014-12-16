/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('MemberAttributes', ['jquery', 'MemberModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/member_category','template/member_list','template/member_rank','template/member_attribute'],
  function (require, exports, module) {
    var MemberModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberCategory, Memberlist
      , MemberList, MemberRank, MemberAttribute
      , memberCategory, memberList, memberRank,memberAttribute;

    MemberModel = require('MemberModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    //三分类
    memberCategory = require('template/member_category');
    memberList = require('template/member_list');
    memberRank = require('template/member_rank');
    memberAttribute = require('template/member_attribute');

    /**
     * 集合类
     */
    MemberAttribute = BaseCollection.extend({
      url: CONST.API + '/member/attr/list',
      model: MemberModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    ProductItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'change .input-sort': '_saveSort',
        'click .btn-display': 'setDisplay',
        'click .name': 'editName',
        'click .prodtype': 'editProdtype',
        'change .pro-category': 'changeCategory'
      },
      // 初始化
      initialize: function () {
        if (!app.getData('productCategory')) {
          BaseUtils.getProductCategory({ extend: true, select: true
          }).then(function (list) {
            app.setData('productCategory', list);
          })
        }
        this.model.set('productCategoryList', app.getData('productCategory'));
        this._initialize({
          template: itemTemp,
          viewId: 'productList',
          detail: CONST.HOST + '/modules/product/product_detail.html'
        });
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      // 修改分类
      changeCategory: function () {
        var ctx = this;
        var category = this.$('.pro-category').val();
        this.model._saveField({
          id: this.model.get('id'),
          category: category
        }, ctx, {success: function () {
          ctx.model.set('category', category);
        }});
      },
      // 修改名称
      editName: function () {
        this._editField({
          target: '.pro-list-name',
          title: '修改名称',
          field: 'name'
        });
      },
      // 修改型号
      editProdtype: function () {
        this._editField({
          target: '.pro-list-prodtype',
          title: '修改型号',
          field: 'prodtype'
        });
      }
    });
    /**
     * 列表视图
     */
    MemberAttributes = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .product-add': '_detail',
        'click .btn-search': 'search',
        'click .search-advance': 'searchAdvance',
        'click .btn-batch-display': 'batchDisplay',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-tool-sort': 'proSort'
      },
      initialize: function () {
        this._initialize({
          render: '#product-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: ProductModel,
          collection: ProductCollection,
          item: ProductItem,
          detail: CONST.HOST + '/modules/product/product_detail.html'
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'name', value: this.searchKey }
            ]
          });
        }
      },
      // 排序
      proSort: function () {
        var ctx = this;
        this.sortTemp = HandlebarsHelper.compile(sortTemp);
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.sortDialog = dialog({
            id: 'sort-dialog',
            title: '产品排序',
            width: 300,
            content: ctx.sortTemp({}),
            button: [
              {
                value: '确定',
                callback: function () {
                  ctx.sortType = $('select[name=sortCategory]').val();
                  $.ajax({
                    type: 'POST',
                    async: false,
                    url: CONST.DOMAIN + '/user_v2/product',
                    data: {
                      sortType: ctx.sortType
                    },
                    success: function (result) {
                      BaseUtils.tip('产品排序成功');
                      ctx._load();
                    }
                  });
                  this.remove();
                  return false;
                },
                autofocus: true
              },
              { value: '关闭' }
            ]
          }).show(this.$('.btn-tool-sort').get(0));
        })
      }
    });

    module.exports = MemberAttributes;
  });