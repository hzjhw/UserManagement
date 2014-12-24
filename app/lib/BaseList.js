/**
 * @description 基础列表视图
 *
 *  - el 目标元素Id， 如 "#jhw-main"
 *  - events: {
 *        'click #toggle-all': '_toggleAllChecked', // 选择框
 *        'click .btn-batch-del': '_batchDel', // 批量删除
 *        'click .product-add': '_detail' // 添加页面
 *      }
 *  - initialize 实现父类_initialize
 *  - 实例化
 *        app.setView('productList', new ProductList({
 *          viewId: 'productList',
 *          items: [],
 *          args: {} // 传递给item中的附加对象  handlebars: {{_options._args.msgId}}
 *        }));
 *
 * @class BaseList - 列表视图
 * @author yongjin<zjut_wyj@163.com> 2014/11/12
 */

define('BaseList', ['jquery', 'underscore', 'backbone', 'BaseUtils', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseList, Backbone, BaseUtils, HandlebarsHelper;

    Backbone = require('backbone');
    BaseUtils = require('BaseUtils');
    HandlebarsHelper = require('HandlebarsHelper');

    BaseList = Backbone.View.extend({
      /**
       * 传递options进来
       *
       * @method [private] - constructor
       * @param options
       * @author wyj 14.12.16
       */
      constructor: function (options) {
        this.options = options || {};
        Backbone.View.apply(this, arguments);
      },
      /**
       * 初始化
       *
       * @method [override] - _initialize
       * @param options
       * @author wyj 14.11.20
       * @example
       *      this._initialize({
       *        viewId: '', viewId  视图身份标识， 以供上移下移等更多功能使用
       *        template: 字符串模板,
       *        render: 插入列表的元素选择符,
       *        model: 模型类,
       *        collection: 集合,
       *        item: this.options.items || [], //单视图
       *        // 以下为可选
       *        items: [](可选， 当无需url请求时), items可为function形式传递
       *        data: {}, // 附加的数据 此数据在BaseList BaseItem视图中可以获取  其中BaseList中为{{name}} ;  BaseItem中为{{_options._data.name}}
       *        checkAppend: false, // 鼠标点击checkbox， checkbox是否追加
       *        enterRender: (可选) 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
       *        pagination: true, // 是否显示分页
       *        detail: 添加页面url地址
       *        filter: [ {key: 'name', value: this.searchKey }] // 过滤结果
       *        // 以下为树型列表时 需要的参数(注意， 集合类继承BaseComposite)
       *        subRender: '.node-tree', // 下级分类的容器选择符
       *        collapse: '.node-collapse' 展开/收缩元素选择符
       *        parentId: 'belongId', // 分类 的父类ID
       *        categoryId: 'categoryId', // 分类 的当前ID
       *        parentValue: '/' // 父分类的parentId值
       *        extend: true // false收缩 true为展开
       *       }).then(function (thisCtx) {
       *        thisCtx._initPagination(options);
       *        thisCtx._load({
       *          beforeLoad: function(collection){
       *            this.setCategoryId(options.categoryId);
       *          }
       *        });
       *      });
       */
      _initialize: function (options) {
        return this._initCollection(options.collection, options);
      },
      /**
       * 初始化集合类
       *
       * @method [private] - _initCollection
       * @param collection 对应的collection集合类， 如ProductCollection
       * @param options [beforeLoad: 加载数据前执行] [item: 集合单个视图] [model: 模型类]
       * @return {ln.promise} 返回promise对象
       * @author wyj 14.11.16
       */
      _initCollection: function (collection, options) {
        debug('1.ProductView._initialize');
        this._options = options || {};
        var ctx = this;
        this.dx = 0;
        var $q = Est.promise;
        this.views = [];
        this.$el.empty();
        if (this._options.template) {
          this._options.data = this.options.data || this._options.data || {};
          this.template = HandlebarsHelper.compile(this._options.template);
          this.$el.html(this.template(this._options.data));
        }
        this._data = this._options.data;
        this._options.max = this.options.max || 99999;
        if (this._options.enterRender) {
          this._enterEvent();
        }
        this.list = this._options.render ?
          $(this._options.render) : this.$el;

        this.allCheckbox = this.$('#toggle-all')[0];
        this._options.sortField = 'sort'; // 排序字段名称

        if (!this._options.model) {
          debug('BaseList中initialize参数中未添加模型类， 检查config.js是否addModule("model"), 或头部是否引入');
        }
        if (!this.collection) {
          this.collection = new collection(this._options);
        }
        if (this.options.itemId) {
          this.collection._setItemId(this.options.itemId);
        }
        //TODO 分类过滤
        if (this._options.subRender) {
          this.composite = true;
        }
        this._initItemView(this._options.item, this);
        this._initModel(this._options.model);
        this._initBind();

        if (this.options.items) {
          if (Est.typeOf(this.options.items) === 'function'){
            this.options.items = this.options.items.apply(this, arguments);
          }
          Est.each(this.options.items, function (item) {
            this.collection.push(new ctx.initModel(item));
          }, this);
        }
        return new $q(function (resolve) {
          resolve(ctx);
        });
      },
      /**
       * 渲染视图
       *
       * @method [override] - _render
       * @author wyj 14.11.16
       * @example
       *
       */
      _render: function () {
        debug('BaseList._render');
        this._addAll();
        this.trigger('after', this);
      },
      /**
       * 过滤父级元素
       *
       * @method [private] - _filterRoot
       * @private
       * @author wyj 14.12.9
       */
      _filterRoot: function () {
        var ctx = this;
        var temp = [];
        ctx.composite = false;
        /* ctx.collection.comparator = function (model) {
         return model.get('sort');
         }
         ctx.collection.sort();*/
        Est.each(ctx.collection.models, function (item) {
          temp.push({
            categoryId: item['attributes'][ctx._options.categoryId],
            belongId: item['attributes'][ctx._options.parentId]
          });
        });
        this.collection.each(function (thisModel) {
          var i = temp.length, _children = [];
          while (i > 0) {
            var item = temp[i - 1];
            if (item.belongId === thisModel.get(ctx._options.categoryId)) {
              _children.unshift(item.categoryId);
              temp.splice(i, 1);
            }
            i--;
          }
          thisModel.set('children', _children);
          // 添加父级元素
          if (thisModel.get('isroot') === '01' || (!thisModel.get('isroot') && thisModel.get('parentId') === '/') ||
            (!thisModel.get('isroot') && Est.isEmpty(thisModel.get('parentId')))) {
            thisModel.set('level', 1);
            ctx._addOne(thisModel);
          }
        });
        debug(ctx.collection);
      },
      /**
       * 向视图添加元素
       *
       * @method [private] - _addOne
       * @param model
       * @author wyj 14.11.16
       */
      _addOne: function (model) {
        var ctx = this;
        if (!this.filter && !this.composite &&
          this.dx < this._options.max) {
          model.set('dx', this.dx++);
          model.set('_options', {
            _item: ctx._options.item,
            _collection: Est.isEmpty(ctx._options.subRender) ? null : ctx.collection,
            _subRender: ctx._options.subRender,
            _collapse: ctx._options.collapse,
            _extend: ctx._options.extend,
            _checkAppend: ctx._options.checkAppend,
            _data: ctx.options.data || ctx._options.data
          });
          //app.setData('maxSort', model.get('dx') + 1);
          var itemView = new this.item({
            model: model,
            data: this._data
          });
          itemView._setInitModel(this.initModel);
          if (this._options.viewId) {
            itemView._setViewId(this._options.viewId);
          }
          this.list.append(itemView._render().el);
          this.views.push(itemView);
        }
      },
      /**
       * 初始化分页
       *
       * @method [public] - _initPagination
       * @param options
       * @author wyj 14.11.17
       * @example
       *        thisCtx._initPagination(thisCtx._options);
       */
      _initPagination: function (options) {
        var ctx = this;
        if (ctx.collection && ctx.collection.paginationModel) {
          ctx.collection.paginationModel.on('reloadList',
            function (model) {
              ctx._load.call(ctx, options, model);
            });
        }
      },
      /**
       * 获取集合数据
       *
       * @method [public] - _load
       * @param options [beforeLoad: 载入前方法][page: 当前页][pageSize: 每页显示条数]
       * @param model 分页模型类 或为全查必填
       * @author wyj 14.11.16
       * @example
       *        baseListCtx._load({
       *          beforeLoad: function (collection) {
       *            collection.setCategoryId(options.categoryId);
       *          },
       *          page: 1,
       *          pageSize: 16
       *        }).then(function () {
       *          ctx.after();
       *        });
       */
      _load: function (options, model) {
        var ctx = this;
        var $q = Est.promise;
        options = options || {};
        return new $q(function (resolve, reject) {
          if (options.beforeLoad) {
            options.beforeLoad.call(ctx, ctx.collection);
          }
          options.page && ctx.collection.paginationModel.set('page', options.page);
          options.pageSize && ctx.collection.paginationModel.set('pageSize', options.pageSize);
          if (options.page || options.pageSize) {
            model = ctx.collection.paginationModel;
          }
          if (ctx.collection.url) {
            if (ctx._options.filter) ctx.filter = true;
            if (ctx._options.subRender) ctx.composite = true;
            ctx.collection._load(ctx.collection, ctx, model).
              then(function (result) {
                if (ctx.options.instance) app.setData(ctx.options.instance, result.models);
                if (result.length === 0) {
                  console.log('从服务器上传回来的列表为空！');
                }
                if (ctx._options.subRender) {
                  ctx._filterRoot();
                }
                if (ctx._options.filter) {
                  ctx._filter(ctx._options.filter, ctx._options);
                }
                resolve(result);
              });
          }
        });
      },
      /**
       * 绑定事件， 如添加事件， 重置事件
       * @method [private] - _initBind
       * @author wyj 14.11.16
       */
      _initBind: function () {
        if (this.collection) {
          //this.listenTo(this.collection, 'change:checked', this.checkSelect);
          //this.initModel.bind('change:children', this._render, this);
          this.collection.bind('add', this._addOne, this);
          this.collection.bind('reset', this._render, this);
        }
      },
      /**
       * 回车事件
       *
       * @method [private] - _enterEvent
       * @private
       * @author wyj 14.12.10
       */
      _enterEvent: function () {
        var ctx = this;
        if (!this._options.enterRender) return;
        this.$('input').keyup(function (e) {
          if (e.keyCode === CONST.ENTER_KEY) {
            ctx.$(ctx._options.enterRender).click();
          }
        });
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
      _initModel: function (model) {
        this.initModel = model;
      },
      /**
       * 清空列表， 并移除所有绑定的事件
       *
       * @method [public] - _empty
       * @author wyj 14.11.16
       * @example
       *      this._empty();
       */
      _empty: function () {
        this.dx = 0;
        debug('5.ProductView._empty');
        if (this.collection) {
          var len = this.collection.length;
          while (len > -1) {
            this.collection.remove(this.collection[len]);
            len--;
          }
        }
        // 设置当前页的起始索引， 如每页显示20条，第2页为20
        if (this.collection.paginationModel) {
          this.dx = this.collection.paginationModel.get('pageSize') *
            (this.collection.paginationModel.get('page') - 1);
        }
        //遍历views数组，并对每个view调用Backbone的remove
        Est.each(this.views, function (view) {
          view.off().remove();
        })
        //清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
        //垃圾回收器会回收它们
        this.views = [];
        //this.list.empty();
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
       * 搜索
       *
       * @method [public] - _search
       * @param array
       * @param options [onBeforeAdd: 自定义过滤]
       * @author wyj 14.12.8
       * @example
       *      this._search({
       *        filter: [
       *         {key: 'name', value: this.searchKey },
       *         {key: 'prodtype', value: this.searchProdtype} ,
       *         {key: 'category', value: this.searchCategory},
       *         {key: 'loginView', value: this.searchLoginView},
       *         {key: 'ads', value: this.searchAds}
       *         ],
       *        onBeforeAdd: function(item){
       *          if (pass && !Est.isEmpty(obj.value) &&
       *           item.attributes[obj.key].indexOf(obj.value) === -1) {
       *           ctx.collection.remove(item);
       *           pass = false;
       *           return false;
       *         }
       *       }});
       */
      _search: function (options) {
        var ctx = this;
        this.filter = true;
        options = Est.extend({ onBeforeAdd: function () {
        } }, options);
        this._load({ page: 1, pageSize: 5000 }).then(function () {
          ctx.filter = false;
          ctx._filter(options.filter || ctx._options.filter, options);
        });
      },
      /**
       * 过滤
       *
       * @method [private] - _filter
       * @param array
       * @param options
       * @private
       * @author wyj 14.12.8
       */
      _filter: function (array, options) {
        var ctx = this;
        var result = [];
        var len = ctx.collection.models.length;
        ctx.filter = false;
        while (len > 0) {
          var item = ctx.collection.models[len - 1];
          var pass = true;
          Est.each(array, function (obj) {
            var keyval = Est.getValue(item.attributes, obj.key);
            if (pass && !Est.isEmpty(obj.value) && (!keyval ||
              keyval.indexOf(obj.value) === -1)) {
              ctx.collection.remove(item);
              pass = false;
              return false;
            }
          });
          if (pass && options.onBeforeAdd) {
            options.onBeforeAdd.call(this, item);
          }
          if (pass) {
            result.unshift(item);
          }
          len--;
        }
        Est.each(result, function (item) {
          ctx._addOne(item);
        });
      },
      /**
       * 弹出查看详细信息对话框
       *
       * @method [public] - _detail
       * @param options [title: 标题][width: 宽度][height: 高度][padding: 内补丁]
       *                [url: 地址][hideSaveBtn: 隐藏保存按钮][hideResetBtn: 隐藏重置按钮]
       *                [oniframeload: 页面载入后回调， 参数为window对象]
       * @author wyj 14.11.16
       * @example
       *      this._detail({
       *        title: '产品添加',
       *        url: CONST.HOST + '/modules/product/product_detail.html?time=' + new Date().getTime(),
       *        hideSaveBtn: true,
       *        hideResetBtn: true,
       *        end: '', // url 后附加内容 如： '$attId=' + attId
       *        oniframeload: function(win){
       *        }
       *      });
       */
      _detail: function (options) {
        debug('1.BaseList._detail');
        options = options || {};
        if (options.end) {
          options.end = '?' + options.end + '&';
        } else {
          options.end = '';
        }
        var ctx = this;
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          var buttons = [];
          if (!options.hideSaveBtn) {
            buttons.push({
              value: '保存',
              callback: function () {
                this.title('正在提交..');
                this.iframeNode.contentWindow.$("#submit").click();
                return false;
              },
              autofocus: true
            });
          }
          if (!options.hideResetBtn) {
            buttons.push({
              value: '重置',
              callback: function () {
                this.iframeNode.contentWindow.$("#reset").click();
                return false;
              }
            });
          }
          buttons.push({ value: '关闭' });
          window.detailDialog = dialog({
            id: 'detail-dialog',
            title: options.title || '添加',
            height: options.height || 'auto',
            width: options.width || 850,
            padding: options.padding || 0,
            url: options.url || ctx._options.detail + options.end,
            button: buttons,
            oniframeload: function () {
              this.iframeNode.contentWindow.detailDialog = window.detailDialog;
              this.iframeNode.contentWindow.app = app;
              options.oniframeload && options.oniframeload.call(this, this.iframeNode.contentWindow);
              //this.iframeNode.contentWindow.maxSort = app.getData('maxSort');
            },
            onclose: function () {
              if (ctx._options.subRender) {
                ctx.composite = true;
              }
              ctx.collection._load(ctx.collection, ctx).
                then(function () {
                  if (ctx._options.subRender) {
                    ctx.composite = true;
                    ctx._filterRoot();
                  } else {
                    ctx._render();
                  }
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
       * @method [private] - _toggleAllChecked
       * @author wyj 14.11.16
       */
      _toggleAllChecked: function () {
        var checked = this.allCheckbox.checked;
        this.collection.each(function (product) {
          product.set('checked', checked);
        });
      },
      /**
       * 保存sort值
       *
       * @method [private] - _saveSort
       * @param model
       * @private
       * @author wyj 14.12.4
       */
      _saveSort: function (model) {
        var sortOpt = { id: model.get('id') }
        sortOpt[this._options.sortField || 'sort'] = model.get(this._options.sortField);
        model._saveField(sortOpt, this, { async: false, hideTip: true});
      },
      /**
       * 交换位置
       *
       * @method [private] - _exchangeOrder
       * @param original_index
       * @param new_index
       * @param options
       * @return {BaseList}
       * @private
       * @author wyj 14.12.5
       */
      _exchangeOrder: function (original_index, new_index, options) {
        var tempObj = {}, nextObj = {};
        var temp = this.collection.at(original_index);
        var next = this.collection.at(new_index);
        // 互换dx
        var thisDx = temp.view.model.get('dx');
        var nextDx = next.view.model.get('dx');
        tempObj['dx'] = nextDx;
        nextObj['dx'] = thisDx;
        // 互换sort值
        if (options.path) {
          var thisValue = temp.view.model.get(options.path);
          var nextValue = next.view.model.get(options.path);
          tempObj[options.path] = nextValue;
          nextObj[options.path] = thisValue;
        }
        temp.view.model.set(tempObj);
        next.view.model.set(nextObj);
        // 交换model
        this.collection.models[new_index] = this.collection.models.splice(original_index, 1, this.collection.models[new_index])[0];
        // 交换位置
        if (original_index < new_index) {
          temp.view.$el.before(next.view.$el);
        } else {
          temp.view.$el.after(next.view.$el);
        }
        if (options.success) {
          options.success.call(this, temp, next);
        }
        return this
      },
      /**
       * 上移, 默认以sort为字段进行上移操作， 如果字段不为sort， 则需重载并设置options
       *
       * @method [public] - _moveUp
       * @param model
       * @private
       * @author wyj 14.12.4
       * @example
       *      app.getView('attributesList')._setOption({
       *        sortField: 'orderList'
       *      })._moveUp(this.model);
       */
      _moveUp: function (model) {
        debug('_moveUp');
        var first = this.collection.indexOf(model);
        var last, parentId;
        var result = [];
        if (this._options.subRender) {
          parentId = model.get('belongId');
          this.collection.each(function (thisModel) {
            if (parentId === thisModel.get('belongId')) {
              result.push(thisModel);
            }
          });
          //TODO 找出下一个元素的索引值
          var thisDx = Est.findIndex(result, function (item) {
            return item.get('id') === model.get('id');
          });
          if (thisDx === 0) return;
          last = this.collection.indexOf(result[thisDx - 1]);
        } else {
          if (first === 0) return;
          last = first - 1;
        }
        model.stopCollapse = true;
        this._exchangeOrder(first, last, {
          path: this.sortField || 'sort',
          success: function (thisNode, nextNode) {
            if (thisNode.get('id') && nextNode.get('id')) {
              this._saveSort(thisNode);
              this._saveSort(nextNode);
              model.stopCollapse = false;
            }
          }
        });
      },
      /**
       * 下移
       *
       * @method [public] - _moveDown
       * @param model
       * @private
       * @author wyj 14.12.4
       */
      _moveDown: function (model) {
        debug('_moveDown');
        var first = this.collection.indexOf(model);
        var last, parentId;
        var result = [];
        if (this._options.subRender) {
          parentId = model.get('belongId');
          this.collection.each(function (thisModel) {
            if (parentId === thisModel.get('belongId')) {
              result.push(thisModel);
            }
          });
          //TODO 找出上一个元素的索引值
          var thisDx = Est.findIndex(result, function (item) {
            return item.get('id') === model.get('id');
          });
          if (thisDx === result.length - 1) return;
          last = this.collection.indexOf(result[thisDx + 1]);
        } else {
          if (first === this.collection.models.length - 1) return;
          last = first + 1;
        }
        model.stopCollapse = true;
        this._exchangeOrder(first, last, {
          path: this._options.sortField,
          success: function (thisNode, nextNode) {
            if (thisNode.get('id') && nextNode.get('id')) {
              this._saveSort(thisNode);
              this._saveSort(nextNode);
              model.stopCollapse = false;
            }
          }
        });
      },
      /**
       *  获取checkbox选中项
       *
       * @method [public] - _getCheckboxIds
       * @return {*}
       * @private
       * @author wyj 14.12.8
       * @example
       *      this._getCheckboxIds(); => ['id1', 'id2', 'id3', ...]
       */
      _getCheckboxIds: function () {
        var list = Est.pluck(Est.filter(this.collection.models, function (item) {
          return item.attributes.checked;
        }), 'id');
        if (list.length === 0) {
          BaseUtils.tip('至少选择一项');
          return;
        }
        return list;
      },
      /**
       * 批量删除， 隐藏等基础接口
       *
       * @method [private] - _batch
       * @param options [url: 批量请求地址] [tip: 操作成功后的消息提示]
       * @private
       * @author wyj 14.12.14
       */
      _batch: function (options) {
        var ctx = this;
        options = Est.extend({
          tip: '操作成功！'
        }, options);
        if (this.checkboxIds = this._getCheckboxIds()) {
          $.ajax({
            type: 'POST',
            async: false,
            url: options.url,
            data: { ids: ctx.checkboxIds.join(',') },
            success: function (result) {
              BaseUtils.tip(options.tip);
              ctx._load();
            }
          });
        }

      },
      /**
       * 批量删除
       *
       * @method [private] - _batchDel
       * @param options
       * @private
       * @author wyj 14.12.14
       * @example
       *      this._batchDel({
       *        url: CONST.API + '/message/batch/del'
       *      });
       */
      _batchDel: function (options) {
        var ctx = this;
        BaseUtils.comfirm({
          success: function () {
            ctx._batch({
              url: ctx.collection.batchDel,
              tip: '删除成功'
            });
          }
        });
      },
      /**
       * 设置参数
       *
       * @method [public] - _setOption
       * @param obj
       * @return {BaseList}
       * @private
       * @author wyj 14.12.12
       * @example
       *      app.getView('categoryList')._setOption({
       *        sortField: 'orderList'
       *      })._moveUp(this.model);
       */
      _setOption: function (obj) {
        Est.extend(this._options, obj);
        return this;
      }
    });

    module.exports = BaseList;

  });