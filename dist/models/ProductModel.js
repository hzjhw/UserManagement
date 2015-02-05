/**
 * @description 产品模型类
 * @namespace ProductModel
 * @author yongjin on 2014/10/31
 */
define('ProductModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var ProductModel, BaseModel;

    BaseModel = require('BaseModel');

    ProductModel = BaseModel.extend({
      defaults: Est.extend({
        photo: 'upload/g/g2/ggggfj/picture/2014/09/01/01bcc9d6-4790-403f-a546-eb97fc3aee31.jpg',
        photoId: 'Attach_0000000000000000000011056',
        name: '',
        type: 'NM',
        unit: '件',
        price: 0,
        sort: 1,
        loginView: '0',
        ads: '/',
        prodtype: '',
        category: '/',
        isBest: '00',
        isNew: '00',
        isHot: '00',
        marketPrice: '0',
        isMarketable: '00',
        weightUnit: 'kg',
        taglist: '',
        tagMapStore: [],
        photo2: []
      }, BaseModel.prototype.defaults),
      baseId: 'productId',
      baseUrl: CONST.API + '/product/detail',
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

    module.exports = ProductModel;
  });