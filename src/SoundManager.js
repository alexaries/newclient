/**
 * Created by Administrator on 14-4-29.
 */
//v3.0 已经修改了（5个音效）bug －－2015-03-06
//只允许 同时播放5个音效 ，超过5个就没声音了（播放完没关闭？？？ 必须手动关闭）
// 把音效分成 5个 类型   （播放同一种类型时 自动关闭之前播放的，避免同时播放的超过5个）
//同时播放多个音效 时 用不同类型， 避免直接关闭前面的音效
var SOUND_NORMAL = 0   //普通 --时间短的 （如点击）
var SOUND_EFFECT = 1   //效果 ---时间比较长的
var SOUND_EFFECT1 = 2  //效果1 ---
var SOUND_TALK = 3  //聊天
var SOUND_CLOCK = 4  //时钟
var SoundManager = {
};
SoundManager.index = 0;
SoundManager.MAXSOUND = 10;
SoundManager.sounds = [[],[],[],[],[],[],[],[],[],[]];//按类型记录播放的音效
SoundManager._tempTime = 0;

SoundManager.playSoundState = 2; //0 不播放 1等待 2播放

SoundManager._lastBgMusicName = "";


SoundManager.canPlaySound = function(){
    var result = false;
    if(SoundManager.playSoundState  == 1){
        var time = (new Date()).getTime();
        if(time - SoundManager._tempTime > 5*1000){
            SoundManager.playSoundState = 2;
            SoundManager.playBGMusic(SoundManager._lastBgMusicName);
        }
    }
    if(SoundManager.playSoundState == 2){
        result = true;
    }else if(SoundManager.playSoundState == 0){
        result = false;
    }
    return result;
}
//进入后台，返回前台时 播放声音容易卡住主线程导致黑屏。这里进入后台后停止播放声音，返回前台后恢复
SoundManager.enterForeBackground = function(type){
    if(type == 2){
        SoundManager.stopBGMusic();
        SoundManager.cleanAllSound();
        SoundManager.playSoundState = 0;
    }else{
        SoundManager.playSoundState = 1;
        SoundManager._tempTime = (new Date()).getTime();
    }
}

//播放背景音乐
SoundManager.playBGMusic = function(name){
    if(sGameData.mMusicon&&SoundManager.canPlaySound()){
        //log("name=="+name);
        cc.audioEngine.playMusic(name,true);
        SoundManager._lastBgMusicName = name;
    }
}
//关闭背景音乐
SoundManager.stopBGMusic = function(){
    cc.audioEngine.stopMusic();
}

//播放音效 type 音效类型  loop是否重复  name 音效名称
SoundManager.playSound = function(name,loop,type){
    var soundId = 0;

    SoundManager.index++;
    type = SoundManager.index%SoundManager.MAXSOUND;
    if(type == null){
        type = SOUND_NORMAL;
    }
    if(loop == null){
        loop = false;
    }
    if(sGameData.mSoundon&&SoundManager.canPlaySound()){
        //log("soundname=="+name)
        if(!cc.sys.isNative || type == SOUND_CLOCK){
            SoundManager.stopAllSound(type);//(不需要再清除之前的音效)
        }
        soundId = cc.audioEngine.playEffect(name,loop)
        //log("soundId=="+soundId+"|"+name);
        SoundManager.sounds[type].push(soundId);
    }
    return soundId;
}
//关闭指定的音效
SoundManager.stopSound = function(sid){
    cc.audioEngine.stopEffect(sid)
}
//关闭某类型的所有音效
SoundManager.stopAllSound = function(type){
    var len = SoundManager.sounds[type].length;
    for(var i=0;i<len;i++){
        var soundId = SoundManager.sounds[type][i];
        cc.audioEngine.stopEffect(soundId);
    }
    SoundManager.sounds[type] = []
}
//关闭所有音效
SoundManager.cleanAllSound =function(){
    cc.audioEngine.stopAllEffects();
    SoundManager.sounds = [[],[],[],[],[],[],[],[],[],[]]
}