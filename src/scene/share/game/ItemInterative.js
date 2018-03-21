/**
 * Created by apple on 14-7-18.
 * 交互项（扔炸弹）
 */

var ItemInterative = cc.Node.extend({
    mIndex:0, //某位置
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var csize = cc.size(140,140);
            this.setContentSize(csize);

//            var mask = cc.Sprite.create("#mask.png")
//            mask.setScale(138/mask.width);
//            this.addChild(mask)

            var inters = ["interative_1","interative_2","interative_3","interative_4","interative_5","interative_6","interative_7","interative_8"];
            var names = [sResWord.w_interative_1,sResWord.w_interative_2,sResWord.w_interative_3,sResWord.w_interative_4,sResWord.w_interative_5,sResWord.w_interative_6,sResWord.w_interative_7,sResWord.w_interative_8];
            var picname = "#"+inters[this.mIndex]+".png";
            var sprite = cc.Sprite.create(picname);
            this.addChild(sprite,1);

            var name = names[this.mIndex]
            var nameLabel = cc.LabelTTF.create(name, sGameData.mFontname,24)
            nameLabel.setPosition(cc.p(0,-67));
            this.addChild(nameLabel, 5);
            nameLabel.setTag(18001);


            //xxx
            bRet = true;
        }
        return bRet;
    },
    //检测点击
    checkClick:function(pos){
        var cardsize = cc.size(108,108);
        var cpos = cc.p(this.x-108/2,this.y-108/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    }
});
ItemInterative.create = function (index) {
    var sg = new ItemInterative();
    if (sg) {
        sg.mIndex = index
        sg.init()
        return sg;
    }
    return null;
};
