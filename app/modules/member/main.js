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
app.addModule('MemberListDetail', 'modules/member/controllers/MemberListDetail.js');
app.addModule('MemberRank', 'modules/member/controllers/MemberRank.js');
app.addModule('MemberRankDetail', 'modules/member/controllers/MemberRankDetail.js');
app.addModule('MemberAttribute', 'modules/member/controllers/MemberAttribute.js');
app.addModule('MemberAttributeDetail', 'modules/member/controllers/MemberAttributeDetail.js');

app.addModule('MemberAttributesShow', 'modules/member/controllers/MemberAttributesShow.js');

/**
 * 路由
 * */
app.addRoute('member', function(){
  seajs.use(['jquery', 'BaseView', 'MemberList','MemberRank','MemberAttribute', 'template/member_category'],
    function (jquery, BaseView, MemberList, MemberRank, MemberAttribute, categoryTemp) {
      var Panel = BaseView.extend({
        el: '#jhw-main',
        events: {
          'click #listClick' : 'listClick',
          'click #rankClick' : 'rankClick' ,
          'click #attributeClick' : 'attributeClick'
        },
        initialize: function(){
          this._initialize({
            template: categoryTemp
          });
        },
        render: function(){
          this._render();
        },
        listClick :function(){
          this.memberList = app.addView('memberList', new MemberList());
        },
        rankClick :function(){
          this.memberRank = app.addView('memberRank', new MemberRank());
        },
        attributeClick :function(){
          this.memberAttribute = app.addView('memberAttribute', new MemberAttribute());
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

app.addTemplate('template/member_category', function(require, exports, module){
  module.exports = require('modules/member/views/member_category.html');
});
app.addTemplate('template/member_search', function(require, exports, module){
  module.exports = require('modules/member/views/member_search.html');
});
//member_list
app.addTemplate('template/member_list', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list.html');
});
app.addTemplate('template/member_list_detail', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list_detail.html');
});
app.addTemplate('template/member_list_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list_item.html');
});
//member_rank
app.addTemplate('template/member_rank', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank.html');
});
app.addTemplate('template/member_rank_detail', function(require, exports, module){
  module.exports = require('modules/member/views/member_rank_detail.html');
});
app.addTemplate('template/member_rank_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank_item.html');
});
//member_attribute
app.addTemplate('template/member_attribute', function(require, exports, module){
  module.exports = require('modules/member/views/member_attribute.html');
});
app.addTemplate('template/member_attribute_detail', function(require, exports, module){
  module.exports = require('modules/member/views/member_attribute_detail.html');
});
app.addTemplate('template/member_attribute_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_attribute_item.html');
});
