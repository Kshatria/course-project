module.exports = {
	root: true,
	env: { browser: true, es2022: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	settings: {
		react: { version: '18.2' },
		'import/resolver': {
			typescript: {}, // Для корректного разрешения алиасов (@/)
		},
	},
	rules: {
		'react/react-in-jsx-scope': 'off', // Не требуется в React 17+
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
	},
}
