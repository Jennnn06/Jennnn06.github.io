    document.addEventListener("DOMContentLoaded", function () {
      let currentProjectIndex = 0;
      const projectItems = document.querySelectorAll('.project-item');
      const totalProjects = projectItems.length;

      document.getElementById('prevProjectMain').addEventListener('click', function () {
        // Hide current project
        projectItems[currentProjectIndex].classList.add('d-none');
        // Calculate previous index (wrap around)
        currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
        // Show previous project
        projectItems[currentProjectIndex].classList.remove('d-none');
      });

      document.getElementById('nextProjectMain').addEventListener('click', function () {
        // Hide current project
        projectItems[currentProjectIndex].classList.add('d-none');
        // Calculate next index (wrap around)
        currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
        // Show next project
        projectItems[currentProjectIndex].classList.remove('d-none');
      });
    });