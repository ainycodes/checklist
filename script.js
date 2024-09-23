document.addEventListener('DOMContentLoaded', () => {
    const checkboxesContainer = document.getElementById('checkboxes');

    // Function to add a checkbox item
    function addCheckbox(value = '') {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkbox-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        const checkboxId = 'item' + (checkboxesContainer.children.length + 1); // Unique ID for each checkbox
        checkbox.id = checkboxId; // Set the checkbox ID

        const label = document.createElement('label');
        label.className = 'custom-checkbox';
        label.htmlFor = checkboxId; // Associate label with checkbox

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'item-input';
        input.placeholder = 'Add item...';
        input.value = value;

        input.addEventListener('input', () => saveItems());

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        itemDiv.appendChild(input);
        checkboxesContainer.appendChild(itemDiv);
        
        // Focus on the new input field
        input.focus();

        // Add event listener for deleting on swipe
        itemDiv.addEventListener('touchstart', handleTouchStart, false);
        itemDiv.addEventListener('touchmove', handleTouchMove, false);
        
        // Add event listener for deleting on PC
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Delete') {
                deleteItem(itemDiv);
            }
        });
    }

    // Load saved items from local storage (if applicable)
    const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    savedItems.forEach(item => addCheckbox(item));

    // Function to save items to local storage
    function saveItems() {
        const inputs = Array.from(checkboxesContainer.getElementsByClassName('item-input'));
        const items = inputs.map(input => input.value.trim()).filter(value => value !== '');
        localStorage.setItem('todoItems', JSON.stringify(items));
    }

    // Listen for the Enter key to add a new item
    document.addEventListener('keydown', (e) => {
        const inputs = Array.from(checkboxesContainer.getElementsByClassName('item-input'));
        const activeInput = document.activeElement;

        if (e.key === 'Enter' && inputs.includes(activeInput)) {
            e.preventDefault(); // Prevent form submission or other default actions
            
            // Check if the active input is not empty before adding
            if (activeInput.value.trim() !== '') {
                addCheckbox(); // Add a new checkbox item
            }
        }
    });

    // Function to delete an item
    function deleteItem(itemDiv) {
        checkboxesContainer.removeChild(itemDiv);
        saveItems(); // Save the updated list
    }

    // Swipe handling variables
    let xStart = null;

    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xStart = firstTouch.clientX; // Get the initial touch position
    }

    function handleTouchMove(evt) {
        if (!xStart) {
            return; // If there's no starting point, do nothing
        }

        const xDiff = xStart - evt.touches[0].clientX;

        // If swiped left (you can adjust the threshold)
        if (xDiff > 50) {
            deleteItem(evt.currentTarget); // Delete the item
            xStart = null; // Reset starting point
        }
    }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered: ', registration);
      }).catch(registrationError => {
        console.log('ServiceWorker registration failed: ', registrationError);
      });
  });
}
