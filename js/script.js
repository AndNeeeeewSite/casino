button = document.querySelector('.button-crutka')
num_1 = document.querySelector('.num-1')
num_2 = document.querySelector('.num-2')
num_3 = document.querySelector('.num-3')
promoOutputinput = document.querySelector('.promoOutputinput')
active = 0
balance = localStorage.getItem('balance')
balanceOutput = document.querySelector('.balanceOutput')
balanceOutput.textContent = 'Баланс: ' + balance
stavkaInput = document.querySelector('.stavkaOutputinput')
button.addEventListener('click',function(){
    if(active == 0){
        stavkaInput_now = stavkaInput.value
        stavkaInput_now = parseInt(stavkaInput_now)
        isNan = '' +  stavkaInput_now
        console.log(isNan)
        if(isNan == 'NaN'){
            
        }
        else{
            active = 1
            document.querySelector('.casino').style.outline = '10px solid rgb(211, 143, 18)'
            num1 = Math.floor(Math.random() * 10)
            num2 = Math.floor(Math.random() * 10)
            num3 = Math.floor(Math.random() * 10)
            delay = 100
            console.log(stavkaInput_now)
            if (balance < stavkaInput_now){
                active = 0
            }
            else{
                for (let i = 0; i < 11; i++) {
                    delay = delay + 20
                    setTimeout(() => {
                        num1_anim = Math.floor(Math.random() * 10)
                        num2_anim = Math.floor(Math.random() * 10)
                        num3_anim = Math.floor(Math.random() * 10)
                        num_1.textContent = num1_anim
                        num_2.textContent = num2_anim
                        num_3.textContent = num3_anim
                        if (i == 10){
                            if(num1 == num2 && num2 == num3){
                                num_1.textContent = num1
                                num_2.textContent = num2
                                num_3.textContent = num3
                                console.log('win')
                                document.querySelector('.casino').style.outline = '10px solid green'
                                balance = balance + (stavkaInput_now * 2)
                                localStorage.setItem('balance',balance)
                                balanceOutput.textContent = 'Баланс: ' + balance
                                setTimeout(function(){active = 0},"1000")
                            }
                            else{
                                num_1.textContent = num1
                                num_2.textContent = num2
                                num_3.textContent = num3
                                console.log('lose')
                                document.querySelector('.casino').style.outline = '10px solid red'
                                balance = balance - stavkaInput_now
                                localStorage.setItem('balance',balance)
                                balanceOutput.textContent = 'Баланс: ' + balance
                                setTimeout(function(){active = 0},"1000")
                            }
                        }
                    }, i * delay);

                        
                    }
            }
        }
    }
})

promos = ['imgay','pidor','sinmiagi','solnce','qwerty','123']

let usedPromos = JSON.parse(localStorage.getItem('usedPromos')) || [];

// Обновляем баланс, если уже есть сохраненное значение
let storedBalance = localStorage.getItem('balance');
if (storedBalance) {
    balance = parseInt(storedBalance);
    balanceOutput.textContent = 'Баланс: ' + balance;
}

document.querySelector('.promoCheck').addEventListener('click', function() {
    const promoOutputinput = document.querySelector('.promoOutputinput').value; // Замените на ваш селектор для ввода промо-кода
    let found = false; // Флаг для проверки, найден ли промо-код

    // Проверяем, использован ли уже этот промо-код
    if (usedPromos.includes(promoOutputinput)) {
        console.log('Этот промо-код уже использован');
        return; // Выход из функции, если код уже был использован
    }

    for (var i = 0; i < promos.length; i++) {
        if (promos[i] === promoOutputinput) {
            balance += 1000; // Увеличение баланса
            balanceOutput.textContent = 'Баланс: ' + balance; // Обновление текста на экране
            found = true; // Устанавливаем флаг в true, если промо-код найден

            // Добавляем использованный промо-код в список и сохраняем в localStorage
            usedPromos.push(promoOutputinput);
            localStorage.setItem('usedPromos', JSON.stringify(usedPromos));

            // Сохраняем обновленный баланс в localStorage
            localStorage.setItem('balance', balance);

            break; // Выход из цикла, если код найден
        }
    }

    if (!found) {
        console.log('Промо-код не найден'); // Лог, если код не найден
    }
});