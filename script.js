// Liste des spécialités
const specialites = [
  "Médecin Généraliste", "Dentiste", "Dermatologue", "Cardiologue", "Ophtalmologue",
  "Pédiatre", "Psychiatre", "Gynécologue", "Neurologue", "ORL", "Rhumatologue",
  "Endocrinologue", "Urologue", "Chirurgien", "Oncologue", "Pneumologue",
  "Gastro-entérologue", "Allergologue", "Médecin du sport", "Anesthésiste",
  "Radiologue", "Infectiologue", "Gériatre", "Sexologue", "Néphrologue"
];

// Liste des villes
const villes = [
  "Paris", "Lyon", "Marseille", "New York", "Tokyo", "Berlin", "Londres",
  "Rome", "Madrid", "Toronto", "Bruxelles", "Dakar", "Sydney", "Buenos Aires",
  "Nairobi", "Casablanca", "Hanoï", "Montréal", "Moscou", "Istanbul"
];

// Créneaux horaires possibles
const creneauxDisponibles = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];

// Fonction pour générer un nom aléatoire de médecin
function generateNomMedecin() {
  const prenoms = ["Sophie", "Jean", "Ali", "Maria", "Luca", "Aya", "Fatou", "Tom", "Elena", "Omar"];
  const noms = ["Dupont", "Martin", "Bernard", "Dubois", "Petit", "Roux", "Lemoine", "Nguyen", "Kowalski", "Singh"];
  const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
  const nom = noms[Math.floor(Math.random() * noms.length)];
  return `Dr. ${prenom} ${nom}`;
}

// Fonction pour mélanger et prendre n éléments d’un tableau
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Génération des médecins avec RDV
const rdvs = [];

specialites.forEach(specialite => {
  villes.forEach(ville => {
    // Générer 1 à 3 médecins par spécialité et ville
    const nbMedecins = Math.floor(Math.random() * 3) + 1;
    for(let i = 0; i < nbMedecins; i++) {
      const medecin = generateNomMedecin();
      // Mélanger et prendre 3 créneaux aléatoires
      const creneaux = shuffleArray(creneauxDisponibles).slice(0, 3);
      rdvs.push({
        medecin,
        specialite,
        ville,
        creneaux
      });
    }
  });
});

console.log(rdvs);
