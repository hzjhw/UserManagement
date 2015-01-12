/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
/*左侧导航会员信息*/
app.addModule('MemberLeftInfo', 'modules/member/management/userinfo/controllers/MemberLeftInfo.js');
app.addTemplate('template/member_left_info', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_left_info.html');
});
/*首页会员信息*/
app.addModule('MemberInfo', 'modules/member/management/userinfo/controllers/MemberInfo.js');
app.addModule('MemberModel', 'modules/member/management/userinfo/models/MemberModel.js');
app.addTemplate('template/member_info', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_info.html');
});
/*会员信息修改*/
app.addRoute('userinfo', function () {
  seajs.use(['MemberDetail'], function (MemberDetail) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('memberDetail', new MemberDetail({
      el: '.main-inner',
      viewId: 'memberDetail',
      id: app.getData('user')['memberId']
    }));
  });
});
app.addModule('MemberDetailModel', 'modules/member/management/userinfo/models/MemberDetailModel.js');
app.addModule('MemberDetail', 'modules/member/management/userinfo/controllers/MemberDetail.js');
app.addTemplate('template/member_detail', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_detail.html');
});
/*会员密码修改*/
app.addRoute('password', function () {
  seajs.use(['MemberPassword', 'template/member_password', 'MemberProtect'],
    function (MemberPassword, template, MemberProtect) {
      app.panel('main', {
        el: '#main',
        template: template
      }).add('memberPassword', new MemberPassword({
        el: '#password-panel',
        viewId: 'memberPassword',
        id: app.getData('user')['memberId']
      })).add('memberProtect', new MemberProtect({
        el: '#protect-panel',
        viewId: 'memberProtect',
        id: app.getData('user')['memberId']
      }));
    });
});
app.addModule('MemberPassword', 'modules/member/management/userinfo/controllers/MemberPassword.js');
app.addModule('MemberProtect', 'modules/member/management/userinfo/controllers/MemberProtect.js');
app.addTemplate('template/member_password', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_password.html');
});
app.addTemplate('template/member_password_modify', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_password_modify.html');
});

app.addTemplate('template/member_password_question', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_password_question.html');
});

/*
 收货地址*/
app.addRoute('address', function () {
  seajs.use(['MemberAddressList'], function (MemberAddressList) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('memberAddressList', new MemberAddressList({
      el: '.main-inner',
      viewId: 'memberAddressList'
    }));
  });
});
app.addRoute('address/:id', function (id) {
  seajs.use(['MemberAddressDetail'], function (MemberAddressDetail) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('memberAddressDetail', new MemberAddressDetail({
      el: '.main-inner',
      viewId: 'memberAddressDetail',
      id: id === 'add' ? null : id
    }));
  });
});

app.addModule('MemberAddressList', 'modules/member/management/userinfo/controllers/MemberAddressList.js');
app.addModule('MemberAddressModel', 'modules/member/management/userinfo/models/MemberAddressModel.js');
app.addModule('MemberAddressDetail', 'modules/member/management/userinfo/controllers/MemberAddressDetail.js');
app.addTemplate('template/member_address_list', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_address_list.html');
});
app.addTemplate('template/member_address_item', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_address_item.html');
});
app.addTemplate('template/member_address_detail', function (require, exports, module) {
  module.exports = require('modules/member/management/userinfo/views/member_address_detail.html');
});