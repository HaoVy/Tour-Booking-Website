btnSearch=document.getElementById("btn-search")
$("#btn-search").click(function(event){
    s=$("$search").val()
})
btnSearch.onclick=function(){
    $("#form-inline").method = "GET"
    $("#form-inline").action=`/products/search/${s}`
    $("#form-inline").submit()
}