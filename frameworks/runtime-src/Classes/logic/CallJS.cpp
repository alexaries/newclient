//
//  CallJS.cpp
//  qpgame
//
//  Created by apple on 14-5-6.
//
//

#include "CallJS.h"

#include "cocosbuilder/js_bindings_ccbreader.h"
#include "SimpleAudioEngine.h"
#include "jsb_cocos2dx_auto.hpp"
#include "jsb_cocos2dx_ui_auto.hpp"
#include "jsb_cocos2dx_studio_auto.hpp"
#include "jsb_cocos2dx_extension_auto.hpp"
#include "jsb_cocos2dx_builder_auto.hpp"
#include "ui/jsb_cocos2dx_ui_manual.h"
#include "extension/jsb_cocos2dx_extension_manual.h"
#include "cocostudio/jsb_cocos2dx_studio_manual.h"
#include "localstorage/js_bindings_system_registration.h"
#include "chipmunk/js_bindings_chipmunk_registration.h"
#include "jsb_opengl_registration.h"




CallJS::CallJS(){
    
}
CallJS::~CallJS(){
    
}
void CallJS::init(){
    log("CallJS-init");
    getConfigData("0");
}

//获取配置
void CallJS::getConfigData(string useappconfig){
    log("---getConfigData---");
    CallJSFuncName("sGameConfig","getConfigData",1,useappconfig.c_str());
}
//发送数据给脚本
void CallJS::setDataToScript(){
    log("---setDataToScript---");
    string usesdklogin = "0";
    if(sGlobal->mUseSDKAccountLogin){
        usesdklogin = "1";
    }
    string agent = sGlobal->mAgent;
    string version = sGlobal->mAppVersion;
    string serverIp = "";
    string webSocketPort = "0";
    if(sGlobal->mGameLogic->mCurrHall){
        serverIp = sGlobal->mGameLogic->mCurrHall->serverIp;
        char port[20];
        sprintf(port, "%d",sGlobal->mGameLogic->mCurrHall->webSocketPort);
        webSocketPort = port;
        //log("port ===%d",sGlobal->mGameLogic->mCurrHall->webSocketPort);
    }else{
        log("no curr hall");
    }
    string promoter = sGlobal->mPromoter;
    string useappconfig = sGlobal->mUseAppConfig;
    CallJSFuncName("CppCall","getInitdataFromCpp",7,usesdklogin.c_str(),agent.c_str(),version.c_str(),serverIp.c_str(),webSocketPort.c_str(),promoter.c_str(),useappconfig.c_str());
}
//充值完成
void CallJS::payok(string orderno,string vinfo){
    log("cpp------payok---");
    if(sGlobal->mIsRunScript){
        CallJSFuncName("CppCall","payok",2,orderno.c_str(),vinfo.c_str());
    }
}
//google 充值完成
void CallJS::googlepayok(string orderno,string payinfo,string purchasedata,string dataSignature){
    log("cpp------googlepayok---");
    if(sGlobal->mIsRunScript){
        CallJSFuncName("CppCall","googlepayok",4,orderno.c_str(),payinfo.c_str(),purchasedata.c_str(),dataSignature.c_str());
    }
}

//获取app 版本
void CallJS::getAppBaseVersion(){
    log("cpp------getAppBaseVersion---");
    //if(sGlobal->mIsRunScript){
        string ver = sGlobal->mGameLogic->getAppBaseVersion();
        string respath = GameUtil::getResPath();
        CallJSFuncName("CppCall","getAppBaseVersion",2,ver.c_str(),respath.c_str());
    //}
}

//设置外部打开数据
void CallJS::setOpenUrlData(){
    log("cpp------setOpenUrlData---");
    if(sGlobal->mIsRunScript){
        CallJSFuncName("CppCall","setOpenUrlData",1,sGlobal->mOpenUrlData.c_str());
    }
}

//分享完成 (type 1好友 2朋友圈)
void CallJS::doShareEnd(int type,int state){
    log("cpp---doShareEnd---%d",state);
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",state);
        char typestr[5];
        sprintf(typestr, "%d",type);
        CallJSFuncName("CppCall","doShareEnd",2,typestr,statestr);
    }
}

//获取电量 信号
void CallJS::getPhoneInfoForBatterySignalEnd(int battery,int signal){
    log("cpp---getPhoneInfoForBatterySignalEnd---");
    if(sGlobal->mIsRunScript){
        char batterystr[5];
        sprintf(batterystr, "%d",battery);
        char signalstr[5];
        sprintf(signalstr, "%d",signal);
        CallJSFuncName("CppCall","getPhoneInfoForBatterySignalEnd",2,batterystr,signalstr);
    }
}

//获取uuid
void CallJS::getUUIDEnd(string uuid){
    log("cpp---getUUIDEnd---%s",uuid.c_str());
    CallJSFuncName("CppCall","getUUIDEnd",1,uuid.c_str());
}


