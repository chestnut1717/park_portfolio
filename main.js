'use strict';

// Transparent Navbar

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// button to scroll
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});


// Navbar toggle button open menu
const navbarToggleButton = document.querySelector('.navbar__toggle-btn');

navbarToggleButton.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Trahsparent When Scrolling
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });                            
});

document.querySelectorAll('.section__container').forEach((wrapper) => io.observe(wrapper));

var typingBool = false; 
var typingIdx=0; 
var liIndex = 0;
var liLength = document.querySelector(".text__typing").childElementCount;
// Cursor Active Deactive
var cursor = document.querySelector(".cursor");

var findText = document.getElementsByClassName("text__typing");
var typingTextList = findText[0].innerText.split("\n");


if(typingBool==false){ // 타이핑이 진행되지 않았다면 
    typingBool=true; 
    var tyInt = setInterval(typing,110); // 반복동작 
}
     
function typing(){
  var typingText = typingTextList[liIndex];
  var typedText = document.querySelector(".typing").innerText;


  if (typingIdx<typingText.length){ // 타이핑될 텍스트 길이만큼 반복 
    typedText = typedText + typingText[typingIdx]; // 한글자씩 이어준다.
    document.querySelector('.typing').innerText = typedText;
    typingIdx++; 
    cursor.classList.remove("blink");
   } else { //한문장이끝나면
     //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로 
     if (liIndex>=liLength){
       liIndex=0;
     } else {
       liIndex++; 
     }
     
     //다음문장을 타이핑하기위한 셋팅
        typingIdx=0;
        typingBool = false; 
       
     //다음문장 타이핑전 1초 쉰다
         clearInterval(tyInt);
         cursor.classList.add("blink");
         setTimeout(function(){
            document.querySelector('.typing').innerText = "";
            tyInt = setInterval(typing,110);
         },1200);
    } 
}  



// Skills menu

const skillMenu = document.querySelector(".skill__menu");
const skillMenuAll = document.querySelectorAll(".skill__menu > .skill__menu__item");
const skills = document.querySelectorAll(".skill__graph  .skill");

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


// My Work

// click and image scaling effect
const outer = document.querySelector(".work__projects");
const inners = document.querySelectorAll(".project");



outer.addEventListener('click', (e) => {

	inners.forEach((inner) => {
    console.log();
    // project 자신이거나, project__img이거나, project description 산하의 모든 것들(나중에 수정해야함)
    if (e.target ===inner | e.target.parentNode === inner | e.target.parentNode.parentNode == inner | e.target.parentNode.parentNode.parentNode == inner | e.target.parentNode.parentNode.parentNode.parentNode == inner) {
    	inner.classList.toggle("bigger");
      const projectContent = inner.querySelector(".content");
      projectContent.classList.toggle('visible');
    } else if (e.target === outer) {
    	return;

    } else{
    	inner.classList.toggle("noClick");
    }
  });
	}
);


// arrow up

const homeHeight = home.getBoundingClientRect().height;
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({'behavior' : 'smooth'});
}


// click project button
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  
  // Remove Selection from the previous item and select new one
  const active = document.querySelector('.work__categories > .selected');
  active.classList.remove('selected');
  
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() =>{
    projects.forEach((project) => {
      if(filter === '*' || filter == project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');

      }
    })
    projectContainer.classList.remove('anim-out');
  }, 300);
});