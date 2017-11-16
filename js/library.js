function L( attr ){
	//we can fetch id, class, tag
	let selector = ""
	if(attr[0] === "#") selector = document.getElementById(attr.slice(1))
	if(attr[0] === ".") selector = document.getElementsByClassName(attr.slice(1))
	if(attr[0] !== "." && attr[0] !== "#") selector = document.getElementsByTagName(attr)
	return selector
}
// These functions can be used to add a set of Listeners to a set of elements, matching Linearly item to item
// The Signature is function action(listeners, modified, looperFunc, event, func)
function loop(collection, collection2, i, action, result){
	collection[i].addEventListener(action, function(){
		result(L(collection2)[i])
	})	
}

function action(collection, collection2, do_it, action, result){
	let index = 0
	while (index < collection.length){
		do_it(collection, collection2, index, action, result)
		index += 1
	}
}
/*
signatures
 L(Selector) - returns collection of values selected 
 //loop through objects and set as event Listeners

function obj(collection){
	for(var item in collection){
	  functionArray.push(item, collection[item])
	}
	return functionArray
}

let allElements = [
  "div", "div", "textarea", "input"
]

let element = (el, inner) => { 
  if (Array.isArray(el)){
   return el.map( (item) => `<${item}>${inner}</${item}>` ).join("")
  } else {
    return `<${el}>${inner}</${el}>`
  }
}
*/