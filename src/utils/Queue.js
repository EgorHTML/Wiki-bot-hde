import { ref } from 'vue'

export function useQueue() {
  const queue = ref([])
  const dequeuedItem = ref(null)
  const running = ref(false)

  const enqueue = (item) => {
    if (item) {
      queue.value.push(item)
    }
  }

  const dequeue = () => {
    if (queue.value.length > 0) {
      console.log([...queue.value], 'do')

      dequeuedItem.value = queue.value.shift()
      console.log([...queue.value], 'после')
    }
  }

  const peek = () => {
    if (queue.value.length > 0) {
      return queue.value[0]
    }
    return null
  }

  const isEmpty = () => {
    return queue.value.length === 0
  }

  const size = () => {
    return queue.value.length
  }

  const clear = () => {
    queue.value = []
    dequeuedItem.value = null
  }

  const execute = async () => {
    if (running.value) return

    running.value = true

    const task = peek()
    console.log(task)

    if (task) {
      await task()
      dequeue()
      execute()
    }
  }

  return {
    execute,
    queue,
    dequeuedItem,
    enqueue,
    dequeue,
    peek,
    isEmpty,
    size,
    clear,
  }
}
