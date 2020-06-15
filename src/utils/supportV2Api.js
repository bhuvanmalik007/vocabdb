export default lexicalCategory => (
  typeof lexicalCategory === 'object' ? lexicalCategory.text : lexicalCategory
)
