/**
 * @description Service
 * @class Service
 * @author yongjin<zjut_wyj@163.com> 2014/12/17
 */
define('Service', ['jquery', 'BaseService'], function (require, exports, module) {
  var Service, BaseService;

  BaseService = require('BaseService');

  Service = {
    logout: function (options) {
      new BaseService().factory({
        url: CONST.API + '/user/logout'
      }).then(function (result) {
        window.location.href = CONST.HOST + '/modules/login/login.html';
      });
    },
    initUser: function (model) {
      debug('- 初始化用户信息');
      return new model().fetch({
        wait: true,
        success: function (data) {
          if (data.attributes && data.attributes.attributes && !data.attributes.attributes.success) {
            window.location.href = CONST.HOST + '/modules/login/login.html';
            return false;
          } else {
            app.addData('user', data.attributes);
            Est.cookie('username', data.attributes.username);
            Est.cookie('enterpriseId', data.attributes.enterpriseId);
            CONST.USER = data.attributes;
          }
        }
      });
    },
    initIndex: function (model) {
      debug('- 首页信息');
      return new model().fetch({
        wait: false,
        success: function (data) {
          app.addData('index', data.attributes);
        }
      });
    },
    batch: function (options) {
      debug('- 批量转移');
      new BaseService.factory({ data: {
        ids: options.ids,
        category: options.category
      }}).then(function (result) {
          options.success && options.success.call(this, result);
        });
    },
    getProductCategory: function (options) {
      debug('- 获取产品分类列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/category/product?pageSize=1000',
        rootKey: 'isroot', // 构建树时的父级字段名称
        rootValue: '01', // 父级字段值
        categoryId: 'categoryId', //分类 Id
        belongId: 'belongId', // 父类ID
        childTag: 'cates', // 子集字段名称
        sortBy: 'sort',// 根据某个字段排序
        text: 'name', // 下拉框名称
        value: 'categoryId' // 下拉框值
      }, options));
    },
    getAlbumList: function (options) {
      debug('- 获取相册列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/album/list?pageSize=1000',
        rootKey: 'parentId', // 构建树时的父级字段名称
        rootValue: null, // 父级字段值
        categoryId: 'albumId', //分类 Id
        belongId: 'parentId', // 父类ID
        childTag: 'cates', // 子集字段名称
        text: 'name', // 下拉框名称
        value: 'albumId' // 下拉框值
      }, options));
    },
    getNewsCategory: function (options) {
      debug('- 获取新闻分类列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/category/news?pageSize=1000',
        rootKey: 'isroot', // 构建树时的父级字段名称
        rootValue: '01', // 父级字段值
        categoryId: 'categoryId', //分类 Id
        belongId: 'belongId', // 父类ID
        childTag: 'cates', // 子集字段名称
        text: 'name', // 下拉框名称
        value: 'categoryId' // 下拉框值
      }, options));
    },
    getMemberRankCategory: function (options) {
      debug('- 获取会员等级列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/member/rank/list',
        text: 'name', // 下拉框名称
        value: 'rankId' // 下拉框值
      }, options));
    },
    getNavigateCategory: function (options) {
      debug('- 获取导航分类列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/navigator/list?pageSize=1000',
        rootKey: 'grade', // 构建树时的父级字段名称
        rootValue: 1, // 父级字段值
        categoryId: 'navigatorId', //分类 Id
        belongId: 'parentId', // 父类ID
        childTag: 'cates', // 子集字段名称
        text: 'name', // 下拉框名称
        value: 'navigatorId' // 下拉框值
      }, options));
    },
    getMobileNavCategory: function (options) {
      debug('- 获取手机导航分类列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/mobile/navigator/list?pageSize=1000',
        rootKey: 'grade', // 构建树时的父级字段名称
        rootValue: 1, // 父级字段值
        categoryId: 'navigatorId', //分类 Id
        belongId: 'parentId', // 父类ID
        childTag: 'cates', // 子集字段名称
        text: 'name', // 下拉框名称
        value: 'navigatorId' // 下拉框值
      }, options));
    },
    getStaticPage: function (options) {
      debug('- 获取所有静态页面');
      var url = CONST.API + '/static/list';
      return new BaseService().factory(Est.extend({
        url: url
      }, options));
    },
    getDeliveryCorpList: function (options) {
      debug('- 获取物流公司列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/deliverycorp/list?pageSize=500',
        text: 'name',
        value: 'corpId'
      }, options));
    },
    getDeliverTypeList: function (options) {
      debug('- 获取所有物流方式列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/deliverytype/list',
        text: 'name',
        value: 'typeId'
      }, options));
    },
    getPaymentTypeList: function (options) {
      debug('- 获取所有支付方式列表');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/paymentconfig/list',
        text: 'name',
        value: 'paymentId'
      }, options));
    },
    getAreaList: function (url) {
      debug('- 获取地区列表');
      return new BaseService().factory({
        url: url || CONST.API + '/area/list'
      });
    },
    getIndustry: function (options) {
      debug('- 获取主营行业');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/enterprise/industry',
        select: true,
        text: 'name',
        value: 'syscodeId'
      }, options));
    },
    getWqtTheme: function (options) {
      debug('- 获取请帖主题');
      return new BaseService().factory(Est.extend({
        url: CONST.API + '/wqt/list/template'
      }, options));
    }
  };

  module.exports = Service;
})
;