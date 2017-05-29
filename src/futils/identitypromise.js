export default fn =>
  new Promise((resolve, reject) => {
    try {
      resolve(fn())
    } catch (e) {
      reject(e)
    }
  })
