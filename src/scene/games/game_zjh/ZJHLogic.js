/**
 * logic
 * Created by Administrator on 14-5-13.
 */
//zjh 筹码 值
var zjh_num_coin= [1,2,5,10,20,50,100,200,500,1000,2000,5000,10000,20000,50000,100000,200000,500000] //0.01,0.02,0.05,0.1,0.2,0.5,

var ZJH_NONE_STATE = 0;           	 //玩家初始
var ZJH_GAME_STATE = 1;              //游戏状态

var ZJHLogic = cc.Class.extend({

    mTalkMsg:[],
    mTalkSound:[],
    mFaceSound:[],
    init:function () {
        this.mTalkMsg = [[sResWord.w_zjh_woman_talk1,sResWord.w_zjh_woman_talk2,sResWord.w_zjh_woman_talk3,sResWord.w_zjh_woman_talk4,sResWord.w_zjh_woman_talk5,
            sResWord.w_zjh_woman_talk6,sResWord.w_zjh_woman_talk7,sResWord.w_zjh_woman_talk8,sResWord.w_zjh_woman_talk9,sResWord.w_zjh_woman_talk10,
            sResWord.w_zjh_woman_talk11,sResWord.w_zjh_woman_talk12],
            [sResWord.w_zjh_man_talk1,sResWord.w_zjh_man_talk2,sResWord.w_zjh_man_talk3,sResWord.w_zjh_man_talk4,sResWord.w_zjh_man_talk5,
                sResWord.w_zjh_man_talk8,sResWord.w_zjh_man_talk9,sResWord.w_zjh_man_talk10]];

        this.mTalkSound = [[res.zjh_woman01_mp3,res.zjh_woman02_mp3,res.zjh_woman03_mp3,res.zjh_woman04_mp3,res.zjh_woman05_mp3,
            res.zjh_woman06_mp3,res.zjh_woman07_mp3,res.zjh_woman08_mp3,res.zjh_woman09_mp3,res.zjh_woman10_mp3,
            res.zjh_woman11_mp3,res.zjh_woman12_mp3],
            [res.zjh_man01_mp3,res.zjh_man02_mp3,res.zjh_man03_mp3,res.zjh_man04_mp3,res.zjh_man05_mp3,
                res.zjh_man08_mp3,res.zjh_man09_mp3,res.zjh_man10_mp3]];

        this.mFaceSound = [res.face01_mp3,res.face02_mp3,res.face03_mp3,res.face04_mp3,res.face05_mp3,res.face06_mp3,res.face07_mp3,res.face08_mp3,res.face09_mp3,res.face10_mp3,res.face11_mp3,res.face12_mp3,res.face13_mp3,res.face14_mp3,res.face15_mp3,res.face16_mp3,res.face17_mp3,res.face18_mp3,res.face19_mp3,res.face20_mp3,res.face21_mp3,res.face22_mp3,res.face23_mp3,res.face24_mp3,res.face25_mp3];

    },
    //获取筹码名称
    getCoinindex:function(num){
        num = formatcash(num);
        var index = 0;
        for(var i=0;i<zjh_num_coin.length;i++){
            var num_coin = zjh_num_coin[i];
            if(num_coin <= num){
                index = i;
            }else{
                break;
            }
        }
        return index;
    },
    //设置数量
    getPicNum:function(value){
        var aCoinPic = "";
        switch (value){
            case 500000:
            case 200000:
            case 100000:
            case 50000:
            case 20000:
            case 10000:
            case 5000:
            case 2000:
            case 1000:
            case 500:
            case 200:
            case 100:
            case 50:
            case 20:
            case 10:
            case 5:
            case 2:
            case 1:
            case 0.5:
            case 0.2:
            case 0.1:
            case 0.05:
            case 0.02:
            case 0.01:
                aCoinPic  ="b_"+value+".png";
                break
            default:
                aCoinPic  ="b_1.png";
                break;
        }
        return aCoinPic;
    },
    //
    getHeadsPos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(70,95)
        var pos1 = cc.p(size.width-70,size.height - 345)
        var pos2 = cc.p(size.width-70,size.height - 150)
        var pos3 = cc.p(70,size.height - 150)
        var pos4 = cc.p(70,size.height- 345)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getScorePos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2,100)
        var pos1 = cc.p(size.width-70,size.height - 345-30)
        var pos2 = cc.p(size.width-70,size.height - 150-30)
        var pos3 = cc.p(70,size.height - 150-30)
        var pos4 = cc.p(70,size.height- 345-30)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getOPPos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2,130)
        var pos1 = cc.p(size.width-200,size.height-375)
        var pos2 = cc.p(size.width-200,size.height-180)
        var pos3 = cc.p(200,size.height-180)
        var pos4 = cc.p(200,size.height-375)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getBetNumShowPos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2,240)
        var pos1 = cc.p(size.width -210,size.height - 285)
        var pos2 = cc.p(size.width-210,size.height-90)
        var pos3 = cc.p(210,size.height-90)
        var pos4 = cc.p(210,size.height - 285)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getCardTypePos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2,100)
        var pos1 = cc.p(size.width-200,size.height-423)
        var pos2 = cc.p(size.width-200,size.height-220)
        var pos3 = cc.p(200,size.height-220)
        var pos4 = cc.p(200,size.height-423)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getWinnerPos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2-85+70,85+60)
        var pos1 = cc.p(size.width-270+70,size.height-415+50)
        var pos2 = cc.p(size.width-270+70,size.height-210+50)
        var pos3 = cc.p(150+70,size.height-215+50)
        var pos4 = cc.p(150+70,size.height-415+50)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getCardPos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2-85,85)
        var pos1 = cc.p(size.width-225,size.height-415)
        var pos2 = cc.p(size.width-225,size.height-220)
        var pos3 = cc.p(150,size.height-220)
        var pos4 = cc.p(150,size.height-415)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    },
    getCardResultPos:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2-85,85)
        var pos1 = cc.p(size.width-270,size.height-415)
        var pos2 = cc.p(size.width-270,size.height-220)
        var pos3 = cc.p(150,size.height-215)
        var pos4 = cc.p(150,size.height-415)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        return pos;
    }
});