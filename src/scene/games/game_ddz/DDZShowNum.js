/**
 * Created by apple on 15-5-22.
 */
var DDZShowNum = cc.Node.extend({
    mIndex:0, //某位置
    mValue:0, // 值
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            bRet = true;
        }
        return bRet;
    },
    setValue:function(value){
        if(value == null) value = 0;
        this.removeAllChildren(true);
        this.mValue = value;
        var vstr = ""+value;

        var xnumsprite = cc.Sprite.create("#ddz_w_x.png");
        xnumsprite.setPosition(cc.p(-26,0));
        this.addChild(xnumsprite,1);

        var ttw = 0
        var tth = 0
        for(var i = 0;i<vstr.length;i++){
            var tw = 26;
            var tempx = 0;
            var pname = "#ddz_w_"+vstr[i]+".png"
            var numsprite = cc.Sprite.create(pname);
            numsprite.setPosition(cc.p(tempx+tw*i,0));
            this.addChild(numsprite,1);
            ttw = tw;
            tth = 29;
        }
        this.mCSize = cc.size(ttw*vstr.length,tth)
    }
});
DDZShowNum.create = function () {
    var sg = new DDZShowNum();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
