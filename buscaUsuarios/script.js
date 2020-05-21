let usersData;
let filteredUsers = [];
let titleUsers = document.querySelector("#titleUsers");
let titleStatistics = document.querySelector("#titleStatistics");
let search = document.querySelector("#searchUser");
let button = document.querySelector(".btn");
let users = document.querySelector(".users");
let statistics = document.querySelector(".statistics");

window.addEventListener("load", () => {
  getDataUsers();
  listenerInput();
  listenerButton();
  setTitleUsers();
  setTitleStatistics();
});

const getDataUsers = async () => {
  const data = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const dataJson = await data.json();
  console.log(dataJson);
  usersData = dataJson.results.map((item) => {
    const { gender, name, picture, dob } = item;
    return {
      gender,
      name: name.first,
      lastName: name.last,
      picture: picture.thumbnail,
      age: dob.age,
    };
  });
};

const listenerInput = () => {
  search.addEventListener("keyup", (event) => {
    changeStateButton();
    if (event.key === "Enter") {
      if (search.value.split(` `).join(``)) {
        filterUsers();
      } else {
        filteredUsers = [];
        render();
        setTitleUsers();
        setTitleStatistics();
      }
    }
  });
};

const listenerButton = () => {
  button.addEventListener("click", () => {
    if (search.value.split(` `).join(``)) {
      filterUsers();
    }
  });
};

const changeStateButton = () => {
  if (search.value.split(` `).join(``)) {
    button.classList.remove("disabled");
  } else {
    button.classList.add("disabled");
  }
};

const filterUsers = () => {
  filteredUsers = usersData.filter((user) => {
    return isEqualStrings(user.name, user.lastName);
  });
  render();
};

const isEqualStrings = (str1, str2) => {
  concat = str1.toLowerCase() + " " + str2.toLowerCase();
  return concat.indexOf(search.value.toLowerCase()) !== -1;
};

const render = () => {
  renderUsers();
  renderStatistics();
};

const renderUsers = () => {
  let html = "<ul>";
  filteredUsers.forEach((item) => {
    html += `<li>`;
    html += `<img src="${item.picture}" class="rounded-user">`;
    html += `<h5>${item.name} ${item.lastName}, ${item.age} anos</h5>`;
    html += `</li>`;
  });
  html += "</ul>";
  users.innerHTML = html;
  setTitleUsers();
};

const renderStatistics = () => {
  let html = "";
  if (filteredUsers.length) {
    let man = filteredUsers.filter((item) => {
      return item.gender == "male";
    });
    let woman = filteredUsers.filter((item) => {
      return item.gender == "female";
    });
    let ages = filteredUsers.reduce((acumulated, current) => {
      return acumulated + current.age;
    }, 0);
    let avgAges = Math.round(ages / filteredUsers.length) || 0;

    html = "<ul>";
    html += `<li>`;
    html += `<h5>Sexo masculino: ${man.length}</h5>`;
    html += `</li>`;
    html += `<li>`;
    html += `<h5>Sexo feminino: ${woman.length}</h5>`;
    html += `</li>`;
    html += `<li>`;
    html += `<h5>Soma das idades: ${ages}</h5>`;
    html += `</li>`;
    html += `<li>`;
    html += `<h5>Média das idades: ${avgAges}</h5>`;
    html += `</li>`;
    html += "</ul>";
  }
  statistics.innerHTML = html;
  setTitleStatistics();
};

const setTitleUsers = () => {
  if (!filteredUsers.length && !search.value.split(` `).join(``)) {
    titleUsers.innerHTML = "Nenhum filtro aplicado";
  } else if (!filteredUsers.length) {
    titleUsers.innerHTML = "Nenhum usuário encontrado";
  } else if (filteredUsers.length == 1) {
    titleUsers.innerHTML = `${filteredUsers.length} usuário encontrado:`;
  } else {
    titleUsers.innerHTML = `${filteredUsers.length} usuários encontrados:`;
  }
};

const setTitleStatistics = () => {
  if (!filteredUsers.length) {
    titleStatistics.innerHTML = "Nada a ser exibido";
  } else {
    titleStatistics.innerHTML = `Estatísticas:`;
  }
};
