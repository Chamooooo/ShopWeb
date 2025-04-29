document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista');
  const form = document.getElementById('form');
  const input = document.getElementById('producto');
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
});
