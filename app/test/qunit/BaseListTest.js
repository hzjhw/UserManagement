/**
 * @description BaseListTest
 * @class BaseListTest
 * @author yongjin on 2015/1/8
 */
QUnit.module("【BaseListTest】");

QUnit.asyncTest("_initList[18-25]", function (assert) {
  seajs.use(['BaseList'], function (BaseList) {
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
});

QUnit.asyncTest('_initTemplate[23-27]', function (assert) {
  seajs.use(['BaseList'], function (BaseList) {
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
  })
});
QUnit.asyncTest('_initCollection[60-70]', function (assert) {
  seajs.use(['BaseList', 'BaseCollection', 'BaseModel'],
    function (BaseList, BaseCollection, BaseModel) {
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
});