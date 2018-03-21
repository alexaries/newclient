//
//  CallJS.h
//  qpgame
//
//  Created by apple on 14-5-6.
//
//

#ifndef __qpgame__CallJS__
#define __qpgame__CallJS__

#include "cocos2d.h"
#include "Header.h"
#include "ui/jsb_cocos2dx_ui_manual.h"

USING_NS_CC;
using namespace std;
class CallJS: public Ref
{
public:
    CallJS(void);
	~CallJS(void);
    void init();
    //获取配置
    void getConfigData(string useappconfig);
    //发送数据给脚本
    void setDataToScript();
    //充值完成
    void payok(string orderno,string vinfo);
    //google充值完成
    void googlepayok(string orderno,string payinfo,string purchasedata,string dataSignature);
    //获取app 版本
    void getAppBaseVersion();
    
    //设置外部打开数据
    void setOpenUrlData();
    
    //分享完成
    void doShareEnd(int type,int state);
    //获取电量 信号
    void getPhoneInfoForBatterySignalEnd(int battery,int signal);
    
    //获取uuid
    void getUUIDEnd(string uuid);
    void sdkLoginEnd(int state,int sdktype,string uid,string session);
    //游戏资源
    void doDownGameResEnd(int gameId,string resName,int state);
    //设置资源下载进度
    void setGameResDownSize(int gameId,string resname,int size);

    //
    void doDownTestResEnd(int state);
    
    //js 掉cpp http访问 
    void httpResultForjs(string code,string result);
    
    //下载图片完成
    void loadPicEnd(string resobserverId,string resname,int state);
    //选择完成
    void choosePicEnd(int state,string data);
    //上传头像完成
    void upAvatarEnd(int state);
    //进入前后台
    void enterForeBackground(int type);
    
    //ios 有可能会删除更新的资源文件
    void cleanLocalGameResVersion();
    
    jsval CallJSFuncName(string jsname,string jsmethod,int count,...);
    
    
    
    
    
};

#endif /* defined(__qpgame__CallJS__) */
