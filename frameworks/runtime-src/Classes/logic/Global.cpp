#include "Global.h"

DECLARE_SINGLETON_MEMBER(Global);

#define GAME_MODE_RELEASE   0
#define GAME_MODE_TEST_ZC   1  //连网络获取分区
#define GAME_MODE_TEST_LOCAL  2//连本地获取分区

Global::Global(void)
{
    log("Global---");
    
    mTest_NoNet = false;//无网络时设置为true  //这个不改 改平台里的值
    mTest_NoUseUploadScript = false;
    mTest_LoadZip=false;
    mTest_NoCheckVersion = false;
    mTest_SetLocalNoCheckVersion = false;
    
    if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS){
        log("PLATFORM---IOS＝");
        mTest_SetLocalNoCheckVersion = true;//本地不检测版本号
        //if(SIMULATOR == 1){//是模拟器
        //    mTest_NoNet = true;
//            mTest_NoCheckVersion = true;
//            mTest_NoUseUploadScript = false;
//            mTest_LoadZip = true;
        //}
    }else if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID){
        log("PLATFORM---ANDROID");
        //mTest_LoadZip = true;
        //mTest_NoNet = true;
        mTest_SetLocalNoCheckVersion = true;
    }
    //******************************
    
    
    
    //**************** need setting **************
    mAgent = AGENT_APPLE;//(固定设置值，发布时固定)(ios info.plist;android string.xml)
    mDevicePlatfrom = "iphone";//(固定设置值，发布时固定)
    
    mGameDownPath = "gameres_v10200/";
    mNeedRemovePath.push_back("gameres_v10000/");
    mNeedRemovePath.push_back("gameres_v10100/");
    
    mScriptDownPath = "updatefiles_v10200/"; //每次app 整体升级 改下updatefiles_v10100
    mNeedRemovePath.push_back("updatefiles_v10000/");
    mNeedRemovePath.push_back("updatefiles_v10100/");

    
    mUrl_avatar = "avatar/";//"http://192.168.0.66/avatar/";
    mUrl_upavatar = "upAvatar.do";
    
    mUrl_Sign_ali = "alipaySign.go";
    mUrl_notifypay_ali = "alipayNotify.go";
    
    mServerVersionUrl = "version.do";
    
    
    mPartner_ali = "aaa";
    mSeller_ali = "bbb";
    
    mAppName = "cn.coolqp.game.newver";//test
    mAndroidClassPath = "cn.coolqp.game.QpgameActivity";
    
    mVersionFor = VERSION_APP;
    
    //**************** need setting end **************
    
    
    mCurrClientVersion = "0.1";
    mCurrResVersion = "0";
    
    mAppVersion = mCurrClientVersion+"."+mCurrResVersion;
    mAppVersionShow = mAppVersion;
    
    mNeedClientUpload = 0;
    
    mGameMode = GAME_MODE_TEST_LOCAL;
    
    mUseSDKAccountLogin = true;
    
    mNeedCleanLocalGameResVersion = false;
    
    
    mIsRunScript = false;
    
    mCanLoadRes = true;
    
    mIsForeground = true;
    
    mHasInitSdkForYM = false;
    
    mHasGetUserFromSDK = false;
    mUid_SDK = "";
    mSession_SDK = "";
    mCanLoginGameForSDK = false;
    
    mDoQuitGameBySDK = false;
    
    mCurrZoneId_pay = 0;
    mUserId_pay = 0;
    
    mNetState = NoNetWork;
    mVerInfoFormScript = "";
    
    mOpenUrlData = "";
    
   
    
    mAppCppVersion = "1.0";
    mAppCppbuild = "0";
    mDeviceModel = "";
    
    mUseAppConfig = "0";

    
    mHasNewAliPayResult = false;
    
    mIsShowPTWebView = false;
    
    mLoadObserverId = 0;
    mMyUid = 0;
    
    mOrderNo_pay = "";

    
    mFirstVisit = true;
    mUseSqliteUrl = false;
    mSqliteUrlIndex = 0;
    
    mServerUrl = "";
    mServerUrlIp = "";

    
    
#ifndef __OPTIMIZE__
    //log("DEBUG");
    mAppVersionShow = "v-"+mAppVersionShow;
#else
    //log("RELEASE");
    mAppVersionShow = "v"+mAppVersionShow;
    mGameMode = GAME_MODE_RELEASE;
    mTest_NoNet = false;
    mTest_NoUseUploadScript = false;
    mTest_LoadZip = false;
    mTest_NoCheckVersion = false;
    //mTest_SetLocalNoCheckVersion = false;
#endif
    
    //******************************
    
    mResData = NULL;
    mResDownload = NULL;
    
    mStartScene = NULL;
    mGameLogic = NULL;
    mCallJS = NULL;
    //mJSCallBack = NULL;
    
    mHttpDownload = NULL;
    mWebHttpClient = NULL;
    mSqliteManager = NULL;

    
}

Global::~Global(void)
{
    log("Global---over");
	
}

void Global::initdata(){
    log("Global - initdata");
    
    //设置 代理 设备平台
    
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        mAgent = CallAndroid::getAgent();
        mDevicePlatfrom = CallAndroid::getDevicePlatfrom();
        mPromoter = CallAndroid::getPromoter();
    #endif
        
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        mAgent = CallIOS::getAgent();
        mDevicePlatfrom = CallIOS::getDevicePlatfrom();
        mPromoter = CallIOS::getPromoter();
    #endif
    
    log("mAgent＝%s  mDevicePlatfrom=%s",mAgent.c_str(),mDevicePlatfrom.c_str());
    log("mPromoter＝%s ",mPromoter.c_str());
    
    
}
