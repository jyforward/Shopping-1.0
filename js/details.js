let list_one = $('.list_one');
let that;
let con;
let thas;
// 导航对象
class Section {
    constructor(ele) {
        this.ele = ele;
        that = this;
        this.init();
    }
    // 初始化
    init() {
        // console.log(this.lis);
        // 渲染数据
        this.data();
        // 移入显示的效果
        $(this.ele).on("mouseover", this, () => {
            this.downsec();
        })
        // 移出隐藏效果
        $(".list_two").on("mouseout", $(this), function () {
            $(this).css("visibility", "hidden");
            // console.log(1);
        })
        // 第二种写法
        // $(".list_two").mouseout(function () {
        //     $(this).css("visibility", "hidden");
        //     console.log(1);
        // })


    }
    // 渲染数据
    data() {
        let str = '';
        // 获取导航数据
        $.ajax({
            type: "get",
            url: "/xiala",
            contentType: 'application/json; charset=UTF-8',
            dataType: "json",
            success: function (response) {
                // console.log(response);
                // 循环数据并把数据添加到字符串str中
                for (let i = 0; i < response.Data.length; i++) {
                    // console.log(response.Data[i]);
                    str += `<li class="li_two">${response.Data[i].Name}<ul class="list_tree">`;
                    for (let j = 0; j < response.Data[i].Subset.length; j++) {
                        // console.log(response.Data[i].Subset[j]);
                        str += `<dl><dt>${response.Data[i].Subset[j].Name}</dt>`
                        for (let r = 0; r < response.Data[i].Subset[j].Subset.length; r++) {
                            str += ` <dd>${response.Data[i].Subset[j].Subset[r].Name}</dd>`
                        }
                        str += `</dl>`
                    }
                    str += `</ul></li>`;
                }
                // 把数据添加到list_two元素里
                $(".list_two").append(str);
                // 划过显示右边导航栏的效果
                that.leftsec();
            }
        });
    }
    // 下拉特效
    downsec(lis) {
        // 划过显示下拉列表
        $(".list_two").css("visibility", "visible");
    }
    // 划过显示右边导航栏的效果
    leftsec() {
        $('.list_two li').hover(function () {
            $(".list_tree").eq($(this).index()).css("visibility", "visible");
        }, function () {
            $(".list_tree").css("visibility", "hidden");

        })
    }
    // 移除隐藏
    remove() {
        // 隐藏下拉列表
        $(".list_tow").on("mouseout", this, function () {
            $(this.lis).css("visibility", "hidden");
            console.log(1);
        })
    }
}

