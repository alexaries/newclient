//
//  imgstruct.h
//  cardgame
//
//  Created by apple on 12-12-26.
//
//

#ifndef cardgame_LoadRes_h
#define cardgame_LoadRes_h

#include "cocos2d.h"
USING_NS_CC;
//要加载的资源
class LoadRes: public Ref
{
public:
    LoadRes(const char *resName,int resType,const char *url);
	~LoadRes(void){};
    
    int resType;//资源类型（0:img 、1:plist）
    std::string resName;//资源名称
    std::string resobserverId;//资源跟踪id
    std::string url;//资源地址
    int state;//状态 1成功 2失败
    

};


#endif
