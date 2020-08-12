import './style.scss';

export default class Select {
	constructor(selector, options) {
		this.$select = document.querySelector(selector);
		this.options = options;

		this.isOpen = false;
		this.#init();
	}

	#render() {
		const {placeholder, data, selectedId} = this.options;
		this.$select.classList.add('select');
		this.$select.innerHTML = this.getTemplate(data, placeholder, selectedId);
		this.$arrow = this.$select.querySelector('[data-type = "arrow"]');
		this.$value = this.$select.querySelector('[data-type = "value"]');
	}

	#setup() {
		this.clickHandler = this.clickHandler.bind(this);
		this.$select.addEventListener('click', this.clickHandler);
		// document.addEventListener('click', this.clickHandler);
	}

	#init() {
		console.log('Select is init');
		this.#render();
		this.#setup();
	}

	clickHandler(e) {
		switch (e.target.dataset.type) {
			case 'arrow':
			case 'input':
				return this.isOpen ? this.close() : this.open();
			case 'item':
				const id = e.target.dataset.id;
				return this.select(id);
			case 'backdrop':
				this.close();
		}
	}

	select(id) {
		this.selectId = id;
		this.$value.textContent = this.curent.name;
		this.$select
			.querySelectorAll(`[data-type = "item"]`)
			.forEach((el) => el.classList.remove('selected'));

		this.$select.querySelector(`[data-id = "${id}"]`).classList.add('selected');
		this.close();
	}

	get curent() {
		return this.options.data.find((el) => el.id === this.selectId);
	}

	open() {
		this.isOpen = true;
		this.$select.classList.add('open');
		this.$arrow.classList.remove('fa-chevron-down');
		this.$arrow.classList.add('fa-chevron-up');
	}

	close() {
		this.isOpen = false;
		this.$select.classList.remove('open');
		this.$arrow.classList.remove('fa-chevron-up');
		this.$arrow.classList.add('fa-chevron-down');
	}

	getTemplate(data, placeholder, selectedId) {
		let text = placeholder ?? 'Placeholder default';

		const items = data.map((el) => {
			let cls = '';

			if (selectedId === el.id) {
				text = el.name;
				cls = 'selected';
			}
			return `
			    <li class="select__item ${cls}" data-type = "item" data-id = "${el.id}">${el.name}</li>
			`;
		});
		return `
		<div class = "select__backdrop" data-type = "backdrop"></div>
        <div class="select__input" data-type='input'>
			<span data-type="value">${text}</span>
			<i class="fas fa-chevron-down" data-type = "arrow"></i>
		</div>
		<div class="select__dropdown">
			<ul class="select__list">
			${items.join('')}
			</ul>
		</div>
        `;
	}

	destroy() {
		this.$select.removeEventListener('click', this.clickHandler);
		this.$select.innerHTML = '';
	}
}
