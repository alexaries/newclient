//
//  CallIOS.h
//  gamesanguo
//
//  Created by apple on 13-6-6.
//
//

#ifndef __gamesanguo__CallIOS__
#define __gamesanguo__CallIOS__

#include "Header.h"




class CallIOS
{
public:
    //调用打开网页
    static void gotoUrl(std::string url);
    //调用显示通知
    static void showNotice(std::string msg);
    
    //取得网络连接状况
    static NetState getNetState();
    
    //设置本地推送信息
    static void sendLocalPushMsg(int type,string info,int repeat,int delayday,int delaytime);
    
    //获取ios资源下载存储地址
    static string getResCachePath();
    
    //获取电池电量信息(0-100)
    static int getBatteryInfo();
    
    //获取信号信息(0-100)
    static int getSignalInfo();
    
    //初始化sdk
    static void initSDK();
    
    //获取agent
    static string getAgent();
    //获取getDevicePlatfrom
    static string getDevicePlatfrom();
    //获取Promoter
    static string getPromoter();
    
    //调用登录
    static void gotoSDKLogin();
    
    static void startPay(string amount,string goodsName,string playerId);
    
    static string demoOrderId();
    
    //调用充值
    static void gotoPaynew(int channel,string payAgent,string orderNo,string paydata);
    //调用充值
    static void gotoPay(string orderNo,string einfo,int money);
    //按类型充值
    static void gotoPayByType(string type,string orderNo,string einfo,int money,string data);
    
    
    static void gotoPayForAli_sign(string sign);
    
    
    
    //支付宝 结果
    static void payresult_ali(string code,string result);
    
    //
    static void httpSign(string data);
    
    
    //打开sdk的某界面
    //1用户中心（当乐、百度多酷） 2
    static void gotoShowDSKView(int type);
    
    //调用登录
    static bool checkIsLogined();
    
    //设置本地推送信息
    static void sendLocalPushMsg(string info);
    
    //设置头像
    static void setAvatarImg(int stype,int type);
    
    //显示webview
    static void showWebView(std::string url,int type);
    //关闭wenview
    static void closeWebView();
    
    //显示积分墙
    static void showScoreWall(int64_t uid,string type);
    //显示积分墙积分管理
    static void showScoreManagerForScoreWall(int64_t uid,string type);
    
    //初始化有米sdk
    static void initYMSDK();
    
    //显示广告条
    static void showBannerAD(string type,float heightrate);
    //隐藏广告条
    static void hiddenBannerAD(string type);
    
    //删除文件夹
    static bool removeDirAndFiles(string pDirectoryName);
    
    //获取设备信息
    static string getDevicestr();
    
    //获取app版本号
    static string getAppBaseVersion();
    
    static string getMyUUID();
    
    static float getIOSVersion();
    
    static string getIDFV();
    
    static string getMacAddress();
    
};

#endif /* defined(__gamesanguo__CallIOS__) */
