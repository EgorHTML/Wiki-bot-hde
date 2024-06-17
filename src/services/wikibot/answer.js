import HDE from '../../plugin'

export default function (endpoint = 'wikibot', value) {
  const ticketId = HDE.getState().ticketId

  if (!ticketId) throw new Error('ticket Id undefined in answer wikibot.')

  return HDE.webhook({
    endpoint,
    value: value || ticketId + '',
  })
}
