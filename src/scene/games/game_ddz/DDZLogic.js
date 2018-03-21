/**
 * Created by Administrator on 14-4-15.
 * 逻辑
 */

var DDZ_RESTART_STATE = 0;
var DDZ_CALLLORD_STATE = 1; // 叫地主
var DDZ_PULLCARD_STATE = 2; // 出牌状态
var DDZ_DOWNCARD_STATE = 3; //倒牌状态
var DDZ_UPCARD_STATE = 4;   //拉牌状态
var DDZ_JIABEI_STATE = 5;   //（多乐农民可加倍）


//3 4 5 6 7 8 9 10 11J 12Q 13K 14A 15_2 16小王 17大王
//数字比较:大王＞小王＞2＞A＞K＞Q＞J＞10＞9＞8＞7＞6＞5＞4＞3
//底分:叫牌的分数,也就是初始的倍数
//倍数:初始的倍数等于底分,每出一个炸弹或火箭翻1倍。(比如说本盘出了3个炸弹,则倍数变为8)
//拉牌:确定地主之后,其它非地主玩家可以选择拉牌,拉一次倍数翻倍。
//倒牌:非地主选择拉牌之后,地主可以选择倒牌,倒一次倍数翻倍。
//逻辑
var DDZLogic = cc.Class.extend({
    IFTHREE_WITH_TWO_CARD:true,//是否要3带2
    NO_CARD:-1,
    SINGLE_CARD:20,//单 牌
    DOUBLE_CARD:21,//对 牌 数值相同的2张牌
    THREE_CARD:22,//三 条 数值相同的3张牌.如3个4
    THREE_WITH_ONE_CARD:23,//三带一数值相同的3张牌＋单牌。如777＋5
    FOUR_CARD:24,//炸 弹 4张同数值牌
    FOUR_WITH_TWO_CARD:25,//四带二 炸弹＋两手牌。如aaaa+3+5、
    LINK_CARD:26,//单 顺 5张(含)以上连续单牌。如8910jqka。不包括2点和双王。
    DOUBLE_LINK_CARD:27,//双 顺 3对(含)以上连续对牌。如334455
    THREE_LINK_CARD:28,// 三顺 2个(含)以上连续三条。如jjjqqq
    THREE_WITH_LINK_CARD:29,//飞机带翅膀 三顺＋同数量的单牌jjjqqqkkk 678
    SUPER_BOOM_CARD:30,////火 箭 即双王(大王 小王) ??
    THREE_WITH_LINK_TWO_CARD:31,//飞机带翅膀 三顺＋同数量的对牌 如888999 4466 －－－没有使用
    THREE_WITH_TWO_CARD:32,//三带2 数值相同的3张牌+对牌。777+99  －－－没有使用
    FOUR_WITH_FOUR_CARD:33,//4带4 炸弹 －－－没有使用

    /**
     * 得到一组带花色的牌的数据的实际数
     *  [3,19,35,79,95]->[3,3,3,16,17]
     */
    getCardsWithoutColor:function(array)
    {
        var tempNumArray = [];
        for(var i=0; i < array.length; i++){
            var n=array[i] & 0x0000000F;
            var hua=((array[i] & 0x000000F0) >> 4);
            if (n == 2){
                n=15;
            }else if (n == 15){
                n=hua == 4 ? 16 : 17;
            }
            tempNumArray[i]=n;
        }
        return tempNumArray;
    },
    /**
     * 取得一组带花色的牌的各个牌值（3-17）的个数
     * [3,19,35,79,95]->[0,0,0,3,0, 0,0,0,0,0, 0,0,0,0,0, 0,1,1,0,0]
     */
    getCardsNumArray:function(array)
    {
        var tempNumArray = [];
        for(var i=0; i < 20; i++){
            tempNumArray[i]=0;
        }
        for(i=0; i < array.length; i++){
            var n= array[i] & 0x0000000F;
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
    /*
    * 取一个数的没有花色的大小*********************
    * 95->17   19->3
    */
    getNumWithoutColor:function(cardValue)
    {
        if (cardValue == 15){ //2 转成的
            return 15;
        }
        var cardNum=cardValue & 0x0000000F;
        var hua=((cardValue & 0x000000F0) >> 4);
        if (cardNum == 2){
            cardNum=15;
        }else if (cardNum == 15){
            cardNum=hua == 4 ? 16 : 17;
        }
        return cardNum;
    },
    /**
     * 一组牌的各个牌的牌的个数,取最开始的牌****************************************
     * [0,0,0,3,0, 0,0,0,0,0, 0,0,0,0,0, 0,1,1,0,0]
     * type 1234 去最小的单 双 三 四
     */
    getStartCardNum:function(array,type)
    {
        if(type==null){ type = 1;}
        var StartNum=0;
        for(var i = 0; i < array.length; i++){
            if (array[i] > type-1){
                StartNum=i;
                break;
            }
        }
        return StartNum;
    },
    /**
     * 检测所选牌型是否合法,返回出牌的类型
     * ShowOut_Num:出牌的总个数,ShowOut_Card:出牌各牌的个数数组
     */
    getOutCardType:function(cardArray){
        var ShowOut_Num= cardArray.length;
        var ShowOut_Card= this.getCardsNumArray(cardArray);
        var Start_Card= this.getStartCardNum(ShowOut_Card); //获取最小牌
        var i = 0;
        switch(ShowOut_Num)
        {
            case 1: //单张（3）
                return this.SINGLE_CARD;
                break;
            case 2: //一对（33） 或 大小王
                if (Start_Card == 16){ //小王开始
                    return this.SUPER_BOOM_CARD;
                }else if ((ShowOut_Card[Start_Card] == 2)){ //一对
                    return this.DOUBLE_CARD;
                }
                break;
            case 3: // 三 条 （333）
                if ((ShowOut_Card[Start_Card] == 3)){
                    return this.THREE_CARD;
                }
                break;
            case 4: // 炸弹 （3333） 或 3带1 （3334）
                if ((ShowOut_Card[Start_Card] == 4)){//炸弹
                    return this.FOUR_CARD;
                }else{ //3带1
                    for(i=Start_Card; i < ShowOut_Card.length; i++){
                        if (ShowOut_Card[i] >= 3){
                            Start_Card=i;
                            return this.THREE_WITH_ONE_CARD;
                        }
                    }
                }
                break;
            case 5:  //单顺（34567），三带二（33344）
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }else if(this.IFTHREE_WITH_TWO_CARD){//允许3带2时
                    var Temp_IsHaveTwo=false;
                    for(i=Start_Card; i < ShowOut_Card.length; i++){
                        if (ShowOut_Card[i] == 2){
                            Temp_IsHaveTwo=true;
                        }
                    }
                    for(i=Start_Card; i < ShowOut_Card.length; i++){
                        if (ShowOut_Card[i] >= 3 && Temp_IsHaveTwo){
                            Start_Card=i;
                            return this.THREE_WITH_TWO_CARD;
                        }
                    }
                }
                break;
            case 7:
            case 11://单顺 （3456789...）
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }
                break;
            case 6:  //4种情况，单顺（345678），双顺(334455)，三顺（333444），4带2(333345)
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                    return this.THREE_LINK_CARD;
                }else{
                    for(i=Start_Card; i < 16; i++){
                        if (ShowOut_Card[i] == 4){
                            Start_Card=i;
                            return this.FOUR_WITH_TWO_CARD;
                        }
                    }
                }
                break;
            case 8: //四种情况，单顺（34567...），双顺(33445566)，飞机（3+1）*2(444555+79 )
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else{
                    for(i=Start_Card; i < 16; i++){
                        if (ShowOut_Card[i] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    var temp_two=0;
                    var temp_four=0;
                    for(i=0; i < 16; i++){
                        if (ShowOut_Card[i] == 2){
                            temp_two++;
                        }else if (ShowOut_Card[i] == 4){
                            temp_four++;
                        }
                    }
                    if (temp_two == 2 && temp_four == 1){
                        return this.NO_CARD; //FOUR_WITH_TWO_CARD;
                    }
                    if (this.IsLinkWithCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_CARD;
                    }
                }
                break;
            case 9://两种情况,单顺(34567...)，三顺(333444555)
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                    return this.THREE_LINK_CARD;
                }
                break;
            case 10: //三种情况，单顺(34567...)，双顺(3344556677)，飞机（3+2）*2(3334446688)
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else if (this.IFTHREE_WITH_TWO_CARD){ //允许3带2时
                    for(i=Start_Card; i < 14; i++){
                        if (ShowOut_Card[i] >= 3&&ShowOut_Card[i+1] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    if (this.IsLinkWithTwoCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_TWO_CARD;
                    }
                }
                break;
            case 12://四种情况,单顺(34567...)，双顺(33445566..)，三顺(333444555666)，飞机（3+1）*3
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 1)){
                    return this.LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                    return this.THREE_LINK_CARD;
                }else{
                    for(i=Start_Card; i < 13; i++){
                        if (ShowOut_Card[i] >= 3&&ShowOut_Card[i+1] >= 3&&ShowOut_Card[i+2] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    if (this.IsLinkWithCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_CARD;
                    }
                }
                break;
            case 14://双顺
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }
                break;
            case 15: // 三顺,飞机（3+2）*3
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                    return this.THREE_LINK_CARD;
                }else if(this.IFTHREE_WITH_TWO_CARD){
                    for(i=Start_Card; i < 13; i++){
                        if (ShowOut_Card[i] >= 3&&ShowOut_Card[i+1] >= 3&&ShowOut_Card[i+2] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    if (this.IsLinkWithTwoCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_TWO_CARD;
                    }
                }
                break;
            case 16://飞机（3+1）*4 ,双顺
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else{
                    for(i=Start_Card; i < 12; i++){
                        if (ShowOut_Card[i] >= 3&&ShowOut_Card[i+1] >= 3&&ShowOut_Card[i+2] >= 3&&ShowOut_Card[i+3] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    if (this.IsLinkWithCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_CARD;
                    }
                }
                break;
            case 18://双顺，3顺
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                    return this.THREE_LINK_CARD;
                }
                break;
            case 20: //飞机（3+1）*5，双顺  飞机（3+2）*4
                if (this.IsLinkCard(Start_Card, ShowOut_Card, ShowOut_Num, 2)){
                    return this.DOUBLE_LINK_CARD;
                }else{
                    for(i=Start_Card; i < 11; i++){
                        if (ShowOut_Card[i] >= 3&&ShowOut_Card[i+1] >= 3&&ShowOut_Card[i+2] >= 3&&ShowOut_Card[i+3] >= 3&&ShowOut_Card[i+4] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    if (this.IsLinkWithCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_CARD;
                    }
                }
                if (this.IFTHREE_WITH_TWO_CARD){
                    for(i=Start_Card; i < 13; i++){
                        if (ShowOut_Card[i] >= 3&&ShowOut_Card[i+1] >= 3&&ShowOut_Card[i+2] >= 3&&ShowOut_Card[i+3] >= 3){
                            Start_Card=i;
                            break;
                        }
                    }
                    if (this.IsLinkWithTwoCard(Start_Card, ShowOut_Card, ShowOut_Num, 3)){
                        return this.THREE_WITH_LINK_TWO_CARD;
                    }
                }
                break;
            default:
                return this.NO_CARD;
                break;
        }
        return this.NO_CARD;
    },
    //顺 (单顺 双顺 3顺)  aType（1-3）
    IsLinkCard:function(Start_Card, ShowOut_Card, ShowOut_Num, aType)
    {
        var temp_link_length=0;
        var temp_limit_length=Start_Card + ShowOut_Num / aType;//3,10
        if (temp_limit_length > 15){//A 14 2_15
            return false;
        }
        for(var i=Start_Card; i < temp_limit_length; i++) {
            if (ShowOut_Card[i] >= aType){
                temp_link_length++;
            }
        }
        if (temp_link_length == (ShowOut_Num / aType)){
            return true;
        }else{
            return false;
        }
    },
    //31 顺带  aType=3
    IsLinkWithCard:function(Start_Card, ShowOut_Card, ShowOut_Num, aType)
    {
        var temp_limit_length=Start_Card + ShowOut_Num / (aType + 1);//3,10
        var temp_max_len=0;
        for(var i=Start_Card; i < temp_limit_length && i < 15; i++) {
            if (ShowOut_Card[i] >= aType){
                temp_max_len++;
            }
        }
        if (temp_max_len == (ShowOut_Num / (aType + 1))){
            return true;
        }else{
            return false;
        }
    },
    //检验 3带2 顺  aType =3
    IsLinkWithTwoCard:function(Start_Card, ShowOut_Card, ShowOut_Num, aType)
    {
        var temp_limit_length=Start_Card + ShowOut_Num / (aType + 2); //3,10
        var temp_i=0;
        var temp_max_len=0;
        for(var i=Start_Card; i < temp_limit_length && i < 15; i++){
            if (ShowOut_Card[i] >= aType){
                temp_max_len++;
            }
        }
        for(var i=0; i < 16; i++){
            if (ShowOut_Card[i] == 2){
                temp_i++;
            }
        }
        if (temp_max_len == (ShowOut_Num / (aType + 2)) && temp_i == ShowOut_Num / (aType + 2)){
            return true;
        }else{
            return false;
        }
    },

    /**
     * 玩家出的牌和上家出的牌比较
     */
    Compare_Out_Card:function(leftArray, playerArray)
    {
        var canOut=false;
        var leftNumArray=this.getCardsNumArray(leftArray); //上家出牌 各牌数量
        var playerNumArray=this.getCardsNumArray(playerArray); //玩家出牌 各牌数量
        var leftNum=leftArray.length;//上家出牌数
        var playerNum=playerArray.length;
        var leftoutType=this.getOutCardType(leftArray);//上家出牌类型
        var type =this.getOutCardType(playerArray);//玩家出牌类型
        if (type == leftoutType){//类型相同
            if (leftArray.length == playerArray.length){ //牌张数 必须一样
               canOut=this.Compare_Out_Card_SameType(leftoutType, leftNumArray, playerNumArray);//类型相同
            }
        }else{
            if (type == this.FOUR_CARD){
                if (leftoutType != this.SUPER_BOOM_CARD){
                    canOut=true;//如果玩家出炸弹并且上家出的不是火箭
                }
            }else if (type == this.SUPER_BOOM_CARD){
                canOut=true;//玩家出火箭
            }
        }
        return canOut;
    },
    /**
     * OutType:上家的出牌类型,leftArray:上家牌的个数数组,playerArray:玩家出牌的各牌个数
     */
    Compare_Out_Card_SameType:function(OutType, leftArray, playerArray)
    {
        var i=0;
        var leftStart=this.getStartCardNum(leftArray);
        var playerStart=this.getStartCardNum(playerArray);
        switch(OutType)
        {
            case this.NO_CARD:
                return false;
                break;
            case this.SINGLE_CARD:
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.DOUBLE_CARD:
                if (leftStart == 16){
                    return false;//2王 火箭   没有对王
                }if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.THREE_CARD:
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.THREE_WITH_ONE_CARD: //  3带1 如777＋5    888+3
            case this.THREE_WITH_TWO_CARD://  3带2 如444+66 777+99
                leftStart=this.getStartCardNum(leftArray,3);
                playerStart=this.getStartCardNum(playerArray,3);
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.FOUR_CARD://炸弹4张牌
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.FOUR_WITH_TWO_CARD: //四带二 炸弹＋两手牌
            //case this.FOUR_WITH_FOUR_CARD:///4带4 炸弹  比最大的
                leftStart=this.getStartCardNum(leftArray,4);
                playerStart=this.getStartCardNum(playerArray,4);
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.LINK_CARD://单顺 5张(含)以上连续单牌。如8910jqk
            case this.DOUBLE_LINK_CARD://双 顺 3对(含)以上连续对牌。如334455
            case this.THREE_LINK_CARD:// 三顺 2个(含)以上连续三条。如jjjqqq
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.THREE_WITH_LINK_TWO_CARD://飞机带翅膀 三顺＋同数量的对牌 如888999 4466
            case this.THREE_WITH_LINK_CARD:////飞机带翅膀 三顺＋同数量的单牌jjjqqqkkk 678
                leftStart=this.getStartCardNum(leftArray,3);
                playerStart=this.getStartCardNum(playerArray,3);
                if (playerStart > leftStart){
                    return true;
                }
                break;
            case this.SUPER_BOOM_CARD: //火箭
                return false;
                break;
        }
        return false;
    },




    //提示出牌AI*******************************************************
    /**
     *  leftArray上家牌(已经排序并且不带花色), 玩家cardArray牌的数组(不带花色)
     */
    AI_Out_Card:function(leftArray, cardArray, isdaida)
    {
        //trace(" ai="+leftArray.toString()+":"+cardArray.toString());
        var outArray=[];
        var cardNum=leftArray.length;
        var leftNumArray=this.getCardsNumArray(leftArray);
        var leftStart=this.getStartCardNum(leftNumArray);//最小牌
        var cardType=this.getOutCardType(leftArray); //上家出牌类型
        var cardNumArray=this.getCardsNumArray(cardArray);
        var sType=-1;
        sType=this.getOutCardType(cardArray); //玩家牌类型
        switch(cardNum)
        {
            case 1:
                if (sType != this.FOUR_CARD && sType != this.SUPER_BOOM_CARD){
                    outArray = this.get_SINGLE_CARD_out(leftStart, cardNumArray);//找单牌
                }
                break;
            case 2:
                if (cardType != this.SUPER_BOOM_CARD){
                    if (sType != this.FOUR_CARD){
                        outArray=this.get_DOUBLE_CARD_out(leftStart, cardNumArray);//找对子 55
                    }
                }
                break;
            case 3:
                if (sType != this.FOUR_CARD){
                    outArray=this.get_THREE_CARD_out(leftStart, cardNumArray); //找3张 444
                }
                break;
            case 4:
                if (cardType ==this.FOUR_CARD){
                    outArray=this.get_FOUR_CARD_out(leftStart, cardNumArray);//找炸弹
                }else if (cardType == this.THREE_WITH_ONE_CARD){//3带1 如777＋5
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_ONE_CARD_out(leftStart, cardNumArray);//找3带1
                }
                break;
            case 5:
                if (cardType ==this.LINK_CARD){ //顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 5, cardNumArray);//找顺子
                }else if (cardType == this.THREE_WITH_TWO_CARD){ //3带2
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_TWO_CARD_out(leftStart, cardNumArray); //找3带2
                }
                break;
            case 6:
                if (cardType == this.LINK_CARD){//顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 6, cardNumArray);//找顺子
                }else if (cardType == this.DOUBLE_LINK_CARD){//双 顺 如334455
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 3, cardNumArray);
                }else if (cardType == this.THREE_LINK_CARD) {// 三顺 如jjjqqq
                    outArray=this.get_THREE_LINK_CARD_out(leftStart, 2, cardNumArray);
                }else if (cardType == this.FOUR_WITH_TWO_CARD){ //四带二 如aaaa+3+5、
                    leftStart=this.getStartCardNum(leftNumArray,4);//多牌对应的最小
                    outArray=this.get_FOUR_WITH_TWO_CARD_out(leftStart, cardNumArray);//找4带2
                }
                break;
            case 7:
                if (cardType == this.LINK_CARD){//顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 7, cardNumArray); //找顺子
                }
                break;
            case 8://四种情况，单，双，6带2，4带2+2
                if (cardType == this.LINK_CARD){//顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 8, cardNumArray); //找顺子
                }else if (cardType == this.DOUBLE_LINK_CARD){//双 顺 如33445566
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 4, cardNumArray);
                }else if (cardType == this.THREE_WITH_LINK_CARD){//飞机带翅膀 三顺＋同数量的单牌jjjqqq 67
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_LINK_CARD_out(leftStart, 2, cardNumArray);
                }else if (cardType == this.FOUR_WITH_TWO_CARD){//4带2+2
                    //leftStart=this.getStartCardNum(leftNumArray,4);//多牌对应的最小
                    //outArray=this.get_FOUR_WITH_TWO_HAND_CARD_out(leftStart, cardNumArray);
                }
                break;
            case 9: //两种情况,单顺，三顺
                if (cardType == this.LINK_CARD){//顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 9, cardNumArray); //找顺子
                }else if (cardType == this.THREE_LINK_CARD){// 三顺 如333444555
                    outArray=this.get_THREE_LINK_CARD_out(leftStart, 3, cardNumArray);
                }
                break;
            case 10://三种情况，单顺，双顺，6带4
                if (cardType == this.LINK_CARD){ //顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 10, cardNumArray);
                }else if (cardType == this.DOUBLE_LINK_CARD){//双 顺 如3344556677
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 5, cardNumArray);
                }else if (cardType == this.THREE_WITH_LINK_TWO_CARD){//三顺＋同数量的对牌 如888999 4466
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_LINK_TWO_CARD_out(leftStart, 2, cardNumArray);
                }
                break;
            case 11:
                if (cardType == this.LINK_CARD){ //顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 11, cardNumArray);//找顺子
                }
                break;
            case 12: //四种情况,单顺，双顺，三顺，9带3
                if (cardType == this.LINK_CARD){//顺子
                    outArray=this.get_LINK_CARD_out(leftStart, 12, cardNumArray);
                }else if (cardType == this.DOUBLE_LINK_CARD){//双 顺 如334455667788
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 6, cardNumArray);
                }else if (cardType == this.THREE_LINK_CARD){// 三顺 如333444555666
                    outArray=this.get_THREE_LINK_CARD_out(leftStart, 4, cardNumArray);
                }else if (cardType == this.THREE_WITH_LINK_CARD){//飞机带翅膀 三顺＋同数量的单牌333444555 678
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_LINK_CARD_out(leftStart, 3, cardNumArray);
                }
                break;
            case 14://双顺
                if (cardType == this.DOUBLE_LINK_CARD){ //双 顺 如33445566778899
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 7, cardNumArray);
                }
                break;
            case 15:// 三顺,9带6
                if (cardType == this.THREE_LINK_CARD){ // 三顺 如333444555666777
                    outArray=this.get_THREE_LINK_CARD_out(leftStart, 5, cardNumArray);
                }else if (cardType == this.THREE_WITH_LINK_TWO_CARD){//三顺＋同数量的对牌 如777888999 334466
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_LINK_TWO_CARD_out(leftStart, 3, cardNumArray);
                }
                break;
            case 16: //12带4 ,双顺
                if (cardType == this.DOUBLE_LINK_CARD){//双 顺 如334455667788991010
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 8, cardNumArray);
                }else if (cardType == this.THREE_WITH_LINK_CARD){ //飞机带翅膀 三顺＋同数量的单牌333444555666 78910
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_LINK_CARD_out(leftStart, 4, cardNumArray);
                }
                break;
            case 18: //双顺  三顺
                if (cardType == this.DOUBLE_LINK_CARD){ //双 顺 如3344556677889910101111
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 9, cardNumArray);
                }else if (cardType == this.THREE_LINK_CARD){// 三顺 如333444555666777888
                    outArray=this.get_THREE_LINK_CARD_out(leftStart, 6, cardNumArray);
                }
                break;
            case 20: //15带5，双顺 ----不予考虑
                if (cardType == this.DOUBLE_LINK_CARD){//双 顺 如3344556677889910101111
                    outArray=this.get_DOUBLE_LINK_CARD_out(leftStart, 10, cardNumArray);
                }else if (cardType == this.THREE_WITH_LINK_CARD){//飞机带翅膀 三顺＋同数量的单牌333444555666777 8910jq
                    leftStart=this.getStartCardNum(leftNumArray,3);//多牌对应的最小
                    outArray=this.get_THREE_WITH_LINK_CARD_out(leftStart, 5, cardNumArray);
                }
                break;
            default:
                outArray=[];
                break;
        }
        //trace(" out ="+outArray.toString());
        //最后如果没有同类型的牌,看有没有炸弹
        if (isdaida == false){
            if (outArray.length == 0 && cardType != this.SUPER_BOOM_CARD && cardType != this.FOUR_CARD && leftArray.length > 0){
                outArray=this.find_FOUR_CARD_out(cardNumArray);
            }
            //最后如果没有同类型的牌,看有没有火箭
            if (outArray.length == 0 && leftArray.length > 0){
                outArray=this.get_SUPER_BOOM_CARD_out(cardNumArray);
            }
        }else{
            if (cardArray.length <= 10){
                if (outArray.length == 0 && cardType != this.SUPER_BOOM_CARD && cardType !=this.FOUR_CARD && leftArray.length > 0) {
                    outArray=this.find_FOUR_CARD_out(cardNumArray);
                }
                //最后如果没有同类型的牌,看有没有火箭
                if (outArray.length == 0 && leftArray.length > 0){
                    outArray=this.get_SUPER_BOOM_CARD_out(cardNumArray);
                }
            }
        }
        return outArray;

    },
    /**
     * 取一组带花色牌的 最小单牌（没单牌时 拆双.）
     */
    getMinSingleCard_out:function(array)
    {
        var minCard=[];
        var tempNumArray=this.getCardsWithoutColor(array);
        for(var i=tempNumArray.length - 1; i >= 0; i--){
            if (tempNumArray[i] == 1){
                minCard.push(tempNumArray[i]);
                break;
            }
        }
        if (minCard.length == 0){
            for(var i=tempNumArray.length - 1; i >= 0; i--){
                if (tempNumArray[i] > 0){
                    minCard.push(tempNumArray[i]);
                    break;
                }
            }
        }
        return minCard;
    },
    /**
     * 取一组带花色牌的开始牌，即最大牌
     */
    getMaxSingleCard_out:function(array)
    {
        var maxCard=[];
        var tempNumArray=this.getCardsWithoutColor(array);
        for(var i=0; i < tempNumArray.length; i++){
            if (tempNumArray[i] > 1){
                maxCard.push(tempNumArray[i]);
                break;
            }
        }
        return maxCard;
    },
    //取比startNum大的最小的单牌****************************************
    get_SINGLE_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        //找开始的牌   找小于王的单牌
        for(var i=0; i< numarray.length; i++){
            if (numarray[i] == 1 && i > startNum && i < 16){
                tmp.push(i);
                break;
            }
        }
        if (tmp.length == 0)//如果只一个王 出王
        {
            if (numarray[16] == 1 && numarray[17] == 0 && 16 > startNum){
                tmp.push(16);
            }
            if (numarray[17] == 1 && numarray[16] == 0){
                tmp.push(17);
            }
        }
        if (tmp.length == 0){//拆2出
            if (numarray[15] > 0 && 15 > startNum){
                tmp.push(15);
            }
        }
        if (tmp.length == 0){//拆 牌出
            for(var i=0; i < numarray.length; i++){
                if (numarray[i] > 0 && i > startNum){
                    tmp.push(i);
                    break;
                }
            }
        }
        //trace("numarray="+ numarray.toString()+" tmp="+tmp.toString());
        return tmp;
    },

    //取比startNum大的最小的双牌*****************************************
    get_DOUBLE_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] == 2 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                break;
            }
        }
        if (tmp.length == 0){
            for(var i=0; i < numarray.length; i++){
                if (numarray[i] == 3 && i > startNum){
                    tmp.push(i);
                    tmp.push(i);
                    break;
                }
            }
        }
        if (tmp.length == 0){
            for(var i=0; i < numarray.length; i++){
                if (numarray[i] == 4 && i == 15){
                    tmp.push(i);
                    tmp.push(i);
                    break;
                }
            }
        }
        return tmp;
    },
    //取比startNum大的最小的三 条*****************************************
    get_THREE_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] == 3 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                break;
            }
        }
        return tmp;
    },

    //取比startNum大的最小的三带一*****************************************
    get_THREE_WITH_ONE_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        var n3=0;
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] == 3 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                n3=i;
                break;
            }
        }
        for(i=0; i < numarray.length; i++){
            if (numarray[i] == 1 && i != n3 && i < 15) {
                tmp.push(i);
                break;
            }
        }
        if (tmp.length == 3){
            for(i=0; i < numarray.length; i++){
                if (numarray[i] > 0 && i != n3){
                    tmp.push(i);
                    break;
                }
            }
        }
        if (tmp.length != 4){
            tmp=[];
        }
        return tmp;
    },

    //取比startNum大的最小的三带2*****************************************
    get_THREE_WITH_TWO_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        var n3=0;
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] >= 3 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                n3=i;
                break;
            }
        }
        for(i=0; i < numarray.length; i++){
            if (numarray[i] >= 2 && i != n3){
                tmp.push(i);
                tmp.push(i);
                break;
            }
        }
        if (tmp.length != 5){
            tmp=[];
        }
        return tmp;
    },
    //取比startNum大的最小的炸弹*****************************************
    get_FOUR_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] >= 4 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                break;
            }
        }
        return tmp;
    },

    //取比startNum大的最小的顺子 5张(含)以上连续单牌。如34567 ,45678。a14不包括15_2点和双王。 *****************************************
    get_LINK_CARD_out:function(startNum, linkNum, numarray)
    {
        var n=0;
        var tmp=[];
        for(var j=startNum + 1; j <= 10; j++){//最多从10开始。过了就超过了
            tmp=[];
            n=0;
            for(var i=j; i < 15; i++){
                if (numarray[i] > 0){
                    tmp.push(i);
                    n++;
                    if (n == linkNum){
                        break;
                    }
                }else{
                    break;
                }
            }
            if (tmp.length == linkNum){
                break;
            }
        }
        if (tmp.length < linkNum){
            tmp=[];
        }
        return tmp;
    },
    //取比startNum大的最小的双 顺 3对(含)以上连续对牌。如334455。 *****************************************
    get_DOUBLE_LINK_CARD_out:function(startNum, linkNum, numarray)
    {
        var n=0;
        var tmp=[];
        for(var j=startNum + 1; j < 13; j++){
            //最多从12Q开始。过了就超过了
            tmp=[];
            n=0;
            for(var i=j; i < 15; i++){
                if (numarray[i] >= 2){
                    tmp.push(i);
                    tmp.push(i);
                    n++;
                    if (n == linkNum){
                        break;
                    }
                }else{
                    break;
                }
            }
            if (tmp.length == linkNum * 2){
                break;
            }
        }
        if (tmp.length != linkNum * 2){
            tmp=[];
        }
        return tmp;
    },

    //取比startNum大的最小的3顺 3对(含)以上连续对牌。如333444。 *****************************************
    get_THREE_LINK_CARD_out:function(startNum, linkNum, numarray)
    {
        var n=0;
        var tmp=[];
        for(var j=startNum + 1; j < 14; j++){//最多从13k开始。过了就超过了
            tmp=[];
            n=0;
            for(var i=j; i < 15; i++){
                if (numarray[i] >= 3){
                    tmp.push(i);
                    tmp.push(i);
                    tmp.push(i);
                    n++;
                    if (n == linkNum){
                        break;
                    }
                }else{
                    break;
                }
            }
            if (tmp.length == linkNum * 3){
                break;
            }
        }
        if (tmp.length != linkNum * 3){
            tmp=[];
        }
        return tmp;
    },

    ///四带二 。如aaaa+3+5、
    get_FOUR_WITH_TWO_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        var n4=0;

        for(var i=0; i < numarray.length; i++){
            if (numarray[i] >= 4 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                n4=i;
                break;
            }
        }
        var n=0;
        for(i=0; i < numarray.length; i++){
            if (numarray[i] > 0 && i != n4 && i != 16){//4-8 不要王??
                tmp.push(i);
                n++;
                if (n == 2){
                    break;
                }
            }
        }
        if (tmp.length != 6){
            tmp=[];
        }
        return tmp;
    },

    ///四带二对 。如4444+33+55、四带二：四张牌＋两手牌。（注意：四带二不是炸弹）。
    get_FOUR_WITH_TWO_HAND_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        var n4=0;
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] >= 4 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                n4=i;
                break;
            }
        }
        var n=0;
        for(i=0; i < numarray.length; i++){
            if (numarray[i] >= 2 && i != n4){
                tmp.push(i);
                tmp.push(i);
                n++;
                if (n == 2){
                    break;
                }
            }
        }
        if (tmp.length != 8){
            tmp=[];
        }
        return tmp;
    },

    //四带4 。如3333 4444
    get_FOUR_WITH_FOUR_CARD_out:function(startNum, numarray)
    {
        var tmp=[];
        var n4=0;
        var n=0;
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] >= 4 && i > startNum){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                n4=i;
                n++;
                if (n == 2){
                    break;
                }
            }
        }
        if (tmp.length != 8) {
            tmp=[];
        }
        return tmp;

    },
    //飞机带翅膀 三顺＋同数量的单牌333444555 678
    get_THREE_WITH_LINK_CARD_out:function(startNum, linkNum, numarray)
    {
        //先找3顺
        var tmp=this.get_THREE_LINK_CARD_out(startNum, linkNum, numarray);
        if (tmp.length == 0){
            tmp=[];
        }else{
            var n=0;
            for(var i=0; i < numarray.length; i++){
                if (numarray[i] > 0 && numarray[i] < 3){
                    tmp.push(i);
                    n++;
                    if (n == linkNum){
                        break;
                    }
                }
            }
        }
        if (tmp.length != linkNum * 4){
            tmp=[];
        }
        return tmp;
    },
    //飞机带翅膀 三顺＋同数量的双牌  如888999 4466
    get_THREE_WITH_LINK_TWO_CARD_out:function(startNum, linkNum, numarray)
    {
        //先找3顺
        var tmp=this.get_THREE_LINK_CARD_out(startNum, linkNum, numarray);
        if (tmp.length == 0){
            tmp=[];
        }else{
            var n=0;
            for(var i=0; i < numarray.length; i++){
                if (numarray[i] > 1 && this.exitNum(i, tmp) == false){
                    tmp.push(i);
                    tmp.push(i);
                    n++;
                    if (n == linkNum){
                        break;
                    }
                }
            }
        }
        if (tmp.length != linkNum * 5){
            tmp=[];
        }
        return tmp;
    },
    //查找有没有火箭 *****************************************
    get_SUPER_BOOM_CARD_out:function(numarray)
    {
        var tmp=[];
        if (numarray[16] == 1 && numarray[17] == 1){
            tmp.push(0x4F);
            tmp.push(0x5F);
        }
        return tmp;
    },
    //查找有没有炸弹*****************************************
    find_FOUR_CARD_out:function(numarray)
    {
        var tmp=[];
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] >= 4){
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                tmp.push(i);
                break;
            }
        }
        return tmp;
    },
    //判断一个数在不在一个数组
    exitNum:function(n, arr){
        for(var i=0; i < arr.length; i++){
            if (n == arr[i]){
                return true;
            }
        }
        return false;
    },
    //自己出牌  取最小的3顺 3对(含)以上连续对牌。如333444。 *****************************************
    getTHREELINKCARD_out_me:function(numarray)
    {
        var n=0;
        var tmp=[];
        for(var j=3; j < 14; j++){
            //最多从13K开始。过了就超过了
            tmp=[];
            n=0;
            for(var i=j; i < 15; i++){
                if (numarray[i] == 3){
                    tmp.push(i);
                    tmp.push(i);
                    tmp.push(i);
                    n++;
//                    if (n >= 2){
//                        break;
//                    }
                }else{
                    break;
                }
            }
            if (tmp.length >= 6){
                break;
            }
        }
        if (tmp.length < 6){
            tmp=[];
        }
        return tmp;
    },
    //自己出牌  取最小的3带2顺
    getMinTHREEWITHTWOLINKCARD_out_me:function(numarray)
    {
        //先找3顺
        numarray = this.getCardsNumArray(numarray);
        var tmp= this.getTHREELINKCARD_out_me(numarray);
        var tmplen=0;
        if (tmp.length == 0){
            tmp = []
        }else{
            tmplen=tmp.length;
            var linkNum=tmp.length / 3;
            var n=0;
            for(var i=0; i < numarray.length; i++)
            {
                if (numarray[i] > 1 && numarray[i] < 4 && this.exitNum(i, tmp) == false){
                    tmp.push(i);
                    tmp.push(i);
                    n++;
                    if (n == linkNum){
                        break;
                    }
                }
            }
        }
        if (tmp.length != (tmplen * 5) / 3)
        {
            tmp=[];
        }
        return tmp;
    },
    //自己出牌  取最小的3带1顺
    getMinTHREEWITHLINKCARD_out_me:function(numarray){
        //先找3顺
        numarray=this.getCardsNumArray(numarray);
        var tmp=this.getTHREELINKCARD_out_me(numarray);
        //trace(" tmp-"+tmp.toString());
        var tmplen=0;
        if (tmp.length == 0){
            tmp= []
        }else{
            tmplen=tmp.length;
            var n=0;
            for(var i=0; i < numarray.length; i++){
                if (numarray[i] > 0 && numarray[i] < 3){
                    tmp.push(i);
                    n++;
                    if (n == (tmplen / 3)){
                        break;
                    }
                    if (numarray[i] == 2){
                        tmp.push(i);
                        n++;
                        if (n == (tmplen / 3)){
                            break;
                        }
                    }
                }
            }
        }
        if (tmp.length != (tmplen * 4) / 3){
            tmp=[];
        }
        return tmp;
    },
    //自己出牌  取最小的2顺 取一组带花色牌的最小板凳牌（不带王）***********************************************
    getMinDoubleLinkCard_out_me:function(array)
    {
        var tmp=[];
        var numarray= this.getCardsNumArray(array);
        var n=0;
        for(var j=3; j < 13; j++){  //最多从10开始。过了就超过了
            tmp= [];
            n=0;
            for(var i=j; i < 15; i++){
                if (numarray[i] >= 2){
                    tmp.push(i);
                    tmp.push(i);
                    n++;
                }else{
                    break;
                }
            }
            if (tmp.length >= 6){
                break;
            }
        }
        if (tmp.length < 6){
            tmp=[];
        }
        return tmp;
    },
    //自己出牌  取最小顺牌（不带王）***********************************************
    getMinLinkCard_out_me:function(array)
    {
        var tmp=[];
        var numarray=this.getCardsNumArray(array);
        var n=0;
        for(var j=3; j < 11; j++){
            tmp=[]
            n=0;
            for(var i = j; i < 15; i++){
                if (numarray[i] > 0){
                    tmp.push(i);
                    n++;
                }else{
                    break;
                }
            }
            if (tmp.length >= 5){
                break;
            }
        }
        if (tmp.length < 5){
            tmp=[];
        }
        return tmp;
    },
    //自己出牌  取最小3带n 没3带1找3带2（不带王） ***********************************************
    getMinThreeCardwithOne_out_me:function(array)
    {
        var minCard= []
        var numarray=this.getCardsNumArray(array);
        var n3=0;
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] == 3 && i < 15){
                minCard.push(i);
                minCard.push(i);
                minCard.push(i);
                i=n3;
                break;
            }
        }
        if (minCard.length == 3) {//有 3个 再找
            for(i=0; i < numarray.length; i++){
                if (numarray[i] == 1 && i < 16 && i != n3){
                    minCard.push(i);
                    break;
                }
            }
        }
        if (this.IFTHREE_WITH_TWO_CARD){
            if (minCard.length == 3){ //有 3个 再找
                for(i=0; i < numarray.length; i++){
                    if (numarray[i] == 2 && i < 16 && i != n3){
                        minCard.push(i);
                        minCard.push(i);
                        break;
                    }
                }
            }
        }
        return minCard;
    },
    //自己出牌  取最小对牌（不带王）***********************************************
     getMinDoubleCard_out_me:function(array)
    {
        //trace(" 查找对子");
        var minCard=[];
        var numarray=this.getCardsNumArray(array);
        for(var i=0; i < numarray.length; i++){
            if (numarray[i] == 2 && i < 15){
                minCard.push(i);
                minCard.push(i);
                break;
            }
        }
        return minCard;
    },
    //必叫 检查
    checkBijiao:function(cardarray)
    {
        var num=0;
        var numArray= this.getCardsNumArray(cardarray);
        for(var i=3; i < 14; i++){
            if (numArray[i] == 4){
                num++;
            }
        }
        num += numArray[15]; //2  1点
        num +=  2*numArray[16]; //王  2点
        num +=  2*numArray[17];
        if (num >= 4){
            return true;
        }else if (numArray[16] == 1 && numArray[17] == 1){
            return true;
        }else{
            return false;
        }
    }




});
