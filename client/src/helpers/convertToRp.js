
function convertToRp (price) {
    let stringPrice = price.toString().split('').reverse().join('')
    let newPrice = []
    let temp = ''
    for (let i=0; i<stringPrice.length; i++) {
        temp+=stringPrice[i]
        if(temp.length>=3) {
            newPrice.push(temp.split('').reverse().join(''))
            temp = ''
        }
    }
    newPrice.push(temp.split('').reverse().join(''))
    return newPrice.reverse().join(',')
}

export default convertToRp
