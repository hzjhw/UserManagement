/**
 * @description config-recruit
 * @namespace config-recruit
 * @author wxw on 14-12-15
 */
/**
 * 路由
 * */
app.addRoute('recruit', function () {
  seajs.use(['jquery', 'BaseView', 'RecruitList', 'template/recruit_panel'],
    function (jquery, BaseView, RecruitList, template) {
      var RecruitPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('recruit', new RecruitPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('recruitList', new RecruitList({
          el: '.jhw-main-inner',
          viewId: 'recruitList'
        }));
      }).render();
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
app.addTemplate('template/recruit_panel', function(require, exports, module){
  module.exports = require('modules/recruit/views/recruit_panel.html');
});