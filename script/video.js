

function getTimesetup(time) {

    const day = parseInt(time / 86400);
    let seconde = time % 86400;
    const hour = parseInt(seconde / 3600);
    seconde = seconde % 3600;
    const minute = parseInt(seconde / 60);
    seconde = seconde % 60;

    let result = "";
    if (day > 30) {
        const week = parseInt(day / 7); // Calculate the number of weeks
        result += `${week} week `;
    } else if (day > 0) {
        result += `${day} day `;
    }
    if (hour > 0) {
        result = result + `${hour} h `;
    }
    if (minute > 0) {
        result = result + `${minute} m `;
    }
    if (seconde > 0 || result === "") {
        result = result + `${seconde} s `
    }
    // return `${day} day ${hour} hour ${minute} minute ${seconde} seconde ago`;
    return result.trim() + " ago";
}



const loadCatagoric = () => {
    // console.log("loadCatagoric created ");
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        .then(res => res.json())
        .then(data => displayCatagoric(data.categories))
        .catch(error => console.log(error))
}

const displayCatagoric = (categories) => {
    const catagoryconatiner = document.getElementById("catagorys");

    categories.forEach((item) => {
        // console.log(item);
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =
            `
        <button id="btn-${item.category_id}" onclick="loadCatagorisvideos(${item.category_id})" class="btn catagory-btn">
        ${item.category}
        </button>
        `

        catagoryconatiner.append(buttonContainer)
    });

}


const loadDetails = async(videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    DisplayDetails(data.video)
    
}

const DisplayDetails=(video)=>{
console.log(video);

}

// {
//     "status": true,
//     "message": "Successfully fetched the video with video id 'aaac'",
//     "video": {
//       "category_id": "1003",
//       "video_id": "aaac",
//       "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//       "title": "Laugh at My Pain",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//           "profile_name": "Kevin Hart",
//           "verified": false
//         }
//       ],
//       "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//       },
//       "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
//     }
//   }
const loadVideo = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => DisplayVideos(data.videos)
        )
        .catch(error => console.log(error))
}

const loadCatagorisvideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            // spbaike actrive class k remove koro
            removeactiveclass();

            // 
            const acivebtn = document.getElementById(`btn-${id}`);
            acivebtn.classList.add("active")

            DisplayVideos(data.category)
        })
        .catch(error => console.log(error))
}

const removeactiveclass = () => {
    const buttons = document.getElementsByClassName("catagory-btn");
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
}

const DisplayVideos = (video) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML = "";
    // console.log(video);
    if (video.length === 0) {
        // sobay k  active + remove koro

        // id er class k acive koro
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[400px] flex flex-col justify-center items-center my-auto">
        <img src="asset/Icon.png"/>
        <h2 class="font-bold text-2xl text-center my-4">Oops!! Sorry, There is no content here</h2>
        </div>
        `

        return;

    }
    else {
        videoContainer.classList.add("grid");

    }
    video.forEach((last => {
        // console.log(last);
        const card = document.createElement('div');
        // const title1 = document.createElement('p');
        card.classList = "card card-compact  ";
        card.innerHTML = `
         <figure class="h-[200px] relative">
    <img  class="h-full w-full object-cover" src="${last.thumbnail}" />
    ${last.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-xs text-white">${getTimesetup(last.others.posted_date)}</span>`
            }
    
  </figure>
  <div class="px-0 py-2 flex">
      <div class="w-10 rounded-full ">
                  <img class="rounded-full " src="${last.authors[0].profile_picture}" />
      </div>
        <div  class="items-center ml-2">
             <h2 class="font-bold">${last.title}</h2>
             <div class="flex items-center gap-2">
              <p class="text-gray-400">${last.authors[0].profile_name}</p>
            
              ${last.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
            </div>
             <p>
                 <button onclick="loadDetails('${last.video_id}')" class="btn btn-sm btn-error">Details</button>
             </p>
      </div>
   
  </div>
        `;

        videoContainer.append(card)

    }))

}

loadCatagoric();

loadVideo();