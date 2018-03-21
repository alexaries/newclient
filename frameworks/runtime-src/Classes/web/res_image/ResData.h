//
//  VersionData.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef qpgame_ResData_h
#define qpgame_ResData_h

#include "Header.h"
//资源版本信息
class ResData: public Ref
{
public:
    ResData(void);
	~ResData(void);
bool init();
        
    //根据他的资源名 加载 plist png 
    void addToLoadByName(string loadobserverId,string resName,string url);
    void addLoadSucRes(string resName);
    bool checkIsLoadSuc(string resName);
private:
    Array* mResdataArray;
    vector<string> mLoadSucResNames;//把本次运行的下载的资源记录下来 （后面重复下载的直接返回成功）
    
    
};

#endif