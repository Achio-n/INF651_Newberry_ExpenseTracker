
    const panels = document.querySelectorAll('.panel');
    let draggedPanel = null;

    panels.forEach(panel => {
      panel.addEventListener('dragstart', (e) => {
        draggedPanel = panel;
        setTimeout(() => panel.style.display = 'none', 0);
      });

      panel.addEventListener('dragend', () => {
        draggedPanel.style.display = 'block';
        draggedPanel = null;
      });
    });

    const main = document.querySelector('main');

    main.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(main, e.clientY);
      if (afterElement == null) {
        main.appendChild(draggedPanel);
      } else {
        main.insertBefore(draggedPanel, afterElement);
      }
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.panel:not([style*="display: none"])')];

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
 