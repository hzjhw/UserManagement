/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/1/28
 */
app.addRoute('wwy_invitation', function () {
  seajs.use(['InvitationList'], function (InvitationList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('invitationList', new InvitationList({
      el: '.jhw-panel',
      viewId: 'invitationList',
      page: parseInt(Est.cookie('invitationList_page')) || 1,
      pageSize: parseInt(Est.cookie('invitationList_pageSize')) || 16
    }));
  })
});

app.addModule('InvitationModel', 'models/InvitationModel');
app.addModule('InvitationList', 'modules/wwy/invitation/controllers/InvitationList.js');
app.addModule('InvitationDetail', 'modules/wwy/invitation/controllers/InvitationDetail.js');
app.addTemplate('template/invitation_list', function (require, exports, module) {
  module.exports = require('modules/wwy/invitation/views/invitation_list.html');
});

app.addTemplate('template/invitation_item', function (require, exports, module) {
  module.exports = require('modules/wwy/invitation/views/invitation_item.html');
});
app.addTemplate('template/invitation_detail', function (require, exports, module) {
  module.exports = require('modules/wwy/invitation/views/invitation_detail.html');
});

function invitationDetail(id) {
  seajs.use(['InvitationDetail'], function (InvitationDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('invitationDetail', new InvitationDetail({
      el: '.jhw-panel',
      viewId: 'invitationDetail',
      id: id
    }));
  });
}
app.addRoute('wwy_invitation/:id', function (id) {
  invitationDetail(id);
});
app.addRoute('wwy_invitation_add', function () {
  invitationDetail();
});
app.addModule('InvitationPre', 'modules/wwy/invitation/controllers/InvitationPre.js');
app.addTemplate('template/invitation_index', function (require, exports, module) {
  module.exports = require('modules/wwy/invitation/website/index.html');
});
app.addTemplate('template/invitation_pre', function (require, exports, module) {
  module.exports = require('modules/wwy/invitation/views/invitation_pre.html');
});
app.addTemplate('template/invitation_wedding', function (require, exprots, module) {
  module.exports = require('modules/wwy/invitation/website/templates/wedding.html')
});