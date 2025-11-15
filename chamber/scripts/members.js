document.addEventListener('DOMContentLoaded', () => {
  const membersContainer = document.getElementById('membersContainer');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const searchInput = document.getElementById('searchInput');
  const membershipFilter = document.getElementById('membershipFilter');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  let members = [];
  let currentView = 'grid';

  // Mobile navigation toggle
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.style.display = expanded ? '' : 'block';
  });

  // Load JSON data
  async function loadMembers() {
    try {
      const res = await fetch('data/members.json');
      if (!res.ok) throw new Error('Failed to load members.json: ' + res.status);
      members = await res.json();
      renderMembers();
    } catch (err) {
      console.error(err);
      membersContainer.innerHTML = `<p>Error loading data: ${err.message}</p>`;
    }
  }

  // Render grid or list view
  function renderMembers() {
    const q = searchInput.value.trim().toLowerCase();
    const membershipValue = membershipFilter.value;

    const filtered = members.filter(m => {
      if (membershipValue !== 'all' && String(m.membershipLevel) !== membershipValue) return false;

      const matchText = `${m.name} ${m.address} ${m.phone} ${m.notes} ${m.email}`.toLowerCase();
      if (q && !matchText.includes(q)) return false;

      return true;
    });

    membersContainer.classList.toggle('grid', currentView === 'grid');
    membersContainer.classList.toggle('list', currentView === 'list');

    if (filtered.length === 0) {
      membersContainer.innerHTML = '<p>No members found matching your criteria.</p>';
      return;
    }

    membersContainer.innerHTML = filtered.map(memberToHTML).join('');
  }

  function memberToHTML(m) {
    const imgSrc = m.image || '';
    const imageTag = `
      <div class="thumb">
        <img alt="${escapeHTML(m.name)}" src="${imgSrc}" 
        onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect width=%22200%22 height=%22200%22 fill=%22%23f2f2f2%22/%3E%3Ctext x=%22100%22 y=%22110%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%23666%22 font-family=%22Arial%22%3ENo%20Image%3C/text%3E%3C/svg%3E';" />
      </div>`;

    const levelClass = `level-${m.membershipLevel}`;
    const levelText = membershipLabel(m.membershipLevel);

    return `
      <article class="member-card">
        ${imageTag}
        <div class="info">
          <h3>${escapeHTML(m.name)} <span class="badge ${levelClass}">${escapeHTML(levelText)}</span></h3>
          <p>${escapeHTML(m.address)}</p>
          <p>${escapeHTML(m.phone)} ${m.email ? ' • ' + escapeHTML(m.email) : ''}</p>
          <p><a href="${escapeAttr(m.website)}" target="_blank" rel="noopener">${escapeHTML(displayUrl(m.website))}</a></p>
        </div>
      </article>`;
  }

  function membershipLabel(level) {
    return (
      {
        3: 'Gold',
        2: 'Silver',
        1: 'Member'
      }[level] || 'Member'
    );
  }

  function displayUrl(url) {
    try {
      return (new URL(url)).hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  function escapeHTML(str = '') {
    return String(str).replace(/[&<>"]/g, c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;'
    })[c]);
  }

  function escapeAttr(str = '') {
    return String(str).replace(/"/g, '&quot;');
  }

  // View toggle
  gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    renderMembers();
  });

  listBtn.addEventListener('click', () => {
    currentView = 'list';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    renderMembers();
  });

  searchInput.addEventListener('input', renderMembers);
  membershipFilter.addEventListener('change', renderMembers);

  loadMembers();
});
