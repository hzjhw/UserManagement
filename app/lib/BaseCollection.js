/**
 * @description 集合类
 *
 *    - url 获取列表地址， 值可为方法，返回地址
 *    - batchDel: 批量删除url
 *    - model 模型类
 *    - initialize 初始化， 实现父类 _initialize方法
 *
 * @class BaseCollection - 集合类
 * @author yongjin<zjut_wyj@163.com> 2014/11/6
 */

define('BaseCollection', ['jquery', 'underscore', 'backbone', 'PaginationModel', 'Pagination', 'localStorage'],
  function (require, exports, module) {
    var Backbone, BaseCollection, PaginationModel, Pagination;

    Backbone = require('backbone');
    PaginationModel = require('PaginationModel');
    Pagination = require('Pagination');
    //Backbone.localStorage = require('localStorage');

    BaseCollection = Backbone.Collection.extend({
      //localStorage: new Backbone.LocalStorage('base-collection'),
      /**
       * 传递options进来
       *
       * @method [private] - constructor
       * @param options
       * @author wyj 14.12.16
       */
      constructor: function (options) {
        this.options = options || {};
        Backbone.Collection.apply(this, arguments);
      },
      /**
       * 初始化
       *
       * @method [override] - _initialize
       * @author wyj 14.11.16
       * @example
       *      this._initialize();
       */
      _initialize: function () {
        debug('2.BaseCollection._initialize');
        this._baseUrl = this.url;
        if (this.options.pagination && !this.paginationModel) {
          this.paginationModel = new PaginationModel();
        }
      },
      /**
       * 处理url 与 分页
       *
       * @method [private] - _parse
       * @param resp
       * @param xhr
       * @return {attributes.data|*}
       * @author wyj 14.11.16
       */
      parse: function (resp, xhr) {
        this._parsePagination(resp);
        if (this.paginationModel) {
          this._parseUrl(this.paginationModel);
          this._paginationRender();
        }
        return resp.attributes.data;
      },
      /**
       * 处理url地址， 加上分页参数
       *
       * @method [private] - _parseUrl
       * @param model
       * @author wyj 14.11.16
       */
      _parseUrl: function (model) {
        debug('7.BaseCollection._parseUrl');
        var page = 1, pageSize = 16;
        if (model && model.get('pageSize')) {
          pageSize = model.get('pageSize');
          page = model.get('page');
        }
        if (typeof this.url !== 'function') {
          var end = '';
          if (!Est.isEmpty(this._itemId)) end = '/' + this._itemId;
          this.url = this._baseUrl + end + '?page=' + page + '&pageSize=' + pageSize;
        }
      },
      /**
       * 设置分页模型类
       *
       * @method [private] - _parsePagination
       * @param resp
       * @author wyj 14.11.16
       */
      _parsePagination: function (resp) {
        debug('6.BaseCollection._parsePagination');
        resp.attributes = resp.attributes ||
        { page: 1, per_page: 10, count: 10 };
        if (this.paginationModel) {
          this.paginationModel.set('page', resp.attributes.page);
          this.paginationModel.set('pageSize', resp.attributes.per_page);
          this.paginationModel.set('count', resp.attributes.count);
        }
      },
      /**
       * 渲染分页
       *
       * @method [private] - _paginationRender
       * @author wyj 14.11.16
       */
      _paginationRender: function () {
        var ctx = this;
        if (!this.pagination) {
          this.pagination = new Pagination({
            model: ctx.paginationModel
          });
        } else {
          this.pagination.render();
        }
      },
      /**
       * 加载列表
       *
       * @method [private] - _load
       * @param instance 实例对象
       * @param context 上下文
       * @param model 模型类
       * @return {ln.promise} 返回promise
       * @author wyj 14.11.15
       * @example
       *      if (this.collection.url){
       *             this.collection._load(this.collection, this, model)
       *                 .then(function(result){
       *                     resolve(result);
       *                 });
       *         }
       */
      _load: function (instance, context, model) {
        debug('4.BaseCollection._load');
        //if (!Est.isEmpty(this.itemId)) this.url = this.url + '/' + this.itemId;
        this._parseUrl(model);
        var $q = Est.promise;
        return new $q(function (resolve) {
          return instance.fetch({success: function () {
            debug('before');
            resolve(instance);
            context.collection._reset();
            debug('collection reset end');
            context._empty();
          }});
        });
      },
      /**
       * 设置itemId
       *
       * @method [public] - _setItemId
       * @param itemId
       * @private
       * @author wyj 14.12.16
       * @example
       *        this._setItemId('Category00000000000000000032');
       */
      _setItemId: function(itemId){
        this._itemId = itemId;
        debug('根据ID查列表' + this._itemId);
      },
      /**
       * 清空列表
       *
       * @method [private] - _empty
       * @author wyj 14.11.15
       */
      _empty: function () {
        debug('BaseCollection._empty');
        if (this.collection) {
          var len = this.collection.length;
          while (len > -1) {
            this.collection.remove(this.collection[len]);
            len--;
          }
        }
      }
    });

    module.exports = BaseCollection;
  });