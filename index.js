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
      if (memory[pointer] === undefined) memory[pointer] = 0
      if (memory[pointer] + 1 > 255) memory[pointer] = MIN
      else memory[pointer]++
    },
    '👇': () => {
      if (memory[pointer] === undefined) memory[pointer] = 0
      if (memory[pointer] - 1 < 0) memory[pointer] = MAX
      else memory[pointer]--
    },
    '🤜': () => {
      if (memory[pointer] === 0) {
        const tempInstruction = instruction.slice(index)
        const tempIndex = tempInstruction.indexOf('🤛')
        index = tempIndex
      }
    },
    '🤛': () => {
      if (memory[pointer] !== 0) {
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
