//
//  PurchaseCPP.cpp
//  gamesanguo
//
//  Created by apple on 13-3-13.
//
//

#include "PurchaseCPP.h"
#include "CCEAGLView.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "IAPProductManager.h"
#include "AppleCallBack.h"
#endif

PurchaseCPP::PurchaseCPP(void)
{
    
}

PurchaseCPP::~PurchaseCPP(void)
{
    
}
void PurchaseCPP::initPurchase(){
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [IAPProductManager initIAPProductManager];
        [[IAPProductManager shared] loadproducts];
    #endif

}

void PurchaseCPP::buy(std::string pid){
    CCLOG("gotoPurchase----");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        NSString *proIdentifier = [NSString stringWithUTF8String:pid.c_str()];
        [[IAPProductManager shared] buy:proIdentifier];
    #endif
    CCLOG("gotoPurchase----1");
}

void PurchaseCPP::reload(){
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[IAPProductManager shared] loadproducts];
    #endif
}

void PurchaseCPP::test(){
//    CCLOG("test----");
//    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
//        //iOS代码
//        //        EAGLView *view  = [EAGLView sharedEGLView];
//        //        ProductsViewController *recUITVCtl = [[ProductsViewController alloc] initWithStyle:UITableViewStylePlain];
//        //        [view addSubview:[recUITVCtl tableView]];
//        
//        
//        NSString *proIdentifier = @"jahsjkdhfkjsd";
//        ObjectiveCAdaptor *testObjectiveCObj = [[ObjectiveCAdaptor alloc] init];
//        [testObjectiveCObj objectiveFunc_failCallBack:proIdentifier];
//        [testObjectiveCObj release];
//        
//    #endif
//    CCLOG("test----1");
}
