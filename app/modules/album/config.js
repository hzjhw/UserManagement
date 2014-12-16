/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */

app.addModule('AlbumList', 'modules/album/controllers/AlbumList.js');
app.addModule('AlbumModel', 'models/AlbumModel.js');
app.addTemplate('template/album_list', function (require, exports, module) {
  module.exports = require('modules/album/views/album_list.html');
});
app.addTemplate('template/album_item', function (require, exports, module) {
  module.exports = require('modules/album/views/album_item.html');
});
app.addTemplate('template/album_panel', function(require, exports, module){
  module.exports = require('modules/album/views/album_panel.html');
});
app.addRoute('album', function () {
  seajs.use(['jquery', 'BaseView', 'AlbumList', 'PhotoList', 'template/album_panel'],
    function (jquery, BaseView, AlbumList, PhotoList, panelTemp) {

    var Panel = BaseView.extend({
      el: '#jhw-main',
      events: {
        'click .btn-search': 'search'
      },
      initialize: function(){
        this._initialize({
          template: panelTemp,
          enterRender: '.btn-search'
        });
      },
      render: function(){
        this._render();
      },
      search: function(){
        app.getView('photoList').search();
      }
    });
      var panel = new Panel();
      panel.on('after', function(){
        this.albumList = app.addView('albumList', new AlbumList());
        this.photoList = app.addView('photoList', new PhotoList({itemId: 'all'}));
      });
      panel.render();
  });
});


app.addModule('PhotoList', 'modules/album/controllers/PhotoList.js');
app.addModule('PhotoModel', 'models/PhotoModel.js');
app.addTemplate('template/photo_list', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_list.html');
});
app.addTemplate('template/photo_item', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_item.html');
});
