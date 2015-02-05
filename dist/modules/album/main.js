/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
app.addRoute('album', function () {
  seajs.use(['jquery', 'BaseView', 'AlbumList', 'PhotoList', 'template/album_panel', 'Utils'],
    function (jquery, BaseView, AlbumList, PhotoList, panelTemp, Utils) {

      var Panel = BaseView.extend({
        events: {
          'click .btn-search': 'search',
          'click .btn-album-add': 'albumAdd',
          'click .btn-pic-add': 'picUpload'
        },
        initialize: function () {
          this._initialize({
            template: panelTemp,
            enterRender: '.btn-search'
          });
        },
        render: function () {
          this._render();
        },
        picUpload: function () {
          var doResult = function () {
          }
          Utils.openUpload({
            id: 'uploadDialog',
            albumId: app.getData('curAlbumId'),
            username: app.getData('user').username,
            auto: true,
            oniframeload: function () {
              this.iframeNode.contentWindow.uploadCallback = doResult;
            }
          });
        },
        search: function () {
          app.getView('photoList').search(this.$('.search-text').val());
        },
        albumAdd: function () {
          window.parentId = app.getData('curAlbumId');
          this._dialog({
            moduleId: 'AlbumDetail',
            title: '相册分类添加',
            width: 700,
            height: 200,
            onClose: function () {
              app.getView('albumList')._load();
            }
          });
          /*app.getView('albumList')._detail({
           end: '&parentId=' + app.getData('curAlbumId')
           });*/
        }
      });
      app.addPanel('main', {
        el: '#jhw-main',
        template: '<div class="jhw-main-inner"><div class="photo-bar"></div><div class="photo-main"></div></div>'
      }).addView('album', new Panel({
        el: '.photo-bar'
      }).on('after', function () {
          app.addData('curAlbumId', 'all');
          app.addView('photoList', new PhotoList());
          app.addView('albumList', new AlbumList({
            el: '.album_left',
            callback: function (albumId) {
              app.getView('photoList').reLoad(albumId);
            }
          }));
        }).render())
      /*.addView('photoList', new PhotoList({
       el: '.photo-main'
       })).addView('albumList', new AlbumList({
       el: '.album_left',
       callback: function (albumId) {
       app.getView('photoList').reLoad(albumId);
       }
       }));*/


      /* .on('after', function () {
       this.photoList = app.addView('photoList', new PhotoList());
       this.albumList = app.addView('albumList', new AlbumList({
       el: '.album_left',
       callback: function (albumId) {
       app.getView('photoList').reLoad(albumId);
       }
       }));
       }).render();*/
    });
});

app.addModule('AlbumList', 'modules/album/controllers/AlbumList.js');
app.addModule('AlbumModel', 'models/AlbumModel.js');
app.addModule('AlbumDetail', 'modules/album/controllers/AlbumDetail.js');
app.addModule('PhotoList', 'modules/album/controllers/PhotoList.js');
app.addModule('PhotoModel', 'models/PhotoModel.js');
app.addModule('PhotoSelect', 'modules/album/controllers/PhotoSelect.js');
app.addModule('iframetransport', 'vendor/file-upload/jquery.iframe-transport.js');
app.addModule('ZeroClipboard', 'vendor/zeroclipboard/ZeroClipboard.js');
app.addModule('ui-widget', 'vendor/file-upload/jquery.ui.widget.js');
app.addModule('fileupload', 'vendor/file-upload/jquery.fileupload.js');
app.addModule('SWFUpload', 'vendor/swf-upload/swfupload-debug.js');

app.addTemplate('template/album_list', function (require, exports, module) {
  module.exports = require('modules/album/views/album_list.html');
});
app.addTemplate('template/album_item', function (require, exports, module) {
  module.exports = require('modules/album/views/album_item.html');
});
app.addTemplate('template/album_panel', function (require, exports, module) {
  module.exports = require('modules/album/views/album_panel.html');
});
app.addTemplate('template/photo_list', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_list.html');
});
app.addTemplate('template/photo_item', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_item.html');
});
app.addTemplate('template/album_detail', function (require, exports, module) {
  module.exports = require('modules/album/views/album_detail.html');
});
app.addTemplate('template/photo_copy', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_copy.html');
});
app.addTemplate('template/photo_select_item', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_select_item.html');
});
app.addTemplate('template/photo_select_list', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_select_list.html');
});
