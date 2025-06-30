function toggleCollapse(contentId, button) {
  const content = document.getElementById(contentId);
  content.classList.toggle('expanded');
  button.textContent = content.classList.contains('expanded') ? 'Show Less' : 'Show More';
}

document.addEventListener('DOMContentLoaded', function() {
  const role = localStorage.getItem('familyRole') || 'mom';
  document.body.classList.add(role + '-theme');
  
  // Update "For You" tab text
  const forYouTab = document.getElementById('forYouTab');
  forYouTab.textContent = `For ${role.charAt(0).toUpperCase() + role.slice(1)}`;
});
