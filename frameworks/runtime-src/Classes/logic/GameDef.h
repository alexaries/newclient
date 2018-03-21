//
//  GameDef.h
//  hero
//
//  Created by apple on 13-9-24.
//
//

#ifndef hero_GameDef_h
#define hero_GameDef_h

#define AGENT_WCOOL         "wc"
#define AGENT_APPLE            "apple"
#define AGENT_DOWNJOY          "downjoy"
#define AGENT_91               "91"
#define AGENT_UC               "uc"
#define AGENT_MI               "mi"
#define AGENT_G10086           "g10086"
#define AGENT_360              "360"
#define AGENT_XJHUANLE         "xjhuanle"

#define AD_DOMOB               "domob"
#define AD_YOUMI               "youmi"
#define AD_YOUMI_1             "youmi_1"

#define VERSION_APP         "app"
#define VERSION_XJHUANLE         "xjhuanle"


//充值渠道号
#define PAY_CHANNEL_ALIPAY       1
#define PAY_CHANNEL_WXPAY        2
#define PAY_CHANNEL_CMCCMM       3
#define PAY_CHANNEL_APPSTOTE     4
#define PAY_CHANNEL_HEEPAY       5
#define PAY_CHANNEL_JUBAOSDK     6

#define PAYSTATE_WAIT   0
#define PAYSTATE_SUCCESS   1
#define PAYSTATE_VERIFY   2
#define PAYSTATE_FAIL   3

//--保存在本地文件的名称 固定不要改 Script要用
#define HAS_LOCAL_VERINFO       "haslocalverinfo"//存有本地版本信息
#define VERSION_RES             "resversion"
#define VERSION_CLIENT          "clientversion"
#define VERSION_SQLLITE         "sqlliteversion"
#define RES_ALLNAME_LOCAL       "localresallname"
#define RES_ALLUNZIPPATH_LOCAL       "localresallunzippath"
#define RES_ALLVERSION_LOCAL       "localresallversion"
#define ScriptCODEUNZIPPATH             "Scriptcodeunzippath"
#define ScriptCODEFILEPATH             "Scriptcodefilepath"
#define ScriptCODESUBPATH             "Scriptcodesubpath"
//--end

#define RES_UPDATE_NONE             0   //资源未更新
#define RES_UPDATE_LOAD_ING          1   //资源正在下载
#define RES_UPDATE_LOAD_SUC          2   //资源下载成功
#define RES_UPDATE_LOAD_FAIL         3   //资源下载失败
#define RES_UPDATE_UNZIP_FAIL       4   //资源解压缩失败
#define RES_UPDATE_END              5   //资源更新结束（解压缩完成）


//使用后要 CCUserDefault::sharedUserDefault()->flush() 保存
#define SaveStringToXML UserDefault::getInstance()->setStringForKey
#define SaveIntegerToXML UserDefault::getInstance()->setIntegerForKey
#define SaveBooleanToXML UserDefault::getInstance()->setBoolForKey
#define SaveFloatToXML UserDefault::getInstance()->setFloatForKey

#define LoadStringFromXML UserDefault::getInstance()->getStringForKey
#define LoadIntegerFromXML UserDefault::getInstance()->getIntegerForKey
#define LoadBooleanFromXML UserDefault::getInstance()->getBoolForKey
#define LoadFloatFromXML UserDefault::getInstance()->getFloatForKey

typedef enum
{
    // Apple NetworkStatus Compatible Names.
    NoNetWork    = 0,
    Conn3G       = 1,
    ConnWiFi     = 2
} NetState;

typedef enum {
    kBtnOk,//确定
    kBtnCancel,//取消
    kMenu,//
} GameButtonId;//游戏的按钮

typedef enum {
    kNoticeLayer = 50,
} LayerId;


#endif
