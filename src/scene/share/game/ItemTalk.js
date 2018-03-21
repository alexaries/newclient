/**
 * Created by Administrator on 14-5-22.
 * 聊天 语句
 */
var ItemTalk = cc.TableViewCell.extend({
    mIndex:0,//索引
    mMsg:"",//语句
    mMsgLabel:null,//语句显示
    mBGSprite:null,//背景
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var itemsize = cc.size(700, 63);

            //var mask = cc.Sprite.create("#mask.png")
            //this.addChild(mask)
            //mask.setScaleX(itemsize.width/mask.getContentSize().width)
            //mask.setScaleY(itemsize.height/mask.getContentSize().height)
            //mask.setPosition(cc.p(itemsize.width/2,itemsize.height/2));
            //this.mBGSprite = mask;

            //xxx
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                itemsize,  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pMsgLabel.setPosition(cc.p(itemsize.width/2,itemsize.height/2));
            this.addChild(pMsgLabel,1);
            this.mMsgLabel = pMsgLabel;

            var line1 = cc.Sprite.create("#cell_small_delimeter.png");
            line1.attr({
                x: 700/2,
                y: 0,
                scaleX:5,
                scaleY:1
            });
            this.addChild(line1);



            bRet = true;
        }
        return bRet;
    },
    //更新消息
    updateInfo:function()
    {
        this.mMsgLabel.setString(this.mMsg);
    },
    //选中
    choose:function()
    {
        if(this.mBGSprite){
            this.mBGSprite.setColor(cc.color(100,100,100));
        }
    },
    //取消选中
    unchoose:function()
    {
        if(this.mBGSprite) {
            this.mBGSprite.setColor(cc.color(255, 255, 255));
        }
    }

});
ItemTalk.create = function (msg,index) {
    var sg = new ItemTalk();
    if (sg) {
        sg.mMsg = msg;
        sg.mIndex = index;
        sg.init();
        return sg;
    }
    return null;
};