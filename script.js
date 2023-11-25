function calculate(className) {
    if (className === 'payment') {
        calculatePrincipal()
    } else if (className === 'principal') {
        calculatePayment()
    }
}
function calculatePrincipal() {
    try {
        const amount = document.getElementById('paymentSlider').value;
        const interestRate = document.getElementById('interestRate').value;
        const years = document.getElementById('term').value
        if (!interestRate) {
            return
        }
        const monthlyRate = interestRate / 1200
        const rateTerm = Math.pow((1 + monthlyRate), years * 12)
        const numerator = rateTerm - 1
        const denominator = monthlyRate * rateTerm
        const loanAmt = (amount * numerator) / denominator
        const dollarAmt = toDollars(loanAmt)
        for (var el of document.getElementsByClassName('principal')) {
            if (el.tagName === 'INPUT') {
                el.value = el.type === 'text' ? dollarAmt : loanAmt
            }
        }
        // document.getElementById('borrowAmount').innerText = toDollars(loanAmt);
    } catch (e) {
        console.error(e)
    }
}

function calculatePayment() {
    try {
        const principal = document.getElementById('principalSlider').value;
        const interestRate = document.getElementById('interestRate').value;
        const rate = interestRate / 1200
        const years = document.getElementById('term').value
        const rateTerm = Math.pow((1 + rate), years * 12)
        const numerator = rate * rateTerm
        const denominator = rateTerm - 1
        const payment = (principal * numerator) / denominator
        const dollarAmt = toDollars(payment)
        for (var el of document.getElementsByClassName('payment')) {
            if (el.tagName === 'INPUT') {
                el.value = el.type === 'text' ? dollarAmt : payment
            }
        }
    } catch (err) {
        console.error(err)
    }
}

function updateValue(className, srcId) {
    // console.log(`triggered from ${srcId}`)
    const srcVal = fromDollars(document.getElementById(srcId).value);
    const dollarVal = toDollars(srcVal)
    const inputElements = document.getElementsByClassName(className)
    for (let i in inputElements) {
        var el = inputElements[i]
        if (el.tagName === 'INPUT' && el.id !== srcId) {
            const value = el.classList.contains('text') ? dollarVal : srcVal
            // console.log(`setting value of ${el.id} to ${value}`)
            el.value = value
            // console.log(`now value is ${el.value}`)
        }
    }
    calculate(className)
}

function numToDollars(id) {
    const el = document.getElementById(id)
    el.value = toDollars(parseFloat(el.value))
}

function dollarsToNum(id) {
    const el = document.getElementById(id)
    el.value = parseFloat(fromDollars(el.value))
}

function updateSliderValue() {
    const sliderValue = document.getElementById('amount').value;
    document.getElementById('sliderValue').innerText = toDollars(sliderValue);
    calculate()
}

function toDollars(num) {
    var converted = parseFloat(num).toLocaleString('en-US', {
        style: 'currency',
        currency: 'CAD'
    })
    // console.log(`converting ${num} to ${converted}`)
    return converted
}

function fromDollars(dollarVal) {
    return dollarVal.replace(/[^0-9.-]+/g, '')
}