//
//  Header.h
//  hero
//
//  Created by apple on 13-9-24.
//
//

#ifndef hero_Header_h
#define hero_Header_h

#include "cocos2d.h"
using namespace cocos2d;
using namespace std;
#include "my/GameJSB.h"

#include "bean/ResVersionInfo.h"
#include "bean/VersionData.h"
#include "bean/PayLog.h"
#include "bean/HallServer.h"


#include "logic/GameDef.h"
#include "logic/Singleton.h"
#include "logic/Global.h"
#include "logic/GameLogic.h"
#include "logic/GameUtil.h"
#include "logic/ResWord.h"
#include "logic/CallJS.h"
#include "logic/SqliteManager.h"



#include "scene/CBaseGScene.h"
#include "scene/StartScene.h"
#include "scene/NoticeLayer.h"


//json_lib.h 位置
//CCArmature/external_tool/json/lib_json/ －2.1.4 ; extensions/CocoStudio/Json/lib_json －2.2.0
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS) //ios 把 路径 添加进去后 直接引用
    #include "forios/CallIOS.h"
    #include "thirdparty/lib_json/json_lib.h"
    #include "forios/purchase/PurchaseCPP.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)   //android 使用全部路径 win?
    #include "forandroid/CallAndroidReturn.h"
    #include "forandroid/CallAndroid.h"
    #include "thirdparty/lib_json/json_lib.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)  
    #include "thirdparty/lib_json/json_lib.h"
#endif

#include "thirdparty/MD5.h"

#include "web/res_image/LoadRes.h"
#include "web/res_image/ResDownload.h"
#include "web/res_image/ResData.h"

#include "web/HttpDownload.h"
#include "web/HttpReq.h"
#include "web/HttpVisit.h"
#include "web/WebHttpClient.h"







#endif
