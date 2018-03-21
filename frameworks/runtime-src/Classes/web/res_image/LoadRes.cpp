//
//  imgstruct.cpp
//  pkgame
//
//  Created by apple on 12-12-26.
//
//

#include "LoadRes.h"
LoadRes::LoadRes(const char *resName,int resType,const char *url)
{
    this->resName = resName;
    this->resType = resType;
    this->url = url;
    this->state = 0;
    
}