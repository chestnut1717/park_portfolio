// Skills menu

const skillMenu = document.querySelector(".skill__menu");
const skillMenuAll = document.querySelectorAll(".skill__menu > .skill__menu__item");
const skills = document.querySelectorAll(".skill__graph > .skill");

// skills to be invisible when page is first opened
skills.forEach((skill) => {
  if (!skill.classList.contains("default")){
    skill.classList.add('invisible');
  }
});

skillMenu.addEventListener('click', (e) => {
  // filtering 
  const filter = e.target.dataset.filter;
  skills.forEach((skill) => {
    if (filter == skill.dataset.type) {
      skill.classList.remove('invisible')
    } else {
      skill.classList.add('invisible');
    }
  });

  // add active class to selected menu to be colored.
  skillMenuAll.forEach((menu) => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
    } else if(e.target == menu ) {
      menu.classList.add("active");
      return;
    }


  });

}
);