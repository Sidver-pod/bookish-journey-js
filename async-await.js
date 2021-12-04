/* using Promise */
// console.log('person1: shows ticket');
// console.log('person2: shows ticket');

// const promiseWifeBringingTicks = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('ticket'), 3000);
// });

// const getPopcorn = promiseWifeBringingTicks
// .then((tick) => {
//     console.log(`wife: here are the tickets`);
//     console.log('husband: we should go in');
//     console.log('wife: no! I am hungry');
//     return new Promise((resolve, reject) => resolve(`person3: shows ${tick} & popcorn`));
// });

// const getButter = getPopcorn.then((tickNpopcorn) => {
//     console.log(`husband: here's your popcorn! we should go in`);
//     console.log(`wife: I need butter on my popcorn`);
//     return new Promise((resolve, reject) => resolve(`${tickNpopcorn} & puts butter on it`));
// });

// const getColdDrinks = getButter.then((tickNpopNbutter) => {
//     console.log(`husband: here's butter on your popcorn. shall we now?`);
//     console.log(`wife: yes please!`);
//     console.log(`husband: but first I'm gonna go grab some cold drinks. I'm tired.`);
//     return new Promise((resolve, reject) => resolve(`${tickNpopNbutter} & gets cold drinks!`));
// });

// getColdDrinks.then((result) => console.log(result));

//  console.log('person4: shows ticket');
//  console.log('person5: shows ticket');

/* using ASYNC/AWAIT */
console.log('person1: shows ticket');
console.log('person2: shows ticket');
console.log(`person3: my wife has got our tickets 😬. i'll wait...`);

const preMovie = async () => {
    //#1
    const promiseWifeBringingTicks = new Promise ((resolve, reject) => {
        setTimeout(() => resolve(`TICKETS`), 3000);
    });

    //#2
    const getPopcorn = new Promise((resolve, reject) => resolve(`popcorn`));

    //#3
    const getButter = new Promise ((resolve, reject) => resolve(`butter`));

    //#4
    const getColdDrinks = new Promise((resolve, reject) => resolve(`cold drinks`));

    let ticket = await promiseWifeBringingTicks; //the code doesn't move forward unless this `await` gets resolved

    console.log(`wife: here are the tickets 🎟🎟`);
    console.log('husband: we should go in');
    console.log('wife: no! I am hungry. get me Popcorn...🍿');

    let popcorn = await getPopcorn; //after the above instruction gets resolved, `popcorn` is then awaited to get resolved!

    console.log(`husband: here's your ${popcorn}! we should go in...`);
    console.log(`wife: I need butter on my popcorn 🧈`);

    let butter = await getButter;

    console.log(`husband: here's your popcorn with ${butter} on it. can we go now?? 😠`);
    console.log(`wife: yes please! 😋`);
    console.log(`husband: finally... phew! but I'm gonna go get cold drinks now 'cause I'm tired 😒`);
    console.log(`wife: huh! 😟`);

    let coldDrinks = await getColdDrinks;

    console.log(`husband: let's go I've got the ${coldDrinks} 🥤🥤`);

    return ticket;
};

preMovie().then(ticket => console.log(`HERE ARE THE ${ticket}! 🎟🎟 🎬`));

console.log('person4: shows ticket');
console.log('person5: shows ticket');

/* createPost & deletePost with ASYNC/AWAIT */

//mimicking a few posts that already exist!
const posts = [
    {
        title: 'Story of my life',
        body:   `The ticking of the wall-clock loomed about in the stillness within the room,

                “Tick … Tick … 
                Tick … Tick …”
                
                The End.`,
        author: 'Siddharth Verma'
    },
    {
        title: 'High up in the skies',
        body:   `A balloon, 
                
                SO BIG,
                
                bigger than what I could even oddly imagine in the wildest of my dreams took flight right before my eyes.

                “Bouh … Bouh … 
                Bouh … Bouh …”
                
                The End.`,
        author: 'Siddharth Verma'
    }
];

var count = 0; //helps give a unique `id`

//#0
var newDiv; //global

const createPost = (newPost) => {
    count++; //update
    newDiv = document.createElement(`div`);
    newDiv.id = `post-${count}`; //post-1, post-2, post-3...

    //#1
    const postNum = `#${count}`;
    const newTitle = document.createElement('div');
    newTitle.id = `title`;
    newTitle.innerHTML = `<h2>${postNum} ${newPost.title}</h2><hr>`;

    //#2
    const newBody = document.createElement('div');
    newBody.id = `body`;
    const para = document.createElement('p');
    para.innerText = `${newPost.body}`;
    newBody.appendChild(para);
    const hr = document.createElement(`hr`);
    newBody.appendChild(hr);

    //#3
    const newAuthor = document.createElement('div');
    newAuthor.id = 'author';
    newAuthor.innerHTML = `<b>Post by: </b><i>${newPost.author}</i>`;

    //FINALLY! putting all the elements inside <div> </div>
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newBody);
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(newAuthor);
};

/* 
#0 post - <div> ... </div>
    #1 title - <div> TITLE </div>
    #2 body - <div> BODY </div>
    #3 author - <div> AUTHOR </div>
*/

//#4
var newSpan;
const lastUpdated = () => {
    newSpan = document.createElement('span');
    newSpan.id = `lastUpdated`;
    newSpan.innerText = ` | updated 0s ago.`; //#5
};

/* 
#4 last updated - <span> </span>
    #5 timer
*/

var flag = 0;
var timerID;
const postDeployment = (post) => {
    return new Promise((resolve, reject) => {
        if(flag === 1){
            flag = 0; //reset
            //removing the previous 'update' element from the previous post!
            clearInterval(timerID);
            //document.getElementById(`post-${count}`).children[3].lastElementChild;
            document.getElementById(`lastUpdated`).remove();
        }
    
        Promise.all([createPost(post), lastUpdated()]);
    
        document.getElementById(`posts`).appendChild(newDiv);
    
        //injecting the last updated element beside the author
        document.getElementById(`post-${count}`).children[3].appendChild(newSpan);
        var timer = 0;
        timerID = setInterval(() => {
            flag = 1;
            timer++;
            const update = ` | updated ${timer}s ago.`;
            document.getElementById(`post-${count}`).children[3].lastElementChild.innerText = update;
        }, 1000);
    
        document.getElementById('posts').appendChild(document.createElement('br'));
        
        resolve();
    });
};

var delCount = 0;
function postDeletion(){
    return new Promise((resolve, reject) => {
        delCount++; //update
        const postToDelete = document.getElementById(`post-${delCount}`);
        postToDelete.remove();
        
        resolve();
    });
};

function timeout(ms){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
}

async function automatedPosting(){
    try{
        await postDeployment(posts[0]); //first post
        await timeout(3000);
        await postDeployment(posts[1]); //second post; posted after '3' seconds!

        return `SUCCESS`;
    }
    catch(err){
        console.log(err);
    }
}

automatedPosting().then((m) => console.log(m));

async function automatedDeletion(){
    await timeout(8000);
    await postDeletion(); //deletes first post after '8' seconds
    await timeout(3000);
    await postDeletion(); //deletes second post after '3' more seconds
    clearInterval(timerID); //clearing up the update timer of the second post
}

automatedDeletion();
