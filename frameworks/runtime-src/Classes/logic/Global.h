#ifndef _GLOBAL_H_
#define _GLOBAL_H_

#include "Header.h"

USING_NS_CC;


class GameLogic;
class CallJS;
class GameJSB;
class ResDownload;
class ResData;
class StartScene;
class HttpDownload;
class WebHttpClient;
class SqliteManager;


class Global : public Singleton<Global>
{
public:
	Global(void);
	~Global(void);
    
    bool mTest_NoNet;//没有网络(无网络设置为true)
    bool mTest_SetLocalNoCheckVersion;//设置本地不检查新版本
    bool mTest_NoCheckVersion;//不检查新版本
    bool mTest_NoUseUploadScript;//不使用 下载的 Script
    bool mTest_LoadZip;//测试下载的zip
    //******************************
    int mGameMode;//游戏模式  GAME_MODE_RELEASE GAME_MODE_TEST_LOCAL
    
    
    string mAgent;//渠道(固定设置值，发布时固定)
    string mPromoter;//账号渠道(固定设置值，发布时固定)
    string mDevicePlatfrom;//平台 (固定设置值，发布时固定)iphone, ipad, android, wp, pc, web
    string mAppName;//应用名
    string mAppVersionShow;//显示的版本号
    string mAppVersion;//版本号(给服务器发送)
    string mCurrResVersion;//当前资源版本号
    string mCurrClientVersion;//当前客户端版本号(从js版本号转成cpp版本号)
    string mVerInfoFormScript;//从脚本获取的版本号
    string mAppCppVersion;//应用cpp版本号（给用户看的版本号）
    string mAppCppbuild;//应用cpp build （内部版本号）
    string mDeviceModel;
    
    int mNeedClientUpload;//客户端是否需要更新 0不需要 1普通更新 2强制更新
    
    string mOpenUrlData;//
    
    bool mUseSDKAccountLogin;//是否使用sdk帐号(渠道)登录
    string mAndroidClassPath;//android 类路径 jni使用 所有android使用一个路径，发布包名不同
    
    string mVersionFor;//版本－ 没使用
    
    string mScriptDownPath;//脚本下载路径:"updatefiles/" //每次app 整体升级 改下updatefiles_v10100
    string mGameDownPath;//游戏下载路径 "gameres/"
    
    vector<string> mNeedRemovePath;//需要删除的文件路径(以前版本的下载路径)
    
    vector<string> mPayResults_ali;//支付宝返回数据 ios
    bool mHasNewAliPayResult;//有支付宝返回数据 ios
    
    bool mCanLoadRes;//是否能加载资源
    
    bool mHasGetUserFromSDK;//从sdk获取了帐号
    string mUid_SDK;//从sdk 获取的 帐号
    string mSession_SDK;//从sdk 获取的 帐号
    bool mCanLoginGameForSDK;//取得android渠道帐号后登录使用
    
    int mCurrZoneId_pay;//当前区
    int64_t mUserId_pay;//当前用户id
    
    bool mDoQuitGameBySDK;//退出游戏
    
    bool mIsForeground;//是否在前台
    
    bool mIsShowPTWebView;//是否在显示平台界面
    
    bool mIsRunScript;//是否开始执行了脚本
    
    bool mHasInitSdkForYM;//有米是否初始化了sdk
    
    bool mNeedCleanLocalGameResVersion;//是否清除本地资源版本号
    
    NetState mNetState;//网络类型
    
    int64_t mMyUid;//玩家用户id
    
    string mUseAppConfig;//appconfig 使用app

    
    int mLoadObserverId;//下载的跟踪id
    
    bool mUseSqliteUrl;//使用数据库存的url
    int mSqliteUrlIndex;//
    bool mFirstVisit;//
    string mServerUrl;//工程访问地址 (域名)
    string mServerUrlIp;//工程访问地址 ip

    string mServerVersionUrl;//功能访问地址-获取版本信息
    string mUrl_avatar;//下载头像地址
    string mUrl_upavatar;//上传头像地址

    string mUrl_Sign_ali;
    string mUrl_notifypay_ali;
    string mPartner_ali;
    string mSeller_ali;
    
    string mOrderNo_pay;
    
    //******************************

    StartScene* mStartScene;//
    //*************  公共类  *****************
    
    ResDownload* mResDownload;//资源下载
    ResData* mResData;//资源 数据
    
    GameLogic* mGameLogic;//游戏逻辑
    HttpDownload* mHttpDownload;//http下载
    WebHttpClient* mWebHttpClient;//http访问
    SqliteManager *mSqliteManager;//
    
    CallJS* mCallJS;
    cocos2d::GameJSB* mGameJSB;

public:
    void initdata();
};

#define sGlobal Global::instance()

#endif
