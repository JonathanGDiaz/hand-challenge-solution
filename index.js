function solution (input) {
  const instruction = Array.from(input)
  const MAX = 255
  const MIN = 0
  const memory = []
  let pointer = 0
  let index = 0
  let result = ''
  const actions = {
    '👉': () => {
      pointer++
    },
    '👈': () => {
      pointer--
    },
    '👆': () => {
      if (memory[pointer] === undefined) memory[pointer] = MIN
      if (memory[pointer] + 1 > MAX) memory[pointer] = MIN
      else memory[pointer]++
    },
    '👇': () => {
      if (memory[pointer] === undefined) memory[pointer] = MIN
      if (memory[pointer] - 1 < MIN) memory[pointer] = MAX
      else memory[pointer]--
    },
    '🤜': () => {
      if (memory[pointer] === MIN) {
        const tempInstruction = instruction.slice(index)
        const tempIndex = tempInstruction.indexOf('🤛')
        index = tempIndex
      }
    },
    '🤛': () => {
      if (memory[pointer] !== MIN) {
        const tempInstruction = instruction.slice(0, index)
        const tempIndex = tempInstruction.lastIndexOf('🤜')
        index = tempIndex
      }
    },
    '👊': () => {
      result = result + String.fromCharCode(memory[pointer])
    }
  }
  while (index < instruction.length) {
    actions[instruction[index]]()
    index++
  }

  return result
}
module.exports = solution
