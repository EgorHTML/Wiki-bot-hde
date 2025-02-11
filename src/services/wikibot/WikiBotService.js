import request from '../request'
import HDE from '../../plugin'

export default class Wikibot {
  static translationTypes = {
    SUCCESS: 'успешный ответ',
    FALLBACK: 'альтернативная генерация ответа',
    NO_ANSWER: 'нет ответа',
    ERROR: 'внутренняя ошибка сервера',
    GREETING: 'содержит только приветствие',
    OPERATOR: 'вызов оператора',
    SKIP: 'пропуск сообщения',
    GRATITUDE: 'содержит только благодарность',
  }

  static successTypes = ['SUCCESS', 'FALLBACK', 'GREETING', 'GRATITUDE']

  static getAnswerAsync() {
    let attempts = 0

    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        if (attempts > 3)
          reject('Извините, по техническим причинам я не могу помочь Вам (')

        const messageData = await this.getWebhookDataAnswer()
        const message = messageData?.data?.data

        if (message?.answer) {
          clearInterval(intervalId)
          resolve(message.data.data.answer)
        } else if (message?.type && !this.successTypes.includes(message.type)) {
          reject(this.translationTypes[message.type])
        }
        attempts++
      }, 11000)
    })
  }

  static asc(query, chatId = HDE.getState().ticketId) {
    if (isNaN(chatId))
      throw new Error('Chat id is not a number in wikibot asc.')
    if (!query) throw new Error('Query undefined in wikibot asc.')

    const headers = {
      Authorization: '{{API_KEY}}',
    }

    return request(
      `https://api.wikibot.pro/api/bot/ask?query=${encodeURI(
        query
      )}&chatId=${chatId}`,
      { headers }
    )
  }

  static getWebhookDataAnswer(endpoint = 'wikibot', value) {
    const ticketId = HDE.getState().ticketId

    return HDE.webhook({
      endpoint,
      value: value || ticketId + '',
    })
  }
}
