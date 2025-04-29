document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista');
    const form = document.getElementById('form');
    const input = document.getElementById('producto');
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
  
    render();
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = input.value.trim();
      if (nombre) {
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
        li.innerHTML = `<span>${p.nombre}</span><button onclick="toggle(${i})">✅</button>`;
        lista.appendChild(li);
      });
    }
  
    window.toggle = (index) => {
      productos[index].comprado = !productos[index].comprado;
      guardar();
      render();
    }
  
    function guardar() {
      localStorage.setItem('productos', JSON.stringify(productos));
    }
  });
  