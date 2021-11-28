// /* Promise */
// const Posts = [
//     {title: 'Post One', body: 'This is post one'},
//     {title: 'Post Two', body: 'This is post two'}
// ];

// function getPosts(){
//     setTimeout(() => {
//         let output = '';
//         Posts.forEach((post) => {
//             output += `<li>${post.title}</li>`;
//         });
//         document.getElementById('update').innerHTML = output;
//     }, 1000);
// }

// function createPost(post){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             Posts.push(post);
//             const error = false;
//             if(!error){
//                 resolve();
//             } else {
//                 reject('Error! Something went wrong.');
//             }
//         }, 2000);
//     });
// }

// var clicked = 0; //checks whether user clicked the delete-button or not

// createPost({title: 'Post Three', body: "This is post three"})
//  .then(getPosts)
//  .catch(message => console.log(message));

//  function deletePost(click){
//      return new Promise((resolve, reject) => {
//          setTimeout(() => {
//              if(click){
//                  clicked = 0; //reset

//                  //checking for whether there are any children at all to be deleted!
//                  if(document.getElementById('update').children.length == 0){
//                      reject("Array is empty now!");
//                  } else {
//                      //deleting the last child
//                      resolve("Deleted the Nth child!");
//                  }
//              } else {
//                  reject("Did not click the delete button!");
//              }
//          }, 1000);
//      });
//  }

//  document.getElementById('del-butn').addEventListener('click', () => {
//      clicked = 1;
//      deletePost(clicked)
//       .then((message) => {
//           document.getElementById('update').lastElementChild.remove();
//           console.log(message);
//       })
//       .catch(message => console.log(message));
//  });

//  //creating & then deleting a post
//  createPost({title: 'Post Four', body: 'This is post four'})
//   .then(() => {
//       //#1 creating post
//       getPosts();

//       //#2 deleting post
//       deletePost(1)
//        .then((message) => {
//            document.getElementById('update').lastElementChild.remove();
//            console.log(message);
//        })
//        .catch(message => console.log(message));
//   })
//   .catch(message => console.log(message));

/* Promise.all */
var num = 0; //helps keep count of new posts as well as assign a new id!
var newDiv; //global declaration
function createPost(post){
    //#0
    num++; //updating count
    newDiv = document.createElement('div');
    newDiv.id = `post-${num}`;
    
    //#1
    const postNum = `#${num} `;
    const titleDiv = document.createElement('div');
    titleDiv.id = `post-title`;
    titleDiv.innerHTML = `<h2>${postNum + post.title}</h2><hr>`;

    //#2
    const bodyDiv = document.createElement('div');
    bodyDiv.id = `post-body`;
    const para = document.createElement('p');
    para.innerText = `${post.body}`;
    bodyDiv.appendChild(para);
    const hr = document.createElement('hr');
    bodyDiv.appendChild(hr);

    //#3
    const authorDiv = document.createElement('div');
    authorDiv.id = `post-author`;
    authorDiv.innerHTML = `<b>Post by: </b><i>${post.author}</i>`;

    //making the newly defined divisions the children of `newDiv`
    newDiv.appendChild(titleDiv);
    newDiv.appendChild(bodyDiv);
    newDiv.appendChild(authorDiv);
}

const newPost = {
    title: 'Story of my life',
    body: `The ticking of the wall-clock loomed about in the stillness within the room,

    “Tick … Tick … 
    Tick … Tick …”
    
    The End.`,
    author: 'Siddharth Verma'
};

//createPost(newPost); //first post

const newPostTwo = {
    title: 'High up in the skies',
    body: `A balloon, 
    
    SO BIG,
    
    bigger than what I could even oddly imagine in the wildest of my dreams took flight right before my eyes.

    “Bouh … Bouh … 
    Bouh … Bouh …”
    
    The End.`,
    author: 'Siddharth Verma'
};

//createPost(newPostTwo); //second post

/* 
#0 Post:
    #1 title
    #2 body
    #3 author
*/

//initialisations...
var count = 0;
var timerID;

var newSpan; //global declaration
function lastUpdatedAgo(){
    if(timerID !== undefined){
        clearInterval(timerID);
        count = 0; //reset
        /* had to remove because of addition of `deletionPromise()` */
        //document.getElementById('update').remove();
    }

    //creating a new `span` element
    newSpan = document.createElement('span');
    newSpan.id = `update`;
    newSpan.className = `updt`;
    const update = `Updated ${count}s ago.`;
    newSpan.innerText = update;

    //setInterval will run again & again every `1000ms`
    timerID = setInterval(()=>{
        count++; //update
        newSpan.innerText = `Updated ${count}s ago.`;
    }, 1000);
}

//lastUpdatedAgo();

/*
#4 lastUpdatedAgo:
    #5 time
*/

Promise.all([createPost(newPost), lastUpdatedAgo(0)])
 .then(() => {
     //injecting `newDiv` inside the `body` of HTML
     document.body.appendChild(newDiv);
     /* IMPORTANT: the code right below this line should be executed in the `.then` of `promise.all` */
     document.getElementById(`post-1`).children[2].appendChild(newSpan);

     //prints onto the console!
     console.log(`${document.getElementById(`post-1`).innerText}`);

     //calling deletion Promise
     deletionPromise()
      .then(console.log(`Deleted Post-${delCount}`));
 });

 /* mimicking a new post being uploaded after about 10 seconds! */
setTimeout(()=>{
    Promise.all([createPost(newPostTwo), lastUpdatedAgo(0)])
     .then(() => {
         //injecting `newDiv` inside the `body` of HTML
         document.body.appendChild(newDiv);
         /* IMPORTANT: the code right below this line should be executed in the `.then` of `promise.all` */
         document.getElementById(`post-2`).children[2].appendChild(newSpan);   

         //prints onto the console!
         console.log(`${document.getElementById(`post-2`).innerText}`);

        //calling deletion Promise
        deletionPromise()
         .then(console.log(`Deleted Post-${delCount}`));
     })
}, 10000);

//initialisation
var delCount = 0;

//deletion promise
function deletionPromise(){
    return new Promise((resolve, reject) => {
        delCount++; //update
        const deletePost = document.getElementById(`post-${delCount}`);
        deletePost.remove();
        resolve();
    });
}
