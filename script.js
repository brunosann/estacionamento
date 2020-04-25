const s = (el) => document.querySelector(el);
const ss = (el) => document.querySelectorAll(el);

const lista = s('ul');
let carros = [];

// adicionando carro
const botaoAdd = s('.add_btn');
botaoAdd.addEventListener('click', adicionar);

function adicionar(e) {
	e.preventDefault();
	verificarCampo();
	const carro = s('#carro');
	const placa = s('#placa');
	if(!carro.value == '' && !placa.value == '') {
		const d = new Date;
		const hora = Date.parse(d);
		carros.push({modelo: carro.value, placa: placa.value, data: hora});
		carro.value = '';
		placa.value = '';
		listagem();
	} 
	else {
		alert('Preencha os dados!!!');
	}
};

//listando carros
function listagem() {
	const lista = s('ul');
	const li = document.createElement('li');

	carros.forEach((carro) => {
		const liCarro = `<span>${carro.modelo}</span>`;
		const liPlaca = `<span>${carro.placa}</span>`;
		const liHorario = `<span>${converterMs(carro.data)}</span>`;
		const liBtn = `<button class="del_btn">Saida</button>`
		li.innerHTML = liCarro + liPlaca + liHorario + liBtn;
		lista.append(li);
	});

	//removendo carro
	const botaoDel = ss('.del_btn');

	botaoDel.forEach((item) => {
		item.addEventListener('click', (carro) => {
			const placa = carro.target.previousSibling.previousSibling.innerText;
			carros = carros.filter((carro) => {
				return carro.placa !== placa;
			})
			lista.innerHTML = '';
			listagem();
		});
	});
};

//convertendo timestamp
function converterMs(ms) {
	const horas = `0${new Date(ms).getHours() }`.slice(-2);
	const minutos = `0${new Date(ms).getMinutes()}`.slice(-2);

	return  `${horas}:${minutos}`;
}

//verificar campo vazio e mostar(borda vermelha)
function verificarCampo() {
	const carro = ss('input');
	carro.forEach((item) => {
		item.addEventListener('focusout', verificar);
	});

	function verificar() {
		if(!this.value) {
			this.style.border = '1px solid #e54';
		} else {
			this.style.border = 'none'
		}
	};
}