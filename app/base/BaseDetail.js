/**
 * @description BaseDetail
 * @namespace BaseDetail
 * @author yongjin on 2014/11/12
 */

define('BaseDetail', ['jquery', 'underscore', 'backbone', 'Est'],
    function (require, exports, module) {
        var BaseDetail, Backbone, Est;

        Backbone = require('backbone');
        Est = require('Est');

        BaseDetail = Backbone.View.extend({
            /**
             * 初始化模型类 将自动判断是否有ID传递进来，
             * 若存在则从服务器端获取详细内容
             * 若为添加， 则设置ctx._isAdd = true
             *
             * @method [public] - initModel
             * @param model
             * @param ctx
             * @author wyj on 14.11.15
             */
            initModel: function (model, ctx) {
                ctx._isAdd = false;
                ctx.passId = Est.getUrlParam('id', window.location.href);
                if (!Est.isEmpty(this.passId)) {
                    ctx.model = new model();
                    ctx.model.set('id', ctx.passId);
                    ctx.model.fetch().done(function () {
                        ctx.render().resetIframe();
                    });
                } else {
                    ctx._isAdd = true;
                    ctx.passId = new Date().getTime();
                    ctx.model = new model();
                    ctx.render().resetIframe();
                }
            },
            /**
             * form包装器， 传递表单选择符
             *
             * @method [public] - form
             * @param {String} formSelector 选择器
             * @returns {BaseDetail}
             * @author wyj on 14.11.15
             */
            form: function(formSelector){
                this.formSelector = formSelector;
                return this;
            },
            /**
             * 启用表单验证
             *
             * @method [public] - validate
             * @returns {BaseDetail}
             * @author wyj 14.11.15
             */
            validate: function(){
                var ctx = this;
                BUI.use('bui/form', function (Form) {
                    new Form.Form({
                        srcNode: ctx.formSelector
                    }).render();
                }); return this;
            },
            /**
             * 绑定提交按钮
             *
             * @method [public] - init
             * @param callback
             * @author wyj 14.11.15
             * @example
             *      this.form("#J_Form").validate().init(function () {
                    this.model.set("attributeOptionList", Est.pluck(this.optionsInstance.getItems(), 'value'))
                });
             */
            init: function(callback){
                var ctx = this;
                $('#submit', this.el).on('click', function () {
                    $("input, textarea, select", $(ctx.formSelector)).each(function () {
                        var name, val, pass; name = $(this).attr('name');
                        var modelId = $(this).attr('id');
                        if (modelId && modelId.indexOf('model-') !== -1 && !Est.isEmpty(name)){
                            switch (this.type){
                                case 'radio':
                                    val = $(this).is(":checked") ? $(this).val() : pass = true; break;
                                default :
                                    val = $(this).val();break;
                            }
                            if (!pass){
                                ctx.model.set(name, val);
                            }
                        }
                    });
                    if (typeof callback !== 'undefined')
                        callback.call(ctx);
                    ctx.saveItem(function () {
                    });
                });
            },
            /**
             * 保存表单
             *
             * @method [pubic] - saveItem
             * @param callback
             * @param context
             * @author wyj 14.11.15
             */
            saveItem: function (callback, context) {
                console.log('BaseDetail.saveItem');
                this.model.save(null, {
                    wait: true,
                    success: function (response) {
                        console.log('BaseDetail.saveSuccess');
                        if (top) {
                            top.model = response.attributes;
                        }
                        if (callback && typeof callback === 'function')
                            callback.call(context, response);
                    }
                });
            },
            /**
             * 获取产品分类
             *
             * @method [public] - getProductCategory
             * @param options select 转换成select形式，extend 转换成列表形式
             * @returns {ln.promise}
             * @author wyj 14.11.15
             */
            getProductCategory: function(options){
                return new Est.promise(function(topResolve, topReject){
                    options.select = options ? options.select ? true : false : false;
                    options.extend = options ? options.extend ? true : false : false;
                    var getCategory = function(){
                        return new Est.promise(function(resolve, reject){
                            $.ajax({
                                type: 'post',
                                url: 'http://jihui88.com/rest/api/category/product?pageSize=1000',
                                data: {
                                    _method: 'GET'
                                },
                                success: function (result) {
                                    resolve(result);
                                }
                            });
                        });
                    }
                    getCategory().then(function(result){
                        if (result.attributes) {
                            result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '01', {
                                categoryId: 'categoryId',// 分类ＩＤ
                                belongId: 'belongId',// 父类ＩＤ
                                childTag: 'cates', // 子分类集的字段名称
                                sortBy: 'sort', // 按某个字段排序
                                callback: function (item) {
                                    item.text = item.name;
                                    item.value = item.categoryId
                                }
                            });
                            if (options.select){
                                result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                                    name: 'text'
                                })
                            }
                            if (options.extend){
                                result.attributes.data = Est.extendTree(result.attributes.data);
                            }
                        } else{
                            result.attributes.data = [];
                        }
                        result.attributes.data.unshift({text: '请选择分类', value: '0'});
                        topResolve(result.attributes.data);
                    });
                });
            },
            /**
             * 下拉框初始化
             *
             * @method [render] - initSelect
             * @param options  [target 文本框ID] [render 渲染ID] [itemId ID标识] [width 宽度] [items 数组]
             * @returns {ln.promise} 返回promise
             * @author wyj 14.11.15
             */
            initSelect: function (options) {
                return new Est.promise(function(resove, reject){
                    var container = {};
                    var target = options.target || '#category';
                    var render = options.render || '#s1';
                    var itemId = options.itemId || 'categoryId';
                    var width = options.width || '150';
                    var items = options.items || [];
                    BUI.use('bui/select', function (Select) {
                        container[render] = new Select.Select({
                            render: render,
                            valueField: target,
                            width: width,
                            items: items
                        });
                        container[render].render();
                        container[render].on('change', function (ev) {
                            $(target).val(Est.trim(ev.item[itemId]));
                            if (typeof options.change !== 'undefined')
                                options.change.call(this, ev.item[itemId]);
                            resove(ev.item[itemId]);
                        });
                    })
                });
            },
            /**
             * 初始化编辑器
             *
             * @method [public] - initEditor
             * @author wyj 14.11.15
             */
            initEditor: function(){
                seajs.use(['xheditor'], function(xheditor){
                    function startEditor(obj){
                        $(obj).xheditor(
                            {
                                tools : 'Preview,Fullscreen,Source,|,contact,abbccQQ,abbccMap,abbccLayout,abbccQrcode,|,Table,abbccImages,abbccFlash,Media,|,FontColor,BackColor,|,Align,Underline,Italic,Bold,|,FontSize,Fontface,|,Link,Unlink',
                                layerShadow : 2,
                                html5Upload : false,
                                upBtnText : '浏览',
                                upLinkExt : 'jpg,png,bmp',
                                upImgUrl : '/fileUpload/uploadByJson',
                                upFlashUrl : '/fileUpload/uploadByJson',
                                upMediaUrl: '/fileUpload/uploadByJson',
                                upFlashExt : "swf",
                                upMediaExt:'wmv,avi,wma,mp3,mid',
                                linkTag:true,
                                internalScript:true,
                                inlineScript:true
                            });
                    }
                    $(function() {
                        $(".ckeditor").each(function(){
                            startEditor($(this));
                        });

                    })
                });
            },
            /**
             * 重置表单
             */
            reset: function () {
                this.model.set(this.model.defaults);
            },
            /**
             * 重置对话框高度
             * @method [public] - resetIframe
             * @author wyj 14.11.16
             */
            resetIframe: function () {
                try{
                    window.detailDialog.height($(document).height());
                } catch(e){
                    console.error('【error】: BaseDetail.resetIframe' + e);
                }
            },
            /**
             * 移除模型类
             *
             * @method [public] - remove
             * @returns {BaseDetail}
             * @author wyj 14.11.16
             */
            remove: function () {
                console.log('BaseDetail.remove');
                this.model.destroy();
                this.model = null;
                return this;
            },
            /**
             * 移除所有绑定的事件
             *
             * @method [public] - close
             * @author wyj 14.11.16
             */
            close: function () {
                console.log('BaseDetail.close');
                this.undelegateEvents();
                this.stopListening();
                this.off();
            }
        });

        module.exports = BaseDetail;
    });