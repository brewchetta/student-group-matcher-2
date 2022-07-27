function WrapWithModal(WrappedComponent) {
  return function ModalWrapper(props) {
    return (
      <>
        {
          !props.hasOwnProperty('displayCondition') || props.displayCondition
          ?
          <>
            {/* modal mask is clickable and can be closed */}
            <div className="modal-mask" onClick={props.onClickOut}/>

            <div className="modal" style={props.modalStyles} className={props.modalClassName + " modal"}>
              <WrappedComponent {...props} />
            </div>

          </>
          :
          null
        }
      </>
    )
  }
}
export default WrapWithModal

// to use:
//
// [in YourComponent.js]
// import ModalWrapper from "components/shared/ModalWrapper"
// ...
// export default ModalWrapper(YourComponent)
//
//
// [in OtherComponent.js]
// import YourComponent from "..."
// ...
// return (
//    <YourComponent onClickOut={closeModalFn} modalStyles={{display: "flex"}} modalClassName="border-white text-red" />
// )
