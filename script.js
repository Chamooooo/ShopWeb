document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista');
  const form = document.getElementById('form');
  const input = document.getElementById('producto');
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[0-9]/g, '');
  });  
  const toggleThemeButton = document.getElementById('toggle-theme');
  let productos = JSON.parse(localStorage.getItem('productos')) || [];

  render();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombre = input.value.trim();
    if (nombre) {
      nombre = capitalizarPrimeraLetra(nombre);
      productos.push({ nombre, comprado: false, cantidad: 1 });
      input.value = '';
      guardar();
      render();
    }
  });

  function render() {
    lista.innerHTML = '';
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    productos.forEach((p, i) => {
      const li = document.createElement('li');
      li.className = p.comprado ? 'comprado' : '';
      li.innerHTML = `
        <span>${p.nombre}</span>
        <div class="botones">     
          <button onclick="toggle(${i})">✅</button>
          <button onclick="eliminar(${i})">❌</button>
        </div>
      `;
      lista.appendChild(li);
    });
  }

  function guardar() {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  window.toggle = (index) => {
    productos[index].comprado = !productos[index].comprado;
    guardar();
    render();
  };

  window.eliminar = (index) => {
    productos.splice(index, 1);
    guardar();
    render();
  };

  // Cambio de tema
  toggleThemeButton.addEventListener('click', () => {
    const body = document.body;
    const container = document.querySelector('.container');
    if (body.classList.contains('light-mode')) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      container.classList.remove('light-mode');
      container.classList.add('dark-mode');
      toggleThemeButton.textContent = '🌞';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      container.classList.remove('dark-mode');
      container.classList.add('light-mode');
      toggleThemeButton.textContent = '🌑';
      localStorage.setItem('theme', 'light');
    }
  });

  // Cargar el tema guardado
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    document.querySelector('.container').classList.add('dark-mode');
    document.querySelector('.container').classList.remove('light-mode');
    toggleThemeButton.textContent = '🌞';
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    document.querySelector('.container').classList.add('light-mode');
    document.querySelector('.container').classList.remove('dark-mode');
    toggleThemeButton.textContent = '🌑';
  }
});

// Crear contenedor de confirmación animado
const confirmacionDiv = document.createElement("div");
confirmacionDiv.style.display = "none";
confirmacionDiv.style.position = "fixed";
confirmacionDiv.style.top = "50%";
confirmacionDiv.style.left = "50%";
confirmacionDiv.style.transform = "translate(-50%, -50%)";
confirmacionDiv.style.background = "white";
confirmacionDiv.style.padding = "2rem";
confirmacionDiv.style.borderRadius = "1rem";
confirmacionDiv.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
confirmacionDiv.style.zIndex = "1000";
confirmacionDiv.style.textAlign = "center";
confirmacionDiv.style.animation = "fadeInScale 0.3s ease";
const tema = localStorage.getItem('theme');
if (tema === 'dark') {
  confirmacionDiv.style.background = '#333';
  confirmacionDiv.style.color = 'white';
} else {
  confirmacionDiv.style.background = 'white';
  confirmacionDiv.style.color = 'black';
}
confirmacionDiv.innerHTML = `
  <p style="font-size:1.2rem; margin-bottom: 1rem;">¿Seguro que quieres <strong>vaciar la lista</strong>? Esta acción no se puede deshacer.</p>
  <button id="confirmarVaciar" style="margin-right: 1rem; padding: 0.5rem 1rem; background:#dc3545; color:white; border:none; border-radius:0.5rem;">Sí, vaciar</button>
  <button id="cancelarVaciar" style="padding: 0.5rem 1rem; background:#6c757d; color:white; border:none; border-radius:0.5rem;">Cancelar</button>
`;
document.body.appendChild(confirmacionDiv);

// Mostrar mensaje animado
const mostrarConfirmacionVaciar = () => {
  confirmacionDiv.style.display = "block";
};

document.getElementById("confirmarVaciar").onclick = () => {
  lista.innerHTML = "";
  productos = []; // borrar array en memoria
  localStorage.setItem("productos", JSON.stringify(productos)); // guardar correctamente
  confirmacionDiv.style.display = "none";

  // Mensaje animado de éxito (opcional)
  const msg = document.createElement('div');
  msg.textContent = '🧹 Lista vaciada con éxito!';
  msg.style.position = 'fixed';
  msg.style.bottom = '1rem';
  msg.style.left = '50%';
  msg.style.transform = 'translateX(-50%)';
  msg.style.background = '#28a745';
  msg.style.color = 'white';
  msg.style.padding = '0.7rem 1.2rem';
  msg.style.borderRadius = '0.5rem';
  msg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
  msg.style.zIndex = 9999;
  msg.style.opacity = '1';
  msg.style.transition = 'opacity 0.5s ease';

  document.body.appendChild(msg);
  setTimeout(() => {
    msg.style.opacity = '0';
    setTimeout(() => document.body.removeChild(msg), 500);
  }, 2000);
};

document.getElementById("cancelarVaciar").onclick = () => {
  confirmacionDiv.style.display = "none";
};

// Botón de vaciar
const vaciarBtn = document.createElement("button");
vaciarBtn.textContent = "Vaciar lista 🗑️";
vaciarBtn.style.marginTop = "1rem";
vaciarBtn.style.width = "100%";
vaciarBtn.onclick = mostrarConfirmacionVaciar;
document.querySelector(".container").appendChild(vaciarBtn);

