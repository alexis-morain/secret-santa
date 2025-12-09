import { useState, useEffect } from 'react'
import { melanger } from './santaLogic'
import Reveal from './Reveal'
import './App.css'

function App() {
  const [modeReveal, setModeReveal] = useState(false)

  // États pour l'admin
  const [date, setDate] = useState("")
  const [budget, setBudget] = useState("")
  const [lieu, setLieu] = useState("") 
  const [notes, setNotes] = useState("") 
  
  const [nom, setNom] = useState("")
  const [participants, setParticipants] = useState([])
  const [resultats, setResultats] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("data")) {
      setModeReveal(true)
    }
  }, [])

  const ajouterParticipant = () => {
    if (nom !== "" && !participants.includes(nom)) {
      setParticipants([...participants, nom])
      setNom("")
    }
  }

  // Fonction pour supprimer un participant
  const supprimerParticipant = (indexToDelete) => {
    setParticipants(participants.filter((_, index) => index !== indexToDelete))
  }

  const lancerTirage = () => {
    if (participants.length < 2) {
      alert("Il faut au moins 2 personnes !")
      return
    }
    const paires = melanger(participants)
    setResultats(paires)
  }

  const partager = async (paire) => {
    const data = {
      pour: paire.pour,
      date: date,
      budget: budget,
      lieu: lieu,
      notes: notes
    }
    const jsonString = JSON.stringify(data)
    const codeSecret = btoa(unescape(encodeURIComponent(jsonString)))
    
    // --- CORRECTION ICI : ON UTILISE VOTRE URL DE PROD FIXE ---
    const domain = "https://secret-santa-tau-sage.vercel.app"; 
    const url = `${domain}/?data=${codeSecret}`

    const message = `🎅 Ho ho ho ${paire.de} !\n\nTa mission Secret Santa t'attend ici :\n${url}`

    if (navigator.share) {
      try { await navigator.share({ title: 'Secret Santa', text: message }) } 
      catch (err) { console.log('Partage annulé') }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Lien copié ! Tu peux le coller à " + paire.de);
      } catch (err) {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
      }
    }
  }

  // Si on est en mode "Révélation", on affiche l'autre composant
  if (modeReveal) {
    return <Reveal />
  }

  // Sinon, on affiche l'interface Admin
  return (
    <div className="card">
      <h1><span className="emoji">🎅</span> Organise ton Secret Santa</h1>

      {!resultats ? (
        <>
          {/* BLOC 1 : Détails de l'événement */}
          <div className="section-block">
            <h3><span className="emoji">📅</span> Détails de l'événement</h3>
            
            {/* CHAMP DATE STABLE (Input natif) */}
            <div style={{width: '100%', marginBottom: '20px', textAlign: 'left'}}>
              <label style={{
                color: '#636e72', 
                fontSize: '0.9rem', 
                fontWeight: '600', 
                marginLeft: '15px', 
                marginBottom: '5px', 
                display: 'block'
              }}>
                Date de l'événement :
              </label>
              <input 
                type="date" 
                lang="fr-FR"
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="input-field" 
                style={{marginBottom: '0'}} 
              />
            </div>
            
            <input type="text" placeholder="Lieu (ex: Chez Maman)" value={lieu} onChange={(e) => setLieu(e.target.value)} className="input-field" />
            <input type="text" placeholder="Budget (ex: 10€)" value={budget} onChange={(e) => setBudget(e.target.value)} className="input-field" />
            
            <textarea 
              placeholder="Notes supplémentaires" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              className="input-field"
            />
          </div>

          {/* BLOC 2 : Participants */}
          <div className="section-block participants-section">
            <h3><span className="emoji">👥</span> Participants ({participants.length})</h3>
            
            <div className="input-group">
              <input 
                type="text" placeholder="Nom du participant" value={nom} 
                onChange={(e) => setNom(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && ajouterParticipant()}
              />
              <button onClick={ajouterParticipant}>Ajouter</button>
            </div>

            <ul>
              {participants.map((p, i) => (
                <li key={i}>
                  {p} 
                  {/* Bouton croix rouge */}
                  <button className="btn-remove" onClick={() => supprimerParticipant(i)}>×</button>
                </li>
              ))}
            </ul>
          </div>

          {/* BLOC 3 : Bouton Lancer */}
          <div className="section-block" style={{border: 'none'}}>
            {participants.length > 1 && (
              <button className="btn-lancer" onClick={lancerTirage}><span className="emoji">🎲</span> Lancer le tirage !</button>
            )}
          </div>
        </>
      ) : (
        /* BLOC 4 : Résultats et Partage */
        <div className="resultats-section">
          <h2><span className="emoji">🎁</span> Tirage prêt !</h2>
          <div className="liste-boutons">
            {resultats.map((paire, index) => (
              <button key={index} className="btn-share" onClick={() => partager(paire)}>
                <span className="emoji">📤</span> {paire.de} : lui partager son lien secret
              </button>
            ))}
          </div>
          <button className="btn-reset" onClick={() => setResultats(null)}>🔄 Recommencer</button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer-credits">
        Site créé avec ❤️ par <a href="https://www.linkedin.com/in/alexis-morain/" target="_blank" rel="noopener noreferrer">Alexis Morain</a>
      </footer>
    </div>
  )
}

export default App