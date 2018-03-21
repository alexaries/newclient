/**
 * Created by Administrator on 14-5-7.
 * 各种 sprite视图 创建
 */




/**
 * 背景 纯色 9宫格 ，直接拉伸 中间有斑点 ，用个重复背景在中间再覆盖下
 * @param innerframe 9宫格背景
 * @param inner 重复背景
 * @param size
 * @returns {res.tblank_png}
 */
var createFrameSpriteForSysPanelInner = function(innerframe,inner,size,tsize,tpos){
    if(tsize==null){
        tsize = cc.size(15,15);
    }
    if(tpos ==null){
        tpos = cc.p(0,3);
    }
    var bgsprite = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(bgsprite != null) {

        var btnframe1 = cc.Scale9Sprite.create();
        btnframe1.initWithSpriteFrameName(innerframe);
        btnframe1.setContentSize(cc.size(size.width, size.height));
        btnframe1.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
        bgsprite.addChild(btnframe1, 0);

        var btnbg = cc.Sprite.create(inner, cc.rect(0, 0, size.width - tsize.width, size.height - tsize.height));
        if (btnbg) {
            spriteTileRepeat(btnbg);
            btnbg.setContentSize(cc.size(size.width - tsize.width, size.height-tsize.height));
            btnbg.setPosition(cc.p(size.width * 0.5+tpos.x, size.height * 0.5+tpos.y));
            bgsprite.addChild(btnbg, 1);
        }
    }
    return bgsprite;
};
var createHallListbg = function(size){
    var tsize = cc.size(15,5);
    var tpos = cc.p(0,0);
    var btnbg = createFrameSpriteForSysPanelInner("hall_table_bg.png",res.hall_list_bg_png,size,tsize,tpos);
    return btnbg;
};
var createHallTablebg = function(size){
    var btnbg = createFrameSpriteForSysPanelInner("hall_tables_bg.png",res.hall_list_bg_png,size);
    return btnbg;
};



var createWordBtn = function(size,tip, tipPoint,fontsize,color){
    var bgsprite = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(bgsprite != null){
        spriteTileRepeat(bgsprite);
        bgsprite.setContentSize(size);
        if(tip!=""){
            var label = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
            if(label!=null){
                label.setPosition(cc.p(size.width*tipPoint.x, size.height*tipPoint.y));
                label.setColor(color)
                bgsprite.addChild(label,1);
            }
        }
    }
    return bgsprite;
};

/**
 * 图片做背景 中间显示文字
 * @param bgname  图片名称
 * @param word  文字
 * @param point  文字锚点位置
 * @param fontsize 字体大小
 * @param type  0正常 1变灰
 * @returns {bgname}
 * @constructor
 */
var ButtonSpriteWithWordInner = function(bgname,word,point,fontsize,type,color){
    if(color ==null){
        color = cc.color(255,255,255);
    }

    var bgsprite = cc.Sprite.create(bgname);
    if(bgsprite != null){
        if(word!=""){
            var label = cc.LabelTTF.create(word, sGameData.mFontname, fontsize);
            if(label!=null){
                var size1 = bgsprite.getContentSize();
                label.setPosition(cc.p(bgsprite.width*point.x, bgsprite.height*point.y));
                label.setTag(8001);
                label.setColor(color);
                bgsprite.addChild(label,1);
                if(type == 2){
                    label.setColor(cc.color(72, 72, 72));
                }
            }
        }
        if(type==1){
            bgsprite.setColor(cc.color(200, 200, 200));
        }
        if(type == 2){
            bgsprite.setColor(cc.color(200, 200, 200));
        }
    }
    return bgsprite;
};

/**
 * 图片做背景 中间显示文字
 * @param bgname  图片名称
 * @param word  文字
 * @param point  文字锚点位置
 * @param fontsize 字体大小
 * @param type  0正常 1变灰
 * @returns {bgname}
 * @constructor
 */
