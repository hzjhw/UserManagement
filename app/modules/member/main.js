/**
 * @description config
 * @namespace config
 * @author wxw<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 路由
 * */

app.addRoute('member', function () {
  seajs.use(['jquery', 'MemberList'],
    function (jquery, MemberList) {
      app.addPanel('main', {
        el: '#jhw-main',
        template: '<div class="jhw-main-inner"></div>'
      }).addView('memberList', new MemberList({
        el: '.jhw-main-inner'
      }));
    });
});
function memberRoute(id) {
  seajs.use(['MemberListDetail'], function (MemberListDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('memberListDetail', new MemberListDetail({
      el: '.jhw-panel',
      viewId: 'memberListDetail',
      id: id
    }));
  })
}
app.addRoute('member_add', function () {
  memberRoute();
});
app.addRoute('member_edit/:id', function (id) {
  memberRoute(id);
});

app.addRoute('member/attr', function () {
  seajs.use(['jquery', 'MemberAttribute'],
    function (jquery, MemberAttribute) {
      app.addPanel('main', {
        el: '#jhw-main',
        template: '<div class="jhw-panel"></div>'
      }).addView('memberAttribute', new MemberAttribute({
        el: '.jhw-panel',
        viewId: 'memberAttribute'
      }));
    });
});

app.addRoute('member/rank', function () {
  seajs.use(['jquery', 'MemberRank'],
    function (jquery, MemberRank) {
      app.addPanel('main', {
        el: '#jhw-main',
        template: '<div class="jhw-panel"></div>'
      }).addView('memberRank', new MemberRank({
        el: '.jhw-panel',
        viewId: 'memberRank'
      }));
    });
});

function memberRankRoute(id) {
  seajs.use(['MemberRankDetail'], function (MemberRankDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('memberRankDetail', new MemberRankDetail({
      el: '.jhw-panel',
      viewId: 'memberRankDetail',
      id: id
    }));
  });
}
app.addRoute('member_rank_add', function () {
  memberRankRoute();
});
app.addRoute('member_rank_edit/:id', function (id) {
  memberRankRoute(id);
});

function memberAttrRoute(id) {
  seajs.use(['MemberAttributeDetail'], function (MemberAttributeDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('memberAttributeDetail', new MemberAttributeDetail({
      el: '.jhw-panel',
      viewId: 'memberAttributeDetail',
      id: id
    }));
  });
}
app.addRoute('member_attr_add', function () {
  memberAttrRoute();
});
app.addRoute('member_attr_edit/:id', function (id) {
  memberAttrRoute(id);
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
