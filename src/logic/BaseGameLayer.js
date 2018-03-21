/**
 * Created by Administrator on 14-4-18.
 * 基本游戏场景
 */
var BaseGameLayer = cc.Layer.extend({
    mHasInitView:false,//是否执行了第2帧
    mCanChat: false,//能够聊天
    mSitDownNoWait: false,//是否直接坐下（ddz mj不是 dzpk gdy cx zjh dn是）
    mHasSitDown: false,//自己是否已经坐下（gdy cx zjh dn dzpk 使用）
    mIsInGame: false,//是否正在游戏
    mIsGameOver: true,//游戏结束
    mIsLeave: false,//离开
    mIsFapaiing:false,//是否正在发牌
    mGameNo:"",//游戏局号
    mMoneyType:MONEYTYPE_SOFTCASH,//0:金币，1:元宝  游戏货币类型
    mPlayerList:[],//玩家列表
    mUserHeadsArray:[],//用户头像  （ddz seat ； 其他 chair）

    mMyState: 0,//我的状态 0未坐下 1已坐下
    mMyChairId: -1,//我的椅子号

    mBaseChairId:0,//作为基准的 椅子号 (自己坐下时已自己为准，没坐下 用默认值；默认0或之前坐下的椅子号)（下放中央位置）
    //一下数据全部用椅子号记录数据
    mChairSitDown:[],//椅子上 有没有人 （真实座位 ）（可能有游戏开始后进来的人）
    mIsInGameChair:[],//是否进入了本局游戏
    mPGameStateChair:[],//在本局游戏中的状态 0： 还在游戏中  --  1 ：已经结束
    mFapaiStateChair:[],//给哪些椅子发牌 (防止 发牌时 站起 ，发牌报错)

    mChairReady:[],//椅子准备
    mSexArray:[0,0,0,0,0,0,0,0,0], //各座位 的 玩家性别 1男 0女(播放声音使用)
    mScoreNameArray:[],//根据椅子号（chairId） 记录昵称

    mOPBtnSize:cc.size(120,40),
    MAX_PLAYERNUM:3, //最大玩家数
    init:function () {
        var bRet = false;
        if (this._super()) {
            bRet = true;
        }
        return bRet;
    },
    //按钮点击后改变点击状态
    buttonClicked:function(){
        sGameData.mClickState = 3;
    },
    //显示选择聊天面板
    op_showGameChatMsg:function(){
    },
    op_showGameChatInput:function(){
    },
    //操作 显示 选择聊天界面
    op_showGameChatFace:function(){
        log("op_showface");
    },
    op_showGameChatView:function(tars,index){
        //[face,msg,input]
        for(var i=0;i<3;i++){
            var tar = tars[i];
            if(index == i&&tar){
                if(tar.visible){
                    tar.setVisible(false);
                }else{
                    tar.setVisible(true);
                }
            }else{
                if(tar&&tar.visible){
                    tar.setVisible(false);
                }
            }
        }
    },
    startShowPlayerTalk:function(){

    },
    playBGMusic:function(){

    },
    /**
     * 初始化玩家 头像
     */
    initUserHead_Basic:function(theShowUserHead){
        log("initUserHead_Basic="+this.MAX_PLAYERNUM);
        this.mUserHeadsArray = [];
        for(var i=0;i<this.MAX_PLAYERNUM;i++){
            var aUserHead = theShowUserHead.create();
            aUserHead.setSeat(i);
            if(i == 0){
                aUserHead.setPlayer(sGameData.mUser);
            }else{
                aUserHead.setVisible(false);
                if(sGameData.mIsTestNoNet){
                    aUserHead.setVisible(true);
                }
            }
            aUserHead.setXY();
            this.addChild(aUserHead,5);
            this.mUserHeadsArray.push(aUserHead);
        }
    },
    //获取下一个椅子号（ddz专用）
    getNextSeat:function(seat)
    {
        seat=seat+1;
        if(seat>this.MAX_PLAYERNUM-1)seat =  seat-this.MAX_PLAYERNUM;
        return seat;
    },
    /**
     * 进入玩家安排位置  ---------Basic
     */
    getPlayerChairIdBySeat:function(seat)
    {
        var chairId = seat + this.mBaseChairId;
        if(chairId > this.MAX_PLAYERNUM-1){
            chairId = chairId - this.MAX_PLAYERNUM;
        }
        return chairId;
    },
    getPlayerChairIdBySeatBase:function(seat,basechair)
    {
        var chairId = seat + basechair;
        if(chairId > this.MAX_PLAYERNUM-1){
            chairId = chairId - this.MAX_PLAYERNUM;
        }
        return chairId;
    },
    /**
     * 取玩家的坐位对应的游戏画面位置 ---------Basic
     */
    getPlayerSeatByChairId:function(chairId)
    {
        var seat = chairId - this.mBaseChairId;
        if(seat<0){
            seat = this.MAX_PLAYERNUM+ seat;
        }
        return seat;
    },

    /**
     * 取玩家的坐位对应的游戏画面位置 ---------Basic
     */
    getPlayerSeatByMyChairId:function(chairId,mychairId)
    {
        var seat = chairId - mychairId;
        if(seat<0){
            seat = this.MAX_PLAYERNUM+ seat;
        }
        return seat;
    },

    /**
     * 添加一个玩家  ---------Basic
     */
    addPlayer:function(player){
        this.mPlayerList.push(player);
    },

    /**
     * 从玩家列表 获取 玩家数据  ---------Basic
     */
    getPlayer:function(playerId){
        if(this.mPlayerList == null ){
            return null;
        }
        for(var i = 0;i<this.mPlayerList.length;i++){
            var thePlayer = this.mPlayerList[i];
            if(thePlayer != null && thePlayer.id == playerId){
                return thePlayer;
            }
        }
        return null;
    },
    /**
     * 根据chairid从玩家列表 获取 玩家数据  ---------Basic
     */
    getPlayerByChairId:function(chairId){
        if(this.mPlayerList == null ){
            return null;
        }
        for(var i = 0;i<this.mPlayerList.length;i++){
            var thePlayer = this.mPlayerList[i];
            if(thePlayer != null && thePlayer.chairId == chairId){
                return thePlayer;
            }
        }
        return null;
    },

    /**
     * 根据idx从玩家列表 获取 玩家数据  ---------Basic
     */
    getPlayerByIdx:function(idx){
        return this.getPlayer(idx);
    },
    /**
     * 从玩家列表删除 玩家   ---------Basic
     */
    removePlayer:function(playerId){
        if(this.mPlayerList == null){
            return ;
        }
        var thePlayer = null;
        var pos = 0;
        var s=false;
        for(pos = 0;pos<this.mPlayerList.length;pos++){
            thePlayer = this.mPlayerList[pos];
            if(thePlayer != null && thePlayer.id == playerId){
                s = true;
                break;
            }
        }
        if(s==true)
        {
            this.mPlayerList.splice(pos,1);
        }
    },
    /**
     * 玩家进入桌子 ---------Basic
     */
    playerEnterTable:function(p)
    {
        if(sGameData.mUser.chairId!=-1)
        {
            log("进入:"+p.id+"/chair:"+p.chairId);
            var seat = this.getPlayerSeatByChairId(p.chairId);
            log(p.nickName+"得到坐位"+seat);
            if(p.sex == null){
                p.sex = 0;
            }
            var aUserHead = this.mUserHeadsArray[seat];
            aUserHead.setVisible(true);
            aUserHead.setSeat(seat,p.chairId);
            aUserHead.setPlayer(p);
            this.mSexArray[p.chairId] = p.sex;
            if(seat == 0){
                this.mScoreNameArray[p.chairId] = p.nickName;
            }else{
                if(sGameData.mIsUseTrueNick){
                    this.mScoreNameArray[p.chairId] = p.nickName;
                }else{
                    this.mScoreNameArray[p.chairId] = "玩家"+(p.chairId+1);
                }
            }
            this.playerEnterTable_Action_Basic(seat,p);

        }
    },
    /**
     * 玩家进入桌子 时 操作  ---------Basic （游戏中可以重写这个，实现额外功能）
     */
    playerEnterTable_Action_Basic:function(seat,p){

    },
    /**
     * 玩家离开桌子 ---------Basic
     */
    playerLeaveTable:function(p)
    {
        if(sGameData.mUser.chairId!=-1)
        {
            log("离开:"+p.id+"/chair:"+p.chairId);
            var seat = this.getPlayerSeatByChairId(p.chairId);
            log(p.nickName+"离开坐位"+seat);
            var aUserHead = this.mUserHeadsArray[seat];
            aUserHead.setVisible(false);

            this.playerLeaveTable_Action_Basic(seat,p);
        }
    },
    /**
     * 玩家离开桌子 时 操作  ---------Basic （游戏中可以重写这个，实现额外功能）
     */
    playerLeaveTable_Action_Basic:function(seat,p){

    },

    /**
     * 玩家坐下  系统房间     ---------Basic
     * (ddz 是凑齐所有人 才坐下)
     * (dzpk zjh dn 是进去就坐下)
     */
    playersSitDown:function(aPlayer)
    {
        log("playersSitDown---"+aPlayer.id+" "+this.mSitDownNoWait+this.mHasSitDown);
        if(this.mSitDownNoWait){//不需要等待 直接坐下
            if(aPlayer.id == sGameData.mUser.id){
                this.setPlayerSitDownOnTable();
            }else if(this.mHasSitDown){
                this.playerEnterTable(aPlayer);
            }
        }else{//等待人全 坐下
            if(this.getSitDownNum() == this.MAX_PLAYERNUM){
                this.setPlayerSitDownOnTable();
            }
        }
    },
    /**
     * 获取 准备坐下数量 ---------Basic
     */
    getSitDownNum:function(){
        var num = 0;
        for(var i = 0;i<this.MAX_PLAYERNUM;i++){
            if(this.mChairSitDown[i] == 1){
                num++;
            }
        }
        log("sitnum=="+num);
        return num;
    },
    /**
     * 把玩家显示在 桌面上 ---------Basic
     */
    setPlayerSitDownOnTable:function(){

        if(sGameData.mUser.chairId== -1){
            log("setPlayerSitDownOnTable -- sGameData.mUser.chairId=-1");
            return;
        }
        log("setPlayerSitDownOnTable==="+this.mPlayerList.length+" --i cidx=="+sGameData.mUser.chairId)
        for(var i = 0;i<this.mPlayerList.length;i++){
            var aPlayer =  this.mPlayerList[i];
            this.playerEnterTable(aPlayer);
        }
        this.mHasSitDown = true;
    },
    //检查是否点击到某界面 （锚点在中间）
    checkClickView:function(tar,pos){
        var isclicked = false;
        if(tar&&tar.visible){
            if(pos.x <tar.x+tar.width/2 && pos.x >tar.x-tar.width/2
                &&pos.y<tar.y+tar.height/2&&pos.y>tar.y-tar.height/2){
                isclicked = true;
            }
        }
        return isclicked
    },

    hiddenUIWithClick_chat:function(tar,pos,gametype){
        if(tar.visible){
            var size = cc.director.getWinSize();
            var size_tab_size = cc.size(51,117);
            if((gametype==5||gametype==6)&&(pos.x <size.width-5 && pos.x >size.width-5-60
                &&pos.y<size.height*0.5-90+32&&pos.y>size.height*0.5-90-32)){
                //按钮 内 不操作
                this.buttonClicked();
            }else if((gametype==1||gametype==2||gametype==3)&&(pos.x <61 && pos.x >1
                &&pos.y<size.height*0.2+30&&pos.y>size.height*0.2-30)){
                    //按钮 内 不操作
                this.buttonClicked();
            }else if(pos.x <tar.x-tar.width*0.5 && pos.x > tar.x-tar.width*0.5-size_tab_size.width
                &&pos.y<tar.y+size_tab_size.height/2&&pos.y>tar.y-size_tab_size.height/2){
                this.buttonClicked();
            }else if(pos.x <tar.x-tar.width*0.5 && pos.x > tar.x-tar.width*0.5-size_tab_size.width
                &&pos.y<tar.y+65+size_tab_size.height&&pos.y>tar.y+65){
                this.buttonClicked();
            }else if(sGameData.mAppCanChat&&pos.x <tar.x-tar.width*0.5 && pos.x > tar.x-tar.width*0.5-size_tab_size.width
                &&pos.y<tar.y-65+size_tab_size.height&&pos.y>tar.y-65-size_tab_size.height){
                this.buttonClicked();
            }else if(!this.checkClickView(tar, pos)){
                tar.setVisible(false);
            }else{

            }
        }
    },


    //创建操作按钮
    createOPMenu:function(bdata,layer,viptype,fontsize,showdis){
        if(viptype == null){
            viptype = 0;
        }
        if(fontsize == null){
            fontsize = 24;
        }
        if(showdis==null){
            showdis = true;
        }

        var size = this.mOPBtnSize;

        var opmenu = cc.Menu.create();
        opmenu.x = 0;
        opmenu.y = 0;
        layer.addChild(opmenu,80);
        var bitems = [];
        var len = bdata.length;
        for(var i=0;i<len;i++){
            //btntag,x,y,word ,func,func_param
            var data = bdata[i];
            var btntag = data[0];
            var btnx = data[1];
            var btny = data[2];
            var word = data[3];
            var func = data[4];
            //#xxx.png  在 jsb 不能用
            var sprite1 = createOpButton(word,size,0,fontsize,viptype);
            var sprite2 = createOpButton(word,size,1,fontsize,viptype);
            var sprite3 = null
            if(showdis){
                sprite3 = createOpButton(word,size,0,fontsize,viptype);
                sprite3.setColor(cc.color(100, 100, 100));
            }else{
                sprite3 = createOpButton("",size,0,fontsize,viptype);
            }

            var opItem = cc.MenuItemSprite.create(
                sprite1,
                sprite2,
                sprite3,
                func, this);
            opItem.setTag(btntag);
            opItem.attr({
                x: btnx,
                y: btny,
                anchorX: 0.5,
                anchorY: 0.5
            });
            opItem.setVisible(false);
            opmenu.addChild(opItem);
        }
        return opmenu;
    },

    //创建操作按钮
    createWordBtnMenu:function(bdata,layer,istest,zindex){
        if(istest == null){
            istest = true;
        }
        if(zindex == null){
            zindex = 85;
        }

        var opmenu = cc.Menu.create();
        opmenu.x = 0;
        opmenu.y = 0;
        layer.addChild(opmenu, zindex);
        var bitems = [];
        var len = bdata.length;
        for(var i=0;i<len;i++){
            //btntag,x,y,img,overimg,disimg ,word,func,point,fontsize
            var data = bdata[i];
            var btntag = data[0];
            var btnx = data[1];
            var btny = data[2];
            var normalimg = data[3];
            var overimg = data[4];
            var disimg = data[5];
            var word = data[6];
            var func = data[7];
            var point = data[8];
            var fontsize = data[9];
            if(overimg==""){
                overimg = normalimg;
            }
            if(disimg==""){
                disimg = normalimg;
            }
            var opsprite1 = ButtonSpriteWithWordInner(normalimg,word,point,fontsize);
            var opsprite2 = null;
            if(normalimg == overimg){
                opsprite2 = ButtonSpriteWithWordInner(overimg,word,point,fontsize,1);
            }else{
                opsprite2 = ButtonSpriteWithWordInner(overimg,word,point,fontsize);
            }
            var opsprite3 = ButtonSpriteWithWordInner(disimg,word,point,fontsize);
            if(disimg == normalimg){
                opsprite3.setColor(cc.color(100, 100, 100));
            }
            var opItem = cc.MenuItemSprite.create(
                opsprite1,
                opsprite2,
                opsprite3,
                func,this);
            if(btntag > 0){
                opItem.setTag(btntag);
            }
            opItem.attr({
                x:btnx,
                y:btny
            });
            if(!istest){
            opItem.setVisible(false);
            }
            opmenu.addChild(opItem);
        }
        return opmenu;
    }

});
