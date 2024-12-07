const filterObjects = [
    { id: 0, key: 'All' },
    { id: 1, key: 'Hiphop' },
    { id: 2, key: 'Pop' },
    { id: 3, key: 'Rock' },
    { id: 4, key: 'Bollywood' },
];

const song = [
    {id:1,songName:'Millionaire',artist:'Yo Yo Honey Singh',genre:'Bollywood',image:'mediaFile/millionaire.jpg',audio:'/mediaFile/millionaire.mp3'},    
    {id:2,songName:'Perfect',artist:'Ed Sheeran',genre:'Hiphop',image:'/mediaFile/Perfect.jpg',audio:'/mediaFile/Perfect.mp3'},
    {id:3,songName:'Closer',artist:'Ed Sheeran',genre:'Hiphop',image:'/mediaFile/Closer.png',audio:'/mediaFile/closer.mp3'},
    {id:4,songName:'Mood',artist:'24KGoldn',genre:'Hiphop',image:'/mediaFile/Mood.jpeg',audio:'/mediaFile/mood.mp3'},
    {id:5,songName:'Stay',artist:'Kid Laroi',genre:'Pop',image:'/mediaFile/Stay.jpeg',audio:'/mediaFile/stay.mp3'},    
    {id:6,songName:'Sorry',artist:'Justin Bieber',genre:'Pop',image:'/mediaFile/Sorry.jpg',audio:'/mediaFile/sorry.mp3'},    
    {id:7,songName:'Shape Of You',artist:'Ed Sheeran',genre:'Hiphop',image:'/mediaFile/Shape_Of_You_(Official_Single_Cover)_by_Ed_Sheeran.png',audio:'/mediaFile/shape_of_you.mp3'},
    {id:8,songName:'Thats What I Want',artist:'Lil Nas X',genre:'Rock',image:'/mediaFile/I Want.jpg',audio:'/mediaFile//I want.mp3'},    
    {id:9,songName:'Old Town',artist:'Lil Nas X',genre:'Rock',image:'/mediaFile/old town.jpeg',audio:'/mediaFile/old town.mp3'},    
    {id:10,songName:'The Box',artist:'James Hype',genre:'Pop',image:'/mediaFile/box.jpg',audio:'/mediaFile/Box.mp3'},    
    {id:11,songName:'Tauba Tauba',artist:'Kunal Aujla',genre:'Bollywood',image:'/mediaFile/Tauba tauba.jpg',audio:'/mediaFile/tauba tauba.mp3'},    
    {id:12,songName:'Heat Waves',artist:'Glass Animal',genre:'Rock',image:'/mediaFile/heat waves.jpg',audio:'/mediaFile/heat waves.mp3'},    
    {id:13,songName:'Yaad aa Raha Hai',artist:'Bhapi Laheri',genre:'Bollywood',image:'/mediaFile/yaad.jpg',audio:'/mediaFile/yaad.mp3'},    
    {id:14,songName:'Dil ke chain',artist:'Sanam Puri',genre:'Bollywood',image:'/mediaFile/dil ke chain.jpg',audio:'/mediaFile/dil ke chain.mp3'},    
];

const createOption = document.getElementById('options');
const songNameDisplay = document.getElementById('filtered-song');
const songView = document.getElementById('song-view');
const songPlayer = document.getElementById('song-player');
const songActionNext = document.getElementById('song-next');
const songActionPrevious = document.getElementById('song-previous');
const playlist=document.getElementById('add-playlist');

const createPlaylistInput = document.querySelector('#create-playlist input');
const createPlaylistButton = document.querySelector('#create-playlist button');
const existingPlaylistsContainer = document.getElementById('existing-playlists');
const currentSongContainer = document.getElementById('current-song');
const allPlaylistsContainer = document.getElementById('all-playlist');
const currentPlaylistContainer = document.getElementById('current-playList');




let currentSongIndex = 0;
let currentPlaylist = [];
let playlists = {};



filterObjects.forEach((obj) => {
    const option = document.createElement("option");
    option.value = obj.id;
    option.textContent = obj.key;
    createOption.appendChild(option);
});

createOption.addEventListener("change", (event) => {
    const targetOption = Number(event.target.value);
    songNameDisplay.innerHTML = '';
    const genreKey = filterObjects.find(obj => obj.id === targetOption).key;
    loadGenre(genreKey);
});


function loadGenre(genreKey) {
    song.filter((finalGenre) => {
        if (finalGenre.genre === genreKey || genreKey === 'All') {
            createSong(finalGenre);
        }
    });
}

function createSong(songObj) {
    const displaySong = document.createElement('button');
    displaySong.textContent = songObj.songName;
    displaySong.id = 'song-name';
    songNameDisplay.appendChild(displaySong);

    displaySong.addEventListener('click', () => {
        currentSongIndex = song.findIndex(s => s.id === songObj.id);
        playSong(songObj);
    });
}