var ButtonS9SpriteWithWordInner = function(size,bgname,word,point,fontsize,type,color){
    if(color ==null){
        color = cc.color(255,255,255);
    }
    var bgsprite = createPanel(size,bgname);
    if(bgsprite != null){
        if(word!=""){
            var label = cc.LabelTTF.create(word, sGameData.mFontname, fontsize);
            if(label!=null){
                var size1 = bgsprite.getContentSize();
                label.setPosition(cc.p(bgsprite.width*point.x, bgsprite.height*point.y));
                label.setTag(8001);
                label.setColor(color);
                bgsprite.addChild(label,1);
                if(type == 2){
                    label.setColor(cc.color(72, 72, 72));
                }
            }
        }
        if(type==1){
            bgsprite.setColor(cc.color(200, 200, 200));
        }
        if(type == 2){
            bgsprite.setColor(cc.color(200, 200, 200));
        }
    }
    return bgsprite;
};


//图片做背景 中间显示文字图片
/**
 *
 * @param bgname
 * @param wordSprite
 * @param point
 * @param type
 * @returns {bgname}
 * @constructor
 */
var ButtoSpritenWithSpriteInner = function(bgname,wordSprite,point,type){
    var bgsprite = cc.Sprite.create(bgname);
    if(bgsprite != null){
        var labelSprite = cc.Sprite.create(wordSprite);
        if(labelSprite!=null){
            var size1 = bgsprite.getContentSize();
            labelSprite.setPosition(cc.p(size1.width*point.x, size1.height*point.y));
            bgsprite.addChild(labelSprite,1);
            if(type == 2){
                labelSprite.setColor(cc.color(80, 80, 80));
            }
        }
        if(type==1){
            bgsprite.setColor(cc.color(200, 200, 200));
        }
        if(type == 2){
            bgsprite.setColor(cc.color(180, 180, 180));
        }
    }
    return bgsprite;
};
//图片做背景 中间显示文字图片
/**
 *
 * @param bgname
 * @param wordSprite
 * @param point
 * @param type
 * @returns {bgname}
 * @constructor
 */
var ButtoSpritenWithSpriteInnerLight = function(size,wordSprite,point,type){
    var bgsprite = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(bgsprite != null){
        spriteTileRepeat(bgsprite);
        bgsprite.setContentSize(size);
        var labelSprite = cc.Sprite.create(wordSprite);
        if(labelSprite!=null){
            var size1 = bgsprite.getContentSize();
            labelSprite.setPosition(cc.p(size1.width*point.x, size1.height*point.y));
            bgsprite.addChild(labelSprite,1);
        }
        if(type==1){
            var lightSprite = cc.Sprite.create("#light2.png");
            lightSprite.setPosition(cc.p(size.width*0.5,size.height*0.5));
            bgsprite.addChild(lightSprite);
        }
    }
    return bgsprite;
};
/**
 * ui 按钮
 * @param bgname
 * @param innerImg
 * @param imgPoint
 * @param tip
 * @param tipPoint
 * @param type
 * @param fontsize
 * @returns {bgname}
 */
var createButtoSpritenWithSpriteAndWord = function(bgname,innerImg,imgPoint,tip, tipPoint,type,fontsize){
    var bgsprite = cc.Sprite.create(bgname);
    if(bgsprite != null){
        var size = bgsprite.getContentSize();
        var labelSprite = cc.Sprite.create(innerImg);
        if(labelSprite!=null){
            labelSprite.setPosition(cc.p(size.width*imgPoint.x, size.height*imgPoint.y));
            bgsprite.addChild(labelSprite,1);
        }
        if(tip!=""){
            var label = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
            if(label!=null){
                label.setPosition(cc.p(size.width*tipPoint.x, size.height*tipPoint.y));
                bgsprite.addChild(label,1);
            }
        }
        if(type==1){
            bgsprite.setColor(cc.color(200, 200, 200));
        }
    }
    return bgsprite;
};
/**
 * ui 按钮
 * @param size
 * @param buttonImg
 * @param imgPoint
 * @param tip
 * @param tipPoint
 * @param type
 * @param fontsize
 * @returns {png}
 */
