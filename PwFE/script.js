// Dati di esempio
const data = {
    aziende: [
      {
        id: 1,
        nome: "Azienda Alpha",
        indirizzo: "Via Roma 1",
        website: "www.alpha.com",
        vat: "IT12345678901",
        size: "50 dipendenti",
        note: "Nota su Alpha",
        contatti: [
          {
            id: 101,
            nome: "Mario",
            cognome: "Rossi",
            titolo: "Sig.",
            workrole: "CEO",
            gender: "M",
            birth: "1980-05-10",
          },
          {
            id: 102,
            nome: "Luca",
            cognome: "Bianchi",
            titolo: "Ing.",
            workrole: "CTO",
            gender: "M",
            birth: "1985-09-21",
          },
        ],
      },
      {
        id: 2,
        nome: "Azienda Beta",
        indirizzo: "Corso Milano 10",
        website: "www.beta.com",
        vat: "IT98765432109",
        size: "100 dipendenti",
        note: "Nota su Beta",
        contatti: [],
      },
    ],
    contatti: [],
    tipiemail: [],
    tipinumeri: [],
  };
  
  // Al caricamento, impostiamo la sezione predefinita su 'aziende'
  window.addEventListener("DOMContentLoaded", () => {
    setSection("aziende");
    initSidebarButtons();
    initNewBtn();
  });
  
  /**
   * Associa l'evento click ai pulsanti della sidebar (home).
   */
  function initSidebarButtons() {
    const sidebarButtons = document.querySelectorAll(".sidebar button");
    sidebarButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const section = btn.getAttribute("data-section");
        setSection(section);
      });
    });
  }
  
  /**
   * Gestisce il click sul bottone 'Nuovo' in alto a destra.
   * Cambia testo a seconda della sezione in cui ci troviamo.
   */
  function initNewBtn() {
    const newBtn = document.getElementById("newItemBtn");
    newBtn.addEventListener("click", () => {
      const currentSection = document.getElementById("sectionTitle").innerText.toLowerCase();
      alert("Creazione di un nuovo elemento in: " + currentSection);
      // Qui puoi aprire un modale di creazione o gestire la logica di aggiunta.
    });
  }
  
  /**
   * Imposta la sezione corrente e popola la griglia al centro.
   * @param {string} section - la sezione da visualizzare (aziende, contatti, ecc.)
   */
  function setSection(section) {
    document.getElementById("sectionTitle").innerText = capitalize(section);
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";
  
    // In base alla sezione, cambiamo il testo del bottone 'Nuovo'
    const newBtn = document.getElementById("newItemBtn");
    if (section === "aziende") {
      newBtn.innerText = "Nuova Azienda";
    } else if (section === "contatti") {
      newBtn.innerText = "Nuovo Contatto";
    } else {
      newBtn.innerText = "Nuovo";
    }
  
    // Se non ci sono dati, mostriamo un messaggio
    if (!data[section] || data[section].length === 0) {
      tableContainer.innerHTML = "<p>Nessun dato disponibile</p>";
      return;
    }
  
    // Costruiamo dinamicamente la tabella
    if (section === "aziende") {
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Nome</th>
            <th>Indirizzo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector("tbody");
  
      data.aziende.forEach((az) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${az.nome}</td>
          <td>${az.indirizzo}</td>
          <td>
            <button class="view-btn" onclick="openAziendaDetail(${az.id})">View</button>
          </td>
        `;
        tbody.appendChild(row);
      });
  
      tableContainer.appendChild(table);
    } else if (section === "contatti") {
      // Sezione contatti (se volessi popolarla in modo analogo)
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Titolo</th>
            <th>Workrole</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector("tbody");
  
      data.contatti.forEach((ct) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${ct.nome}</td>
          <td>${ct.cognome}</td>
          <td>${ct.titolo}</td>
          <td>${ct.workrole}</td>
          <td>
            <button class="view-btn" onclick="openContattoDetail(${ct.id})">View</button>
          </td>
        `;
        tbody.appendChild(row);
      });
  
      tableContainer.appendChild(table);
    } else {
      // Per le sezioni 'tipiemail', 'tipinumeri', ecc.
      tableContainer.innerHTML = "<p>In costruzione...</p>";
    }
  }
  
  /**
   * Apre il pannello dettaglio azienda a schermo intero,
   * con la sidebar a sinistra e la griglia contatti a destra.
   * @param {number} id - ID dell'azienda
   */
  function openAziendaDetail(id) {
    const azienda = data.aziende.find((a) => a.id === id);
    if (!azienda) return;
  
    // Costruiamo il contenuto del pannello
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
  
    // Pannello principale
    const panel = document.createElement("div");
    panel.classList.add("modal-panel");
  
    // Sidebar sinistra (stile identico alla home)
    const sidebar = document.createElement("div");
    sidebar.classList.add("panel-sidebar");
    sidebar.innerHTML = `
      <h3>Dettagli Azienda</h3>
      <p><strong>Nome:</strong> ${azienda.nome}</p>
      <p><strong>Indirizzo:</strong> ${azienda.indirizzo}</p>
      <p><strong>Website:</strong> ${azienda.website}</p>
      <p><strong>VAT:</strong> ${azienda.vat}</p>
      <p><strong>Dimensione:</strong> ${azienda.size}</p>
      <p><strong>Note:</strong> ${azienda.note}</p>
      <div class="pannello-buttons">
        <button class="save-btn">Salva</button>
        <button class="delete-btn">Elimina</button>
      </div>
    `;
  
    // Parte destra con la lista contatti
    const content = document.createElement("div");
    content.classList.add("panel-content");
  
    // Header con pulsante di chiusura
    const header = document.createElement("div");
    header.classList.add("panel-header");
    header.innerHTML = `
      <h2>Contatti di ${azienda.nome}</h2>
      <button class="close-btn">X</button>
    `;
  
    // Aggiungiamo listener per chiudere il pannello
    header.querySelector(".close-btn").addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  
    // Tabella contatti
    let contattiHTML = `
      <table class="panel-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Titolo</th>
            <th>Workrole</th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
    `;
    azienda.contatti.forEach((ct) => {
      contattiHTML += `
        <tr>
          <td>${ct.nome}</td>
          <td>${ct.cognome}</td>
          <td>${ct.titolo}</td>
          <td>${ct.workrole}</td>
          <td>${ct.gender}</td>
          <td>${ct.birth}</td>
          <td>
            <button class="view-btn" onclick="openContattoDetail(${ct.id}, ${azienda.id})">View</button>
          </td>
        </tr>
      `;
    });
    contattiHTML += `</tbody></table>`;
  
    // Aggiungiamo tutto al content
    content.appendChild(header);
    const tableWrapper = document.createElement("div");
    tableWrapper.innerHTML = contattiHTML;
    content.appendChild(tableWrapper);
  
    // Assembliamo il pannello
    panel.appendChild(sidebar);
    panel.appendChild(content);
  
    // Aggiungiamo il pannello all'overlay
    overlay.appendChild(panel);
  
    // Infine aggiungiamo tutto al body
    document.body.appendChild(overlay);
  }
  
  /**
   * Apre il pannello dettaglio contatto,
   * con la possibilità di Modifica ed Elimina.
   * @param {number} contattoId - ID del contatto
   * @param {number} aziendaId - ID dell'azienda di appartenenza
   */
  function openContattoDetail(contattoId, aziendaId) {
    const azienda = data.aziende.find((a) => a.id === aziendaId);
    if (!azienda) return;
    const contatto = azienda.contatti.find((c) => c.id === contattoId);
    if (!contatto) return;
  
    // Creiamo un overlay simile a quello dell'azienda
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
  
    const panel = document.createElement("div");
    panel.classList.add("modal-panel");
  
    // Sidebar a sinistra con i dettagli del contatto
    const sidebar = document.createElement("div");
    sidebar.classList.add("panel-sidebar");
    sidebar.innerHTML = `
      <h3>Dettagli Contatto</h3>
      <p><strong>Nome:</strong> ${contatto.nome}</p>
      <p><strong>Cognome:</strong> ${contatto.cognome}</p>
      <p><strong>Titolo:</strong> ${contatto.titolo}</p>
      <p><strong>Workrole:</strong> ${contatto.workrole}</p>
      <p><strong>Gender:</strong> ${contatto.gender}</p>
      <p><strong>Birth:</strong> ${contatto.birth}</p>
      <div class="pannello-buttons">
        <button class="save-btn" onclick="editContatto(${contatto.id}, ${azienda.id})">Modifica</button>
        <button class="delete-btn" onclick="deleteContatto(${contatto.id}, ${azienda.id})">Elimina</button>
      </div>
    `;
  
    // Contenuto a destra (vuoto o con info aggiuntive)
    const content = document.createElement("div");
    content.classList.add("panel-content");
  
    const header = document.createElement("div");
    header.classList.add("panel-header");
    header.innerHTML = `
      <h2>Contatto: ${contatto.nome} ${contatto.cognome}</h2>
      <button class="close-btn">X</button>
    `;
    header.querySelector(".close-btn").addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
    content.appendChild(header);
  
    // Assembliamo il pannello
    panel.appendChild(sidebar);
    panel.appendChild(content);
  
    // Overlay
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  }
  
  /* Funzioni di modifica ed eliminazione contatto (stub) */
  function editContatto(contattoId, aziendaId) {
    alert(`Modifica contatto ID=${contattoId} dell'azienda ID=${aziendaId}`);
  }
  
  function deleteContatto(contattoId, aziendaId) {
    alert(`Elimina contatto ID=${contattoId} dell'azienda ID=${aziendaId}`);
  }
  
  /* Utility */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  