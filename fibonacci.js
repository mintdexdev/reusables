let limit = 93

for (let i = 1; i <= limit; i *= 1.618) {
  let j = i.toFixed(1)
  console.log(j, "-", limit - j)
}

console.log("-----------------------------")

for (let i = limit; i >= 1; i /= 1.618) {
  let j = i.toFixed(1)
  console.log(j, "__", limit - j)
}