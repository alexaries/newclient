/**
 * Created by apple on 15-12-22.
 */

//跟游戏逻辑无关的都放在这里


//发送本地推送
var  sendLocalPushMsg = function(){
    //sGameData.mLocalPushMsg = sResWord.w_tip_welcome+"Good Luck!!!";

    if(!sGameData.mAppCanLocalPushMsg){
        return;
    }


    if(cc.sys.isNative) { // 3 2
        CallCpp.doSomeString(70, "", "0", "7", "0", "0");

//        var push1data = getGameSysConfig("push_notification_1");
//        if(push1data&&push1data.length > 0){
//            var datas = push1data.split(";");
//            var type = datas[0];
//            var repeat = datas[1];
//            var delayday = datas[2];
//            var delaytime = datas[3];
//            var info = "";
//            for(var i =0;i<datas.length-4;i++){
//                info += datas[4+i];
//                if(i!=datas.length-5){
//                    info += ";";
//                }
//            }
//            CallCpp.doSomeString(70, info, ""+type,""+repeat, ""+delayday, ""+delaytime);//"1","2", "7", "5"
//        }
//
//        var push2data = getGameSysConfig("push_notification_2");
//        if(push2data&&push2data.length > 0){
//            var datas = push2data.split(";");
//            var type = datas[0];
//            var repeat = datas[1];
//            var delayday = datas[2];
//            var delaytime = datas[3];
//            var info = "";
//            for(var i =0;i<datas.length-4;i++){
//                info += datas[4+i];
//                if(i!=datas.length-5){
//                    info += ";";
//                }
//            }
//            CallCpp.doSomeString(70, info, ""+type,""+repeat, ""+delayday, ""+delaytime);//"1","2", "7", "5"
//        }
//
//        var push3data = getGameSysConfig("push_notification_3");
//        if(push3data&&push3data.length > 0){
//            var datas = push3data.split(";");
//            var type = datas[0];
//            var repeat = datas[1];
//            var delayday = datas[2];
//            var delaytime = datas[3];
//            var info = "";
//            for(var i =0;i<datas.length-4;i++){
//                info += datas[4+i];
//                if(i!=datas.length-5){
//                    info += ";";
//                }
//            }
//            CallCpp.doSomeString(70, info, ""+type,""+repeat, ""+delayday, ""+delaytime);//"1","2", "7", "5"
//        }


        //7天没登录，每周重复，
        sGameData.mLocalPushMsg = sResWord.w_local_pushmsg2;
        CallCpp.doSomeString(70, sGameData.mLocalPushMsg, "1","2", "7", "5");//"1","2", "7", "5"
        //每周六 19点 执行
        sGameData.mLocalPushMsg = sResWord.w_local_pushmsg1;
        CallCpp.doSomeString(70, sGameData.mLocalPushMsg, "2","2", "7", "19");//"2","2", "7", "19"
        //每天 18:30点 执行
        sGameData.mLocalPushMsg = sResWord.w_local_pushmsg3;
        CallCpp.doSomeString(70, sGameData.mLocalPushMsg, "3","1", "18", "30");// "3","1", "18", "30"

        //type:repeat:delayday:delaytime:info
        //type： 0清除之前的；1 （多久没登录执行）； 2每周几 几点 执行 ； 3 每天 几点执行
        //repeat： 0不重复； 1 每天； 2每周
        //例子：
        //1:2:几天没登录（7）:延迟几分钟（5））:msg
        //2:2:周几（周天1，－ 周六7）:几点（19））:msg
        //3:1:几点（18）:几分（30）:msg
        //ios :type 1,2,3
        //andoird :type 1
        //andoird 提示有延迟 10分钟内

    }
}

var getAddressNickShow = function(nickname){
    var nickname1 = nickname;
    if(!nickname||nickname.length == 0){
        nickname1 = sResWord.w_unknown_address;
    }else{
        var nlen = checksum(nickname);
        if(nlen > 12){
            if(nlen - nickname.length > 5){//汉字超5个
                if(nickname.length > 7){
                    nickname1 = nickname.substring(0,7)+"...";
                }
            }else{
                if(nickname.length > 10) {
                    nickname1 = nickname.substring(0, 10) + "...";
                }
            }
        }
    }
    return nickname1;
}

var getNickNameShow = function(nickname){
    var nickname1 = nickname;
    var nlen = checksum(nickname);
    if(nlen > 12){
        if(nlen - nickname.length > 5){//汉字超5个
            if(nickname.length > 7){
                nickname1 = nickname.substring(0,7)+"...";
            }
        }else{
            if(nickname.length > 10) {
                nickname1 = nickname.substring(0, 10) + "...";
            }
        }
    }
    return nickname1;
}

