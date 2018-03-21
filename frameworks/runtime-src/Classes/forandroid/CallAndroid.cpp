//
//  CallAndroid.cpp
//  gamesanguo
//
//  Created by apple on 13-6-8.
//
//

#include "CallAndroid.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#include <android/log.h>
#endif


void CallAndroid::gotoAliPay(std::string orderInfo){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
        char* order = (char*)orderInfo.c_str();
        CheckJavaMethodReturn* aReturn = checkJavaMethod("goToPayForJNI","(Ljava/lang/String;)V");
        if (aReturn->isHave) {
            log("has Method");
            jstring msgstr = aReturn->minfo.env->NewStringUTF(order);
            aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr);
        }
        log("jni-java函数执行完毕");
    #endif
}

void CallAndroid::gotoWXPay(std::string orderInfo){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
        char* order = (char*)orderInfo.c_str();
        CheckJavaMethodReturn* aReturn = checkJavaMethod("goToPayWXForJNI","(Ljava/lang/String;)V");
        if (aReturn->isHave) {
            log("has Method");
            jstring msgstr = aReturn->minfo.env->NewStringUTF(order);
            aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr);
        }
        log("jni-java函数执行完毕");
    #endif
}

//显示wenview
void CallAndroid::showWebView(std::string urlstr,int type){
    log("android--showWebView----");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* url = (char*)urlstr.c_str();
    CheckJavaMethodReturn* aReturn = checkJavaMethod("showWebViewForJNI","(Ljava/lang/String;I)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring msgstr = aReturn->minfo.env->NewStringUTF(url);
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr,type);
    }
    log("jni-java函数执行完毕");
#endif
}
//关闭webview
void CallAndroid::closeWebView(){
    log("android--closeWebView----");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("closeWebViewForJNI","()V");
    if (aReturn->isHave) {
        log("has Method");
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID);
    }
    log("jni-java函数执行完毕");
#endif
}

//显示公告
void CallAndroid::showNotice(std::string msgstr){
    log("android--showZoneNotice----");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* msg = (char*)msgstr.c_str();
    CheckJavaMethodReturn* aReturn = checkJavaMethod("showNoticeForJNI","(Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring msgstr = aReturn->minfo.env->NewStringUTF(msg);
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr);
    }
    log("jni-java函数执行完毕");
#endif
    
}
//跳转网页
void CallAndroid::gotoUrl(std::string urlstr){
    log("gotoUrl---%s",urlstr.c_str());
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* url = (char*)urlstr.c_str();
    CheckJavaMethodReturn* aReturn = checkJavaMethod("gotoUrlForJNI","(Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring msgstr = aReturn->minfo.env->NewStringUTF(url);
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr);
    }
    log("jni-java函数执行完毕");
#endif
}

//给android 设置基本数据
void CallAndroid::setBaseDataToAndroid(string serverurl,string partner,string seller,string data4,string data5){
    log("setBaseDataToAndroid---%s",serverurl.c_str());
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* url = (char*)serverurl.c_str();
    char* cpartner = (char*)partner.c_str();
    char* cseller = (char*)seller.c_str();
    char* cdata4 = (char*)data4.c_str();
    char* cdata5 = (char*)data5.c_str();
    CheckJavaMethodReturn* aReturn = checkJavaMethod("setBaseDataToAndroidForJNI","(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring msgstr = aReturn->minfo.env->NewStringUTF(url);
        jstring data2str = aReturn->minfo.env->NewStringUTF(cpartner);
        jstring data3str = aReturn->minfo.env->NewStringUTF(cseller);
        jstring data4str = aReturn->minfo.env->NewStringUTF(cdata4);
        jstring data5str = aReturn->minfo.env->NewStringUTF(cdata5);
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr,data2str,data3str,data4str,data5str);
    }
    log("jni-java函数执行完毕");
#endif
}

//获取 渠道
string CallAndroid::getAgent(){
    std::string outstr = "";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getAgentForJNI","()Ljava/lang/String;");
    jstring jmsg;
    if (aReturn->isHave) {
        log("has Method");
        jmsg = (jstring)(aReturn->minfo.env->CallObjectMethod(aReturn->jobj, aReturn->minfo.methodID));
    }
    //调用此函数
    if(jmsg!=NULL){
        outstr =  JniHelper::jstring2string((jstring)(jmsg));
    }
    log("outstr=%s",outstr.c_str());
    log("jni-java函数执行完毕");
#endif
    return outstr;
}

