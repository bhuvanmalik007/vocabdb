export default ({ function, children, ...props }) => {
  const Component = function
  if (children){
    return <Component {...props}>{children}</Component>
  }
  return <Component {...props} />
}
