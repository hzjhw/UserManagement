/**
 * @description UserDetail
 * @class UserDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('UserDetail', ['BaseDetail', 'UserModel', 'template/user_detail', 'BaseUtils', 'BaseModel', 'BaseList',
    'BaseItem', 'BaseCollection'],
  function (require, exports, module) {
    var UserDetail, BaseDetail, template, UserModel, BaseUtils, BaseList, BaseItem, BaseCollection,
      model, collection, item, list, BaseModel;

    BaseDetail = require('BaseDetail');
    template = require('template/user_detail');
    UserModel = require('UserModel');
    BaseUtils = require('BaseUtils');
    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');

    model = BaseModel.extend({
      defaults: Est.extend({
        text: '选项',
        value: ''
      }, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      className: 'control-group',
      events: {
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown'
      },
      initialize: function () {
        this._initialize({
          modelBind: true,
          template: '<label class="control-label"><input class="input-mini" id="model-text" value="{{text}}" type="text"/></label><div class="controls"><input type="text" id="model-value" class="input-large" value="{{value}}"/>&nbsp;&nbsp;&nbsp;<span class="delete x-icon x-icon-small x-icon-error">×</span>&nbsp;<span class="x-icon x-icon-small x-icon-info move-up pointer"><i class="icon icon-white icon-arrow-up pointer"></i></span>&nbsp;<span class="x-icon x-icon-small x-icon-info move-down pointer"><i class="icon icon-white icon-arrow-down pointer"></i></span></div>' });
      },
      render: function () {
        this._render();
      }
    });

    list = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          item: item,
          collection: collection
        });
        if (this.collection.models.length === 0) {
          this._add(new model());
        }
      },
      render: function () {
        this._render();
      }
    });

    UserDetail = BaseDetail.extend({
      events: {
        'click .option-add': 'optionAdd',
        'click .location': 'location',
        'click .back': 'back'
      },
      initialize: function () {
        this._initialize({
          template: template,
          model: UserModel
        });
      },
      back: function(){
        this._navigate('#/index');
      },
      optionAdd: function () {
        this.list._add(new model());
      },
      location: function () {
        BaseUtils.dialog({
          id: 'location',
          width: 700,
          height: 470,
          url: 'http://www.jihui88.com/user/platform/include/mapbar/map.jsp'
        });
      },
      render: function () {
        var ctx = this;
        this.model.fetch({
          wait: true
        }).done(function () {
          ctx._render();
          BaseUtils.initSelect({
            render: '#s1',
            target: '#model-sex',
            items: [
              {text: '男', value: '00'},
              {text: '女', value: '01'}
            ]
          });
          app.addView('optionList', ctx.list = new list({
            el: '#user-append',
            viewId: 'optionList',
            items: JSON.parse(ctx.model.get('jsonstr'))
          }));

          ctx._form('#J_Form_login')._validate()._init({
            onBeforeSave: function () {
              this.model.set('jsonstr', JSON.stringify(ctx.list._getItems()));
            }
          });
        });
      }
    });

    module.exports = UserDetail;
  })
;