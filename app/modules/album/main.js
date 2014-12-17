/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */

app.addModule('AlbumList', 'modules/album/controllers/AlbumList.js');
app.addModule('AlbumModel', 'models/AlbumModel.js');
app.addModule('AlbumDetail', 'modules/album/controllers/AlbumDetail.js');
app.addModule('iframetransport', 'vendor/file-upload/jquery.iframe-transport.js');
app.addModule('ZeroClipboard', 'vendor/zeroclipboard/ZeroClipboard.js');
app.addModule('ui-widget', 'vendor/file-upload/jquery.ui.widget.js');
app.addModule('fileupload', 'vendor/file-upload/jquery.fileupload.js');
app.addTemplate('template/album_list', function (require, exports, module) {
  module.exports = require('modules/album/views/album_list.html');
});
app.addTemplate('template/album_item', function (require, exports, module) {
  module.exports = require('modules/album/views/album_item.html');
});
app.addTemplate('template/album_panel', function (require, exports, module) {
  module.exports = require('modules/album/views/album_panel.html');
});
app.addModule('PhotoList', 'modules/album/controllers/PhotoList.js');
app.addModule('PhotoModel', 'models/PhotoModel.js');
app.addTemplate('template/photo_list', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_list.html');
});
app.addTemplate('template/photo_item', function (require, exports, module) {
  module.exports = require('modules/album/views/photo_item.html');
});
app.addTemplate('template/album_detail', function(require, exports, module){
  module.exports = require('modules/album/views/album_detail.html');
});
app.addTemplate('template/photo_copy', function(require, exports, module){
  module.exports = require('modules/album/views/photo_copy.html');
});
app.addRoute('album', function () {
  seajs.use(['jquery', 'BaseView', 'AlbumList', 'PhotoList', 'template/album_panel', 'fileupload', 'iframetransport'],
    function (jquery, BaseView, AlbumList, PhotoList, panelTemp, fileupload, iframetransport) {

      var Panel = BaseView.extend({
        el: '#jhw-main',
        events: {
          'click .btn-search': 'search',
          'click .btn-album-add': 'albumAdd'
        },
        initialize: function () {
          this._initialize({
            template: panelTemp,
            enterRender: '.btn-search'
          });
        },
        render: function () {
          this._render();
          this.$('#fileupload').fileupload({
            url: CONST.DOMAIN + '/commonutil/uploadUtil2',
            dataType: 'json',
            fail: function (ev, data) {
              if (data.jqXHR) {
                alert('Server-error:\n\n' + data.jqXHR.responseText);
              }
            },
            done: function (e, data) {
              /*$.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
              });*/
            },
            progressall: function (e, data) {
              var progress = parseInt(data.loaded / data.total * 100, 10);
              $('#progress .progress-bar').css(
                'width',
                  progress + '%'
              );
            }
          }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
        },
        search: function () {
          app.getView('photoList').search(this.$('.search-text').val());
        },
        albumAdd: function(){
          app.getView('albumList')._detail();
        }
      });
      var panel = new Panel();
      panel.on('after', function () {
        this.albumList = app.addView('albumList', new AlbumList());
        this.photoList = app.addView('photoList', new PhotoList());
      });
      panel.render();
    });
});