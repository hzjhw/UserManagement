/**
 * @description Districk
 * @namespace Districk
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('District', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/district_item', 'template/district_list'],
  function (require, exports, module) {

    var District, model, item, collection;
    var BaseModel = require('BaseModel');
    var BaseCollection = require('BaseCollection');
    var BaseItem = require('BaseItem');
    var BaseList = require('BaseList');
    var itemTemp = require('template/district_item');
    var listTemp = require('template/district_list');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      /*url: CONST.API + '/area/list',*/
      initialize: function () {
        this._initialize({
          model: model
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item',
      events: {
        'click .district-div': 'selectItem'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      },
      selectItem: function () {
        debug(this.model.get('name'));
        app.getView(this._options.viewId).setInputValue(this.model.get('name'));
      }
    });


    District = BaseList.extend({
      events: {
        'click .bui-select-input': 'showSelect',
        'click .down': 'showSelect'
      },
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.district-ul'
        });
        this.$picker = this.$('.bui-list-picker');
        this.$select = this.$('.bui-select');
      },
      render: function () {
        this._render();
      },
      showSelect: function (e) {
        var ctx = this;
        e.stopImmediatePropagation();
        this.$picker.css({
          left: this.$select.position().left,
          top: this.$select.position().top + 30
        }).show();
        $(document).one('click', function () {
          ctx.hideSelect();
        });
      },
      hideSelect: function () {
        this.$picker.hide();
      },
      setInputValue: function (val) {
        this.$('.bui-select-input').val(val);
      },
      getDistrict: function () {

      }
    });

    module.exports = District;
  });