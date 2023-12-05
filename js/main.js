$(document).ready(() => {
  getUsers();
});

const getUsers = () => {
  $.ajax({
    url: `${api}/albums`,
    method: "get",
    success: (res) => {
      console.log(res);
      getInfo(res);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

const getInfo = (data) => {
  $(".body").html("");
  data.map((item, key) => {
    $(".body").append(`
      <tr>
      <td scope="col">${key + 1}</td>
      <td>${item.title}</td>
      <td scope="col">
         <div class="min-box">
            <a href="./html/photos.html?albumId=${item.id}" class="btn btn-primary">
               <i class="fa fa-eye" aria-hidden="true"></i>
            </a>
         </div>
      </td>
      </tr>
      `);
  });
};
