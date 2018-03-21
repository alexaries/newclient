/**
 * Created by Administrator on 14-4-28.
 * 显示数字
 */
var ShowNum = cc.Node.extend({
    mType:0, //1 类型
    mValue:0, // 值
    mLeftType:1,
    mShowType:0,
    mShowHui:0,

    mCSize:null,//占用大小

    mCount_start:0,
    mCount_end:0,
    mCount_time:3,
    mCount_Tar:null,
    time:0,
    mFunc:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            // 15 分
//            var rect = this.getRect(1,res.num12_png,"6");
//            var numsprite = cc.Sprite.create(res.num12_png,rect);
//            this.addChild(numsprite,1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    /**
     * 设置值
     * @param type
     * //type :1  num_1 num_1_1    15图
     //type :2  num_2  10图
     //type :3  num_3  10图
     //type :4  num_4  10图
     //type :5  num_5  10图
     //type :6  num_6  10图
     //type :7  num_7  10图
     //type :8  num_8  11图
     //type :9  num_9  11图
     //type :13  num_13  10图
     //type :14  num_14  10图
     //type :15  num_15  10图

     //type :101  luckyf_num1  10图
     //type :102  luckyf_num2  10图
     //type :103  luckyf_num3  10图
     //type :104  luckyf_num4  10图
     //type :105  luckyf_num5  10图
     * @param value
     * @param lefttype  1左 2右 3中间
     * @param showtype 0显示+ 1不显示
     * @param showhui 显示灰色 0  不 1是
     */
    setValue:function(type,value,lefttype,showtype,showhui){
        if(value == null) value = 0;
        if(showtype ==null) showtype = 0;
        if(showhui ==null) showhui = 0;
        this.removeAllChildren(true);
        this.mType = type;
        this.mValue = value;
        this.mLeftType = lefttype
        this.mShowType = showtype;
        this.mShowHui = showhui
        var vstr = ""+value;
        var numtype = 12;// numtype 1－15图 2－10图 3-11  （带小数点   11－16图 12－11图 13-12  14-12图(.-)  ）
        var twidthfactor = 1;// (数字之间的间距 系数)
        var pname = res.num_1_png;
        if(type == 1){
            numtype = 11
            twidthfactor = 0.85;
        }else if(type == 2){
            numtype = 14
            pname = res.num_2_png;
        }else if(type == 3){
            numtype = 14
            pname = res.num_3_png;
        }else if(type == 4){
            numtype = 13
            pname = res.num_4_png;
            twidthfactor = 0.9;
        }else if(type == 5){
            pname = res.num_5_png;
            twidthfactor = 0.55;
        }else if(type == 6){
            pname = res.num_6_png;
            twidthfactor = 0.85;
        }else if(type == 7){
            pname = res.num_7_png;
        }else if(type == 8){
            numtype = 13
            pname = res.num_8_png;
            twidthfactor = 0.9;
        }else if(type == 9){
            numtype = 13
            pname = res.num_9_png;
            twidthfactor = 0.9;
        }else if(type == 10){
            pname = res.num_10_png;
            twidthfactor = 0.55;
        }else if(type == 13){
            numtype = 14
            pname = res.num_13_png;
        }
        if(this.mValue > 0){
            if(showtype == 0){
                vstr = "+"+value;
            }else{
                vstr = ""+value;
            }
            if(type == 1){
                pname = res.num_1_1_png;
            }
        }
        //log("pname="+pname)
        //log("vstr="+vstr)
        var ttw = 0
        var tth = 0
        for(var i = 0;i<vstr.length;i++){
            var rect = this.getRect(numtype,pname,vstr[i]);
            var tw = rect.width*twidthfactor;
            var tempx = 0;
            if(lefttype == 2){
                tempx = - tw*(vstr.length-1)
            }else if(lefttype == 3){
                tempx = - tw*(vstr.length-1)/2
            }
            var numsprite = cc.Sprite.create(pname,rect);
            numsprite.setPosition(cc.p(tempx+tw*i,0));
            this.addChild(numsprite,1);
            if(showhui == 1){
                numsprite.setColor(cc.color(150,150,150))
            }else if(showhui == 2){
                numsprite.setColor(cc.color(200,200,200))
            }
            ttw = tw;
            tth = rect.height;
        }
        this.mCSize = cc.size(ttw*vstr.length,tth)
    },
    //获取显示大小
    getShowSize:function(){
        return this.mCSize;
    },
    //获取范围 numtype 1－15图 2－10图 3－11图
    getRect:function(numtype,name,num){
        var size = this.getWH(name);
        var width = size.width;
        var height = size.height;
        var trect = cc.rect(0,0,0,0);
        var minW = 0;
        if(numtype == 1){
            minW = width/15;
            switch (num){
                case "+":
                    trect = cc.rect(0,0,minW,height);
                    break;
                case "-":
                    trect = cc.rect(minW*2,0,minW,height);
                    break;
                default :
                    num = Number(num);
                    trect = cc.rect(minW*(5+num),0,minW,height);
                    break;
            }
        }else if(numtype == 2){
            minW = width/10;
            //log("minW="+minW+"="+num)
            switch (num){
                default :
                    trect = cc.rect(minW*num,0,minW,height);
                    break;
            }
        }else if(numtype == 3){
            minW = width/11;
            switch (num){
                case "+":
                case "-":
                    trect = cc.rect(0,0,minW,height);
                    break;
                default :
                    num = Number(num);
                    trect = cc.rect(minW*(1+num),0,minW,height);
                    break;
            }
        }else if(numtype == 11){
            minW = width/16;
            switch (num){
                case "+":
                    trect = cc.rect(0,0,minW,height);
                    break;
                case "-":
                    trect = cc.rect(minW*2,0,minW,height);
                    break;
                case ".":
                    trect = cc.rect(minW*15,0,minW,height);
                    break;
                default :
                    num = Number(num);
                    trect = cc.rect(minW*(5+num),0,minW,height);
                    break;
            }
        }else if(numtype == 12){
            minW = width/11;
            //log("minW="+minW+"="+num)
            switch (num){
                case ".":
                    trect = cc.rect(minW*10,0,minW,height);
                    break;
                default :
                    trect = cc.rect(minW*num,0,minW,height);
                    break;
            }
        }else if(numtype == 13){
            minW = width/12;
            switch (num){
                case "+":
                case "-":
                    trect = cc.rect(0,0,minW,height);
                    break;
                case ".":
                    trect = cc.rect(minW*11,0,minW,height);
                    break;
                default :
                    num = Number(num);
                    trect = cc.rect(minW*(1+num),0,minW,height);
                    break;
            }
        }else if(numtype == 14){// . -
            minW = width/12;
            switch (num){
                case ".":
                    trect = cc.rect(minW*10,0,minW,height);
                    break;
                case "-":
                    trect = cc.rect(minW*11,0,minW,height);
                    break;
                default :
                    num = Number(num);
                    trect = cc.rect(minW*num,0,minW,height);
                    break;
            }
        }

        return trect;
    },
    //获取宽高
    getWH:function(name){
        var size= cc.size(0,0);
        switch (name){
            case res.num_1_png:
            case res.num_1_1_png:
                size = cc.size(512,40);
                break;
            case res.num_2_png:
                size = cc.size(216,24);
                break;
            case res.num_3_png:
                size = cc.size(216,24);
                break;
            case res.num_4_png:
                size = cc.size(144,16);
                break;
            case res.num_5_png:
                size = cc.size(440,32);
                break;
            case res.num_6_png:
                size = cc.size(649,77);
                break;
            case res.num_7_png:
                size = cc.size(265,30);
                break;
            case res.num_8_png:
                size = cc.size(482,41);
                break;
            case res.num_9_png:
                size = cc.size(482,39);
                break;
            case res.num_10_png:
                size = cc.size(440,32);
                break;
            case res.num_13_png:
                size = cc.size(216,24);
                break;
        }
        return size;
    },

    //在（alltime）时间内变成1个新值（newnum）
    changeTo:function(newnum,alltime,func,tar){
        this.mFunc = func;
        this.mCount_time = alltime;
        this.mCount_Tar = tar
        this.showScoreAnim(newnum);
    },
    //显示动画 下分
    showScoreAnim:function(winnum){
        this.time = 0;
        this.mCount_start = this.mValue
        this.mCount_end = winnum
        this.unschedule(this.step);
        this.schedule(this.step);
    },
    //下分动画 每步改变值
    step:function (dt) {
        var runtime = this.mCount_time;
        this.time += dt;
        var changenum = (this.mCount_end - this.mCount_start);
        var num = Math.floor(changenum*(this.time)/runtime)+this.mCount_start
        if(this.time > runtime){
            num = this.mCount_end;
            this.showAnimOver();
        }
        this.setValue(this.mType,num,this.mLeftType,this.mShowType,this.mShowHui);
        //log("time="+this.time)
    },
    //显示动画结束
    showAnimOver:function(){
        this.time = 0;
        this.unschedule(this.step);
        this.setValue(this.mType,this.mCount_end,this.mLeftType,this.mShowType,this.mShowHui);
        if(this.mFunc){
            this.mFunc(this.mCount_Tar);
        }
    }

});
ShowNum.create = function () {
    var sg = new ShowNum();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