// 渲染页面数据对象
class Setdata {
    constructor() {
        this.url = location.search;
        this.init();
    }
    // 初始化
    init() {
        // console.log(this.url);
        // 获取请求数据data
        this.getdata();
        // $('.purchase').on('click',()=>{
        //     this.purchase();
        // })
        
    }
    // 获取数据
    getdata() {
        // 把问好截取掉
        this.res = this.url.substr(1) - 67733;
        console.log(this.res);
        // 根据数据进行ajax请求
        $.ajax({
            type: "post",
            url: `/list${this.res}`,
            // contentType: 'application/json; charset=UTF-8',
            dataType: "json",
            success: (response) => {
                this.setdata(response);
            }
        });
    }
    // 渲染数据
    setdata(obj) {
        console.log(obj);

        let str = `<!-- 头部信息 -->
        <section class="text">
            <section class="name">${obj.Data.name}</section>
            <section class="code"><span>商品编码</span><span>${obj.Data.product_no}</span></section>
        </section>
        <!-- 左侧图片区域 -->
        <section class="imgs">
            <section class="bigimg">
                <img class="big" alt="">
                <section class="mask"></section>
                <section class="show">
                <img class="showimg" alt="">
                </section>
            </section>
            <section class="list">
                <nav>`
        for (let i = 0; i < obj.Data.picture.length; i++) {
            str += `<li><img src="http://ceair.oss-cn-shanghai.aliyuncs.com/image${obj.Data.picture[i].picUrl}" alt=""></li>`
        }
        str += `</nav>
            </section>
        </section>
        <!-- 详情信息区域 -->
        <section class="information">
            <dl>
                <dt>商城价</dt>
                <dd>现金${obj.Data.priceList[0].disCountPrice}</dd>
            </dl>
            <dl>
                <dt>颜色</dt><dd>`
        for (let i = 0; i < obj.Data.attributes[0].values.length; i++) {
            str += `<span>${obj.Data.attributes[0].values[i].Name}</span>`
        }
        str += `</dd></dl>
            <dl>`
        if (obj.Data.attributes[1]) {
            str += `<dt>颜色</dt><dd>`
            for (let i = 0; i < obj.Data.attributes[1].values.length; i++) {
                str += `<span>${obj.Data.attributes[1].values[i].Name}</span>`
            }
        }
        str += `</dd></dl>
            <dl>`
        if (obj.Data.attributes[2]) {
            str += `<dt>运营版本</dt><dd>`
            for (let i = 0; i < obj.Data.attributes[2].values.length; i++) {
                str += `<span>${obj.Data.attributes[2].values[i].Name}</span>`
            }
        }
          str += `</dd></dl>
            <dl>
                <dt>数量</dt>
                <dd>
                    <button class="add">+</button>
                    <span class="number">1</span>
                    <button class="remove">-</button>
                </dd>
            </dl>
            <p>
                <button class="purchase">立刻购买</button>
                <button class="join">加入购物车</button>
            </p>
        </section>`
        $('.contend').append(str);
        this.tabstyle();
        // 实例化放大镜类
        new Magnifier();
        // 点击立即购买按钮点击事件
        $('.purchase').on('click',()=>{
            this.purchase(obj);
        })
        // 加入购物车点击事件
        $('.join').on('click',()=>{
            this.join(obj);
        })
        
    }
    // 渲染展示图并且实现切换效果
    tabstyle(){
        let res = $('nav li img').first().attr('src');
        $('.big').attr('src',res);
        // console.log(res);
        $('nav li').hover(function(){
            $('.big').attr('src',$(this).css('borderColor','red').children().attr('src'))
            // let res = $(this).css('borderColor','red').children().attr('src')
            // $('big').attr('src',res);
            // console.log(res);
        },function(){
            $(this).css("borderColor","#999")
        })
        this.pirce();
    }
    // 价格数量变化
    pirce() {
        // 点击+按钮是加一
        $('.add').on('click',function(){
            let num = parseInt($('.number').text())+1;
            $('.number').text(num)
        })
        // 点击-按钮减一
        $('.remove').on('click',function(){
            let num = parseInt($('.number').text())-1;
            if(num<0){
                num = 0;
            }
            $('.number').text(num)
        })
    }
    // 立刻购买按钮功能
    purchase(obj) {
        console.log(1);
        if(!getCookie('login')){
            location.href ='http://shop/html/login.html';
        }
        // 把请求数据保存到本地中 this.res
        let usernames = getCookie('login');
        // id值，用来获取数据的
        let nid = this.res;
        let des = obj.Data.name;
        let urls = `http://ceair.oss-cn-shanghai.aliyuncs.com/image${obj.Data.picture[0].picUrl}`;
        // 如果不存在购物车对象，则添加对象再进行存储
        // if(!localStorage.getItem(`${this.username}`)){
        //     let shopcar = {};
        //     shopcar[this.res] = $('.number').text(); 
        //     console.log(shopcar);
        //     localStorage.setItem(`${this.username}`,JSON.stringify(shopcar))
        //     console.log(localStorage.getItem(`${this.username}`));
        // }
        // // 转化json数据为js对象
        // let data =JSON.parse(localStorage.getItem(`${this.username}`));
        // // console.log(JSON.parse(data));
        // data[this.res] = $('.number').text(); 
        // console.log(data);
        // // 保存在本地中
        // localStorage.setItem(`${this.username}`,JSON.stringify(data));
        $.ajax({
            type: "get",
            url: "http://shop/api/shopcar.php",
            data: {
                username:usernames,
                describer:des,
                price:obj.Data.priceList[0].disCountPrice,
                num:$('.number').text(),
                id: nid,
                imgs:urls,
            },
            dataType: "json",
            success: function (response) {
                if(response.code==true){
                    location.href = "http://shop/html/shopcar.html";
                }
            },
            error:function(){
                console.log(2);
            }
        });
     }
    // 加入购物车
    join(obj) { 
        // 判断是否登录
        if(!getCookie('login')){
            location.href ='http://shop/html/login.html';
        }
        console.log(obj);
        // 把请求数据保存到本地中 this.res
        // 当前登录的用户名
       let usernames = getCookie('login');
        // id值，用来获取数据的
        let nid = this.res;
        let des = obj.Data.name;
        let urls = `http://ceair.oss-cn-shanghai.aliyuncs.com/image${obj.Data.picture[0].picUrl}`;
        $.ajax({
            type: "get",
            url: "http://shop/api/shopcar.php",
            data: {
                username:usernames,
                describer:des,
                price:obj.Data.priceList[0].disCountPrice,
                num:$('.number').text(),
                id: nid,
                imgs:urls,
            },
            dataType: "json",
            success: function (response) {
                if(response.code==true){
                   console.log('添加成功');
                }
            },
            error:function(){
                console.log(2);
            }
        });
        
        // 如果不存在购物车对象，则添加对象再进行存储
        // if(!localStorage.getItem(`${this.username}`)){
        //     let shopcar = {};
        //     shopcar[this.res] = $('.number').text(); 
        //     console.log(shopcar);
        //     localStorage.setItem(`${this.username}`,JSON.stringify(shopcar))
        //     console.log(localStorage.getItem(`${this.username}`));
        // }
        // // 转化json数据为js对象
        // let data =JSON.parse(localStorage.getItem(`${this.username}`));
        // // console.log(JSON.parse(data));
        // data[this.res] = $('.number').text(); 
        // console.log(data);
        // // 保存在本地中
        // localStorage.setItem(`${this.username}`,JSON.stringify(data))
        // let urls = `http://ceair.oss-cn-shanghai.aliyuncs.com/image${obj.Data.picture[0].picUrl}`
        // 保存到数据库
        // console.log(usernames,nid,obj.Data.name,obj.Data.priceList[0].disCountPrice,$('.number').text(),urls);
       
    }
}

