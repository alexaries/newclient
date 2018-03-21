//
//  KBRPixelReadNode.h
//  qpgame
//
//  Created by apple on 14-8-25.
//
//

#ifndef __qpgame__KBRPixelReadNode__
#define __qpgame__KBRPixelReadNode__

#include "cocos2d.h"
using namespace cocos2d;

class CC_DLL KBRPixelReadNode : public cocos2d::Node
{
public:
    
    static KBRPixelReadNode* create(const cocos2d::Vec2& readPoint);
    
    virtual void draw(cocos2d::Renderer *renderer, const cocos2d::Mat4& transform, uint32_t flags);
    uint8_t* getPixelColor() {return _pixelColorRead; };
    
protected:
    void onDraw();
    cocos2d::CustomCommand _readPixelsCommand;
    cocos2d::Vec2 _readPoint;
    uint8_t _pixelColorRead[4];
};

#endif /* defined(__qpgame__KBRPixelReadNode__) */
