/**
 * @description AttributesCollection
 * @namespace AttributesCollection
 * @author yongjin on 2014/11/13
 */

define('AttributesCollection', ['jquery', 'BaseCollection', 'AttributesModel'],
    function(require, exports, module){
        var AttributesCollection, BaseCollection, AttributesModel;

        BaseCollection = require('BaseCollection');
        AttributesModel = require('AttributesModel');

        AttributesCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/attr/list',
            model: AttributesModel
        });

        module.exports = AttributesCollection;

});