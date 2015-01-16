/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/1/16
 */
app.addRoute('tool', function(){
  seajs.use(['ToolPanel'], function(ToolPanel){
    app.addPanel('main', {
      el:'#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('toolPanel', new ToolPanel({
      el: '.jhw-panel',
      viewId: 'toolPanel'
    }));
  });
});
app.addModule('ToolPanel', 'modules/tool/controllers/ToolPanel.js');
app.addTemplate('template/tool_panel', function (require, exports, module) {
  module.exports = require('modules/tool/views/tool_panel.html');
});