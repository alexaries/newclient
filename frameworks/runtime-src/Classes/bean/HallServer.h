//
//  HallServer.h
//  hero
//
//  Created by apple on 13-9-25.
//
//

#ifndef qpgame_HallServer_h
#define qpgame_HallServer_h

#include "Header.h"
//资源版本信息
class HallServer: public Ref
{
public:
    HallServer(void){
    };
	~HallServer(void){};
    
   string serverIp;
    int serverPort;
    int webSocketPort;
    int quality;
    
};

#endif

