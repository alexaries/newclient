/**
 * Created by Administrator on 14-4-29.
 * 动画管理器 （plist 帧动画，cocosStudio骨骼动画 ）
 */
var AnimationManager = {
};
AnimationManager.speed = 1;//速率（目前设1，要调动画整体速度时，改变值）
AnimationManager.mAnimnames = [] //自己拼的帧动画；加载进来的动画名都存起来，退出时一起移出
AnimationManager.mArmatures = [] //cocosstudio 骨骼动画  _ccs
//{animname，resname，plistpath，framenum，dur,indextype,buzero,clearplist,linetype｝
//{动画名，资源名，plist路径，帧数，时间间隔,从0还是1开始,小于10时是否补0，是否清除plist,是否带下划线｝
//clearplist 只有 套牛 多个动画用一个plist 才前面设0 最后个设1


//所有界面动画 网络延迟 时显示
AnimationManager.allviewanimdata = [
    ["netwait","netload_anim", res.netload_plist, 8, 0.15,1,1,1]
]

//主动画 网络延迟 时显示
AnimationManager.mainanimdata = [
    ["netwait","netload_anim", res.netload_plist, 8, 0.15,1,1,1]
]

//ddz动画数据
AnimationManager.ddzanimdata = [
    ["ddzzhadan","ddz_bomb", res.ddz_bomb_plist, 21, 0.05,1,1,1],
    ["ddz_win","mj_anim_win", res.ddz_anim_win_plist, 17, 0.05,1,0,1,0],
    ["ddz_lose","mj_anim_lose", res.ddz_anim_lose_plist, 20, 0.05,1,0,1,0],
    ["ddz_losewind","mj_anim_lose_w", res.ddz_anim_losewind_plist, 25, 0.05,1,0,1,0]
]

//ddz match动画数据
AnimationManager.ddzmatchanimdata = [
    ["gamematch_light","gamematch_light", res.gamematch_light_plist, 7, 0.08,1,0,1,0],
    ["gamematch_run","gamematch_run", res.gamematch_run_plist, 4, 0.1,1,0,1,0]

]

//zjh动画数据
AnimationManager.zjhanimdata = [
    ["zjhzhadan","zjh_bomb", res.zjh_bomb_plist, 13, 0.08,1,1,1],
    ["zjhlightning","zjh_lightning", res.zjh_lightning_plist, 6, 0.05,1,1,1]
]

//斗牛 cocosstudio 骨骼动画  //[Armaturename,png,plist,json,Animationname]
AnimationManager.dnanimdata_ccs = [
    ["nnWin",res.dn_nnWin0_png,res.dn_nnWin0_plist,res.dn_nnWin_ExportJson,"nnWin"],
    ["nnLose",res.dn_nnLose0_png,res.dn_nnLose0_plist,res.dn_nnLose_ExportJson,"nnLose"],
    ["bomb",res.dn_bomb0_png,res.dn_bomb0_plist,res.dn_bomb_ExportJson,"bomb"],
    ["color_4",res.dn_color_40_png,res.dn_color_40_plist,res.dn_color_4_ExportJson,"color_4"],
    ["color_5",res.dn_color_50_png,res.dn_color_50_plist,res.dn_color_5_ExportJson,"color_5"],
    ["Ox_10",res.dn_Ox_100_png,res.dn_Ox_100_plist,res.dn_Ox_10_ExportJson,"Ox_10"],
    ["small",res.dn_small0_png,res.dn_small0_plist,res.dn_small_ExportJson,"small"]
]



