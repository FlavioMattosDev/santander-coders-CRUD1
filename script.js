class Game {
	constructor(name, price, date, hours, category) {
		this._name = name;
		this._price = price;
		this._date = date;
		this._hours = hours;
		this._category = category;
		this._completed = false;
	}

	get name() {
		return this._name;
	}

	set name(newName) {
		this._name = newName;
	}

	get price() {
		return this._price;
	}

	set price(newPrice) {
		this._price = newPrice;
	}

	get date() {
		return this._date;
	}

	set date(newDate) {
		this._date = newDate;
	}

	get hours() {
		return this._hours;
	}

	set hours(newHours) {
		this._hours = newHours;
	}

	get category() {
		return this._category;
	}

	set category(newCategory) {
		this._category = newCategory;
	}

	get completed() {
		return this._completed;
	}

	set completed(value) {
		this._completed = value;
	}

	formattedDate() {
		const dateObj = new Date(this._date);
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Mês é base 0, por isso +1.
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`;
	}

	formattedHours() {
		const hours = Math.floor(this._hours / 60);
		const minutes = this._hours % 60;
		let formattedTime = '';

		if (hours > 0) {
			formattedTime += hours + 'h';
		}

		if (minutes > 0) {
			formattedTime += ' ' + minutes + 'min';
		}

		return formattedTime;
	}

	toggleCompleted() {
		this._completed = !this._completed;
	}
}

Game.prototype.getFormattedPrice = function () {
	return `R$ ${this._price.toFixed(2)}`;
};
console.log(myGame.getFormattedPrice());

class GameTracker {
	constructor() {
		this._gameList = [];
		this._filterCompleted = false;
		this._currentCategory = 'all';
	}

	toggleFilterCompleted() {
		this._filterCompleted = !this._filterCompleted;
		this.displayGames();
	}

	addGame() {
		const gameNameInput = document.getElementById('nomeJogo');
		const gamePriceInput = document.getElementById('precoJogo');
		const gameDateInput = document.getElementById('dataJogo');
		const gameHoursInput = document.getElementById('horasJogo');
		const gameCategorySelect = document.getElementById('categoriaJogo');

		const gameName = gameNameInput.value;
		const gamePrice = parseFloat(gamePriceInput.value);
		const gameDate = gameDateInput.value;
		const gameHours = parseFloat(gameHoursInput.value);
		const gameCategory = gameCategorySelect.value;

		if (
			gameName &&
			!isNaN(gamePrice) &&
			gameDate &&
			!isNaN(gameHours) &&
			gameCategory
		) {
			const game = new Game(
				gameName,
				gamePrice,
				gameDate,
				gameHours,
				gameCategory
			);
			this._gameList.push(game);

			gameNameInput.value = '';
			gamePriceInput.value = '';
			gameDateInput.value = '';
			gameHoursInput.value = '';
			gameCategorySelect.value = '';

			this.displayGames();
		} else {
			alert('Por favor, preencha todos os campos corretamente.');
		}
	}

	applyCategoryFilter() {
		const categoryFilterSelect = document.getElementById('categoryFilter');
		this._currentCategory = categoryFilterSelect.value;
		this.displayGames();
	}

	displayGames() {
		const gameTableBody = document.querySelector('table tbody');
		gameTableBody.innerHTML = '';

		this._gameList.forEach((game, index) => {
			if (
				(this._filterCompleted && !game.completed) ||
				(this._currentCategory !== 'all' &&
					game.category !== this._currentCategory)
			) {
				return;
			}

			const newRow = gameTableBody.insertRow();
			newRow.innerHTML = `
               <td class="center">${index + 1}</td>
               <td>${
						game.completed ? '<s>' + game.name + '</s>' : game.name
					}</td>
               <td>R$: ${game.price.toFixed(2)}</td>
               <td>${game.formattedDate()}</td>
               <td>${game.formattedHours()}</td>
               <td>${game.category}</td>
               <td class="center">
               <button onclick="tracker.editGame(${index})">Editar</button>
               <button onclick="tracker.deleteGame(${index})">Deletar</button>
               <button onclick="tracker.toggleCompleted(${index})">${
				game.completed ? 'Desfazer' : 'Rabiscar'
			}</button>
           </td>
           `;
		});
	}

	editGame(index) {
		const newName = prompt('Novo nome do jogo:');
		const newPrice = parseFloat(prompt('Novo preço do jogo:'));
		const newDate = prompt('Nova data do jogo:');
		const newHours = parseFloat(prompt('Novas horas para finalizar:'));
		const newCategory = prompt('Nova categoria do jogo:');

		if (
			newName &&
			!isNaN(newPrice) &&
			newDate &&
			!isNaN(newHours) &&
			newCategory
		) {
			this._gameList[index].name = newName;
			this._gameList[index].price = newPrice;
			this._gameList[index].date = newDate;
			this._gameList[index].hours = newHours;
			this._gameList[index].category = newCategory;

			this.displayGames();
		} else {
			alert('Por favor, preencha todos os campos corretamente.');
		}
	}

	deleteGame(index) {
		this._gameList.splice(index, 1);
		this.displayGames();
	}

	toggleCompleted(index) {
		this._gameList[index].toggleCompleted();
		this.displayGames();
	}
}

const tracker = new GameTracker();

const applyFilterButton = document.getElementById('applyFilter');
applyFilterButton.addEventListener('click', () => {
	tracker.applyCategoryFilter();
});

const addGameButton = document.querySelector('button');
addGameButton.addEventListener('click', () => {
	tracker.addGame();
});

const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', () => {
	tracker.toggleFilterCompleted();
});

const gameNameInput = document.getElementById('nomeJogo');
const gamePriceInput = document.getElementById('precoJogo');
const gameDateInput = document.getElementById('dataJogo');
const gameHoursInput = document.getElementById('horasJogo');

gameNameInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		tracker.addGame();
	}
});

tracker.displayGames();
