/**
 * 基本对象
 */
var BaseObject = cc.Node.extend({
    mIndex:0, //某位置
    init:function () {
        var bRet = false;
        if (this._super()) {

            bRet = true;
        }
        return bRet;
    },
    //label按宽度放缩
    setLabelScale:function(label,width){
        if(label.getContentSize().width > width){
            label.setScale(width/label.getContentSize().width);
        }
    }
});
BaseObject.create = function () {
    var sg = new BaseObject();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
