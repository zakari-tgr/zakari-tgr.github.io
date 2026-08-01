/* =========================================================================
   COMMENT AJOUTER UN NOUVEL ÉVÉNEMENT OU ARTICLE
   -------------------------------------------------------------------------
   1. Copiez un bloc { ... } ci-dessous (entre les accolades).
   2. Collez-le juste après "const CONTENT = [".
   3. Modifiez les champs :
        type    : "evenement"  ou  "article"
        date    : "AAAA-MM-JJ" (utilisé pour trier, du plus récent au plus ancien)
        title   : le titre
        excerpt : un court texte de présentation (2-3 phrases)
        link    : (optionnel) un lien externe, ex. vers le post Facebook complet
   4. Enregistrez le fichier, puis republiez le site (voir README.md).
   ========================================================================= */

const CONTENT = [
  {
    type: "article",
    date: "2018-04-24",
    title: "Participation à la caravane culturelle « Tafsut Imaziɣen »",
    excerpt: "Notre troupe théâtrale a pris part aux festivités culturelles (Caravane) organisées avec les associations Talwit Ait Bouadda et Agraw n Tdukli Nath Bouadda, à l'occasion de la célébration de Tafsut Imaziɣen.",
    link: "https://www.facebook.com/associationarrawntlelli/"
  },
  {
    type: "evenement",
    date: "2018-04-20",
    title: "Hommage aux martyrs du Printemps berbère 1980 et du Printemps noir 2001",
    excerpt: "Célébration du 38ᵉ anniversaire du Printemps berbère « Tafsut Imaziɣen », en mémoire des luttes pour la reconnaissance de l'identité et de la langue amazighes.",
    link: "https://www.facebook.com/associationarrawntlelli/"
  },
  {
    type: "article",
    date: "2018-02-05",
    title: "Participation aux festivités de l'université Mouloud Mammeri",
    excerpt: "Notre troupe théâtrale a participé aux festivités culturelles organisées par le comité du département MI, à l'université Mouloud Mammeri de Tizi-Ouzou (campus Tamda).",
    link: "https://www.facebook.com/associationarrawntlelli/"
  },
  {
    type: "evenement",
    date: "2018-01-13",
    title: "Yennayer 2968 — Nouvel an amazigh",
    excerpt: "Comme chaque année, la communauté amazighe a fêté le nouvel an avec des préparatifs dignes de la victoire du roi amazigh Cacnaq. Une première célébration organisée par l'association dans la commune d'Aghrib.",
    link: "https://www.facebook.com/associationarrawntlelli/"
  },
  {
    type: "evenement",
    date: "2018-01-03",
    title: "Tinubga — Invitation à Yennayer",
    excerpt: "Yennayer, le nouvel an amazigh, cette coutume ancestrale fêtée à travers tout le territoire national. Invitation à célébrer l'entrée dans l'an berbère 2968.",
    link: "https://www.facebook.com/associationarrawntlelli/"
  },
  {
    type: "article",
    date: "2017-12-13",
    title: "Isefra — Poésie de Boudjema Bughriv",
    excerpt: "Une soirée dédiée à la poésie kabyle, avec les vers du poète Boudjema Bughriv : « Thuthlayth ihuzen afriwen ».",
    link: "https://www.facebook.com/associationarrawntlelli/"
  },
  {
    type: "evenement",
    date: "2017-06-16",
    title: "Resto Rahma — Dar Erahma",
    excerpt: "À l'occasion du mois sacré du Ramadan, l'association a soutenu l'ouverture d'un restaurant solidaire destiné aux personnes démunies du village.",
    link: "https://www.facebook.com/associationarrawntlelli/"
  }
];

/* ===================== Rendu — vous n'avez pas besoin de modifier
   ce qui suit pour ajouter du contenu ===================== */

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function renderCards(filter) {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = "";

  const sorted = [...CONTENT].sort((a, b) => (a.date < b.date ? 1 : -1));
  const items = filter === "all" ? sorted : sorted.filter(i => i.type === filter);

  if (items.length === 0) {
    grid.innerHTML = '<p style="color:var(--ink-soft)">Aucun contenu pour le moment.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    const tagLabel = item.type === "evenement" ? "Événement" : "Article";
    card.innerHTML = `
      <div class="card-media"></div>
      <div class="card-body">
        <span class="tag">${tagLabel}</span>
        <h3>${item.title}</h3>
        <span class="date">${formatDate(item.date)}</span>
        <p class="excerpt">${item.excerpt}</p>
        ${item.link ? `<a class="read" href="${item.link}" target="_blank" rel="noopener">Lire la suite →</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards("all");

  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.dataset.filter);
    });
  });
});
