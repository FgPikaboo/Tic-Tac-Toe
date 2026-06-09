import util from 'util'

class rr {
	constructor() {
		this.aa = 'aa'
	}
	// toString() {
		// return 'salut'
	// }
}
let aa = new Error()
let bb = new rr()
console.log(`${aa}`)
console.log(`${bb}`)
console.log(util.inspect(aa,true,null))