const taxRates = {
    'FL': {
        'Orlando': 0.065,
        'Miami': 0.07,
        'Tampa': 0.075,
        'Jacksonville': 0.07
    },
    'CA': {
        'Los Angeles': 0.095,
        'San Francisco': 0.0875,
        'San Diego': 0.0775,
        'Sacramento': 0.085
    },
    'TX': {
        'Houston': 0.0825,
        'Dallas': 0.0825,
        'Austin': 0.08,
        'San Antonio': 0.0825
    },
    'NY': {
        'New York City': 0.08875,
        'Buffalo': 0.0875,
        'Rochester': 0.0875,
        'Albany': 0.08
    },
    'IL': {
        'Chicago': 0.1025,
        'Springfield': 0.0875,
        'Naperville': 0.075,
        'Peoria': 0.08
    },
    'NV': {
        'Las Vegas': 0.085,
        'Reno': 0.085,
        'Henderson': 0.08,
        'Carson City': 0.075
    }
    // Adicione mais estados e cidades conforme necessário
};

document.getElementById('state').addEventListener('change', function () {
    const state = this.value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Selecione a cidade</option>';
    
    if (state && taxRates[state]) {
        Object.keys(taxRates[state]).forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.text = city;
            citySelect.appendChild(option);
        });
    }
});

document.getElementById('taxForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const purchaseAmount = parseFloat(document.getElementById('purchaseAmount').value);
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const discountPercent = parseFloat(document.getElementById('discount').value);
    const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);
    
    if (!state || !city || !taxRates[state][city]) {
        document.getElementById('result').innerText = 'Por favor, selecione um estado e uma cidade válidos.';
        return;
    }
    
    const taxRate = taxRates[state][city];
    const taxAmount = purchaseAmount * taxRate;
    const totalAmountBeforeDiscount = purchaseAmount + taxAmount;
    
    const discountAmount = totalAmountBeforeDiscount * (discountPercent / 100);
    const totalAmountAfterDiscount = totalAmountBeforeDiscount - discountAmount;
    
    const totalInBRLBeforeDiscount = totalAmountBeforeDiscount * exchangeRate;
    const totalInBRLAfterDiscount = totalAmountAfterDiscount * exchangeRate;
    
    document.getElementById('result').innerHTML = `
        <p>Total sem desconto em dólares: $${totalAmountBeforeDiscount.toFixed(2)}</p>
        <p>Total sem desconto em reais: R$ ${totalInBRLBeforeDiscount.toFixed(2)}</p>
        <p>Total com desconto em dólares: $${totalAmountAfterDiscount.toFixed(2)}</p>
        <p>Total com desconto em reais: R$ ${totalInBRLAfterDiscount.toFixed(2)}</p>
    `;
});

