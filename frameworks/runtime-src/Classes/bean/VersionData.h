//
//  VersionData.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef qpgame_VersionData_h
#define qpgame_VersionData_h

#include "Header.h"
//资源版本信息
class VersionData: public Ref
{
public:
    VersionData(void){
        reslist = NULL;
        uploadUrl = "";
        needForceUpload = false;
    };
	~VersionData(void){};
    
   int state;
    string clientVersion;//客户端版本号 1.0
    string resVersion;//资源版本号 1
    string msg;

    CCArray* reslist;//
    
    vector<string> portalUrls;//门户地址
    
    string uploadVersion; //需要升级的客户端版本
    string forceUploadVersion; // 强制升级的客户端版本
    string uploadMsg; //升级时显示的客户端消息
    int uploadSize; //升级的尺寸
    string uploadUrl;  //升级下载的url地址
    bool needForceUpload;
    
};

#endif