//获取aPromoter
string CallAndroid::getPromoter(){
    std::string outstr = "";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getPromoterForJNI","()Ljava/lang/String;");
    jstring jmsg;
    if (aReturn->isHave) {
        log("has Method");
        jmsg = (jstring)(aReturn->minfo.env->CallObjectMethod(aReturn->jobj, aReturn->minfo.methodID));
    }
    //调用此函数
    if(jmsg!=NULL){
        outstr =  JniHelper::jstring2string((jstring)(jmsg));
    }
    log("outstr=%s",outstr.c_str());
    log("jni-java函数执行完毕");
#endif
    return outstr;
}



//设置本地推送信息
void CallAndroid::sendLocalPushMsg(int type,string info,int repeat,int delayday,int delaytime){
    log("android-sendLocalPushMsg---%d",delayday);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* url = (char*)info.c_str();
    CheckJavaMethodReturn* aReturn = checkJavaMethod("sendLocalPushMsgForJNI","(ILjava/lang/String;III)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring msgstr = aReturn->minfo.env->NewStringUTF(url);
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,type,msgstr,repeat,delayday,delaytime);
    }
    log("jni-java函数执行完毕");
#endif
}


string CallAndroid::getDevicePlatfrom(){
    std::string outstr = "";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getDevicePlatfromForJNI","()Ljava/lang/String;");
    jstring jmsg;
    if (aReturn->isHave) {
        log("has Method");
        jmsg = (jstring)(aReturn->minfo.env->CallObjectMethod(aReturn->jobj, aReturn->minfo.methodID));
    }
    //调用此函数
    outstr =  JniHelper::jstring2string((jstring)(jmsg));
    log("outstr=%s",outstr.c_str());
    log("jni-java函数执行完毕");
#endif
    return outstr;
}

//获取电池电量信息(0-100)
int CallAndroid::getBatteryInfo(){
    int level = 50;
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getBatteryInfoForJNI","()I");
    jint _int = 0 ;
    if (aReturn->isHave) {
        log("has Method");
        _int = aReturn->minfo.env->CallIntMethod(aReturn->jobj, aReturn->minfo.methodID);
        level = (int)_int;
    }
    log("jni-java函数执行完毕");
#endif
    return level;
}

//获取信号信息(0-100)
int CallAndroid::getSignalInfo(){
    int level = 50;
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getSignalInfoForJNI","()I");
    jint _int = 0 ;
    if (aReturn->isHave) {
        log("has Method");
        _int = aReturn->minfo.env->CallIntMethod(aReturn->jobj, aReturn->minfo.methodID);
        level = (int)_int;
    }
    log("jni-java函数执行完毕");
#endif
    return level;
}

//点back键提示退出
void CallAndroid::clickBackForQuitTip(){
    log("clickBackForQuitTip---");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("showQuitTipForJNI","()V");
    if (aReturn->isHave) {
        log("has Method");
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID);
    }
    log("jni-java函数执行完毕");
#endif
}


//调用登录
void CallAndroid::gotoSDKLogin(){
    log("gotoSDKLogin---");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("loginForJNI","()V");
    if (aReturn->isHave) {
        log("has Method");
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID);
    }
    log("jni-java函数执行完毕");
#endif
}
//调用充值
void CallAndroid::gotoPaynew(int channel,string payAgent,string orderNo,string paydata){
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否paynewForJNIpaynewForJNI平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("paynewForJNI","(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring payAgentstr = aReturn->minfo.env->NewStringUTF(payAgent.c_str());
        jstring orderNostr = aReturn->minfo.env->NewStringUTF(orderNo.c_str());
        jstring datastr = aReturn->minfo.env->NewStringUTF(paydata.c_str());
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,channel,payAgentstr,orderNostr,datastr);
    }
    log("jni-java函数执行完毕");
#endif
}