var createUIButtonSpriteLight = function(size,buttonImg,imgPoint,tip, tipPoint,type,fontsize,color){
    if(color == null){
        color = cc.color(255,255,255);
    }
    var bgsprite = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(bgsprite != null){
        spriteTileRepeat(bgsprite);
        bgsprite.setContentSize(size);
        var labelSprite = cc.Sprite.create(buttonImg);
        if(labelSprite!=null){
            labelSprite.setPosition(cc.p(size.width*imgPoint.x, size.height*imgPoint.y));
            bgsprite.addChild(labelSprite,1);
        }
        if(tip!=""){
            var label = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
            if(label!=null){
                label.setPosition(cc.p(size.width*tipPoint.x, size.height*tipPoint.y));
                bgsprite.addChild(label,1);
                label.setColor(color)
            }
        }
        if(type==1){
            var lightSprite = cc.Sprite.create("#light2.png");
            lightSprite.setPosition(cc.p(size.width*0.5,size.height*0.5));
            bgsprite.addChild(lightSprite);
        }
    }
    return bgsprite;
};


/**
 * 操作按钮
 * @param tip
 * @param size
 * @param type
 * @param fontsize
 * @param viptype
 * @returns {bgname}
 */
var createOpButton = function(tip,size,type,fontsize,viptype){
    if(fontsize == null){
        fontsize = 24;
    }
    if(viptype == null){
        viptype = 0;
    }
    var bgname = res.panel_button_bg_png
    var framename = "panel_button_frame.png"

    var btnbg = cc.Sprite.create(bgname, cc.rect(0, 0, size.width, size.height));
    if(btnbg){
        spriteTileRepeat(btnbg);
        btnbg.setContentSize(size);
        var btnframe = cc.Scale9Sprite.create();
        btnframe.initWithSpriteFrameName(framename);
        btnframe.setContentSize(cc.size(size.width+5*2, size.height+5*2));
        btnframe.setPosition(cc.p(size.width*0.5,size.height*0.5));
        btnbg.addChild(btnframe);
        if(type == 1){
            btnbg.setColor(cc.color(200, 200, 200));
        }
        if(tip != ""){
            var tiplabel = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
            if(tiplabel!=null){
                tiplabel.setPosition(cc.p(size.width*0.5, size.height*0.5));
                btnbg.addChild(tiplabel,1);
                tiplabel.setTag(8001);
            }
        }
    }
    return btnbg;
};
/**
 *
 * @param tip
 * @param size
 * @param type
 * @param checktype
 * @param fontsize
 * @returns {panel_button_bg_png}
 */
var createCOpButton = function(tip,size,type,checktype,fontsize){
    if(fontsize == null){
        fontsize = 24;
    }
    var btnbg = cc.Sprite.create(res.panel_button_bg_png, cc.rect(0, 0, size.width, size.height));
    if(btnbg){
        spriteTileRepeat(btnbg);
        btnbg.setContentSize(size);

        var btnframe = cc.Scale9Sprite.create();
        btnframe.initWithSpriteFrameName("panel_button_frame.png");
        btnframe.setContentSize(cc.size(size.width+5*2, size.height+5*2));
        btnframe.setPosition(cc.p(size.width*0.5,size.height*0.5));
        btnbg.addChild(btnframe);
        if(type == 1){
            btnbg.setColor(cc.color(200, 200, 200));
        }

        var checkimg = "#dzpk_panel_button_check_u.png";
        if(checktype == 1){
            checkimg = "#dzpk_panel_button_check_c.png";
        }
        var checkSprite =  cc.Sprite.create(checkimg);
        if(checkSprite){
            checkSprite.setPosition(cc.p(25 ,size.height*0.5));
            btnbg.addChild(checkSprite);
        }
        var tiplabel = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
        if(tiplabel!=null){
            tiplabel.setPosition(cc.p(size.width*0.5, size.height*0.5));
            tiplabel.setTag(8001);
            btnbg.addChild(tiplabel,1);
        }
    }
    return btnbg;
}



/**
 * ui 按钮
 * @param size
 * @param buttonImg
 * @param imgPoint
 * @param tip
 * @param tipPoint
 * @param type
 * @param fontsize
 * @returns {png}
 */
