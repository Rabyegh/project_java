// ============================================
// TRAINING CENTER MANAGEMENT - MAIN APP
// ============================================

// ============================================
// API SERVICE LAYER
// ============================================
const API_BASE_URL = '/api';

const API = {
  // Trainers
  trainers: {
    getAll: () => fetch(`${API_BASE_URL}/formateurs`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE_URL}/formateurs/${id}`).then(r => r.json()),
    create: (data) => fetch(`${API_BASE_URL}/formateurs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_BASE_URL}/formateurs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_BASE_URL}/formateurs/${id}`, {
      method: 'DELETE'
    })
  },

  // Students
  students: {
    getAll: () => fetch(`${API_BASE_URL}/etudiants`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE_URL}/etudiants/${id}`).then(r => r.json()),
    create: (data) => fetch(`${API_BASE_URL}/etudiants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_BASE_URL}/etudiants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_BASE_URL}/etudiants/${id}`, {
      method: 'DELETE'
    })
  },

  // Rooms
  rooms: {
    getAll: () => fetch(`${API_BASE_URL}/salles`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE_URL}/salles/${id}`).then(r => r.json()),
    create: (data) => fetch(`${API_BASE_URL}/salles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_BASE_URL}/salles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_BASE_URL}/salles/${id}`, {
      method: 'DELETE'
    })
  },

  // Materials
  materials: {
    getAll: () => fetch(`${API_BASE_URL}/materiels`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE_URL}/materiels/${id}`).then(r => r.json()),
    create: (data) => fetch(`${API_BASE_URL}/materiels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_BASE_URL}/materiels/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_BASE_URL}/materiels/${id}`, {
      method: 'DELETE'
    })
  },

  // Courses
  courses: {
    getAll: () => fetch(`${API_BASE_URL}/cours`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE_URL}/cours/${id}`).then(r => r.json()),
    create: (data) => fetch(`${API_BASE_URL}/cours`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_BASE_URL}/cours/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_BASE_URL}/cours/${id}`, {
      method: 'DELETE'
    })
  },

  // Schedule
  schedule: {
    generate: (params) => fetch(`${API_BASE_URL}/planning/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then(r => r.json()),
    getWeek: (week) => fetch(`${API_BASE_URL}/planning/semaine?week=${week}`).then(r => r.json()),
    getAll: () => fetch(`${API_BASE_URL}/planning`).then(r => r.json())
  },

  // Statistics
  stats: {
    getUsage: () => fetch(`${API_BASE_URL}/stats/usage`).then(r => r.json()),
    getConflicts: () => fetch(`${API_BASE_URL}/stats/conflicts`).then(r => r.json()),
    getSatisfaction: () => fetch(`${API_BASE_URL}/stats/satisfaction`).then(r => r.json())
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} toast`;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    min-width: 300px;
    animation: slideInRight 0.3s ease-out;
  `;
  
  toast.innerHTML = `
    <div class="alert-content">
      <div class="alert-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
      <div>${message}</div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Show loading overlay
function showLoading() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.id = 'loading-overlay';
  overlay.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(overlay);
}

// Hide loading overlay
function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.remove();
}

// Format date
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format time
function formatTime(time) {
  if (!time) return '';
  return time.substring(0, 5); // HH:MM
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone);
}

// ============================================
// MODAL MANAGEMENT
// ============================================
class Modal {
  constructor(id) {
    this.id = id;
    this.overlay = null;
    this.modal = null;
  }

  create(title, content, footer = '') {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    this.overlay.id = this.id;
    
    this.overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" onclick="closeModal('${this.id}')">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    `;
    
    document.body.appendChild(this.overlay);
    
    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    if (this.overlay) {
      setTimeout(() => this.overlay.classList.add('active'), 10);
    }
  }

  close() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
      setTimeout(() => this.overlay.remove(), 300);
    }
  }
}

// Global function to close modal
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

// ============================================
// NAVIGATION MANAGEMENT
// ============================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Toggle sidebar on mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('active');
  }
}