// 放大镜效果对象
class Magnifier {
    constructor() { 
        // this.ele = ele;
        this.maskbox = document.querySelector('.mask');
        this.showbox = document.querySelector('.show');
        this.bigimg = document.querySelector('.bigimg');
        this.init(this.bigimg);
    }
    // 初始化
    init(imgs) { 
        $(imgs).mouseover(()=> { 
            this.setStyle();
            this.mask();
            this.show();
            // 计算遮罩层的宽高
            this.lengt();
        });
        // $(imgs).mousemove(function(e){ 
        //     // values: e.clientX, e.clientY, e.pageX, e.pageY
        //     thas.show(e);
        //     console.log(e.clientX);
        // });
        imgs.onmousemove = ()=>{
            // this.show();
            this.move();
        }
        $(imgs).mouseleave(()=> { 
            this.none();
        });
    }
    //遮罩层显示
    mask() {
        $('.mask').css('display','block');
        $('.show').css('display','block');
     }
     none(){
         $('.mask').css('display','none');
         $('.show').css('display','none');
     }
    // 方法镜实现效果
    show() { 
        // 获取mask遮罩层的宽高
        this.maskWidth = $(this.maskbox).innerWidth();
        this.maskHigth = $(this.maskbox).innerHeight();

        // 获取大盒子的宽高
        this.bigimgWidth = $(this.bigimg).innerWidth();
        this.bigimgHeigth = $(this.bigimg).innerHeight();

        // let style = getStyle(this.showbox,'backgroundSize');
        // 获取图片的宽高
        this.style = getImgwh(this.imgWH);
        this.styleX = this.style.width;
        this.styleY = this.style.height;
        console.log(this.style);

        // 获取放大镜的盒子高度
        this.enlanrgW = this.maskWidth * this.styleX / this.bigimgWidth;
        this.enlanrgH = this.maskHigth * this.styleY / this.bigimgHeigth;

        // 设置放大镜盒子的高度
        this.showbox.style.width = this.enlanrgW + 'px';
        this.showbox.style.height = this.enlanrgH + 'px';
        // console.log(this.maskWidth,this.maskHigth,style);
    }
    // 获取鼠标移动坐标
    move(){
        let e = window.event;

        let x = e.pageX - this.bigimg.offsetLeft;
        let y = e.pageY - this.bigimg.offsetTop;
        let left = x - this.maskWidth / 2;
        let top = y - this.maskHigth / 2;
        if(left < 0){
            left = 0;
        }
        if(top < 0){
            top = 0;
        }
        if(left>this.bigimgWidth-this.maskWidth){
            left = this.bigimgWidth-this.maskWidth;
        }
        if(top>this.bigimgHeigth-this.maskHigth){
            top = this.bigimgHeigth-this.maskHigth;
        }
        console.log(left,top);
        this.maskbox.style.left = left + 'px';
        this.maskbox.style.top = top + 'px';
        this.lengt(left,top);
    }
    // 计算长宽高
    lengt(x,y) {
        /* 
            mask在show盒子移动的距离      背景图移动的距离
            -----------------------  =  ------------------
               show盒子的宽度             背景图的宽度
            
           背景图移动X = x *背景图的宽度 / show盒子宽度
           背景图移动Y = y *背景图的高度 / show盒子高度

            背景图移动X = x *this.enlargeWidth / this.showWidth
            背景图移动Y = y *this.enlargeHeight / this.showHeight

            背景图的定位 background-position:x y
        */
        let bgX = x * this.styleX / this.bigimgWidth;
        let bgY = y * this.styleY / this.bigimgHeigth;
        $('.showimg').css({
            left:-bgX,
            top:-bgY
        })
    }
    // 给show设置背景图片
    setStyle(){
        this.imgWH = $('.big').attr('src');
        $('.showimg').attr('src',`${this.imgWH}`);
    }
}
new Section(list_one);
new Setdata();
// new Magnifier(imgs);