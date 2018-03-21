//加载完 json 后执行 游戏开始
cc.game.onStart = function(){
    cc.log("******** js start *********")

    //加载游戏的js文件
    loadGameJS();

};
cc.game.run();