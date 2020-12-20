let btomm = document.querySelector('.bottom');
let com = document.querySelector('.commodity');
let allshop = document.querySelector('.allshop');
let price = document.querySelector('.price');
let allche = document.querySelector('.allcheck');
let removebtn = document.querySelector(".removebtn");
let that;
class getData {
    constructor(ele, com, allshop, allprice, allche,removebtn) {
        this.ele = ele;
        this.com = com;
        this.allshop = allshop;
        this.allprice = allprice;
        this.allcheck = allche;
        this.removebtn = removebtn;
        that = this;
        this.init();
        this.getdata();

    }
    // 初始化
    init() {
        this.com.onclick = () => {
            let e = window.event;
            if (e.target.className == 'add') {
                this.add(e.target);
            }
            if (e.target.className == 'remove') {
                this.Subtraction(e.target);
            }
            if (e.target.className == 'itemcheck') {
                this.itemcheck(e.target);
            }
            if(e.target.className == 'removebtn'){
                this.remove(e.target);
            }
            this.allchoice(e)
        }

    }
    // 获取数据
    getdata() {
        $.ajax({
            type: "get",
            url: "http://shop/api/getData.php",
            dataType: "json",
            success: function (response) {
                console.log(response);
                // 获取用户名
                let user = getCookie('login')
                localStorage.setItem(user, JSON.stringify(response));
                let obj = JSON.parse(localStorage.getItem(user))
                console.log(obj);
                that.setdata(obj);
            },
        });
    }
    // 渲染数据
    setdata(data) {
        console.log(1);
        console.log(data);
        // if(!data){
        //     $('.bottom').innerHTML("空空如也")；
        //     return
        // }
        let str = '';
        for (let i = 0; i < data.length; i++) {
            str += `<section class="lists">
            <section class="shop">
                <section class="check">
                    <input nid="${data[i].id}" type="checkbox" ${data[i].good_check == 1 ? 'checked' : ''} class="itemcheck">
                </section>
                <ul>
                    <li class="imgs"><img src="${data[i].good_img}" alt=""></li>
                    <li class="texts">${data[i].describer}</li>
                    <li class="cla"><span>颜色:</span><span></span></li>
                    <li class="price">价格：${data[i].price}</li>
                    <li class="num" nid="${data[i].id}">
                        <button class="add">+</button>
                        <span class="nums">${data[i].num}</span>
                        <button class="remove">-</button>
                    </li>
                    <li class="remove"><span class="removebtn" nid="${data[i].id}">删除</span></li>
                </ul>
            </section>
        </section>`
        }
        // 判断是否data里的check值为1,是的话把全选按钮选上
        let blo = data.every((item) => {
            return item.good_check == 1;
        })
        // console.log(blo);
        if (blo) {
            console.log(blo);
            $('.allcheck').attr('checked', true);
        } else {
            console.log(blo);
            $('.allcheck').attr('checked', false);
        }
        this.ele.innerHTML = str;
        // this.allchoice();
        this.allPrice(data);
    }
    // 全选按钮
    allchoice(e) {
        // let e = window.event;
        console.log(e.target);
        // 当按到全选按钮时执行
        if (e.target.className == 'allcheck') {
            // 获取当前用户
            let user = getCookie('login')
            // 获取当前用户本地的数据
            let data = JSON.parse(localStorage.getItem(user));
            // 循环给每个单选框赋值
            data.forEach((item, index) => {
                e.target.checked ? item.good_check = 1 : item.good_check = 0;
                // 修改数据库中的单选框数据
                that.upcheck(item.id, item.good_check)
            })
            // 修改数据到本地
            localStorage.setItem(user, JSON.stringify(data));

            console.log(data);
            console.log(1);
            // 渲染数据
            this.setdata(data);
            // 渲染商品的总价格和数量
            this.allPrice(data);
        }
        // if (e.target.className == 'add') {
        //     this.add(e.target);
        // }
        // if(e.target.className == 'remove'){
        //     this.Subtraction(e.target);
        // }

    }
    // 单选按钮
    itemcheck(ele) {
        let nid = $(ele).attr('nid');
        console.log(nid);
        // 获取当前用户
        let user = getCookie('login')
        // 获取当前用户本地的数据
        let data = JSON.parse(localStorage.getItem(user));
        data.forEach((item) => {
            if (item.id == nid) {
                ele.checked ? item.good_check = 1 : item.good_check = 0;
                // 修改数据库中的单选框数据
                that.upcheck(item.id, item.good_check)
            }
        })
        //  把修改的数据保存
        localStorage.setItem(user, JSON.stringify(data));
        this.setdata(data);
        this.allPrice(data);
    }
    // 数量加号
    add(ele) {
        let res = $(ele).parent().attr('nid');
        console.log(res);
        console.log(2);
        let user = getCookie('login')
        let data = JSON.parse(localStorage.getItem(user));
        data.forEach((item, index) => {
            if (item.id == res) {
                item.num++;
                that.updata(res, item.num);
            }
        })
        localStorage.setItem(user, JSON.stringify(data));
        this.setdata(data);
        this.allPrice(data);
    }
    // 减数
    Subtraction(ele) {
        // 获取父元素的商品id
        let res = $(ele).parent().attr('nid');
        // console.log(res);
        // console.log(2);
        let user = getCookie('login')
        let data = JSON.parse(localStorage.getItem(user));
        // 循环找出符合id值得商品，修改num值
        data.forEach((item, index) => {
            if (item.id == res) {
                item.num--;
                if(item.num < 0){
                    item.num = 0;
                }
                that.updata(res, item.num);
            }
        })
        // 储存到本地
        localStorage.setItem(user, JSON.stringify(data));
        this.setdata(data);
        this.allPrice(data);
    }
    // 修改数据库的num值
    updata(id, number) {
        console.log('aaa');
        $.ajax({
            type: "get",
            url: "http://shop/api/updata.php",
            data: {
                nid: id * 1,
                num: number * 1,
            },
            dataType: "json",
            success: function (response) {
                console.log(23);
                console.log(response);
            },
            error: function () {
                console.log(2222);
            }
        });
    }
    // 修改check的值
    upcheck(id, check) {
        $.ajax({
            type: "get",
            url: "http://shop/api/upcheck.php",
            data: {
                nid: id,
                checkid: check
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
    }
    // 计算价格的方法
    allPrice(data) {
        console.log(data);
        let newdata = data.filter((item) => {
            return item.good_check == '1';
        })
        console.log(newdata);
        let totalPrice = newdata.reduce((pre, item) => {
            return pre + (item.num * 1 * item.price*1);
        }, 0);
        let totalNum = newdata.reduce((pre, item) => {
            return pre + item.num*1
        }, 0)
        this.allshop.innerHTML = totalNum;
        this.allprice.innerHTML = totalPrice;
    }
    // 删除按钮
    remove(ele) {
        console.log("remove");
        let nid = $(ele).attr('nid');
        console.log(nid);
        // 获取当前用户
        let user = getCookie('login')
        // 获取当前用户本地的数据
        let data = JSON.parse(localStorage.getItem(user));
        data.forEach((item,index) => {
            if (item.id == nid) {
                $.ajax({
                    type: "get",
                    url: "http://shop/api/remove.php",
                    data: {
                        nid : nid
                    },
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                    }
                });
                // 删除data数据中的本条数据
                data.splice(index,index+1);
            }
        })
        //  把修改的数据保存
        console.log(data);
        localStorage.setItem(user, JSON.stringify(data));
        this.setdata(data);
        this.allPrice(data);

    }
}
new getData(btomm, com, allshop, price, allche,removebtn);
// btomm.onclick = () => {
//     let e = window.event;
//     console.log(e.target);
//     if(e.target.className == 'allcheck'){
//         let user = getCookie('login')
//         let data = JSON.parse(localStorage.getItem(user));
//         data.forEach((item,index)=>{
//             e.target.checked ? item.good_check=1 : item.good_check=0;
//         })
//         localStorage.setItem(user,JSON.stringify(data));

//         console.log(data);
//         console.log(1);
//     }
// }