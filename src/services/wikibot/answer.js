import HDE from '../../plugin'

export async function getAsyncAnswer() {
  let attempts = 0

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      if (attempts > 3)
        reject('Извините, по техническим причинам я не могу помочь Вам (')

      const message = await answer()
      console.log(message, 'message')

      if (message?.data?.data?.answer) {
        clearInterval(intervalId)
        resolve(message.data.data.answer)
      }
      attempts++
    }, 11000)
  })
}

export function answer(endpoint = 'wikibot', value) {
  const ticketId = HDE.getState().ticketId

  return HDE.webhook({
    endpoint,
    value: value || ticketId + '',
  })
}
