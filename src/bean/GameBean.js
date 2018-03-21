/**
 * Created by apple on 15-1-5.
 */
//直接使用的对象

//**************** 未使用 ****************
//用户数据 －－未使用
var User = cc.Class.extend({
    tag:"user",
    sessionId:"",//服务器session Id
    id:0,//用户id
    userName:"",//用户名
    nickName:"",//昵称
    sex:0,//性别
    avatar:"",//头像
    vip:0,//vip
    xp:0,//经验值
    level:0,//等级
    softCash:0,//金币
    hardCash:0,//元宝
    moneyCash:0,//充值货币 没使用
    realName:"",//真实姓名
    idcard:"",//身份证
    email:"",//email
    phone:"",//手机
    signin:"",//签到数据
    serverTime:0,//服务器时间
    onLineRoomId:0,//>0时：玩家在房间的id号(掉线重连使用)
    onLineTableId:0,//当onLineRoomId > 0 时该字段有效，onLineTbaleId <= 0表示不在房间中
    //--以上 net 直接获取数据

    localTimeByServer:0,//取到服务器时间时的本地时间

    state:0,//玩家状态
    chairId:-1,//椅子号
    score:0,//（比赛积分）
    gamecash:0,//dzpk当前筹码
    ddzNoteCardEndTime:0,//记牌器结束时间
    signday:0,//签到第几天
    onFriendRoomId:0,//好友在的房间id
    onFriendTableId:0,//好友在的桌子id

    //......未完
    toString:function(){
        return this.id+" "+this.userName+" "+this.softCash+" "+this.hardCash;
    }
});


//房间数据－－未使用
var Room = cc.Class.extend({
    tag:"room",
    roomId:0,//房间id
    roomName:"",//房间名称
    gameId:0,//游戏类型
    ipAddress:"",//ip
    port:0,//端口
    websocketPort:0,//websocket端口
    state:0,//状态
    onlineCount:0,//在线人数
    basicPoint:0,//基本点数
    enterPoint:0,//进入限制
    maxAllowCount:0,//最大人数
    toString:function(){
        return this.tag;
    }
});


//桌子数据－－未使用
var Table = cc.Class.extend({
    tag:"table",
    id:0,//桌子id
    name:"",//桌子名称
    tablePlayers:0,//桌子上人数
    chairCount:0,//椅子数量
    chairdatas:[],//椅子数据
    //dzpk
    smallBlind:0,//小盲注
    bigBlind:0,//大盲注
    minCarry:0,//最小携带
    maxCarry:0,//最大携带
    //zjh dn
    minBet:0,//最小投注
    //zjh
    enterPoint:0,//进入限制
    seeRound:0,//	第几轮之后可以看牌
    compareRound:0,//	第几轮之后可以比牌
    endRound:0,//	第几轮之后必须比牌结束游戏

    toString:function(){
        return this.tag;
    }
});


//桌子椅子数据－－未使用
var TableChairData = cc.Class.extend({
    tag:"tablechairdata",
    chairId:0,//椅子号
    playerFlag:0,//该椅子上是否有玩家，有玩家1，无玩家0, 有玩家下面字段有效
    playerId:0,
    playerNickName:"",
    playerAvatar:"",
    toString:function(){
        return this.tag;
    }
});

