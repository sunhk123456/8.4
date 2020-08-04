function wheel(wins, opts, runs) {
    // 初始化参数
    this.init(wins, opts, runs);
    // 获取窗口
    this.getWindow();
    // 获取盒子
    this.createBox();
    // 获取轮播列表
    this.createList();
    // 创建按钮
    this.createBtn();
    // 自动运行
    this.autoRun();
    // 点击播放
    this.onclickRun();
}
wheel.prototype = {
    init(wins, opts, runs) {
        this.opts = opts;
        this.runs = runs;
        // 参数的初始化

        //初始化times
        var times = this.runs.time || 2;
        // 初始化 运动方式
        // console.log(wins)
        var wins = document.querySelector(wins);
        if (!(wins && wins.nodeType == 1)) {
            console.error("窗口没有获取到")
        }
        this.wins = wins;
        // 图片的地址添加一个
        opts.imgs.push(opts.imgs[0]);
        // 链接的地址添加一个
        opts.links.push(opts.links[0]);
        // 颜色增加一个
        opts.imgColor.push(opts.imgColor[0]);
        // console.log(opts.imgs)

        this.imgLength = opts.imgs.length;
        console.log(this.imgLength)
        if (this.imgLength == 0) {
            console.error("没有传入相应的轮播内容");
            return;
        }
        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("请传入合法的尺寸");
        }

        if (this.imgSize.Length == 0) {
            this.imgSize[0] = document.documentELement.CLientWidth;
            this.imgSize[1] = 400
        }
        if (this.imgSize.some(function(val) {
                return val == 0;
            })) {
            for (var i = 0; i < 2; i++) {
                if (this.imgSize[i] == 0) {
                    this.imgSize[i] = 500
                }

            }
        }
        // console.log(imgSize)
        this.btnColor = opts.btnColor || "green";
        this.btnActive = opts.btnActive || "red";
        this.btnPos = opts.btnPosition || ["center", "20"]



    },

    getWindow() {
        this.wins.style.cssText = "width:100%;height:" + this.imgSize[1] + " px ; overfLow: hidden; position: relative;";



    },
    createBox() {

        // 添加容器
        this.box = document.createElement("div")
        this.box.style.cssText = "width:" + this.imgLength * 100 + "%;height:100%;"
        this.wins.appendChild(this.box);


    },
    createList() {
        for (var i = 0; i < this.imgLength; i++) {
            this.divList = document.createElement("div");
            this.divList.style.cssText = `float:left;width:${100/this.imgLength}%;height:100%;background:${this.opts.imgColor[i]}`;

            this.link = document.createElement("a");
            this.link.href = this.opts.links[i];
            this.link.style.cssText = "width:100% ; height:" + this.imgSize[1] + "px ;display: block ;margin: auto ; background:url(" + this.opts.imgs[i] + ") no-repeat 0 0 ; background-size: cover; "

            this.divList.appendChild(this.link);
            this.box.appendChild(this.divList);
        }


    },
    createBtn() {

        // 创建按钮
        this.btnBox = document.createElement("div")
        this.btnBox.style.cssText = `width:52px;text-align: center;height: 21px;background: rgba(0,0,0,0.30); border-radius: 10px;position: absolute;left: 0;right: 0;margin: auto;bottom:${this.btnPos[1]}px;`
        var btns = []
        for (var i = 0; i < this.imgLength - 1; i++) {
            if (i == 0) {
                this.bgColor = this.btnActive
            } else {
                this.bgColor = this.btnColor
            }
            this.btn = document.createElement("div")

            this.btn.style.cssText = ` display: inline-block;
            width: 12px;
            height: 12px;
            text-align: center;

float:left;
background: ${this.bgColor};
cursor: pointer;
margin-top:5px;
margin-left:9px;
border-radius: 50%;`
            this.btnBox.appendChild(this.btn)
            btns.push(this.btn)
        }
        this.btns = btns;

        this.wins.appendChild(this.btnBox);



        console.log(this.btns)



    },
    _setvar() {

        this.long = parseInt(getComputedStyle(this.wins, null).width)
        this._num = 0;


    },
    _move() {
        var that = this;
        console.log(that._num)
        return function() {
            // console.log(this)
            that._num++;
            if (that._num > that.imgLength - 2) {

                animate(that.box, {
                    "marginLeft": -that.long * that._num
                }, 500, Tween.Linear, function() {

                    that.box.style.marginLeft = 0
                })
                that._num = 0;
            } else {
                animate(that.box, {
                    "marginLeft": -that.long * that._num
                }, 500)

            }
            // 改变按钮颜色

            for (var j = 0; j < that.opts.imgs.length - 1; j++) {

                that.btns[j].style.background = that.opts.btnColor;
            }
            that.btns[that._num].style.background = that.opts.btnActive;
            // that.btns[j].style.background = that.opts.btnColor;
        }
    },
    autoRun() {

        this._setvar()
            // console.log(this.long)
        this.time1 = this.times * 1000;

        this.t = setInterval(this._move(this), 3000);


    },
    onclickRun() {
        // 按钮轮播
        var that = this;
        for (let i = 0; i < this.opts.imgs.length - 1; i++) {

            this.btns[i].onclick = function() {

                that._num = i;
                animate(that.box, {
                        "margin-left": -that._num * that.long
                    },
                    500)
                for (var j = 0; j < that.opts.imgs.length - 1; j++) {


                    that.btns[j].style.background = that.opts.btnColor;
                }
                that.btns[that._num].style.background = that.opts.btnActive;


            }
        }
        // for (let i = 0; i < imgs.length; i++) {
        this.wins.onmouseover = function() {
            clearInterval(that.t)

        }
        this.wins.onmouseout = function() {
                that.t = setInterval(that._move(that), 3000);

            }
            // }


    }
}