var checksum = function(chars)
{
    var sum = 0;
    for (var i=0; i<chars.length; i++)
    {
        var c = chars.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f))
        {
            sum++;
        }
        else
        {
            sum+=2;
        }
    }
    return sum;
}


//对网上传过来的消息，处理下。 \n会被转换，
var formatMsgFromNet = function(msg){
    if(msg.length > 0){
        if(msg.indexOf("\\n") > -1){
            msg = msg.replace(/\\n/g," \n");
        }
    }
    return msg;
}

//获取文件 大小
var getFileSize = function(size){
    var str = "";
    if(size < 1024){
        str = "1K";
    }else if(size < 1024*1024){
        var num = Math.floor(size/1024.0*10)/10;
        str = num+"K";
    }else{
        var num = Math.floor(size/(1024*1024.0)*10)/10;
        str = num+"M";
    }
    return str;
}


//像素格式设成rgba4444   type 1:rgba4444   0:rgba8888  (在basescene loadres  使用)
var setTexture2DAlphaPixelFormatTo4444 = function(type){
    log("setTexture2DAlphaPixelFormatTo4444=="+type);
    if(type == 0){
        if(cc.sys.isNative){
            cc.Texture2D.setDefaultAlphaPixelFormat(cc.Texture2D.PIXEL_FORMAT_RGBA8888)
        }else{
            cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA8888;
        }
    }else{
        if(cc.sys.isNative){
            cc.Texture2D.setDefaultAlphaPixelFormat(cc.Texture2D.PIXEL_FORMAT_RGBA4444)
        }else{
            cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA4444;
        }
    }
}

//获取图片在plist中的区域
var getRealRectInPlist = function(plist,filedatas,tar){
    log("getRealRectInPlist--1")
    var key1 = "frames"
    var key3 = "frame"
    var rectstr = "";
    var rect = cc.rect(0,0,0,0);
    var self = this;
    if(cc.sys.isNative){
        var datas = cc._plistLoader.load(plist)
        var frames = datas[key1]
        log("rectstr==="+rectstr);
        for(var i =0;i < filedatas.length;i++){
            var picname = filedatas[i][0];
            var picdata = frames[picname]
            rectstr = picdata[key3]
            filedatas[i][1] = getRectByStr(rectstr)
        }
        tar.getRected = true;
    }else{
        var cb1 = function(tar1,datas){
            var frames = datas[key1]
            for(var i =0;i < filedatas.length;i++){
                var picname = filedatas[i][0];
                var picdata = frames[picname]
                rectstr = picdata[key3]
                filedatas[i][1] = getRectByStr(rectstr)
            }
            tar.getRected = true;
        }
        cc._plistLoader.load(plist,"","",cb1)
    }
    log("getRealRectInPlist--2")
}
//根据字符串获取区域
var getRectByStr = function(str){
    var rect = cc.rect(0,0,0,0);
    var str1 = str.substring(1,str.length-1);//{{},{}}
    var datas = str1.split("},{");//{},{}
    if(datas.length == 2){
        var posstr = datas[0];
        var posstr1 = posstr.substring(1);
        var datas1 = posstr1.split(",");
        rect.x = Number(datas1[0])
        rect.y = Number(datas1[1])

        var sizestr = datas[1];
        var sizestr1 = sizestr.substring(0,sizestr.length-1);
        var datas2 = sizestr1.split(",");
        rect.width = Number(datas2[0])
        rect.height = Number(datas2[1])
    }
    return rect;
}

//检查emall
var checkEmail = function (str){
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,4}$/;
    if(reg.test(str)){
        return true;
    }else{
        return false;
    }
}

//判断 数字 （手机 ）
var checkNumber = function(word){
    var usern = /^[0-9]{1,}$/;
    if(word.match(usern)){
        return true;
    }
    return false;
}

//判断 字幕 数字 下划线 （账号密码）
var checkChars = function(word){
    var usern = /^[a-zA-Z0-9_@.]{1,}$/;
    if(word.match(usern)){
        return true;
    }
    return false;
}

//判断 汉字 字幕 数字 下划线 （昵称）
var checkCharsForNick = function(word){
    var usern = /^[\u4E00-\u9FA5a-zA-Z0-9_@.]{1,}$/
    if(word.match(usern)){
        return true;
    }
    return false;
}

