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
     * 用户信息
     * @method initUser
     * @author wyj 15.1.14
     */
    initUser: function (model) {
      var userModel = new model();
      return userModel.fetch({
        wait: true,
        success: function (data) {
          if (data.attributes && data.attributes.attributes && !data.attributes.attributes.success) {
            //alert(data.attributes.attributes.success);
            window.location.href = CONST.HOST + '/modules/login/login.html';
            return false;
          } else {
            app.addData('user', data.attributes);
            CONST.USER = data.attributes;
          }
        }
      });
    },
    /**
     * 首页信息
     * @method initIndex
     * @author wyj 15.1.14
     */
    initIndex: function (model) {
      var indexModel = new model();
      return indexModel.fetch({
        wait: false,
        success: function (data) {
          app.addData('index', data.attributes);
        }
      });
    },
    /**
     * 产品排序
     * @method [产品] - productSort
     * @author wyj 15.1.14
     * @example
     *
     */
    productSort: function (options) {
      seajs.use(['BaseUtils'], function (BaseUtils) {
        $.ajax({
          type: 'POST',
          async: false,
          url: CONST.DOMAIN + '/user_v2/product/sortPublished',
          data: {
            sortType: options.sortType,
            category: options.category,
            type: options.type
          },
          success: function (result) {
            BaseUtils.tip('产品排序成功');
            options.success &&
            options.success.call(this, result);
          }
        });
      });
    },
    /**
     * 批量转移操作
     * @method [批量] - batch
     * @param url
     * @param callback
     * @author wyj 15.1.14
     * @example
     *
     */
    batch: function (options) {
      options = Est.extend({}, options);
      $.ajax({
        type: 'POST',
        async: false,
        url: options.url,
        data: {
          ids: options.ids,
          category: options.category
        },
        success: function (result) {
          options.success && options.success.call(this, result);
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
            app.addData('productCategory', list);
          })
        }
     */
    getProductCategory: function (options) {
      debug('getProductCategory');
      var q = Est.promise;
      return new q(function (topResolve, topReject) {
        options.select = options ? options.select ? true : false : false;
        options.extend = options ? options.extend ? true : false : false;
        var getCategory = function () {
          return new q(function (resolve, reject) {
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
            if (options.tree) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'isroot', '01', {
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
            app.addData('newsCategory', list);
          })
        }
     */
    getNewsCategory: function (options) {
      debug('- getNewsCategory');
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
            result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'isroot', '01', {
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
    },
    /**
     * 获取会员等级分类
     *
     * @method [会员] - getMemberRankCategory
     * @param options [extend: true/false 是否展开] [select: true/false 是否是选择框]
     * @return {hn.promise}
     * @author wyj 14.12.17
     * @example
     *    if (!app.getData('memberRankCategory')) {
          BaseService.getMemberRankCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.addData('memberCategory', list);
          })
        }
     */
    getMemberRankCategory: function (options) {
      debug('getMemberCategory');
      var q = Est.promise;
      return new q(function (topResolve, topReject) {
        options.select = options ? options.select ? true : false : false;
        options.extend = options ? options.extend ? true : false : false;
        var getCategory = function () {
          return new q(function (resolve, reject) {
            $.ajax({
              type: 'post',
              url: CONST.API + '/member/rank/list',
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
            Est.each(result.attributes.data, function (item) {
              item.text = item.name;
              item.value = item.rankId;
            })
          } else {
            result.attributes.data = [];
          }
          result.attributes.data.unshift({text: '请选择分类', value: '/'});
          topResolve(result.attributes.data);
        });
      });
    },
    getNavigateCategory: function (options) {
      debug('getNavigateCategory');
      var q = Est.promise;
      return new q(function (topResolve, topReject) {
        options.select = options ? options.select ? true : false : false;
        options.extend = options ? options.extend ? true : false : false;
        var getCategory = function () {
          return new q(function (resolve, reject) {
            $.ajax({
              type: 'post',
              url: CONST.API + '/navigator/list?pageSize=1000',
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
            if (options.tree) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', 1, {
                categoryId: 'navigatorId',// 分类ＩＤ
                belongId: 'parentId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                sortBy: 'sort', // 按某个字段排序
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.navigatorId;
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
          result.attributes.data.unshift({text: '请选择导航', value: ''});
          topResolve(result.attributes.data);
        });
      });
    },
    getMobileNavCategory: function (options) {
      debug('getNavigateCategory');
      var q = Est.promise;
      return new q(function (topResolve, topReject) {
        options.select = options ? options.select ? true : false : false;
        options.extend = options ? options.extend ? true : false : false;
        var getCategory = function () {
          return new q(function (resolve, reject) {
            $.ajax({
              type: 'post',
              url: CONST.API + '/mobile/navigator/list?pageSize=1000',
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
            if (options.tree) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', 1, {
                categoryId: 'navigatorId',// 分类ＩＤ
                belongId: 'parentId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                sortBy: 'sort', // 按某个字段排序
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.navigatorId;
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
          result.attributes.data.unshift({text: '请选择导航', value: ''});
          topResolve(result.attributes.data);
        });
      });
    },
    /**
     * 获取所有静态页面
     *
     * @method [静态化] - getStaticPage
     * @returns {Array}
     * @author wyj 14.12.28
     *
     */
    getStaticPage: function () {
      var q = Est.promise;
      return new q(function (resolve, reject) {
        $.ajax({
          type: 'post',
          url: CONST.API + '/static/list',
          async: false,
          success: function (result) {
            result = result.attributes.data;
            resolve(result);
          }
        });
      });
    },
    /**
     * 获取物流公司列表
     *
     * @method [商城] - getDeliveryCorpList
     * @returns {Est.promise}
     * @author wyj 14.12.30
     *
     */
    getDeliveryCorpList: function () {
      var q = Est.promise;
      return new q(function (resolve, reject) {
        $.ajax({
          type: 'get',
          url: CONST.API + '/deliverycorp/list',
          async: false,
          success: function (result) {
            result = result.attributes.data;
            Est.each(result, function (item) {
              item.text = item.name;
              item.value = item.corpId;
            });
            result.unshift({
              text: '--请选择物流公司--',
              value: 'null'
            });
            resolve(result);
          }
        });
      });
    },
    getDeliverTypeList: function () {
      var q = Est.promise;
      return new q(function (resolve, reject) {
        $.ajax({
          type: 'get',
          url: CONST.API + '/deliverytype/list',
          async: false,
          success: function (result) {
            result = result.attributes.data;
            Est.each(result, function (item) {
              item.text = item.name;
              item.value = item.typeId;
            });
            result.unshift({
              text: '--请选择配送方式--',
              value: 'null'
            });
            resolve(result);
          }
        });
      });
    },
    getPaymentTypeList: function () {
      var q = Est.promise;
      return new q(function (resolve, reject) {
        $.ajax({
          type: 'get',
          url: CONST.API + '/paymentconfig/list',
          async: false,
          success: function (result) {
            result = result.attributes.data;
            Est.each(result, function (item) {
              item.text = item.name;
              item.value = item.paymentId;
            });
            result.unshift({
              text: '--请选择支付方式--',
              value: null
            });
            resolve(result);
          }
        });
      });
    },
    getAreaList: function (url) {
      var q = Est.promise;
      if (!url) {
        url = CONST.API + '/area/list';
      }
      return new q(function (resolve, reject) {
        if (app.getData('arealist')) {
          resolve(app.getData('arealist'));
        } else {
          $.ajax({
            type: 'get',
            url: url,
            async: false,
            success: function (result) {
              result = result.attributes.data;
              resolve(result);
              app.addData('arealist', result);
            }
          });
        }
      });
    },
    /**
     * 获取主营行业
     * @method getIndustry
     * @returns {Est.promise}
     */
    getIndustry: function () {
      var q = Est.promise;
      var url = CONST.API + '/enterprise/industry';
      return new q(function (resolve, reject) {
        if (app.getData('industry')) {
          resolve(app.getData('industry'));
        } else {
          $.ajax({
            type: 'get',
            url: url,
            async: false,
            success: function (result) {
              result = result.attributes.data;
              Est.each(result, function (item) {
                item.text = item.name;
                item.value = item.syscodeId;
              });
              result.unshift({ text: '请选择', value: '-' });
              resolve(result);
              app.addData('industry', result);
            }
          });
        }
      });
    }
  };

  module.exports = BaseService;
})
;