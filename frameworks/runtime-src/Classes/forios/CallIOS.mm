//
//  CallIOS.cpp
//  gamesanguo
//
//  Created by apple on 13-6-6.
//
//

#include "CallIOS.h"
#include "CCEAGLView.h"
#include "AvatarPicker.h"
#include "Header.h"
#include "ReachabilityIOS.h"
#include "FMUIWebViewBridge.h"

//#include "UPViewController.h"
#include "RootViewController.h"

#include "sys/utsname.h"

//TARGET_IPHONE_SIMULATOR//模拟器

//#include "ListWallViewController.h"
//#include "PointManageViewController.h"


//#import "PublicCallConfig.h"
//#import "PublicCallList.h"
//#import "PublicCallListAppModel.h"
//#import "PublicCallPointsManager.h"

#import "wxpay/WXApiRequestHandler.h"


#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include <sys/socket.h> // Per msqr
#include <sys/sysctl.h>
#include <net/if.h>
#include <net/if_dl.h>
#endif
#pragma mark MAC addy

#import <SystemConfiguration/CaptiveNetwork.h>

#import <Heepay/Heepay.h>

//#import "WXApi.h"

#import "CHKeychain.h"
//#import "AdmobViewController.h"
//
//#import "GADBannerView.h"

NSString * const KEY_QPDATA = @"com.qp.xlylc.com.qpdata";
NSString * const KEY_GUESTID = @"com.qp.xlylc.com.guestid";


//间隔多少天执行
//type 1 （多久没登录执行）
void CallIOS::sendLocalPushMsg(int type,string info,int repeat,int delayday,int delaytime){
    log("ios-sendLocalPushMsg");
    
    if(type == 0){
        [[UIApplication sharedApplication] cancelAllLocalNotifications];//取消所有的通知
    }else{
        //------通知；
        NSString *infostr=[NSString stringWithUTF8String:info.c_str()];
        
        UILocalNotification *notification=[[UILocalNotification alloc] init];
        if (notification!=nil) {
            NSDate *now=[NSDate new];
            if(type == 2){
                
                NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
                NSDateComponents *comps = [[NSDateComponents alloc] init];
                NSInteger unitFlags = NSYearCalendarUnit | NSMonthCalendarUnit | NSDayCalendarUnit | NSWeekdayCalendarUnit |
                NSHourCalendarUnit | NSMinuteCalendarUnit | NSSecondCalendarUnit;
                now=[NSDate date];
                comps = [calendar components:unitFlags fromDate:now];
                int week = [comps weekday];
                int hour = [comps hour];
                int min = [comps minute];
                int dur_day = delayday-week;
                int dur_hour = delaytime - hour;
                int dur_min = 5 - min;
                if(dur_day < 0){
                    dur_day = dur_day+7;
                }else if(dur_day == 0){
                    if(dur_hour < 0){
                        dur_day = dur_day+7;
                    }else if(dur_hour == 0){
                        if(dur_min <= 0){
                            dur_day = dur_day+7;
                        }
                    }
                }
                int delaytime = dur_day*24*60*60 + dur_hour*60*60 +dur_min*60;
                NSDate *now1 = [now dateByAddingTimeInterval:delaytime];
                notification.fireDate=now1;//[now addTimeInterval:15];//本次开启立即执行的周期
            }else if(type == 3){
                char timestr[20];
                sprintf(timestr, "%02d:%02d:00",delayday,delaytime);
                NSString *ttime = [NSString stringWithUTF8String:timestr];
                
                NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
                [formatter setDateFormat:@"HH:mm:ss"];
                NSDate *now = [formatter dateFromString:ttime];//触发通知的时间
                notification.fireDate=now;//[now addTimeInterval:15];//本次开启立即执行的周期
            }else{
                int delaytime = delaytime*60+delayday*24*60*60; //20分钟后通知
                notification.fireDate=[now dateByAddingTimeInterval:delaytime];//
                
            }
            notification.repeatInterval = 0;
            if(repeat == 1){
                notification.repeatInterval= kCFCalendarUnitDay ;//循环次数，kCFCalendarUnitWeekday一周一次
            }else if(repeat == 2){
                notification.repeatInterval= kCFCalendarUnitWeekday ;//循环次数，kCFCalendarUnitWeekday一周一次
            }
            notification.timeZone=[NSTimeZone defaultTimeZone];
            notification.applicationIconBadgeNumber=1; //应用的红色数字
            notification.soundName= UILocalNotificationDefaultSoundName;//声音，可以换成alarm.soundName = @"myMusic.caf"
            //去掉下面2行就不会弹出提示框
            notification.alertBody = infostr;//弹出的提示信息
            notification.alertAction = NSLocalizedString(@"确定", nil);  //提示框按钮
            
            [[UIApplication sharedApplication] scheduleLocalNotification:notification];
        }
        [notification release];
    }
}


