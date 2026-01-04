// === ADD NEXT / PREVIOUS SONG FUNCTION ===
const songs = [
  {
    url: "../songs/Tena-1.mp3",
    title: "បងក្រ",
    artist: "Tena",
    cover: "",
  },
  {
    url: "../songs/Vannda-1.mp3",
    title: "Time to Rise",
    artist: "Vannda",
    cover: "",
  },
  {
    url: "../songs/Preab Sovath-1.mp3",
    title: "Lady (She's gone)",
    artist: "Preab Sovath",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_veez5yX_YquhpoBdPA3xXIugYP9flIMGQ&s",
  },
  {
    url: "../songs/ស្រដៀងសង្សារ.mp3",
    title: "ស្រដៀងសង្សារ",
    artist: "Nevrmind Band",
    cover: "https://i.ytimg.com/vi/oo4fDJszsZ4/maxresdefault.jpg",
  },
  {
    url: "../songs/see you again.mp3",
    title: "See you again",
    artist: "Wiz Khalifa",
    cover:
      "https://i.ytimg.com/vi/RgKAFK5djSk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAqRAcXvNmNXcNEleJusP3Ljgzqug",
  },
  {
    url: "../songs/Home.mp3",
    title: "Home",
    artist: "Machine Gun Kelly",
    cover: "https://i.ytimg.com/vi/IumYMCllMsM/hqdefault.jpg",
  },
  {
    url: "../songs/Someone You Loved.mp3",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    cover: "https://i.ytimg.com/vi/bCuhuePlP8o/sddefault.jpg?v=688b3275",
  },
  {
    url: "../songs/Why Not Me.mp3",
    title: "Why Not Me",
    artist: "Enrique Iglesias",
    cover:
      "https://i.pinimg.com/564x/d9/50/09/d95009983ed3a7ee227db500e01a1feb.jpg",
  },
];
let currentIndex = 1; // current song is Time to Rise (matches your screenshot)

function playIndex(i) {
  const s = songs[i];
  playSong({
    url: s.url,
    title: s.title,
    artist: s.artist,
    cover: `url('${s.cover}')`,
    coverUrl: s.cover,
  });
  currentIndex = i;
}

document.getElementById("nextBtn").onclick = () =>
  playIndex((currentIndex + 1) % songs.length);
document.getElementById("prevBtn").onclick = () =>
  playIndex((currentIndex - 1 + songs.length) % songs.length);
document.getElementById("bigNextBtn").onclick =
  document.getElementById("nextBtn").onclick;
document.getElementById("bigPrevBtn").onclick =
  document.getElementById("prevBtn").onclick;

// Fix the current song (Time to Rise) so next/prev works immediately
currentIndex = 1;

// Fallback cover
function getFallbackCover() {
  return 'url("https://media.istockphoto.com/id/1504173168/photo/futuristic-energy-sphere-on-black-background-representing-ai-and-future-technologies-3d.jpg?s=612x612&w=0&k=20&c=lNbKE07EEb7bpsKTf1Pmm1enLnfwooepNLsSa4hAAE4=")';
}

// Profile Edit Logic
const profilePic = document.getElementById("profilePic");
const userNameEl = document.getElementById("userName");
const editProfileModal = document.getElementById("editProfileModal");
const editProfilePicPreview = document.getElementById("editProfilePicPreview");
const editNameInput = document.getElementById("editNameInput");
const changeProfilePicBtn = document.getElementById("changeProfilePicBtn");
const profilePicInput = document.getElementById("profilePicInput");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const editProfileItem = document.getElementById("editProfileItem");

// get data from profile
const userData = JSON.parse(localStorage.getItem("user"));
if (userData) {
  const firstName = userData.name.split(" ")[0];
  document.getElementById("userName").textContent = `${firstName}`;
  document.getElementById("profilePic").textContent = firstName
    .charAt(0)
    .toUpperCase();
}

