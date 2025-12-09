// On ajoute "export" devant pour dire : "Cette fonction peut être utilisée ailleurs"
export function melanger(noms) {
  let donneurs = [...noms]; 
  let receveurs = [...noms];
  let estValide = false;

  while (!estValide) {
    receveurs.sort(() => Math.random() - 0.5);
    const conflit = donneurs.some((donneur, index) => donneur === receveurs[index]);
    if (!conflit) estValide = true;
  }

  return donneurs.map((donneur, index) => {
    return {
      de: donneur,
      pour: receveurs[index]
    };
  });
}