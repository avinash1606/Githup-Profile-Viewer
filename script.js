
const input=document.getElementById("input-field");
const image=document.getElementById("image-container");
const following=document.getElementById("following");
const followers=document.getElementById("followers");
const repo=document.getElementById("repo-count");
const username=document.getElementById("name");
const bio=document.getElementById("bio");
const seconddiv=document.getElementById("second-div");

async function fetchData(username){
    let response=await fetch(`https://api.github.com/users/${username}`);
    let data=await response.json();
    console.log(data);
    displayUser(data);
   
}

// added listener to a input field so that i can be able to search on clicking enter
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        seconddiv.classList.add("second-div");
        seconddiv.classList.remove('divhidden');
        fetchData(input.value);
    }
}
);
document.getElementById("profile-search-btn").addEventListener('click',()=>{
    seconddiv.innerHTML=`<span class="loader"></span>`
    let result=fetchData(input.value);
    seconddiv.classList.add("second-div");
    seconddiv.classList.remove('divhidden');
    // result.then((data)=>{
    //     console.log(data);
    //     followers.innerText=data.followers;
    //     following.innerText=data.following;
    //     repo.innerText=data.public_repos;
    //     image.innerHTML=`<img src="${data.avatar_url
    //     }" alt="Example Image">`;

    //     bio.innerText=data.bio;
    //     username.innerText=data.name;



    // })



})

// document.getElementById("view-profile").addEventListener('click',()=>{
//     let result=fetchData(input.value);
//     result.then((data)=>{
//         console.log(data);
//         // window.location.href=data.
//         // html_url;

//         window.open(data.html_url, '_blank');
        
    
//     })

// })

function displayUser(data){
    if(!data.avatar_url){
        seconddiv.innerHTML=`<h1>User not founnd</h1>`
        return ;
    }
    seconddiv.innerHTML=` <div>
    <div id="image-container"><img src="${data.avatar_url}" alt="user-image"></div>
    <div>
        <div id="name">${data.name}</div>
        <div id="bio">${data.bio}</div>
    </div>
</div>
<div id="info">
    <div id="follower-count">
        <div><p>Follower</p>
        <p id="followers">${data.followers}</p></div>
        <div><p>Following</p>
        <p id="following">${data.following}</p></div>
        <div><p>Repo</p>
        <p id="repo-count">${data.public_repos}</p></div>

    </div>
    <div id="view-profile"><a href=${data.html_url} target="_blank"><button>View Profile</button></a></div>`
}