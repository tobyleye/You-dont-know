// contants
import { MEMES } from '@/constants'

export const generateURL = (categoryId) => {
  return `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
}

export const generateMeme = (score) => {
  const result = score < 50 ? 'dull' : 'smart'
  const memes = MEMES[result]
  const randomIndex = Math.floor(Math.random(memes.length) * memes.length)
  return `memes/${result}/${memes[randomIndex]}`
}
