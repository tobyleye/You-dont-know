// contants
import { MEMES } from '@/constants'

export const generateURL = (
  categoryId,
  type = 'multiple',
  amount = 10
) => (
  `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&type=${type}`
)

export const generateMeme = score => {
  const result = score < 50 ? 'dull' : 'smart'
  const memes = MEMES[result]
  const randomIndex = Math.floor(Math.random(memes.length) * memes.length)
  return `memes/${result}/${memes[randomIndex]}`
}