string CallIOS::getAgent(){
    NSString * agent = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"app_agent"];
    string tAgent = [agent UTF8String];
    return tAgent;
}
//获取Promoter
string CallIOS::getPromoter(){
    NSString * agent = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"app_promoter"];
    string tAgent = [agent UTF8String];
    return tAgent;
}

string CallIOS::getDevicePlatfrom(){
    NSString * deviceplatfrom = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"app_deviceType"];
    string tDevicePlatfrom = [deviceplatfrom UTF8String];
    return tDevicePlatfrom;
}

//获取ios资源下载存储地址
//ios 资源文件不能放 ／doc  要放／lib/cache －－不然审核不过
string CallIOS::getResCachePath(){
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    std::string strRet = [documentsDirectory UTF8String];
    strRet.append("/");
    return strRet;
}

//获取电池电量信息
int CallIOS::getBatteryInfo(){
    int level = 50;
    [UIDevice currentDevice].batteryMonitoringEnabled = YES;
    double deviceLevel = [UIDevice currentDevice].batteryLevel;
    if(deviceLevel == -1){
        log("deviceLevel -1");
        deviceLevel = 1;
    }
    level = (int)(100*deviceLevel);
    return level;
}

//获取信号信息(0-100)
int CallIOS::getSignalInfo(){
    log("getSignalInfo---IOS");
    int level = 50;
    //不取了，默认显示全信号
    //    CFArrayRef wifiInterfaces = CNCopySupportedInterfaces();
    //    if (wifiInterfaces) {
    //        NSArray *interfaces = (__bridge NSArray *)wifiInterfaces;
    //        for (NSString *interfaceName in interfaces) {
    //            CFDictionaryRef dictRef = CNCopyCurrentNetworkInfo((__bridge CFStringRef)(interfaceName));
    //            id info = nil;
    //            if (dictRef) {
    //                NSDictionary *networkInfo = (__bridge NSDictionary *)dictRef;
    //                NSLog(@"network info -> %@", networkInfo);
    //                CFRelease(dictRef);
    //            }
    //        }
    //        CFRelease(wifiInterfaces);
    //    }
    return level;
}



//初始化
void CallIOS::initSDK(){
    log("initSDK---IOS");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        //CallPTSDK_union::init();
    #endif
}

