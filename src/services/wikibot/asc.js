import request from '../request.js'
import HDE from '../../plugin'

export default function (query, authName, chatId = HDE.getState().ticketId) {
  console.log(chatId, 'chatId')
  if (isNaN(chatId)) throw new Error('Chat id is not a number in wikibot asc.')
  if (!query) throw new Error('query undefined in wikibot asc.')

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
