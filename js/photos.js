var userId=null
$(document).ready(()=>{
    var link=window.location.href
    userId=link.slice(link.indexOf("albumId=")+8)
    userId=userId.replaceAll("/", "")
    if(isNaN(Number(userId)) || userId.length==0) {
      console.log("back");
        goBack()
    }else{
      console.log("go");
        getData()
    }
})


const goBack=()=>{
    var link=window.location.href
    var newLink=link.slice(0, link.indexOf('html/'))+'index.html'
    window.location.href=newLink
}


const getData=()=>{
   if (userId!=null) {
      $.ajax({
         url:`${api}/photos?albumId=${userId}`,
         method:"get",
         success:(res)=>{
            console.log(res)
            if(res.length==0) {
               goBack()
            }else {
               getImages(res)
            }
         },
         error:(err)=>{
            console.log(err)
         },
      })
   }
}


const openModal=(url)=>{
   $(".container").css({
      // "overflow": "hidden !important",
      "padding-right": "17px !important"
   })
   $(".modal-dialog img").attr("src", url)
   $("#exampleModal").modal("show")
   
} 
const closeModal=()=>{
   $(".container").css({
      // "overflow": "auto !important",
      "padding-right": "0 !important"
   })
   $("#exampleModal").modal("hide")
}

const getImages=(data)=>{
   $(".body").html("")
   data.map((item, key)=>{
      $(".body").append(`
      <tr>
      <td class="title-text" scope="col">${key+1}</td>
      <td class="title-text" >${item.title}</td>
      <td scope="col">
         <div class="mini-box">
            <img class="img" onclick="openModal('${item.url}')" src="${item.thumbnailUrl}">
         </div>
      </td>
      </tr>
      `)
   })
}