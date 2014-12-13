/**
 * @description 新闻模型类
 * @namespace NewsModel
 * @author jihui-wxw on 2014/12/10
 */
define('NewsModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var NewsModel, BaseModel;

    BaseModel = require('BaseModel');

    NewsModel = BaseModel.extend({
      defaults: Est.extend({
        category: "/",
        viewsum: 0,
        imagenews: "02",
        topnews: "02",
        addTime: new Date().getTime()
      }, BaseModel.prototype.defaults),
      baseId: 'newsId',
      baseUrl: CONST.API + '/news/detail',
      initialize: function () {
        this._initialize();
      }

    });
    module.exports = NewsModel;
  });