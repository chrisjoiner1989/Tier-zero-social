document.addEventListener("DOMContentLoaded", (event) => {
  initializeDeckBuilders();
  loadTournaments();
  loadDnDRules();
});

const cardDatabase = {
  onepiece: [],
  yugioh: [],
  mtg: [],
  pokemon: [],
  fab: [],
};

function initializeDeckBuilders() {
  const games = ["onepiece", "yugioh", "mtg", "pokemon", "fab"];
  games.forEach((game) => {
    fetch(`https://api.example.com/${game}/cards`)
      .then((response) => response.json())
      .then((data) => {
        cardDatabase[game] = data.cards;
        loadCardPool(game);
      })
      .catch((error) => console.error("Error fetching card data:", error));
  });
}

function loadCardPool(game) {
  const cardPoolElement = document.getElementById(`cards-${game}`);
  cardDatabase[game].forEach((card) => {
    const cardElement = document.createElement("li");
    const cardImage = document.createElement("img");
    cardImage.src = card.image;
    cardImage.alt = card.name;

    const cardName = document.createElement("span");
    cardName.textContent = card.name;

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("add-card-btn");
    addButton.onclick = () => addToDeck(`deck-${game}`, card.name);

    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardName);
    cardElement.appendChild(addButton);

    cardPoolElement.appendChild(cardElement);
  });
}

function showSection(section) {
  document.querySelectorAll(".container").forEach((div) => {
    div.classList.remove("active");
  });
  document.getElementById(section).classList.add("active");
}

function showDeckSection(deck) {
  document.querySelectorAll(".deck-container").forEach((div) => {
    div.classList.remove("active");
  });
  document.getElementById(deck).classList.add("active");
}

function showTournamentSection(tournament) {
  document.querySelectorAll(".tournament-container").forEach((div) => {
    div.classList.remove("active");
  });
  document.getElementById(tournament).classList.add("active");
}

function createPost() {
  const content = document.getElementById("post-content").value;
  const postContainer = document.getElementById("posts");

  if (content.trim()) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.textContent = content;
    postContainer.prepend(postElement);

    document.getElementById("post-content").value = "";
  }
}

function editProfile() {
  document.getElementById("edit-profile").style.display = "block";
}

function saveProfile() {
  const newName = document.getElementById("new-name").value;
  const newEmail = document.getElementById("new-email").value;

  if (newName.trim()) {
    document.getElementById("profile-name").textContent = newName;
  }
  if (newEmail.trim()) {
    document.getElementById("profile-email").textContent = newEmail;
  }

  document.getElementById("edit-profile").style.display = "none";
}

function addToDeck(deckId, cardName) {
  const deckElement = document.getElementById(deckId);
  const deckItem = document.createElement("li");
  deckItem.textContent = cardName;
  deckElement.appendChild(deckItem);
}

const tournamentDatabase = {
  onepiece: [],
  yugioh: [],
  mtg: [],
  pokemon: [],
  fab: [],
};

function loadTournaments() {
  for (let game in tournamentDatabase) {
    updateTournamentList(game);
  }
}

function createTournament(game) {
  const tournamentName = document.getElementById(
    `${game}-tournament-name`
  ).value;
  if (tournamentName.trim()) {
    tournamentDatabase[game].push({ name: tournamentName, participants: [] });
    updateTournamentList(game);
    document.getElementById(`${game}-tournament-name`).value = "";
  }
}

function updateTournamentList(game) {
  const tournamentListElement = document.getElementById(
    `${game}-tournament-list`
  );
  tournamentListElement.innerHTML = "";

  tournamentDatabase[game].forEach((tournament, index) => {
    const tournamentElement = document.createElement("div");
    tournamentElement.classList.add("tournament");

    const tournamentName = document.createElement("h5");
    tournamentName.textContent = tournament.name;

    const participantList = document.createElement("ul");
    tournament.participants.forEach((participant) => {
      const participantElement = document.createElement("li");
      participantElement.textContent = participant;
      participantList.appendChild(participantElement);
    });

    const participantInput = document.createElement("input");
    participantInput.type = "text";
    participantInput.placeholder = "Participant Name";

    const addParticipantButton = document.createElement("button");
    addParticipantButton.textContent = "Add";
    addParticipantButton.onclick = () =>
      addParticipant(game, index, participantInput.value);

    tournamentElement.appendChild(tournamentName);
    tournamentElement.appendChild(participantList);
    tournamentElement.appendChild(participantInput);
    tournamentElement.appendChild(addParticipantButton);

    tournamentListElement.appendChild(tournamentElement);
  });
}

