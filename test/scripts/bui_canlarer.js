/**
 * @description bui_canlarer
 * @namespace bui_canlarer
 * @author yongjin on 2014/11/10
 */
<div class="control-group">
    <label class="control-label">上架时间：</label>

    <div class="controls">
        <input type="text" class="calendar"/>
    </div>
</div>

// 时间
BUI.use('bui/calendar',function(Calendar){
    new Calendar.DatePicker({
        trigger:'.calendar',
        autoRender : true
    });
});