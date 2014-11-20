/**
 * @description BaseList
 * @namespace BaseList
 * @author yongjin on 2014/11/12
 */

define('BaseList', ['jquery', 'underscore', 'backbone', 'Est'],
  function (require, exports, module) {
    var BaseList, Backbone, Est;

    Backbone = require('backbone');
    Est = require('Est');

    BaseList = Backbone.View.extend({
      /**
       * 初始化视图
       *
       * @method [public] - initView
       * @param options
       * @author wyj 14.11.17
       * @example
       *      this.initView({
                    viewTemp: viewTemp,
                    collectionId: '#product-list-ul'
                });
       */
      initView: function (options) {
        this.$el.empty();
        this.$el.append($(options.viewTemp));
        this.list = $(options.collectionId, this.$el);
      },
      /**
       * 初始化集合类
       *
       * @method [public] - initCollection
       * @param collection 对应的collection集合类， 如ProductCollection
       * @param itemView 对应的单个视图， 如ProductItem
       * @param ctx 上下文
       * @param options [beforeLoad: 加载数据前执行] [item: 集合单个视图] [model: 模型类]
       * @returns {ln.promise} 返回promise对象
       * @author wyj 14.11.16
       * @example
       *       this.initCollection(ProductCollection, {
       *          template: viewTemp,
       *          render: '#product-list-ul',
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
      initCollection: function (collection, options) {
        console.log('1.ProductView.initialize');
        var options = options || {};
        this.dx = 0;
        this.views = [];
        this.$el.empty();
        if (options.template)
          this.$el.append($(options.template));
        this.list = options.render ? $(options.render, this.$el) : this.$el;
        this.allCheckbox = this.$('#toggle-all')[0];
        this.collection = new collection();
        this.listenTo(this.collection, 'change:checked', this.checkSelect);
        this.initBind();
        this.initItemView(options.item, this);
        this.initModel(options.model);
        return new Est.promise(function (resolve) {
          resolve(options);
        });
      },
      /**
       * 初始化分页
       *
       * @method [public] - initPagination
       * @param options
       * @author wyj 14.11.17
       */
      initPagination: function (options) {
        var ctx = this;
        ctx.collection.paginationModel.on('reloadList', function (model) {
          ctx.load.call(ctx, options, model);
        });
      },
      /**
       * 获取集合数据
       *
       * @method [public] - load
       * @param model
       * @author wyj 14.11.16
       */
      load: function (options, model) {
        var ctx = this;
        return new Est.promise(function (resolve, reject) {
          if (options.beforeLoad) {
            options.beforeLoad.call(ctx.collection);
          }
          if (ctx.collection.url) {
            ctx.collection.load(ctx.collection, ctx, model)
              .then(function (result) {
                resolve(result);
              });
          }
        });
      },
      /**
       * 绑定事件， 如果添加事件， 重置事件
       * @method [public] - initBind
       * @author wyj 14.11.16
       */
      initBind: function () {
        this.collection.bind('add', this.addOne, this);
        this.collection.bind('reset', this.render, this);
      },
      /**
       * 渲染视图
       *
       * @method [public] - render
       * @author wyj 14.11.16
       */
      render: function () {
        console.log('BaseList.render');
        this.addAll();
      },
      /**
       * 初始化单个枚举视图
       *
       * @method [public] - initItemView
       * @param itemView
       * @author wyj 14.11.16
       */
      initItemView: function (itemView) {
        this.item = itemView;
      },
      /**
       * 初始化模型类
       *
       * @method [protected] - initModel
       * @param model
       * @author wyj 14.11.20
       */
      initModel: function(model){
        this.initModel = model;
      },
      /**
       * 清空列表， 并移除所有绑定的事件
       *
       * @method [public] - empty
       * @author wyj 14.11.16
       */
      empty: function () {
        console.log('5.ProductView.empty');
        if (this.collection){
          var len = this.collection.length;
          while (len > -1){
            this.collection.remove(this.collection[len]);
            len--;
          }
        }
        this.dx = this.collection.paginationModel.get('pageSize') *
          (this.collection.paginationModel.get('page') -1);
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
       * @method [public] - addOne
       * @param target
       * @author wyj 14.11.16
       */
      addOne: function (target) {
        target.set('dx', this.dx++);
        var itemView = new this.item({
          model: target
        });
        itemView.setInitModel(this.initModel);
        this.list.append(itemView.render().$el);
        this.views.push(itemView);
      },
      /**
       * 添加所有元素， 相当于刷新视图
       *
       * @method [public] - addAll
       * @author wyj 14.11.16
       */
      addAll: function () {
        console.log('ProductView.addAll');
        this.empty();
        this.collection.each(this.addOne, this);
      },
      /**
       * 弹出查看详细信息对话框
       *
       * @method [public] - detail
       * @param options
       * @author wyj 14.11.16
       */
      detail: function (options) {
        console.log('1.ProductView.openAddDialog');
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
              ctx.collection.load(ctx.collection, ctx).
                then(function () {
                  ctx.render();
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
       * @method [public] - toggleAllChecked
       * @author wyj 14.11.16
       */
      toggleAllChecked: function () {
        var checked = this.allCheckbox.checked;
        this.collection.each(function (product) {
          product.set('checked', checked);
        });
      }
    });

    module.exports = BaseList;

  });