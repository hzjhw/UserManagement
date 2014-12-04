/**
 * @description 基础列表视图
 * @namespace BaseList
 * @author yongjin<zjut_wyj@163.com> 2014/11/12
 */

define('BaseList', ['jquery', 'underscore', 'backbone', 'Est'],
  function (require, exports, module) {
    var BaseList, Backbone, Est;

    Backbone = require('backbone');
    Est = require('Est');

    BaseList = Backbone.View.extend({
      /**
       * 初始化
       *
       * @method [protected] - _initialize
       * @param options
       * @returns {ln.promise}
       * @private
       * @author wyj 14.11.20
       * @example
       *    var options = {
          render: '#product-list-ul',
          template: listTemp,
          model: ProductModel,
          collection: ProductCollection,
          item: ProductItem
        }
       this._initialize(options).then(function (context) {
          context._initPagination(options);
          context._load({
              beforeLoad: funciton(){
                this.setCategoryId(options.categoryId);
              }
          });
        });
       */
      _initialize: function(options){
        return this._initCollection(options.collection, options);
      },
      /**
       * 初始化集合类
       *
       * @method [protected] - _initCollection
       * @param collection 对应的collection集合类， 如ProductCollection
       * @param options [beforeLoad: 加载数据前执行] [item: 集合单个视图] [model: 模型类]
       * @returns {ln.promise} 返回promise对象
       * @author wyj 14.11.16
       * @example
       *       this._initCollection(ProductCollection, {
                  template: viewTemp,
                  render: '#product-list-ul',
                  item: ProductItem, // item
                  model: ProductModel // model,
                  beforeLoad: function(){ // 加载数据前执行
                    this.setCategoryId(options.categoryId); // this 指向collection
                  }
               }).then(function (options) {
                  ctx.initPagination(options); // pagination init
                  ctx.load(options); // data load
              });
       */
      _initCollection: function (collection, options) {
        debug('1.ProductView._initialize');
        var options = options || {};
        var ctx = this;
        this.dx = 0;
        this.views = [];
        this.$el.empty();
        if (options.template)
          this.$el.append($(options.template));
        this._data = options.data;
        this.list = options.render ? $(options.render) : this.$el;
        this.allCheckbox = this.$('#toggle-all')[0];
        if (!this.collection){
          this.collection = new collection();
          this.listenTo(this.collection, 'change:checked', this.checkSelect);
          //this.collection.on('moveUp', this.collection._moveUp);
          //this.collection.on('moveDown', this.collection._moveDown);
        }
        this._initBind();
        this._initItemView(options.item, this);
        this._initModel(options.model);
        return new Est.promise(function (resolve) {
          resolve(ctx);
        });
      },
      /**
       * 初始化分页
       *
       * @method [private] - _initPagination
       * @param options
       * @author wyj 14.11.17
       */
      _initPagination: function (options) {
        var ctx = this;
        if (ctx.collection && ctx.collection.paginationModel){
          ctx.collection.paginationModel.on('reloadList', function (model) {
            ctx._load.call(ctx, options, model);
          });
        }
      },
      /**
       * 获取集合数据
       *
       * @method [protected] - _load
       * @param model
       * @author wyj 14.11.16
       */
      _load: function (options, model) {
        var ctx = this;
        return new Est.promise(function (resolve, reject) {
          if (options.beforeLoad)
            options.beforeLoad.call(ctx.collection);
          if (ctx.collection.url) {
            ctx.collection._load(ctx.collection, ctx, model).then(function (result) {
                resolve(result);
            });
          }
        });
      },
      /**
       * 绑定事件， 如果添加事件， 重置事件
       * @method [private] - _initBind
       * @author wyj 14.11.16
       */
      _initBind: function () {
        if (this.collection){
          this.collection.bind('add', this._addOne, this);
          this.collection.bind('reset', this._render, this);
        }
      },
      /**
       * 渲染视图
       *
       * @method [protected] - _render
       * @author wyj 14.11.16
       */
      _render: function () {
        debug('BaseList.render');
        this._addAll();
      },
      /**
       * 初始化单个枚举视图
       *
       * @method [private] - _initItemView
       * @param itemView
       * @author wyj 14.11.16
       */
      _initItemView: function (itemView) {
        this.item = itemView;
      },
      /**
       * 初始化模型类, 设置index索引
       *
       * @method [private] - _initModel
       * @param model
       * @author wyj 14.11.20
       */
      _initModel: function(model){
        this.initModel = model;
      },
      /**
       * 清空列表， 并移除所有绑定的事件
       *
       * @method [protected] - _empty
       * @author wyj 14.11.16
       */
      _empty: function () {
        debug('5.ProductView._empty');
        if (this.collection){
          var len = this.collection.length;
          while (len > -1){
            this.collection.remove(this.collection[len]);
            len--;
          }
        }
        // 设置当前页的起始索引， 如每页显示20条，第2页为20
        if (this.collection.paginationModel){
          this.dx = this.collection.paginationModel.get('pageSize') *
            (this.collection.paginationModel.get('page') -1);
        }
        //遍历views数组，并对每个view调用Backbone的remove
        Est.each(this.views,function(view){
          view.remove().off();
        })
        //清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
        //垃圾回收器会回收它们
        this.views =[];
        //this.list.empty();
      },
      /**
       * 向视图添加元素
       *
       * @method [private] - _addOne
       * @param target
       * @author wyj 14.11.16
       */
      _addOne: function (target) {
        target.set('dx', this.dx++);
        var itemView = new this.item({
          model: target,
          data: this._data
        });
        itemView._setInitModel(this.initModel);
        itemView._onBeforeRender();
        this.list.append(itemView._render().el);
        itemView._onAfterRender();
        this.views.push(itemView);
      },
      /**
       * 添加所有元素， 相当于刷新视图
       *
       * @method [private] - _addAll
       * @author wyj 14.11.16
       */
      _addAll: function () {
        debug('ProductView._addAll');
        this._empty();
        this.collection.each(this._addOne, this);
      },
      /**
       * 弹出查看详细信息对话框
       *
       * @method [protected] - _detail
       * @param options
       * @author wyj 14.11.16
       * @example
       *    this._detail({
              title: '产品添加',
              url: CONST.HOST + '/modules/product/product_detail.html?time=' + new Date().getTime()
            });
       */
      _detail: function (options) {
        debug('1.BaseList._detail');
        var ctx = this;
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          window.detailDialog = dialog({
            id: 'detail-dialog',
            title: options.title || '详细信息',
            width: 850,
            url: options.url || '',
            button: [
              {
                value: '保存',
                callback: function () {
                  this.title('正在提交..');
                  this.iframeNode.contentWindow.$("#submit").click();
                  return false;
                },
                autofocus: true
              },
              {
                value: '重置',
                callback: function () {
                  this.iframeNode.contentWindow.$("#reset").click();
                  return false;
                }
              },
              { value: '关闭' }
            ],
            oniframeload: function () {
              this.iframeNode.contentWindow.detailDialog = window.detailDialog;
            },
            onclose: function () {
              ctx.collection._load(ctx.collection, ctx).
                then(function () {
                  ctx._render();
                });
              this.remove();
              if (this.returnValue) {
                $('#value').html(this.returnValue);
              }
            }
          });
          window.detailDialog.showModal();
        });
      },
      /**
       * 全选checkbox选择框
       *
       * @method [protected] - _toggleAllChecked
       * @author wyj 14.11.16
       */
      _toggleAllChecked: function () {
        var checked = this.allCheckbox.checked;
        this.collection.each(function (product) {
          product.set('checked', checked);
        });
      }
    });

    module.exports = BaseList;

  });