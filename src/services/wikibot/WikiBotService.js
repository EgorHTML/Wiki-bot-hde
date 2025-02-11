class Wikibot {
    static translationTypes = {
        'SUCCESS': 'успешный ответ',
        'FALLBACK': 'альтернативная генерация ответа',
        'NO_ANSWER': 'нет ответа',
        'ERROR': 'внутренняя ошибка сервера',
        'GREETING': 'содержит только приветствие',
        'OPERATOR': 'вызов оператора',
        'SKIP': 'пропуск сообщения',
        'GRATITUDE': 'содержит только благодарность'
    }

    static successTypes = ['SUCCESS', 'FALLBACK', 'GREETING', 'GRATITUDE']

    asc(){}

    getAnswerAsync(){}
}