//去登录
void CallIOS::gotoSDKLogin(){
    log("gotoSDKLogin---IOS");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        if(sGlobal->mAgent == AGENT_DOWNJOY){
            //CallDownjoy::gotoLogin();
        }
    #endif
}
//APViewController* sAliManager;
//调用充值
void CallIOS::gotoPayByType(string type,string orderNo,string einfo,int money,string data){
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        if(type == "upmp"){
            //CallPTSDK_union::gotoPay(orderNo,einfo,money);

//            UIWindow *view = [[UIApplication sharedApplication] keyWindow];
//            
//            UPViewController* sManager = [[UPViewController alloc]init];
//            [view addSubview:sManager.view];
//            
//            NSString *orderNostr = [NSString stringWithUTF8String:orderNo.c_str()];
//            NSString *einfostr = [NSString stringWithUTF8String:einfo.c_str()];
//            NSNumber * tmoney = [NSNumber numberWithInt:money];
//            [sManager gotoPay:orderNostr withEInfo:einfostr withMoney:tmoney];
//            [sManager.view removeFromSuperview];
        }else if(type == "alipay"){
//            UIWindow *view = [[UIApplication sharedApplication] keyWindow];
//            
//            APViewController* sManager = [[APViewController alloc]init];
//            [view addSubview:sManager.view];
//            [sManager.view setTag:990077];
//            
//            NSString *signurl = [NSString stringWithUTF8String:sGlobal->mUrl_Sign_ali.c_str()];
//            NSString *notifyurl = [NSString stringWithUTF8String:sGlobal->mUrl_notifypay_ali.c_str()];
//            NSString *partner = [NSString stringWithUTF8String:sGlobal->mPartner_ali.c_str()];
//            NSString *seller = [NSString stringWithUTF8String:sGlobal->mSeller_ali.c_str()];
//            [sManager setUrl:signurl withNotify:notifyurl withPartner:partner withSeller:seller];
//            
//            NSString *orderNostr = [NSString stringWithUTF8String:orderNo.c_str()];
//            NSString *einfostr = [NSString stringWithUTF8String:einfo.c_str()];
//            NSNumber * tmoney = [NSNumber numberWithInt:money];
//            [sManager gotoPay:orderNostr withEInfo:einfostr withMoney:tmoney];
//            [sManager.view removeFromSuperview];
//            sAliManager = sManager;

        }else if(type == "wxpay"){
//            NSString *orderNostr = [NSString stringWithUTF8String:orderNo.c_str()];
//            NSString *einfostr = [NSString stringWithUTF8String:einfo.c_str()];
//            NSNumber * tmoney = [NSNumber numberWithInt:money];
//            
//            NSString *res = [WXApiRequestHandler jumpToBizPay:orderNostr withEInfo:einfostr withMoney:tmoney];
//            if( ![@"" isEqual:res] ){
//                UIAlertView *alter = [[UIAlertView alloc] initWithTitle:@"支付失败" message:res delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
//                
//                [alter show];
//                [alter release];
//            }

        }else{
            showNotice(sResWord->w_notopen);
        }
    #endif
}

void CallIOS::gotoPayForAli_sign(string sign){
//    log("gotoPayForAli_sign---IOS");
//#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
//    
//    NSString *signedString = [NSString stringWithUTF8String:sign.c_str()];
//    APViewController *sManager= (APViewController *)sAliManager;
//    if(sManager!=nil){
//        log("gotoPayForAli_sign1---IOS");
//        [sManager startPay:signedString];
//    }
//    
//#endif
}

//
void CallIOS::httpSign(string data){
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    sGlobal->mGameLogic->doHttpSign("alipay",data);
#endif
}

//支付宝 结果
void CallIOS::payresult_ali(string code,string result){
    log("payresult_ali---IOS");
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    if(GameUtil::stringequals(code,"9000")){
//        sGlobal->mPayResults_ali.push_back(result);
//        sGlobal->mHasNewAliPayResult = true;
//        if(sGlobal->mGameLogic){
//            NSLog(@" has gamelogic");
//            sGlobal->mGameLogic->dealAlipayResult_ios();
//        }else{
//            NSLog(@" no gamelogic");
//        }
        sGlobal->mGameLogic->showPayResult(1);
    }else{
        sGlobal->mGameLogic->showSysNotice(sResWord->w_pay_unfinish);
    }
#endif
}


// 启动支付
void CallIOS::startPay(string amount,string goodsName,string playerId)
{
//    // 必须
//    // 凡伟支付 start
//    
//    log("CallIOS::startPay---IOS===%s|%s|%s",amount.c_str(),goodsName.c_str(),playerId.c_str());
//#if TARGET_OS_IPHONE//真机
//    FWPayParam *param = [[FWPayParam alloc] init];
//    // playerid：用户在第三方平台上的用户名
//    param.playerid  = [NSString stringWithUTF8String:playerId.c_str()];
//    // goodsname：购买商品名称
//    param.goodsname = [NSString stringWithUTF8String:goodsName.c_str()];
//    // amount：购买商品价格，单位是元
//    param.amount    = [NSString stringWithUTF8String:amount.c_str()];
//    // payid：第三方平台上的订单号，请传真实订单号，方便后续对账，例子里采用随机数，
//    //
//    param.payid = [NSString stringWithUTF8String:CallIOS::demoOrderId().c_str()];
//    
//    param.remark = [NSString stringWithUTF8String:playerId.c_str()];
//    
//    
//    UIWindow *view = [[UIApplication sharedApplication] keyWindow];
//    RootViewController* rootView =  (RootViewController*)view.rootViewController;
//    [FWPay pay:rootView withParams:param withDelegate:rootView];
//    
//    log("CallIOS::startPay end---IOS===");
//    // 凡伟支付 end
//#endif
    
}


