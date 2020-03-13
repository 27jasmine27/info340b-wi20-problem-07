'use strict';

import readline from 'readline-sync'; //get default thing, call it readline
import * as model from './Model';
import { printTweets } from './View';


export function runSearch() {
	console.log("Here are some tweets by @UW_iSchool");

	let recent = model.getRecentTweets();
	printTweets(recent);

	let input = readline.question("Search tweets, or EXIT to quit");
	if(input == "EXIT"){
		return;
	}

	let searchResults = model.searchTweets(input);
	printTweets(searchResults);
}

// export function getRecentTweets() {
// 	let recent = model.getRecentTweets();
// 	printTweets(recent);

// 	let input = readline.question("Search tweets, or EXIT to quit");
// 	let searchResults = model.searchTweets(input);
// 	printTweets(searchResults);
// }

// }

// getRecentTweets();