var createTabSprite_newui = function(size,tip, tipPoint,fontsize,type){
    var bgsprite = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(bgsprite != null){
        spriteTileRepeat(bgsprite);
        bgsprite.setContentSize(size);
        if(tip!=""){
            var label = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
            if(label!=null){
                label.setPosition(cc.p(size.width*tipPoint.x, size.height*tipPoint.y));
                bgsprite.addChild(label,1);
                label.setColor(cc.color(255,255,255));
            }
        }
        if(type==1){
            var lightSprite = cc.Sprite.create("#light2.png");
            lightSprite.setPosition(cc.p(size.width*0.5,size.height*0.5));
            bgsprite.addChild(lightSprite);
        }
    }
    return bgsprite;
};


/**
 *
 * @param frame
 * @param inner
 * @param tip
 * @param size
 * @param type
 * @param fontsize
 * @returns {bgname}
 */
var createFrameBtnSprite = function(frame,inner,tip,size,type,fontsize,opacity){
    if(fontsize == null){
        fontsize = 24;
    }
    if(opacity == null){
        opacity = 255;
    }


    var bgname = inner
    var framename = frame
    var btnbg = cc.Sprite.create(bgname, cc.rect(0, 0, size.width, size.height));
    if(btnbg){
        spriteTileRepeat(btnbg);
        btnbg.setContentSize(size);
        var btnframe = cc.Scale9Sprite.create();
        btnframe.initWithSpriteFrameName(framename);
        btnframe.setContentSize(cc.size(size.width+1*2, size.height+1*2));
        btnframe.setPosition(cc.p(size.width*0.5,size.height*0.5));
        if(opacity < 255){
            btnframe.setOpacity(opacity);
        }
        btnbg.addChild(btnframe);
        if(type == 1){
            btnbg.setColor(cc.color(200, 200, 200));
        }
        if(tip != ""){
            var tiplabel = cc.LabelTTF.create(tip, sGameData.mFontname, fontsize);
            if(tiplabel!=null){
                tiplabel.setPosition(cc.p(size.width*0.5, size.height*0.5));
                btnbg.addChild(tiplabel,1);
                tiplabel.setTag(8001);
            }
        }
    }
    return btnbg;
};
/**
 *
 * @param tip
 * @param size
 * @param type
 * @param showvip
 * @returns {png}
 */
var createMenuButton = function(tip,size,type,showvip){
    if(showvip ==null){
        showvip = 0;
    }

    var btnbg = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(btnbg){
        spriteTileRepeat(btnbg);
        var size_top_menu = size;
        btnbg.setContentSize(size);
        var pname = "poker_menu.png";
        var btnframe = cc.Scale9Sprite.create();
        btnframe.initWithSpriteFrameName(pname)
        btnframe.setContentSize(size_top_menu);
        btnframe.setPosition(cc.p(size.width*0.5,size.height*0.5));
        btnbg.addChild(btnframe);
        if(type == 1){
            btnframe.setColor(cc.color(200, 200, 200));
        }
        if(tip!=""){
            var tiplabel = cc.LabelTTF.create(tip, sGameData.mFontname, 24);
            if(tiplabel!=null){
                tiplabel.setPosition(cc.p(size.width*0.5, size.height*0.5));
                btnbg.addChild(tiplabel,1);
                tiplabel.setTag(8001);
            }
        }
    }
    return btnbg;
}
/**
 * 菜单上使用
 * @param tip
 * @param size
 * @param type
 * @returns {png}
 */
var createLightButton = function(tip,size,type){
    var btnbg = cc.Sprite.create(res.tblank_png,cc.rect(0, 0, size.width, size.height));
    if(btnbg){
        spriteTileRepeat(btnbg);
        btnbg.setContentSize(size);
        if(tip!=""){
            var tiplabel = cc.LabelTTF.create(tip, sGameData.mFontname, 24);
            if(tiplabel!=null){
                tiplabel.setPosition(cc.p(size.width*0.5, size.height*0.5));
                btnbg.addChild(tiplabel,1);
                tiplabel.setTag(8001);
            }
        }
        if(type == 1){
            var light = cc.Sprite.create("#hall_word_light.png");
            light.setPosition(cc.p(size.width*0.5,size.height*0.5));
            btnbg.addChild(light);
        }
    }
    return btnbg;
}

