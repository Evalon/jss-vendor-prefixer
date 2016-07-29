'use strict'
var jss = jss.default

QUnit.module('Vendor prefixes plugin', {
  setup: function () {
    jss.use(jssVendorPrefixer.default())
  },
  teardown: function () {
    jss.plugins.registry = []
  }
})

test('prefixed property', function () {
  var ss = jss.createStyleSheet({
    a: {animation: 'yyy'}
  }, {named: false})
  var prefixedProp = cssVendor.supportedProperty('animation')


  equal(ss.toString(), 'a {\n  ' + prefixedProp + ': yyy;\n}')
})

test('@keyframes', function () {
  var ss = jss.createStyleSheet({
    '@keyframes a': {}
  }, {named: false})
  var prefixedKeyframes = '@' + cssVendor.prefix.css + 'keyframes'

  equal(ss.toString(), prefixedKeyframes + ' a {\n}')
})

test('unknown property', function () {
  var ss = jss.createStyleSheet({
    a: {xxx: 'yyy'}
  }, {named: false})
  equal(ss.toString(), 'a {\n  xxx: yyy;\n}')
})

test('unknown value', function () {
  var ss = jss.createStyleSheet({
    a: {display: 'yyy'}
  }, {named: false})
  equal(ss.toString(), 'a {\n  display: yyy;\n}')
})

test('unknown property and value', function () {
  var ss = jss.createStyleSheet({
    a: {xxx: 'yyy'}
  }, {named: false})
  equal(ss.toString(), 'a {\n  xxx: yyy;\n}')
})

test('prefixed value', function () {
  var ss = jss.createStyleSheet({
    a: {display: 'flex'}
  }, {named: false})
  var supportedValue = cssVendor.supportedValue('display', 'flex')
  equal(ss.toString(), 'a {\n  display: ' + supportedValue + ';\n}', supportedValue)
})
