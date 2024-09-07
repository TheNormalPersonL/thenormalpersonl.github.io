window.onload = function() {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');

    function updateDuration() {
        if (!isNaN(audio.duration)) {
            durationEl.textContent = formatTime(audio.duration);
        } else {
            audio.addEventListener('loadedmetadata', function() {
                durationEl.textContent = formatTime(audio.duration);
            });
        }
    }

    updateDuration();

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    audio.addEventListener('timeupdate', function() {
        const value = (audio.currentTime / audio.duration) * 100;
        seekBar.value = value;

        const currentTime = formatTime(audio.currentTime);
        currentTimeEl.textContent = currentTime;
    });

    seekBar.addEventListener('input', function() {
        const seekTime = (seekBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    volumeBar.addEventListener('input', function() {
        audio.volume = volumeBar.value;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    const projectListSidebar = document.getElementById('project-list-sidebar');
    const username = 'thenormalpersonl';
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const sidebarItem = document.createElement('button');
                sidebarItem.classList.add('menu-item');
                sidebarItem.textContent = repo.name;
                sidebarItem.onclick = () => {
                    window.open(repo.html_url, '_blank');
                };
                projectListSidebar.appendChild(sidebarItem);
            });
        })
        .catch(error => console.error('Error fetching repositories: ', error));
};

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}
