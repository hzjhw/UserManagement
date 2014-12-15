/**
 * @description certificate
 * @namespace certificate
 * @author wxw on 14-12-15
 */
define('CertificateModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var CertificateModel, BaseModel;

    BaseModel = require('BaseModel');

    CertificateModel = BaseModel.extend({
      defaults: Est.extend({
        domain: null,
        organize: "",
        addTime: (new Date()).getTime(),
        attList: null,
        certificateId: "",
        name: "",
        state: "01",
        type: '01'
      }, BaseModel.prototype.defaults),
      baseId: 'certificateId',
      baseUrl: CONST.API + '/cert/detail',
      initialize: function () {
        this._initialize();
      }

    });
    module.exports = CertificateModel;
  });