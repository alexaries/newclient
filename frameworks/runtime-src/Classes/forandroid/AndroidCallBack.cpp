#include "AndroidCallBack.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#include <android/log.h>
#endif


//
//#define CLASS_NAME "cn/com/wisecoll/texaspoker"
//


extern "C"
{
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)

    //*************  **********************
    //java从c++获取 appkey cn_coolqp_game
    jstring Java_cn_coolqp_game_QpgameActivity_getAppSecret(JNIEnv *env, jobject thiz,jstring agent,int code)
	{
        string theagent = sGlobal->mAgent;
        if(agent != NULL){
            const char * agent_a = env->GetStringUTFChars(agent, NULL);
            theagent = agent_a;
            if(code == 1){ //code 1 设置新代理
                sGlobal->mAgent = theagent;
            }
        }
    	jstring msgstr = env->NewStringUTF("xxx");
        if(theagent == AGENT_APPLE){ // (google)
            msgstr = env->NewStringUTF("MI");
            
        }else if(theagent == "appid_wx"){
            msgstr = env->NewStringUTF("wx0000000eb");
        }

		return msgstr;
	}
    //登录 结果 通知 （java->c++）
	void Java_cn_coolqp_game_QpgameActivity_callbackLoginFor2dx(JNIEnv *env, jobject thiz,int code,jstring uid,jstring session)
	{
        if(code == 1){
            log("android login ok");
            const char *uid_a = env->GetStringUTFChars(uid, NULL);
            const char *session_a = env->GetStringUTFChars(session, NULL);
            log("android  call back------     login userId = %s",uid_a);
            sGlobal->mCallJS->sdkLoginEnd(1,0,uid_a,session_a);

        }else if(code == 3){
            log("android cancel login");
            sGlobal->mCallJS->sdkLoginEnd(3,0,"","");
        }else{
            log("android login fail");
            sGlobal->mCallJS->sdkLoginEnd(2,0,"","");
        }
        
	}
    //支付 结果 通知 （java->c++）
    void Java_cn_coolqp_game_QpgameActivity_callbackPayFor2dx(JNIEnv *env, jobject thiz, int code,jstring orderNo,jstring einfo)
    {
        log("android pay call back------ code=%d",code);
        const char *orderNo_a = "";
        if(orderNo != NULL){
            orderNo_a = env->GetStringUTFChars(orderNo, NULL);
            log(" orderNo_a = %s  ",orderNo_a);
            string orderno =orderNo_a;
            string msg = "";
            if(code == 1){ //成功
                sGlobal->mCallJS->payok(orderno,msg);
                
                int zoneid = sGlobal->mCurrZoneId_pay;
                int64_t uid = sGlobal->mUserId_pay;
                sGlobal->mSqliteManager->insertPaylog(zoneid,uid,"",orderno,msg, PAYSTATE_VERIFY);
            }else{
                sGlobal->mGameLogic->showSysNotice(sResWord->w_pay_unfinish);
            }
        }


    }
    
    //执行某操作 通知 （java->c++）
    //
    void Java_cn_coolqp_game_QpgameActivity_callbackDoSomethingFor2dx(JNIEnv *env, jobject thiz, int code,jstring param1)
    {
        const char *param1_a = "";
        if(param1 != NULL){
            param1_a = env->GetStringUTFChars(param1, NULL);
            log(" param1_a = %s  ",param1_a);
        }

        log("android callbackDoSomethingFor2dx==%d",code);
        if(code ==1){
            sGlobal->mOpenUrlData = param1_a;
            log("mOpenUrlData==%s",sGlobal->mOpenUrlData.c_str());
            if(sGlobal->mIsRunScript){
                sGlobal->mCallJS->setOpenUrlData();
            }
        }

    }
    
    //google充值回调
    void Java_cn_coolqp_game_QpgameActivity_callbackGooglePayFor2dx(JNIEnv *env, jobject thiz, jstring orderno,jstring payinfo,jstring purchasedata,jstring dataSignature)
    {
        log("android google pay call back------ ");
        const char *orderNo_a = "";
        const char *payinfo_a = "";
        const char *purchasedata_a = "";
        const char *dataSignature_a = "";
        if(orderno != NULL){
            orderNo_a = env->GetStringUTFChars(orderno, NULL);
            log(" orderNo_a = %s  ",orderNo_a);
            payinfo_a = env->GetStringUTFChars(payinfo, NULL);
            purchasedata_a = env->GetStringUTFChars(purchasedata, NULL);
            dataSignature_a = env->GetStringUTFChars(dataSignature, NULL);
            
            sGlobal->mCallJS->googlepayok(orderNo_a,payinfo_a,purchasedata_a,dataSignature_a);
        }
        
        
    }
    //上传头像回调
    void Java_cn_coolqp_game_AvatarManager_callbackUpAvatarFor2dx(JNIEnv *env, jobject thiz, int code,jstring param1)
    {
        const char *param1_a = "";
        if(param1 != NULL){
            param1_a = env->GetStringUTFChars(param1, NULL);
            int valuesize = strlen(param1_a);
            log(" param1_a  len %d ",valuesize);
        }
        log("callbackUpAvatarFor2dx==%d",code);
        if(code==100){ //100 上传头像结果
            int state = atoi(param1_a);
            if(state==1){
                log(" up avatar suc-----");
                sGlobal->mCallJS->upAvatarEnd(1);
            }else{
                log(" up avatar fail------");
                sGlobal->mCallJS->upAvatarEnd(2);
            }
        }else if(code==200){ // 200(上传选图ok)
            string picdata = param1_a;
            log(" choose pic suc-----");
            sGlobal->mGameLogic->choosePicEnd(1,picdata);
           
        }else if(code==201){ //  201(上传选图失败)
            sGlobal->mGameLogic->choosePicEnd(2,"");
        }
    }
    
    
    //关闭webview
    void Java_cn_coolqp_game_WebViewHengActivity_callbackCloseWebViewPortrait(JNIEnv *env, jobject thiz, int code)
    {
        if(sGlobal->mIsShowPTWebView){
            sGlobal->mIsShowPTWebView = false;
        }
    }

    //************* 当乐  end**********************
    
    

#endif

}
