
const scrollingContainer = document.getElementById("scroll-text");
// Set the scroll speed (adjust this value as needed)
const scrollSpeed = 1; // Change to control the scrolling speed

// Function to scroll the content
function scrollContent() {
  scrollingContainer.scrollTop += scrollSpeed;
  // Check if we have reached the bottom of the content
  if (
    scrollingContainer.scrollTop + 4 >=
    scrollingContainer.scrollHeight - scrollingContainer.clientHeight
  ) {
    scrollingContainer.scrollTop = 0; // Reset the scroll position to the top
  }
}
// Start scrolling at a regular interval
var scrollInterval = setInterval(scrollContent, 10); // Adjust the interval as needed

// Optionally, stop the scrolling on mouseover
scrollingContainer.addEventListener("mouseover", () => {
  clearInterval(scrollInterval);
  scrollingContainer.style.overflowY = "scroll"; // Enable vertical scrollbar
  scrollingContainer.style.cursor = "pointer"; // Change the cursor on hover
});

// Optionally, resume scrolling on mouseout
scrollingContainer.addEventListener("mouseout", () => {
  scrollInterval = setInterval(scrollContent, 10); // Adjust the interval as needed
  scrollingContainer.style.overflowY = "hidden"; // Enable vertical scrollbar
  scrollingContainer.style.cursor = "default"; // Change the cursor on hover
});
