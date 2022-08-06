
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "11.jpg"
    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
    
    
]

const songList2 = [
    {
        title: "Healing",
        file: "healing.mp3",
        cover: "1.jpeg"
    },
    {
        title: "Nightcore This-is-war",
        file: "nightcore-this-is-war.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Nightcore-waves",
        file: "nightcore-waves.mp3",
        cover: "3.jpeg"
    },
    {
        title: "Nightcore-waves",
        file: "nightcore-waves.mp3",
        cover: "3.jpeg"
    },
    {
        title: "Nightcore-waves",
        file: "nightcore-waves.mp3",
        cover: "3.jpeg"
    },
    {
        title: "Nightcore-waves",
        file: "nightcore-waves.mp3",
        cover: "3.jpeg"
    },
]



let actualSong = null
let actualSong2 = null

const songs = document.getElementById("songs")
const songs2 = document.getElementById("songs2")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")

const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

audio.addEventListener("timeupdate", updateProgress)

play.addEventListener("click", ()=>
{
    if (audio.paused){
        playSong()
    }else{
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())


prev.addEventListener("click", () => prevSong())

// Cargar canciones y mostrar el listado
function loadSongs(){
    songList.forEach((song, index) => {
        const li = document.createElement("li")
        const link = document.createElement("a")
        link.textContent = song.title
        link.href = "#"
        link.addEventListener("click", () => loadSong(index))
        li.appendChild(link)
        songs.appendChild(li)
    })
    songList2.forEach((song, index) => {
        const li = document.createElement("li")
        const link = document.createElement("a")
        link.textContent = song.title
        link.href = "#"
        link.addEventListener("click", () => loadSong2(index))
        li.appendChild(link)
        songs2.appendChild(li)
    })
    
    
}


// Cargar canción seleccionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeSongtitle(songIndex)
        changeCover(songIndex)
    }
   
}
function loadSong2(songIndex){
    if(songIndex !== actualSong2){
        changeActiveClass(actualSong2, songIndex)
        actualSong2 = songIndex
        
        audio.src = "./audio/" + songList2[songIndex].file
        playSong2()
        changeSongtitle2(songIndex)
        changeCover(songIndex)
    }
   
}



function updateProgress(event){
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration)*100
    progress.style.width = percent + "%"
}

function setProgress(event){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth)*audio.duration
    audio.currentTime = current
}

function updateControls(){
    if(audio.paused){
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    }else{
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

function playSong(){
    if(actualSong !== null){
        audio.play()
        updateControls()
    }
}
function playSong2(){
    if(actualSong2 !== null){
        audio.play()
        updateControls()
    }
}

function pauseSong(){
    audio.pause()
    updateControls()
}

function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll("a")
    if(lastIndex !== null){
        links[lastIndex].classList.remove("active")
        
    }
    links[newIndex].classList.add("active")
}

function changeCover(songIndex){
    cover.src = "./images/" + songList[songIndex].cover
    
}

function changeSongtitle(songIndex){
    title.innerText = songList[songIndex].title
   
    
}
function changeSongtitle2(songIndex){
    title.innerText = songList2[songIndex].title
   
    
}

function prevSong(){
    if(actualSong > 0){
        loadSong(actualSong - 1)
        if(actualSong2 > 0){
            loadSong(actualSong2 - 1)
        }else{
            loadSong(songList2.length - 1)
            
        }
    }else{
        loadSong(songList.length - 1)
        
    }
   
}

function nextSong(){
    if(actualSong < songList.length - 1  ){
        loadSong(actualSong + 1)
        if(actualSong2 < songList2.length - 1){
            loadSong2(actualSong2 + 1)
        }else{
            loadSong2(0)
        }
    }else{
        loadSong(0)
    }
    
}


audio.addEventListener("ended", ()=> nextSong())



loadSongs()
