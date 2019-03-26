// for better understanding what's going on here, please check https://github.com/mcibique/vue-testing-examples#dependency-injection

import { Container } from 'inversify'
import { helpers } from 'inversify-vanillajs-helpers'
import getDecorators from 'inversify-inject-decorators'

let container = new Container({ defaultScope: 'Transient' })

export const ROUTER = Symbol('Router')
export const STORE = Symbol('Store')

// global bindings
export const WINDOW = Symbol('window')
container.bind(WINDOW).toConstantValue(window)

// inject decorators
let {
  lazyInject: LazyInject,
  lazyInjectNamed: LazyInjectNamed,
  lazyInjectTagged: LazyInjectTagged,
  lazyMultiInject: LazyMultiInject
} = getDecorators(container)

export {
  LazyInject,
  LazyInjectNamed,
  LazyInjectTagged,
  LazyMultiInject
}

// register decorators
let Register = helpers.register(container)
let RegisterConstantValue = helpers.registerConstantValue(container)

// override decorators
function Override (identifier, dependencies, constraint) {
  return function (constructor) {
    helpers.annotate(constructor, dependencies)
    if (container.isBound(identifier)) {
      container.unbind(identifier)
    }
    let binding = container.bind(identifier).to(constructor)
    if (constraint) {
      constraint(binding)
    }
  }
}

function OverrideConstantValue (identifier, constantValue, constraint) {
  if (container.isBound(identifier)) {
    container.unbind(identifier)
  }
  let binding = container.bind(identifier).toConstantValue(constantValue)
  if (constraint) {
    constraint(binding)
  }
}

export {
  Register,
  Register as register,
  RegisterConstantValue,
  RegisterConstantValue as registerConstantValue,
  Override,
  Override as override,
  OverrideConstantValue,
  OverrideConstantValue as overrideConstantValue
}

export default container
