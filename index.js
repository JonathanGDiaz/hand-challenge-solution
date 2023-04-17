function solution (input) {
  const instruction = Array.from(input)

  // Constant values
  const MAX = 255
  const MIN = 0

  const memory = []
  let pointer = 0
  let index = 0
  let result = ''

  const actions = {
    '👉': () => { pointer++ },
    '👈': () => { pointer-- },
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
        let nestingLevel = 1
        for (let i = index + 1; i < instruction.length; i++) {
          if (instruction[i] === '🤛') nestingLevel--
          if (instruction[i] === '🤜') nestingLevel++
          if (nestingLevel === 0) {
            index = i
            break
          }
        }
      }
    },
    '🤛': () => {
      if (memory[pointer] !== MIN) {
        let nestingLevel = 1
        for (let i = index - 1; i >= 0; i--) {
          if (instruction[i] === '🤛') nestingLevel++
          if (instruction[i] === '🤜') nestingLevel--
          if (nestingLevel === 0) {
            index = i
            break
          }
        }
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

  console.log(result)
}

// Hellow
solution('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊')

// Hellow World!
solution('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊')
