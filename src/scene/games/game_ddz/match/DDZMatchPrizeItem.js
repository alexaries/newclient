/**
 * Created by apple on 14-9-11.
 */

var DDZMatchPrizeItem = cc.Node.extend({
    mIndex:0, //某位置
    mAward:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgsprite = cc.Sprite.create("#match_prize_bg.png");
            this.addChild(bgsprite)

            var prizeicon = cc.Sprite.create("#blank.png");
            this.addChild(prizeicon,1)
            prizeicon.setTag(8001);
            var name = "";
            if(this.mAward.gtype == GOODS_SOFTCASH){
                prizeicon.setSpriteFrame("softcash.png")
                name = sResWord.w_softcash;
            }else if(this.mAward.gtype == GOODS_SOFTCASH){
                prizeicon.setSpriteFrame("hardcash.png")
                name = sResWord.w_hardcash;
            }else if(this.mAward.gtype == GOODS_RPOPS_TYPE){
                var props = getPropsById(this.mAward.id)
                if(props){
                    name = props.name;
                    this.loadImg(this.mAward.gtype,props);
                }
            }else if(this.mAward.gtype == GOODS_PRIZES_TYPE){
                var prize = getPrizeById(this.mAward.id)
                if(prize){
                    name = prize.name;
                    this.loadImg(this.mAward.gtype,prize);
                }
            }

            var nameLabel = cc.LabelTTF.create(name, sGameData.mFontname,24);
            nameLabel.attr({
                x : 0,
                y : 80,
                anchorY:0.5
            });
            this.addChild(nameLabel, 5);


            var numLabel = cc.LabelTTF.create(sResWord.w_count+":"+this.mAward.value, sGameData.mFontname,24);
            numLabel.attr({
                x : 0,
                y : -80,
                anchorY:0.5
            });
            this.addChild(numLabel, 5);


            //xxx
            bRet = true;
        }
        return bRet;
    },
    loadImg:function(gtype,data){
        var image = "";
        var filepath = "";
        var saveimage = "";
        if(gtype == GOODS_RPOPS_TYPE){
            image = data.img
            filepath = sGameConfig.serverResWebhttp+sGameData.mPicPath_props+image;
            saveimage = sGameData.mPicSavePath_props+image;
            loadImg_base(image,saveimage,filepath,this,8001,93, 110,loadImgOver,0,0)
        }else if(gtype == GOODS_PRIZES_TYPE){
            image = data.image;
            filepath = sGameConfig.serverResWebhttp+sGameData.mPicPath_prize+image;
            saveimage = sGameData.mPicSavePath_prize+image;
            loadImg_base(image,saveimage,filepath,this,8001,93, 110,loadImgOver,0,0)
        }

        //log("loadImg--"+image)

    }
});
DDZMatchPrizeItem.create = function (award) {
    var sg = new DDZMatchPrizeItem();
    if (sg) {
        sg.mAward = award
        sg.init()
        return sg;
    }
    return null;
};
