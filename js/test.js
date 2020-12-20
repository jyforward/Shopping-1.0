// pAjax({
//     url:"api",
//     type:"post",
// }).then(res=>{
//     console.log(res);
// })
// $.ajax({
//     type: "get",
//     url: "api",
//     dataType: "json",
//     success: function (response) {
//         console.log(response);
//     }
// });
$.ajax({
    type: "get",
    url: "api",
    dataType: "json",
    success: function (response) {
        // console.log(JSON.parse(response));
        console.log(response);
    }
});