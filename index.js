const { sample } = require('lodash')
const Alice = require('yandex-dialogs-sdk')
const alice = new Alice()

const users = [];

alice.command('', ctx => {
    if (users.includes(ctx.userId)) {
        return ctx.reply('Привет, я тебя помню!')
    }

    users.push(ctx.userId)
    fail = 0
    ctx.reply(`Добро пожаловать! Здесь собираются идеи для самых веселых, полезных и классных навыков, которые вы хотели бы видеть в Алисе. Рассказывайте, я вся внимание.`)
})

alice.command(/навык/i, ctx => {
    fail = 0
    ctx.reply(`${sample(['Принимается!', 'Спасибо!'])}! Идея интересная, ${sample(['я запомню', 'занесли в нашу базу'])}. Если есть еще идеи — я вас внимательно слушаю.`)
})

let fail = 0

alice.any(ctx => {
    fail += 1

    if (fail > 2) {
        return ctx.reply(
            ctx.replyBuilder
                .text(`Эх, не понимаем мы друг друга! Посмотрите пока на навыки!`)
                .addButton(
                    ctx.buttonBuilder
                        .text('Посмотреть на  навыки')
                        .url('https://dialogs.yandex.ru/store')
                        .get()
                )
                .get()
        )
    }

    ctx.reply(
        ctx.replyBuilder
            .text(`Нет, так не годится. Используйте в описании слово «навык» и опишите его хотя бы одной фразой из ста символов.`)
            .tts(`Нет, так не годится. Используйте в описании слово «н+авык» и опишите его хотя бы одной фразой из ста символов.`)
            .get()
    )
})

alice.listen('/', 3000)
