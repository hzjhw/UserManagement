/**
 * @description RecruitModel
 * @namespace RecruitModel
 * @author Administrator on 14-12-15
 */
define('RecruitModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var RecruitModel, BaseModel;

    BaseModel = require('BaseModel');

    RecruitModel = BaseModel.extend({
      defaults: Est.extend({
        title: "",
        sort: 1,
        duty: "",
        sum: "",
        state: "01",
        type: null,
        content: "",
        addTime: new Date().getTime()
      }, BaseModel.prototype.defaults),
      baseId: 'jobId',
      baseUrl: CONST.API + '/job/detail',
      initialize: function () {
        this._initialize();
      }

    });
    module.exports = RecruitModel;
  });