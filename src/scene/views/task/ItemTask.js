/**
 * Created by apple on 14-12-4.
 */
var ItemTask = cc.TableViewCell.extend({
    mIndex:0,//索引
    mUTask:null,//任务
    mIsSelected:false,//是否选中
    mDoBtn:null,
    mGetBtn:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            //单元格背景
            var ccsize = cc.size(920,50);
            var sprite =  cc.Sprite.create("#task_bg.png");
            //sprite.setContentSize(ccsize)
            sprite.setAnchorPoint(cc.p(0, 0));
            sprite.setPosition(cc.p(-2, -2));
            sprite.setTag(9001);
            this.addChild(sprite,1);



            var itemsize = ccsize;

            if(this.mUTask!=null){

                //

                var tname = "";
                var award = "";
                var processstr = "";
                var ticonpic = "#i_task_0.png";
                var cashiconpic = "#softcash_1.png"
                var rate = 0;
                var info = "";
                if(this.mUTask.task){
                    tname = this.mUTask.task.name
                    award = this.mUTask.award.value
                    if(this.mUTask.award.gtype == GOODS_HARDCASH){
                        award = formatcash(award) + sResWord.w_hardcash;
                        cashiconpic = "#hardcash_1.png"
                    }else if(this.mUTask.award.gtype == GOODS_SOFTCASH){
                        award = formatcash(award) + sResWord.w_softcash;
                    }
                    award = this.mUTask.task.prizesInfo;
                    processstr = this.mUTask.currCount+"/"+this.mUTask.allCount
                    rate = this.mUTask.currCount/this.mUTask.allCount;
                    info = this.mUTask.task.conditionInfo;
                    info = this.dealWord(info)
                    //task 类型 2救济 3游戏n局 4获胜n局 5连胜n局 6分享朋友圈 7分享好友
                    if(this.mUTask.task.taskType == 3){
                        ticonpic = "#i_task_1.png";
                    }else if(this.mUTask.task.taskType == 4){
                        ticonpic = "#i_task_2.png";
                    }else if(this.mUTask.task.taskType == 70){
                        ticonpic = "#i_task_4.png";
                    }else if(this.mUTask.task.taskType == 71){
                        ticonpic = "#i_task_3.png";
                    }else if(this.mUTask.task.roomId >0){
                        ticonpic = "#i_task_1.png";
                    }

                    if(this.mUTask.task.taskType == 2){
                        if(this.mUTask.state == 1){
                            processstr = "0/1";
                            rate = 0;
                        }else{
                            processstr = "1/1";
                            rate = 1;
                        }
                    }
                }


                //名称
                var idstr = info;
                var idlabel = cc.LabelTTF.create(idstr,sGameData.mFontname, 22);//垂直对齐
                idlabel.setAnchorPoint(cc.p(0.5,0.5));
                idlabel.setPosition(cc.p(189, itemsize.height*0.5));
                idlabel.setTag(8001);
                this.addChild(idlabel,1);
                setLabelScale(idlabel,350);


                var processsprite = cc.Sprite.create("#w_task_process.png")
                processsprite.setAnchorPoint(cc.p(0,0.5));
                processsprite.setPosition(cc.p(itemsize.width*0.65-30-50, itemsize.height*0.5));
                this.addChild(processsprite,1);


                var processlabel = cc.LabelTTF.create(processstr, sGameData.mFontname, 18);
                if(processlabel!=null){
                    processlabel.attr({
                        x:itemsize.width*0.65-30+70,
                        y:itemsize.height*0.5,
                        anchorX: 0.5,
                        anchorY: 0.5
                    });
                    this.addChild(processlabel,6);
                    processlabel.enableStroke(cc.color(255,255,255), 1);
                    processlabel.setTag(8002);
                }

                var trackSprite = cc.Sprite.create("#task_processbg.png")
                var progressSprite = cc.Sprite.create("#task_process.png")
                var blankSprite = cc.Sprite.create("#blank.png")
                var processslider = cc.ControlSlider.create(trackSprite,progressSprite ,blankSprite);
                processslider.setAnchorPoint(cc.p(0, 0.5));
                processslider.setPosition(cc.p(itemsize.width*0.65-30,itemsize.height*0.5));
                processslider.setMinimumValue(0);
                processslider.setMaximumValue(1);
                processslider.setValue(rate);
                processslider.setEnabled(false);
                this.addChild(processslider,4,7888);


                var cashicon = cc.Sprite.create(cashiconpic)
                cashicon.setPosition(cc.p(itemsize.width*0.46-30, itemsize.height*0.5));
                cashicon.setTag(9003);
                this.addChild(cashicon,1);

                var cashlabel = cc.LabelTTF.create(award, sGameData.mFontname, 20);
                cashlabel.attr({
                    x:itemsize.width*0.46-30+20,
                    y:itemsize.height*0.5,
                    anchorX: 0
                });
                this.addChild(cashlabel,6);
                cashlabel.setTag(8003);

                //var infolabel = cc.LabelTTF.create(info, sGameData.mFontname, 22);
                //infolabel.attr({
                //    x:itemsize.width*0.5+50,
                //    y:itemsize.height*0.2,
                //    anchorX: 0.5
                //});
                //this.addChild(infolabel,6);
                //infolabel.setTag(8004);
                //infolabel.setColor(cc.color(209,151,7))


                var wordstr = sResWord.w_task_gotodo;
                var doSprite = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr,cc.p(0.5,0.5),24);
                var doSprite1 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr,cc.p(0.5,0.5),24,1);
                var doSprite2 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr,cc.p(0.5,0.5),24);
                var doItem = cc.MenuItemSprite.create(
                    doSprite,
                    doSprite1,
                    doSprite2,
                    this.clickDo,this);
                doItem.attr({
                    x:itemsize.width -20,
                    y:itemsize.height*0.5,
                    anchorX: 1
                });
                this.mDoBtn = doItem
                if(this.mUTask.state == 1){
                    doItem.setVisible(true)
                    if(this.mUTask.task&&this.mUTask.task.taskType == 2){
                        this.mDoBtn.setVisible(false)
                    }
                }else{
                    doItem.setVisible(false)
                }

                var wordstr1 = sResWord.w_task_getprize;
                var getSprite = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr1,cc.p(0.5,0.5),24);
                var getSprite1 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr1,cc.p(0.5,0.5),24,1);
                var getSprite2 = ButtonSpriteWithWordInner("#task_t_bg.png",wordstr1,cc.p(0.5,0.5),24);
                var getItem = cc.MenuItemSprite.create(
                    getSprite,
                    getSprite1,
                    getSprite2,
                    this.clickGet,this);
                getItem.attr({
                    x:itemsize.width -20,
                    y:itemsize.height*0.5,
                    anchorX: 1
                });
                this.mGetBtn = getItem
                if(this.mUTask.state == 2){
                    getItem.setVisible(true)
                }else{
                    getItem.setVisible(false)
                }

                var menu = cc.Menu.create(doItem,getItem);
                menu.x = 0;
                menu.y = 0;
                this.addChild(menu, 1);


                var statelabel = cc.LabelTTF.create(sResWord.w_task_hasgetprize,sGameData.mFontname, 24);//垂直对齐
                statelabel.setAnchorPoint(cc.p(0.5,0.5));
                statelabel.setPosition(cc.p(itemsize.width - 125, itemsize.height*0.5));
                statelabel.setTag(8005);
                this.addChild(statelabel,1);
                if(this.mUTask.state == 3){
                    statelabel.setVisible(true)
                }else{
                    statelabel.setVisible(false)
                }
                statelabel.setColor(cc.color(209,151,7))

                if(this.mUTask.task){
                    if(this.mUTask.task.roomId>0){
                        var roomId = this.mUTask.task.roomId;
                        var room = getRoomById(roomId)
                        if(room) {
                            log("room==" + room.roomName);
                            if (!isGameShow(room.gameId) || !isOpenGame(room.gameId)) {
                                doItem.setVisible(false)
                            }
                        }
                    }
                }
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //更新显示物品的信息
    updateInfo:function()
    {
        //log("zjh mTable="+this.mTable.id);

        var tname = "";
        var award = "";
        var processstr = "";
        var ticonpic = "i_task_0.png";
        var rate = 0;
        var cashiconpic = "softcash_1.png"
        var info = "";
        if(this.mUTask.task){
            tname = this.mUTask.task.name
            award = this.mUTask.award.value
            if(this.mUTask.award.gtype == GOODS_HARDCASH){
                award = formatcash(award) + sResWord.w_hardcash;
                cashiconpic = "hardcash_1.png"
            }else if(this.mUTask.award.gtype == GOODS_SOFTCASH){
                award = formatcash(award) + sResWord.w_softcash;
            }
            if(!sGameData.mAppIsSubmitToAppStore) {
                award = this.mUTask.task.prizesInfo;
            }
            processstr = this.mUTask.currCount+"/"+this.mUTask.allCount
            rate = this.mUTask.currCount/this.mUTask.allCount;
            info = this.mUTask.task.conditionInfo;
            if(this.mUTask.task.taskType == 3){
                ticonpic = "i_task_1.png";
            }else if(this.mUTask.task.taskType == 4){
                ticonpic = "i_task_2.png";
            }else if(this.mUTask.task.taskType == 70){
                ticonpic = "i_task_4.png";
            }else if(this.mUTask.task.taskType == 71){
                ticonpic = "i_task_3.png";
            }else if(this.mUTask.task.roomId >0){
                ticonpic = "i_task_1.png";
            }
            //taskType 2救济 345游戏 6 7分享

            if(this.mUTask.task.taskType == 2){
                if(this.mUTask.state == 1){
                    processstr = "0/1";
                    rate = 0;
                }else{
                    processstr = "1/1";
                    rate = 1;
                }
            }
        }

        var idlabel = this.getChildByTag(8001);
        if(idlabel){
            info = this.dealWord(info)
            idlabel.setString(info);
            setLabelScale(idlabel,350);
        }


        var cashiconsprite = this.getChildByTag(9003);
        if(cashiconsprite){
            cashiconsprite.setSpriteFrame(cashiconpic);
        }

        var processlabel = this.getChildByTag(8002);
        if(processlabel){
            processlabel.setString(processstr);
        }

        var processslider = this.getChildByTag(7888);
        if(processslider){
            processslider.setValue(rate);
        }

        var cashlabel = this.getChildByTag(8003);
        if(cashlabel){
            cashlabel.setString(award);
        }

        //var infolabel = this.getChildByTag(8004);
        //if(infolabel){
        //    infolabel.setString(info);
        //}

        var statelabel = this.getChildByTag(8005);
        if(statelabel){
            if(this.mUTask.state == 3){
                statelabel.setVisible(true)
            }else{
                statelabel.setVisible(false)
            }
        }

        if(this.mDoBtn&&this.mGetBtn){
            if(this.mUTask.state == 1){
                this.mDoBtn.setVisible(true)
                if(this.mUTask.task&&this.mUTask.task.taskType == 2){
                    this.mDoBtn.setVisible(false)
                }
            }else{
                this.mDoBtn.setVisible(false)
            }

            if(this.mUTask.state == 2){
                this.mGetBtn.setVisible(true)
            }else{
                this.mGetBtn.setVisible(false)
            }

            if(this.mUTask.task){
                if(this.mUTask.task.roomId>0){
                    var roomId = this.mUTask.task.roomId;
                    var room = getRoomById(roomId)
                    if(room) {
                        log("room==" + room.roomName);
                        if (!isGameShow(room.gameId) || !isOpenGame(room.gameId)) {
                            this.mDoBtn.setVisible(false)
                        }
                    }
                }
            }
        }


    },
    dealWord:function(word,type){
        if(sGameData.mAppIsSubmitToAppStore){
            word = word.replace("元","00金币")
        }
        return word;
    },
    //选中
    choose:function()
    {
        this.mIsSelected = true;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(220, 220, 220));
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(255, 255, 255));
        }
    },
    clickDo:function(){
        log("clickDo---")
        if(this.mUTask.task){
            if(this.mUTask.task.roomId > 0){
                var roomId = this.mUTask.task.roomId;
                var room = getRoomById(roomId)
                if(room){
                    log("room=="+room.roomName);
                    if(isGameShow(room.gameId)&&isOpenGame(room.gameId)){ //判断 游戏 是否开放

                        if(sGameData.mAppUseDownGameRes){
                            //首先检查是否需要更新资源
                            var hasdown = checkHasDownBaseRes(room.gameId);
                            if (!hasdown) {
                                if (!sGameData.mIsDownLoadingGameRes) {
                                    //showLittleNotice("download game res now");
                                    sGameData.mCurrDownGameId = room.gameId
                                    var gamename = getGameName(room.gameId)
                                    var allsize = getGameBaseResSize(room.gameId,0);
                                    if(allsize > 0){
                                        var sizestr = getFileSize(allsize);
                                        var word = gamename+sResWord.w_tip_down_game_s1+sizestr+sResWord.w_tip_down_game_s2
                                        //startLoadGameBaseRes(room.gameId);
                                        showNotice(sResWord.w_notice,word,3,50)
                                    }else{
                                        showLittleNotice(sResWord.w_tip_down_nores);
                                    }
                                }else{
                                    var gamename = getGameName(sGameData.mCurrDownGameId)
                                    var word = sResWord.w_tip_down_other_s1+gamename+sResWord.w_tip_down_other_s2;
                                    showLittleNotice(word);

                                }
                                return;
                            }
                        }

                        gotoShowViewForGameRooms(room.gameId)
                    }

                }
            }else if(this.mUTask.task.taskType == 70){
                showShareView(2,0,1);
                sGameData.mShareTaskId = this.mUTask.id
            }else if(this.mUTask.task.taskType == 71){
                showShareView(1,0,1);
                sGameData.mShareTaskId = this.mUTask.id
            }
        }
    },
    clickGet:function(){
        log("clickGet---")
        if(!sGameData.mIsSendingData) {
            sGameData.mIsSendingData = true
            sGameData.mGameNet.sendUTaskAward(this.mUTask.id);
        }
    }
});
ItemTask.create = function (task,index) {
    var sg = new ItemTask();
    if (sg) {
        sg.mUTask = task;
        sg.mIndex = index;
        sg.init();
        return sg;
    }
    return null;
};