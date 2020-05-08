const s = (el) => document.querySelector(el);
const ss = (el) => document.querySelectorAll(el);

const lista = s('ul');
let carros = [];
if (localStorage.carros) {
	carros = JSON.parse(localStorage.carros);
	listagem();
}

// adicionando carro
const botaoAdd = s('.add_btn');
botaoAdd.addEventListener('click', adicionar);

function adicionar(e) {
	e.preventDefault();
	verificarCampo();
	const carro = s('#carro');
	const placa = s('#placa');
	if (!carro.value == '' && !placa.value == '') {
		const d = new Date;
		const hora = Date.parse(d);
		carros.push({ modelo: carro.value, placa: placa.value, data: hora });
		carro.value = '';
		placa.value = '';
		localStorage.carros = JSON.stringify(carros);
		listagem();
	}
	else {
		alert('Preencha os dados!!!');
	}
};

//listando carros
function listagem() {
	lista.innerHTML = '';
	carros.forEach(carro => {
		const li = document.createElement('li');
		li.innerHTML = `
		<span>${carro.modelo}</span>
		<span data-placa>${carro.placa}</span>
		<span>${converterMs(carro.data)}</span>
		<button class="del_btn" onclick="del(this)">Saida</button>
		`;
		lista.append(li);
	});
};

//removendo carro
function del(btn) {
	const placa = btn.parentElement.querySelector('[data-placa]').innerText;
	carros = carros.filter(carro => {
		if(carro.placa === placa) {
			hrEntrada = carro;
		}
		return carro.placa !== placa;
	});
	localStorage.carros = JSON.stringify(carros);
	listagem();
}

//convertendo timestamp
function converterMs(ms) {
	const horas = `0${new Date(ms).getHours()}`.slice(-2);
	const minutos = `0${new Date(ms).getMinutes()}`.slice(-2);

	return `${horas}:${minutos}`;
}

//verificar campo vazio e mostar(borda vermelha)
function verificarCampo() {
	const carro = ss('input');
	carro.forEach((item) => {
		item.addEventListener('focusout', verificar);
	});

	function verificar() {
		if (!this.value) {
			this.style.border = '1px solid #e54';
		} else {
			this.style.border = 'none'
		}
	};
}