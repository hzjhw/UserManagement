/**
 * @description MemberLeftInfo
 * @namespace MemberLeftInfo
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberLeftInfo', ['BaseView', 'template/member_left_info'],
  function (require, exports, module) {
    var MemberLeftInfo, BaseView, template;

    BaseView = require('BaseView');
    template = require('template/member_left_info');

    MemberLeftInfo = BaseView.extend({
      events: {
        'click .logout': 'logout'
      },
      initialize: function () {
        this._initialize({
          template: template,
          data: app.getData('memberInfo')
        });
        this.render();
      },
      logout: function(){
        $.ajax({
          type: 'get',
          url: CONST.API + '/shop/member/logout',
          async: false,
          success: function(result){
            //if (top) top.window.reload();
            window.location.href=CONST.HOST + '/modules/member/management/login/login.html'
          }
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MemberLeftInfo;
  });