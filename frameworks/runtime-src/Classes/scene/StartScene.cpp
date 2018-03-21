#include "StartScene.h"
#include "SimpleAudioEngine.h"

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
#include "network/jsb_websocket.h"

#include "jsb_cocos2dx_custom.hpp"

using namespace cocos2d;
using namespace CocosDenshion;
//初始界面
StartScene::StartScene(void)
{
    log("StartScene---");
    sGlobal->mStartScene = this;
    mIsFristIn = true;
    mDoGameLogin = true;
    mLoadSize = 0;
    mLoadTime = 0;
    mSpeed = 0;
}

StartScene::~StartScene(void)
{
    log("StartScene---over");
	sGlobal->mStartScene = NULL;
}

//初始化  需CCLayer::init()
bool StartScene::init()
{
    
    bool bRet = false;
    do {
        //检测有没有初始化
        CC_BREAK_IF(!Layer::init());

        #ifndef __OPTIMIZE__
                log("DEBUG");
        #else
                log("RELEASE");
        #endif
        
        //设置android 双击后退 退出
        setKeypadForAndroid();
               
        //获取界面大小
        Size size = Director::getInstance()->getWinSize();
        
        
        SpriteFrameCache::getInstance()->addSpriteFramesWithFile("res/game/gameui_scale9.plist");
        SpriteFrameCache::getInstance()->addSpriteFramesWithFile("res/mains/mainbg.plist");
            
            Sprite* pbgSprite = Sprite::createWithSpriteFrameName("mainbg.png");//
            CC_BREAK_IF(!pbgSprite);
            pbgSprite->setPosition( Vec2(size.width/2, size.height/2) );
            this->addChild(pbgSprite, 0);
            pbgSprite->setScaleX(size.width/pbgSprite->getContentSize().width);
            pbgSprite->setScaleY(size.height/pbgSprite->getContentSize().height);
        
        
        string logopic = "res/init/init_logo.png";

        Sprite* pSprite = Sprite::create(logopic);//
        //CC_BREAK_IF(!pSprite);
        //设置在屏幕正中间  默认锚点是在正中间
        if(pSprite){
            pSprite->setAnchorPoint(Vec2(0.5,0.5));
            pSprite->setPosition( Vec2(size.width/2, size.height/2) );
            this->addChild(pSprite, 0);
        }

        
        log("screen size=%f-%f",size.width,size.height);
        float scale = Director::getInstance()->getContentScaleFactor();
        log("scale=%f",scale);
        int fontszie1 = 24/scale;
        
        //添加文字显示，用的系统字体
        LabelTTF* tipLabel = LabelTTF::create(sResWord->w_init_ing.c_str(), "Arial", fontszie1);
        CC_BREAK_IF(!tipLabel);
        //设定位置
        tipLabel->setAnchorPoint(Vec2(0.5,0));
        tipLabel->setPosition( Vec2(size.width / 2, size.height*0.01) );
        tipLabel->setTag(8888);
        // add the label as a child to this layer
        this->addChild(tipLabel, 1);
        tipLabel->setVisible(true);
        tipLabel->setColor(ccc3(255,255,255));
        
        
        string msg = sGlobal->mAppVersionShow;
        int index = sGlobal->mServerUrl.find("192.168.");
        log("local index==%d",index);
        if(index > -1){
            msg = sGlobal->mAppVersionShow+"_local";
            if(sGlobal->mTest_SetLocalNoCheckVersion){
                sGlobal->mTest_NoCheckVersion = true;
            }
        }
        if (sGlobal->mTest_NoNet||sGlobal->mTest_NoUseUploadScript||sGlobal->mTest_LoadZip||sGlobal->mTest_NoCheckVersion) {
            msg = msg+"_test";
        }
        //显示版本号
        LabelTTF* versionLabel = LabelTTF::create(msg.c_str(), "Arial", fontszie1);
        CC_BREAK_IF(!versionLabel);
        versionLabel->setAnchorPoint(Vec2(0,0));
        versionLabel->setPosition( Vec2(0, 0));
        this->addChild(versionLabel, 1);
        versionLabel->setTag(8001);
        versionLabel->setColor(ccc3(255,255,255));
        

        bRet = true;
    } while (0);
    return bRet;
}

//在第2帧初始化
bool StartScene::initInSecondFrame(){
    log("---------------\ninitInSecondFrame");
    if(sGlobal->mTest_NoNet){
        sGlobal->mGameLogic->mCanLoginAfterCheckVer = true;
        return true;
    }
    checknet();
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    log("---------------initInSecondFrame sGlobal->mAgent = %s",sGlobal->mAgent.c_str());
        if(sGlobal->mAgent == AGENT_APPLE){
            PurchaseCPP::initPurchase();
            CallIOS::initSDK();
        }
    #endif

    return true;
}

