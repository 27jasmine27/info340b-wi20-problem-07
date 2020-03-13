'use strict';

// import { getRecentTweets } from "./Model";

export function printTweets(tweetArray) {
	if (tweetArray.length == 0) {
		console.log("No tweets found");
	}
	for(let tweetItem of tweetArray) {
		let text = tweetItem.text;
		let time = new Date(tweetItem.timestamp).toLocaleString("en-US");
		console.log("-",'"'+text+'"', "("+time+")");
	}
}
