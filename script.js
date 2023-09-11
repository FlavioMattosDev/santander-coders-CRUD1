class Product {
	constructor(name, price) {
		this._name = name;
		this._price = price;
	}

	displayDetails() {
		return `${this._name} - R$ ${this._price.toFixed(2)}`;
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

	// static createFromObject(obj) {
	// 	return new Product(obj.name, obj.price);
	// }
}

class ProductCatalog {
	constructor() {
		this._productList = [];
	}

	addProduct() {
		const productNameInput = document.getElementById('produto');
		const productValueInput = document.getElementById('valor');

		const productName = productNameInput.value;
		const productValue = parseFloat(productValueInput.value);

		if (productName && !isNaN(productValue)) {
			const product = new Product(productName, productValue);
			this._productList.push(product);

			productNameInput.value = '';
			productValueInput.value = '';

			this.displayProducts();
		} else {
			alert('Por favor, preencha os campos corretamente.');
		}
	}

	displayProducts() {
		const productTableBody = document.querySelector('table tbody');
		productTableBody.innerHTML = '';

		this._productList.forEach((product, index) => {
			const newRow = productTableBody.insertRow();
			newRow.innerHTML = `
               <td class="center">${index + 1}</td>
               <td>${product.name}</td>
               <td>R$: ${product.price.toFixed(2)}</td>
               <td class="center">
               <button onclick="catalog.editProduct(${index})">Editar</button>
               <button onclick="catalog.deleteProduct(${index})">Deletar</button>
           </td>
           `;
		});
	}

	editProduct(index) {
		const newName = prompt('Novo nome do produto:');
		const newPrice = parseFloat(prompt('Novo preço do produto:'));

		if (newName && !isNaN(newPrice)) {
			this._productList[index].name = newName;
			this._productList[index].price = newPrice;

			this.displayProducts();
		} else {
			alert('Por favor, preencha os campos corretamente.');
		}
	}

	deleteProduct(index) {
		this._productList.splice(index, 1);

		this.displayProducts();
	}
}

const catalog = new ProductCatalog();

const addProductButton = document.querySelector('button');
addProductButton.addEventListener('click', () => {
	catalog.addProduct();
});

catalog.displayProducts();
