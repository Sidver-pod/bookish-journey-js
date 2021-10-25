document.getElementById('click-me').addEventListener('click', (e) => {
  e.preventDefault();
  console.log("clicked me");
});

window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  function callBack(){
    console.log('DOM has loaded');
  }
  
  function execute(print){
    print();
  }
  
  execute(callBack);
});