/**
 * 创建frame
 * @param frame
 * @param inner
 * @param size
 * @returns {inner}
 */
var createFrameSprite = function(frame,inner,size){
    var btnbg = cc.Sprite.create(inner, cc.rect(0, 0, size.width, size.height));
    if(btnbg){
        spriteTileRepeat(btnbg);
        btnbg.setContentSize(size);
        var btnframe = cc.Scale9Sprite.create();
        btnframe.initWithSpriteFrameName(frame);
        btnframe.setContentSize(cc.size(size.width+4*2, size.height+4*2));
        btnframe.setPosition(cc.p(size.width*0.5,size.height*0.5));
        btnbg.addChild(btnframe);
    }
    return btnbg;
};


//goods_tip_bg


/**
 *  不透明面板（9宫格）
 * @param size (panel 大小)
 * @param framepic  (panel bg 图 ，不带＃)
 * @param pot（pot 图）
 * @param dinnersize （内部大小减少）
 * @param innerpos  （内部位置偏移）
 * @param framerect (9宫格 区域)
 * @returns {cc.Scale9Sprite}
 */
var createPanel = function(size,framepic,framerect){

    var btnbg = cc.Scale9Sprite.create();
    if(framerect) {
        btnbg.initWithSpriteFrameName(framepic, framerect)
    }else{
        btnbg.initWithSpriteFrameName(framepic);
    }
    btnbg.setContentSize(size)

    return btnbg;
};

//系统
var createSysPanel = function(size){
    var btnbg = createPanel(size,"bg_panel_new.png");
    // createPanel(size,"ui_panel_bg.png",cc.rect(22,22,52,52));
    return btnbg;
};
//黄色 圆角
var createSysPanel_yellow = function(size){

    var btnbg = createPanel(size,"bg_inner_new.png");
        //createPanel(size,"ui_panel_inner_bg.png",cc.rect(17,19,53,31));
    return btnbg;
};

//黄色 直角
var createSysPanel_yellow_zj = function(size){
    var btnbg = createPanel(size,"bg_inner1_new.png");
    //    cc.Sprite.create(res.panel_inner_bg_pot_png,cc.rect(0, 0, size.width, size.height));
    //
    //var bgsprite = cc.Sprite.create(res.panel_inner_bg_pot_png, cc.rect(0, 0, size.width, size.height));
    //if (bgsprite) {
    //    spriteTileRepeat(bgsprite);
    //    bgsprite.setContentSize(cc.size(size.width, size.height));
    //    bgsprite.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    //    btnbg.addChild(bgsprite, 1);
    //}

    return btnbg;
};

//系统
var createSysPanel_munu = function(size){
    var btnbg = createPanel(size,"g_menu_bg.png",cc.rect(22,22,56,56));
    return btnbg;
};

//系统
var createSysPanel_chatyellow = function(size){
    var btnbg = createPanel(size,"ui_panel_bg_yellow.png",cc.rect(22,22,56,56));
    return btnbg;
};

//蓝色 圆角
var createSysPanel_blue = function(size){
    var btnbg = createPanel(size,"panel_inner_bg1.png",cc.rect(20,19,21,22));
    return btnbg;
};

//hei 圆角
var createSysPanel_black = function(size){
    var btnbg = createPanel(size,"panel_di_bg.png"); //,cc.rect(60,28,52,94)
    return btnbg;
};

//昵称背景
var createNickArea = function(size){
    var btnbg = createPanel(size,"poker_nick_area.png",cc.rect(13,18,38,30));
    return btnbg;
};

var createInputNew = function(size){
    var btnbg = createPanel(size,"g_bg_input_new.png");
    return btnbg;
};


//物品信息背景
var createGoodsInfoBg = function(size){
    var btnbg = createPanel(size,"goods_tip_bg.png",cc.rect(19,19,23,23));
    return btnbg;
};

