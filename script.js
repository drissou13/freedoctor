// === Données ===
const specialites = [
  "Médecin Généraliste", "Dentiste", "Dermatologue", "Cardiologue", "Ophtalmologue",
  "Pédiatre", "Psychiatre", "Gynécologue", "Neurologue", "ORL", "Rhumatologue",
  "Endocrinologue", "Urologue", "Hématologue", "Chirurgien", "Oncologue", "Pneumologue",
  "Gastro-entérologue", "Allergologue", "Médecin du sport", "Anesthésiste", "Radiologue",
  "Infectiologue", "Gériatre", "Sexologue", "Médecin légiste", "Néphrologue", "Médecin du travail"
];

const villes = [
  "Paris", "Lyon", "Marseille", "New York", "Tokyo", "Berlin", "Londres",
  "Rome", "Madrid", "Toronto", "Bruxelles", "Dakar", "Sydney", "Buenos Aires",
  "Nairobi", "Casablanca", "Hanoï", "Montréal", "Moscou", "Istanbul"
];

const doctors = [];
specialites.forEach(spe => {
  const nb = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < nb; i++) {
    doctors.push({
      nom: `Dr. ${generateName()} (${spe})`,
      specialite: spe,
      ville: villes[Math.floor(Math.random() * villes.length)],
      creneaux: generateSlots()
    });
  }
});

// === Fonctions utilitaires ===
function generateName() {
  const noms = ["Dupont", "Martin", "Bernard", "Dubois", "Petit", "Roux", "Lemoine", "Nguyen", "Kowalski", "Singh"];
  const prenoms = ["Sophie", "Jean", "Ali", "Maria", "Luca", "Aya", "Fatou", "Tom", "Elena", "Omar"];
  return prenoms[Math.floor(Math.random() * prenoms.length)] + " " + noms[Math.floor(Math.random() * noms.length)];
}

function generateSlots() {
  const heures = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
  return heures.sort(() => Math.random() - 0.5).slice(0, 3);
}

// === Vues et navigation ===
function showView(viewId) {
  ['view-login', 'view-home', 'view-rdv'].forEach(id => {
    document.getElementById(id).style.display = (id === viewId) ? 'block' : 'none';
  });
}

// === Connexion ===
function login() {
  const user = document.getElementById('login-username').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  const errorEl = document.getElementById('login-error');

  if (!user || !pass) {
    errorEl.textContent = "Veuillez remplir tous les champs.";
    return;
  }
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', user);
  errorEl.textContent = "";
  initHome();
}

function logout() {
  localStorage.clear();
  showView('view-login');
}

// === Page accueil ===
function initHome() {
  if(localStorage.getItem('isLoggedIn') !== 'true'){
    showView('view-login');
    return;
  }

  const user = localStorage.getItem('username') || 'Utilisateur';
  document.getElementById('userDisplay').textContent = user;

  // Message personnalisé selon l'heure
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : (hour < 18 ? "Bon après-midi" : "Bonsoir");
  document.getElementById('greeting').textContent = greeting;

  // Remplissage spécialités
  fillSpecialties(specialites);

  // Remplissage villes (datalist)
  const datalist = document.getElementById('city-list');
  datalist.innerHTML = "";
  villes.forEach(v => {
    const option = document.createElement("option");
    option.value = v;
    datalist.appendChild(option);
  });

  // Affiche historique RDV
  displayHistory();

  // Reset champs recherche & résultats
  document.getElementById('specialtySearch').value = "";
  document.getElementById('city').value = "";
  document.getElementById('results').innerHTML = "";
  document.getElementById('search-error').textContent = "";

  showView('view-home');
}

// Remplit la liste spécialités dans le select
function fillSpecialties(list) {
  const select = document.getElementById('specialty');
  select.innerHTML = "";
  list.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });
}

// Filtrage spécialités dynamique
document.getElementById('specialtySearch').addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  const filtered = specialites.filter(s => s.toLowerCase().includes(val));
  fillSpecialties(filtered.length ? filtered : specialites);
});