// ============================================
// DATA TABLE MANAGEMENT
// ============================================
class DataTable {
  constructor(tableId, data, columns, actions) {
    this.tableId = tableId;
    this.data = data;
    this.columns = columns;
    this.actions = actions;
    this.filteredData = [...data];
    this.sortColumn = null;
    this.sortDirection = 'asc';
  }

  render() {
    const table = document.getElementById(this.tableId);
    if (!table) return;

    let html = '<thead><tr>';
    
    // Headers
    this.columns.forEach(col => {
      html += `<th onclick="table_${this.tableId}.sort('${col.key}')" style="cursor: pointer;">
        ${col.label}
        <span class="sort-indicator"></span>
      </th>`;
    });
    
    if (this.actions) {
      html += '<th>Actions</th>';
    }
    
    html += '</tr></thead><tbody>';
    
    // Rows
    this.filteredData.forEach(row => {
      html += '<tr>';
      
      this.columns.forEach(col => {
        let value = row[col.key];
        if (col.format) {
          value = col.format(value, row);
        }
        html += `<td>${value || '-'}</td>`;
      });
      
      if (this.actions) {
        html += '<td><div class="flex gap-2">';
        this.actions.forEach(action => {
          html += `<button class="btn btn-sm ${action.class}" onclick="${action.onclick}(${row.id})">
            ${action.icon ? `<span>${action.icon}</span>` : ''}
            ${action.label}
          </button>`;
        });
        html += '</div></td>';
      }
      
      html += '</tr>';
    });
    
    html += '</tbody>';
    table.innerHTML = html;
  }

  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredData.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    this.render();
  }

  filter(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    this.filteredData = this.data.filter(row => {
      return this.columns.some(col => {
        const value = String(row[col.key] || '').toLowerCase();
        return value.includes(searchTerm);
      });
    });
    this.render();
  }

  updateData(newData) {
    this.data = newData;
    this.filteredData = [...newData];
    this.render();
  }
}

// ============================================
// FORM VALIDATION
// ============================================
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  inputs.forEach(input => {
    const errorElement = input.parentElement.querySelector('.form-error');
    
    // Remove previous errors
    if (errorElement) {
      errorElement.remove();
    }
    input.classList.remove('error');

    // Check if empty
    if (!input.value.trim()) {
      showFieldError(input, 'Ce champ est requis');
      isValid = false;
      return;
    }

    // Email validation
    if (input.type === 'email' && !validateEmail(input.value)) {
      showFieldError(input, 'Email invalide');
      isValid = false;
      return;
    }

    // Phone validation
    if (input.type === 'tel' && !validatePhone(input.value)) {
      showFieldError(input, 'Numéro de téléphone invalide');
      isValid = false;
      return;
    }

    // Number validation
    if (input.type === 'number') {
      const min = input.getAttribute('min');
      const max = input.getAttribute('max');
      const value = parseFloat(input.value);

      if (min && value < parseFloat(min)) {
        showFieldError(input, `La valeur doit être au moins ${min}`);
        isValid = false;
        return;
      }

      if (max && value > parseFloat(max)) {
        showFieldError(input, `La valeur doit être au maximum ${max}`);
        isValid = false;
        return;
      }
    }
  });

  return isValid;
}

function showFieldError(input, message) {
  input.classList.add('error');
  const error = document.createElement('div');
  error.className = 'form-error';
  error.textContent = message;
  input.parentElement.appendChild(error);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Set active navigation link
  setActiveNavLink();

  // Add mobile menu toggle button if needed
  if (window.innerWidth <= 1024) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'btn btn-primary btn-icon';
      menuBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 999;';
      menuBtn.innerHTML = '☰';
      menuBtn.onclick = toggleSidebar;
      mainContent.appendChild(menuBtn);
    }
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .form-input.error,
  .form-select.error,
  .form-textarea.error {
    border-color: var(--danger-500);
  }
`;
document.head.appendChild(style);