//比赛数据－－未使用
var Match = cc.Class.extend({
    tag:"match",
    roomId:0,//比赛房间id
    openState:0, //开放状态 0不开放 1开放
    name:"",//比赛名称
    gameId:0,//游戏类型
    id:0,//比赛id

    ip:"",//IP
    socketPort:0,//端口
    websocketPort:0,//端口

    type:0,//比赛类型： 1定时 2人满
    signupGold:0,//报名费
    playerUpperlimit:0,//人数限制
    initScore:0,// 初始积分
    baseScore:0,// 底分

    prizeInfo:"",//奖励信息
    info:"",//说明
    startTime:0,//开始时间
    currPlayerCount:0,//报名玩家数量
    userMatchId:0,// 报名id（》0表示已报名）

    gamedata:"",//比赛轮数数据（"6:2,3:1"）

    //计算得出－－－－－－
    littleInfo:"",
    signup:0,//是否报名 , 计算得出
    basicGScore:0,// 底分 (原来有底分增加，现在固定底分)
    currPlayCount:0,//第几局
    rank:0,//排名
    currPlayLun:0,//第几轮
    currLunPlayCount:0,//当前轮第几局
    matchCount:0,//
    lundatas:[],//轮数数据，每轮几局，根据gamedata算出
    startPlayerCount:0,//开始时人数
    currGameTableCount:0,

    extraData:null,
    //signPropsId:0,
    //signPropsCount:0,
    //littleInfo:"",
    //initScore:0,//初始积分
    //baseScore:0,//底分
    //incrScore:0,//每局增加底分
    //matchCount:0,// 比赛局数
    //entryLowerlimit:0,//报名允许的最小玩家数
    //entryUpperlimit:0,//报名允许的最大玩家数
    //basePoint:0,//（金币）基本点数
    //enterPoint:0,//（金币）进入限制
    //candouble:0,//能否使用双倍积分
    //blood:"",//能否加血
    //
    //clientShow:0,

    toString:function(){
        return this.tag;
    }
});
var MatchExtraData = cc.Class.extend({
    tag:"matchExtraData",
    littleInfo:"",
    signup:0,//是否报名 , 计算得出
    basicGScore:0,// 底分 (原来有底分增加，现在固定底分)
    currPlayCount:0,//第几局
    rank:0,//排名
    rankchange:0,// <0 减少, >0 增加
    currPlayLun:0,//第几轮
    currLunPlayCount:0,//当前轮第几局
    matchCount:0,//
    lundatas:[],//轮数数据，每轮几局，根据gamedata算出
    startPlayerCount:0,//开始时人数
    currGameTableCount:0,



    toString:function(){
        return this.tag;
    }
});


//消息数据－－未使用
var Msg = cc.Class.extend({
    tag:"msg",
    id:0,//椅子号
    fromId:0,//
    type:0,
    img:"",
    content:"",
    kitdata:"",
    readTime:0,
    kitTime:0,
    createTime:0,
    toString:function(){
        return this.tag;
    }
});



//**************** 未使用 end ****************

//**************** 使用中 ****************
//滚动背景数据 －－使用中
var ScrollBGData = cc.Class.extend({
    mType:0,//0图片背景 比桌面大 1图片背景 比桌面小
    mBGSprite1:null,//背景1
    mBGSprite2:null,//背景2
    mBGSprite3:null,//背景3 type =1时有
    mTextureX:0,//背景 取的坐标x
    mTextureRect:null,//材质的位置区域
    mY:0,//y坐标
    toString:function(){
        return "ScrollBGData";
    }
});


//水浒传老虎机 共享数据 －－使用中
var FSH_ShareData = cc.Class.extend({
    mLineNum:0,//线数
    mBaseBetNum:0,//投注基数
    mWinScore:0,//赢的分数（没算了玛丽）
    mEndWinScore:0,//赢的分数(算了玛丽)
    mBaseBetNums:[],//投注范围
    mBaseBetIndex:0,
    mAutoState:0,//是否自动
    mMLCount:0,//玛丽次数
    mMariodatas:[],//玛丽数据
    mMaxScore:0,//水浒传老虎机最大分数
    mBiMaxScore:0,//水浒传老虎机最大比倍分数
    mResultIndexs:[],//水浒传老虎机显示滚轮值
    mBiHistory:[],//水浒传老虎机比倍历史
    mType:0,// 1去 比倍 2 去小玛丽  11比倍返回  21 小玛丽返回
    toString:function(){
        return "FSH_ShareData";
    }
});


//
//游戏资源数据
var GameResData = cc.Class.extend({
    mGameId:0,//1 个游戏可以对应多个资源
    mResName:"",//
    mUrl:"",//
    mSize:0,
    mVersion:0,
    mState:0,
    toString:function(){
        return "GameResData";
    }
});