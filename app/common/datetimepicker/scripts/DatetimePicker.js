/**
 * @description datatimepicker
 * @namespace datatimepicker
 * @author yongjin on 2014/11/3
 */

define('DatetimePicker', ['jquery', 'underscore', 'backbone', 'datetimepicker'],
    function(require, exports, module){
        var DatetimePicker, datetimepicker;

        datetimepicker = require('datetimepicker');

        var datetimepickerModel = Backbone.Model.extend({
            defaults: {
                date: new Date()
            }
        });

        DatetimePicker = Backbone.View.extend({
            el: '.datetimepicker',
            model: new datetimepickerModel,
            events: {

            },
            initialize: function(){
                this.listenTo(this.model, 'change: date', this.render);
                this.render();
            },
            render: function(){
                new datetimepicker(this.el, {
                    lang: 'ch',
                    lazyInit: true,
                    closeOnDateSelect: true,
                    onChangeDateTime: $.proxy(this.changeDate, this)
                });
            },
            changeDate: function (dp, $input) {
                this.model.set('date', $input.val());
            }
        });


        /*// 定义一个集合
        var col = Backbone.Collection.extend({});
        var colInstance = new col();
        colInstance.set([
            {
                date: new Date()
            }
        ]);
        // Itemview
        var movieItemView = Marionette.ItemView.extend({
            tagName: "li",
            className: 'listItem',
            template: "#movie-list-item",
            ui: {
                dateInput: '.datetimepicker'
            },
            onShow: function () {
                // Invoke the datetimepicker plugin
                this.ui.dateInput.datetimepicker({
                    lang: 'ch',
                    // Lazy init to prevent a lot of instances right away
                    lazyInit: true,
                    closeOnDateSelect: true,

                    // Proxy the callback function to retain view scope
                    onChangeDateTime: $.proxy(this.changeDate, this)
                });
            },
            changeDate: function (dp, $input) {
                this.model.set('date', $input.val());
            },
            onClose: function () {
                // Destroy the datetimepicker plugin
                this.ui.dateInput.datetimepicker('destroy');
            },
            modelEvents: {
                'change:date': 'updateDate'
            },
            updateDate: function () {
                // Check if we need to update the date.
                var modelDate = this.model.get('date');
                if (modelDate != this.ui.dateInput.val()) {
                    this.ui.dateInput.val(modelDate);
                }
            }
        });

        // Composite view
        var movieCompView = Marionette.CompositeView.extend({
            template: "#movie-list",
            itemViewContainer: ".panel-body",
            itemView: movieItemView
        });

        // Create a region
        var rm = new Marionette.RegionManager();
        rm.addRegion("container1", "#container1");
        rm.addRegion("container2", "#container2");

        // Show the collectionView
        function showViews() {
            rm.get('container1').show();
            rm.get('container2').show(new movieCompView({
                collection: colInstance
            }));
        }

        showViews();

        datetimepicker = function(){
            new movieItemView();
        }*/


        module.exports = DatetimePicker;
    });