//获取游客uuid
var getGuestUUID = function(){
    log("getGuestUUID------")
    var ls = cc.sys.localStorage;
    var has = ls.getItem(HAS_LOCAL_GUESTID);
    var gid = "";
    if(!has){
        if (cc.sys.isNative) {
            CallCpp.doSomeString(14, "","","","","");
        } else {
            var webuuid = getWebGuid()
            gid = md5(webuuid);
            if(sGameData.mIsTestUseWebGuest){
                if(cc.sys.os == cc.sys.OS_OSX){
                    gid = "5CDB44231F4FA550E7B6AA76625B6853";
                }else{
                    gid = "FDC9FB9A5059E139D43AF24B02E544D3";
                }
            }
            ls.setItem(HAS_LOCAL_GUESTID, true);
            ls.setItem(LOCAL_GUESTID, gid);
            sGameData.mGuestUUID = gid
            log("mGuestUUID------"+sGameData.mGuestUUID);
        }
    }else{
        gid = ls.getItem(LOCAL_GUESTID);
        sGameData.mGuestUUID = gid
        log("mGuestUUID------"+sGameData.mGuestUUID);
    }
    //return gid;
}

//获取 唯一编号
var getWebGuid = function(){
    function G() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    var guid = (G() + G() + "-" + G() + "-" + G() + "-" +
    G() + "-" + G() + G() + G()).toUpperCase();
    return guid;
}

// 根据在线人数和最大人数 获取 hot 数量
var getRoomHot = function(room){
    var hot = 1;
    if(room.maxAllowCount == 0){
        room.maxAllowCount = 100;
    }
    var rate = room.onlineCount*1.0/room.maxAllowCount

    if(room.maxAllowCount > 180){
        if(rate > 0.5){
            hot = 5;
        }else if(rate > 0.3){
            hot = 4;
        }else if(rate > 0.15){
            hot = 3;
        }else if(rate > 0.05){
            hot = 2;
        }
    }else{
        if(rate > 0.5){
            hot = 5;
        }else if(rate > 0.3){
            hot = 4;
        }else if(rate > 0.2){
            hot = 3;
        }else if(rate > 0.1){
            hot = 2;
        }
    }
    return hot;
}

//创建虚拟的房间
var createVirtualRoom = function(gameId){
    var room = {}
    room.roomId = gameId*10000;
    room.gameId = gameId
    return room;
}

//把毫秒数转本地时间
var getLocalTime = function(nS) {
    var tdate = new Date(parseInt(nS))
    return tdate.format("yyyy-MM-dd hh:mm:ss");
}
//把毫秒数转本地时间
var getLocalTime_mini = function(nS) {
    var tdate = new Date(parseInt(nS))
    return tdate.format("MM-dd hh:mm");
}

//把毫秒数转本地时间
var getLocalTime_mini1 = function(nS) {
    var tdate = new Date(parseInt(nS))
    return tdate.format("yyyy-MM-dd hh:mm");
}
//把毫秒数转本地时间
var getLocalTime_day = function(nS) {
    var tdate = new Date(parseInt(nS))
    return tdate.format("MM-dd");
}
//把毫秒数转本地时间1
var getLocalTime_day1 = function(nS) {
    var tdate = new Date(parseInt(nS))
    return tdate.format("yyyy-MM-dd");
}
//把毫秒数转本地时间
var getLocalTime_hm = function(nS) {
    var tdate = new Date(parseInt(nS))
    return tdate.format("hh:mm");
}
//播放声音
var playClickSound = function(){
    SoundManager.playSound(res.click_mp3);
}
var playChupaiSound = function(){
    SoundManager.playSound(res.put_card_mp3);
}
var playFapaiSound = function(){
    SoundManager.playSound(res.put_card_mp3);
}

//转换字符串为bool型  （localStorage取出的都是字符串型）
var changeStringToBool = function(value,defaultvalue){
    if(!defaultvalue){
        defaultvalue = false;
    }
    if(value){
        var result = value.toLowerCase()
        if(result === "true"){
            return true;
        }else if(result === "false"){
            return false;
        }
    }
    return defaultvalue;
}

var getBoolFromLocalStorage = function(ls,key){
    var has = ls.getItem(key);
    var result = changeStringToBool(has,false);
    return result;
}

