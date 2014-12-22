/**
 * @description BaseService
 * @class BaseService
 * @author yongjin<zjut_wyj@163.com> 2014/12/17
 */
define('BaseService', ['jquery'], function (require, exports, module) {
  var BaseService;

  BaseService = {
    /**
     * 退出登录
     *
     * @method [登录注册] - logout
     * @author wyj 14.12.18
     * @example
     *    BaseService.logout();
     */
    logout: function () {
      $.ajax({
        type: 'GET',
        async: false,
        url: CONST.API + '/user/logout',
        success: function () {
          window.location.href = CONST.HOST + '/modules/login/login.html';
        }
      });
    },
    /**
     * 获取产品分类
     *
     * @method [产品] - getProductCategory
     * @param options [tree: true/false 是否构建树][extend: true/false 是否展开] [select: true/false 是否是选择框]
     * @return {Est.promise}
     * @author wyj 14.12.17
     * @example
     *
     *  if (!app.getData('productCategory')) {
          BaseUtils.getProductCategory({ tree: true, extend: true, select: true
          }).then(function (list) {
            app.setData('productCategory', list);
          })
        }
     */
    getProductCategory: function (options) {
      debug('getProductCategory');
      var $q = Est.promise;
      return new $q(function (topResolve, topReject) {
        options.select = options ? options.select ? true : false : false;
        options.extend = options ? options.extend ? true : false : false;
        var getCategory = function () {
          return new $q(function (resolve, reject) {
            $.ajax({
              type: 'post',
              url: CONST.API + '/category/product?pageSize=1000',
              async: false,
              data: {
                _method: 'GET'
              },
              success: function (result) {
                resolve(result);
              }
            });
          });
        };
        getCategory().then(function (result) {
          if (result.attributes) {
            if (options.tree){
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '00', {
                categoryId: 'categoryId',// 分类ＩＤ
                belongId: 'belongId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                sortBy: 'sort', // 按某个字段排序
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.categoryId;
                }
              });
            }
            if (options.select) {
              result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                name: 'text'
              });
            }
            if (options.extend) {
              result.attributes.data = Est.extendTree(result.attributes.data);
            }
          } else {
            result.attributes.data = [];
          }
          result.attributes.data.unshift({text: '请选择分类', value: '/'});
          topResolve(result.attributes.data);
        });
      });
    },
    /**
     * 获取相册列表
     *
     * @method [相册] - getAlbumList
     * @param options [extend: true/false 是否展开] [select: true/false 是否是选择框]
     * @return {Array}
     * @author wyj 14.12.17
     * @example
     *    BaseService.getAlbumList({
          tree: true,
          extend: true,
          select: true
        })
     */
    getAlbumList: function (options) {
      var albumList = [];
      options = options || {};
      $.ajax({
        type: 'post',
        url: CONST.API + '/album/list?pageSize=1000',
        async: false,
        data: {
          _method: 'GET'
        },
        success: function (result) {
          if (result.attributes) {
            if (options.tree) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'parentId', null, {
                categoryId: 'albumId',// 分类ＩＤ
                belongId: 'parentId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.albumId;
                }
              });
            }
            if (options.select) {
              result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                name: 'text'
              });
            }
            if (options.extend) {
              result.attributes.data = Est.extendTree(result.attributes.data);
            }
          } else {
            result.attributes.data = [];
          }
          result.attributes.data.unshift({text: '请选择分类', value: ''});
          albumList = result.attributes.data;
        }
      });
      return albumList;
    },
    /**
     * 获取新闻分类
     *
     * @method [新闻] - getNewsCategory
     * @param options [extend: true/false 是否展开] [select: true/false 是否是选择框]
     * @return {hn.promise}
     * @author wyj 14.12.17
     * @example
     *    if (!app.getData('newsCategory')) {
          BaseService.getNewsCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.setData('newsCategory', list);
          })
        }
     */
    getNewsCategory: function (options) {
      debug('getNewsCategory');
      return new Est.promise(function (async, topReject) {
        options.select = options ? options.select ? true : false : false;
        options.extend = options ? options.extend ? true : false : false;
        var getCategory = function () {
          return new Est.promise(function (resolve, reject) {
            $.ajax({
              type: 'post',
              url: CONST.API + '/category/news?pageSize=1000',
              async: false,
              data: {
                _method: 'GET'
              },
              success: function (result) {
                resolve(result);
              }
            });
          });
        };
        getCategory().then(function (result) {
          if (result.attributes) {
            result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '01', {
              categoryId: 'categoryId',// 分类ＩＤ
              belongId: 'belongId',// 父类ＩＤ
              childTag: 'cates', // 子分类集的字段名称
              sortBy: 'sort', // 按某个字段排序
              callback: function (item) {
                item.text = item.name;
                item.value = item.categoryId;
              }
            });
            if (options.select) {
              result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                name: 'text'
              });
            }
            if (options.extend) {
              result.attributes.data = Est.extendTree(result.attributes.data);
            }
          } else {
            result.attributes.data = [];
          }
          result.attributes.data.unshift({text: '请选择分类', value: '/'});
          async(result.attributes.data);
        });
      });
    }
  };

  module.exports = BaseService;
});