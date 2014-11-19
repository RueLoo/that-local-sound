'use strict';
console.log('articles.client.config.js'+' loaded');

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Angular orderby: position takes code sequential positioning into account
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles2', 'articles');//last parameter is subitem.link
		Menus.addSubMenuItem('topbar', 'articles', 'New Article1', 'articles/create');//second to last is subitem.title
	}
]);
