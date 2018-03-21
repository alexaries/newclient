#include "AppDelegate.h"

#include "SimpleAudioEngine.h"
#include "jsb_cocos2dx_auto.hpp"
#include "jsb_cocos2dx_ui_auto.hpp"
#include "jsb_cocos2dx_studio_auto.hpp"
#include "jsb_cocos2dx_builder_auto.hpp"
#include "jsb_cocos2dx_spine_auto.hpp"
#include "jsb_cocos2dx_extension_auto.hpp"
#include "ui/jsb_cocos2dx_ui_manual.h"
#include "cocostudio/jsb_cocos2dx_studio_manual.h"
#include "cocosbuilder/js_bindings_ccbreader.h"
#include "spine/jsb_cocos2dx_spine_manual.h"
#include "extension/jsb_cocos2dx_extension_manual.h"
#include "localstorage/js_bindings_system_registration.h"
#include "chipmunk/js_bindings_chipmunk_registration.h"
#include "jsb_opengl_registration.h"
#include "network/XMLHTTPRequest.h"
#include "network/jsb_websocket.h"
#include "network/jsb_socketio.h"

#include "jsb_cocos2dx_custom.hpp"

//#include "C2DXShareSDK.h"
//using namespace cn::sharesdk;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include "platform/android/CCJavascriptJavaBridge.h"
#include "logic/autogensqlitebindings.hpp"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
#include "platform/ios/JavaScriptObjCBridge.h"
#include "autogensqlitebindings.hpp"
#endif



#include "Header.h"


USING_NS_CC;
using namespace CocosDenshion;

AppDelegate::AppDelegate()
{
}

AppDelegate::~AppDelegate()
{
    ScriptEngineManager::destroyInstance();
}

bool AppDelegate::applicationDidFinishLaunching()
{
    // initialize director
    auto director = Director::getInstance();
	auto glview = director->getOpenGLView();
	int width = 960;
    if(CC_TARGET_PLATFORM != CC_PLATFORM_WIN32){
        Size size = CCDirector::getInstance()->getWinSize();
        CCLOG("i w-h===%f-%f",size.width,size.height);
        float whscale = size.width/size.height;
        width = whscale*640;
        CCLOG("new width==%d",width);
    }
    
	if(!glview) {
		glview = GLView::createWithRect("hellojs", Rect(0,0,width,640));
		director->setOpenGLView(glview);
	}
    
    if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID||CC_TARGET_PLATFORM == CC_PLATFORM_WIN32){
        CCLOG(" android --set size");
        glview->setDesignResolutionSize(width, 640, ResolutionPolicy::SHOW_ALL);
    }
    
    glview->setDesignResolutionSize(width, 640, ResolutionPolicy::SHOW_ALL);

    // turn on display FPS
    //director->setDisplayStats(false);
    // set FPS. the default value is 1.0/60 if you don't call this
    director->setAnimationInterval(1.0 / 30);
    
    log("cpp start---");
    //sharesdk-------

    
    //sharesdk------- end
    
    sGlobal->initdata();
    
    string scriptpath = GameUtil::getScriptPath();
    log("scriptpath==%s",scriptpath.c_str());
    
     string ganerespath = GameUtil::getGameDownPath();
    
    log("mOpenUrlData=%s",sGlobal->mOpenUrlData.c_str());
    
    if(sGlobal->mGameLogic == NULL){
        sGlobal->mGameLogic = new GameLogic();
        sGlobal->mGameLogic->addSearchPathToFirst(ganerespath);
        sGlobal->mGameLogic->addSearchPathToFirst(scriptpath);
    }
    
    ScriptingCore* sc = ScriptingCore::getInstance();

    sc->addRegisterCallback(register_all_cocos2dx);
    sc->addRegisterCallback(register_all_cocos2dx_extension);
    sc->addRegisterCallback(register_cocos2dx_js_extensions);
    sc->addRegisterCallback(register_all_cocos2dx_extension_manual);
    sc->addRegisterCallback(jsb_register_chipmunk);
    sc->addRegisterCallback(jsb_register_system);
    sc->addRegisterCallback(JSB_register_opengl);
    
    sc->addRegisterCallback(register_all_cocos2dx_builder);
    sc->addRegisterCallback(register_CCBuilderReader);
    
	sc->addRegisterCallback(register_all_cocos2dx_ui);
	sc->addRegisterCallback(register_all_cocos2dx_ui_manual);
	sc->addRegisterCallback(register_all_cocos2dx_studio);
	sc->addRegisterCallback(register_all_cocos2dx_studio_manual);
    
    sc->addRegisterCallback(register_all_cocos2dx_spine);
    sc->addRegisterCallback(register_all_cocos2dx_spine_manual);
    
    sc->addRegisterCallback(MinXmlHttpRequest::_js_register);
    sc->addRegisterCallback(register_jsb_websocket);
	sc->addRegisterCallback(register_jsb_socketio);
    
    
    //add
    sc->addRegisterCallback(register_all_cocos2dx_custom);
    sc->addRegisterCallback(register_all_autogensqlitebindings);
    
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        sc->addRegisterCallback(JavascriptJavaBridge::_js_register);
    #elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
        sc->addRegisterCallback(JavaScriptObjCBridge::_js_register);
    #endif
    
    sc->start();//放到更新完成去执行
    sc->runScript("script/jsb_boot.js");
    ScriptEngineProtocol *engine = ScriptingCore::getInstance();
	ScriptEngineManager::getInstance()->setScriptEngine(engine);
    CCLOG("load GameConfig 1");
    ScriptingCore::getInstance()->runScript("src/GameConfig.js");

    
    cocos2d::GameJSB::sharedGJSB()->mGameLogic = (BGameLogic*)sGlobal->mGameLogic;
    sGlobal->mGameLogic->initGameData();
    
    
    StartScene::Show();
    
    

    return true;
}

// This function will be called when the app is inactive. When comes a phone call,it's be invoked too
void AppDelegate::applicationDidEnterBackground()
{
    Director::getInstance()->stopAnimation();
    SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
    SimpleAudioEngine::getInstance()->pauseAllEffects();
    
    sGlobal->mGameLogic->applicationDidEnterBackground();
    sGlobal->mIsForeground = false;
}

// this function will be called when the app is active again
void AppDelegate::applicationWillEnterForeground()
{
    Director::getInstance()->startAnimation();
    SimpleAudioEngine::getInstance()->resumeBackgroundMusic();
    SimpleAudioEngine::getInstance()->resumeAllEffects();
    
    sGlobal->mGameLogic->applicationWillEnterForeground();
    sGlobal->mIsForeground = true;
}

void AppDelegate::initPlatformConfig()
{
    

    
}
