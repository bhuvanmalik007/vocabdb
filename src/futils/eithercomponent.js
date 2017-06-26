// Inspired from EitherMonad
export default (props) => props.conditionerFn() ? props.leftComponent() : props.rightComponent()