//按类型调用充值
void CallAndroid::gotoPayByType(string type,string orderNo,string einfo,int money,string data){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    int costcash = money;
    CheckJavaMethodReturn* aReturn = checkJavaMethod("payByTypeForJNI","(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V");
    if (aReturn->isHave) {
            log("has Method");
            jstring typestr = aReturn->minfo.env->NewStringUTF(type.c_str());
            jstring ordernostr = aReturn->minfo.env->NewStringUTF(orderNo.c_str());
            jstring notestr = aReturn->minfo.env->NewStringUTF(einfo.c_str());
            aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,typestr,ordernostr,notestr,costcash);
        }
        log("jni-java函数执行完毕");
    #endif
}
//调用充值  官方平台 充值 使用 googleplay
void CallAndroid::gotoPay(string orderNo,string einfo,int money){
    
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    int costcash = money;
    string einfo1 = "";
    string pid = "";
    vector<string> infostrs = GameUtil::split(einfo,"|");
    if(infostrs.size()==2){
        einfo1 = infostrs.at(0);
        pid = infostrs.at(1);
    }
    
    string key = "172f5df2ac50ee0e41e33fa81c5c457e561bdfc6d1a6410f48ea9f13af73817b";
    string extra_str = md5(orderNo+einfo1+key);
    
    char note[200];
    sprintf(note,"%s|%s|%s", einfo1.c_str(),pid.c_str(),extra_str.c_str());
    CheckJavaMethodReturn* aReturn = checkJavaMethod("payForJNI","(Ljava/lang/String;Ljava/lang/String;I)V");
    
    if (aReturn->isHave) {
            log("has Method");
            jstring ordernostr = aReturn->minfo.env->NewStringUTF(orderNo.c_str());
            jstring notestr = aReturn->minfo.env->NewStringUTF(note);
            aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,ordernostr,notestr,costcash);
        }
        log("jni-java函数执行完毕");
    #endif
}
//打开sdk的某界面
//1 当乐用户中心 2
void CallAndroid::gotoShowDSKView(int type){
    log("gotoShowDSKView---");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("showSdkViewForJNI","(I)V");
    if (aReturn->isHave) {
        log("has Method");
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,type);
    }
    log("jni-java函数执行完毕");
#endif
}

//更新apk
void CallAndroid::startUpdateApk(string durl){
    log("startUpdateApk---");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("startUpdateAppForJNI","(Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring url = aReturn->minfo.env->NewStringUTF(durl.c_str());
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,url);
    }
    log("jni-java函数执行完毕");
#endif
}



//设置头像
void CallAndroid::setAvatarImg(int stype,int type){
    log("setAvatarImg---%d",type);
    char userIdstr[20];
    sprintf(userIdstr, "%lld",sGlobal->mMyUid);
    string upurl = sGlobal->mUrl_upavatar;
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("setAvatarForJNI","(Ljava/lang/String;Ljava/lang/String;II)V");
    if (aReturn->isHave) {
            log("has Method");
            jstring userId = aReturn->minfo.env->NewStringUTF(userIdstr);
            jstring url = aReturn->minfo.env->NewStringUTF(upurl.c_str());
            aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,userId,url,stype,type);
        }
        log("jni-java函数执行完毕");
    #endif
}

//获取网络状态
NetState CallAndroid::getNetState(){
    int state = 0;
    log("getNetState---");
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getNetStateForJNI","()I");
    jint _int = 0 ;
    if (aReturn->isHave) {
        log("has Method");
        _int = aReturn->minfo.env->CallIntMethod(aReturn->jobj, aReturn->minfo.methodID);
        //log("_int==%d",_int);
        state = (int)_int;
    }
    log("jni-java函数执行完毕");
#endif
    return (NetState)state;
}
//显示积分墙
void CallAndroid::showScoreWall(int64_t uid,string type){
    log("showScoreWall---%s",type.c_str());
    char userIdstr[20];
    sprintf(userIdstr, "%lld",uid);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("showScoreWallForJNI","(Ljava/lang/String;Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring userId = aReturn->minfo.env->NewStringUTF(userIdstr);
        jstring typestr = aReturn->minfo.env->NewStringUTF(type.c_str());
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,userId,typestr);
    }
    log("jni-java函数执行完毕");
