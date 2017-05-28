export default data =>
  new Promise((resolve, reject) => {
    try {
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
