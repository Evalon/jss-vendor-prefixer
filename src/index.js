import * as vendor from 'css-vendor'

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === 'keyframe') {
      rule.selector = `@${vendor.prefix.css}${rule.selector.substr(1)}`
    }
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'regular') return style

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

  return {onProcessRule, onProcessStyle}
}
