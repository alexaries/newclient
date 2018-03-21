//
//  GameLogic.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef __hero__GameLogic__
#define __hero__GameLogic__
#include "Header.h"

using namespace cocos2d;

class HallServer;

class GameLogic: public BGameLogic
{
public:
    GameLogic(void);
	~GameLogic(void);
    
    //获取初始数据
    void initGameData();
    
    void reInitData();

    
    //第一次启动时 获取本地版本信息
    void initDataByFirstOpen();
    
    //进入后台
    void applicationWillEnterForeground();
    //返回前台
    void applicationDidEnterBackground();
    
    //检查 客户端 版本与目标 版本 （）
    int checkClientVersionDif(string cver);
    

    //设置基本路径 type 1原始路径 2下载路径
    //void setScriptCodePath(int type,string vpath);
    //检查版本信息
    void checkVersion();
    
    //清除更新的资源
    void cleanUpdateRes();
    
    //删除文件夹
    bool removeDirAndFiles(string pDirectoryName);
    
    //获取游戏版本（cpp）
    string getAppBaseVersion();
    //获取唯一编号
    string getMyUUID();
    //处理cpp 版本号和build
    void dealCppVersionBuild();
    
      
    //根据资源名从本地获取版本号信息
    ResVersionInfo* createVerInfoFromLocalByResname(string resname);
    
    
    //开始更新资源
    void startUpdateRes();
    //资源加载完成
    void resLoadEnd(ResVersionInfo* info);
    
    //检查所有资源更新完成
    bool checkALlResUpdateEnd();
    //显示增加加载的索引号
    void showLoadIndex(int index);
    //http访问失败
    void httpVisitFail(string code);
    //加载资源错误
    void loadreserror();
    //获取大厅
    HallServer* getHall();
    
    //设置本地推送信息
    void sendLocalPushMsg(int type,string info,int repeat,int delayday,int delaytime);
    
    //添加查找路径(完全路径) 后面添加的优先级在前（跟Script引擎设置的相反）
    void addSearchPathToFirst(string path);
    
    //添加查找路径 index 0 最前面
    void addSearchPathByIndex(string path,int index);
    
    //获取要验证的订单号
    string getVerifyOrderNos(int zoneId,string userid);
    //设置充值纪录状态 1成功 3失败
    void setVPaylogState(string orderno,int state);

    //获取平台
    string getPlatform();
    //创建订单号
    string makeOrderNo();
    //获取网络状态
    NetState getNetState();
    
    //显示webview
    void showWebView(string url,int type);
    //关闭webview
    void closeWebView();
    
    //设置头像(stype 0头像 1上传)type 0相册 1拍照
    void setAvatarImg(int stype,int type);
    //跳转到某地址
    void gotoUrl(string url);
    //银联充值
    void gotoPay_Upmp(string tn,string orderno);
    
    //按类型充值
    void gotoPayByType(string type,string orderNo,string einfo,int money,string data);
    
    void doHttpSign(string type,string data);
    void getHttpSignResult(string rdata);
    
    void dealResult_ali(string result);
    void showPayResult(int state);
    void dealAlipayResult_ios();
    
    //使用sdk登录
    void gotoSDKLogin();
    
    //显示公告
    void showSysNotice(string msg);
    //充值 （appstore googleplay）
    void gotoPay(string orderNo,string einfo,int money,int zoneId,string userid);
    //打开sdk界面
    void openSdkView(int code);
    //显示积分墙
    void showScoreWall(int64_t uid,string type);
    //显示积分墙积分管理
    void showScoreManagerForScoreWall(int64_t uid,string type);
    //显示广告条
    void showBannerAD(string type,float heightrate);
    //隐藏广告条
    void hiddenBannerAD(string type);
    //加载图片
    void loadPic(string aid,string picname,string url);
    
    //
    void getPhoneInfoForBatterySignal();
    
    //设置下载游戏基本资源版本
    void setGameResVersion(ResVersionInfo* info);
    //下载游戏基本资源
    void downLoadGameBaseRes(string oid,string gameId,string resname,string url,string data);
    //下载本地测试更新资源
    void downloadLocalTestUpdataRes(string url);
    
    //显示分享
    void showShare(int type,string title,string content1,string desc,string imgurl,string url,string siteUrl,string sitename);
    
    //进行某操作
    void doSomeString(int code,string para1,string para2,string para3,string para4,string para5);
    //获取透明区域百分比（像素读取）
    int pixelReadFromRenderTexture(RenderTexture* pRender,cocos2d::Rect &readRect);
    
    //选择图片结束
    void choosePicEnd(int state,string data);
    //显示选择图片
    void showChoosePic();
    //隐藏选择图片
    void hiddenChoosePic();
    
    //保存门户地址
    void savePortalUrl(vector<string> urls);
    //获取门户地址
    string getPortalUrl(int index);
    
    //新的充值
    void paynew(int channel,string payAgent,string orderNo,string paydata);
    
    //更新apk
    void startUpdateApk(string url);
    
public:
    bool mHasGetVersionInfo;//已经获取到版本信息
    bool mHasCheckVersion;//是否检查了版本信息
    bool mCheckLocalVersionOver;//检查了版本信息 结束
    bool mCanNoticeResUpdate;
    bool mCanNoticeClientUpdate;//检查了客户端版本信息 结束
    VersionData* mVersionData;//从服务端获取的版本数据
    bool mCanLoginAfterCheckVer;//检查版本号后能登录
    CCArray* mLocalResInfos;//本地资源信息
    CCArray* mNeedUpdateResInfos;//需要更新的列表
    
    bool mNeedUpdateRes;//需要下载资源
    bool mCanStartUpdateRes;//能下载资源了
    bool mIsLoadingRes;//正在下载
    string mUpdateResInfo;//加载显示信息（百分比 速度）
    int mLoadIndex;//当前加载的缩影
    int64_t mResallsize;//资源总大小
    int64_t mResuploadsize;//资源 已经下载的大小
    vector<string> mLocalAllResName;//本地所有资源名称
    vector<string> mLocalAllUnzipPath;//本地所有查找路径
    vector<string> mLocalAllVersion;//本地所有版本号
    vector<int> mLoadErrorRes;//(保存版本号)
    CCArray* mVerifyPayloglist;//充值验证列表
    bool mNeedReLoadRes;//需要重新下载资源
    //CCArray* mZonesList;//分区列表
    //string mZonesStr;//
    string mScriptBasePath;//资源库的路径  里面的文件可能不是最新的
    int mNoNetNum;
    
    string mChoosePicdata;//
    
    CCArray* mHallList;//大厅列表
    HallServer* mCurrHall;
    
    pthread_t threadSave;
    pthread_t threadLoad;

};

#endif /* defined(__hero__GameLogic__) */
