// let list = document.querySelector(".list_one");
let list_one = $('.list_one');
let that;
let con;
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
// 今日推荐对象
class Recommend {
    constructor() {
        this.init();
    }
    // 初始化
    init() {
        this.data();
    }
    // 渲染数据
    data() {
        $.ajax({
            type: "post",
            url: "/api",
            dataType: "json",
            success: function (response) {
                // console.log(response);
                let str = `<section>今日推荐</section>`;
                for (let i = 0; i < response.Data.Market_EP_ItemInfos.length; i++) {
                    // src="http://ceair.oss-cn-shanghai.aliyuncs.com/image/PromotionBit/202011DD/pb_13904115-93c1-44ee-950a-bab5add738fc.jpg"
                    str += `<li><img src="http://ceair.oss-cn-shanghai.aliyuncs.com/image${response.Data.Market_EP_ItemInfos[i].PictureUrl}" alt=""></li>`
                }
                $(".recommend").append(str);
            }
        });
    }
}
// 主体区域渲染
class Contend {
    constructor() {
        con = this;
        this.init();
    }
    // 初始化
    init() {
        this.data();
        this.tab();
    }
    // 获取数据数据
    data() {
        let objs = {};
        // 主体内容
        
        $.ajax({
            type: "post",
            url: "/data",
            async: false,
            dataType: "json",
            success: function (right) {
                console.log(right.Data);
                objs.data = right.Data;
            }
        });
        // 热门推荐数据
        // for (let i = 0; i < 6; i++) {
            for(let i = 1;i<6;i++){
                let num = i-1;
                console.log(num);
                $.ajax({
                    type: "post",
                    url: "/tuijian",
                    async: false,
                    data: {
                        keywordNo: i
                    },
                    dataType: "json",
                    success: function (right) {
                        console.log(right.Data);
                        objs.right = right.Data;
                    }
                });
                $.ajax({
                    type: "post",
                    url: "/letop",
                    async: false,
                    data: {
                        keywordNo: i
                    },
                    dataType: "json",
                    success: function (lettop) {
                        console.log(lettop.Data);
                        objs.lettop = lettop.Data;
                    }
                });
                $.ajax({
                    type: "post",
                    url: "/lecon",
                    async: false,
                    data: {
                        keywordNo: i
                    },
                    dataType: "json",
                    success: function (lecon) {
                        console.log(lecon.Data);
                        objs.lecon = lecon.Data;
                    }
                });
                $.ajax({
                    type: "post",
                    url: "/lebtom",
                    async: false,
                    data: {
                        keywordNo: i
                    },
                    dataType: "json",
                    success: function (lebtom) {
                        console.log(lebtom);
                        objs.lebtom = lebtom.Data;
                    }
                });
                console.log(objs);
                this.setdata(objs,num);
                this.hrefs(num);
            }
        // $.ajax({
        //     type: "post",
        //     url: "/tuijian",
        //     data: {
        //         keywordNo: 1
        //     },
        //     dataType: "json",
        //     success: function (right) {
        //         console.log(right.Data);
        //         objs.right = right.Data;
        //     }
        // });
        // $.ajax({
        //     type: "post",
        //     url: "/letop",
        //     data: {
        //         keywordNo: 1
        //     },
        //     dataType: "json",
        //     success: function (lettop) {
        //         console.log(lettop.Data);
        //         objs.lettop = lettop.Data;
        //     }
        // });
        // $.ajax({
        //     type: "post",
        //     url: "/lecon",
        //     data: {
        //         keywordNo: 1
        //     },
        //     dataType: "json",
        //     success: function (lecon) {
        //         console.log(lecon.Data);
        //         objs.lecon = lecon.Data;
        //     }
        // });
        // $.ajax({
        //     type: "post",
        //     url: "/lebtom",
        //     data: {
        //         keywordNo: 1
        //     },
        //     dataType: "json",
        //     success: function (lebtom) {
        //         console.log(lebtom);
        //         objs.lebtom = lebtom.Data;
        //     }
        // });
        // }
        console.log(objs);
        // 渲染数据
        // this.setdata(objs,1);
    }
    // 渲染数据
    setdata(Data,a) {
        this.str = `<section class="items">
                <section class="header">
            <section class="header_l">
                <span class="num">${Data.data.HomeFloorList[a].FloorLevel}</span>
                        <p>${Data.data.HomeFloorList[a].Title}</p>
                    </section>
                    <!-- 右上角切换导航 -->
                    <section class="header_r">
                        <ul class="list${a}">
                        <li>热门推荐</li>`
                        for(let i=0;i<Data.data.HomeFloorList[a].HomeFloorItem.length;i++){
                            this.str +=`<li>${Data.data.HomeFloorList[a].HomeFloorItem[i].Title}</li>`
                        }
                        this.str +=`</ul>
                        </section>
                    </section>
                    <section class="contents">
                        <section class="con_l">
                            <img nid="${Data.lettop.Market_EP_ItemInfos[0].PageUrl}" src="http://ceair.oss-cn-shanghai.aliyuncs.com/image${Data.lettop.Market_EP_ItemInfos[0].PictureUrl}" alt="">
                            <p>`
                            for(let j = 0;j<Data.lecon.Market_EP_ItemInfos.length;j++){
                                this.str +=`<a nid="${Data.lecon.Market_EP_ItemInfos[j].PageUrl}">${Data.lecon.Market_EP_ItemInfos[j].Title}</a>`
                            }
                            this.str +=`</p>
                            <section class="nav">
                                <ul>`
                                for(let e = 0;e<Data.lebtom.Market_EP_ItemInfos.length;e++){
                                    this.str +=`<li nid="${Data.lebtom.Market_EP_ItemInfos[e].PageUrl}">${Data.lebtom.Market_EP_ItemInfos[e].Title}</li>`
                                }
                               this.str +=` </section>
                               </section>
                               <section class="con_r con${a}">
                                <section class="con_r_item">` 
                                for(let r = 0 ;r<Data.right.Market_EP_ItemInfos.length;r++){
                                    this.str +=`<span nid="${Data.right.Market_EP_ItemInfos[r].PageUrl}"><img src="http://ceair.oss-cn-shanghai.aliyuncs.com/image${Data.right.Market_EP_ItemInfos[r].PictureUrl}" alt=""></span>`
                                }
                                this.str +=`</section>`
                               for(let b=0;b<Data.data.HomeFloorList[a].HomeFloorItem.length;b++){
                                this.str +=`<section class="con_r_item">`
                                                for(let c = 0 ;c<Data.data.HomeFloorList[a].HomeFloorItem[b].HomeFloorProduct.length;c++){
                                                    this.str +=`<span nid="${Data.data.HomeFloorList[a].HomeFloorItem[b].HomeFloorProduct[c].ProductSysNo}"><img src="http://ceair.oss-cn-shanghai.aliyuncs.com/image${Data.data.HomeFloorList[a].HomeFloorItem[b].HomeFloorProduct[c].ProductSrc}" alt=""></span>`
                                                }
                                           this.str +=`</section>`
                               }
                               this.str +=` </section>
                               </section>
                           </section>`;
                           $(".list").append(this.str);
    }
    // tab切换效果
    tab() {
        // 循环给每个切换导航添加效果
        for (let i = 0; i < 7; i++) {
            $(`.header_r .list${i} li`).hover(function () {
                $(`.header_r .list${i} li`).removeClass("ative");
                $(this).addClass("ative");
                con.num = $(this).index();
                $(`.con${i} .con_r_item`).css("visibility", "hidden")
                $(`.con${i} .con_r_item`).eq(con.num).css("visibility", "visible");
            },
                function () {
                    // $(this).removeClass("ative");
                    // $(".con_r_item").eq(con.num).css("display","none")
                })
        }

    }
    // 设置跳转页面，把数据放在href后面
    hrefs(i){
        let res = $(`.con${i}`).children().first().children().on("click",function(){
            let res = $(this).attr('nid');
            console.log(res);
            // https://shopping.ceair.com/static/activity/activityTemplate-PC.html?pageCode=MALL_M55215_2020112610485684
            let tes = res.indexOf('?')
            let str = res.substring(tes+1)
            let arr = str.split('=');
            console.log(arr[1]);
            location.href = `http://shop/html/details.html?${arr[1]}`;
        }).end().siblings().children().on("click",function(){
            let res = $(this).attr('nid');
            console.log(res);
            location.href = `http://shop/html/details.html?${res}`;
        })
        // console.log(res);
    }
}
new Section(list_one)
new Recommend();
new Contend();