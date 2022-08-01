const faces = [];

const renderFaces = function () {
  $(".faces").empty();

  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    let source = $("#faces-template").html();
    let template = Handlebars.compile(source);
    let newHTML = template(face);
    $(".faces").append(newHTML);
  }
};

$(".search").click(function () {
  let search = $("#search-query").val();
  fetch(search);
});

const addFaces = function (data) {
  let face = {
    avatar_url: data.author.avatar_url,
    login: data.author.login,
  };

  faces.push(face);

  renderFaces();
};

const fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/repos/facebook/react/commits/" + query,
    dataType: "json",
    success: function (data) {
      addFaces(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};
