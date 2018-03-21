//
//  CallAndroid.h
//  gamesanguo
//
//  Created by apple on 13-6-8.
//
//

#ifndef __gamesanguo__CallAndroid__
#define __gamesanguo__CallAndroid__

#include "Header.h"

class CheckJavaMethodReturn;

class CallAndroid
{
public:


    //调用阿里支付接口
    static void gotoAliPay(std::string orderInfo);

    //调用微信支付接口
    static void gotoWXPay(std::string orderInfo);


    //调用打开网页
    static void gotoUrl(std::string url);
    //调用显示通知
    static void showNotice(std::string msg);
    
    //设置本地推送信息
    static void sendLocalPushMsg(int type,string info,int repeat,int delayday,int delaytime);
    
    
    //给android 设置基本数据
    static void setBaseDataToAndroid(string serverurl,string partner,string seller,string data4,string data5);
    
    //获取电池电量信息(0-100)
    static int getBatteryInfo();
    
    //获取信号信息(0-100)
    static int getSignalInfo();
    
    //获取agent
    static string getAgent();
    //获取aPromoter
    static string getPromoter();
    //获取getDevicePlatfrom
    static string getDevicePlatfrom();
    
    //调用登录
    static void gotoSDKLogin();
    //调用充值
    static void gotoPaynew(int channel,string payAgent,string orderNo,string paydata);
    //调用充值
    static void gotoPay(string orderNo,string einfo,int money);
    //按类型充值
    static void gotoPayByType(string type,string orderNo,string einfo,int money,string data);
    //显示webview
    static void showWebView(std::string url,int type);
    //关闭webview
    static void closeWebView();
    
   
    
    //更新apk
    static void startUpdateApk(string url);
    
    //打开sdk的某界面
    //1用户中心（当乐、百度多酷） 2
    static void gotoShowDSKView(int type);
    
    //g10086
    //static bool getMusicState();
    //设置头像
    static void setAvatarImg(int stype,int type);
    
    //点back键提示退出
    static void clickBackForQuitTip();
    
    //取得网络连接状况
    static NetState getNetState();
    //显示积分墙
    static void showScoreWall(int64_t uid,string type);
    //显示积分墙积分管理
    static void showScoreManagerForScoreWall(int64_t uid,string type);
    //删除文件夹
    static bool removeDirAndFiles(string pDirectoryName);
    //获取app版本 （xml）
    static string getAppBaseVersion();
    
    //获取uuid
    static string getMyUUID();
    
    //检测java 方法 是否存在
    static CheckJavaMethodReturn* checkJavaMethod(string methodName,string methodSignature);
};

#endif /* defined(__gamesanguo__CallAndroid__) */