//花角 蓝 半透明
var createSysPanel_t1 = function(size){
    var bgsprite = createPanel(size,"panel_t1_frame.png");
    return bgsprite;
}
//圆角 蓝 半透明
var createSysPanel_t2 = function(size){
    var bgsprite = createPanel(size,"panel_t2_frame.png");
    return bgsprite;
}
//花角 灰
var createSysPanel_t3 = function(size){
    var bgsprite = createPanel(size,"panel_t3_frame.png");
    return bgsprite;
}
//圆角 深蓝
var createSysPanel_t4 = function(size){
    var bgsprite = createPanel(size,"panel_t4_frame.png");
    return bgsprite;
}
//圆角 深蓝1
var createSysPanel_t5 = function(size){
    var bgsprite = createPanel(size,"panel_t5_frame.png");
    return bgsprite;
}

var changeTabTitleWord = function(tab,word){
    var label = tab.getChildByTag(8001);
    if(label){
        label.setString(word);
    }
}
//按钮换字
var changeBtnWord = function(btnitem,word){
    var sprite = btnitem.getNormalImage();
    var sprite1 = btnitem.getSelectedImage();
    var sprite2 = btnitem.getDisabledImage();

    changeTabTitleWord(sprite,word);
    changeTabTitleWord(sprite1,word);
    changeTabTitleWord(sprite2,word);
}

/**
 * 改变tab的状态
 * @param tabitem  要改变的tab
 * @param chooseindex 选中table的索引
 * @param index 要改变的tab的索引
 * @param word  tab上的文字
 */
var setTabState = function(tabitem,chooseindex,index,word){
    var size = cc.director.getWinSize();
    var paneltopPosY = 150;
    var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
    var size_tab_size = cc.size(220,49);
    var p = cc.p(0,0);
    if(chooseindex == index){
        tabitem.setEnabled(false);
    }else{
        tabitem.setEnabled(true);
    }
}
/**
 * 改变tab的图片
 * @param tabitem  要改变的tab
 * @param type  0:当前选中的 1没选中的
 * @param word  tab上的文字
 */
var setTabImg =function(tabitem,type,word){
    //log("setTabImg=="+type+"|"+word);
    var size_tab_size = cc.size(220,49);
    var size_tab_size1 = cc.size(220,45);
    var tabsize = size_tab_size
    var tabsprite = createTabSprite_newui(tabsize, word, cc.p(0.5,0.5),32,0);
    var tabsprite1 = createTabSprite_newui(tabsize, word, cc.p(0.5,0.5),32,1);
    var tabsprite2 = createTabSprite_newui(tabsize, word, cc.p(0.5,0.5),32,0);
    tabitem.setNormalImage(tabsprite);
    tabitem.setSelectedImage(tabsprite1);
    tabitem.setDisabledImage(tabsprite2);
    //tabitem.setContentSize(tabsize);
}

/**
 *  创建聊天显示框
 * @param size
 * @param type 0左边说话 1右边说话
 */
createMsgBG = function(size,type){
    size.width = Math.floor(size.width);
    //log("createMsgBG=="+size.width)
    var rvalue = size.width%2;
    var btnframe = cc.Scale9Sprite.create();
    if(type == 0){

        btnframe.initWithSpriteFrameName("g_showl_msgbg.png",cc.rect(20,17,69,34))
        btnframe.setAnchorPoint(cc.p(0,1));
        btnframe.setContentSize(size)

    }else{

        btnframe.initWithSpriteFrameName("g_showr_msgbg.png",cc.rect(20,17,69,34))
        btnframe.setAnchorPoint(cc.p(1,1));
        btnframe.setContentSize(size)

    }
    return btnframe
}

var changeMsgBG = function(btnframe,size,type) {
    var tag = btnframe.getChildByTag(7777);
    if(tag){
        btnframe.removeChild(tag);
    }
    btnframe.setContentSize(size)

}

var Min = function (a, b) {
    if (a === undefined) a = 0;
    if (b === undefined) b = 0;
    return a < b ? a : b;
}
var Max = function (a, b) {
    if (a === undefined) a = 0;
    if (b === undefined) b = 0;
    return a > b ? a : b;
}

