//
//  DownjoySDKMan.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "ISDKManager.h"


#include "ISDKCallBack.h"

#import <CommonCrypto/CommonDigest.h>

@interface ISDKManager ()
@property (nonatomic, retain) 	NSString*	pay_orderNo;
@property (nonatomic, retain) 	NSString*	pay_productId;
@property (nonatomic, retain) 	NSString*	pay_productName;
@property (nonatomic, retain) 	NSString*	pay_note;

@property (nonatomic) 	float	pay_price;
@property (nonatomic) 	float	pay_orignalprice;
@property (nonatomic) 	float	pay_count;

@property (nonatomic, retain) 	LLPaySdk*	sdk;

@property (nonatomic, retain) NSDictionary *orderParam;


@end

@implementation ISDKManager
@synthesize pay_orderNo,pay_productId,pay_productName,pay_note;
@synthesize pay_price,pay_orignalprice,pay_count;

SINGLETON_IMPLEMENTATION(ISDKManager);

static ISDKManager *DefaultHandle_ = nil;


+ (void)initISDKManager
{
    NSLog(@"init ISDKManager");
    @synchronized(self)     {
        if (!DefaultHandle_) {
            DefaultHandle_ = [[ISDKManager alloc]init];

        }
    }
}
- (id)init
{
    NSLog(@"SDKM---init");
    if (self = [super init]) {
        [self initSDK];
                //
    }
    return self;
}


- (void)initSDK
{
    NSLog(@"SDKM - initSDK");
    
    self.sdk = [[LLPaySdk alloc] init];
    self.sdk.sdkDelegate = self;
    
    self.bTestServer = YES;
    self.bModelSmS = YES;
    
    [LLPaySdk switchToTestServer:self.bTestServer];

}

- (void)startSDKLogin
{
    NSLog(@"SDKM - startSDKLogin");

}

- (void)createOrder
{
    NSDateFormatter *dateFormater = [[NSDateFormatter alloc] init];
    [dateFormater setDateFormat:@"yyyyMMddHHmmss"];
    NSString *simOrder = [dateFormater stringFromDate:[NSDate date]];
    
    NSString *signType = @"MD5";    // MD5 || RSA
    
    NSMutableDictionary *param = [NSMutableDictionary dictionary];
    
    [param setDictionary:@{
                           @"partner_sign_type":signType,
                           //商户签名方式	partner_sign_type	是	String	RSA  或者 MD5
                           @"busi_partner":@"101001",
                           //商户业务类型	busi_partner	是	String(6)	虚拟商品销售：101001
                           @"dt_order":simOrder,
                           //商户订单时间	dt_order	是	String(14)	格式：YYYYMMDDH24MISS  14位数字，精确到秒
                           @"money_order":@"0.01",
                           //交易金额	money_order	是	Number(8,2)	该笔订单的资金总额，单位为RMB-元。大于0的数字，精确到小数点后两位。 如：49.65
                           @"notify_url":@"http://www.baidu.com",
                           //服务器异步通知地址	notify_url	是	String(64)	连连钱包支付平台在用户支付成功后通知商户服务端的地址，如：http://payhttp.xiaofubao.com/back.shtml
                           @"no_order":simOrder,
                           //商户唯一订单号	no_order	是	String(32)	商户系统唯一订单号
                           @"name_goods":@"测试商品",
                           //商品名称	name_goods	否	String(40)
                           @"info_order":simOrder,
                           //订单附加信息	info_order	否	String(255)	商户订单的备注信息
                           @"valid_order":@"10080",
                           //分钟为单位，默认为10080分钟（7天），从创建时间开始，过了此订单有效时间此笔订单就会被设置为失败状态不能再重新进行支付。
                           
                           //                           @"risk_item":@"{\"user_info_bind_phone\":\"13958069593\",\"user_info_dt_register\":\"20131030122130\"}",
                           //风险控制参数 否 此字段填写风控参数，采用json串的模式传入，字段名和字段内容彼此对应好
                           @"user_id":@"zhang1144",
                           //商户用户唯一编号 否 该用户在商户系统中的唯一编号，要求是该编号在商户系统中唯一标识该用户
                           //                           @"pay_type":@"2",
                           //支付方式 pay_type 否 String   2：快捷支付（借记卡）3：快捷支付（信用卡）
                           //                           @"bank_code":@"",
                           //银行编号 bank_code 否 String 未签约时必填
                           //                           @"force_bank":@"",
                           // 是否强制使用该银行的银行卡标 force_bank 否 String 0—	不强制用户使用该银行的银行卡支付，用户可以选择其他银行的银行卡进行支付 1—	强制该用户使用该银行的银行卡进行支付（此标志与银行编号bank_code配合使用）
                           //                           @"id_no":@"339005198403100026",
                           //证件号码 id_no 否 String
                           //                           @"acct_name":@"测试号",
                           //银行账号姓名 acct_name 否 String
                           //                           @"flag_modify":@"1",
                           //修改标记 flag_modify 否 String 0-可以修改，默认为0, 1-不允许修改 与id_type,id_no,acct_name配合使用，如果该用户在商户系统已经实名认证过了，则在绑定银行卡的输入信息不能修改，否则可以修改
                           //                           @"card_no":@"6227001540670034271",
                           //银行卡号 card_no 否 银行卡号前置，卡号可以在商户的页面输入
                           //                           @"no_agree":@"2014070900123076",
                           //签约协议号 否 String(16) 已经记录快捷银行卡的用户，商户在调用的时候可以与pay_type一块配合使用
                           }];
    
    if (self.bTestServer)
    {
        
        param[@"oid_partner"] = self.bModelSmS ?  @"201405292000003697" : @"201407032000003742";
        //如果是短验模式，则用前面一个商户号，如果是免密就用后面商户号，商户的验证方式已经配好
        //param[@"oid_partner"] = @"201310102000003524";201307232000003510;201405292000003697;201405292000003698;201405292000003697;201407032000003742
        
    }
    else
    {
        param[@"oid_partner"] = @"201306261000001017";//201306261000001017
        
    }
    
    
    self.orderParam = param;
}

