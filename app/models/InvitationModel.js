/**
 * @description InvitationModel
 * @class InvitationModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/28
 */
define('InvitationModel', ['BaseModel'], function (require, exports, module) {
  var InvitationModel, BaseModel;

  BaseModel = require('BaseModel');

  InvitationModel = BaseModel.extend({
    defaults: Est.extend({
      titleTheme: 'css/dianna_royalblue/custom4.css',
      font: '-',
      music: '-',
      title: 'XXX新品发布会',
      title1: '2015年01月31日{活动日期}',
      invite: {
        title: '活 动 介 绍',
        display: '01',
        content: '<div style="text-align: center;"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">感谢您长久的关照支持，</span></span></div> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">这些年您伴随着我们成长，</span></span></p> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">创造了许多的不可能，</span></span></p> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">赢来了诸多掌声，</span></span></p> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">2015年02月12日</span></span></p> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">诚挚邀请您亲临展会现场，</span></span></p> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">见证我们不断强大…</span></span></p> <p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">我们相约在aaaa，</span></span></p><p style="text-align:center"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">期待您光临！，</span></span></p><p style="text-align:right">&nbsp;</p> <p style="text-align:center;"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial">{{groomname}}与{{bridename}}敬邀</span></span></p> <p>&nbsp;</p> <table border="0" cellpadding="1" cellspacing="1" style="width:100%"> <tbody> <tr> <td style="text-align:right; vertical-align:top; white-space:nowrap; width:5%"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">日期：</span></span></td> <td style="text-align:left; vertical-align:top"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">{{activitydate}}</span></span></td> </tr> <tr> <td style="text-align:right; vertical-align:top; white-space:nowrap; width:5%"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">时间：</span></span></td> <td style="text-align:left; vertical-align:top"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">{{hour}}时{{minute}}分</span></span></td> </tr> <tr> <td style="text-align:right; vertical-align:top; white-space:nowrap; width:5%"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">地点：</span></span></td> <td style="text-align:left; vertical-align:top"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">{{activityplace}}</span></span></td> </tr> <tr> <td style="text-align:right; vertical-align:top; white-space:nowrap; width:5%"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">地址：</span></span></td> <td style="text-align:left; vertical-align:top"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">{{activityaddress}}</span></span></td> </tr> <tr> <td style="text-align:right; vertical-align:top; white-space:nowrap; width:5%"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">电话：</span></span></td> <td style="text-align:left; vertical-align:top"><span style="font-size:16px;"><span style="font-family:粗钢笔1,粗钢笔10,微软雅黑,宋体,microsoft jhenghei,microsoft yahei,arial;">{{contactphone}}</span></span></td> </tr> <tr> <td style="text-align:right; vertical-align:top; white-space:nowrap; width:5%">&nbsp;</td> <td style="text-align:left; vertical-align:top">&nbsp;</td> </tr> </tbody> </table> '
      },
      photos: {
        title: '活 动 相 册',
        display: '01',
        photos: []
      },
      mv: {
        title: '活 动 视 频',
        mv: 'http://youvivid-streaming.oss-cn-hangzhou.aliyuncs.com/IVT_template/wk-6GO-WUUS7A5kugNU8AQ.mp4',
        display: '01',
        pic: CONST.HOST + '/modules/wwy/invitation/website/images/mv.jpg'
      },
      message: {
        title: '活 动 回 函',
        display: '01',
        tip: '为了方便统整活动资料，请您花几分钟填写以下内容，并请及时回复，我们的活动会因您的协助更加美好。',
        template: 'template/invitation_wedding'
      },
      map: {
        title: '活 动 地 图',
        display: '01',
        desc: '绍兴市 地址：绍兴镜湖地区 电话：13588506961',
        address: '120,30',
        x: 120,
        y: 20
      },
      tip: {
        title: '活 动 提 醒',
        display: '01',
        txt: '距离开始时间还有',
        time: Est.dateFormat(new Date(), 'yyyy-MM-dd'),
        hour: 10,
        minute: 20
      },
      share: {
        title: '活 动 分 享',
        display: '01',
        url: 'http://'
      }
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/wqt/detail',
    baseId: 'wqtId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = InvitationModel;
});