/**
 * 圆角 矩形 点 坐标位置 （头像时钟）
 * @param origin  原点(左下点)  位置（cc.p）
 * @param destination   矩形框 (右上点) 大小（cc.p）
 * @param radius  转角 半径
 * @param segments  转角 点数量
 * @returns {Array}
 */
var setOperateTimeArr = function(origin, destination, radius, segments){
    var operateTimeVector = [];
    //算出1/4圆
    var coef	= 0.5 * Math.PI / segments;
    var vertices  = [];//segments+1
    for(var i = 0; i <= segments; ++i)
    {
        var thisV = cc.p()
        var rads		= (segments - i)*coef;
        thisV.x	= Math.floor(radius * Math.sin(rads));
        thisV.y	= Math.floor(radius * Math.cos(rads));
        vertices[i] = thisV;
    }

    var tagCenter = cc.p();
    var minX	= Min(origin.x, destination.x);
    var maxX	= Max (origin.x, destination.x);
    var minY	= Min(origin.y, destination.y);
    var maxY	= Max(origin.y, destination.y);
    //顶部横线右半部分
    for(var i = (maxX + minX)/2; i < maxX - radius; ++i)
    {
        operateTimeVector.push(cc.p(i,maxY));
    }
    //右上角
    tagCenter.x		= maxX - radius;
    tagCenter.y		= maxY - radius;
    for(var i = 0; i <= segments; ++i)
    {
        var thisV = vertices[segments-i];
        var p = cc.p();
        p.x	= tagCenter.x + thisV.x;
        p.y	= tagCenter.y + thisV.y;
        operateTimeVector.push(p);
    }

    //右边一横线
    for (var i = maxY - radius; i > minY + radius; --i)
    {
        operateTimeVector.push(cc.p(maxX,i));
    }

    //右下角
    tagCenter.x		= maxX - radius;
    tagCenter.y		= minY + radius;
    for(var i = 0; i <= segments; ++i)
    {
        var thisV = vertices[i];
        var p = cc.p();
        p.x	= tagCenter.x + thisV.x;
        p.y	= tagCenter.y - thisV.y;
        operateTimeVector.push(p);
    }

    //底部一横线
    for (var i = maxX - radius; i > minX + radius; --i)
    {
        operateTimeVector.push(cc.p(i,minY));
    }

    //左下角
    tagCenter.x		= minX + radius;
    tagCenter.y		= minY + radius;
    for(var i = 0; i <= segments; ++i)
    {
        var thisV = vertices[segments-i];
        var p= cc.p();
        p.x	= tagCenter.x - thisV.x;
        p.y	= tagCenter.y - thisV.y;
        operateTimeVector.push(p);
    }

    //左侧一横线
    for (var i = minY + radius; i < maxY - radius; ++i)
    {
        operateTimeVector.push(cc.p(minX,i));
    }

    //左上角
    tagCenter.x		= minX + radius;
    tagCenter.y		= maxY - radius;
    for(var i = 0; i <= segments; ++i)
    {
        var thisV = vertices[i];
        var p= cc.p();
        p.x	= tagCenter.x - thisV.x;
        p.y	= tagCenter.y + thisV.y;
        operateTimeVector.push(p);
    }

    //顶部左侧一横线
    for (var i = minX + radius; i < (maxX + minX)/2; ++i)
    {
        operateTimeVector.push(cc.p(i,maxY));
    }
    return operateTimeVector;
}

/**
 * 圆形 点   坐标位置
 * @param radius  半径
 * @param sum   数量
 * @returns {Array}
 */
var setCircleArr = function(radius, sum){
    var  coef = 2.0 * Math.PI/sum;
    var vertices = [];
    //底部圆
    for(var i = 0;i < sum; i++)
    {
        var thisV = cc.p()
        var rads		= (sum - i)*coef;
        thisV.x	= Math.floor(radius * Math.sin(rads));
        thisV.y	= Math.floor(radius * Math.cos(rads));
        vertices[i] = thisV;
    }
    return vertices;
}


