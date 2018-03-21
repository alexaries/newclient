/**
 * Created by apple on 14-7-25.
 * 用户道具
 */
var ItemUserProps = BaseObject.extend({
    mIndex:0, //某位置
    mUserProps:null,
    mProps:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var props = getPropsById(this.mUserProps.propsId);

            var bgsprite = cc.Sprite.create("#goods_bg.png")
            this.addChild(bgsprite);
            this.setContentSize(bgsprite.getContentSize());
            var itemsize = this.getContentSize();

            var iconSprite = cc.Sprite.create("#blank.png");
            this.addChild(iconSprite,1);
            iconSprite.setScaleX(79/iconSprite.getContentSize().width);
            iconSprite.setScaleY(93/iconSprite.getContentSize().height);
            iconSprite.setPosition(cc.p(0,2));
            iconSprite.setTag(9900);


            var msgnumbg = cc.Sprite.create("#popCount.png");
            msgnumbg.attr({
                x:36,
                y:-36
            });
            this.addChild(msgnumbg,1);

            if(props){
                this.mProps = props;
                var tipinfo = sResWord.w_count+":"+this.mUserProps.count;

                var countstr = this.mUserProps.count;
                if(props.id == BOTS_PROPS){
                    tipinfo = sResWord.w_calculatecount+":"+this.mUserProps.remaincount;
                    countstr = this.mUserProps.remaincount;
                }
                if(countstr>99){
                    countstr = 99;
                }
                var countLabel = cc.LabelTTF.create(countstr,sGameData.mFontname, 20);//垂直对齐
                countLabel.setPosition(cc.p(36,-37));
                //countLabel.setColor(cc.color(21,200,240));
                countLabel.setAnchorPoint(cc.p(0.5,0.5));
                this.addChild(countLabel,2);

                if(props.id == NOTE_CARD_MONTH_PROPS){
                    var time1 = getLocalTime_mini(this.mUserProps.expireTime);
                    tipinfo = sResWord.w_endtime+":"+time1;
                }
                this.mProps.tipinfo = tipinfo;

                this.loadImg();

            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //
    click_change:function(){
        log("click_change--")
        playClickSound();

    },
    //点中 图标 位置
    checkClick:function(pos){
        var cardsize = cc.size(109,110);
        var cpos = cc.p(this.x-55,this.y-55);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    },
    //加载图
    loadImg:function(){
        var props = this.mProps;
        if(props) {
            var image = props.img;
            var filepath = sGameConfig.serverResWebhttp + sGameData.mPicPath_props + image;
            var saveimage = sGameData.mPicSavePath_props + props.img;
            var sysname = getSysImgName(image,0);
            loadImg_base(image, saveimage, filepath, this, 9900, 79, 93, loadImgOver,0,1,sysname)
        }
    }

});
ItemUserProps.create = function (index,uprops) {
    var sg = new ItemUserProps();
    if (sg) {
        sg.mIndex = index;
        sg.mUserProps = uprops;
        sg.init()
        return sg;
    }
    return null;
};