void StartScene::checknet(){
    log("checknet---");
    NetState netstate = sGlobal->mGameLogic->getNetState();
    log("NetState==%d",netstate);
    if(netstate == NoNetWork){
        sGlobal->mGameLogic->mNoNetNum++;
        if (sGlobal->mGameLogic->mNoNetNum >100){
            sGlobal->mGameLogic->mNoNetNum = 0;
        }
        string msg = sResWord->w_net_no;
        if (sGlobal->mGameLogic->mNoNetNum%2 == 1){
            msg = sResWord->w_net_no1;
        }
        showNotice(sResWord->w_notice, msg,4,0);
        updateTip(sResWord->w_net_no);
    }else if(netstate == Conn3G){
        showNotice(sResWord->w_notice, sResWord->w_net_3g,3,0);
    }else{
        loadVersionInfo();
    }
    
     //showNotice(sResWord->w_notice, sResWord->w_net_3g,3,0);
    
}

//从服务端加载版本信息
void StartScene::loadVersionInfo(){
    mLoadTime = 0;
    mLoadSize = 0;
    mSpeed = 0;
    log("loadVersionInfo");
    updateTip(sResWord->w_req_version);
    string resVer = sGlobal->mAppVersion;
    string platform = sGlobal->mGameLogic->getPlatform();
    string username = LoadStringFromXML("username");
    string pwd = LoadStringFromXML("password");
    
    string portalurl = sGlobal->mServerUrl;
    if(!sGlobal->mUseSqliteUrl){
        if(!sGlobal->mFirstVisit){
            portalurl = sGlobal->mServerUrlIp;
        }
    }else{
        portalurl = sGlobal->mGameLogic->getPortalUrl(sGlobal->mSqliteUrlIndex);
    }
    
    
    //string url = sGlobal->mServerUrl+sGlobal->mServerVersionUrl+"?version="+resVer+"&platform="+platform; 
    string url = portalurl+sGlobal->mServerVersionUrl+"?version="+resVer+"&agent="+sGlobal->mAgent+"&deviceType="+sGlobal->mDevicePlatfrom;
    sGlobal->mUrl_avatar = portalurl+"avatar/";
    sGlobal->mUrl_upavatar = portalurl+"upAvatar.do";
    
    sGlobal->mWebHttpClient->addHttpReq("version",url,"get","");
    
}
//开始登录
void StartScene::startLogin(){
//    if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID && sGlobal->mUseSDKAccountLogin){
//        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//                CallAndroid::gotoLogin();
//        #endif
//    }
    StartScene::startLoadScript();
}

// 开始 执行 脚本
void StartScene::startLoadScript(){
    log("startLoadScript---");
    
    
    if(sGlobal->mGameLogic->mVersionData){
        if(sGlobal->mGameLogic->mVersionData->msg.size() > 0){
            sGlobal->mGameLogic->showSysNotice(sGlobal->mGameLogic->mVersionData->msg);
        }
        sGlobal->mGameLogic->mCurrHall = sGlobal->mGameLogic->getHall();
        log("HallList len==%ld",sGlobal->mGameLogic->mHallList->count());
    }
    
    
    //ScriptingCore::getInstance()->reloadConfig();
    
    sGlobal->mIsRunScript = true;
    
    ScriptingCore::getInstance()->runScript("main.js");
    
    
}


//更新提示
void StartScene::updateTip(std::string msg)
{
    //msg = msg;
    LabelTTF* tipLabel = (LabelTTF*)(this->getChildByTag(8888));
    if(tipLabel){
        if(!GameUtil::stringequals(msg, "")){
            tipLabel->setVisible(true);
            tipLabel->setString(msg.c_str());
        }else{
            tipLabel->setVisible(false);
        }
    }
    
}

//进入场景时调用
void StartScene::onEnter()
{
    // do something
    CCLayer::onEnter();

    schedule(schedule_selector(StartScene::update),0.1f);
    
}