///**
// * 圆角 矩形 点 坐标位置 （头像时钟）
// * @param origin  原点(左下点)  位置（cc.p）
// * @param destination   矩形框 (右上点) 大小（cc.p）
// * @param radius  转角 半径
// * @param segments  转角 点数量
// * @returns {Array}
// */
//var setOperateTimeArr1 = function(origin, destination, radius, segments){
//    var operateTimeVector = [];
//    //算出1/4圆
//    var coef	= 0.5 * Math.PI / segments;
//    var vertices  = [];//segments+1
//    for(var i = 0; i <= segments; ++i)
//    {
//        var thisV = cc.p()
//        var rads		= (segments - i)*coef;
//        thisV.x	= Math.floor(radius * Math.sin(rads));
//        thisV.y	= Math.floor(radius * Math.cos(rads));
//        vertices[i] = thisV;
//    }
//
//    var tagCenter = cc.p();
//    var minX	= Min(origin.x, destination.x);
//    var maxX	= Max (origin.x, destination.x);
//    var minY	= Min(origin.y, destination.y);
//    var maxY	= Max(origin.y, destination.y);
//    //顶部横线右半部分
//    for(var i = maxX/2; i < maxX - radius; i=i+3)
//    {
//        if(i > maxX - radius){
//            i = maxX - radius
//        }
//        operateTimeVector.push(cc.p(i,maxY));
//    }
//    //右上角
//    tagCenter.x		= maxX - radius;
//    tagCenter.y		= maxY - radius;
//    for(var i = 0; i <= segments; ++i)
//    {
//        var thisV = vertices[segments-i];
//        var p = cc.p();
//        p.x	= tagCenter.x + thisV.x;
//        p.y	= tagCenter.y + thisV.y;
//        operateTimeVector.push(p);
//    }
//
//    //右边一横线
//    for (var i = maxY - radius; i > minY + radius; i=i-3)
//    {
//        if(i<minY + radius){
//            i = minY + radius
//        }
//        operateTimeVector.push(cc.p(maxX,i));
//    }
//
//    //右下角
//    tagCenter.x		= maxX - radius;
//    tagCenter.y		= minY + radius;
//    for(var i = 0; i <= segments; ++i)
//    {
//        var thisV = vertices[i];
//        var p = cc.p();
//        p.x	= tagCenter.x + thisV.x;
//        p.y	= tagCenter.y - thisV.y;
//        operateTimeVector.push(p);
//    }
//
//    //底部一横线
//    for (var i = maxX - radius; i > minX + radius; i=i-3)
//    {
//        if(i<minX + radius){
//            i = minX + radius
//        }
//        operateTimeVector.push(cc.p(i,minY));
//    }
//
//    //左下角
//    tagCenter.x		= minX + radius;
//    tagCenter.y		= minY + radius;
//    for(var i = 0; i <= segments; ++i)
//    {
//        var thisV = vertices[segments-i];
//        var p= cc.p();
//        p.x	= tagCenter.x - thisV.x;
//        p.y	= tagCenter.y - thisV.y;
//        operateTimeVector.push(p);
//    }
//
//    //左侧一横线
//    for (var i = minY + radius; i < maxY - radius; i=i+3)
//    {
//        if(i > maxY - radius){
//             i = maxY - radius
//        }
//        operateTimeVector.push(cc.p(minX,i));
//    }
//
//    //左上角
//    tagCenter.x		= minX + radius;
//    tagCenter.y		= maxY - radius;
//    for(var i = 0; i <= segments; ++i)
//    {
//        var thisV = vertices[i];
//        var p= cc.p();
//        p.x	= tagCenter.x - thisV.x;
//        p.y	= tagCenter.y + thisV.y;
//        operateTimeVector.push(p);
//    }
//
//    //顶部左侧一横线
//    for (var i = minX + radius; i < (maxX + minX)/2; i=i+3)
//    {
//        if(i > (maxX + minX)/2){
//            i = (maxX + minX)/2
//        }
//        operateTimeVector.push(cc.p(i,maxY));
//    }
//    return operateTimeVector;
//}