function loadProfile() {
  const savedName = localStorage.getItem("userDisplayName") || userData.name;
  const savedPic = localStorage.getItem("userProfilePic");
  userNameEl.textContent = `${savedName}`;
  editNameInput.value = savedName;
  if (savedPic) {
    profilePic.style.backgroundImage = `url('${savedPic}')`;
    profilePic.textContent = "";
    editProfilePicPreview.style.backgroundImage = `url('${savedPic}')`;
    editProfilePicPreview.textContent = "";
  }
}

editProfileItem.onclick = () => {
  editNameInput.value = userNameEl.textContent
    .replace("Hello, ", "")
    .replace("", "")
    .trim();
  editProfilePicPreview.style.backgroundImage =
    profilePic.style.backgroundImage;
  editProfilePicPreview.textContent = profilePic.textContent;
  editProfileModal.classList.add("active");
  profileDropdown.classList.remove("active");
};

changeProfilePicBtn.onclick = () => profilePicInput.click();

profilePicInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const url = ev.target.result;
    editProfilePicPreview.style.backgroundImage = `url('${url}')`;
    editProfilePicPreview.textContent = "";
  };
  reader.readAsDataURL(file);
};

saveProfileBtn.onclick = () => {
  const newName = editNameInput.value.trim() || "User";
  const newPicUrl = editProfilePicPreview.style.backgroundImage.slice(5, -2);
  userNameEl.textContent = `Hello, ${newName}! 👋`;
  localStorage.setItem("userDisplayName", newName);
  if (newPicUrl) {
    profilePic.style.backgroundImage = `url('${newPicUrl}')`;
    profilePic.textContent = "";
    localStorage.setItem("userProfilePic", newPicUrl);
  } else {
    profilePic.style.backgroundImage = "";
    profilePic.textContent = newName.charAt(0).toUpperCase();
    localStorage.removeItem("userProfilePic");
  }
  editProfileModal.classList.remove("active");
};

cancelEditBtn.onclick = () => editProfileModal.classList.remove("active");
editProfileModal.onclick = (e) => {
  if (e.target === editProfileModal)
    editProfileModal.classList.remove("active");
};

loadProfile();

// Dropdown & Logout
const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");
const sidebarLogoutBtn = document.getElementById("sidebarLogoutBtn");

profileToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("active");
});

document.addEventListener("click", () =>
  profileDropdown.classList.remove("active")
);
profileDropdown.addEventListener("click", (e) => e.stopPropagation());

profileDropdown.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("logout")) performLogout();
    profileDropdown.classList.remove("active");
  });
});


sidebarLogoutBtn.addEventListener("click", performLogout);

function performLogout() {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "../index.html";
  }
}

// Audio Player Logic
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const bigPlayPauseBtn = document.getElementById("bigPlayPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const bigProgressFill = document.getElementById("bigProgressFill");
const currentTimeEl = document.getElementById("currentTime");
const bigCurrentTime = document.getElementById("bigCurrentTime");
const durationEl = document.getElementById("duration");
const bigDuration = document.getElementById("bigDuration");
const volumeSlider = document.getElementById("volumeSlider");
const currentSongEl = document.getElementById("currentSong");
const currentArtistEl = document.getElementById("currentArtist");
const currentCoverEl = document.getElementById("currentCover");
const bigAlbumCover = document.getElementById("bigAlbumCover");
const bigSongTitle = document.getElementById("bigSongTitle");
const bigSongArtist = document.getElementById("bigSongArtist");
const recentList = document.getElementById("recentList");
const bigPlayerOverlay = document.getElementById("bigPlayerOverlay");
const bigPlayerClose = document.getElementById("bigPlayerClose");
const expandBtn = document.getElementById("expandBtn");
const addToPlaylistBtn = document.getElementById("addToPlaylistBtn");

let currentSongData = null;

// Navigation
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-item")
      .forEach((i) => i.classList.remove("active"));
    document
      .querySelectorAll(".content-section")
      .forEach((s) => s.classList.remove("active"));
    item.classList.add("active");
    document.getElementById(item.dataset.section).classList.add("active");
    document.getElementById("page-title").textContent = item.textContent.trim();
    if (item.dataset.section === "my-playlist") loadPlaylists();
  });
});

