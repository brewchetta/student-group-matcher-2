import CreateStatefulContextWrapper from './_useContextState'

const defaultState = {
  open: false,
  messages: [],
  toastType: 'success'
}

const [useToastContext, ToastContextProvider] = CreateStatefulContextWrapper(defaultState, 'toast')

export {useToastContext, ToastContextProvider}
