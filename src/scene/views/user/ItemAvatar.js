/**
 * Created by Administrator on 14-6-11.
 * 头像 项
 */
var ItemAvatar = cc.Node.extend({
    mSex:0, //性别
    mIndex:0,//编号
    mChooseed:false,//是否选中
    mChooseSprite:null,//选中时高亮图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var picname = "#f_1.png"
            if(this.mSex == 1){
                picname = "#f_"+(this.mIndex+1)+".png"
            }else{
                picname = "#m_"+(this.mIndex+1)+".png"
            }
            var picsprite = cc.Sprite.create(picname)
            this.addChild(picsprite,5);
            picsprite.setScale(0.8);

            var choosesprite = cc.Sprite.create("#avatar_highlight.png")
            this.addChild(choosesprite,6);
            choosesprite.setScale(1.5);
            choosesprite.setVisible(false);
            this.mChooseSprite =choosesprite;

            bRet = true;
        }
        return bRet;
    },
    //选中
    choose:function(){
        this.mChooseed = true;
        this.mChooseSprite.setVisible(true);
    },
    //取消选中
    unchoose:function(){
        this.mChooseed = false;
        this.mChooseSprite.setVisible(false);
    },
    //检测点击
    checkClick:function(pos){
        var cardsize = cc.size(95,95);
        var cpos = cc.p(this.x-cardsize.width/2,this.y-cardsize.height/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    }
});
ItemAvatar.create = function (sex,index) {
    var sg = new ItemAvatar();
    if (sg) {
        sg.mSex = sex;
        sg.mIndex = index;
        sg.init()
        return sg;
    }
    return null;
};