// Upload Songs
document.getElementById("uploadBtn").addEventListener("click", () => {
  document.getElementById("songInput").click();
});

document.getElementById("songInput").addEventListener("change", (e) => {
  const files = e.target.files;
  if (files.length === 0) return;
  const container = document.getElementById("uploadedSongsBody");
  for (let file of files) {
    if (!file.type.startsWith("audio/")) continue;
    const objectUrl = URL.createObjectURL(file);
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const tags = tag.tags;
        const title = tags.title || file.name.replace(/\.[^/.]+$/, "");
        const artist = tags.artist || "Unknown Artist";
        let coverUrl = "";
        if (tags.picture) {
          let base64String = "";
          const data = tags.picture.data;
          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          coverUrl =
            "data:" + tags.picture.format + ";base64," + btoa(base64String);
        }
        const coverStyle = coverUrl ? `url('${coverUrl}')` : getFallbackCover();
        createSongItem(
          objectUrl,
          title,
          artist,
          coverStyle,
          coverUrl,
          container,
          true
        );
      },
      onError: function () {
        const coverStyle = getFallbackCover();
        createSongItem(
          objectUrl,
          file.name.replace(/\.[^/.]+$/, ""),
          "Unknown Artist",
          coverStyle,
          "",
          container,
          true
        );
      },
    });
  }
  e.target.value = "";
});