string CallIOS::demoOrderId()
{
    static int kNumber = 15;
    NSString *sourceStr = @"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    NSMutableString *resultStr = [[NSMutableString alloc] init];
    srand((unsigned)time(0));
    for (int i = 0; i < kNumber; i++)
    {
        unsigned index = rand() % [sourceStr length];
        NSString *oneStr = [sourceStr substringWithRange:NSMakeRange(index, 1)];
        [resultStr appendString:oneStr];
    }
    
    string resultstdStr =  [resultStr UTF8String];
    return resultstdStr;
}


//调用充值
void CallIOS::gotoPaynew(int channel,string payAgent,string orderNo,string paydata){
    sGlobal->mOrderNo_pay = orderNo;
    
    log("gotoPaynew---IOS===%d|%s|%s|%s",channel,payAgent.c_str(),orderNo.c_str(),paydata.c_str());
    if(channel == PAY_CHANNEL_APPSTOTE){
        PurchaseCPP::buy(orderNo);
    }else if(channel == PAY_CHANNEL_JUBAOSDK){
        
    }else if(channel == PAY_CHANNEL_ALIPAY){

    }else if(channel == PAY_CHANNEL_WXPAY){

    }else if(channel == PAY_CHANNEL_HEEPAY){
        
    }
}


//进行充值（非官方）
void CallIOS::gotoPay(string orderNo,string einfo,int money){
    log("gotoPay---IOS");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
       // CallPTSDK::gotoPay(orderNo,einfo,money);

    
    #endif
}
//显示sdk界面
void CallIOS::gotoShowDSKView(int type){
    log("gotoShowDSKView---IOS");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        if(sGlobal->mAgent == AGENT_DOWNJOY){
            //CallDownjoy::gotoShowDSKView(type);
        }
    #endif
}
//检查是否登录
bool CallIOS::checkIsLogined(){
    log("checkIsLogined---IOS");
    bool islogined = false;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        if(sGlobal->mAgent == AGENT_DOWNJOY){
            //islogined = CallDownjoy::checkIsLogined();
        }
    #endif
    return islogined;
}

