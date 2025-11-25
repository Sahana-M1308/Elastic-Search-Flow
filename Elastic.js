function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}


// 5. Elastic Search Flow: Input → Debounce → Filter local data list → Render results

function applyFiltersAndSearch() {
    let filteredTasks = [...tasks]; 
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Matching occurs on partial substrings & case-insensitive comparison.
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task =>
            // Check if search term is included in the title OR description
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Note: If you added status/priority filters from the previous answer, 
    // they would also be applied here to further refine filteredTasks.

    renderTasks(filteredTasks);
}

// Attach the debounced function to the search input
// The function will run 300ms AFTER the user stops typing.
searchInput.addEventListener('input', debounce(applyFiltersAndSearch, 300));


// --- The renderTasks function is crucial for the final "Render results" step ---
// (Re-pasted from the CRUD answer for completeness)

function renderTasks(tasksToDisplay = tasks) {
    taskList.innerHTML = ''; 

    tasksToDisplay.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item', task.status);
        li.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong>
                <p>${task.description || 'No description'}</p>
                <!-- ... other details and action buttons ... -->
            </div>
        `;
        taskList.appendChild(li);
    });
}


applyFiltersAndSearch();
