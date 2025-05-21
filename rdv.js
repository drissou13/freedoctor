const specialites = [
  "Médecin Généraliste", "Dentiste", "Dermatologue", "Cardiologue", "Ophtalmologue",
  "Pédiatre", "Psychiatre", "Gynécologue", "Neurologue", "ORL", "Rhumatologue",
  "Endocrinologue", "Urologue", "Chirurgien", "Oncologue", "Pneumologue",
  "Gastro-entérologue", "Allergologue", "Médecin du sport", "Anesthésiste",
  "Radiologue", "Infectiologue", "Gériatre", "Sexologue", "Néphrologue"
];

const villes = [
  "Paris", "Lyon", "Marseille", "New York", "Tokyo", "Berlin", "Londres",
  "Rome", "Madrid", "Toronto", "Bruxelles", "Dakar", "Sydney", "Buenos Aires",
  "Nairobi", "Casablanca", "Hanoï", "Montréal", "Moscou", "Istanbul"
];

const horaires = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];

function generateNom() {
  const prenoms = ["Alice", "Jean", "Karim", "Lucia", "Naoki", "Elise", "Fatima", "Tom", "Rita", "Omar"];
  const noms = ["Durand", "Lemoine", "Nguyen", "Kowalski", "Moreau", "Singh", "Petit", "Takahashi", "Lopez", "Smith"];
  return `Dr. ${prenoms[Math.floor(Math.random() * prenoms.length)]} ${noms[Math.floor(Math.random() * noms.length)]}`;
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateCreneaux() {
  return shuffle([...horaires]).slice(0, 3);
}

const rdvs = [];
villes.forEach(ville => {
  specialites.forEach(specialite => {
    for (let i = 0; i < 2; i++) {
      rdvs.push({
        ville,
        specialite,
        medecin: generateNom(),
        creneaux: generateCreneaux()
      });
    }
  });
});

const villeSelect = document.getElementById("ville");
const specialiteSelect = document.getElementById("specialite");

villes.forEach(v => {
  const opt = document.createElement("option");
  opt.value = v;
  opt.textContent = v;
  villeSelect.appendChild(opt);
});

specialites.forEach(s => {
  const opt = document.createElement("option");
  opt.value = s;
  opt.textContent = s;
  specialiteSelect.appendChild(opt);
});

function rechercherRDV() {
  const villeChoisie = villeSelect.value;
  const specialiteChoisie = specialiteSelect.value;
  const results = document.getElementById("results");
  results.innerHTML = "";

  const correspondants = rdvs.filter(rdv =>
    rdv.ville === villeChoisie && rdv.specialite === specialiteChoisie
  );

  correspondants.forEach(rdv => {
    const div = document.createElement("div");
    div.className = "rdv-card";
    div.innerHTML = `
      <strong>${rdv.medecin}</strong><br>
      ${rdv.specialite} - ${rdv.ville}<br>
      <div class="creneaux">
        ${rdv.creneaux.map(c => `<span>${c}</span>`).join("")}
      </div>
    `;
    results.appendChild(div);
  });
}
