/**
 * @descr
 * iption MessageList
 * @namespace MessageList
 * @author wxw on 2014/12/12
 */
define('WwyMessageList', ['jquery', 'WwyMessageModel', 'WwyModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/wwy_message_list', 'template/wwy_message_item', 'BaseUtils'],
    function (require, exports, module) {
        var WwyMessageModel,WwyModel,BaseCollection, BaseItem, BaseList, HandlebarsHelper, WwyMessageList, WwyItem,
            WwyMessageCollection, listTemp, itemTemp, BaseUtils, wyId;

        WwyMessageModel = require('WwyMessageModel');
        WwyModel = require('WwyModel');
        BaseCollection = require('BaseCollection');
        BaseItem = require('BaseItem');
        BaseList = require('BaseList');
        HandlebarsHelper = require('HandlebarsHelper');
        listTemp = require('template/wwy_message_list');
        itemTemp = require('template/wwy_message_item');
        BaseUtils = require('BaseUtils');

        /**
         * 集合类
         */
        WwyMessageCollection = BaseCollection.extend({
            url: function () {
                return CONST.API + '/wwy/message/list/' + this.getWyId()
            },
            model: WwyMessageModel,
            initialize: function () {
                this._initialize();
            },
            setWyId: function (wyId) {
                this.wyId = wyId;
            },
            getWyId: function () {
                return this.wyId;
            }
        });


        /**
         * 单视图
         */
        WwyMessageItem = BaseItem.extend({
            tagName: 'tr',
            className: 'bui-grid-row',
            events: {
                'click .toggle': '_toggleChecked'
            },
            // 初始化
            initialize: function () {
                this._initialize({ template: itemTemp, model: WwyMessageModel});
            },
            // 渲染文档
            render: function () {
                this._render();
            }
        });
        /**
         * 列表视图
         */
        WwyMessageList = BaseList.extend({
            el: '#jhw-main',
            events: {
                'click #toggle-all': '_toggleAllChecked'
            },
            initialize: function (options) {
                var ctx = this;
                this.options = options || {};
                this.editItem = true;
                var detail = new WwyModel();
                detail.set("id",options.wyId);
                detail.fetch({
                    sync: true
                }).then(function(result){
                        ctx.options.args = {
                            msgctrl:detail.msgctrl
                        }
                        ctx._initialize({
                            render: '#wwy-message-list-ul',
                            enterRender: '.btn-search',
                            template: listTemp,
                            model: WwyMessageModel,
                            collection: WwyMessageCollection,
                            item: WwyMessageItem
                        }).then(function (baseListCtx) {
                                baseListCtx._initPagination(baseListCtx._options);
                                baseListCtx._load({
                                    beforeLoad: function (collection) {
                                        collection.setWyId(options.wyId);
                                    }
                                })
                            }).then(function (thisCtx) {
                                thisCtx._initPagination(thisCtx._options);
                                thisCtx._load(thisCtx._options);
                            });
                })
               // this.option.args.msgctrl = '1,3,4';

            }

        });
        module.exports = WwyMessageList;
    });