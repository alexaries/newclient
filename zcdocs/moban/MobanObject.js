
var MobanObject = cc.Node.extend({
    mIndex:0, //某位置
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            bRet = true;
        }
        return bRet;
    }
});
MobanObject.create = function () {
    var sg = new MobanObject();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