#endif
}
//显示积分墙积分管理
void CallAndroid::showScoreManagerForScoreWall(int64_t uid,string type){
    log("showScoreManagerForScoreWall---%s",type.c_str());
    char userIdstr[20];
    sprintf(userIdstr, "%lld",uid);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("showScoreManagerForScoreWallForJNI","(Ljava/lang/String;Ljava/lang/String;)V");
    if (aReturn->isHave) {
        log("has Method");
        jstring userId = aReturn->minfo.env->NewStringUTF(userIdstr);
        jstring typestr = aReturn->minfo.env->NewStringUTF(type.c_str());
        aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,userId,typestr);
    }
    log("jni-java函数执行完毕");
#endif
}
//删除文件夹
bool CallAndroid::removeDirAndFiles(string pDirectoryName)
{
    log("removeDirAndFiles---%s",pDirectoryName.c_str());
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* path = (char*)pDirectoryName.c_str();
    CheckJavaMethodReturn* aReturn = checkJavaMethod("delDirAndFilesForJNI","(Ljava/lang/String;)V");
    if (aReturn->isHave) {
            log("has Method");
            jstring msgstr = aReturn->minfo.env->NewStringUTF(path);
            aReturn->minfo.env->CallVoidMethod(aReturn->jobj, aReturn->minfo.methodID,msgstr);
        }
        log("jni-java函数执行完毕");
    #endif
    return true;
}
//获取app版本
string CallAndroid::getAppBaseVersion(){
    std::string outstr = "";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getAppBaseVersionForJNI","()Ljava/lang/String;");
    jstring jmsg;
    if (aReturn->isHave) {
        log("has Method");
        jmsg = (jstring)(aReturn->minfo.env->CallObjectMethod(aReturn->jobj, aReturn->minfo.methodID));
    }
    //调用此函数
    outstr =  JniHelper::jstring2string((jstring)(jmsg));
    log("outstr=%s",outstr.c_str());
    log("jni-java函数执行完毕");
#endif
    return outstr;
}
string CallAndroid::getMyUUID(){
    std::string outstr = "";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    CheckJavaMethodReturn* aReturn = checkJavaMethod("getMyUUIDForJNI","()Ljava/lang/String;");
    jstring jmsg;
    if (aReturn->isHave) {
        log("has Method");
        jmsg = (jstring)(aReturn->minfo.env->CallObjectMethod(aReturn->jobj, aReturn->minfo.methodID));
    }
    //调用此函数
    outstr =  JniHelper::jstring2string((jstring)(jmsg));
    log("outstr=%s",outstr.c_str());
    log("jni-java函数执行完毕");
#endif
    return outstr;
}


//检测java 方法 是否存在
CheckJavaMethodReturn* CallAndroid::checkJavaMethod(string methodName,string methodSignature){
    CheckJavaMethodReturn* aReturn = NULL;
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) //判断当前是否为Android平台
    char* classpath = (char*)sGlobal->mAndroidClassPath.c_str();
    aReturn = new CheckJavaMethodReturn();
    log("jni-java函数(%s)开始执行",methodName.c_str());
    JniMethodInfo minfo;//定义Jni函数信息结构体
    //getStaticMethodInfo 次函数返回一个bool值表示是否找到此函数
    bool isHave = JniHelper::getStaticMethodInfo(minfo,
                                                 classpath,  //类的路径
                                                 "getInstance",   //方法名
                                                 "()Ljava/lang/Object;");   //括号里的是参数，后面的是返回值。
    jobject jobj;
    if (isHave) {
        jobj = minfo.env->CallStaticObjectMethod(minfo.classID, minfo.methodID);
    }
    log("正确获取到 jobj");
    //
    isHave = JniHelper::getMethodInfo(minfo,
                                      classpath,  //类的路径
                                      methodName.c_str(),   //方法名
                                      methodSignature.c_str());   //括号里的是参数，后面的是返回值。
    aReturn->minfo = minfo;
    aReturn->jobj = jobj;
    aReturn->isHave = isHave;
    if(!isHave){
        log("jni error:not found %s",methodName.c_str());
    }
#endif
    return aReturn;
}