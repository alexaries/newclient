//
//  ResVersionInfo.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef hero_ResVersionInfo_h
#define hero_ResVersionInfo_h

#include "Header.h"
//资源版本信息
class ResVersionInfo: public Ref
{
public:
    ResVersionInfo(void){
        //idx = 0;
        unzippath = "";
        needUpdate =false;
        updatever = 0;
        updatestate = 0;
        savepath = "";
        loadIndex = 0;
        type = 0;
    };
    ~ResVersionInfo(void){};
    
    //int idx;
    //string name;
    //string type;
    //string info;
    int currVersion;
    string url;
    string unzippath;//解压路径
    int size;
    bool needUpdate;
    int updatever;//版本
    int updatestate;//0未更新 1更新中 2下载成功 3下载失败 4解压失败 5解压成功（更新完成）
    string savepath;//
    int loadIndex;//
    int type;//type 0:更新资源   1:游戏基本资源    9:测试资源
    //游戏资源
    int gameId;// 游戏id  （一个游戏有很多版本的资源）
    string resName;// (资源名)--已停止使用
    
    
};

#endif
