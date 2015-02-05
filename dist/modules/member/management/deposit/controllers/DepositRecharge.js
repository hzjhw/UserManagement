/**
 * @description DepositRecharge
 * @namespace DepositRecharge
 * @author wxw on 15-1-17
 */
define('DepositRecharge', ['BaseList', 'BaseView', 'BaseDetail', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/deposit_recharge'
    , 'template/deposit_list', 'DepositModel', 'template/deposit_recharge_item'],
  function (require, exports, module) {
    var DepositRecharge, BaseList, BaseView, BaseDetail, itemTemp, BaseCollection, BaseItem, item, collection,
      BaseModel, DepositModel, listTemp, list;

    BaseView = require('BaseView');
    listTemp = require('template/deposit_recharge');
    itemTemp = require('template/deposit_recharge_item');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    DepositModel = require('DepositModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseDetail = require('BaseDetail');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/paymentConfig/list',
      model: DepositModel,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      }
    });
    list = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: DepositModel,
          collection: collection,
          item: item
        });
      },
      render: function () {
        this._render();
      }
    });
    DepositRecharge = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          model: DepositModel,
          template: listTemp
        });
      },
      payment: function () {
        var username = app.getData('user').username;
        var paymentType = this.$("input[type=radio]:checked").attr('title');
        var paymentId = this.$("input[type=radio]:checked").val();
        var totalAmount = this.$('input[name=totalAmount]').val();
        if (Est.isEmpty(paymentId))return;
        seajs.use(['DepositPaymentDetail'], function (DepositPaymentDetial) {
          app.addPanel('main', {
            el: '#main',
            template: '<div class="main-inner"></div>'
          }).addView('depositPaymentDetail', new DepositPaymentDetial({
            el: '.main-inner',
            data: {
              username: username,
              paymentType: paymentType,
              totalAmount: totalAmount,
              paymentId: paymentId
            },
            viewId: 'depositPaymentDetail'
          }));
        })
      },
      render: function () {
        this._render();
        this.paymentList = new list({
          el: '.paymentConfigTable'
        });
        this._form("#J_Form")._validate()._init({
          onBeforeSave: function () {
            this.payment();
          },
          onAfterSave: function () {

          }
        });
      }
    });

    module.exports = DepositRecharge;
  });