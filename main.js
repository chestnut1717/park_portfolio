var typingBool = false; 
var typingIdx=0; 
var liIndex = 0;
var liLength = document.querySelector(".text__typing").childElementCount;


var findText = document.getElementsByClassName("text__typing");
var typingTextList = findText[0].innerText.split("\n");

// var typingText = typingTextList[liIndex];

if(typingBool==false){ // 타이핑이 진행되지 않았다면 
    typingBool=true; 
    var tyInt = setInterval(typing,100); // 반복동작 
} 
     
function typing(){
  var typingText = typingTextList[liIndex];
  var typedText = document.querySelector(".typing").innerText;

  if (typingIdx<typingText.length){ // 타이핑될 텍스트 길이만큼 반복 
    typedText = typedText + typingText[typingIdx]; // 한글자씩 이어준다.
    document.querySelector('.typing').innerText = typedText;
    typingIdx++; 
   } else { //한문장이끝나면
     //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로 
     if (liIndex>=liLength-1){
       liIndex=0;
     } else {
       liIndex++; 
     }
     
     //다음문장을 타이핑하기위한 셋팅
        typingIdx=0;
        typingBool = false; 
       
     //다음문장 타이핑전 1초 쉰다
         clearInterval(tyInt);
         setTimeout(function(){
            document.querySelector('.typing').innerText = "";
            tyInt = setInterval(typing,100);
         },1000);
    } 
}  



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