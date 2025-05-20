const baseUrl = 'http://localhost:5000/cases';

document.getElementById('caseForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    company: document.getElementById('company').value,
    model: document.getElementById('model').value,
    price: parseFloat(document.getElementById('price').value),
    color: document.getElementById('color').value,
  };

  await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  loadCases();
});

async function loadCases() {
  const res = await fetch(baseUrl);
  const cases = await res.json();
  const list = document.getElementById('caseList');
  list.innerHTML = '';

  cases.forEach(c => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${c.company} ${c.model}</strong> - $${c.price} - ${c.color}
      <button onclick="deleteCase('${c._id}')">Delete</button>
    `;
    list.appendChild(item);
  });
}

async function deleteCase(id) {
  await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
  loadCases();
}

loadCases();
