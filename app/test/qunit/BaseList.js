/**
 * @description BaseList
 * @namespace BaseList
 * @author yongjin on 2015/1/8
 */
QUnit.module("【BaseList】");

QUnit.asyncTest("_initList", function (assert) {
  seajs.use(['BaseList'], function(BaseList){
    var $el = new BaseList({
      el: '#main'
    });
    $el
    // 测试render参数
    var $main = new BaseList();
    var result = $main._initList({
      render: '#main'
    });
    assert.equal(result.size(), 1, '当参数render为#main时测试通过!');
    assert.equal(result.eq(0).attr('id'), 'main', '测试通过');

    //assert.equal(list.size(), 0, '当参数render为空时测试通过!');

    QUnit.start();
  });
});
