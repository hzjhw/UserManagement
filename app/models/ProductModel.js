/**
 * @description 产品模型类
 * @namespace ProductModel
 * @author yongjin on 2014/10/31
 */
define('ProductModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
  function (require, exports, module) {
    var dialog, BaseModel;

    BaseModel = require('BaseModel');
    dialog = require('dialog');

    var ProductModel = BaseModel.extend({
      baseUrl: Global.API + '/product/detail',
      baseId: 'productId',
      defaults: {
        name: '',
        type: 'NM',
        unit: '件',
        price: 0,
        sort: 1,
        loginView: '1',
        ads: '2',
        prodtype: '',
        category: '0',
        isBest: '00',
        isNew: '00',
        isHot: '00',
        marketPrice: '0',
        isMarketable: '00',
        weightUnit: 'kg',
        taglist:'',
        tagMapStore: [],
        photo2: [],
        photoId: 'Attach_0000000000000000000011056',
        photo: 'upload/g/g2/ggggfj/picture/2014/09/01/01bcc9d6-4790-403f-a546-eb97fc3aee31.jpg',
        checked: false
      },
      initialize: function(){
        this._initialize();
      },
      validate: function (attributes) {
        //if (!this._validate()) return;
        if (!attributes.sort || attributes.sort < 0) {
          return "sort不能为空";
        }
      }

    });
    module.exports = ProductModel;
  });