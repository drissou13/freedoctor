// === Données ===
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

// Génère un nom de médecin aléatoire
function generateNom() {
  const prenoms = ["Alice", "Jean", "Karim", "Lucia", "Naoki", "Elise", "Fatima", "Tom", "Rita", "Omar"];
  const noms = ["Durand", "Lemoine", "Nguyen", "Kowalski", "Moreau", "Singh", "Petit", "Takahashi", "Lopez", "Smith"];
  return `Dr. ${prenoms[Math.floor(Math.random() * prenoms.length)]} ${noms[Math.floor(Math.random() * noms.length)]}`;
}

// Mélange aléatoire
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Génère des créneaux aléatoires
function generateCreneaux() {
  return shuffle([...horaires]).slice(0, 3);
}

// Génère les RDV garantis pour chaque ville + spécialité
const rdvs = [];

villes.forEach(ville => {
  specialites.forEach(specialite => {
    rdvs.push({
      ville,
      specialite,
      medecin: generateNom(),
      creneaux: generateCreneaux()
    });
  });
});

// Ex : Affiche tous les RDV dans la console
console.log("RDV générés : ", rdvs);

// Exemple d'affichage HTML (optionnel)
/*
rdvs.forEach(rdv => {
  console.log(`${rdv.medecin} (${rdv.specialite}) à ${rdv.ville} : ${rdv.creneaux.join(", ")}`);
});
*/
