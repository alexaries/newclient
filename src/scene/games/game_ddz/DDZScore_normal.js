/**
 * Created by Administrator on 14-4-28.
 */
//得分
var DDZScore_normal = cc.Node.extend({
    mIndex:0, //某位置
    mMyShowNum:null,//我的得分显示
    mShowNum1:null,//下家得分显示
    mShowNum2:null,//上家得分显示
    mHuojianShow:null,//火箭显示
    mZhadanShow:null,//炸弹显示
    mChunShow:null,//春天显示
    mNum:0,//失败动画 落雨的雨点数
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,140))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);





            var showNum0 = ShowNum.create();
            showNum0.attr({
                x:0,
                y:-winsize.height/2+200
            })
            this.addChild(showNum0,3);
            showNum0.setValue(1,900,3);
            this.mMyShowNum = showNum0;

            var showNum1 = ShowNum.create();
            showNum1.attr({
                x:winsize.width/2 - 200,
                y:winsize.height/2-120
            })
            this.addChild(showNum1,3);
            showNum1.setValue(1,-400,2);
            this.mShowNum1 = showNum1

            var showNum2 = ShowNum.create();
            showNum2.attr({
                x:-winsize.width/2 + 200,
                y:winsize.height/2-120
            })
            this.addChild(showNum2,3);
            showNum2.setValue(1,-500);
            this.mShowNum2 = showNum2



            var huojiannumshow = ShowNum.create();
            huojiannumshow.attr({
                x:-50,
                y:-5,
                anchorY:1
            });
            huojiannumshow.setScale(0.8)
            this.addChild(huojiannumshow,2);
            huojiannumshow.setValue(2,0,1,1);
            this.mHuojianShow = huojiannumshow

            var zhadannumshow = ShowNum.create();
            zhadannumshow.attr({
                x:40,
                y:-5,
                anchorY:1
            });
            zhadannumshow.setScale(0.8)
            this.addChild(zhadannumshow,2);
            zhadannumshow.setValue(2,0,1,1);
            this.mZhadanShow = zhadannumshow

            var chunshow = ShowNum.create();
            chunshow.attr({
                x:130,
                y:-5,
                anchorY:1
            });
            chunshow.setScale(0.8)
            this.addChild(chunshow,2);
            chunshow.setValue(2,0,1,1);
            this.mChunShow = chunshow



            var winlose = cc.Sprite.create("#ddz_w_win1.png")
            winlose.attr({
                x:0,
                y:55
            })
            this.addChild(winlose,5);
            winlose.setTag(9001);

            var scorenums = cc.Sprite.create("#ddz_score_mums.png")
            this.addChild(scorenums,5);

            var winxuanz = cc.Sprite.create("#ddz_xuanzhuan.png")
            winxuanz.setPosition(cc.p(0,20))
            winxuanz.setScale(1.4);
            this.addChild(winxuanz,1);
            winxuanz.setTag(9002);
            winxuanz.setVisible(false)

            var winy1sprite = cc.Sprite.create("#ddz_yanhua1.png")
            winy1sprite.setPosition(cc.p(0,90+40))
            this.addChild(winy1sprite,1);
            winy1sprite.setTag(9003);
            winy1sprite.setVisible(false)

            var winy2sprite = cc.Sprite.create("#ddz_yanhua2.png")
            winy2sprite.setPosition(cc.p(0,40+40))
            this.addChild(winy2sprite,1);
            winy2sprite.setTag(9004);
            winy2sprite.setVisible(false)

            var loseyunsprite = cc.Sprite.create("#ddz_wuyun.png")
            loseyunsprite.setPosition(cc.p(0,150+30))
            this.addChild(loseyunsprite,1);
            loseyunsprite.setTag(9011);
            loseyunsprite.setVisible(false)


            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示得分
    setScore:function(scores,isdizhu,iswin,teshuNum){
        this.mMyShowNum.setValue(1,formatcash(scores[0]),3);
        this.mShowNum1.setValue(1,formatcash(scores[1]),2);
        this.mShowNum2.setValue(1,formatcash(scores[2]));

        this.mHuojianShow.setValue(2,teshuNum[0],1,1);
        this.mZhadanShow.setValue(2,teshuNum[1],1,1);
        this.mChunShow.setValue(2,teshuNum[2],1,1);


        var winlose = this.getChildByTag(9001);
        if(winlose){
            var pic = "ddz_w_win1.png";
            if(isdizhu){
                if(iswin){
                    pic = "ddz_w_win1.png";
                }else{
                    pic = "ddz_w_lose1.png";
                }
            }else{
                if(iswin){
                    pic = "ddz_w_win2.png";
                }else{
                    pic = "ddz_w_lose2.png";
                }
            }
            winlose.setSpriteFrame(pic)
        }
    },
    //显示胜利动画
    showWinAnim:function(){
        var winxuanz = this.getChildByTag(9002);
        if(winxuanz){
            winxuanz.setVisible(true);
            var actionBy = cc.RotateBy.create(3, 360);
            winxuanz.runAction(cc.RepeatForever.create(actionBy));
        }

        var winy1sprite = this.getChildByTag(9003);
        if(winy1sprite){
            var setscale1 = function(){
                winy1sprite.setVisible(true)
                winy1sprite.setOpacity(255)
                winy1sprite.setScale(0.05);
            }
            var callback = cc.CallFunc.create(setscale1, this);
            var scale1anim = cc.ScaleTo.create(1,1);
            var fade1anim = cc.FadeOut.create(1);
            var seq = cc.Sequence.create(callback,scale1anim,fade1anim,cc.DelayTime.create(2))
            winy1sprite.runAction(cc.RepeatForever.create(seq))
        }

        var winy2sprite = this.getChildByTag(9004);
        if(winy2sprite){
            var setscale1 = function(){
                winy2sprite.setVisible(true)
                winy2sprite.setOpacity(255)
                winy2sprite.setScale(0.05);
            }
            var callback = cc.CallFunc.create(setscale1, this);
            var scale1anim = cc.ScaleTo.create(1,1);
            var fade1anim = cc.FadeOut.create(1);
            var seq = cc.Sequence.create(cc.DelayTime.create(2),callback,scale1anim,fade1anim)
            winy2sprite.runAction(cc.RepeatForever.create(seq))
        }

    },
    //停止胜利动画
    stopWinAnim:function(){
        var winxuanz = this.getChildByTag(9002);
        if(winxuanz){
            winxuanz.setVisible(false);
            winxuanz.stopAllActions();
        }

        var winy1sprite = this.getChildByTag(9003);
        if(winy1sprite){
            winy1sprite.setVisible(false);
            winy1sprite.stopAllActions();
        }

        var winy2sprite = this.getChildByTag(9004);
        if(winy2sprite){
            winy2sprite.setVisible(false);
            winy2sprite.stopAllActions();
        }
    },
    //显示失败动画
    showLoseAnim:function(){
        this.mNum = 1000;
        var loseyunsprite = this.getChildByTag(9011);
        if(loseyunsprite){
            loseyunsprite.setVisible(true);
            loseyunsprite.setScale(1)
            var scaleanim = cc.ScaleTo.create(0.5,1.2);
            var scaleanim1 = cc.ScaleTo.create(0.6,1);
            var seq = cc.Sequence.create(scaleanim,scaleanim1)
            loseyunsprite.runAction(cc.RepeatForever.create(seq))
        }
        this.unschedule(this.showYuAnim);
        this.schedule(this.showYuAnim,0.05);
    },
    //显示雨动画
    showYuAnim:function(){
        this.mNum--
        if(this.mNum==0){
            this.unschedule(this.showYuAnim);
        }
        var yupic = "#ddz_yu"+(randomInt(3)+1)+".png"
        var yusprite = cc.Sprite.create(yupic);
        this.addChild(yusprite);
        var randx = randomInt(300)-150;
        yusprite.setPosition(cc.p(randx,100+30));
        var topos = cc.p(randx,-30+20);
        var moveAnim = cc.MoveTo.create(0.6,topos)
        var callback = cc.CallFunc.create(this.showYuOver, this);
        var actions = cc.Sequence.create(moveAnim,callback);
        yusprite.runAction(actions)
    },
    //显示雨动画结束
    showYuOver:function(yusprite){
        this.removeChild(yusprite);
    },
    //停止失败动画
    stopLoseAnim:function(){
        this.unschedule(this.showYuAnim);
        var loseyunsprite = this.getChildByTag(9011);
        if(loseyunsprite){
            loseyunsprite.setVisible(false);
            loseyunsprite.stopAllActions();
        }
    },
    //停止动画
    stopAnim:function(){
        this.stopWinAnim();
        this.stopLoseAnim();
    }

});
DDZScore_normal.create = function () {
    var sg = new DDZScore_normal();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
