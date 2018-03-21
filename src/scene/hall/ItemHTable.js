/**
 * Created by Administrator on 14-5-27.
 * 房间 桌子显示
 */
var ItemHTable = cc.Node.extend({
    mTableType:TABLE_TYPE_5,//桌子类型 0： 5人， 1:9人
    mShowVip:1,//是否vip
    mIndex:0, //某位置
    mUserHeadsArray:[],//头像显示
    mChairShowArray:[],//椅子显示
    mChairPos:[],//椅子位置
    MAX_PLAYERNUM:5,//最大任务
    mTable:null,//桌子信息
    mTipLabel:null,//提示
    mEnterShow:null,//进入按钮
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size =  cc.size(700, 450)
            this.setContentSize(size);

            if(this.mTableType == TABLE_TYPE_5){
                var pos0 = cc.p(size.width/2,size.height/2 - 120)
                var pos1 = cc.p(size.width/2 + 227,size.height/2 - 70)
                var pos2 = cc.p(size.width/2 + 210,size.height/2 + 120)
                var pos3 = cc.p(size.width/2 - 210,size.height/2 + 120)
                var pos4 = cc.p(size.width/2 - 227,size.height/2 - 70)
                var pos =  [pos0,pos1,pos2,pos3,pos4];
                this.mChairPos = pos;

                this.MAX_PLAYERNUM = 5;
            }else{
                var pos0 = cc.p(size.width/2,size.height/2 - 115);
                var pos1 = cc.p(size.width/2-170,size.height/2 - 115);
                var pos2 = cc.p(size.width/2-250,size.height/2 - 50);
                var pos3 = cc.p(size.width/2-230,size.height/2 + 80);
                var pos4 = cc.p(size.width/2-140,size.height/2 + 130);
                var pos5 = cc.p(size.width/2+140,size.height/2 + 130);
                var pos6 = cc.p(size.width/2+230,size.height/2 + 80);
                var pos7 = cc.p(size.width/2+250,size.height/2 - 50);
                var pos8 = cc.p(size.width/2+170,size.height/2 -115);
                var chairpos = [pos0,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8];
                this.mChairPos = chairpos;

                this.MAX_PLAYERNUM = 9;
            }

            var enterSprite = cc.Sprite.create("#desks_enter.png")
            var enterSprite1 = cc.Sprite.create("#desks_enter.png")
            enterSprite1.setColor(cc.color(200,200,200))
            var enterSprite2 = cc.Sprite.create("#desks_enter.png")
            var enterItem = cc.MenuItemSprite.create(
                enterSprite,
                enterSprite1,
                enterSprite2,
                this.click_enter,this);
            enterItem.attr({
                x:size.width/2,
                y:size.height*0.5+180
            });
            var menu = cc.Menu.create(enterItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 3);

//
            enterItem.setVisible(false);
            this.mEnterShow = enterItem;
            var enterpic = "#w_hall_enter2.png"
            if(this.mShowVip==1){
                enterpic = "#w_hall_enter1.png"
            }
            var tableenter =cc.Sprite.create(enterpic);
            tableenter.setPosition(cc.p(size.width/2,size.height*0.5-20));
            this.addChild(tableenter,3);

//            var tipLabel = cc.LabelTTF.create(sResWord.w_tip_double_click,sGameData.mFontname, 24);
//            tipLabel.setPosition(cc.p(size.width/2,size.height*0.5-50));
//            this.addChild(tipLabel,3);
//            if(this.mShowVip==1){
//                tipLabel.setColor(cc.color(0,0,0))
//            }
            tableenter.setVisible(false);
            this.mTipLabel = tableenter


            var nameLabel = cc.LabelTTF.create(this.mTable.name,sGameData.mFontname, 32);
            nameLabel.setPosition(cc.p(size.width/2,size.height*0.5+70));
            this.addChild(nameLabel,3);
            nameLabel.setTag(8001);

            if(false){

            }else{
                var minbetstr = sResWord.w_basepoint_zjh+":"+this.mTable.minBet;
                var minbetLabel = cc.LabelTTF.create(minbetstr,sGameData.mFontname, 24);
                minbetLabel.setPosition(cc.p(size.width/2-100,size.height*0.5+30));
                this.addChild(minbetLabel,3);
                minbetLabel.setTag(8002);


                if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
                    var enterpointstr = sResWord.w_enterpoint+":"+this.mTable.enterPoint;
                    var enterpointLabel = cc.LabelTTF.create(enterpointstr,sGameData.mFontname, 24);
                    enterpointLabel.setPosition(cc.p(size.width/2+100,size.height*0.5+30));
                    this.addChild(enterpointLabel,3);
                    enterpointLabel.setTag(8003);
                }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
                    minbetLabel.setPosition(cc.p(size.width/2,size.height*0.5+30));
                }

            }

            this.initTablesView();
            this.setTableScene();
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //初始化桌子显示
    initTablesView:function(){
        var size = cc.size(700, 450)
        //画游戏桌面
        var tablename = "#game_table_bg.png";
        if(this.mShowVip){
            tablename = "#game_table_bg_vip.png";
        }
        var desk = cc.Sprite.create(tablename);
        desk.setPosition(cc.p(size.width/2, size.height/2 + 30));
        desk.setScale(0.7);
        this.addChild(desk,1);

        this.initUserHead(ItemHUserHead,this.mTableType);

        this.mChairShowArray = [];
        for(var i = 0; i < this.MAX_PLAYERNUM; i++){
            this.initChair(i,this.mTableType,this.mShowVip);
        }
    },
    //初始化椅子
    initChair:function(seat,tabletype,showvip){

        var chairShow = ItemHChair.create(seat,tabletype,showvip)
        chairShow.setPosition(this.mChairPos[seat]);
        chairShow.setScale(0.7);
        this.addChild(chairShow);
        this.mChairShowArray.push(chairShow);

    },
    /**
     * 初始化玩家 头像
     */
    initUserHead:function(theShowUserHead,tabletype){
        //log("initUserHead_Basic="+this.MAX_PLAYERNUM);
        this.mUserHeadsArray = [];
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var aUserHead = theShowUserHead.create(tabletype);
            aUserHead.mChairIdx = i;
            aUserHead.setVisible(false);
            aUserHead.setXY();
            aUserHead.setScale(0.7);
            this.addChild(aUserHead,5);
            this.mUserHeadsArray.push(aUserHead);
        }
    },
    //设置桌子场景
    setTableScene:function(){
        if(this.mTable){
            var chairdata = this.mTable.chairdatas
            for(var j=0;j<chairdata.length&&j<this.MAX_PLAYERNUM;j++){
                var cdata = chairdata[j];
                var chair = cdata.chairId;
                //log("cdata.chairId=="+cdata.chairId+"="+cdata.playerFlag)
                if(cdata.playerFlag == 1){
                    var player = {};
                    player.id = cdata.playerId;
                    player.nickName = cdata.playerNickName;
                    player.avatar = cdata.playerAvatar;
                    player.chairId = cdata.chairId
                    this.showPlayerOnChair(chair,1,player);
                }else{
                    this.showPlayerOnChair(chair,0,null);
                }
            }
        }
    },
    //把玩家放到椅子
    showPlayerOnChair:function(chair,show,player){
        //log("chair=="+chair)
        var aUserHead =this.mUserHeadsArray[chair];
        if(show == 1){
            aUserHead.setVisible(true)
            aUserHead.setPlayer(player);
            aUserHead.showHead(2);
        }else{
            aUserHead.setVisible(false)
        }
        var chairShow = this.mChairShowArray[chair];
        if(show == 1){
            chairShow.setVisible(false)
        }else{
            chairShow.setVisible(true)
        }
    },
    //更新信息
    updateInfo:function(atable){
        this.mTable = atable;
        this.setTableScene();
        var nameLabel = this.getChildByTag(8001);
        if(nameLabel){
            nameLabel.setString(this.mTable.name);
        }

        var nameLabel = this.getChildByTag(8001);
        if(nameLabel){
            nameLabel.setString(this.mTable.name);
        }

        if(false){

        }else{
            var minbetstr = sResWord.w_basepoint_zjh+":"+this.mTable.minBet;
            var minbetLabel = this.getChildByTag(8002);
            if(minbetLabel){
                minbetLabel.setString(minbetstr);
            }

            if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
                var enterpointstr = sResWord.w_enterpoint+":"+this.mTable.enterPoint;
                var enterpointLabel = this.getChildByTag(8003);
                if(enterpointLabel){
                    enterpointLabel.setString(enterpointstr);
                }
            }

        }

    },
    //点击进入
    click_enter:function(){
        playClickSound();
        log("click_enter=="+this.mTable.id)
        sGameData.mHallTableLayer.gotoTable(this.mTable);
    },
    //显示头像 type 123
    showHead:function(type){
        for(var j=0;j<this.MAX_PLAYERNUM;j++){
            var aUserHead =this.mUserHeadsArray[j];
            aUserHead.showHead(type);
        }

        this.mTipLabel.stopAllActions();
        this.mEnterShow.stopAllActions();
        if(type==2){
            this.mTipLabel.setVisible(false);
            this.mEnterShow.setVisible(false);
        }else{
            this.mTipLabel.setOpacity(0);
            var delay1 = cc.DelayTime.create(0.5);
            var fadeanim = cc.FadeIn.create(0.3);
            var callback = cc.CallFunc.create(this.showTip, this);
            var actions = cc.Sequence.create(delay1,callback, fadeanim);
            this.mTipLabel.runAction(actions);

            this.mEnterShow.setOpacity(0);
            var delay1 = cc.DelayTime.create(0.5);
            var fadeanim = cc.FadeIn.create(0.3);
            var callback = cc.CallFunc.create(this.showEnter, this);
            var actions = cc.Sequence.create(delay1,callback, fadeanim);
            this.mEnterShow.runAction(actions);
        }

    },
    //显示提示
    showTip:function(){
        this.mTipLabel.setVisible(true);
    },
    //显示进入按钮
    showEnter:function(){
        this.mEnterShow.setVisible(true);
    }


});
ItemHTable.create = function (table,tabletype,showvip) {
    var sg = new ItemHTable();
    if (sg ) {
        sg.mTable = table;
        sg.mTableType = tabletype;
        sg.mShowVip = 1;
        sg.init();
        return sg;
    }
    return null;
};