//数字显示
var getNumStr = function(num){
    var str = "";
    if(num<1000){
        str = num;
    }else if(num<10000){
        var k = Math.floor(num/100)*100/1000.0;
        str = k+ sResWord.w_qian
    }else if(num<1000000){
        var k = Math.floor(num/1000)*1000/10000.0;
        str = k+ sResWord.w_wan
    }else if(num<10000000){
        var k = Math.floor(num/100000)*100000/1000000.0;
        str = k+ sResWord.w_baiwan
    }else if(num<100000000){
        var k = Math.floor(num/1000000)*1000000/10000000.0;
        str = k+ sResWord.w_qianwan
    }else{
        var k = Math.floor(num/10000000)*10000000/100000000.0;
        str = k+ sResWord.w_yi
    }
    return str;
}

//根据id 删除 table中元素
var removeFromTableById = function(list,id){
    var len = list.length;
    var index = -1;
    for(var i=0;i<len;i++){
        var item = list[i];
        if(item.id == id){
            index = i;
            break;
        }
    }
    if(index > -1){
        list.splice(index,1);
    }
}
//根据id 删除 table中元素
var removeFromTable = function(list,id){
    var len = list.length;
    var index = -1;
    for(var i=0;i<len;i++){
        var item = list[i];
        if(item == id){
            index = i;
            break;
        }
    }
    if(index > -1){
        list.splice(index,1);
    }
}

//根据id 获取数组中的元素
var getDataById = function(datas,id){
    var len = datas.length;
    for(var i=0;i<len;i++){
        var data = datas[i];
        if(data.id == id){
            return data;
        }
    }
    return null;
}

//判断某个数组中是否包换某个值
var valuecontain = function(arrays, value){
    for(var i=0;i<arrays.length;i++){
        if(arrays[i] == value){
            return true;
        }
    }
    return false;
}
//从数据包中读取某位置的整形
var getIntFromArrayData = function(arraydata,index){
    var value = arraydata[index];   //获取当前指令包的长度
    value = (value<<8) + arraydata[index+1];
    value = (value<<8) + arraydata[index+2];
    value = (value<<8) + arraydata[index+3];
    return value;
}


//更换场景时移出资源
var removeSpriteChangeScene = function(){
    log("removeSpriteChangeScene==")
    if(cc.sys.isNative){
        cc.textureCache.removeUnusedTextures();
        cc.spriteFrameCache.removeUnusedSpriteFrames()
    }
    //cc.spriteFrameCache.removeSpriteFrames()
    AnimationManager.removeAnimations();
}
//把数组合并
var concatArray = function(array){
    var result = [];
    for(var i=0;i<array.length;i++){
        result = result.concat(array[i]);
    }
    result = result.unique5();
    return result;
}

// 获取服务器 当前时间
var getNowServerTime = function(){
    var time = 0;
    if(sGameData.mUser){
        var now = (new Date()).getTime();
        time = sGameData.mUser.serverTime + (now - sGameData.mUser.localTimeByServer);
    }
    return time
}

//检查是不是系统头像
var checkIsSysPic = function(avatar){
    var issyshead = false;
    for(var i=0;i<sGameData.mSysHeads.length;i++){
        var head = sGameData.mSysHeads[i];
        if(head == avatar){
            issyshead = true;
            break;
        }
    }
    return issyshead
}


//判断图片是否存在（jsb）
var islocalHasPicFile = function(pic){
    var has = false;
    if (cc.sys.isNative) {
        var path = getLoadImgPath();
        path = path + pic;
        if(sGameData.mIsOldVer){
            has = cc.fileUtils.isFileExist(path)
        }else{
            has = jsb.fileUtils.isFileExist(path)
        }
    }
    return has;
}


//判断某个值是否是无效值空值
var checkValueInvalid = function(a){
    var result = false;
    if (a === undefined || typeof(a) == "undefined" || a == null){
        result = true;
    }
    return result;
}

//隐藏结尾的几个字符串
var hiddenEndChar = function(code,hlen){
    var len = code.length;
    var result = "";
    if(len > hlen){
        result = code.substring(0,len-hlen);
    }
    for(var i=0;i<hlen;i++){
        result += "*";
    }
    return result;
}
//隐藏手机的几个字符串  前n位＋4位*＋后4位
var hiddenPhoneChar = function(code){
    var result = "";
    if(code!=null){
        var hlen = 4;
        var len = code.length;
        if(code.length >= 6){
            if(len > hlen+4){
                result = code.substring(0,len-hlen-4);
            }else{
                hlen = len -4;
            }
            for(var i=0;i<hlen;i++){
                result += "*";
            }
            result += code.substring(len-4,len);
        }else{
            result = code;
        }
    }
    return result;
}

