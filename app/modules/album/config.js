/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */

app.addModule('AlbumList', 'modules/album/controllers/AlbumList.js');
app.addModule('AlbumModel', 'models/AlbumModel.js');
app.addTemplate('template/album_list', function(require, exports, module){
  module.exports = require('modules/album/views/album_list.html');
});
app.addTemplate('template/album_item' , function(require, exports, module){
  module.exports = require('modules/album/views/album_item.html');
});
app.addRoute('album', function(){
  seajs.use(['jquery', 'AlbumList'], function (jquery, AlbumList) {
    app.addView('albumList', new AlbumList());
  });
});