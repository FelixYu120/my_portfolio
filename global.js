console.log('IT’S ALIVE!');

// Helper function to select elements (Step 1)
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