//显示公告
void CallIOS::showNotice(std::string msgstr){
    log("ios-showNotice----");
    char* msg = (char*)msgstr.c_str();
    char* w_notice = (char*)sResWord->w_notice.c_str();
    char* w_close = (char*)sResWord->w_close.c_str();
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    NSString *str=[NSString stringWithUTF8String:msg];
    NSString *notice=[NSString stringWithUTF8String:w_notice];
    NSString *close=[NSString stringWithUTF8String:w_close];
    
    UIAlertView *alert = [[UIAlertView alloc]initWithTitle:notice
                                                   message:str
                                                  delegate:nil
                                         cancelButtonTitle:close
                                         otherButtonTitles:nil, nil];
    [alert show];
    [alert release];
#endif
}
//跳转到网页
void CallIOS::gotoUrl(std::string urlstr){
    log("gotoUrl---%s",urlstr.c_str());
    char* url = (char*)urlstr.c_str();
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    NSString *str=[NSString stringWithUTF8String:url];
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:str]];
#endif
}
//获取网络状态
NetState CallIOS::getNetState()
{
    NSString* testPage = @"www.baidu.com";
    ReachabilityIOS *r = [ReachabilityIOS reachabilityWithHostname:testPage];
    switch ([r currentReachabilityStatus]) {
        case NotReachable:
            // 没有网络连接
            return NoNetWork;
            break;
        case ReachableViaWWAN:
            // 使用3G网络
            return Conn3G;
            break;
        case ReachableViaWiFi:
            // 使用WiFi网络
            return ConnWiFi;
            break;
    }
    return ConnWiFi;
}
//本地推送
void CallIOS::sendLocalPushMsg(string info){
    log("sendLocalPushMsg--");

}
//设置 头像
void CallIOS::setAvatarImg(int stype,int type){
    char* upurl = (char*)sGlobal->mUrl_upavatar.c_str();
    char uid[20];
    sprintf(uid, "%lld",sGlobal->mMyUid);
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        //cocos2d::GLView *glview = cocos2d::Director::getInstance()->getOpenGLView();
        //CCEAGLView *view = (CCEAGLView*) glview->getEAGLView();
        UIWindow *view = [[UIApplication sharedApplication] keyWindow];
        NSString *uidstr=[NSString stringWithUTF8String:uid];
        NSString *urlstr=[NSString stringWithUTF8String:upurl];
        AvatarPicker* sManager = [[AvatarPicker alloc]init];
        [view addSubview:sManager.view];
        [sManager imgPicker:type withShowtype:stype withUrl:urlstr withUid:uidstr];
        [sManager.view removeFromSuperview];
    
        
    #endif
}
//显示webview tag 990055
void CallIOS::showWebView(std::string urlstr,int type){
    const char* url = (const char*)urlstr.c_str();

        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            //NSString *str=[NSString stringWithUTF8String:url];
        
            FMUIWebViewBridge* g_FMUIWebViewBridge = [[FMUIWebViewBridge alloc] init];
            [g_FMUIWebViewBridge setLayerWebViewWithURL:url withType:type];
        #endif
    
}
//关闭 webview
void CallIOS::closeWebView(){

        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            cocos2d::GLView *glview = cocos2d::Director::getInstance()->getOpenGLView();
            CCEAGLView *view = (CCEAGLView*) glview->getEAGLView();
            UIView *tview = (UIView*)[view viewWithTag:990055];
            UIWebView *webview = (UIWebView*)[tview viewWithTag:50055];
            [webview removeFromSuperview];
            [tview removeFromSuperview];
        #endif
    
}
//显示积分墙 多盟
void CallIOS::showScoreWall(int64_t uid,string code){
    log("showScoreWall---%lld",uid);
    //string device = getDevicestr();
    //log("device---%s",device.c_str());
    
    char uidstr[20];
    sprintf(uidstr, "%lld",uid);
    NSString *uidstrs=[NSString stringWithUTF8String:uidstr];
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        if(code == "domob"){
           
//            UIWindow *view = [[UIApplication sharedApplication] keyWindow];
//            ListWallViewController* sManager = [[ListWallViewController alloc]init];
//            [view addSubview:sManager.view];
//            [sManager initSDkWithUid:uidstrs];
        }else if(code == "youmi"){
            
//            initYMSDK();
//            
//            [PublicCallConfig PublicCallSetUserID:uidstrs];
//            
//            [PublicCallList PublicCallShowOffers:YES PublicCallDidShowBlock:^{
//                NSLog(@"有米积分墙已显示");
//            } PublicDidDismissBlock:^{
//                NSLog(@"有米积分墙已退出");
//            }];
            
        }else{
            showNotice(sResWord->w_notopen);
        }
    #endif
}
//显示积分墙积分管理 code：domob 多盟
void CallIOS::showScoreManagerForScoreWall(int64_t uid,string code){
    log("showScoreManagerForScoreWall---%lld",uid);
    char uidstr[20];
    sprintf(uidstr, "%lld",uid);
    NSString *uidstrs=[NSString stringWithUTF8String:uidstr];
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
    #endif
}
//初始化有米sdk
void CallIOS::initYMSDK(){

}
//显示 广告 条 tag 990066
void CallIOS::showBannerAD(string type,float heightrate){
    log("ios-showBannerAD---");

    
}
//隐藏广告条
void CallIOS::hiddenBannerAD(string type){
    log("ios-hiddenBannerAD---");
//    UIWindow *view = [[UIApplication sharedApplication] keyWindow];
//    UIView *tview = (UIView*)[view viewWithTag:990066];
//    [tview removeFromSuperview];
}

