var num = 0; //helps keep count of new posts as well as assign a new id!
var newDiv; //global declaration
function createPost(post){
    return new Promise((resolve, reject) => {
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

        resolve();
        reject(`Can't Post`);
    });
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
    return new Promise((resolve, reject) => {
        if(timerID !== undefined){
            clearInterval(timerID);
            count = 0; //reset
            document.getElementById('update').remove();
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

        resolve();
        reject(`Can't Update!`);
    });
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
 })
 .catch(message => console.log(message));

 /* mimicking a new post being uploaded after about 10 seconds! */
setTimeout(()=>{
    Promise.all([createPost(newPostTwo), lastUpdatedAgo(0)])
     .then(() => {
         //injecting `newDiv` inside the `body` of HTML
         document.body.appendChild(newDiv);
         /* IMPORTANT: the code right below this line should be executed in the `.then` of `promise.all` */
         document.getElementById(`post-2`).children[2].appendChild(newSpan);   
     })
     .catch(message => console.log(message));
}, 10000);
