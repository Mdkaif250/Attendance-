// Get all table cells except headers
const tableCells = document.querySelectorAll('.dataframe td:not(:first-child)');

// Get student list from class folder
const getStudentList = () => {
    const studentList = document.querySelector('#student-list');
    if (!studentList) return [];
    return Array.from(studentList.children).map(li => li.textContent);
};

// Create and show popup
const showAttendancePopup = (subject, time) => {
    // Create popup elements
    const popup = document.createElement('div');
    popup.className = 'attendance-popup';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 80vh;
        overflow-y: auto;
        min-width: 300px;
    `;

    // Add header
    const header = document.createElement('h3');
    header.textContent = `${subject} - ${time}`;
    popup.appendChild(header);

    // Get students and create attendance list
    const students = getStudentList();
    const date = new Date().toISOString().split('T')[0];
    
    students.forEach(student => {
        const row = document.createElement('div');
        row.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        `;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = student;

        // Create attendance toggle button
        const attendanceBtn = document.createElement('button');
        
        // Get stored attendance
        const storageKey = `attendance_${date}_${subject}_${student}`;
        const storedAttendance = localStorage.getItem(storageKey) || 'absent';
        
        attendanceBtn.textContent = storedAttendance === 'present' ? 'Present' : 'Absent';
        attendanceBtn.className = storedAttendance === 'present' ? 'present' : 'absent';
        attendanceBtn.style.cssText = `
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: ${storedAttendance === 'present' ? '#4CAF50' : '#f44336'};
            color: white;
        `;

        // Toggle attendance
        attendanceBtn.onclick = () => {
            const newStatus = attendanceBtn.className === 'absent' ? 'present' : 'absent';
            attendanceBtn.className = newStatus;
            attendanceBtn.textContent = newStatus === 'present' ? 'Present' : 'Absent';
            attendanceBtn.style.backgroundColor = newStatus === 'present' ? '#4CAF50' : '#f44336';
            
            // Store in localStorage
            localStorage.setItem(storageKey, newStatus);
        };

        row.appendChild(nameSpan);
        row.appendChild(attendanceBtn);
        popup.appendChild(row);
    });

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        margin-top: 20px;
        padding: 8px 16px;
        background: #2196F3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    closeBtn.onclick = () => {
        document.body.removeChild(overlay);
        document.body.removeChild(popup);
    };
    popup.appendChild(closeBtn);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `;
    overlay.onclick = closeBtn.onclick;

    // Add to document
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
};

// Add click handlers to table cells
tableCells.forEach(cell => {
    if (cell.textContent.trim() !== '-') {
        cell.style.cursor = 'pointer';
        cell.onclick = () => {
            const subject = cell.textContent;
            const time = cell.closest('tr').querySelector('td:first-child').textContent;
            showAttendancePopup(subject, time);
        };
    }
});
