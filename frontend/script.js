const form = document.getElementById('form');
const list = document.getElementById('list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    one: document.getElementById('one').value,
    two: document.getElementById('two').value
  };

  const res = await fetch('http://localhost:5000/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    loadData(); // refresh list
    form.reset();
  } else {
    alert("Failed to submit data.");
  }
});

async function loadData() {
  const res = await fetch('http://localhost:5000/data');
  const entries = await res.json();
  list.innerHTML = '';
  entries.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `One: ${entry.one}, Two: ${entry.two}`;
    list.appendChild(li);
  });
}

loadData();