//删除文件夹
bool CallIOS::removeDirAndFiles(string pDirectoryName)
{
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        //NSArray* paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
        NSString* documentsDirectory = @"";
    NSString* delPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithUTF8String:pDirectoryName.c_str()]];
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:delPath])
        {
            NSFileManager *fileManager = [NSFileManager defaultManager];
            [fileManager removeItemAtPath:delPath error:nil];
            
            return true;
        }
    #endif
    return false;
    
}

//获取app 版本号
string CallIOS::getAppBaseVersion(){
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
    NSString *build = [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleVersionKey];
    
    NSString *model = [[UIDevice currentDevice] model];
    
    string ver = "";
    string split = "_";
    ver = [version UTF8String]+split+[build UTF8String]+split+[model UTF8String];
    return ver;
}


//获取uuid (//ios 6 获取mac地址 ios >＝7 获取idfv + keychain)
string CallIOS::getMyUUID(){
    string uuid = "";
    float ver = getIOSVersion();
    log("ver=%f",ver);
    
    NSMutableDictionary *qpdataKVPairs = (NSMutableDictionary *)[CHKeychain load:KEY_QPDATA];
    NSString * guestid = [NSString stringWithFormat:@"%@",[qpdataKVPairs objectForKey:KEY_GUESTID]];
    if(guestid != nil && ![guestid isEqualToString:@"(null)"] && guestid.length > 4 ){
        string guestidstr = [guestid UTF8String];
        log("Keychain has uuid=%s",guestidstr.c_str());
        uuid = guestidstr;
    }else{
        if(ver<7.0){//
            uuid = getMacAddress();
        }else{
            uuid =  CallIOS::getIDFV();
        }
        log("Keychain not has uuid=%s",uuid.c_str());
        NSString *guestid=[NSString stringWithUTF8String:uuid.c_str()];
        NSMutableDictionary *qpdataKVPairs = [NSMutableDictionary dictionary];
        [qpdataKVPairs setObject:guestid forKey:KEY_GUESTID];
        [CHKeychain save:KEY_QPDATA data:qpdataKVPairs];
    }
    return uuid;
}

float CallIOS::getIOSVersion(){
    float version = 0;
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    version = [[[UIDevice currentDevice] systemVersion] floatValue];
#endif
    return version;
}
//
//ios >＝7 获取idfv
string CallIOS::getIDFV(){
    string uid;
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    NSString *idfv = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    //NSString *adId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    uid = [idfv UTF8String];
#endif
    return uid;
}
//ios 6 获取mac地址
string CallIOS::getMacAddress(){
    std::string outstr = "";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
    int                    mib[6];
    size_t                len;
    char                *buf;
    unsigned char        *ptr;
    struct if_msghdr    *ifm;
    struct sockaddr_dl    *sdl;
    
    mib[0] = CTL_NET;
    mib[1] = AF_ROUTE;
    mib[2] = 0;
    mib[3] = AF_LINK;
    mib[4] = NET_RT_IFLIST;
    
    if ((mib[5] = if_nametoindex("en0")) == 0) {
        printf("Error: if_nametoindex error/n");
        return NULL;
    }
    
    if (sysctl(mib, 6, NULL, &len, NULL, 0) < 0) {
        printf("Error: sysctl, take 1/n");
        return NULL;
    }
    
    if ((buf = (char*)malloc(len)) == NULL) {
        printf("Could not allocate memory. error!/n");
        return NULL;
    }
    
    if (sysctl(mib, 6, buf, &len, NULL, 0) < 0) {
        printf("Error: sysctl, take 2");
        return NULL;
    }
    
    ifm = (struct if_msghdr *)buf;
    sdl = (struct sockaddr_dl *)(ifm + 1);
    ptr = (unsigned char *)LLADDR(sdl);
    // NSString *outstring = [NSString stringWithFormat:@"%02x:%02x:%02x:%02x:%02x:%02x", *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5)];
    char out[100];
    sprintf(out, "%02x%02x%02x%02x%02x%02x",*ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5));
    //NSString *outstring = [NSString stringWithFormat:@"%02x%02x%02x%02x%02x%02x", *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5)];
    free(buf);
    outstr = out;
    
#endif
    return outstr;
}


