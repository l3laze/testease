'use strict'

function getNestedProp(obj, propNest) {
  let value

  // console.info('get', obj, propNest)

  if (propNest.length === 1) {
    return obj?.[ propNest[ 0 ]] ?? undefined
  }

  return getNestedProp(obj[ propNest[ 0 ]], propNest.slice(1))
}

function setNestedProp(obj, propNest, value) {
  // console.info('set', obj, propNest, value)

  if (propNest.length === 1) {
    obj[ propNest[ 0 ]] = value
  } else {
    if (typeof obj[ propNest[ 0 ]] === 'undefined') {
      obj[ propNest[ 0 ]] = {}
    }

    setNestedProp(obj[ propNest[ 0 ]], propNest.slice(1), value)
  }
}

module.exports = {
  getNestedProp,
  setNestedProp
}