//string orderNo,string einfo,int money
- (void)pay:(NSString *)orderNo withEInfo:(NSString *)einfo withPid:(NSString *)pid  withPname:(NSString *)pname withMoney:(NSNumber *) money
{
    NSLog(@"SDKM - pay ==%@ ==%@  ==%@ ==%@ ==%@",einfo,orderNo,money,pid,pname);
    float tmoney = [money intValue];
    
    self.pay_orderNo = orderNo;
    self.pay_productId = pid;
    self.pay_productName = pname;
    self.pay_price = tmoney;
    self.pay_orignalprice = tmoney;
    self.pay_count = 1;
    self.pay_note = einfo;
    
//    NSDictionary* signedDic = [self partnerSignDicWithParam:self.orderParam];
//    self.sdk.traderInfo = signedDic;
//    [self.sdk presentWalletInViewController:self];
    
    
    NSMutableDictionary *mutOrderParam = [NSMutableDictionary dictionaryWithDictionary:self.orderParam];
    
        mutOrderParam[@"card_no"] = @"12123123123";
    
    
        mutOrderParam[@"no_agree"] =  @"aaa";
    
        mutOrderParam[@"acct_name"] =  @"teus";
    
        mutOrderParam[@"id_no"] =  @"171";
    
    mutOrderParam[@"flag_modify"] =  @"0";
    
    NSDictionary* signedDic = [self partnerSignDicWithParam:mutOrderParam];
    
    [self.sdk presentPaySdkInViewController:nil withTraderInfo:signedDic];

    
}

- (NSDictionary*)partnerSignDicWithParam:(NSDictionary*)paramDic
{
    
    
    NSArray *keyArray = @[@"busi_partner",@"dt_order",@"info_order",
                          @"money_order",@"name_goods",@"no_order",
                          @"notify_url",@"oid_partner",@"risk_item", @"sign_type",
                          @"valid_order"];
    
    NSMutableString *paramString = [NSMutableString stringWithString:@""];
    
    for (NSString *key in keyArray)
    {
        if ([paramDic[key] length] != 0)
        {
            [paramString appendFormat:@"&%@=%@", key, paramDic[key]];
        }
        else if ([key isEqualToString:@"sign_type"])
        {
            [paramString appendFormat:@"&%@=%@", key, paramDic[@"partner_sign_type"]];
        }
    }
    
    if ([paramString length] > 1)
    {
        [paramString deleteCharactersInRange:NSMakeRange(0, 1)];    // remove '&'
    }
    
    BOOL bMd5Sign = [paramDic[@"partner_sign_type"] isEqualToString:@"MD5"];
    
    if (bMd5Sign)
    {
        NSString *pay_md5_key = @"yintong1234567890";
        if (self.bTestServer) {
            pay_md5_key = @"201103171000000000";
            //pay_md5_key = @"md5key_201311062000003548_20131107";
        }
        [paramString appendFormat:@"&key=%@", pay_md5_key];
    }
    
    NSString *signedString = [self signString:paramString];
    
    NSMutableDictionary *signedParam = [NSMutableDictionary dictionaryWithDictionary:paramDic];
    signedParam[@"sign"] = signedString;
    // 请求签名	sign	是	String	MD5（除了sign的所有请求参数+MD5key）
    
    return signedParam;
}


- (NSString *)signString:(NSString*)origString
{
    const char *original_str = [origString UTF8String];
	unsigned char result[32];
	CC_MD5(original_str, strlen(original_str), result);//调用md5
	NSMutableString *hash = [NSMutableString string];
	for (int i = 0; i < 16; i++){
        [hash appendFormat:@"%02x", result[i]];
	}
    
	return hash;
}

- (void)paymentEnd:(LLPayResult)resultCode withResultDic:(NSDictionary *)dic
{
    
}




- (void)dealloc
{
	[[NSNotificationCenter defaultCenter] removeObserver:self];
	[super dealloc];
}



- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation
{
    return YES;
}

- (BOOL)shouldAutorotate
{
    return YES;
}
- (NSUInteger)supportedInterfaceOrientations
{
    return  UIInterfaceOrientationMaskAll;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

@end
