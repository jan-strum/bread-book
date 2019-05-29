export const dateFormatter = str => {
  const currentYear = new Date().toDateString().slice(-2)
  const date = new Date(Number(str))
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date
    .getFullYear()
    .toString()
    .slice(2)

  let formattedDate

  currentYear > year
    ? (formattedDate = `${month}-${year}`)
    : (formattedDate = `${month}-${day}`)

  return formattedDate
}

export const log = (string, variable) => {
  console.log(string, JSON.stringify(variable, null, 2))
}
