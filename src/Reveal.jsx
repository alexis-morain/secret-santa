import { useState, useEffect } from 'react'

export default function Reveal() {
  const [data, setData] = useState(null)
  const [ouvert, setOuvert] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const codeSecret = params.get("data")

    if (codeSecret) {
      try {
        const jsonString = decodeURIComponent(escape(atob(codeSecret)))
        setData(JSON.parse(jsonString))
      } catch (e) {
        console.error("Erreur de décodage", e)
      }
    }
  }, [])

  const formatDateFr = (dateStr) => {
    if (!dateStr) return "Non précisée";
    const dateObj = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatee = dateObj.toLocaleDateString('fr-FR', options);
    return "Le " + dateFormatee;
  }

  // Fonction pour retourner à l'accueil
  const allerAccueil = () => {
    // Redirige vers la racine du site (la page de création)
    window.location.href = "/";
  }

  if (!data) return <div className="card">❌ Lien invalide ou cassé.</div>

  // CADEAU FERMÉ
  if (!ouvert) {
    return (
      <div className="card reveal-card-closed">
        <h1><span className="emoji">🎄</span> Tu as reçu une mission !</h1>
        <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>Quelqu'un t'a désigné pour le Secret Santa...</p>
        
        <button className="btn-cadeau" onClick={() => setOuvert(true)}>
          <span className="emoji">🎁</span> OUVRIR VITE ! <span className="emoji">🎁</span>
        </button>

        <footer className="footer-credits">
          Site créé avec ❤️ par <a href="https://www.linkedin.com/in/alexis-morain/" target="_blank" rel="noopener noreferrer">Alexis Morain</a>
        </footer>
      </div>
    )
  }

  // CADEAU OUVERT
  return (
    <div className="card reveal-card-open">
      <h3 className="reveal-subtitle"><span className="emoji">🎅</span> Ta cible est...</h3>
      
      <div className="nom-cible">
        {data.pour}
      </div>

      <div className="infos-event">
        <p><strong><span className="emoji">📅</span> Date :</strong> {formatDateFr(data.date)}</p>
        <p><strong><span className="emoji">📍</span> Lieu :</strong> {data.lieu || "Surprise"}</p>
        <p><strong><span className="emoji">💰</span> Budget :</strong> {data.budget || "Libre"}</p>
        
        {data.notes && (
          <div style={{marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '10px'}}>
            <p><strong><span className="emoji">📝</span> Notes :</strong></p>
            <p style={{fontStyle: 'italic', whiteSpace: 'pre-line'}}>{data.notes}</p>
          </div>
        )}
      </div>

      <p className="footer-note">Chut... c'est un secret ! <span className="emoji">🤫</span></p>

      {/* --- NOUVEAU BOUTON ICI --- */}
      <button className="btn-create-own" onClick={allerAccueil}>
        <span className="emoji">✨</span> Organiser mon Secret Santa
      </button>

      <footer className="footer-credits">
        Site créé avec ❤️ par <a href="https://www.linkedin.com/in/alexis-morain/" target="_blank" rel="noopener noreferrer">Alexis Morain</a>
      </footer>
    </div>
  )
}