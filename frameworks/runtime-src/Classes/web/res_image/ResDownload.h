//
//  VersionData.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef qpgame_ResDownload_h
#define qpgame_ResDownload_h

#include "Header.h"
//资源版本信息
class ResDownload: public Ref
{
public:
    ResDownload(void);
	~ResDownload(void);
    
  bool init(){return true;};
    //添加需要加载的资源
    void addRes(LoadRes* res);
    void removeRes(string loadobserverId);
    bool isFileExist(const char* pFileName);
    bool isFileLocalExist(const char* pFileName);
    CREATE_FUNC(ResDownload);
private:
    //加载资源
    void onStartLoadRes(LoadRes* res);
    //一个资源加载结束时
    void onHttpRequestCompleted(cocos2d::Node *sender, void *data);
    //判断这个文件以前是否加载过
    
    //没有加载时，挑最先加入的进行加载
    void startLoad();
    //加载结束 不管成功还是失败
    void loadend();
private:
    bool mIsLoading;//是否正在加载
    LoadRes* mCurrRes;//当前加载的资源
    CCArray* mResArray;//要加载的资源列表
};

#endif