function createSongItem(
  url,
  title,
  artist,
  coverStyle,
  coverUrl,
  container,
  prepend = false
) {
  const isTable = container.id === "uploadedSongsBody";
  if (isTable) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td><div class="uploaded-song-cover" style="background-image: ${coverStyle};"></div></td>
                    <td>
                        <div class="uploaded-song-title">${title}</div>
                        <div class="uploaded-song-artist">${artist}</div>
                    </td>
                    <td>${artist}</td>
                `;
    row.onclick = () =>
      playSong({ url, title, artist, cover: coverStyle, coverUrl });
    if (prepend) container.prepend(row);
    else container.appendChild(row);
    const placeholder = container.querySelector("td[colspan]");
    if (placeholder) placeholder.parentElement.remove();
  }
}

function playSong(song) {
  audio.src = song.url;
  currentSongData = song;
  audio.play().catch((e) => console.log("Play error:", e));
  playPauseBtn.textContent = "❚ ❚";
  bigPlayPauseBtn.textContent = "❚ ❚";
  currentSongEl.textContent = song.title;
  currentArtistEl.textContent = song.artist;
  currentCoverEl.style.backgroundImage = song.cover;
  bigSongTitle.textContent = song.title;
  bigSongArtist.textContent = song.artist;
  bigAlbumCover.style.backgroundImage = song.cover;
  audio.onloadedmetadata = () => {
    addToRecent(
      song.title,
      song.artist,
      song.cover,
      formatTime(audio.duration),
      song
    );
  };
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  const icon = audio.paused ? "▶" : "❚ ❚";
  playPauseBtn.textContent = icon;
  bigPlayPauseBtn.textContent = icon;
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + "%";
    bigProgressFill.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
    bigCurrentTime.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
    bigDuration.textContent = formatTime(audio.duration);
  }
});

[progressBar, document.getElementById("bigProgressBar")].forEach((bar) => {
  bar.addEventListener("click", (e) => {
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  });
});

volumeSlider.addEventListener(
  "input",
  () => (audio.volume = volumeSlider.value / 100)
);

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function addToRecent(title, artist, cover, duration, fullSongData) {
  const existing = Array.from(recentList.children).find(
    (item) =>
      item.querySelector(".recent-right-song")?.textContent === title &&
      item.querySelector(".recent-right-artist")?.textContent === artist
  );
  if (existing) existing.remove();
  const item = document.createElement("div");
  item.className = "recent-right-item";
  item.innerHTML = `
                <div class="recent-right-cover" style="background-image: ${cover};"></div>
                <div style="flex:1;">
                    <div class="recent-right-song">${title}</div>
                    <div class="recent-right-artist">${artist}</div>
                    <div class="recent-duration">${duration}</div>
                </div>
            `;
  item.onclick = () => playSong(fullSongData);
  recentList.prepend(item);
  if (recentList.children.length > 10) {
    recentList.removeChild(recentList.lastChild);
  }
  const placeholder = recentList.querySelector("p");
  if (placeholder) placeholder.remove();
}

// Sample songs click (including the extra ones)
document.querySelectorAll(".album-item[data-song]").forEach((item) => {
  item.onclick = (e) => {
    if (e.target.closest(".playlist-actions")) return;
    let coverUrl = item.dataset.cover || "";
    let coverStyle = coverUrl ? `url('${coverUrl}')` : getFallbackCover();
    const song = {
      url: item.dataset.song,
      title: item.dataset.title,
      artist: item.dataset.artist,
      cover: coverStyle,
      coverUrl: coverUrl,
    };
    playSong(song);
  };
});

expandBtn.onclick = () => bigPlayerOverlay.classList.toggle("active");
bigPlayerClose.onclick = () => bigPlayerOverlay.classList.remove("active");
playPauseBtn.onclick = bigPlayPauseBtn.onclick = togglePlayPause;

// See More / See Less functionality for Sample Songs
const seeMoreBtn = document.getElementById("seeMoreBtn");
const extraSongs = document.querySelectorAll(".extra-song");

if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", () => {
    const isExpanded = seeMoreBtn.classList.toggle("expanded");

    extraSongs.forEach((song) => {
      song.classList.toggle("hidden", !isExpanded);
    });

    seeMoreBtn.textContent = isExpanded ? "See Less ▲" : "See More ▼";
  });
}

// ========== See More for Featured Artists ==========
const seeMoreArtistsBtn = document.getElementById("seeMoreArtistsBtn");
const extraArtists = document.querySelectorAll(".extra-artist");

if (seeMoreArtistsBtn) {
  seeMoreArtistsBtn.addEventListener("click", () => {
    const isExpanded = seeMoreArtistsBtn.classList.toggle("expanded");

    extraArtists.forEach((artist) => {
      artist.classList.toggle("hidden", !isExpanded);
    });

    seeMoreArtistsBtn.textContent = isExpanded ? "See Less ▲" : "See More ▼";
  });
}

// Playlist Logic
const playlistsGrid = document.getElementById("playlistsGrid");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const playlistModal = document.getElementById("playlistModal");
const modalTitle = document.getElementById("modalTitle");
const coverPreview = document.getElementById("coverPreview");
const changeCoverBtn = document.getElementById("changeCoverBtn");
const playlistNameInput = document.getElementById("playlistNameInput");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const playlistCoverInput = document.getElementById("playlistCoverInput");
const deleteModal = document.getElementById("deletePlaylistModal");
let currentEditIndex = null;
let currentCoverUrl = null;

function getPlaylists() {
  return JSON.parse(localStorage.getItem("playlists") || "[]");
}

function savePlaylists(p) {
  localStorage.setItem("playlists", JSON.stringify(p));
}

function loadPlaylists() {
  const playlists = getPlaylists();
  playlistsGrid.innerHTML =
    playlists.length === 0
      ? '<p style="grid-column: 1 / -1; text-align:center; color:#888; padding:40px;">No playlists yet. Create one!</p>'
      : "";
  playlists.forEach((pl, i) => {
    const item = document.createElement("div");
    item.className = "album-item";
    item.dataset.playlist = "true";
    const cover = pl.coverUrl ? `url('${pl.coverUrl}')` : getFallbackCover();
    item.innerHTML = `
                    <div class="album-cover" style="background-image: ${cover};"></div>
                    <div class="album-title">${pl.name}</div>
                    <div class="album-artist">${pl.songs.length} songs</div>
                    <div class="playlist-actions">
                        <button class="playlist-btn edit" data-index="${i}">✏️</button>
                        <button class="playlist-btn delete" data-index="${i}">🗑️</button>
                    </div>
                `;
    item.onclick = (e) => {
      if (e.target.closest(".playlist-actions")) return;
      showPlaylistSongs(pl, i);
    };
    playlistsGrid.appendChild(item);
  });
}

createPlaylistBtn.onclick = () => {
  currentEditIndex = null;
  modalTitle.textContent = "Create New Playlist";
  saveBtn.textContent = "Create";
  playlistNameInput.value = "";
  currentCoverUrl = null;
  coverPreview.style.backgroundImage = "none";
  coverPreview.textContent = "🎵";
  playlistModal.classList.add("active");
};

playlistsGrid.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".playlist-btn.edit");
  if (editBtn) {
    currentEditIndex = +editBtn.dataset.index;
    const pl = getPlaylists()[currentEditIndex];
    modalTitle.textContent = "Edit Playlist";
    saveBtn.textContent = "Save";
    playlistNameInput.value = pl.name;
    currentCoverUrl = pl.coverUrl || null;
    coverPreview.style.backgroundImage = currentCoverUrl
      ? `url('${currentCoverUrl}')`
      : "none";
    coverPreview.textContent = currentCoverUrl ? "" : "🎵";
    playlistModal.classList.add("active");
  }
  const deleteBtn = e.target.closest(".playlist-btn.delete");
  if (deleteBtn) {
    currentEditIndex = +deleteBtn.dataset.index;
    const pl = getPlaylists()[currentEditIndex];
    document.getElementById(
      "deletePlaylistName"
    ).textContent = `Are you sure you want to delete "${pl.name}"? This action cannot be undone.`;
    deleteModal.classList.add("active");
  }
});

changeCoverBtn.onclick = () => playlistCoverInput.click();

playlistCoverInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    currentCoverUrl = ev.target.result;
    coverPreview.style.backgroundImage = `url('${currentCoverUrl}')`;
    coverPreview.textContent = "";
  };
  reader.readAsDataURL(file);
};

saveBtn.onclick = () => {
  const name = playlistNameInput.value.trim();
  if (!name) return;
  const playlists = getPlaylists();
  if (
    playlists.some(
      (p, i) =>
        p.name.toLowerCase() === name.toLowerCase() && i !== currentEditIndex
    )
  ) {
    alert("Playlist name already exists!");
    return;
  }
  if (currentEditIndex === null) {
    playlists.push({ name, songs: [], coverUrl: currentCoverUrl });
  } else {
    playlists[currentEditIndex].name = name;
    playlists[currentEditIndex].coverUrl = currentCoverUrl;
  }
  savePlaylists(playlists);
  loadPlaylists();
  playlistModal.classList.remove("active");
};

cancelBtn.onclick = () => playlistModal.classList.remove("active");
document.getElementById("cancelDeleteBtn").onclick = () =>
  deleteModal.classList.remove("active");
document.getElementById("confirmDeleteBtn").onclick = () => {
  const playlists = getPlaylists();
  playlists.splice(currentEditIndex, 1);
  savePlaylists(playlists);
  loadPlaylists();
  deleteModal.classList.remove("active");
};

[playlistModal, deleteModal].forEach(
  (m) =>
    (m.onclick = (e) => {
      if (e.target === m) m.classList.remove("active");
    })
);

function showPlaylistSongs(playlist, index) {
  playlistsGrid.innerHTML = `
                <div style="grid-column:1/-1;padding:20px;background:rgba(255,255,255,0.05);border-radius:16px;">
                    <h3>${playlist.name} (${playlist.songs.length} songs)</h3>
                    <button class="upload-btn" style="margin-top:10px;" onclick="loadPlaylists()">← Back</button>
                </div>
            `;
  if (playlist.songs.length === 0) {
    playlistsGrid.innerHTML +=
      '<p style="grid-column:1/-1;text-align:center;color:#888;">Empty playlist</p>';
    return;
  }
  playlist.songs.forEach((s) => {
    const cover = s.coverUrl ? `url('${s.coverUrl}')` : getFallbackCover();
    const item = document.createElement("div");
    item.className = "album-item";
    item.innerHTML = `
                    <div class="album-cover" style="background-image: ${cover};">
                        <div class="play-hover-btn">▶</div>
                    </div>
                    <div class="album-title">${s.title}</div>
                    <div class="album-artist">${s.artist}</div>
                `;
    item.onclick = () => playSong(s);
    playlistsGrid.appendChild(item);
  });
}

// Add to Playlist Modal
const addToPlaylistModal = document.getElementById("addToPlaylistModal");
const closePlaylistModal = document.getElementById("closePlaylistModal");
const currentSongInModal = document.getElementById("currentSongInModal");
const playlistListInModal = document.getElementById("playlistListInModal");

addToPlaylistBtn.onclick = () => {
  if (!currentSongData) {
    alert("No song is currently playing!");
    return;
  }
  const playlists = getPlaylists();
  if (playlists.length === 0) {
    alert("You have no playlists yet. Create one first!");
    return;
  }
  currentSongInModal.textContent = `"${currentSongData.title}" — ${currentSongData.artist}`;
  playlistListInModal.innerHTML = "";
  playlists.forEach((playlist, index) => {
    const alreadyAdded = playlist.songs.some(
      (s) => s.url === currentSongData.url
    );
    const option = document.createElement("div");
    option.className = "playlist-option";
    if (alreadyAdded) option.style.opacity = "0.6";
    option.innerHTML = `
                    <div>
                        <div style="font-weight:500;">${playlist.name}</div>
                        <div class="song-count">${
                          playlist.songs.length
                        } songs</div>
                    </div>
                    ${
                      alreadyAdded
                        ? '<span style="color:#1db954;">✓ Added</span>'
                        : ""
                    }
                `;
    if (!alreadyAdded) {
      option.onclick = () => {
        playlist.songs.push({
          url: currentSongData.url,
          title: currentSongData.title,
          artist: currentSongData.artist,
          coverUrl: currentSongData.coverUrl || "",
        });
        savePlaylists(playlists);
        option.innerHTML = option.innerHTML.replace(
          "</div>",
          '</div><span style="color:#1db954; margin-left:10px;">✓ Added!</span>'
        );
        option.style.opacity = "0.6";
        setTimeout(() => loadPlaylists(), 500);
      };
    }
    playlistListInModal.appendChild(option);
  });
  addToPlaylistModal.classList.add("active");
};

closePlaylistModal.onclick = () =>
  addToPlaylistModal.classList.remove("active");
addToPlaylistModal.onclick = (e) => {
  if (e.target === addToPlaylistModal)
    addToPlaylistModal.classList.remove("active");
};

// Featured Artists Data & Logic
const artistsData = {
  Vanda: {
    avatar:
      "https://www.top10asia.org/wp-content/uploads/2022/09/301590217_802401490937910_8824734863151066433_n.jpg",
    genre: "Pop • Cambodia",
    songs: [
      {
        title: "Baby MAMA",
        url: "../songs/BABY MAMA.mp3",
        cover: "https://i.ytimg.com/vi/oXsYZSXM3CE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgUyhTMA8=&rs=AOn4CLAO10XANTxxcVdfFWkfkZC6po240w",
      },
      {
        title: "សង្រ្កាន្តស្គាល់ស្នេហ៍",
        url: "../songs/សង្រ្កាន្តស្គាល់ស្នេហ៍.mp3",
        cover:
          "https://i.ytimg.com/vi/5FSL9EXHAfM/maxresdefault.jpg",
      },
    ],
  },
  Tena: {
    avatar: "https://i.scdn.co/image/ab6761610000e5ebb267fa0c58a49a460fbb44cd",
    genre: "Pop • Cambodia",
    songs: [
      {
        title: "កង់សាគួរ",
        url: "../songs/កង់សាគួរ.mp3",
        cover:
          "https://i1.sndcdn.com/artworks-000204221628-4e822d-t500x500.jpg",
      },
      {
        title: "មនុស្សល្អ",
        url: "../songs/មនុស្សល្អ.mp3",
        cover:
          "https://i1.sndcdn.com/artworks-000204131855-zbyjwk-t500x500.jpg",
      },
      {
        title: "អង្វរ",
        url: "../songs/អង្វរ.mp3",
        cover:
          "https://i1.sndcdn.com/artworks-wDvb0bGBCnX1QOZC-PRaGgA-t500x500.jpg",
      },
    ],
  },
  "Preab Sovath": {
    avatar: "https://i.scdn.co/image/ab67616d00001e02e5c32e2fa4e4b8b7bc25225f",
    genre: "Pop • Cambodia",
    songs: [
      {
        title: "Lady (She's gone)",
        url: "../songs/Tena-1.mp3",
        cover:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_veez5yX_YquhpoBdPA3xXIugYP9flIMGQ&s",
      },
      {
        title: "ទ័ពស្រោបនគរ",
        url: "../songs/ទ័ពស្រោបនគរ.mp3",
        cover:
          "https://i.ytimg.com/vi/m-rIzpcUMyI/maxresdefault.jpg",
      },
      {
        title: "គោះទ្វារបេះដូង",
        url: "../songs/គោះទ្វារបេះដូង.mp3",
        cover:
          "https://i.ytimg.com/vi/45ypiVWO1B4/maxresdefault.jpg",
      },
    ],
  },
};

const artistsSection = document.getElementById("artistsSection");
const artistsGrid = document.getElementById("artistsGrid");
const artistDetailView = document.getElementById("artistDetailView");
const artistHeader = document.getElementById("artistHeader");
const artistSongsGrid = document.getElementById("artistSongsGrid");
const backToArtistsBtn = document.getElementById("backToArtistsBtn");

artistsGrid.addEventListener("click", (e) => {
  const artistItem = e.target.closest(".artist-item");
  if (!artistItem) return;
  const artistName = artistItem.dataset.artist;
  showArtistDetail(artistName);
});

function showArtistDetail(artistName) {
  const data = artistsData[artistName];
  if (!data) return;
  artistsSection.style.display = "none";
  artistDetailView.classList.add("active");
  artistHeader.innerHTML = `
                <div class="artist-header-avatar" style="background-image: url('${data.avatar}');"></div>
                <div class="artist-header-info">
                    <h2>${artistName}</h2>
                    <p>${data.genre}</p>
                </div>
            `;
  artistSongsGrid.innerHTML = "";
  data.songs.forEach((song) => {
    const item = document.createElement("div");
    item.className = "album-item";
    item.innerHTML = `
                    <div class="album-cover" style="background-image: url('${song.cover}');">
                        <div class="play-hover-btn">▶</div>
                    </div>
                    <div class="album-title">${song.title}</div>
                    <div class="album-artist">${artistName}</div>
                `;
    item.onclick = () => {
      const fullSong = {
        url: song.url,
        title: song.title,
        artist: artistName,
        cover: `url('${song.cover}')`,
        coverUrl: song.cover,
      };
      playSong(fullSong);
    };
    artistSongsGrid.appendChild(item);
  });
}

backToArtistsBtn.onclick = () => {
  artistDetailView.classList.remove("active");
  artistsSection.style.display = "block";
  artistSongsGrid.innerHTML = "";
};

// Initial load
loadProfile();
loadPlaylists();

// searcg bar

const searchInput = document.querySelector(".search-bar");
const songsGrid = document.getElementById("sampleSongsGrid");

// Get all songs once
const allSongs = Array.from(songsGrid.querySelectorAll(".album-item"));

/* 🔀 Shuffle function */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* 🔍 Search + Random */
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase().trim();

  // Reset grid
  songsGrid.innerHTML = "";

  // Filter songs
  let matchedSongs = allSongs.filter((song) => {
    const title = song.dataset.title.toLowerCase();
    const artist = song.dataset.artist.toLowerCase();
    return title.includes(keyword) || artist.includes(keyword);
  });

  // Shuffle matched results
  shuffleArray(matchedSongs);

  // Show results
  matchedSongs.forEach((song) => {
    song.classList.remove("hidden");
    songsGrid.appendChild(song);
  });

  // If search empty → show default order
  if (keyword === "") {
    songsGrid.innerHTML = "";
    allSongs.forEach((song) => {
      songsGrid.appendChild(song);
      if (song.classList.contains("extra-song")) {
        song.classList.add("hidden");
      }
    });
  }
});
