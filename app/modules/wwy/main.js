/**
 * @description 微网页
 * @namespace config
 * @author jihui-wxw2014/12/12
 */
/**
 * 模块
 * */
app.addModule('WwyModel', 'models/WwyModel.js');
app.addModule('WwyList', 'modules/wwy/controllers/WwyList.js');
app.addModule('WwyDetail', 'modules/wwy/controllers/WwyDetail.js');

/**
 * 路由
 * */
app.addRoute('wwy', function(){
  seajs.use(['jquery', 'WwyList'], function (jquery, WwyList) {
    app.addView('wwyList', new WwyList());
  });
});

/**
 * 模板
 * */
app.addTemplate('template/wwy_item', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_item.html');
});
app.addTemplate('template/wwy_list', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_list.html');
});
app.addTemplate('template/wwy_detail', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_detail.html');
});