//交互动画数据（扔炸弹）
AnimationManager.interativeanimdata = [
    ["interative_1","interative_1", res.interative_1_plist, 13, 0.05,0,0,1],
    ["interative_2","interative_2", res.interative_2_plist, 11, 0.05,0,0,1],
    ["interative_3","interative_3", res.interative_3_plist, 22, 0.05,0,0,1],
    ["interative_4","interative_4", res.interative_4_plist, 15, 0.05,0,0,1],
    ["interative_5","interative_5", res.interative_5_plist, 9, 0.05,0,0,1],
    ["interative_6","interative_6", res.interative_6_plist, 8, 0.05,0,0,1],
    ["interative_7","interative_7", res.interative_7_plist, 14, 0.05,0,0,1],
    ["interative_8","interative_8", res.interative_8_plist, 9, 0.05,0,0,1]
]


//初始化 互动动画 的动画
AnimationManager.initInterativeAnim = function(){
    log("initInterativeAnim---")
    var len = AnimationManager.interativeanimdata.length
    for(var i=0;i<len;i++){
        var data = AnimationManager.interativeanimdata[i]
        AnimationManager.createAnimationByData(data,0,0)
    }
}


//初始化main动画
AnimationManager.initAllViewAnim = function(){
    log("initAllViewAnim---")
    var len = AnimationManager.allviewanimdata.length
    for(var i=0;i<len;i++){
        var data = AnimationManager.allviewanimdata[i]
        AnimationManager.createAnimationByData(data)
    }
}

//初始化main动画
AnimationManager.initMainAnim = function(){
    log("initMainAnim---")
    var len = AnimationManager.mainanimdata.length
    for(var i=0;i<len;i++){
        var data = AnimationManager.mainanimdata[i]
        AnimationManager.createAnimationByData(data)
    }
}


//初始化ddz的动画
AnimationManager.initDDZAnim = function(){
    log("initDDZAnim---")
    var len = AnimationManager.ddzanimdata.length
    for(var i=0;i<len;i++){
        var data = AnimationManager.ddzanimdata[i]
        AnimationManager.createAnimationByData(data)
    }
}

//初始化zjh的动画
AnimationManager.initZJHAnim = function(){
    log("initZJHAnim---")
    var len = AnimationManager.zjhanimdata.length
    for(var i=0;i<len;i++){
        var data = AnimationManager.zjhanimdata[i]
        AnimationManager.createAnimationByData(data)
    }
}
//初始化 斗牛 的动画
AnimationManager.initDNAnim = function(){
    log("initDNAnim---")
    var len = AnimationManager.dnanimdata_ccs.length
    for(var i=0;i<len;i++) {
        var data = AnimationManager.dnanimdata_ccs[i];
        var armaturename = data[0]
        //var armaturedata = AnimationManager.getArmatureData(armaturename);
        //if(!armaturedata){
            ccs.armatureDataManager.addArmatureFileInfo(data[1], data[2], data[3]);
            //AnimationManager.mArmatures.push(armaturename);
        //}
    }
}

//ggl
AnimationManager.initGGLAnim = function(){
    log("initGGLAnim---")
    var len = AnimationManager.gglanimdata.length
    for(var i=0;i<len;i++){
        var data = AnimationManager.gglanimdata[i]
        AnimationManager.createAnimationByData(data,0,0);
    }
}

AnimationManager.initAnimalsRunAnim = function(){
    var animname = "run_photo";
    var animation = AnimationManager.getAnimation(animname)
    if( animation == null) {
        var animPlist = res.arun_photo_plist;
        var delay = 0.04
        var cache = cc.spriteFrameCache;
        cache.addSpriteFrames(animPlist)
        var animFrames = [];
        var indexs = [1,2,3,4,3,2,1]
        for(var i=0;i<indexs.length;i++){
            var index = indexs[i]
            var res1 = "run_photo_"+index+".png"
            var frame = cache.getSpriteFrame(res1)
            animFrames.push(frame)
        }
        //0.05f表示每帧动画间的间隔
        var animation = cc.Animation.create(animFrames, delay)
        cache.removeSpriteFramesFromFile(animPlist);
        cc.animationCache.addAnimation(animation,animname);
        AnimationManager.mAnimnames.push(animname);
    }
}


