function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function q1() {
    let INDICE = 13;
    let SOMA = 0;
    let K = 0;

    while (K < INDICE) {
        K = K + 1;
        SOMA = SOMA + K;
    }

    document.getElementById('q1').value = SOMA
    console.log(SOMA);
}


function verificarFibonacci() {
    const numeroInformado = parseInt(document.getElementById('nFibonacci').value);
    const resFibonacci = document.getElementById('resultadoFibonacci');
    let fibonacci = [0, 1];

    while (fibonacci[fibonacci.length - 1] < numeroInformado) {
        fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
    }

    if (fibonacci.includes(numeroInformado)) {
        resFibonacci.innerText = `${numeroInformado} pertence à sequência de Fibonacci.`;
        resFibonacci.style.color = 'green'
    } else {
        resFibonacci.innerText = `${numeroInformado} não pertence à sequência de Fibonacci.`;
        resFibonacci.style.color = 'red'

    }
}

function consumirJSON() {

    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            var valorMinimo = Infinity;
            var valorMaximo = -Infinity;
            var totalMensal = 0;
            let maiorDia;
            let menorDia;

            data.forEach(item => {
                totalMensal += item.valor;
                if (item.valor > 0) {
                    if (item.valor < valorMinimo) {
                        valorMinimo = item.valor;
                        menorDia = item.dia;
                    }
                }
                if (item.valor > valorMaximo) {
                    valorMaximo = item.valor;
                    maiorDia = item.dia;
                }
            });

            //inserindo valores no html
            document.getElementById('minDia').innerText = menorDia;
            document.getElementById('minValor').innerText = new Intl.NumberFormat('pt-BR').format(valorMinimo);

            document.getElementById('maxDia').innerText = maiorDia;
            document.getElementById('maxValor').innerText = new Intl.NumberFormat('pt-BR').format(valorMaximo);


            var mediaMensal = totalMensal / data.length;

            var diasAcimaDaMedia = data.filter(item => item.valor > mediaMensal).length;
            console.log('med dias acima: ' + diasAcimaDaMedia)

            document.getElementById('med').innerText = diasAcimaDaMedia


            var ctx = document.getElementById('g1').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.dia),
                    datasets: [{
                        label: 'Faturamento Diário',
                        data: data.map(item => item.valor),
                        backgroundColor: [getRandomColor()]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: value => 'R$' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                var dia = data.labels[tooltipItem.index];
                                var valor = data.datasets[0].data[tooltipItem.index];
                                var mensagem = "Dia " + dia + ": R$" + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                                if (valor === valorMinimo) {
                                    mensagem += " (valor mínimo)";
                                } else if (valor === valorMaximo) {
                                    mensagem += " (valor máximo)";
                                }
                                return mensagem;
                            }
                        }
                    }
                }
            });
        });
}

function representarPercentual() {
    const dados = {
        "SP": 67836.43,
        "RJ": 36678.66,
        "MG": 29229.88,
        "ES": 27165.48,
        "Outros": 19849.53
    };


    const valorTotal = Object.values(dados).reduce((acumulador, valor) => acumulador + valor);


    const estadosPorcentagem = Object.entries(dados).map(([estado, valor]) => {
        const porcentagem = ((valor / valorTotal) * 100).toFixed(2) + '%';
        return { estado, porcentagem };
    });


    const listaEstados = document.getElementById('estados');

    estadosPorcentagem.forEach(({ estado, porcentagem }) => {
        const itemLista = document.querySelector('li');
        itemLista.innerText = `${estado} - ${porcentagem}`;
        listaEstados.appendChild(itemLista);
    });


    const ctx = document.getElementById('g2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: estadosPorcentagem.map(({ estado }) => estado),
            datasets: [{
                data: estadosPorcentagem.map(({ porcentagem }) => porcentagem.replace('%', '')),
                backgroundColor: [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()],
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const value = context.parsed || 0;
                            const formattedValue = `${value.toFixed(2)}%`;
                            return `${label}: ${formattedValue}`;
                        }
                    }
                }
            }
        }
    });

}

function InverterString() {
    let input = document.getElementById('stringInverter').value;
    let output = "";

    for (let i = input.length - 1; i >= 0; i--) {
        output += input[i];
    }

    document.getElementById('resultadoInverte').innerText = output;
}

representarPercentual()
consumirJSON()
q1();
document.getElementById('btnFib').addEventListener('click', verificarFibonacci);
document.getElementById('btnInverte').addEventListener('click', InverterString);
