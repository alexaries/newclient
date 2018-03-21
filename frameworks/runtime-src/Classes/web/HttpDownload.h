//
//  HttpDownload.h
//  cardgame
//
//  Created by apple on 12-12-26.
//
//

#ifndef __cardgame__HttpDownload__
#define __cardgame__HttpDownload__

#include "Header.h"
USING_NS_CC;
// 资源更新下载
class HttpDownload: public Ref
{
public:
    HttpDownload(void);
	~HttpDownload(void);
    bool init(){return true;};
    //添加需要加载的资源
    void addRes(ResVersionInfo* res);
    
    //清除下载列表
    void clearreses();
    //获取当前资源下载了多少
    int getressizeuploaded();
    //获取当前下载的资源信息
    ResVersionInfo* getCurrResInfo();
    //取消当前资源下载
    void cancelDownload();
    

    CREATE_FUNC(HttpDownload);
private:
    //加载资源
    void onStartLoadRes(ResVersionInfo* res);
    //一个资源加载结束时
    void onHttpRequestCompleted(Node *sender, void *data);
    //改变路径 把'／'改成 '_'
    string changePicPath(string path);
    
    
    
    //没有加载时，挑最先加入的进行加载
    void startLoad();
    //加载结束 不管成功还是失败
    void loadend();
private:
    bool mIsLoading;//是否正在加载
    ResVersionInfo* mCurrRes;//当前加载的资源
    CCArray* mResArray;//要加载的资源列表
    bool mHasLoaddata;//是否正在加载到数据
    long mTempTime;//

};

#endif /* defined(__cardgame__HttpDownload__) */
