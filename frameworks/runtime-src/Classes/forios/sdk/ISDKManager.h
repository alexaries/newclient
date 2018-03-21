//
//  DownjoySDKMan.h
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#ifndef __shuihu_downjoy__ISDKManager__
#define __shuihu_downjoy__ISDKManager__

#import <Foundation/Foundation.h>
#import "LLPaySdk.h"

#ifndef SINGLETON_IMPLEMENTATION(CLASSNAME)
#define SINGLETON_IMPLEMENTATION(CLASSNAME)         \
\
static CLASSNAME* g_shared##CLASSNAME = nil;        \
\
+ (CLASSNAME*)shared                                \
{                                                   \
if (g_shared##CLASSNAME != nil) {                   \
return g_shared##CLASSNAME;                         \
}                                                   \
\
@synchronized(self) {                               \
if (g_shared##CLASSNAME == nil) {                    \
g_shared##CLASSNAME = [[self alloc]  init];      \
[g_shared##CLASSNAME postInit];	\
\
}                                                   \
}                                                   \
\
return g_shared##CLASSNAME;                         \
}                                                   \
\
+ (id)allocWithZone:(NSZone*)zone                   \
{                                                   \
@synchronized(self) {                               \
if (g_shared##CLASSNAME == nil) {                   \
g_shared##CLASSNAME = [super allocWithZone:zone];	\
return g_shared##CLASSNAME;                         \
}                                                   \
}                                                   \
NSAssert(NO, @ "[" #CLASSNAME                       \
" alloc] explicitly called on singleton class.");   \
return nil;                                         \
}                                                   \
\
- (id)copyWithZone:(NSZone*)zone                    \
{                                                   \
return self;                                        \
}                                                   \
\
- (id)retain                                        \
{                                                   \
return self;                                        \
}                                                   \
\
- (unsigned)retainCount                             \
{                                                   \
return UINT_MAX;                                    \
}                                                   \
\
- (void)release                                     \
{                                                   \
}                                                   \
\
- (id)autorelease                                   \
{                                                   \
return self;                                        \
}
#endif

//c++类调本类（objc） ios sdk 管理
@interface ISDKManager : NSObject<LLPaySdkDelegate>{
	NSString*	strProductId;
	int			nProductCount;
	NSString*	strFileForOrderInfo;
	NSMutableDictionary*	dicAbnormalOrderInfo;
    LLPaySdk* sdk;
}
@property (nonatomic, assign) BOOL  bTestServer;
@property (nonatomic, assign) BOOL  bModelSmS;
+ (void)initISDKManager;
@end

#endif /* defined(__shuihu_downjoy__ISDKManager__) */
