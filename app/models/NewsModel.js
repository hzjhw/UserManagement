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
        origin: "",
        domain: "jihui88.com",
        enterpriseId: "Enterp_0000000000000000000000000",
        title: "2222222222",
        adduserId: "User_000000000000000000000000000",
        addTime: 1414425600000,
        newsId: "News_000000000000000000000000000",
        display: "01",
        picPath: "",
        auditId: null,
        auditTime: null,
        c_url: null,
        category: "/",
        seoDescription: "",
        seoTitle: "",
        viewsum: 0,
        author: "",
        newsId2: "",
        newsType: "",
        nkey: "",
        imagenews: "02",
        rollingnews: null,
        topnews: "02",
        staticed: null,
        staticpath: null,
        pageKey: null,
        tarurl: null,
        sort: 1,
        state: "01",
        content: ""
      }, BaseModel.prototype.defaults),
      baseId: 'newsId',
      baseUrl: CONST.API + '/news/detail',
      initialize: function () {
        this._initialize();
      },
      validate: function (attrs) {
        return this._validation(attrs, function (attrs) {
          if (!attrs.sort || attrs.sort < 0) {
            this.validateMsg = "sort不能为空";
          }
        });
      }

    });
    module.exports = NewsModel;
  });