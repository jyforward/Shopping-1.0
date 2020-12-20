// 四位数验证码
function verification(){
    num = '';
    for(var i = 0 ; i < 4 ; i++){
        num += parseInt(Math.random() * 10)
    }
    return num;
}
// 生成一个随机数
function randomNumber(star,end){
    let number = parseInt( Math.random() *end + star) - star;
    return number;
}


// 随机一个颜色
 function randomColor(){
    let a = parseInt( Math.random() *256);
    let b = parseInt( Math.random() *256);
    let c = parseInt( Math.random() *256);
    let color = "rgb(" + a + "," + b + "," + c + ")";
    return color
 }

// 传入一个数组，进行排列
function Arr(arr){
    var empt;
    for(var i = 0 ; i < arr.length; i++){
        
        for(var j = 0;j< arr.length-i;j++){
            if(arr[i]>arr[j]){
                empt = arr[i];
                arr[i] = arr[j];
                arr[j] = empt;     
            }
        }
    }
}


// 判断一个最大数
function max(a,b){
    var max = a > b ? a : b;
}

// 判断一个数字最大数
function Arrmax(arr){
    var max = arr[0];
    for(var i = 0; i < arr.length ; i++){
        max = max > arr[i] ? max : arr[i];
    }
}


// 获取一个当前时间
function getNowDate(a,b){
    let data = new Date();
    let year = data.getFullYear();
    let mon = data.getMonth();
    let day = data.getDate();
    // let dar = data.getDay();
    let h = data.getHours();
    let sec = data.getSeconds();
    let s = data.getMinutes();
    return `${year}${a}${mon}${a}${day} ${h}${b}${sec}${b}${s}`
}


 // 获取倒计时代码函数
 function countDown(time){
    var nowTime = +new Date(); //获取当前的毫秒数
    var inputTime = +new Date(time);  //获取输入时间的毫秒数
    var times = Math.abs(inputTime - nowTime) / 1000 //获取两个时间差的秒数
    // 定义一个储存倒计时的变量的对象
    var obj = {};
    var d = parseInt(times / 60 / 60 / 24);
    d = d<10 ? '0' + d : d;
    var h = parseInt(times / 60 / 60 % 24);
    h = h<10 ? '0'+ h :h;
    var m = parseInt(times / 60 % 60);
    m = m<10 ? '0'+ m : m;
    var s = parseInt(times % 60);
    s = s<10 ? '0'+s : s;
    return obj = {
        day : d,
        hours : h,
        min : m ,
        sec : s
    }
    // console.log(d + '天' +  h + '小时' + m + '分钟' + s + '秒');

}

// Select sort 选择排列
function SelectSort(){
    var arr = [1,3,6,4,7,50,12,43,8,21,13,9];
    for(var i = 0 ; i < arr.length-1;i++){
        var index = i;
        for(var j = i+1;j <= arr.length ; j++){
            if(arr[index] > arr[j]){
                index = j;
            }
        }
        var empt = arr[index]
        arr[index] = arr[i]
        arr[i] = empt;
    }
}


// 计算两个时间差的函数
function formatDate(date1, date2) {
    // 对两个时间字符串进行实例化
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    // 定义一个对象，用于储存最后返回的所有变量
    var obj = {};
    // 获取两个时间的毫秒数
    var num1 = date1.getTime();
    var num2 = date2.getTime();
    // 俩个时间相减并求出其秒数
    var newDate = Math.abs((num1 - num2) / 1000);
    // 获取天数
    var day = parseInt(newDate / 3600 / 24);
    day = day > 10 ? day : '0' + day;
    // 获取小时
    return obj = {
        day: day,
        hour: hour,
        min: min,
        sec: sec
    }
}



// 封装一个函数 兼容的获取元素的样式
// 你要获取哪个元素的什么样式  box width
function getStyle(ele, attr) {
    var res;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr];
    } else {
        res = ele.currentStyle[attr];
    }
    return res;
}

// 封装一个事件监听的函数
// 事件源ele，事件类型type, 事件处理函数callback 可变
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback)
    } else {
        ele.attachEvent("on" + type, callback);
    }
}

function animation(ele,obj,callback){
    // 记录定定时器的个数
    let timerLen = 0;
    for(let key in obj){
        // 没for循环一次 那么timerLen 加一次
        timerLen++;
        let attr = key;
        let target = obj[key];
        // 获取元素的当前值
        let style;
        let speed;
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele[attr]);

        // 定义一个定时器 来执行动画的
        // 把定时器当成元素的属性存储起来
        // attr = width ele[attr] = ele.width
        // ele.height
        ele[attr] =  setInterval(()=>{
            // 没执行一次定时器的时候就需要获取元素的最新的当前值
            // opacity 的取值为 0-1 ===》0-100
            if(attr == "opacity"){
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele,attr) *100;
            }else{
                style = parseInt(getStyle(ele,attr)) ;
            }
            speed = (target - style) / 10; 
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                style += speed;
                if (target == style) {
                    clearInterval(ele[attr]);
                    // 没结束一个定时器，就让timerLen - 1
                    timerLen--;
                    // 如果在这个位置 去写动画结束 执行的代码，会执行多次，有几个定时就会执行几次
                //    ele.style.backgroundColor = "green";
                }
               
                // 如果属性为透明度的时候 ，样式是不需要单位的
                if(attr == "opacity"){
                    // 因为上面获取的时候 *100
                    ele.style[attr] = style/100;
                }else{
                    ele.style[attr] = style + 'px';
                }
                
                console.log(timerLen);
                 // 当timerLen = 0的时候说明所有动画都结束
                 if(timerLen == 0){
                    //  当有callback的时候那么久执行callback
                    // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                   callback && callback();
                }
        },30)
    }
}


