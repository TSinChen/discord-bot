import Discord from 'discord.js';
import dayjs from 'dayjs';
import dotenv from 'dotenv';

import * as constants from './constants.js';
import { isStartWith } from './utils.js';
import BAN_LIST from './banList.js';

dotenv.config();
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
	const message = msg.content;
	const messageToSwitch = msg.content.toLowerCase();
	console.log(
		`${dayjs(msg.createdAt).format('MM-DD HH:mm')} ${
			msg.author.username
		} 說 ${msg.content}`
	);
	try {
		if (!isStartWith(messageToSwitch, constants.START_USING_BOT)) return;
		if (!msg.author) return;
		if (msg.author.bot) return;
	} catch (error) {
		console.log(error);
	}
	switch (true) {
		case BAN_LIST.find((tag) => tag === msg.author.discriminator): {
			msg.channel.send('==');
			break;
		}
		// HELP
		case messageToSwitch === constants.BotHelp.userInput:
			msg.channel.send(constants.BotHelp.botReply);
			break;
		// 抽籤
		case messageToSwitch === constants.DrawLots.keyWord.userInput:
			msg.channel.send(constants.DrawLots.keyWord.botReply);
			break;
		case isStartWith(messageToSwitch, constants.DrawLots.keyWord.userInput):
			const drawingTopic = message.split(' ')[2];
			const drawingOptions = message
				.split(' ')
				.splice(3, 10)
				.filter((option) => option.length);
			const random = Math.floor(Math.random() * drawingOptions.length);
			if (drawingOptions.length === 1) {
				msg.channel.send(constants.DrawLots.onlyOneOption.botReply);
			} else if (drawingOptions.length) {
				msg.channel.send(
					`**${drawingTopic}**\n中獎者是 **${drawingOptions[random]}**`
				);
			} else {
				msg.channel.send(constants.DrawLots.noOption.botReply);
			}
			break;
		// 投票
		case messageToSwitch === constants.Vote.keyWord.userInput:
			msg.channel.send(constants.Vote.keyWord.botReply);
			break;
		case isStartWith(messageToSwitch, constants.Vote.keyWord.userInput):
			const votingTopic = message.split(' ')[2];
			const votingOptions = message
				.split(' ')
				.splice(3, 10)
				.filter((option) => option.length);
			if (!votingOptions.length) {
				msg.channel.send(constants.Vote.noOption.botReply);
			} else if (votingOptions.length === 1) {
				msg.channel.send(constants.Vote.onlyOneOption.botReply);
			} else if (votingOptions.length) {
				let optionsTexts = `**${votingTopic}**`;
				votingOptions.forEach((option, index) => {
					optionsTexts += `\n選項 ${index + 1}：${option}`;
				});
				optionsTexts += `\n點擊選項代碼以投票`;
				msg.channel.send(optionsTexts).then((botMessage) => {
					votingOptions.forEach((_, index) => {
						if (index === 9) {
							botMessage.react('\u{1F51F}');
						} else {
							botMessage.react(
								(index + 1).toString() + '\uFE0F\u20E3'
							);
						}
					});
				});
			}
			break;
		default:
			msg.channel.send(constants.BotError.botReply);
			return;
	}
});