function addParticipant(game, tournamentIndex, participantName) {
  if (participantName.trim()) {
    tournamentDatabase[game][tournamentIndex].participants.push(
      participantName
    );
    updateTournamentList(game);
  }
}

// D&D Specific Functions
const dndRules = [
  "Rule 1: Basics",
  "Rule 2: Character Creation",
  "Rule 3: Combat",
  // Add more rules as needed
];

const characterDatabase = [];
const campaignDatabase = [];

function loadDnDRules() {
  const rulesContent = document.getElementById("rules-content");
  dndRules.forEach((rule) => {
    const ruleElement = document.createElement("p");
    ruleElement.textContent = rule;
    rulesContent.appendChild(ruleElement);
  });
}

function showDnDSection(section) {
  document.querySelectorAll(".dnd-container").forEach((div) => {
    div.classList.remove("active");
  });
  document.getElementById(section).classList.add("active");
}

function createCharacter() {
  const characterName = document.getElementById("character-name").value;
  if (characterName.trim()) {
    characterDatabase.push(characterName);
    updateCharacterList();
    document.getElementById("character-name").value = "";
  }
}

function updateCharacterList() {
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = "";
  characterDatabase.forEach((character) => {
    const characterElement = document.createElement("li");
    characterElement.textContent = character;
    characterList.appendChild(characterElement);
  });
}

function createCampaign() {
  const campaignName = document.getElementById("campaign-name").value;
  if (campaignName.trim()) {
    campaignDatabase.push({ name: campaignName, participants: [] });
    updateCampaignList();
    document.getElementById("campaign-name").value = "";
  }
}

function updateCampaignList() {
  const campaignList = document.getElementById("campaign-list");
  campaignList.innerHTML = "";

  campaignDatabase.forEach((campaign, index) => {
    const campaignElement = document.createElement("div");
    campaignElement.classList.add("campaign");

    const campaignName = document.createElement("h5");
    campaignName.textContent = campaign.name;

    const participantList = document.createElement("ul");
    campaign.participants.forEach((participant) => {
      const participantElement = document.createElement("li");
      participantElement.textContent = participant;
      participantList.appendChild(participantElement);
    });

    const participantInput = document.createElement("input");
    participantInput.type = "text";
    participantInput.placeholder = "Participant Name";

    const addParticipantButton = document.createElement("button");
    addParticipantButton.textContent = "Add";
    addParticipantButton.onclick = () =>
      addParticipantToCampaign(index, participantInput.value);

    campaignElement.appendChild(campaignName);
    campaignElement.appendChild(participantList);
    campaignElement.appendChild(participantInput);
    campaignElement.appendChild(addParticipantButton);

    campaignList.appendChild(campaignElement);
  });
}

function addParticipantToCampaign(campaignIndex, participantName) {
  if (participantName.trim()) {
    campaignDatabase[campaignIndex].participants.push(participantName);
    updateCampaignList();
  }
}

// Toggle Dark Mode
function toggleDarkMode() {
  const body = document.body;
  const header = document.querySelector("header");
  const containers = document.querySelectorAll(".container");
  const posts = document.querySelectorAll(".post");
  const deckContainers = document.querySelectorAll(".deck-container");
  const tournamentContainers = document.querySelectorAll(
    ".tournament-container"
  );
  const dndContainers = document.querySelectorAll(".dnd-container");

  body.classList.toggle("dark-mode");
  header.classList.toggle("dark-mode");

  containers.forEach((container) => container.classList.toggle("dark-mode"));
  posts.forEach((post) => post.classList.toggle("dark-mode"));
  deckContainers.forEach((deckContainer) =>
    deckContainer.classList.toggle("dark-mode")
  );
  tournamentContainers.forEach((tournamentContainer) =>
    tournamentContainer.classList.toggle("dark-mode")
  );
  dndContainers.forEach((dndContainer) =>
    dndContainer.classList.toggle("dark-mode")
  );
}