function playSong(songObj) {
    songView.innerHTML = '';
    songPlayer.innerHTML = '';
    
    const songImage = document.createElement('img');
    songImage.src = songObj.image;
    songImage.className='anime'
    songImage.title = songObj.songName;
    songView.appendChild(songImage);
    
    const songNameView = document.createElement('p');
    songNameView.textContent = songObj.songName;
    songNameView.style.fontWeight = 'bold';
    songView.appendChild(songNameView);
    
    const songArtistView = document.createElement('p');
    songArtistView.textContent = songObj.artist;
    songView.appendChild(songArtistView);
    
    const songPlaying = document.createElement('audio');
    songPlaying.controls = true;
    const songSource = document.createElement('source');
    songSource.src = songObj.audio;
    songSource.type = 'audio/mpeg';
    songPlaying.appendChild(songSource);
    songPlayer.appendChild(songPlaying);
    songPlaying.play();
}

function setupNavigationButtons() {
    
    const nextButton = document.createElement('button');
    const nextButtonI = document.createElement('i');
    nextButton.className = 'song-action';
    nextButtonI.className = 'fa-solid fa-forward-step';
    nextButton.classList.add('song-action', 'forward');
    nextButton.appendChild(nextButtonI);
    songActionNext.appendChild(nextButton);

    // Create Previous button
    const prevButton = document.createElement('button');
    const prevButtonI = document.createElement('i');
    prevButton.className = 'song-action';
    prevButtonI.className = 'fa-solid fa-backward-step';
    prevButton.classList.add('song-action', 'prev');
    prevButton.appendChild(prevButtonI);
    songActionPrevious.appendChild(prevButton);

    const addPlaylistButton = document.createElement('button');
    addPlaylistButton.className = 'playlist-div';
    addPlaylistButton.textContent = 'Add To Playlist';
    playlist.appendChild(addPlaylistButton);



    // Setup next and previous song functionality
    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % song.length;
        playSong(song[currentSongIndex]);
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + song.length) % song.length;
        
        playSong(song[currentSongIndex]);
    });     

    addPlaylistButton.addEventListener('click', () => addCurrentSongToPlaylist());
}


createPlaylistButton.addEventListener('click', () => {
    const playlistName = createPlaylistInput.value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        createPlaylistButtonElement(playlistName);
    }
    createPlaylistInput.value = '';
});

function addCurrentSongToPlaylist() {
    const selectedPlaylistName = document.querySelector('.playlist-btn.active')?.textContent;
    const currentSong = song[currentSongIndex];

    if (selectedPlaylistName) {
        if (!playlists[selectedPlaylistName].some(s => s.id === currentSong.id)) {
            playlists[selectedPlaylistName].push(currentSong);

            showPlaylistSongs(selectedPlaylistName); // Update current song section after adding
        } 
    } else {
        alert('Please select a playlist.');
    }
}

createPlaylistButton.addEventListener('click', () => {
    const playlistName = createPlaylistInput.value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        createPlaylistButtonElement(playlistName);
    }
    createPlaylistInput.value = '';
});


function createPlaylistButtonElement(playlistName) {
    const playlistButton = document.createElement('button');
    playlistButton.textContent = playlistName;
    playlistButton.className = 'playlist-btn';
    
    playlistButton.addEventListener('click', () => {
        showPlaylistSongs(playlistName);
        document.querySelectorAll('.playlist-btn').forEach(btn => btn.classList.remove('active'));
        playlistButton.classList.add('active');
    });
    
    allPlaylistsContainer.appendChild(playlistButton);
}

function showPlaylistSongs(playlistName) {
    if (!currentSongContainer) {
        console.error("currentSongContainer not found in the DOM.");
        return;
    }
    
    currentSongContainer.innerHTML = `<h3>Songs in ${playlistName}:</h3>`;
    const songs = playlists[playlistName];

    songs.forEach((song) => {
        const songButton = document.createElement('button');
        songButton.textContent = song.songName;
        songButton.className = 'song-btn';
        songButton.addEventListener('click', () => playSong(song));
        currentSongContainer.appendChild(songButton);
    });
}

const toggleCheckbox = document.getElementById('theme-toggle');
const body = document.body;

toggleCheckbox.addEventListener('change', () => {
    body.classList.toggle('light-mode', toggleCheckbox.checked);
});


document.addEventListener('DOMContentLoaded', () => {
    song.forEach(createSong);
    setupNavigationButtons();
    playSong(song[currentSongIndex]);
    pauseAudio(); 
});


function pauseAudio() {
    const audioElement = songPlayer.querySelector('audio');
    if (audioElement) {
        audioElement.pause();
    }
}   