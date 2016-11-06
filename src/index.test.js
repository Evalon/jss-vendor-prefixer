import expect from 'expect.js'
import {create} from 'jss'
import cssVendor from 'css-vendor'

import vendorPrefixer from './index'

const settings = {
  generateClassName: (str, rule) => `${rule.name}-id`
}

describe('jss-vendor-prefixer', () => {
  let jss

  beforeEach(() => {
    jss = create(settings).use(vendorPrefixer())
  })

  describe('prefixed property', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {animation: 'yyy'}
      })
    })

    it('should generate correct CSS', () => {
      const prefixedProp = cssVendor.supportedProperty('animation')
      expect(sheet.toString()).to.be(`.a-id {\n  ${prefixedProp}: yyy;\n}`)
    })
  })

  describe('@keyframes', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        '@keyframes a': {}
      })
    })

    it('should generate correct CSS', () => {
      const prefixedKeyframes = `@${cssVendor.prefix.css}keyframes`
      expect(sheet.toString()).to.be(`${prefixedKeyframes} a {\n}`)
    })
  })

  describe('unknown property', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {xxx: 'block'}
      })
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be('.a-id {\n  xxx: block;\n}')
    })
  })

  describe('unknown value', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {display: 'yyy'}
      })
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be('.a-id {\n  display: yyy;\n}')
    })
  })

  describe('unknown property and value', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {xxx: 'yyy'}
      })
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be('.a-id {\n  xxx: yyy;\n}')
    })
  })

  describe('prefixed value', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {display: 'flex'}
      })
    })

    it('should generate correct CSS', () => {
      const supportedValue = cssVendor.supportedValue('display', 'flex')
      expect(sheet.toString()).to.be(`.a-id {\n  display: ${supportedValue};\n}`)
    })
  })
})
