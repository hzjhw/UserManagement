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

app.addModule('WwyMobileList', 'modules/wwy/controllers/WwyMobileList.js');
app.addModule('WwyMessageList', 'modules/wwy/controllers/WwyMessageList.js');

app.addModule('WwyMessageModel', 'models/WwyMessageModel.js');
app.addModule('WwyPicturePick', 'modules/wwy/controllers/WwyPicturePick.js');
/**
 * 路由
 * */
app.addRoute('wwy', function(){
  seajs.use(['jquery', 'WwyList'], function (jquery, WwyList) {
    app.addView('wwyList', new WwyList());
  });
});
app.addRoute('wwy_mobile/:id', function(id){
    seajs.use(['jquery', 'WwyMobileList'], function (jquery, WwyMobileList) {
        var wwyMobileList = new WwyMobileList({
            wyId:id
        });
        app.addView('WwyMobileList', wwyMobileList);
    });
});
app.addRoute('wwy_message/:id', function(id){
    seajs.use(['jquery', 'WwyMessageList'], function (jquery, WwyMessageList) {
        var wwyMessageList = new WwyMessageList({
            wyId:id
        });
        app.addView('WwyMessageList', wwyMessageList);
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

app.addTemplate('template/wwy_mobile_item', function (require, exports, module) {
    module.exports = require('modules/wwy/views/wwy_mobile_item.html');
});
app.addTemplate('template/wwy_mobile_list', function (require, exports, module) {
    module.exports = require('modules/wwy/views/wwy_mobile_list.html');
});
app.addTemplate('template/wwy_message_item', function (require, exports, module) {
    module.exports = require('modules/wwy/views/wwy_message_item.html');
});
app.addTemplate('template/wwy_message_list', function (require, exports, module) {
    module.exports = require('modules/wwy/views/wwy_message_list.html');
});
app.addTemplate('template/wwy_picture_pick_list', function(require, exports, module){
  module.exports = require('modules/wwy/views/picture_pick_item.html');
});
app.addTemplate('template/wwy_picture_pick_item', function(require, exports, module){
  module.exports = require('modules/wwy/views/picture_pick_item.html');
});