//根据数据 创建动画
AnimationManager.createAnimationByDataForMany = function(data){
    for(var i=0;i<data.length;i++){
        var tdata = data[i];
        AnimationManager.createAnimationByData(tdata);
    }
}

//根据数据 创建动画
AnimationManager.createAnimationByData = function(data){
    var indextype = data[5];
    var buzero = data[6];
    var speed = AnimationManager.speed
    var animname = data[0]
    var clearplist = 1;
    var linetype = 1; //带下划线
    var atype = 0;
    if(data[7] == 0){
        clearplist = data[7];
    }
    if(data[8] == 0){
        linetype = data[8];
    }
    if(data[9] == 1){
        atype = data[9];
    }
    var animation = AnimationManager.getAnimation(animname)
    if( animation == null) {
        animation = AnimationManager.createAnimationByPlist(data[1], data[2], data[3], data[4]*speed,indextype,buzero,clearplist,linetype,atype)
        cc.animationCache.addAnimation(animation,animname);
        AnimationManager.mAnimnames.push(animname);
    }
}

//根据动画名获取某个动画
AnimationManager.getAnimation = function(animname){
    return cc.animationCache.getAnimation(animname);
}

//清除所有的动画
AnimationManager.removeAnimations = function(){
    var len = AnimationManager.mAnimnames.length;
    var haswait = false;
    for(var i=0;i<len;i++){
        var animname = AnimationManager.mAnimnames[i];
        if(animname!="netwait"){
            cc.animationCache.removeAnimation(animname);
        }else{
            haswait = true;
        }
    }
    if(haswait){
        AnimationManager.mAnimnames = ["netwait"]
    }else{
        AnimationManager.mAnimnames = []
    }

    AnimationManager.removeArmatures();
}



//根据动画名获取某个动画
AnimationManager.getArmatureData = function(animname){
    return ccs.armatureDataManager.getArmatureData(animname)
}
//清除所有的动画
AnimationManager.removeArmatures = function(){
//    var len = AnimationManager.mArmatures.length;
//    for(var i=0;i<len;i++){
//        var armaturename = AnimationManager.mArmatures[i];
//        ccs.armatureDataManager.removeArmatureData(armaturename);
//    }
//    AnimationManager.mArmatures = []
    ccs.armatureDataManager.clear()
}

/**
 * 根据plist创建动画
 * @param resName  动画名称 (图片格式 name_01.png)
 * @param animPlist plist 路径
 * @param frames 动画的帧数
 * @param delay
 * @param indextype  0:图片从0开始  1:从1开始  n:从n开始
 * @param buzero   0:不补0 1:补0
 * @param clearplist  0:不清plist 1:清除plist
 * @param linetype  0:没下划线 1:有下划线
 * @param aliastextype  0:没抗锯齿 1:抗锯齿
 * @returns {animFrames}
 */
AnimationManager.createAnimationByPlist = function(resName, animPlist, frames, delay,indextype,buzero,clearplist,linetype,aliastextype){
    log("createAnimationByPlist--"+resName +"|"+ animPlist+"|"+indextype+"|"+frames+"|"+clearplist+"|"+linetype)
    var cache = cc.spriteFrameCache;
    cache.addSpriteFrames(animPlist)

    var animFrames = [];
    var index = indextype;
    var linestr = "_";
    if(linetype == 0){
        linestr = "";
    }
    for(var i=index;i<frames+index;i++){
        var res = resName+linestr+i+".png"
        if (buzero==1 && i < 10){
            res = resName+linestr+"0"+i+".png"
        }
        var frame = cache.getSpriteFrame(res)
        if(aliastextype == 1){
            var texture = frame.getTexture()
            texture.setAliasTexParameters();
        }
        animFrames.push(frame)
    }
    //0.05f表示每帧动画间的间隔
    var animation = cc.Animation.create(animFrames, delay)
    if(clearplist == 1){
        cache.removeSpriteFramesFromFile(animPlist);
    }
    return animation;
}