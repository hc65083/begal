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

const profileTabs = document.querySelectorAll('[data-profile-tab]');
const profilePanels = document.querySelectorAll('[data-profile-panel]');
if (profileTabs.length && profilePanels.length) {
  profileTabs.forEach(tab => tab.addEventListener('click', () => {
    const target = tab.dataset.profileTab;
    profileTabs.forEach(item => item.classList.toggle('active', item === tab));
    profilePanels.forEach(panel => panel.hidden = panel.dataset.profilePanel !== target);
  }));
}

const colorChoices = document.querySelectorAll('.color-choice');
const previewAvatar = document.querySelector('.preview-avatar');
const largeAvatar = document.querySelector('.profile-avatar-large');
colorChoices.forEach(choice => choice.addEventListener('click', () => {
  colorChoices.forEach(item => item.classList.remove('selected'));
  choice.classList.add('selected');
  if (previewAvatar) previewAvatar.style.background = choice.dataset.color;
  if (largeAvatar) largeAvatar.style.background = choice.dataset.color;
}));

const profileForm = document.getElementById('profileForm');
const profileToast = document.getElementById('profileToast');
if (profileForm) {
  profileForm.addEventListener('submit', event => {
    event.preventDefault();
    const displayName = document.getElementById('displayName').value.trim() || 'Emily';
    const bio = document.getElementById('profileBio').value.trim();
    document.querySelectorAll('[data-profile-name]').forEach(node => node.textContent = displayName);
    const previewBio = document.querySelector('[data-profile-bio]');
    if (previewBio) previewBio.textContent = bio;
    if (profileToast) {
      profileToast.classList.add('show');
      setTimeout(() => profileToast.classList.remove('show'), 2200);
    }
  });
}
