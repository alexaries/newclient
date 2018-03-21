/**
 * Created by Administrator on 14-4-16.
 * 配置数据
 * 更新此文件时 第2次启动时才是新内容
 * 本文件内容原则上不修改（本文件，也不发布到更新里）
 */
var sGameConfig = {
    isLocalTest:false, //是否本地测试（这个会改变）
 
    serverIp:"",// 游戏服务器 //此处用ip，用域名要断开重连
    serverWebSocketPort:0, // 游戏服务器端口 8089
    serverVersionWebhttp:"",//版本监测服务器--- cpp取这个
    serverVersionWebhttpIp:"",//版本监测服务器（备用）--- cpp取这个
    serverResWebhttp:"", //资源下载服务器

    _isLocalVersion:null,//是否是本地测试版本（启动时固定ƒ，不再变）

    useconfig:"app", //用户配置模式 (app、dlsh )（指定服务器连接地址）---正式的用app

    versionfor:"app", //版本对象 app  （游戏功能差异按此数据） －－未使用
    serverProject:"",//服务器工程路径 默认为空
    clientVersion:"1.0",//客户端版本号   appstore = v1.0.1
    resVersion:"99",//资源版本号 web:12  local:12
    shUpdateVersion:"16",//每次审核之后更新的版本号  13->14   ,15->16
    versionInfo:"",  //发给cpp的版本信息 格式 1.1｜1
    configVersion:"170403233"//内部版本号(日期)
}

log("sGameConfig test");

//获取配置数据 （cpp调用）
sGameConfig.getConfigData = function(useappconfig){
    log("getConfigData----CppCall");
    if(useappconfig == "1"){
        log("setuseconfig--app");
        //sGameConfig.useconfig = "app";
    }
    sGameConfig.setConfigData(1);
    if(cc.sys.isNative) {
        var gameJSB = cc.GameJSB.sharedGJSB();
        gameJSB.doSomeString(1, sGameConfig.serverVersionWebhttp, sGameConfig.versionInfo,sGameConfig.serverResWebhttp,sGameConfig.versionfor, sGameConfig.serverVersionWebhttpIp);
    }
    return "ok"
};

//设置配置数据
sGameConfig.setConfigData = function(type){
    if(sGameConfig._isLocalVersion == null){
        sGameConfig._isLocalVersion = sGameConfig.isLocalTest
    }

    var _serverIp = "";
    var _serverWebSocketPort = 0;
    var _serverVersionWebhttp = "";
    var _serverVersionWebhttpIp = "";
    var _serverResWebhttp = "";

    if(sGameConfig.isLocalTest){
        _serverIp = "192.168.0.66"; //localserver.com  192.168.0.66
        _serverWebSocketPort = 8089;
        _serverVersionWebhttp = "http://192.168.0.66:8080/";
        _serverVersionWebhttpIp = "http://192.168.0.66:8081/";
        _serverResWebhttp = "http://192.168.0.66:8080/";
    }else if(sGameConfig.useconfig == "dlsh"){
        _serverIp = "cs.shancr.com";
        _serverWebSocketPort = 8880;
        _serverVersionWebhttp = "http://cs.shancr.com/";
        _serverVersionWebhttpIp = "http://cs.shancr.com/";
        _serverResWebhttp = "http://cs.shancr.com/";
    }else if(sGameConfig.useconfig == "appip"){
        _serverIp = "120.76.218.81";
        _serverWebSocketPort = 8880;
        _serverVersionWebhttp = "http://120.76.234.175/";
        _serverVersionWebhttpIp = "http://120.76.234.175/";
        _serverResWebhttp = "http://120.76.234.175/";
    }else {//app
        //_serverIp = "http://typortal.jxzpbz.com:80";
        //_serverWebSocketPort = 8090;
        //
        //_serverVersionWebhttp = "http://typortal.jxzpbz.com:80/";
        //_serverVersionWebhttpIp = "http://typortal.jxzpbz.com:80/";
        //_serverResWebhttp = "http://typortal.jxzpbz.com:80/";
        
        _serverIp = "cs.shancr.com";
        _serverWebSocketPort = 8880;
        _serverVersionWebhttp = "http://cs.shancr.com/";
        _serverVersionWebhttpIp = "http://cs.shancr.com/";
        _serverResWebhttp = "http://cs.shancr.com/";


        /*
        _serverIp = "typortal.jxzpbz.com";
        _serverWebSocketPort = 80;
        _serverVersionWebhttp = "http://typortal.jxzpbz.com/";
        _serverVersionWebhttpIp = "http://typortal.jxzpbz.com/";
        _serverResWebhttp = "http://typortal.jxzpbz.com/";
         */
        /*
        _serverIp = "http://qpportal.1000gk.com/";
        _serverWebSocketPort = 8880;
        _serverVersionWebhttp = "http://qpportal.1000gk.com/";
        _serverVersionWebhttpIp = "http://qpportal.1000gk.com/";
        _serverResWebhttp = "http://qpportal.1000gk.com/";
        */

    }
    sGameConfig.serverIp = _serverIp
    sGameConfig.serverWebSocketPort = _serverWebSocketPort
    sGameConfig.serverVersionWebhttp = _serverVersionWebhttp
    sGameConfig.serverVersionWebhttpIp = _serverVersionWebhttpIp;
    sGameConfig.serverResWebhttp = _serverResWebhttp

    log("sGameConfig.serverVersionWebhttp=="+sGameConfig.serverVersionWebhttp);
    sGameConfig.versionInfo = sGameConfig.clientVersion+"|"+sGameConfig.resVersion;

}


////获取用户等级
//var getGameSysConfig = function(name){
//    var list = g_sys_gameconfig;
//    var len = list.length;
//    for(var i=0;i<len;i++){
//        var ulv = list[i];
//        if(ulv.keyName == name){
//            return ulv.value;
//        }
//    }
//    return "";
//}
