export function getRandomHexadecimal() {
  let randomHex = ''
  for (let i = 0; i < 16; i++) {
    // Генерируем случайное число от 0 до 15
    const randomNum = Math.floor(Math.random() * 16)
    // Преобразуем число в шестнадцатеричное представление и добавляем к строке
    randomHex += randomNum.toString(16)
  }
  return randomHex
}
