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
  seajs.use(['jquery', 'MemberList'], function (jquery, MemberList) {
    app.addView('memberList', new MemberList());
  });
});

app.addRoute('member/attr', function(){
  seajs.use(['jquery', 'MemberAttribute'], function (jquery, MemberAttribute) {
    app.addView('memberAttribute', new MemberAttribute());
  });
});

app.addRoute('member/rank', function(){
  seajs.use(['jquery', 'MemberRank'], function (jquery, MemberRank) {
    app.addView('memberRank', new MemberRank());
  });
});


/**
 * 模板
 * */

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
