/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */

app.addModule('MemberLeftNav', 'modules/member/management/index/controllers/MemberLeftNav.js');
app.addModule('MemberBreadcrumbNav', 'modules/member/management/index/controllers/MemberBreadcrumbNav.js');

app.addTemplate('template/member_left_nav', function (require, exports, module) {
  module.exports = require('modules/member/management/index/views/member_left_nav.html');
});
app.addTemplate('template/member_left_nav_item', function (require, exports, module) {
  module.exports = require('modules/member/management/index/views/member_left_nav_item.html');
});
app.addTemplate('template/member_breadcrumb_nav', function(require, exports, module){
  module.exports = require('modules/member/management/index/views/member_breadcrumb_nav.html');
});