// 定义ajax
function ajax(option){
    // 【1】判断url是否传递参数
    if(!option.url){
        // 手动抛出一个错误，
        throw new  Error('url的参数时必填的');
    }


    // 设置默认值
    let defOption = {
        type:'get',
        async:true
    }

    // 把传递过去来的参数写入默认值当中
    for(let key in option){
        defOption[key] = option[key]
    }

    //【1】如果传递的type不是 get 或者post的时候，抛出错误提示使用者，type的值只能为get 或者 post
    if(!(defOption.type == 'get' || defOption.type == 'post')){
        throw new Error('type参数只能为get 或者 post');
    }

    // 【3】判断async 是否布尔值
    // console.log(Object.prototype.toString.call(defOption.async));
    if(Object.prototype.toString.call(defOption.async) != '[object Boolean]'){
        throw new Error('async 的值只能为布尔值');
    }

    if(defOption.data){ 
        // 【4】判断参数 data 是否是对象 和字符串的数据类型
        let dataType = Object.prototype.toString.call(defOption.data);
        if(!(dataType== '[object String]' || dataType == '[object Object]')){
            throw new Error('data的格式只能为key=value&key=value 或者 {key:value}');
        }

        // 判断data参数是否 是对象，如果是对象需要把参数处理为 key=value&key=value
        if(dataType == '[object Object]'){
            let str = '';
            for(let key in defOption.data){
                str += key + '=' + defOption.data[key] + '&';
            }
            defOption.data = str.substr(0,str.length-1);
        }
        // 当参数为字符串的时候，判断是否有=号
        if(dataType == '[object String]' && !defOption.data.includes('=')){
            throw new Error('data格式只能为key=value')
        }
    }
    

    // 【5】判断callback回调函数 
    if(!defOption.success){
        throw new Error('success是必须存在的参数')
    }

    // 判断callback 是否是函数
    if(Object.prototype.toString.call(defOption.success) != '[object Function]'){
        throw new Error('success必须是函数')
    }

    // try  catch
    // try 尝试执行 try代码，如果try中灭有错误的时候不执行catch方法中代码
    // try 有逻辑错误的时候 就会执行 catch中代码
    try{
        let xhr = new XMLHttpRequest();
        // 判断请求的是类型 来写请求携带参数
        if(defOption.type == 'get'){
            xhr.open(defOption.type,defOption.url + (defOption.data ? '?' + defOption.data : '') ,defOption.async);
            xhr.send()
        }else if(defOption.type == 'post'){
            xhr.open(defOption.type,defOption.url,defOption.async);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(defOption.data);
        }
    
        // 判断请求异步还是同步
        if(defOption.async){
            xhr.onload = function(){
                defOption.success(xhr.responseText);
            }
        }else{
            defOption.success(JSON.parse(xhr.responseText));
        } 
    }catch(err){
        defOption.error(err)
    }  
}

function pAjax(params){
   return new Promise(function (resolve, reject) {
        ajax({
            url: params.url,
            data:params.data,
            type:params.type || 'get',
            async:params.async || true,
            success: function(res){
                resolve(res);
            },
            // error当执行请求数据出错的时候执行方法
            error:function(res){
                reject(res)
            }
        })
    });
}



/**
 * setCookie 用来设置 cookie 的方法
 * @param {STRING} key 你要存储的 cookie 的名称
 * @param {STRING} value 你要存储的 cookie 的值
 * @param {INT} expires 你设置的过期时间，按照秒计算的
 */
function setCookie(key, value, expires) {
    var time = new Date()
    var t1 = time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires
    time.setTime(t1)
  
    document.cookie = `${key}=${value};expires=${expires ? time : ''}`
  }
  
  /**
   * getCookie 用域获取 cookie 的某一个属性的值
   * @param {STRING} key 你要获取的 cookie 属性的名
   * @return {STRING}  就是你要获取的 cookie 属性的值
   */
  function getCookie (key) {
    var arr = document.cookie.split('; ')
  
    // 提前准备一个变量，用于记录 cookie 的值
    var value = ''
  
    // 如果数组中的 第 0 项 为 true
    if (arr[0]) {
      // 如果能进入到这里，证明 arr[0] 为 true
      // console.log(arr)
  
      // 遍历数组
      arr.forEach(item => {
        // url=http://gz2008.com/day06_code/project/html/detail.html?id=5
        // [url,http://gz2008.com/day06_code/project/html/detail.html?id,5]
        
        var tmp = item.split('=');
  
        if (tmp[0] === key) {
          value = tmp[1]
        }
      })
    }
  
    return value
  }
  
  /**
   * delCookie 用来删除 cookie 中指定的内容的
   * @param {STRing} key 你要删除的 cookie 的名
   */
  function delCookie (key) {
    setCookie(key, 'suibain', -10)
  }


// 获取图片的本身宽高
// res 为图片的地址
function getImgwh(res){
    var img_url = `${res}`

    // 创建对象
    var img = new Image();

    // 改变图片的src
    img.src = img_url;
    var obj ={};
    obj.width = img.width;
    obj.height = img.height;
    return obj;
}
  