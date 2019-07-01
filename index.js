var inserted = exports.cache = {}

// cache createElement
var originalCreateElement = Document.prototype.createElement;

// redefine createElement
Document.prototype.createElement = function createElement(name, attrs) {
	// create the element
	var element = originalCreateElement.call(this, String(name));

	// for each attribute
	for (var attr in attrs) {
		// assign the attribute, prefixing capital letters with dashes 
		element.setAttribute(attr.replace(/[A-Z]/g, '-$&'), attrs[attr]);
	}
	return element;
};

exports.insert = function (css) {
  if (inserted[css]) return
  inserted[css] = true

  var elem = document.createElement('style',{ type:'text/css' })

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return elem
}