//更新
void StartScene::update(float dt)
{
    //第一次进入 初始化
    if(mIsFristIn){
        mIsFristIn = false;
        initInSecondFrame();
    }
    
    //1 获取到版本信息后，检查本地版本
    if(sGlobal->mGameLogic->mHasGetVersionInfo){
        if(!sGlobal->mGameLogic->mHasCheckVersion){
            sGlobal->mGameLogic->mHasCheckVersion = true;
            sGlobal->mGameLogic->checkVersion();
            sGlobal->mGameLogic->savePortalUrl(sGlobal->mGameLogic->mVersionData->portalUrls);
        }
    }

    //2 检查本地版本后
    if(sGlobal->mGameLogic->mCheckLocalVersionOver){
        sGlobal->mGameLogic->mCheckLocalVersionOver = false;
        if(sGlobal->mNeedClientUpload > 0){
            updateTip(sResWord->w_req_version_end);
            //sGlobal->mGameLogic->mCanStartUpdateRes = true;
            //通知是否 更新
            if(sGlobal->mNeedClientUpload==2){
                showNotice(sResWord->w_notice, sGlobal->mGameLogic->mVersionData->uploadMsg,6,0);
            }else{
                showNotice(sResWord->w_notice, sGlobal->mGameLogic->mVersionData->uploadMsg,5,0);
            }
        }else{
            sGlobal->mGameLogic->mCanNoticeResUpdate = true;
            
        }
    }
    //2.1资源更新
    if(sGlobal->mGameLogic->mCanNoticeResUpdate){
        sGlobal->mGameLogic->mCanNoticeResUpdate = false;
        // 需要更新时
        if(sGlobal->mGameLogic->mNeedUpdateRes){
            sGlobal->mGameLogic->mNeedUpdateRes = false;
            if(sGlobal->mTest_NoCheckVersion){
                sGlobal->mGameLogic->mCanLoginAfterCheckVer = true;
                return;
            }
            updateTip(sResWord->w_req_version_end);
            //sGlobal->mGameLogic->mCanStartUpdateRes = true;
            //通知是否 更新
            showNotice(sResWord->w_notice, sResWord->w_needupdateres+sGlobal->mGameLogic->mUpdateResInfo,2,0);
        }else{ //不需要更新
            sGlobal->mGameLogic->mCanLoginAfterCheckVer = true;
        }
    }
    
    //3 选择更新后更新
    if(sGlobal->mGameLogic->mCanStartUpdateRes){
        sGlobal->mGameLogic->mCanStartUpdateRes = false;
        updateTip(sResWord->w_loadresing);
        sGlobal->mGameLogic->startUpdateRes();
    }
    
    // 5 需要重新更新时
    if(sGlobal->mGameLogic->mNeedReLoadRes){
        sGlobal->mGameLogic->mNeedReLoadRes = false;
        updateTip(sResWord->w_needreload);
        loadVersionInfo();
    }
    // 4 正在更新
    if (sGlobal->mGameLogic->mIsLoadingRes){
        long time = GameUtil::getTimeNow();
        if(mLoadTime == 0){
            mLoadTime = time;
            mLoadSize = 0;
        }
        int loadsize = sGlobal->mHttpDownload->getressizeuploaded();
        int64_t newsize = loadsize+sGlobal->mGameLogic->mResuploadsize;
        //log("newsize==%lld",newsize);
        //log("time==%ld",time);
        //log("mLoadTime==%lld",mLoadTime);
        if(time - mLoadTime > 200){
            int addsize = newsize - mLoadSize;
            int costtime = time - mLoadTime;
            //log("addsize==%d=%d",addsize,costtime);
            mSpeed = (addsize*1.0)/(costtime)/1.024;
            //log("speed==%f",mSpeed);
            if(mSpeed < 0){
                mSpeed = 0;
            }
            mLoadSize = newsize;
            mLoadTime = time;
        }
        
        float percent = (newsize*1.0/sGlobal->mGameLogic->mResallsize)*100;
        if(percent > 100){
            percent = 100;
        }

        char msg[100];
        sprintf(msg, "%s %.02f%%  %.01f k/s",sResWord->w_loadres.c_str(),percent,mSpeed);
        //sprintf(msg, "%s %.02f%%",sResWord->w_loadres.c_str(),percent);
        sGlobal->mStartScene->updateTip(msg);
        
        
    }
        
    //6 检查版本后或更新完成时可以登录时 进行登录
    if(sGlobal->mGameLogic->mCanLoginAfterCheckVer&&mDoGameLogin){
        mDoGameLogin = false;
        startLogin();
    }
    
}

// 显示此场景
void StartScene::Show()
{
    //切换场景时 释放到目前为止所有加载的资源


    // 建立场景和层
    Scene *pNewScene = Scene::create();
    StartScene *layer = StartScene::create();
    pNewScene->addChild(layer);
        
    // 切换场景
    Scene *pCurScene = Director::getInstance()->getRunningScene();
    if(NULL == pCurScene)
    {
        Director::getInstance()->runWithScene(pNewScene);
    }
    else
    {
        Director::getInstance()->replaceScene(pNewScene);
    }
}

