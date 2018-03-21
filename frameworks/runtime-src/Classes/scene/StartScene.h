#ifndef __START_SCENE_H__
#define __START_SCENE_H__

#include "Header.h"
USING_NS_CC;

//初始界面
class StartScene : public CBaseGScene
{
public:
    StartScene(void);
	~StartScene(void);

    //初始化 node方法会调用此函数
    virtual bool init();  
    // 进入场景时调用
    virtual void onEnter();
    
    void updateTip(std::string msg);
    
    
    
    void checknet();
    //从服务端加载版本信息
    void loadVersionInfo();
    
    // 显示此场景
    static void Show();
    //节点函数  node()
    CREATE_FUNC(StartScene);
private:
    //在第2帧初始化
    bool initInSecondFrame();
    //更新
    void update(float dt);
    //加载 脚本
    void startLoadScript();
    //开始登录
    void startLogin();
    
private:
    int64_t mLoadSize;
    int64_t mLoadTime;
    float mSpeed;
public:
    bool mIsFristIn;//第一次进入
    bool mDoGameLogin;//执行登录

    int mAge;//
};

#endif // __START_SCENE_H__
