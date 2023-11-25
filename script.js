function calculate() {
    const amount = document.getElementById('amount').value;
    const interestRate = document.getElementById('interestRate').value;
    if (!interestRate) {
        return
    }
    const monthlyRate = interestRate / 1200
    const rateTerm = Math.pow((1 + monthlyRate), 25 * 12)
    const numerator = rateTerm - 1
    const denominator = monthlyRate * rateTerm
    const loanAmt = (amount * numerator) / denominator
    // Simple loan calculation formula (just for demonstration)
    // const monthlyPayment = amount * (interestRate / 1200) / (1 - Math.pow(1 + interestRate / 1200, -60)); // Assuming a 5-year loan term (60 months)
    // const borrowAmount = monthlyPayment * 60; // Total amount you can borrow over 5 years -->

    document.getElementById('borrowAmount').innerText = toDollars(loanAmt);
}

function updateSliderValue() {
    const sliderValue = document.getElementById('amount').value;
    document.getElementById('sliderValue').innerText = toDollars(sliderValue);
    calculate()
}

function toDollars(num) {
    num = num.toString()
    const splitVal = num.split('.')
    const left = splitVal[0].split('')
    var i = left.length - 1
    var numCt = 0
    var finalVal = ''
    while (i >= 0) {
        finalVal = left[i] + finalVal
        numCt += 1
        if (numCt === 3 && i !== 0) {
            numCt = 0
            finalVal = ',' + finalVal
        }
        i -= 1
    }
    if (splitVal.length == 2) {
        finalVal += '.' + splitVal[1].slice(0, 2)
    }
    return '$' + finalVal
}