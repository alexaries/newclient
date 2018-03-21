/**
 * Created by Administrator on 14-6-5.
 * 消息附件显示
 */
var KitShow = cc.Node.extend({
    mKit:null,//附件信息
    mIndex:0, //某位置
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgSprite = cc.Sprite.create("#kuang.png")
            this.addChild(bgSprite,2)

            var propSprite = cc.Sprite.create("#yuanbao.png")
            this.addChild(propSprite,0)
            propSprite.setTag(9001)

            var mask = cc.Sprite.create("#mask.png")
            mask.setScaleY(0.45);
            mask.setScaleX(1.6);
            mask.setPosition(cc.p(0,-28));
            this.addChild(mask,1)

            var tiplabel = cc.LabelTTF.create(100, sGameData.mFontname, 20,//字体  ，字体大小
                cc.size(80,30),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setPosition(cc.p(0,-28));
            this.addChild(tiplabel,1);
            tiplabel.setTag(8001)

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置附件
    setKit:function(kit){
        this.mKit = kit;
        this.updateInfo();
    },
    //更新显示
    updateInfo:function(){
        var pic = "yuanbao.png"
        var num = 1;
        if(this.mKit.type == GOODS_SOFTCASH){
            pic = "yinliang.png"
            num = this.mKit.value;
        }else if(this.mKit.type == GOODS_HARDCASH){
            pic = "yuanbao.png"
            num = this.mKit.value;
        }
        var propSprite = this.getChildByTag(9001)
        if(propSprite){
            propSprite.setSpriteFrame(pic);
        }
        var tiplabel = this.getChildByTag(8001)
        if(tiplabel){
            tiplabel.setString(num);
        }

    }
});
KitShow.create = function () {
    var sg = new KitShow();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