void CallJS::sdkLoginEnd(int state,int sdktype,string uid,string session){
    log("cpp------sdkLoginEnd---");
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",state);
        char typestr[5];
        sprintf(typestr, "%d",sdktype);
        CallJSFuncName("CppCall","sdkLoginEnd",4,statestr,typestr,uid.c_str(),session.c_str());
    }
}
//游戏资源
void CallJS::doDownGameResEnd(int gameId,string resName,int state){
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",state);
        char gameIdstr[10];
        sprintf(gameIdstr, "%d",gameId);
        CallJSFuncName("CppCall","doDownGameResEnd",3,gameIdstr,resName.c_str(),statestr);
    }
}
//设置资源下载进度
void CallJS::setGameResDownSize(int gameId,string resname,int size){
    if(sGlobal->mIsRunScript){
        char sizestr[20];
        sprintf(sizestr, "%d",size);
        char gameIdstr[20];
        sprintf(gameIdstr, "%d",gameId);
        CallJSFuncName("CppCall","setGameResDownSize",3,gameIdstr,resname.c_str(),sizestr);
    }
}
//
void CallJS::doDownTestResEnd(int state){
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",state);
        CallJSFuncName("CppCall","doDownTestResEnd",1,statestr);
    }
}

//下载图片完成
void CallJS::loadPicEnd(string resobserverId,string resname,int state){
    log("cpp---loadPicEnd---%s=%d",resname.c_str(),state);
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",state);
        CallJSFuncName("CppCall","loadPicEnd",3,resobserverId.c_str(),resname.c_str(),statestr);
    }
}
//选择完成
void CallJS::choosePicEnd(int state,string data){
    log("cpp---choosePicEnd---%d",state);
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",state);
        CallJSFuncName("CppCall","choosePicEnd",2,statestr,data.c_str());
    }
}

//js 掉cpp http访问
void CallJS::httpResultForjs(string code,string result){
    log("cpp---httpResultForjs---%s",code.c_str());
    if(sGlobal->mIsRunScript){
        log("cpp---httpResultForjs result ---%s",result.c_str());
        CallJSFuncName("CppCall","httpResultForjs",2,code.c_str(),result.c_str());
    }
}

//上传头像完成
void CallJS::upAvatarEnd(int state){
    log("cpp---upAvatarEnd---%d",state);
    if(sGlobal->mIsRunScript){
        if(state==1){
            char statestr[2];
            sprintf(statestr, "%d",state);
            CallJSFuncName("CppCall","upAvatarEnd",1,statestr);
        }
    }
}
//进入前后台//type 1 前台 2后台
void CallJS::enterForeBackground(int type){
    log("cpp---enterForeBackground---%d",type);
    if(sGlobal->mIsRunScript){
        char statestr[2];
        sprintf(statestr, "%d",type);
        CallJSFuncName("CppCall","enterForeBackground",1,statestr);
    }
}

//ios 有可能会删除更新的资源文件
void CallJS::cleanLocalGameResVersion(){
    log("cpp---cleanLocalGameResVersion--");
    if(sGlobal->mIsRunScript){
        CallJSFuncName("CppCall","cleanLocalGameResVersion",0);
    }
}



jsval CallJS::CallJSFuncName(string jsname,string jsmethod,int count,...){
    ScriptingCore* sc = ScriptingCore::getInstance();
    JSContext* cx = sc->getGlobalContext();
    JS::RootedValue nsval(cx);
    jsval res;// 返回

    if (JS_GetProperty(cx, sc->getGlobalObject(), jsname.c_str(), &nsval)) {
        int argc = count;
        jsval *argv = new jsval[argc];
        
        va_list insvalist;
        va_start(insvalist,count);
        for (int i = 0; i < count; ++i)
        {
            argv[i] = std_string_to_jsval(sc->getGlobalContext(),std::string(va_arg(insvalist,const char *)));
        }
        va_end(insvalist) ;
        
        sc->executeFunctionWithOwner(nsval,jsmethod.c_str(),argc,argv,&res);
        delete [] argv;  
        
    }
    return res;
}



//void JSCallBack::setJSOut(){
//    log("CallJS-setJSOut");
//    //    ScriptingCore* sc = ScriptingCore::getInstance();
//    //    JS_DefineFunction(sc->getGlobalContext(), sc->getGlobalObject(), "test_JSOut",JSCallBack::test_JSOut, 0, JSPROP_READONLY | JSPROP_PERMANENT);
//    log("CallJS-setJSOut1");
//}
//bool JSCallBack::test_JSOut(JSContext *cx, uint32_t argc, jsval *vp)
//{
  //  log("aaa--");
    //    if (argc > 0) {
    //        JSString *string = NULL;
    //        JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S", &string);
    //        if (string) {
    //            JSStringWrapper wrapper(string);
    //            //这块就有值了
    //        }
    //    }//
//    return true;
//}