// Recherche médecins
function searchDoctors() {
  const specialty = document.getElementById('specialty').value;
  const city = document.getElementById('city').value.trim().toLowerCase();
  const results = document.getElementById('results');
  const errorEl = document.getElementById('search-error');
  results.innerHTML = "";
  errorEl.textContent = "";

  if (!specialty) {
    errorEl.textContent = "Veuillez choisir une spécialité.";
    return;
  }
  if (!city) {
    errorEl.textContent = "Veuillez indiquer une ville.";
    return;
  }

  // Vérifier ville valide (dans la liste)
  if(!villes.some(v => v.toLowerCase() === city)){
    errorEl.textContent = "Ville non reconnue. Choisissez dans la liste.";
    return;
  }

  const filtered = doctors.filter(doc =>
    doc.specialite === specialty &&
    doc.ville.toLowerCase() === city
  );

  if (filtered.length === 0) {
    results.innerHTML = "<p>Aucun médecin trouvé pour cette spécialité et ville.</p>";
    return;
  }

  filtered.forEach(doc => {
    const doctorDiv = document.createElement('div');
    doctorDiv.className = 'doctor';
    doctorDiv.innerHTML = `<strong>${doc.nom}</strong><br><em>${doc.specialite} à ${doc.ville}</em><br><div class="creneaux"></div>`;

    const creneauxDiv = doctorDiv.querySelector('.creneaux');
    doc.creneaux.forEach(heure => {
      const btn = document.createElement('button');
      btn.textContent = heure;
      btn.onclick = () => {
        // Stocker RDV + affiche confirmation
        const rdv = {
          nom: doc.nom,
          specialite: doc.specialite,
          ville: doc.ville,
          heure: heure,
          datePrise: new Date().toLocaleString()
        };
        saveRdv(rdv);
        localStorage.setItem('rdvDetails', JSON.stringify(rdv));
        showRdv();
      };
      creneauxDiv.appendChild(btn);
    });

    results.appendChild(doctorDiv);
  });
}

// Sauvegarder RDV dans historique
function saveRdv(rdv) {
  let hist = JSON.parse(localStorage.getItem('history')) || [];
  hist.push(rdv);
  localStorage.setItem('history', JSON.stringify(hist));
}

// Afficher historique RDV
function displayHistory() {
  const hist = JSON.parse(localStorage.getItem('history')) || [];
  const list = document.getElementById('historyList');
  list.innerHTML = "";
  if(hist.length === 0){
    list.innerHTML = "<li>Aucun rendez-vous pris pour l'instant.</li>";
    return;
  }
  hist.slice().reverse().forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.datePrise} - ${r.nom} (${r.specialite}), ${r.ville} à ${r.heure}`;
    list.appendChild(li);
  });
}

// Confirmation RDV
function showRdv() {
  if(localStorage.getItem('isLoggedIn') !== 'true'){
    showView('view-login');
    return;
  }
  const details = JSON.parse(localStorage.getItem('rdvDetails'));
  const detailsDiv = document.getElementById('rdv-details');
  if(details){
    detailsDiv.innerHTML = `
      <p><strong>Médecin :</strong> ${details.nom}</p>
      <p><strong>Spécialité :</strong> ${details.specialite}</p>
      <p><strong>Ville :</strong> ${details.ville}</p>
      <p><strong>Heure :</strong> ${details.heure}</p>
      <p><em>Rendez-vous pris le : ${details.datePrise}</em></p>
    `;
  } else {
    detailsDiv.innerHTML = "<p>Aucune information de rendez-vous disponible.</p>";
  }
  showView('view-rdv');
}

function goHome() {
  initHome();
}

// Au chargement
window.onload = () => {
  if(localStorage.getItem('isLoggedIn') === 'true'){
    initHome();
  } else {
    showView('view-login');
  }
};
