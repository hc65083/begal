const videoPlayer = document.querySelector('.video-player');
const playToggle = document.getElementById('playToggle');
const playIcon = document.getElementById('playIcon');

function setPlayerState(playing) {
  if (!videoPlayer || !playToggle) return;
  videoPlayer.classList.toggle('playing', playing);
  playToggle.setAttribute('aria-label', playing ? 'Pause live stream' : 'Play live stream');
  playIcon.innerHTML = playing
    ? '<rect x="7" y="5" width="4" height="14"/><rect x="15" y="5" width="4" height="14"/>'
    : '<path d="m8 5 11 7-11 7z"/>';
}

if (videoPlayer && playToggle) {
  let playing = false;
  playToggle.addEventListener('click', event => {
    event.stopPropagation();
    playing = !playing;
    setPlayerState(playing);
  });
  videoPlayer.addEventListener('click', () => {
    playing = !playing;
    setPlayerState(playing);
  });
  document.querySelectorAll('.video-controls button').forEach(button => {
    button.addEventListener('click', event => event.stopPropagation());
  });
}

const watchSearch = document.querySelector('.watch-search');
if (watchSearch) watchSearch.addEventListener('submit', event => event.preventDefault());

const followButton = document.getElementById('liveFollow');
if (followButton) {
  followButton.addEventListener('click', () => {
    const following = followButton.classList.toggle('following');
    followButton.textContent = following ? '♥ Following' : '♡ Follow';
  });
}

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    const row = document.createElement('div');
    row.className = 'chat-message';
    const avatar = document.createElement('span');
    avatar.className = 'chat-avatar';
    avatar.style.setProperty('--avatar', '#eeff41');
    avatar.textContent = 'E';
    const copy = document.createElement('div');
    copy.className = 'message-copy';
    const name = document.createElement('strong');
    name.textContent = 'You';
    const text = document.createElement('span');
    text.textContent = message;
    copy.append(name, text);
    row.append(avatar, copy);
    chatMessages.append(row);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}
