/**
 * @description BaseListTest
 * @class BaseListTest
 * @author yongjin on 2015/1/8
 */
QUnit.module("【BaseListTest】");

seajs.use(['BaseUtils', 'BaseModel', 'BaseList', 'BaseItem', 'BaseCollection', 'template/district_item',
    'template/district_list', 'bui/select', 'Select'],
  function (BaseUtils, BaseModel, BaseList, BaseItem, BaseCollection, districtItemTemp, districtListTemp, BuiSelect, Select) {
    QUnit.asyncTest("_initList[18ms]", function (assert) {
      var result;
      var $el = new BaseList({
        el: '#jhw-main'
      });
      result = $el._initList({});
      assert.equal(result.size(), 1, '存在el无render');
      assert.equal(result.eq(0).attr('id'), 'jhw-main', '测试通过');

      var $main = new BaseList();
      result = $main._initList({
        render: '#jhw-main'
      });
      assert.equal(result.size(), 1, '存在render无el');
      assert.equal(result.eq(0).attr('id'), 'jhw-main', '测试通过');

      var all = new BaseList({
        el: '#jhw-main'
      });
      result = all._initList({
        render: '.jhw-main-inner'
      });
      assert.equal(result.size(), 1, '既存在render也存在el');
      assert.equal(result.eq(0).attr('class'), 'jhw-main-inner', '测试通过');

      var part = new BaseList({
        el: '#jhw-main'
      });
      result = part._initList({
        render: '.jhw-main-outer'
      });
      assert.equal(result.size(), 1, '存在render也存在el, 但render不在el里');
      assert.equal(result.eq(0).attr('class'), 'jhw-main-outer', '测试通过');
      //assert.equal(list.size(), 0, '当参数render为空时测试通过!');

      QUnit.start();
    });

    QUnit.asyncTest('_initTemplate[20ms]', function (assert) {
      var result;
      var instance = new BaseList({
        el: '#jhw-main'
      });
      result = instance._initTemplate({
        template: 'aaa{{name}}bbb',
        data: {
          name: 'ccc'
        }
      });
      assert.deepEqual(result, {name: 'ccc'}, '模板字符串');
      QUnit.start();
    });

    QUnit.asyncTest('_initCollection[15ms]', function (assert) {
      var result;
      var model = BaseModel.extend({
        defaults: Est.extend({}, BaseModel.prototype.defaults),
        initialize: function () {
          this._initialize();
        }
      });
      var collection = BaseCollection.extend({
        model: model,
        initialize: function () {
          this._initialize();
        }
      });
      var instance = new BaseList();
      result = instance._initCollection({
        model: model
      }, collection);
      assert.equal(result.models.length, 0, '空集合');

      QUnit.start();
    })

    QUnit.asyncTest('_addOne[23ms]', function (assert) {
      var model = BaseModel.extend({
        defaults: Est.extend({}, BaseModel.prototype.defaults),
        initialize: function () {
          this._initialize();
        }
      });
      var item = BaseItem.extend({
        tagName: 'li',
        initialize: function () {
          this._initialize({
            template: districtItemTemp
          });
        },
        render: function () {
          this._render();
        }
      });
      var collection = BaseCollection.extend({
        initialize: function () {
          this._initialize({
            model: model
          });
        }
      });
      var list = BaseList.extend({
        initialize: function () {
          this._initialize({
            model: model,
            collection: collection,
            render: '.district-ul',
            item: item,
            template: districtListTemp,
            speed: 1,
            items: [app.getData('area_list')[0]]
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('main', {
        el: '#jhw-main',
        template: '<div class="jhw-panel"></div>'
      }).addView('district', new list({
        el: '.jhw-panel',
        viewId: 'district',
        afterRender: function (thisOpts) {
          assert.equal(thisOpts.items.length, 1, '遍历1条记录所花费的时间 passed');
          QUnit.start();
        }
      }));
    })

    QUnit.asyncTest('_initItems[140ms]', function (assert) {
      var model = BaseModel.extend({
        defaults: Est.extend({}, BaseModel.prototype.defaults),
        initialize: function () {
          this._initialize();
        }
      });
      var collection = BaseCollection.extend({
        initialize: function () {
          this._initialize({
            model: model
          });
        }
      });
      var item = BaseItem.extend({
        tagName: 'li',
        initialize: function () {
          this._initialize({
            template: districtItemTemp
          });
        },
        render: function () {
          this._render();
        }
      });
      var list = BaseList.extend({
        initialize: function () {
          this._initialize({
            model: model,
            collection: collection,
            render: '.district-ul',
            item: item,
            template: districtListTemp,
            speed: 1,
            items: app.getData('area_list')
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('main', {
        el: '#jhw-main',
        template: '<div class="jhw-panel"></div>'
      }).addView('district', new list({
        el: '.jhw-panel',
        viewId: 'district',
        afterRender: function (thisOpts) {
          assert.equal(thisOpts.items.length, 420, '遍历420条记录所花费的时间 passed');

          QUnit.start();
        }
      }));
    });

    QUnit.test('Est.interface', function (assert) {
      var baseList = new BaseList();

      assert.equal(true, true, 'passed');
    });
  });







