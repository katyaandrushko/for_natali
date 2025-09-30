 const data = {
    leads: [],
    books: [],
    payments: []
  };

  function addValue(type) {
    const input = document.getElementById(`${type}-input`);
    const value = parseFloat(input.value);

    if (!isNaN(value)) {
      data[type].push(value);
      input.value = "";
      updateList(type);
    }
  }

  function removeValue(type, index) {
    data[type].splice(index, 1);
    updateList(type);
  }

  function updateList(type) {
    const list = document.getElementById(`${type}-list`);
    const totalDiv = document.getElementById(`${type}-total`);

    list.innerHTML = "";

    data[type].forEach((value, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${value}
        <button class="remove-btn" onclick="removeValue('${type}', ${index})">X</button>
      `;
      list.appendChild(li);
    });
    
    function removeAllPayments() {
      data.payments = [];
      updateList('payments');
    }

    document.getElementById('remove-all-payments-btn').addEventListener('click', removeAllPayments);


    const total = data[type].reduce((acc, val) => acc + val, 0);
    totalDiv.textContent = `Сума: ${total}`;
  }

  ['leads', 'books', 'payments'].forEach(type => {
    const input = document.getElementById(`${type}-input`);
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        addValue(type);
      }
    });
  });