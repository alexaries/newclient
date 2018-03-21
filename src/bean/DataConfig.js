/**
 * Created by apple on 15-6-18.
 * 配置数据
 * ios : appScheme 修改 - 微信分享 支付宝
 * android : 微信分享 文件路径修改，
 * 充值的回调地址直接写在这里
 * 本文件内容原则上不修改（本文件，也不发布到更新里）
 * ******DataConfig  不更新******
 */
var sDataConfig = {

    mPartner_ali:"aaa", //支付宝 id ios 要改 appScheme
    mSeller_ali:"bbb", //支付宝 账号  --客户端不再使用
    mAlipay_webhttp:"http://qppay.duole.cn/",//

    //游戏 本地资源数据 ［gameId，打包时本地资源版本号］(值 固定在1)
    //这里的值不再改变，web测试在initGameResVersion修改
    mGamesLocalResDatas:[
        [GAME_TYPE_ZJH,6],//5-0 >  6
        [GAME_TYPE_DDZ,6],//5-0 >  6
        [GAME_TYPE_DN,5]//5-0 >
    ],
    configVersion:"1506181005" //内部版本号(日期)
}

// ios [5,5,5,5,5,5,0,0,0,0,1] -- 发布时

// ddz mj  160126修改
// zjh 鸡牌
// ios pszmm 需要更新