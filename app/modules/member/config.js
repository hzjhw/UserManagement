/**
 * @description config
 * @namespace config
 * @author wxw<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 模块
 * */
app.addModule('MemberListModel', 'models/MemberListModel.js');
app.addModule('MemberRankModel', 'models/MemberRankModel.js');
app.addModule('MemberAttributeModel', 'models/MemberAttributeModel.js');
app.addModule('MemberList', 'modules/member/controllers/MemberList.js');
app.addModule('MemberRank', 'modules/member/controllers/MemberRank.js');
app.addModule('MemberDetail', 'modules/member/controllers/MemberAttributes.js');

/**
 * 路由
 * */
app.addRoute('member', function(){
  seajs.use(['jquery', 'BaseView', 'MemberList', 'template/member_category'],
    function (jquery, BaseView, MemberList, categoryTemp) {
      var Panel = BaseView.extend({
        el: '#jhw-main',
        events: {
        },
        initialize: function(){
          this._initialize({
            template: categoryTemp
          });
        },
        render: function(){
          this._render();
        }
      });
      var panel = new Panel();
      panel.on('after', function(){
        this.memberList = app.addView('memberList', new MemberList());
      });
      panel.render();
    });
});

/**
 * 模板
 * */

app.addTemplate('template/member', function (require, exports, module) {
  module.exports = require('modules/member/member_detail.html');
});
app.addTemplate('template/member_list', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list.html');
});
app.addTemplate('template/member_list_detail', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list_detail.html');
});
app.addTemplate('template/member_list_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list_item.html');
});
app.addTemplate('template/member_rank', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank.html');
});
app.addTemplate('template/member_rank_detail', function(require, exports, module){
  module.exports = require('modules/member/views/member_rank_detail.html');
});
app.addTemplate('template/member_attribute', function(require, exports, module){
  module.exports = require('modules/member/views/member_attribute.html');
});
app.addTemplate('template/member_attribute_detail', function(require, exports, module){
  module.exports = require('modules/member/views/member_attribute_detail.html');
});
app.addTemplate('template/member_category', function(require, exports, module){
  module.exports = require('modules/member/views/member_category.html');
});