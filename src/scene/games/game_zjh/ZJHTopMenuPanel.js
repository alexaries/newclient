/**
 * Created by Administrator on 14-5-7.
 * 菜单 离开 站起 设置
 */
var ZJHTopMenuPanel = cc.Node.extend({
    mStandItem:null,//站起
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var size_top_menu_panel = cc.size(240,280);
            var size_top_menu_btn =  cc.size(235,70);
            var point_line1 = cc.p(0,70);
            var point_line2 = cc.p(0,0);
            var point_line3 = cc.p(0,-70);
            var point_top_menu_continue = cc.p(0,105);
            var point_top_menu_exitgame = cc.p(0,-105);
            var point_top_menu_standup = cc.p(0,-35);
            var point_top_menu_setting = cc.p(0,35);
            if(sGameData.mUseRandomSit) {
                size_top_menu_panel = cc.size(240,210);
                point_top_menu_continue = cc.p(0,70);
                point_top_menu_exitgame = cc.p(0,-70);
                point_top_menu_setting = cc.p(0,0);
                point_line1 = cc.p(0,35);
                point_line2 = cc.p(0,-35);
                point_line3 = cc.p(0,-35);
            }


            var bgimg = createSysPanel_munu(size_top_menu_panel);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            bgimg.setColor(cc.color(200,200,200));
            var csize = this.getContentSize();

            var line1 = cc.Sprite.create("#cell_small_delimeter.png");
            line1.setPosition(point_line1);
            line1.setScale(2);
            this.addChild(line1);

            var line2 = cc.Sprite.create("#cell_small_delimeter.png");
            line2.setPosition(point_line2);
            line2.setScale(2);
            this.addChild(line2);

            var line3 = cc.Sprite.create("#cell_small_delimeter.png");
            line3.setPosition(point_line3);
            line3.setScale(2);
            this.addChild(line3);


            var continueSprite = cc.Sprite.create("#zjh_menu_jixu.png")
            var continueSprite1 = cc.Sprite.create("#zjh_menu_jixu.png")
            continueSprite1.setColor(cc.color(200,200,200));
            var continueSprite2 = cc.Sprite.create("#zjh_menu_jixu.png")
            var continueItem = cc.MenuItemSprite.create(
                continueSprite,
                continueSprite1,
                continueSprite2,
                this.click_continue,this);
            continueItem.setPosition(point_top_menu_continue);
            continueItem.setScale(0.9)

            var quitSprite = cc.Sprite.create("#zjh_menu_exit.png")
            var quitSprite1 = cc.Sprite.create("#zjh_menu_exit.png")
            quitSprite1.setColor(cc.color(200,200,200));
            var quitSprite2 = cc.Sprite.create("#zjh_menu_exit.png")
            var quitItem = cc.MenuItemSprite.create(
                quitSprite,
                quitSprite1,
                quitSprite2,
                this.click_exitgame,this);
            quitItem.setPosition(point_top_menu_exitgame);
            quitItem.setScale(0.9)
            if(!sGameData.mUseRandomSit) {
                //var standSprite = createLightButton(sResWord.w_top_menu_standup, size_top_menu_btn, 0);
                //var standSprite1 = createLightButton(sResWord.w_top_menu_standup, size_top_menu_btn, 1);
                //var standSprite2 = createLightButton(sResWord.w_top_menu_standup, size_top_menu_btn, 0);
                //var standItem = cc.MenuItemSprite.create(
                //    standSprite,
                //    standSprite1,
                //    standSprite2,
                //    this.click_standup, this);
                //standItem.setPosition(point_top_menu_standup);
                //this.mStandItem = standItem;
            }

            var settingSprite = cc.Sprite.create("#zjh_menu_setting.png")
            var settingSprite1 = cc.Sprite.create("#zjh_menu_setting.png")
            settingSprite1.setColor(cc.color(200,200,200));
            var settingSprite2 = cc.Sprite.create("#zjh_menu_setting.png")
            var settingItem = cc.MenuItemSprite.create(
                settingSprite,
                settingSprite1,
                settingSprite2,
                this.click_setting,this);
            settingItem.setPosition(point_top_menu_setting);
            settingItem.setScale(0.9)

            var menu = null;
            //if(!sGameData.mUseRandomSit) {
            //    menu = cc.Menu.create(continueItem, quitItem, standItem, settingItem);
            //}else{
            //    menu = cc.Menu.create(continueItem, quitItem, settingItem);
            //}
            menu = cc.Menu.create(continueItem, quitItem, settingItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.resetValue();

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //重新设置
    resetValue:function(){
        var standItem = this.mStandItem;
        if(standItem){
            if(sGameData.mZJHLayer.mMyState == MYSTATE_SITDOWN){
                standItem.setEnabled(true);
            }else{
                standItem.setEnabled(false);
            }
        }
    },
    click_none:function(){
        log("click_none-")
    },
    //继续游戏
    click_continue:function(){
        playClickSound();
        sGameData.mZJHLayer.showTopMenuPanel(false);
        if(sGameData.mAppCanRandomChangeTable){
            if(sGameData.mZJHLayer.mMyState != MYSTATE_SITDOWN) {
                if (!sGameData.mIsTestNoNet) {
                    if (!sGameData.mIsSendingData) {
                        if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
                            //showLittleNotice(sResWord.w_softcash_notenough);
                            showNeedPayNotice(0,sResWord.w_tip_needpay)
                        }else {
                            if (sGameData.mUseRandomSit) {
                                log("start -- change table random")
                                sGameNetData.mZJHNet.sendZJHExitTable();
                                sGameNetData.mZJHNet.sendZJHRandomEnterTable(-1)
                                sGameData.mChangeTableByRandom = true;
                                sGameData.mIsSendingData = true;
                            } else {

                            }
                        }

                    }
                }
            }
        }
    },
    //返回大厅
    click_exitgame:function(){
        playClickSound();
        sGameData.mZJHLayer.showTopMenuPanel(false);
        sGameData.mZJHLayer.op_quitgame_view();
    },
    //站起
    click_standup:function(){
        playClickSound();
        sGameData.mZJHLayer.showTopMenuPanel(false);
        sGameData.mZJHLayer.op_standup_view();
    },
    //设置
    click_setting:function(){
        playClickSound();
        sGameData.mZJHLayer.showTopMenuPanel(false);
        sGameData.mZJHLayer.showSetting();
    },
    //跳转到主界面
    gotoMain:function(){
        sGameData.mZJHLayer.gotoMain();
    }
});
ZJHTopMenuPanel.create = function () {
    var sg = new ZJHTopMenuPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