//隐藏手机的几个字符串  前n位＋4位*＋后4位
var hiddenEmailChar = function(code){
    var result = "";
    if(code!=null){
        var hlen = 4;
        var len = code.length;
        if(code.length >= 5){
            var index = code.indexOf("@");
            if(index > -1){
                hlen = index;
                if(index > 4){
                    result = code.substring(0,3);
                    hlen = index-3;
                }else if(index > 1){
                    result = code.substring(0,1);
                    hlen = index-1;
                }
                for(var i=0;i<hlen;i++){
                    result += "*";
                }
                result += code.substring(index,len);
            }else{
                result = hiddenPhoneChar(code);
            }
        }else{
            result = code;
        }
    }
    return result;
}

//隐藏手机的几个字符串  前n位＋4位*＋后4位
var hiddenNickChar = function(code){
    var result = "";
    if(code!=null){
        var hlen = 1;
        var len = code.length;

        if(len > 4){
            result = code.substring(0,3);
            hlen = len-3;
        }else if(len > 1){
            result = code.substring(0,1);
            hlen = len-1;
        }
        for(var i=0;i<hlen;i++){
            result += "*";
        }
    }
    return result;
}



//处理系统公告  多颜色 段落 消息
//"test1[font:28]test2[color:0x63b4dC][font:24]aaaa1[font:28]aaaa2[color:0xff0000][font:25]aaaa3\naaaa4[color:0xffFF00]aaaaaa"
//颜色格式 ： [color:0x63b4dC] 0x+6位颜色代码 ； 不要留空格 ； 颜色改变 字体会默认24
//字体大小格式 :  [font:24]  ；不要留空格
//2个[]之间的内容是一个段落（已换行）。不改变颜色字大小的换行用 \n
var dealWithColorMsg = function(datastr,useblack){
    var dfont = "24";//默认字体大小
    var datas = [];
    var data = datastr.split("[color:");
    var len = data.length
    for(var i=0;i<len;i++) {
        var tmsg = data[i];
        if(tmsg.length > 0){
            var t_cindex = tmsg.indexOf("[");
            var cindex = tmsg.indexOf("]");
            var color = "";
            var smsg = "";
            if(cindex > -1&&(t_cindex > cindex||t_cindex == -1)){ //保证 ］ 是 颜色得 ］不是字体的
                color = tmsg.substring(0,cindex);
                smsg = tmsg.substring(cindex+1,tmsg.length);
            }else{
                color = "0xffffff"
                if(useblack==1){
                    color = "0x484848"
                }
                smsg = tmsg;
            }
            var fdata = smsg.split("[font:");
            var flen = fdata.length;
            for(var j = 0;j<flen;j++){
                var fmsg = fdata[j];
                if(fmsg.length > 0){
                    var t_mindex = fmsg.indexOf("[");
                    var mindex = fmsg.indexOf("]");
                    var font = "";
                    var mmsg = "";
                    if(mindex > -1&&(t_mindex > mindex||t_mindex == -1)){
                        font = fmsg.substring(0,mindex);
                        mmsg = fmsg.substring(mindex+1,fmsg.length);
                        //dfont = font;
                    }else{
                        font = dfont;//"24"
                        mmsg = fmsg;
                    }
                    var mdata = {}
                    mdata.color = color;
                    mdata.fontsize = font;
                    mdata.content = mmsg;
                    datas.push(mdata);
                }
            }
        }
    }
    return datas;
}
//消息颜色
//white | red |  blue |  yellow |  green |  black |  orange
var getMsgColor = function(type,useblack){
    var color = cc.color.WHITE
    if(useblack == 1){
        color = cc.color(255,255,255);
    }

    if(type.length == 6){
        var r = type.substring(0,2);
        var g = type.substring(2,4);
        var b = type.substring(4,6);

        var rs = parseInt(r,16);
        var gs = parseInt(g,16);
        var bs = parseInt(b,16);
        color = cc.color(rs,gs,bs);
    }else if(type.length == 8){
        var r = type.substring(2,4);
        var g = type.substring(4,6);
        var b = type.substring(6,8);

        var rs = parseInt(r,16);
        var gs = parseInt(g,16);
        var bs = parseInt(b,16);
        color = cc.color(rs,gs,bs);
    }
    return color;
}

