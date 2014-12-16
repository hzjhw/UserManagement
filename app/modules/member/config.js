/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 模块
 * */
app.addModule('MemberModel', 'models/MemberModel.js');
app.addModule('MemberList', 'modules/member/controllers/MemberList.js');
app.addModule('MemberDetail', 'modules/member/controllers/MemberDetail.js');
app.addModule('MemberCategory', 'modules/member/controllers/MemberCategory.js');
app.addModule('MemberRank', 'modules/member/controllers/MemberRank.js');

/**
 * 路由
 * */
app.addRoute('message', function(){
  seajs.use(['jquery', 'MemberCategory'], function (jquery, MemberCategory) {
    app.addView('memberCategory', new MemberCategory());
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