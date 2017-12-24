module.exports = {
	"env": {
		"node": true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
	],
	"rules": {
		"no-unused-vars": [
			"error",
			{
				"vars": "all",
				"args": "none",
			},
		],
		"quotes": [
			"error",
			"single",
		],
	},
}
