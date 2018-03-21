/**
 * Created by Administrator on 14-5-16.
 */
var DN_COINVALUE = [0.01,0.02,0.05,0.1,0.2,0.5,1,2,5,10,20,50,100,200,500,1000,2000,5000,10000];//显示的筹码值
var DN_NONE_STATE = 0;
var DN_HOLD_BANK_STATE = 1
var DN_BET_STATE = 2
var DN_SPLIT_CARD_STATE = 3


var CARD_NO_NIU=0;//无牛
var CARD_NIU_ONE=1;//牛一
var CARD_NIU_TWO=2;//牛二
var CARD_NIU_THREE=3;//牛三
var CARD_NIU_FOUR=4;//牛四
var CARD_NIU_FIVE=5;//牛五
var CARD_NIU_SIX=6;//牛六
var CARD_NIU_SEVEN=7;//牛七
var CARD_NIU_EIGHT=8;//牛八
var CARD_NIU_NINE=9;//牛九
var CARD_NIU_NIU=10;//牛牛
var CARD_SILVER_NIU=11;//银牛  五张牌全由10～k组成且只有一张10
var CARD_GOLD_NIU=12;//金牛  五张牌全由j～k组成
var CARD_BOOM=13;//炸弹  五张牌中有4张牌点数相同的牌型
var CARD_FIVE_NIU=14;//五小牛 五张牌的点数加起来小于10，且每张牌点数都小于5
var DNLogic = cc.Class.extend({

    mIndex:0, //某位置
    mTalkMsg:[],//聊天消息
    mTalkSound:[],//聊天声音
    mFaceSound:[],//表情声音
    init:function () {
        this.mTalkMsg = [[sResWord.w_zjh_woman_talk1,sResWord.w_zjh_woman_talk2,sResWord.w_zjh_woman_talk4,sResWord.w_zjh_woman_talk5,
            sResWord.w_zjh_woman_talk6,sResWord.w_zjh_woman_talk7,sResWord.w_zjh_woman_talk8,sResWord.w_zjh_woman_talk9,sResWord.w_zjh_woman_talk10,
            sResWord.w_zjh_woman_talk11,sResWord.w_zjh_woman_talk12],
            [sResWord.w_zjh_man_talk1,sResWord.w_zjh_man_talk3,sResWord.w_zjh_man_talk4,sResWord.w_zjh_man_talk5
                ,sResWord.w_zjh_man_talk9,sResWord.w_zjh_man_talk10]];

        this.mTalkSound = [[res.zjh_woman01_mp3,res.zjh_woman02_mp3,res.zjh_woman04_mp3,res.zjh_woman05_mp3,
            res.zjh_woman06_mp3,res.zjh_woman07_mp3,res.zjh_woman08_mp3,res.zjh_woman09_mp3,res.zjh_woman10_mp3,
            res.zjh_woman11_mp3,res.zjh_woman12_mp3],
            [res.zjh_man01_mp3,res.zjh_man03_mp3,res.zjh_man04_mp3,res.zjh_man05_mp3
              ,res.zjh_man09_mp3,res.zjh_man10_mp3]];

        this.mFaceSound = [res.face01_mp3,res.face02_mp3,res.face03_mp3,res.face04_mp3,res.face05_mp3,res.face06_mp3,res.face07_mp3,res.face08_mp3,res.face09_mp3,res.face10_mp3,res.face11_mp3,res.face12_mp3,res.face13_mp3,res.face14_mp3,res.face15_mp3,res.face16_mp3,res.face17_mp3,res.face18_mp3,res.face19_mp3,res.face20_mp3,res.face21_mp3,res.face22_mp3,res.face23_mp3,res.face24_mp3,res.face25_mp3];
    },
    /**
     * 取得一组带花色的牌的各个牌值（3-17）的个数
     */
    getCardsNumArray:function(array)
    {
        var tempNumArray=[];
        for(var i=0; i < 20; i++){
            tempNumArray[i]=0;
        }
        for(i=0; i < array.length; i++){
            var n=array[i] & 0x0000000F;
            var hua=((array[i] & 0x000000F0) >> 4);
            if (n == 2){
                n=15;
            }else if (n == 15){
                n=hua == 4 ? 16 : 17;
            }
            tempNumArray[n]++;
        }
        return tempNumArray;
    },

    /**
     * 取牌的点数
     * A-9 :1-9
     * 10JQK:10
     */
    getCardPoint:function(cardValue){
        var point = 0;
        var tmp1 = cardValue&0x0000000F;
        if(tmp1>=2&&tmp1<=9){
            point = tmp1;
        }else if(tmp1==14){
            point = 1;
        }else if(tmp1==15){
            point = 2;
        }else{
            point = 10;
        }
        return point;
    },
    /**
     * 把牌 转换成点数
     */
    getCardsPoint:function(cards){
        var points = [];
        for(var i = 0;i<cards.length;i++){
            var point = this.getCardPoint(cards[i]);
            points.push(point);
        }
        return points;
    },
    /**
     * 根据牌 判断他的类型
     */
    getCardType:function(cards){
        var type=CARD_NO_NIU;
        if(cards.length!=5) return type;

        var cardpoints = this.getCardsPoint(cards);
        var cardnums = this.getCardsNumArray(cards);//1-K（3-15） 的个数
        cc.log("getCardType =="+cards.toString());
        cc.log("cardpoints =="+cardpoints.toString());

        var niupoint=cardpoints[0]+ cardpoints[1]+ cardpoints[2];
        var numpoint=cardpoints[3]+ cardpoints[4];

        var allPoint=niupoint+numpoint;
        if(this.isFiveNiu(cardpoints)){
            type = CARD_FIVE_NIU;//五小牛
        }else if(this.isBoom(cardnums)){
            type = CARD_BOOM;//炸弹
        }else{
            if(niupoint%10 == 0){
                if(numpoint%10==1){
                    type = CARD_NIU_ONE;
                }else if(numpoint%10==2){
                    type = CARD_NIU_TWO;
                }else if(numpoint%10==3){
                    type = CARD_NIU_THREE;
                }else if(numpoint%10==4){
                    type = CARD_NIU_FOUR;
                }else if(numpoint%10==5){
                    type = CARD_NIU_FIVE;
                }else if(numpoint%10==6){
                    type = CARD_NIU_SIX;
                }else if(numpoint%10==7){
                    type = CARD_NIU_SEVEN;
                }else if(numpoint%10==8){
                    type = CARD_NIU_EIGHT;
                }else if(numpoint%10==9){
                    type = CARD_NIU_NINE;
                }else if(numpoint%10==0){
                    type = CARD_NIU_NIU;
                    if(allPoint == 50){
                        if(this.isGoldNiu(cardnums)){
                            type = CARD_GOLD_NIU;
                        }else if(this.isSilverNiu(cardnums)){
                            type = CARD_SILVER_NIU;
                        }
                    }
                }
            }else{
                type = CARD_NO_NIU; //无牛
            }
        }
        return type;
    },
    /**
     * 判断牌是否五小牛
     * 五张牌的点数加起来小于10，且每张牌点数都小于5
     */
    isFiveNiu:function(cardpoints){//是否五小牛
        var result = true;
        var allPoint = 0;
        for(var i = 0;i<5;i++){
            if(cardpoints[i] < 5){
                allPoint += cardpoints[i];
            }else{
                result = false;
            }
        }
        if(allPoint > 9){
            result = false;
        }
        return result;
    },
    /**
     * 判断牌是否炸弹
     * 五张牌中有4张牌点数相同的牌型
     */
    isBoom:function(cardnums){
        var result = false;
        for(var i=2; i<16; i++)
        {
            if (cardnums[i] == 4)
            {
                result =  true;
            }
        }
        return result;
    },

    /**
     *  判断牌是否金牛
     *  五张牌全由j～k组成
     */
    isGoldNiu:function(cardnums){
        var result = false;
        if (cardnums[10] == 0){
            result = true;
        }
        return result;
    },
    /**
     *  判断牌是否银牛
     *  五张牌全由10～k组成且只有一张10
     */
    isSilverNiu:function(cardnums){
        var result = false;
        if (cardnums[10] == 1){
            result = true;
        }
        return result;
    },
    /**
     * 判断是否有牛
     * 有牛 就按牛排列  没牛返回new Array()
     */
    checkHasNiu:function(cards){
        var result = [];
        var cardpoints = this.getCardsPoint(cards);
        var cardnums = this.getCardsNumArray(cards);//1-K（3-15） 的个数

        if(this.isFiveNiu(cardpoints) || this.isBoom(cardnums)){//是炸弹或五小牛
            result = cards;
        }else{
            cc.log("checkHasNiu1----"+cards.toString());
            cc.log("checkHasNiu2----"+cardpoints.toString());
            var tmp1 = false;
            var pos = [];

            //tmp1记录是否有3张组成10
            for(var a=0;a<=2;a++){
                for(var b=a+1;b<=3;b++){
                    for(var c=b+1;c<=4;c++){
                        if((cardpoints[a]+cardpoints[b]+cardpoints[c])%10 == 0){
                            tmp1 = true;
                            pos = [a,b,c];
                            for(var j=0;j<=4;j++){
                                if(j != a && j != b && j != c){
                                    pos.push(j);
                                }
                            }
                            break;
                        }
                    }
                    if(tmp1){
                        break;
                    }
                }
                if(tmp1){
                    break;
                }
            }

            if(tmp1){
                result = [cards[pos[0]],cards[pos[1]],cards[pos[2]],cards[pos[3]],cards[pos[4]]];
            }
        }
        cc.log("checkHasNiu3----"+result.toString());
        return result;
    }

});