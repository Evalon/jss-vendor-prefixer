import * as vendor from 'css-vendor'

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === 'keyframes') {
      rule.key = `@${vendor.prefix.css}${rule.key.substr(1)}`
    }
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style

    for (const prop in style) {
      const value = style[prop]

      let changeProp = false
      const supportedProp = vendor.supportedProperty(prop)
      if (supportedProp && supportedProp !== prop) changeProp = true

      let changeValue = false
      const supportedValue = vendor.supportedValue(supportedProp, value)
      if (supportedValue && supportedValue !== value) changeValue = true

      if (changeProp || changeValue) {
        if (changeProp) delete style[prop]
        style[supportedProp || prop] = supportedValue || value
      }
    }

    return style
  }

  function onChangeValue(value, prop) {
    return vendor.supportedValue(prop, value)
  }

  return {onProcessRule, onProcessStyle, onChangeValue}
}
