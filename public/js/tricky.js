//Zihan Xu
let myButton = document.getElementById("sharestor");
let myHeading = document.querySelector("#story");

function tricky() {
  let str;
  function setUserStory() {
    let myStory = prompt("Please enter your story:");
    if (!myStory) {
      setUserStory();
    } else {
      localStorage.setItem("name", myStory);
      str = "Welcome to the land of reality, " + myStory;
      myHeading.innerText = str;
    }
  }

  if (!localStorage.getItem("name")) {
    setUserStory();
  } else {
    let storedStory = localStorage.getItem("name");
    str = "New user posted: " + storedStory;
    myHeading.innerText = str;
  }
  console.log(str);
}

myButton.onclick = function () {
  tricky();
};
