/**
 * Created by Administrator on 14-5-30.
 * 消息项
 */
var ItemMsg = cc.TableViewCell.extend({
    mIndex:0,//索引
    mMsg:null,//消息
    mNameLabel:null,//消息显示
    mIsSelected:false,//是否选中
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var itemsize1 = cc.size(size.width*0.94,120)
            this.setContentSize(itemsize1);
            var itemsize = this.getContentSize()

            var bgSprite = createSysPanel_munu(itemsize);
            bgSprite.setAnchorPoint(0,0);
            this.addChild(bgSprite);
            bgSprite.setTag(9001);


            var openstatepic = "#icon_msg_close.png";
            if(this.mMsg.readTime!=null&&this.mMsg.readTime!=0){
                openstatepic = "#icon_msg_open.png";
            }
            var kuangsprite = cc.Sprite.create(openstatepic);
            kuangsprite.setAnchorPoint(cc.p(0.5, 0.5));
            kuangsprite.setPosition(cc.p(50,itemsize.height/2));
            this.addChild(kuangsprite, 1);
            kuangsprite.setTag(9002);


            var twidth = itemsize.width - 120;

            var blockSize = cc.size(twidth, 70);
            var msglabel = cc.LabelTTF.create(this.mMsg.content, sGameData.mFontname,24, blockSize, cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
            msglabel.attr({
                x : 97,
                y : 35 ,
                anchorX:0,
                anchorY:0
            });
            this.addChild(msglabel, 5);
            this.mNameLabel = msglabel;

            var time1 = getLocalTime(this.mMsg.createTime);
            var timeLabel = cc.LabelTTF.create(time1, sGameData.mFontname, 20);//
            timeLabel.setPosition(cc.p(110,9));
            timeLabel.setAnchorPoint(cc.p(0,0));
            this.addChild(timeLabel);
            timeLabel.setTag(8002);
            timeLabel.setColor(cc.color(255,255,0));



            var kitSprite = cc.Sprite.create("#icon_kit.png")
            kitSprite.setPosition(cc.p(itemsize.width*0.9,21));
            this.addChild(kitSprite);
            kitSprite.setTag(9011);
            kitSprite.setVisible(false);


            //var line1 = cc.Sprite.create("#cell_small_delimeter.png");
            //line1.attr({
            //    x: itemsize.width/2,
            //    y: 0,
            //    scaleX:6,
            //    scaleY:2
            //});
            //this.addChild(line1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //更新显示消息的信息
    updateInfo:function()
    {
        //log("zjh mTable="+this.mTable.id);
        if(this.mMsg.kits ==null){
            this.mMsg.kits = analyseKitData(this.mMsg.kitdata)
        }

        this.mNameLabel.setString(this.mMsg.content);
        var timelabel = this.getChildByTag(8002)
        if(timelabel){
            var time1 = getLocalTime(this.mMsg.createTime);
            timelabel.setString(time1)
        }
        if(this.mMsg.id==9){
            log("createTime=="+this.mMsg.createTime);
        }


        var kuangsprite = this.getChildByTag(9002)
        if(kuangsprite){
            if(this.mMsg.readTime!=null&&this.mMsg.readTime!=0){
                kuangsprite.setSpriteFrame("icon_msg_open.png");
            }else{
                kuangsprite.setSpriteFrame("icon_msg_close.png");
            }
        }


        var kitSprite = this.getChildByTag(9011)
        if(kitSprite){
            if((this.mMsg.kits.length>0)&&(this.mMsg.kitTime==null||this.mMsg.kitTime==0)){
                kitSprite.setVisible(true);
            }else{
                kitSprite.setVisible(false);
            }
        }

    },
    //选中
    choose:function()
    {
        this.mIsSelected = true;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(220, 220, 220));
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(255, 255, 255));
        }
    }

});
ItemMsg.create = function (amsg,index) {
    var sg = new ItemMsg();
    if (sg ) {
        sg.mMsg = amsg;
        sg.mIndex = index;
        sg.init()
        return sg;
    }
    return null;
};
