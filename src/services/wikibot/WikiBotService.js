import request from '../request'
import HDE from '../../plugin'

export default class Wikibot {
  static translationTypes = {
    SUCCESS: 'успешный ответ',
    FALLBACK: 'альтернативная генерация ответа',
    NO_ANSWER: 'Wikibot не дал ответ.',
    ERROR: 'Случилась внутренняя ошибка сервера.',
    GREETING: 'содержит только приветствие',
    OPERATOR: 'Без вас в этом вопросе не справлюсь.',
    SKIP: 'Wikibot не ответил на сообщение.',
    GRATITUDE: 'содержит только благодарность',
  }

  static successTypes = ['SUCCESS', 'FALLBACK', 'GREETING', 'GRATITUDE']

  static pollsId = []

  static clearPolls() {
    this.pollsId.forEach((id) => clearInterval(id))
  }

  static getAnswerAsync(requestId) {
    let attempts = 0

    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        this.pollsId.push(intervalId)
        const messageData = await this.getWebhookDataAnswer(
          'wikibot',
          requestId
        )
        const message = messageData?.data?.data

        if (message?.answer && this.successTypes.includes(message.type)) {
          this.clearPolls()
          resolve(message.answer)
        } else if (message?.type && !this.successTypes.includes(message.type)) {
          this.clearPolls()
          reject(this.translationTypes[message.type])
        }
        attempts++

        if (attempts > 12) {
          this.clearPolls()
          reject('Извините, по техническим причинам я не могу помочь Вам (')
        }
      }, 5000)
    })
  }

  static asc(query, chatId, messageId) {
    if (!query) throw new Error('Query undefined in wikibot asc.')

    const headers = {
      Authorization: '{{API_KEY}}',
    }

    return request(
      `https://api.wikibot.pro/api/bot/ask?query=${encodeURI(
        query
      )}&chatId=${chatId}&msgId=${messageId}`,
      { headers }
    )
  }

  static getWebhookDataAnswer(endpoint = 'wikibot', requestId) {
    return HDE.webhook({
      endpoint,
      value: requestId,
    })
  }
}