var getRGBColor = function(HexColor){
    var color = cc.color.WHITE
    if(HexColor.length == 6){
        var r = HexColor.substring(0,2);
        var g = HexColor.substring(2,4);
        var b = HexColor.substring(4,6);

        var rs = parseInt(r,16);
        var gs = parseInt(g,16);
        var bs = parseInt(b,16);
        color = cc.color(rs,gs,bs);
    }else if(HexColor.length == 8){
        var r = HexColor.substring(2,4);
        var g = HexColor.substring(4,6);
        var b = HexColor.substring(6,8);

        var rs = parseInt(r,16);
        var gs = parseInt(g,16);
        var bs = parseInt(b,16);
        color = cc.color(rs,gs,bs);
    }
    return color;
}


var stringToHex = function(str)
{
    var val="";
    for(var i = 0; i < str.length; i++){
        if(val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += "" + str.charCodeAt(i).toString(16);
    }
    return val;
}

/**
 * 产生一副牌
 */
/**
 * 根据牌值  排序  （2  15点   小王  16  大王 17）
 * 花色 (0123桃杏梅方   45   小王（4*16+15） 大王 （5*16+15）)
 * type 1不要大小王
 */
var getTestCards = function(type){
    if(type == null){
        type = 0;
    }
    var cards = new Array()
    var i = 0;
    var p = 0;
    for(i=2; i < 15; i++){
        cards[p++]=i + 0x00; //黑
        cards[p++]=i + 0x10; //红
        cards[p++]=i + 0x20; //梅
        cards[p++]=i + 0x30;//方
    }
    var len = 52;
    if(type == 0){
        cards[p++]=  0x4F; //小王
        cards[p++]=  0x5F; //大王
        len = 54
    }
    for(i= len - 1; i > 0; i--){
        var t =  randomInt(10000) % i;
        var c =cards[t];
        cards[t]=cards[i];
        cards[i]=c;
    }
    return cards;
};
//对牌进行排序 大小王 2 AKQ..543 桃杏梅方
var sortByCard = function(a,b){
    var atmp = ((a&0x000000F0)>>4);//花色
    var atmp1 = a&0x0000000F;//数值 2-A
    var btmp = ((b&0x000000F0)>>4);//花色
    var btmp1 = b&0x0000000F;//数值 2-A

    if (atmp1 == 2){
        atmp1=15;
    }else if (atmp1 == 15){
        atmp1 = atmp == 4 ? 16 : 17;
    }
    if (btmp1 == 2){
        btmp1=15;
    }else if (btmp1 == 15){
        btmp1 = btmp == 4 ? 16 : 17;
    }
    if (btmp1 != atmp1){
        return btmp1-atmp1;
    }else{
        return atmp-btmp;
    }
};
//输入 金额 格式化（元转分）
var formatInputcash = function(num){
    if(sGameData.mCashUseDot) {
        return Number(num) * 100.0;
    }else{
        return Number(num)
    }
}
//对金币格式化 （分转元）
var formatcash = function(num){
    if(sGameData.mCashUseDot){
        return changeNumbertoFloat2(num/100.0);
    }else{
        return ""+num;
    }

}
//保留2位小数
var changeNumbertoFloat2 = function(num){
    if(num){
        return num.toFixed(2);
    }else{
        return "0.00";
    }
}

//按id排序 从小到大
var sortByID = function(a,b){
    return a.id - b.id;
};
//按id排序 从大到小
var sortByIDDesc = function(a,b){
    return  b.id - a.id ;
};

//设置label放缩
var setLabelScale = function(label,width){
    if(label.getContentSize().width > width){
        label.setScale(width/label.getContentSize().width);
    }else{
        label.setScale(1);
    }
}

//处理点击 触摸
var dealClickTouch = function(target){
    var self = target;
    if( 'touches' in cc.sys.capabilities )
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function (touches, event) {
                if (touches.length <= 0)
                    return;
                var target = event.getCurrentTarget();
                var pos = touches[0].getLocation();
                self.onTouchBegan_g(pos)
            },
            onTouchesMoved: function (touches, event) {
                if (touches.length <= 0)
                    return;
                var target = event.getCurrentTarget();
                var pos = touches[0].getLocation();
                self.onTouchMoved_g(pos)
                return true;
            },
            onTouchesEnded:function (touches, event) {
                if (touches.length <= 0)
                    return;
                var target = event.getCurrentTarget();
                var pos = touches[0].getLocation();
                self.onTouchEnded_g(pos)
            }
        }), target);
    else if ('mouse' in cc.sys.capabilities )
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                var target = event.getCurrentTarget();
                var pos = event.getLocation();
                self.onTouchBegan_g(pos)
            },
            onMouseMove: function (event) {
                var pos = event.getLocation();
                self.onTouchMoved_g(pos)
                return true;
            },
            onMouseUp: function (event) {
                var target = event.getCurrentTarget();
                var pos = event.getLocation();
                self.onTouchEnded_g(pos)
            }
        }, target);
}

