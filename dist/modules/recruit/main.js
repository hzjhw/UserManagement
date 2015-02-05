/**
 * @description config-recruit
 * @namespace config-recruit
 * @author wxw on 14-12-15
 */
/**
 * 路由
 * */
app.addRoute('recruit', function () {
  seajs.use(['jquery', 'RecruitList'], function (jquery, RecruitList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('recruitList', new RecruitList({
      el: '.jhw-main-inner'
    }))
  });
});
/**
 * 模块
 * */
app.addModule('RecruitModel', 'models/RecruitModel.js');
app.addModule('RecruitList', 'modules/recruit/controllers/RecruitList.js');
app.addModule('RecruitDetail', 'modules/recruit/controllers/RecruitDetail.js');


/**
 * 模板
 * */
app.addTemplate('template/recruit_item', function (require, exports, module) {
  module.exports = require('modules/recruit/views/recruit_item.html');
});
app.addTemplate('template/recruit_list', function (require, exports, module) {
  module.exports = require('modules/recruit/views/recruit_list.html');
});
app.addTemplate('template/recruit_detail', function (require, exports, module) {
  module.exports = require('modules/recruit/views/recruit_detail.html');
});
app.addTemplate('template/recruit_search', function (require, exports, module) {
  module.exports = require('modules/recruit/views/recruit_search.html');
});