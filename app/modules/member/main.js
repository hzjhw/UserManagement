/**
 * @description config
 * @namespace config
 * @author wxw<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 路由
 * */

app.addRoute('member', function () {
  seajs.use(['jquery', 'BaseView', 'MemberList', 'template/member_panel'],
    function (jquery, BaseView, MemberList, template) {
      var MemberPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('member', new MemberPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('memberLIst', new MemberList({
          el: '.jhw-main-inner',
          viewId: 'memberList'
        }));
      }).render();
    });
});

app.addRoute('member/attr', function () {
  seajs.use(['jquery', 'BaseView', 'MemberAttribute', 'template/member_panel'],
    function (jquery, BaseView, MemberAttribute, template) {
      var MemberAttrPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('memberAttr', new MemberAttrPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('memberAttribute', new MemberAttribute({
          el: '.jhw-main-inner',
          viewId: 'memberAttribute'
        }));
      }).render();
    });
});

app.addRoute('member/rank', function () {
  seajs.use(['jquery', 'BaseView', 'MemberRank', 'template/member_panel'],
    function (jquery, BaseView, MemberRank, template) {

      var MemberRandPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('memberRank', new MemberRandPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('memberRank', new MemberRank({
          el: '.jhw-main-inner',
          viewId: 'memberRank'
        }));
      }).render();
    });
});


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
 * 模板
 * */

app.addTemplate('template/member_search', function (require, exports, module) {
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
app.addTemplate('template/member_rank_detail', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank_detail.html');
});
app.addTemplate('template/member_rank_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank_item.html');
});
//member_attribute
app.addTemplate('template/member_attribute', function (require, exports, module) {
  module.exports = require('modules/member/views/member_attribute.html');
});
app.addTemplate('template/member_attribute_detail', function (require, exports, module) {
  module.exports = require('modules/member/views/member_attribute_detail.html');
});
app.addTemplate('template/member_attribute_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_attribute_item.html');
});
app.addTemplate('template/member_attributes_show_item', function (require, exports, module) {
  module.exports = require('modules/member/views/member_attributes_show_item.html');
});
app.addTemplate('template/member_panel', function(require, exports, module){
  module.exports = require('modules/member/views/member_panel.html');
});
