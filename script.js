const form1 = document.getElementById('form_');
const bill = document.getElementById('bill');
const people = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const totalCost = document.getElementById('total-cost');
const custom = document.getElementById('custom');
const tip = document.getElementsByName('radio-btn');
const button = document.getElementById('reset-btn');


form1.addEventListener('submit', (e) => {
   if (!e.target.checkValidity()){
       e.preventDefault();
       e.stopImmediatePropagation();
   }
});

form1.addEventListener('input', () => {
    updateResetButton();
    updateTotals();
});

custom.addEventListener('input', () => {
    if (custom.validity.valid){
        custom.style.border = '2px solid hsl(172, 67%, 45%)';
    }else {
        custom.style.border = '2px solid rgb(237, 109, 109)';
    }

    updateTotals();
});

custom.addEventListener('click', () => {
    uncheckTipButtons();
});

tip.forEach(button => {
    button.addEventListener('input', () => {
        updateTotals();
    })
});

function updateResetButton() {
    button.style.opacity = bill.value && people.value ? '1' : '0.3';
    button.style.cursor = bill.value && people.value ? 'pointer' : 'not-allowed';
    button.removeAttribute('disabled');
}

function uncheckTipButtons() {
    tip.forEach(button => {
        button.checked = false;
    })
}

function updateTotals() {
    const billValue = parseFloat(bill.value);
    const peopleValue = parseFloat(people.value);

    if (isNaN(billValue) || isNaN(peopleValue) || peopleValue === 0) {
        tipAmount.textContent = '0.00';
        totalCost.textContent = '0.00';
        return;
    }

    const selectedTipButton = Array.from(tip).find(button => button.checked);
    const tipPercentage = selectedTipButton ? parseFloat(selectedTipButton.value) / 100 : parseFloat(custom.value) / 100;

    const tipAmountValue = billValue * tipPercentage / peopleValue;
    const totalCostValue = billValue / peopleValue + tipAmountValue;

    tipAmount.textContent = tipAmountValue.toFixed(2);
    totalCost.textContent = totalCostValue.toFixed(2);
}








