let files = [];

// Initialize demo files
const demoFiles = [
    { name: 'Project Proposal.docx', type: 'document' },
    { name: 'Budget 2024.xlsx', type: 'spreadsheet' },
    { name: 'Team Photo.jpg', type: 'image' },
    { name: 'Presentation.pptx', type: 'presentation' }
];

// Function to get the appropriate icon for a file type
function getFileIcon(type) {
    switch(type) {
        case 'document':
            return 'description';
        case 'spreadsheet':
            return 'table_chart';
        case 'image':
            return 'image';
        case 'presentation':
            return 'slideshow';
        default:
            return 'insert_drive_file';
    }
}

// Function to render files in the UI
function renderFiles() {
    const filesContainer = document.getElementById('filesContainer');
    filesContainer.innerHTML = '';

    const allFiles = [...demoFiles, ...files];
    
    allFiles.forEach(file => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        fileCard.innerHTML = `
            <span class="material-icons file-icon">${getFileIcon(file.type)}</span>
            <div class="file-name">${file.name}</div>
        `;
        filesContainer.appendChild(fileCard);
    });
}

// Show upload modal when new button is clicked
document.querySelector('.new-btn').addEventListener('click', () => {
    document.getElementById('uploadModal').style.display = 'block';
});

// Function to close the upload modal
function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const fileType = getFileType(file.name);
        files.push({
            name: file.name,
            type: fileType
        });
        renderFiles();
        closeModal();
        fileInput.value = '';
    }
}

// Function to determine file type based on file extension
function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
        case 'doc':
        case 'docx':
            return 'document';
        case 'xls':
        case 'xlsx':
            return 'spreadsheet';
        case 'jpg':
        case 'jpeg':
        case 'png':
            return 'image';
        case 'ppt':
        case 'pptx':
            return 'presentation';
        default:
            return 'other';
    }
}

// Search functionality to filter files based on input
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filesContainer = document.getElementById('filesContainer');
    const fileCards = filesContainer.getElementsByClassName('file-card');
    
    Array.from(fileCards).forEach(card => {
        const fileName = card.querySelector('.file-name').textContent.toLowerCase();
        card.style.display = fileName.includes(searchTerm) ? 'block' : 'none';
    });
});

// Close modal when clicking outside of it
window.onclick = (event) => {
    const modal = document.getElementById('uploadModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Initial render of files
renderFiles();