function loadCategory() {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategory(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    const categoryDiv = document.createElement("Div");
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick = "loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ""

  if(videos.length == 0 ){

    videoContainer.innerHTML = `
    <div class="flex py-20 col-span-full flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
    `
    return;
  }
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("Div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
              <img class = "w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bg-black text-white rounded text-sm bottom-1 right-1">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-1 py-5">
             <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
             </div>

             <div class="intro">
                <h2 class="font-semibold text-sm">Midnight Serenade</h2>
                <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=6xO3fnY41hu2&format=png" alt=""> </p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
             </div>
            
            </div>
          </div>

        
        `;
    videoContainer.append(videoCard);
  });
};

const loadCategoryVideos = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active")
        console.log(clickedButton);

        displayVideos(data.category);

    })
}

loadCategory();