//吞噬点击 不让传到别的层
var setClickSwallows = function(target){
    log("setClickSwallows---")
    var self = target;
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var pos = touch.getLocation();
            self.onTouchBegan_g(pos)
            return true;
        },
        onTouchMoved: function (touch, event) {
            var pos = touch.getLocation();
            self.onTouchMoved_g(pos)
        },
        onTouchEnded: function (touch, event) {
            var pos = touch.getLocation();
            self.onTouchEnded_g(pos)
        }
    });
    cc.eventManager.addListener(listener, target);

}

/**
 * 加载图片 resname 1.png
 * @param resname 资源名称 1.png
 * @param savename 保存名称 goods_1.png 除了头像，其他类型都加了目录
 * @param filepath 网络资源路径 http://xxx/xx/1.png
 * @param parent 图片sprite的父对象
 * @param tag 图片sprite的tag
 * @param width 图片sprite width
 * @param height 图片sprite height
 * @param func 图片加载完成调用的方法
 * @param needupdate 是否需要强制更新 0不需要 1需要 （为减少流量，目前就设置了本人更换头像时需要）
 * @param checksys 是否判断改图片是否有系统图片 （头像、奖品、签到）
 * @param sysname 系统图片名称 （奖品、签到的系统图片名称和resname不同） i_g_1.png i_s_1.png
 */
var loadImg_base = function(resname,savename,filepath,parent,tag,width,height,func,needupdate,checksys,sysname){

    if(needupdate == null){
        needupdate = 0;
    }
    if(checksys == null){
        checksys = 1;
    }
    if(sysname == null){
        sysname = resname;
    }
    if(resname.length > 0){
        var issyshead = false;
        if(checksys==1){
            issyshead = checkIsSysPic(sysname); //判断是不是系统头像
        }
        if(issyshead){
            var avatarimg = parent.getChildByTag(tag)
            if(avatarimg){
                avatarimg.setSpriteFrame(sysname);
                avatarimg.setScaleX(width/avatarimg.width);
                avatarimg.setScaleY(height/avatarimg.height);
            }
        }else {
            if (cc.sys.isNative) { //jsb加载
                if(islocalHasPicFile(savename)&&needupdate==0){ //判断本地有没有 和需不需要更新
                    log("is local has file")
                    var avatarimg = parent.getChildByTag(tag)
                    if(avatarimg){
                        var path = getLoadImgPath();
                        path = path + savename;
                        avatarimg.setTexture(path)
                        avatarimg.setScaleX(width/avatarimg.width);
                        avatarimg.setScaleY(height/avatarimg.height);
                    }
                }else{
                    createLoadRes(savename, parent, func, filepath,tag,width,height)
                }
            } else { //html5 加载
                loadByHtml5(resname,filepath,parent,tag,width,height);
            }
        }
    }
}
//通过jsb加载图片完成后操作
var loadImgOver = function(loadres){ //加载成功的才发
    log("loadImgOver--"+loadres.resname)
    var path = getLoadImgPath();
    path = path + loadres.resname;
    //log("path=="+path);
    var avatarimg = loadres.pnode.getChildByTag(loadres.tag)
    if(avatarimg){
        avatarimg.setTexture(path)
        avatarimg.setScaleX(loadres.width/avatarimg.width);
        avatarimg.setScaleY(loadres.height/avatarimg.height);
    }
}
//通过html加载图片
var loadByHtml5 = function(avatar,filepath,parent,tag,width,height){

    if(sGameData.mCanloadPicHtml5){
        var self = parent;
        var callback = function(){
            var tex = cc.textureCache.textureForKey(filepath)
            if(tex&&tex.width > 0){
                var avatarimg = self.getChildByTag(tag)
                if(avatarimg) {
                    avatarimg.setTexture(filepath);
                    avatarimg.setScaleX(width/avatarimg.width);
                    avatarimg.setScaleY(height/avatarimg.height);
                }
            }
        }
        cc.textureCache.addImage(filepath,callback,this);
    }
}

//获取某动画第1帧的图
var getAnimFristFrameSprite = function(animname){
    var spriteFrame = null;
    var animation = AnimationManager.getAnimation(animname)
    if(animation!= null) {
        var frames = animation.getFrames();
        var frame = frames[0]
        spriteFrame = frame.getSpriteFrame();
    }
    return spriteFrame;
}

