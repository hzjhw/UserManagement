/**
 * @description 标签模型类
 * @namespace TagModel
 * @author yongjin on 2014/11/18
 */

define('TagModel', ['jquery', 'BaseModel'], function(require, exports, module){
  var BaseModel, TagModel;

    BaseModel = require('BaseModel');

    TagModel = BaseModel.extend({
      baseId: 'tagId',
      url: CONST.API + '/tag/detail',
      defaults: Est.extend({}, BaseModel.prototype.defaults)
    });

    module.exports = TagModel;
});
