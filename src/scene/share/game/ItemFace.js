/**
 * Created by apple on 14-8-1.
 * 表情 项
 */
var ItemFace = cc.Node.extend({
    mIndex:0, //某位置
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var csize = cc.size(140,140);
            this.setContentSize(csize);

            var picname =  "#face_"+this.mIndex+".png";
            if(this.mIndex<10){
                picname =  "#face_0"+this.mIndex+".png";
            }
            var sprite = cc.Sprite.create(picname);
            sprite.setScale(0.75);
            this.addChild(sprite,1);

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //检测点击表情
    checkClick:function(pos){
        var cardsize = cc.size(100,100);
        var cpos = cc.p(this.x-100/2,this.y-100/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    }
});
ItemFace.create = function (index) {
    var sg = new ItemFace();
    if (sg) {
        sg.mIndex = index
        sg.init()
        return sg;
    }
    return null;
};
