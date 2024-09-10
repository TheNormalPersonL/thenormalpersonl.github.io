window.onload = function() {
    // Loading everything required, such as the background music, and other things.
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');

    // Setting what will be shown on the tab. Also setting up for the tab text effect
    const tabText = "The Normal Person";
    let index = 0;
    let direction = 1;

    function updateTabText() {
        if (direction === 1) {
            // Adds one more character at each update to simulate typing
            document.title = tabText.substring(0, index + 1);
            index++; // Move to the next character
            if (index === tabText.length) {
                direction = -1; // When all characters are typed, start deleting
            }
        } else {
            // Removes one character at each update to simulate deleting
            document.title = tabText.substring(0, index - 1);
            index--; // Move to the previous character
            if (index === 0) {
                direction = 1; // When all characters are deleted, start typing again
            }
        }
    }

    // Just a delay. Does deleting/typing characters every 250 milliseconds
    setInterval(updateTabText, 250);

    // Adds a listener to the play/pause button that listens for a click
    playPauseBtn.addEventListener('click', function() {
        // If the music isn't playing
        if (audio.paused) {
            // Starts playing the audio
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        // The other possibility of being playing upon the button was clicked
        } else {
            // Stops playing the audio
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    // Adds a listener to track the progress of the audio
    audio.addEventListener('timeupdate', function() {
        // Calculates how far along the song is in percentage
        const value = (audio.currentTime / audio.duration) * 100;
        // Updates the seek bar to reflect the current time position
        seekBar.value = value;

        // Formats the current time into minutes and seconds and updates the time display
        const currentTime = formatTime(audio.currentTime);
        currentTimeEl.textContent = currentTime;
    });

    // Adds a listener to the seek bar for manual time seeking
    seekBar.addEventListener('input', function() {
        // Calculates the new time in the audio based on where the seek bar is set
        const seekTime = (seekBar.value / 100) * audio.duration;
        // Updates the audio's current time to the new seek time
        audio.currentTime = seekTime;
    });

    // Adds a listener to the volume bar for adjusting the audio volume
    volumeBar.addEventListener('input', function() {
        // Sets the audio's volume to match the value of the volume bar
        audio.volume = volumeBar.value;
    });

    // Adds a listener that updates the total duration of the audio once the metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
        // Formats the total duration of the audio and displays it
        const totalDuration = formatTime(audio.duration);
        durationEl.textContent = totalDuration;
    });

    // Formats a time value into a string with minutes and seconds
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    // Getting the sidebar element where the project list will be shown
    const projectListSidebar = document.getElementById('project-list-sidebar');
    // The username whose GitHub repositories will be fetched
    const username = 'thenormalpersonl';
    // API URL to fetch the repositories of the user from GitHub
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    // Fetching the repositories using the GitHub API
    fetch(apiUrl)
        .then(response => response.json()) // Converts the response to JSON format
        .then(repos => {
            // Loops through each repository returned by the API
            repos.forEach(repo => {
                // Creates a new button element for each repository
                const sidebarItem = document.createElement('button');
                // Adds a class to style the button as a menu item
                sidebarItem.classList.add('menu-item');
                // Sets the button text to the name of the repository
                sidebarItem.textContent = repo.name;
                // Adds a click listener to open the repository in a new tab when clicked
                sidebarItem.onclick = () => {
                    window.open(repo.html_url, '_blank');
                };
                // Adds the new button to the project list sidebar
                projectListSidebar.appendChild(sidebarItem);
            });
        })
        // Handles any errors that occur during the fetch request
        .catch(error => console.error('Error fetching repositories: ', error));
};

// Toggles the visibility of the sidebar when called
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Enough comments now, HiddenDevs?