//获取某动画第1帧的图
var getAnimIndexFrameSprite = function(animname,index){
    var spriteFrame = null;
    var animation = AnimationManager.getAnimation(animname)
    if(animation!= null) {
        var frames = animation.getFrames();
        var frame = frames[index]
        if(frame){
            spriteFrame = frame.getSpriteFrame();
        }
    }
    return spriteFrame;
}

//根据牌值 获取 在牌组中的位置
var getNameFromCardsPic = function(cardvalue,type){
    if(type == null){
        type = 0;
    }
    var name = "FF.png";
    //0:桃 1:杏 2:梅 3:方  4:小王(16)  5:大王(17)
    var tmp = ((cardvalue&0x000000F0)>>4);//花色
    var tmp1 = cardvalue&0x0000000F;//数值 2-A
    if(tmp1 == 10){
        tmp1 = "A";
    }else if(tmp1 == 11){
        tmp1 = "B";
    }else if(tmp1 == 12){
        tmp1 = "C";
    }else if(tmp1 == 13){
        tmp1 = "D";
    }else if(tmp1 == 14){
        tmp1 = "E";
    }else if(tmp1 == 15){
        tmp1 = "F";
    }
    if(tmp!=0||tmp1!=0){
        name = ""+tmp+""+tmp1+".png";
    }
    if(type == 0){
        name = "#"+name;
    }
    return name;
};
// 0 - max-1
var randomInt = function(max){
    var value = Math.floor(Math.random()*max);
    return value;
};
//字符串转2进制
var stringConvertToArray =function(strData) {
    if (!strData)
        return null;

    var arrData = new Uint16Array(strData.length);
    for (var i = 0; i < strData.length; i++) {
        arrData[i] = strData.charCodeAt(i);
    }
    return arrData;
};
//2进制转字符串
var arrayConvertToString = function(arraydata){
    var binary = new Uint16Array(arraydata);
    var binaryStr = "";
    var str = "";
    for (var i = 0; i < binary.length; i++) {
        if (binary[i] == 0)
        {
            str += "\'\\0\'";
        }
        else
        {
            var hexChar = "0x" + binary[i].toString("16").toUpperCase();
            str += String.fromCharCode(hexChar);
        }
    }
    binaryStr += str
    return binaryStr;
};
//图片 水平重复平铺，垂直重复平铺
var spriteTileRepeat = function(sprite){
    var texture = sprite.getTexture();
    texture.setAliasTexParameters();
    if(cc.sys.isNative){
        sprite.getTexture().setTexParameters(gl.LINEAR,gl.LINEAR,gl.REPEAT,gl.REPEAT);
    }else{
        var param = {} // 主要 用到的是这个，水平重复平铺，垂直重复平铺
        param.minFilter = gl.LINEAR
        param.magFilter = gl.LINEAR
        param.wrapS = gl.REPEAT
        param.wrapT = gl.REPEAT
        sprite.getTexture().setTexParameters(param);
    }
}



//日期格式转换
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

Array.prototype.unique2 = function () {
    return this.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(",");
}

Array.prototype.unique5 = function() {
    var res = [], hash = {};
    for(var i=0, elem; (elem = this[i]) != null; i++)  {
        if (!hash[elem])
        {
            res.push(elem);
            hash[elem] = true;
        }
    }
    return res;
}


var sprintf = function() {
    var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
    while (f) {
        if (m = /^[^\x25]+/.exec(f)) {
            o.push(m[0]);
        }
        else if (m = /^\x25{2}/.exec(f)) {
            o.push('%');
        }
        else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
            if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
                throw('Too few arguments.');
            }
            if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
                throw('Expecting number but found ' + typeof(a));
            }
            switch (m[7]) {
                case 'b': a = a.toString(2); break;
                case 'c': a = String.fromCharCode(a); break;
                case 'd': a = parseInt(a); break;
                case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
                case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
                case 'o': a = a.toString(8); break;
                case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
                case 'u': a = Math.abs(a); break;
                case 'x': a = a.toString(16); break;
                case 'X': a = a.toString(16).toUpperCase(); break;
            }
            a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
            c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
            x = m[5] - String(a).length - s.length;
            p = m[5] ? str_repeat(c, x) : '';
            o.push(s + (m[4] ? a + p : p + a));
        }
        else {
            throw('Huh ?!');
        }
        f = f.substring(m[0].length);
    }
    return o.join('');
}