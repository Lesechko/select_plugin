import Select from './select/select';

const select = new Select('#select', {
	placeholder: 'Выберите опцию',
	selectedId: '1',
	data: [
		{id: '1', name: 'React'},
		{id: '2', name: 'Vue'},
		{id: '3', name: 'Angular'},
		{id: '4', name: 'React Native'},
		{id: '5', name: 'Next'},
		{id: '6', name: 'Nest'},
	],
});
