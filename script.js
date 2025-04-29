document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista');
  const form = document.getElementById('form');
  const input = document.getElementById('producto');
  const toggleThemeButton = document.getElementById('toggle-theme');
  const contador = document.getElementById('contador');
  let productos = JSON.parse(localStorage.getItem('productos')) || [];

  render();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombre = input.value.trim();
    if (nombre) {
      nombre = capitalizarPrimeraLetra(nombre);
      productos.push({ nombre, comprado: false });
      input.value = '';
      guardar();
      render();
    }
  });

  function render() {
    lista.innerHTML = '';
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

    actualizarContador();
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
  }

  window.eliminar = (index) => {
    productos.splice(index, 1);
    guardar();
    render();
  }

  function actualizarContador(){
    const comprados = productos.filter(p => p.comprado).length;
    contador.textContent = `${comprados} de ${productos.length} productos comprados`;
  }

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
