/**
 * @description 基础集合类
 * @namespace BaseCollection
 * @author yongjin<zjut_wyj@163.com> 2014/11/6
 */

define('BaseCollection', ['jquery', 'underscore', 'backbone', 'PaginationModel', 'Pagination', 'localStorage', 'Est'],
  function (require, exports, module) {
    var Backbone, BaseCollection, PaginationModel, Pagination, Est;

    Backbone = require('backbone');
    PaginationModel = require('PaginationModel');
    Pagination = require('Pagination');
    Est = require('Est');
    //Backbone.localStorage = require('localStorage');

    BaseCollection = Backbone.Collection.extend({
      //localStorage: new Backbone.LocalStorage('base-collection'),
      /**
       * 初始化
       *
       * @method [protected] - _initialize
       * @author wyj 14.11.16
       */
      _initialize: function () {
        global.debug || console.log('2.BaseCollection._initialize');
        if (!this.paginationModel) {
          this.paginationModel = new PaginationModel;
        }
      },
      /**
       * 处理url 与 分页
       *
       * @method [private] - _parse
       * @param resp
       * @param xhr
       * @returns {attributes.data|*}
       * @author wyj 14.11.16
       */
      parse: function (resp, xhr) {
        this._parsePagination(resp);
        this._parseUrl(this.paginationModel);
        this._paginationRender();
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
        global.debug || console.log('7.BaseCollection._parseUrl')
        var pageSize = model.get('pageSize');
        var page = model.get('page');
        if (typeof this.url !== 'function') {
          this.url = this.url.substring(0, this.url.indexOf('?') > -1 ?
          this.url.lastIndexOf("?") :
          this.url.length) + '?page=' + page + '&pageSize=' + pageSize;
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
        global.debug || console.log('6.BaseCollection._parsePagination')
        resp.attributes = resp.attributes || { page: 1, per_page: 10, count: 10 };
        this.paginationModel.set('page', resp.attributes.page);
        this.paginationModel.set('pageSize', resp.attributes.per_page);
        this.paginationModel.set('count', resp.attributes.count);
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
       * @method [protected] - _load
       * @param instance 实例对象
       * @param context 上下文
       * @param model 模型类
       * @returns {ln.promise} 返回promise
       * @method wyj 14.11.15
       * @example
       *      if (this.collection.url){
                    this.collection._load(this.collection, this, model)
                        .then(function(result){
                            resolve(result);
                        });
                }
       */
      _load: function (instance, context, model) {
        global.debug || console.log('4.BaseCollection._load');
        if (typeof model !== 'undefined') this._parseUrl(model);

        return new Est.promise(function(resolve){
          return instance.fetch({success: function () {
            resolve(instance);
            context.collection._reset();
            context._empty();
          }});
        });
      },
      /**
       * 清空列表
       *
       * @method [protected] - _empty
       * @author wyj 14.11.15
       */
      _empty: function () {
        global.debug || console.log('BaseCollection._empty')
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