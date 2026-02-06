let pollution = 100;
let energie = 0;
let satisfaction = 0;
let argent = 10000;
let jour = 1;

let eolienneNiveau = 0;
let usineNiveau = 0;
let transportNiveau = 0;

let eolienneAchetee = false;
let usineAchetee = false;
let transportAchete = false;

function demarrerJeu() {
    const pseudo = document.getElementById('pseudo').value;
    const ville = document.getElementById('ville').value;

    if (!pseudo || !ville) {
        afficherMessage('Veuillez remplir tous les champs !', 'error');
        return;
    }

    document.getElementById('ecran-accueil').classList.add('hidden');
    document.getElementById('ecran-jeu').classList.remove('hidden');
    afficherMessage(`Bienvenue ${pseudo} à ${ville} ! 🎉`, 'success');
}

function mettreAJourStats() {
    document.getElementById('stat-pollution').textContent = pollution;
    document.getElementById('stat-energie').textContent = energie;
    document.getElementById('stat-satisfaction').textContent = satisfaction;
    document.getElementById('stat-argent').textContent = argent + ' €';
    document.getElementById('stat-jour').textContent = jour;

    document.getElementById('niveau-eolienne').textContent = eolienneNiveau;
    document.getElementById('niveau-usine').textContent = usineNiveau;
    document.getElementById('niveau-transport').textContent = transportNiveau;

    verifierVictoire();
}

function afficherMessage(texte, type = 'success') {
    const messagesDiv = document.getElementById('messages');
    const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : 'alert-warning';

    messagesDiv.innerHTML = `<div class="alert ${alertClass}">${texte}</div>`;

    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 3000);
}

function afficherMateriel() {
    cacherSections();
    document.getElementById('section-materiel').classList.remove('hidden');
}

function afficherAmelioration() {
    cacherSections();
    document.getElementById('section-amelioration').classList.remove('hidden');
}

function cacherSections() {
    document.getElementById('section-materiel').classList.add('hidden');
    document.getElementById('section-amelioration').classList.add('hidden');
}

function acheterMateriel(type) {
    if (type === 'eolienne' && !eolienneAchetee) {
        pollution += 5;
        energie += 5;
        eolienneNiveau = 1;
        argent -= 1000; 
        eolienneAchetee = true;
        afficherMessage('🌬️ Éolienne achetée ! +5 pollution, +5 énergie', 'success');
    } else if (type === 'usine' && !usineAchetee) {
        pollution += 5;
        energie += 3;
        satisfaction -= 5;
        usineNiveau = 1;
        argent -= 1000;
        usineAchetee = true;
        afficherMessage('🏭 Usine achetée ! +5 pollution, +3 énergie, -5 satisfaction', 'success');
    } else if (type === 'transport' && !transportAchete) {
        energie -= 5;
        satisfaction += 5;
        argent -= 1000;
        pollution -= 15
        transportNiveau = 1;
        transportAchete = true;
        afficherMessage('🚌 Transport en commun acheté ! -5 énergie, +5 satisfaction, -15 pollution', 'success');
    } else {
        afficherMessage('❌ Vous avez déjà cet objet !', 'error');
    }

    mettreAJourStats();
}

function ameliorerMateriel(type) {
    const niveaux = prompt('Combien de niveaux voulez-vous ajouter ? (1-4)\n1 niveau = 1000€\n2 niveaux = 2000€\n3 niveaux = 3000€\n4 niveaux = 4000€');
    const nbNiveaux = parseInt(niveaux);

    if (isNaN(nbNiveaux) || nbNiveaux < 1 || nbNiveaux > 4) {
        afficherMessage('❌ Nombre invalide !', 'error');
        return;
    }

    const cout = nbNiveaux * 1000;

    if (argent < cout) {
        afficherMessage('❌ Pas assez d\'argent !', 'error');
        return;
    }

    argent -= cout;

    if (type === 'eolienne') {
        eolienneNiveau += nbNiveaux;
        afficherMessage(`⬆️ Éoliennes améliorées de ${nbNiveaux} niveau(x) pour ${cout}€`, 'success');
    } else if (type === 'usine') {
        usineNiveau += nbNiveaux;
        afficherMessage(`⬆️ Usines améliorées de ${nbNiveaux} niveau(x) pour ${cout}€`, 'success');
    } else if (type === 'transport') {
        transportNiveau += nbNiveaux;
        afficherMessage(`⬆️ Transports améliorés de ${nbNiveaux} niveau(x) pour ${cout}€`, 'success');
    }
    if (type === "eolienne" && nbNiveaux === "1") {
        energie += 5;
        pollution += 10;
    }
    if (type === "eolienne" && nbNiveaux === "2") {
        energie += 10; 
        pollution += 15;
    }
    if (type === "eolienne" && nbNiveaux === "3") {
        energie += 20;
        pollution += 18;
    }
    if (type === "eolienne" && nbNiveaux === "4") {
        energie += 40;
        pollution += 20;
    }
    if (type === "usine" && nbNiveaux === "1") {
        energie += 5;
        pollution += 5;
    }
    if (type === "usine" && nbNiveaux === "2") {
        energie += 10;
        pollution += 10;
    }
    if (type === "usine" && nbNiveaux === "3") {
        energie += 20;
        pollution += 13;
    }
    if (type === "usine" && nbNiveaux === "4") {
        energie += 40;
        pollution += 15;
    }
    if (type === "transport" && nbNiveaux === "1") {
        energie += 5;
        pollution -= 2;
    }
    
    if (type === "transport" && nbNiveaux === "2") {
        energie += 10;
        pollution -= 4;
    }
    
    if (type === "transport" && nbNiveaux === "3") {
        energie += 20;
        pollution -= 8;
    }
    
    if (type === "transport" && nbNiveaux === "4") {
        energie += 25;
        pollution -= 15;
    }
    mettreAJourStats();
}

function afficherScore() {
    alert(`📊 VOTRE SCORE\n\n🌱 Pollution : ${pollution}\n⚡ Énergie : ${energie}\n😊 Satisfaction : ${satisfaction}\n💰 Argent : ${argent}€\n📅 Jour : ${jour}`);
}

function passerJour() {
    jour++;
    satisfaction += 10;
    energie += 10;
    pollution -= 2;

    if (transportNiveau > 0) {
        pollution -= 15;
    }

    if (eolienneNiveau > 0) {
        energie += 5;
    }

    if (usineNiveau > 0) {
        energie += 5;
    }

    const moyenneNiveau = (eolienneNiveau + usineNiveau + transportNiveau) / 3;

    if (moyenneNiveau >= 1 && moyenneNiveau < 5) {
        argent += 5000;
        afficherMessage('💰 +5000€ gagnés en passant au jour suivant ! ⚡ +10 d énergie', 'success');
    } else if (moyenneNiveau >= 5 && moyenneNiveau < 10) {
        argent += 2000;
        afficherMessage('💰 +2000€ gagnés en passant au jour suivant !', 'success');
    }

    mettreAJourStats();
}

function verifierVictoire() {
    if (energie >= 100 && satisfaction >= 100 && pollution <= 0) {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = `
            <div class="victory">
                🎉 VICTOIRE ! 🎉<br>
                Vous avez créé la smart city parfaite !<br>
                Jour : ${jour}
            </div>
        `;
    }
}

mettreAJourStats();
