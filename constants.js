import Discord from 'discord.js';

export const START_USING_BOT = 'tsbot';

export const BotHelp = {
	userInput: `${START_USING_BOT}`,
	botReply: new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('指令表')
		.setDescription(
			'所有指令都是 tsbot 開頭\n英文不分大小寫\n需要分段都是以半形空格為主\n'
		)
		.setImage('https://i.imgur.com/m5BanH6.jpg')
		.addField(
			'—\n抽籤功能',
			'tsbot 抽 *題目* *選項1* *選項2* *選項3*...（最多 10 個選項，用半形空格分開）'
		)
		.addField(
			'—\n投票功能',
			'tsbot 投 *題目* *選項1* *選項2* *選項3*...（最多 10 個選項，用半形空格分開）'
		),
};

export const BotError = {
	botReply: `沒有這個指令，輸入 ${BotHelp.userInput} 來查看指令`,
};

export const DrawLots = {
	keyWord: {
		userInput: `${START_USING_BOT} 抽`,
		botReply: `正確格式：tsbot 抽 *題目* *選項1* *選項2* *選項3*...（用半形空格分開）`,
	},
	onlyOneOption: {
		botReply: `只有一個選項也要抽？`,
	},
	noOption: {
		botReply: `選項勒？`,
	},
};

export const Vote = {
	keyWord: {
		userInput: `${START_USING_BOT} 投`,
		botReply: `正確格式：tsbot 投 *題目* *選項1* *選項2* *選項3*...（用半形空格分開）`,
	},
	onlyOneOption: {
		botReply: `只有一個選項投三小？`,
	},
	noOption: {
		botReply: `選項勒？`,
	},
};
