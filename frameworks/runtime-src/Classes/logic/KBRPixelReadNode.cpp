//
//  KBRPixelReadNode.cpp
//  qpgame
//
//  Created by apple on 14-8-25.
//
//

#include "KBRPixelReadNode.h"

KBRPixelReadNode * KBRPixelReadNode::create(const cocos2d::Vec2& readPoint){
    KBRPixelReadNode * ret = (KBRPixelReadNode *)Node::create();
    ret->_readPoint = readPoint;
    for(int i=0;i<4;i++){
        ret->_pixelColorRead[i] = 255;
    }
    return ret;
}


void KBRPixelReadNode::draw(Renderer *renderer, const Mat4& transform, uint32_t flags) {
    log("KBRPixelReadNode--draw=%f",_readPoint.x);
    _readPixelsCommand.init(_globalZOrder);
    _readPixelsCommand.func = CC_CALLBACK_0(KBRPixelReadNode::onDraw, this);
    renderer->addCommand(&_readPixelsCommand);
}


void KBRPixelReadNode::onDraw() {
    log("KBRPixelReadNode--onDraw=%f",_readPoint.x);
    glReadPixels(_readPoint.x,
                 _readPoint.y,
                 1,
                 1,
                 GL_RGBA,
                 GL_UNSIGNED_BYTE,
                 &_pixelColorRead[0]);
}