//获取设备信息 不能 多次 调用
string CallIOS::getDevicestr(){
    string result = "";
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        struct utsname systemInfo;
        uname(&systemInfo);
        NSString *code = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
        static NSDictionary* deviceNamesByCode = nil;
    
        if (!deviceNamesByCode) {
            
            deviceNamesByCode = @{@"i386"      :@"Simulator",
                                  @"iPod1,1"   :@"iPod Touch",      // (Original)
                                  @"iPod2,1"   :@"iPod Touch 2",      // (Second Generation)
                                  @"iPod3,1"   :@"iPod Touch 3",      // (Third Generation)
                                  @"iPod4,1"   :@"iPod Touch 4",      // (Fourth Generation)
                                  @"iPod5,1"   :@"iPod Touch 5",      // (5 Generation)
                                  @"iPad1,1"   :@"iPad",            // (Original)
                                  @"iPad2,1"   :@"iPad 2",          //
                                  @"iPad2,2"   :@"iPad 2",          //
                                  @"iPad2,3"   :@"iPad 2",          //
                                  @"iPad2,4"   :@"iPad 2",          //
                                  @"iPad2,5"   :@"iPad mini",          //
                                  @"iPad2,6"   :@"iPad mini",          //
                                  @"iPad2,7"   :@"iPad mini",          //
                                  @"iPad3,1"   :@"iPad 3",            // (3rd Generation)
                                  @"iPad3,2"   :@"iPad 3",            // (3rd Generation)
                                  @"iPad3,3"   :@"iPad 3",            // (3rd Generation)
                                  @"iPad3,4"   :@"iPad 4",            // (4th Generation)
                                  @"iPad3,5"   :@"iPad 4",            // (4th Generation)
                                  @"iPad3,6"   :@"iPad 4",            // (4th Generation)
                                  @"iPad4,1"   :@"iPad Air",        // 5th Generation iPad (iPad Air) - Wifi
                                  @"iPad4,2"   :@"iPad Air",        // 5th Generation iPad (iPad Air) - Cellular
                                  @"iPad4,4"   :@"iPad Mini",       // (2nd Generation iPad Mini - Wifi)
                                  @"iPad4,5"   :@"iPad Mini",        // (2nd Generation iPad Mini - Cellular)
                                  @"iPhone1,1" :@"iPhone",          // (Original)
                                  @"iPhone1,2" :@"iPhone3G",          // (3G)
                                  @"iPhone2,1" :@"iPhone3GS",          // (3GS)
                                  @"iPhone3,1" :@"iPhone 4",        //
                                  @"iPhone3,2" :@"iPhone 4",        //
                                  @"iPhone3,3" :@"iPhone 4",        //
                                  @"iPhone4,1" :@"iPhone 4S",       //
                                  @"iPhone5,1" :@"iPhone 5",        // (model A1428, AT&T/Canada)
                                  @"iPhone5,2" :@"iPhone 5",        // (model A1429, everything else)
                                  @"iPhone5,3" :@"iPhone 5c",       // (model A1456, A1532 | GSM)
                                  @"iPhone5,4" :@"iPhone 5c",       // (model A1507, A1516, A1526 (China), A1529 | Global)
                                  @"iPhone6,1" :@"iPhone 5s",       // (model A1433, A1533 | GSM)
                                  @"iPhone6,2" :@"iPhone 5s",       // (model A1457, A1518, A1528 (China), A1530 | Global)
                                  @"iPhone7,1" :@"iPhone 6 Plus",
                                  @"iPhone7,2" :@"iPhone 6"
                                  };
        }
        
        NSString* deviceName = [deviceNamesByCode objectForKey:code];
        
        if (!deviceName) {
            // Not found on database. At least guess main device type from string contents:
            
            if ([code rangeOfString:@"iPod"].location != NSNotFound) {
                deviceName = @"iPod Touch n";
            }
            else if([code rangeOfString:@"iPad"].location != NSNotFound) {
                deviceName = @"iPad n";
            }
            else if([code rangeOfString:@"iPhone"].location != NSNotFound){
                deviceName = @"iPhone n";
            }
        }
        NSLog(@"device = %@ -- %@",code,deviceName);
        result = [deviceName UTF8String];
    #endif
    return result;
}
