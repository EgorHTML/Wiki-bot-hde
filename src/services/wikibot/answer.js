import HDE from '../../plugin'

export default function (endpoint = 'wikibot', value) {
  const ticketId = HDE.getState().ticketId

  return HDE.webhook({
    endpoint,
    value: value || ticketId + '',
  })
}
