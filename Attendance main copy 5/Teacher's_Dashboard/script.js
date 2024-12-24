// Login Validation
const validUsername = 'SOCMACS';
const validPassword = 'SOCMACS';

function validateLogin(event) {
    event.preventDefault();     

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Get error message element
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    // Clear error message if user starts typing again
    document.getElementById('username').addEventListener('input', function() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    });
    document.getElementById('password').addEventListener('input', function() {
        errorMessage.style.display = 'none'; 
        errorMessage.textContent = '';
    });

    // Validate input fields
    if (!username || !password) {
        errorMessage.textContent = 'Please enter both username and password';
        errorMessage.style.display = 'block';
        return false;
    }

    // Check if credentials match
    if (username === validUsername && password === validPassword) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', `${username}@somacs.edu.in`);
        window.location.href = 'dashboard.html';
        return true;
    } else {
        // Show error message if credentials are incorrect
        errorMessage.textContent = 'Invalid username or password!';
        errorMessage.style.display = 'block';
        return false;
    }
}

// On page load, retrieve and display the username and email from localStorage
window.onload = function() {
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');

    if (username) {
        document.getElementById('teacher-name').innerText = `Name: ${username}`;
    }
    if (email) {
        document.getElementById('teacher-email').innerText = `Email: ${email}`;
    }

    // Add click handlers for BCA 2nd YEAR heading
    const classHeading2nd = document.querySelector('.class-folder h4');
    const studentList2nd = document.getElementById('student-list');
    
    // Position student list below button
    studentList2nd.style.position = 'relative'; 
    studentList2nd.style.width = '100%';
    studentList2nd.style.backgroundColor = '#fff';
    studentList2nd.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Initially hide student list
    studentList2nd.style.display = 'none';
    
    // Toggle handler for BCA 2nd YEAR
    classHeading2nd.addEventListener('click', () => {
        studentList2nd.style.display = studentList2nd.style.display === 'none' ? 'block' : 'none';
        // Rotate arrow when clicked
        const arrow = classHeading2nd.querySelector('.arrow');
        if (arrow) {
            arrow.style.transform = studentList2nd.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });

    // Add dropdown arrow to heading with a span for better control
    classHeading2nd.style.cursor = 'pointer';
    classHeading2nd.innerHTML += ' <span class="arrow" style="display: inline-block; transition: transform 0.3s;">▼</span>';
    
    // Make parent container position relative for proper layout
    classHeading2nd.parentElement.style.position = 'relative';

    // Start auto-refresh of attendance summary
    setInterval(() => {
        const currentRollNo = document.getElementById('student-roll-no').innerText;
        if (currentRollNo) {
            updateAttendanceSummary(currentRollNo);
        }
    }, 5000); // Update every 5 seconds

    studentList2nd.classList.add('student-list');
    classHeading2nd.classList.add('class-heading');
};

// Function to get all lectures for a specific day
function getAllLecturesForDay(day) {
    const lectures = {
        'Monday': [
            'C++ (B3)', 
            'DBMS (B4)', 
            'Operating System Concepts and Introduction to Linux', 
            'Open Elective 3- Discrete Mathematics', 
            'Skill Enhancement Course Elect Visualization Tool (Power BI)'
        ],
        'Tuesday': [
            'C++ (B3)', 
            'DBMS (B4)', 
            'Operating System Concepts and Introduction to Linux', 
            'Open Elective 3- Discrete Mathematics', 
            'Skill Enhancement Course Elect Visualization Tool (Power BI)'
        ],
        'Wednesday': [
            'DBMS (B3)', 
            'C++ (B4)', 
            'Operating System Concepts and Introduction to Linux', 
            'Open Elective 3- Discrete Mathematics', 
            'Skill Enhancement Course Elect Visualization Tool (Power BI)'
        ],
        'Thursday': [
            'DBMS (B3)', 
            'C++ (B4)', 
            'Object Oriented Programming Using C++', 
            'Database Management System (DBMS)', 
            'Operating System Concepts and Introduction to Linux'
        ],
        'Friday': [
            'Database Management System (DBMS)', 
            'Object Oriented Programming Using C++', 
            '-', 
            'Database Management System (DBMS)', 
            '-'
        ],
        'Saturday': [
            'Object Oriented Programming Using C++', 
            'Database Management System (DBMS)', 
            'Guest Lecture By Industry Expert', 
            'Guest Lecture By Industry Expert', 
            'Value added course Elective 1 Indian Environment Sustainable Development & Living'
        ]
    };
    return lectures[day] || []; // Return an empty array if the day is not found
}

// Initialize student data (mock)
const studentsData = {
    '1': { 
        name: 'Ayesha Sayed', 
        grade: 'A', 
        phone: '9172186124',
        email: 'ayeshaksayed31@gmail.com', 
        address: 'Quarter Gate, Pune, Maharashtra', 
        attendance: [] 
    },
    '2': { 
        name: 'Aafiya Sayyed', 
        grade: 'A', 
        phone: '7796994476',
        email: 'aafiyasayyed29@gmail.com', 
        address: 'Nana peth, Pune, Maharashtra', 
        attendance: [] 
    },
    '3': { 
        name: 'Kaif Shaikh', 
        grade: 'A', 
        phone: '878872742',
        email: 'kaif@gmail.com', 
        address: 'MG Road, Pune, Maharashtra', 
        attendance: [] 
    },
    '104': { 
        name: 'Awwab Shaikh', 
        grade: 'A', 
        phone: '7620661529',
        email: 'awwab@gmail.com', 
        address: 'Camp, Pune, Maharashtra', 
        attendance: [] 
    },
};

// Function to add new student
function addNewStudent() {
    const name = document.getElementById('new-student-name').value.trim();
    const roll = document.getElementById('new-student-roll').value.trim();
    const grade = document.getElementById('new-student-grade').value.trim();
    const phone = document.getElementById('new-student-phone').value.trim();
    const email = document.getElementById('new-student-email').value.trim();
    const address = document.getElementById('new-student-address').value.trim();

    // Validate inputs
    if (!name || !roll || !grade || !phone || !email || !address) {
        alert('Please fill in all fields');
        return;
    }

    // Validate roll number format
    if (!/^\d+$/.test(roll)) {
        alert('Roll number must contain only digits');
        return;
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Check if roll number already exists
    if (studentsData[roll]) {
        alert('A student with this roll number already exists');
        return;
    }

    // Add new student to studentsData
    studentsData[roll] = {
        name: name,
        grade: grade,
        phone: phone,
        email: email,
        address: address,
        attendance: []
    };

    // Add new student to the list in UI
    const studentList = document.getElementById('student-list');
    const newStudentLi = document.createElement('li');
    newStudentLi.textContent = name;
    newStudentLi.onclick = () => showStudentDetails(name, roll);
    studentList.appendChild(newStudentLi);

    // Clear form fields
    document.getElementById('new-student-name').value = '';
    document.getElementById('new-student-roll').value = '';
    document.getElementById('new-student-grade').value = '';
    document.getElementById('new-student-phone').value = '';
    document.getElementById('new-student-email').value = '';
    document.getElementById('new-student-address').value = '';

    alert('Student added successfully!');
}

// Show student details when clicked
function showStudentDetails(name, rollNo) {
    document.getElementById('student-name').innerText = name;
    document.getElementById('student-roll-no').innerText = rollNo;
    document.getElementById('student-grade').innerText = studentsData[rollNo].grade;
    document.getElementById('student-phone').innerText = studentsData[rollNo].phone;
    document.getElementById('student-email').innerText = studentsData[rollNo].email;
    document.getElementById('student-address').innerText = studentsData[rollNo].address;

    document.getElementById('student-details').style.display = 'block';

    populateCalendar(rollNo);
    updateAttendanceSummary(rollNo);
}

function logout() {
    window.location.href = 'index.html';
}

function goHome() {
    window.location.href = 'dashboard.html';
}

function filterStudents() {
    const searchValue = document.getElementById("search-bar").value.toLowerCase();
    const studentListItems = document.querySelectorAll("#student-list li");

    studentListItems.forEach(item => {
        const studentName = item.textContent.toLowerCase();
        if (studentName.includes(searchValue)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Toggle attendance status directly on click
function toggleAttendance(rollNo, date) {
    // Check if the date is a holiday
    if (isHoliday(date)) {
        return; // Don't allow attendance changes on holidays
    }

    const student = studentsData[rollNo];
    const attendanceIndex = student.attendance.findIndex(entry => entry.date === date);
    
    let newStatus;
    if (attendanceIndex !== -1) {
        // Toggle between Present and Absent
        newStatus = student.attendance[attendanceIndex].status === 'Present' ? 'Absent' : 'Present';
        student.attendance[attendanceIndex].status = newStatus;
    } else {
        // If no attendance record exists, start with Present
        newStatus = 'Present';
        student.attendance.push({ date, status: newStatus });
    }

    // Update the calendar and summary
    populateCalendar(rollNo);
    updateAttendanceSummary(rollNo);
}

// Update attendance summary with improved statistics
function updateAttendanceSummary(rollNo) {
    const student = studentsData[rollNo];
    if (!student) return;

    // Use the current displayed month and year instead of today's date
    const displayedMonth = currentMonth;
    const displayedYear = currentYear;

    // Calculate total working days in displayed month (excluding Sundays and holidays)
    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
    let workingDays = 0;
    
    // Define holidays (example format: "YYYY-MM-DD")
    const holidays = [
        "2024-01-01", // New Year
        "2024-01-26", // Republic Day
        "2024-08-15", // Independence Day
        "2024-10-02", // Gandhi Jayanti
        // Add more holidays as needed
    ];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(displayedYear, displayedMonth, day);
        const dateString = date.toISOString().split('T')[0];
        
        // Count working days (exclude Sundays and holidays)
        if (date.getDay() !== 0 && !holidays.includes(dateString)) { // Exclude Sundays (0)
            workingDays++;
        }
    }

    // Count present days in displayed month
    let presentDaysMonth = 0;
    student.attendance.forEach(record => {
        const recordDate = new Date(record.date);
        
        // Ensure we are only counting records for the displayed month and year
        if (recordDate.getMonth() === displayedMonth && 
            recordDate.getFullYear() === displayedYear) {
            if (record.status === 'Present') {
                presentDaysMonth++;
            }
        }
    });

    // Calculate statistics
    const absentDaysMonth = workingDays - presentDaysMonth;
    const monthlyPercentage = (workingDays > 0) ? (presentDaysMonth / workingDays * 100).toFixed(1) : 0;

    // Update the UI with enhanced styling
    const summaryContainer = document.querySelector('.attendance-summary');
    if (summaryContainer) {
        const getStatusColor = (percentage) => {
            if (percentage >= 75) return '#27AE60';  // Green for good attendance
            if (percentage >= 60) return '#F1C40F';  // Yellow for warning
            return '#E74C3C';  // Red for poor attendance
        };

        const monthlyColor = getStatusColor(monthlyPercentage);

        summaryContainer.innerHTML = `
            <div class="summary-item" style="
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-left: 4px solid ${monthlyColor};
                padding: 20px;
                margin: 15px 0;
                transition: transform 0.2s ease;
                cursor: pointer;
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
                }
            ">
                <h4 style="
                    color: #2C3E50;
                    margin-bottom: 15px;
                    font-size: 1.2em;
                    border-bottom: 2px solid #ECF0F1;
                    padding-bottom: 8px;
                ">Monthly Statistics</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <p style="color: #7F8C8D; margin: 5px 0;">Working Days: <span style="color: #2C3E50; font-weight: bold;">${workingDays}</span></p>
                    <p style="color: #7F8C8D; margin: 5px 0;">Present: <span style="color: #27AE60; font-weight: bold;">${presentDaysMonth}</span></p>
                    <p style="color: #7F8C8D; margin: 5px 0;">Absent: <span style="color: #E74C3C; font-weight: bold;">${absentDaysMonth}</span></p>
                    <p style="color: ${monthlyColor}; font-weight: bold; font-size: 1.1em;">Attendance: ${monthlyPercentage}%</p>
                </div>
            </div>
        `;

        summaryContainer.classList.add('attendance-summary');
    }
}

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function updateMonthYearDisplay() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('current-month-year').innerText = `${months[currentMonth]} ${currentYear}`;
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    const rollNo = document.getElementById('student-roll-no').innerText;
    populateCalendar(rollNo, currentMonth, currentYear);
    updateAttendanceSummary(rollNo);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    const rollNo = document.getElementById('student-roll-no').innerText;
    populateCalendar(rollNo, currentMonth, currentYear);
    updateAttendanceSummary(rollNo);
}

// Helper function to check if a date is a holiday and get holiday details
function isHoliday(dateString) {
    const holidays = {
        "2025-01-01": {name: "New Year's Day", description: "Celebration of the new year"},
        "2025-01-26": {name: "Republic Day", description: "Commemorates the adoption of the Indian Constitution"},
        "2025-03-17": {name: "Holi", description: "Festival of colors and spring"},
        "2025-04-14": {name: "Dr. Ambedkar Jayanti", description: "Birth anniversary of Dr. B.R. Ambedkar"},
        "2025-04-18": {name: "Good Friday", description: "Christian holiday commemorating crucifixion of Jesus"},
        "2025-05-01": {name: "May Day", description: "International Workers' Day"},
        "2025-08-15": {name: "Independence Day", description: "Celebrates India's independence from British rule"},
        "2025-10-02": {name: "Gandhi Jayanti", description: "Birth anniversary of Mahatma Gandhi"},
        "2025-10-20": {name: "Dussehra", description: "Celebrates victory of good over evil"},
        "2025-10-31": {name: "Halloween", description: "Annual holiday featuring costumes and festivities"},
        "2025-11-09": {name: "Diwali", description: "Festival of lights"},
        "2025-12-25": {name: "Christmas", description: "Christian festival celebrating birth of Jesus"}
    };
    
    return holidays[dateString] || false;
}

// Create striped background pattern for holidays
function createHolidayPattern() {
    return `repeating-linear-gradient(
        45deg,
        #AEDFF7,
        #AEDFF7 10px,
        #9ED5F3 10px,
        #9ED5F3 20px
    )`;
}

// Create and show holiday popup
function showHolidayPopup(holiday, x, y) {
    // Remove any existing popup
    const existingPopup = document.getElementById('holiday-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup element with improved styling
    const popup = document.createElement('div');
    popup.id = 'holiday-popup';
    popup.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.1);
        z-index: 1000;
        min-width: 280px;
        max-width: 350px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.18);
        animation: fadeInScale 0.3s ease-out;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: all 0.3s ease;
    `;

    // Add @keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Add holiday information with improved styling
    popup.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #3498DB 0%, #2980B9 100%);
            color: white;
            padding: 12px 15px;
            margin: -20px -20px 15px -20px;
            border-radius: 12px 12px 0 0;
            font-weight: 600;
            font-size: 1.1em;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        ">
            <span>${holiday.name}</span>
            <span style="
                cursor: pointer;
                font-size: 1.2em;
                opacity: 0.8;
                transition: opacity 0.2s;
            " onclick="this.parentElement.parentElement.remove()">×</span>
        </div>
        <p style="
            color: #34495E;
            margin: 0;
            font-size: 0.95em;
            line-height: 1.6;
            padding: 0 5px;
            text-align: justify;
        ">${holiday.description}</p>
    `;

    // Add popup to document
    document.body.appendChild(popup);

    // Ensure popup stays within viewport
    const rect = popup.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        popup.style.left = `${window.innerWidth - rect.width - 20}px`;
    }
    if (rect.bottom > window.innerHeight) {
        popup.style.top = `${window.innerHeight - rect.height - 20}px`;
    }

    // Add click event to document to close popup when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePopup(e) {
            if (!popup.contains(e.target)) {
                popup.style.opacity = '0';
                popup.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    popup.remove();
                }, 300);
                document.removeEventListener('click', closePopup);
            }
        });
    }, 100);

    // Add hover effect
    popup.addEventListener('mouseenter', () => {
        popup.style.transform = 'scale(1.02) translateY(-2px)';
        popup.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)';
    });

    popup.addEventListener('mouseleave', () => {
        popup.style.transform = 'scale(1) translateY(0)';
        popup.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.1)';
    });
}

// Populate the monthly calendar for the student
function populateCalendar(rollNo, month = currentMonth, year = currentYear) {
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = '';

    // Add navigation controls if they don't exist
    if (!document.getElementById('calendar-controls')) {
        const controls = document.createElement('div');
        controls.id = 'calendar-controls';
        controls.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            gap: 15px;
        `;
        
        const prevButton = document.createElement('button');
        prevButton.onclick = previousMonth;
        prevButton.innerHTML = `
            <i class="fas fa-chevron-left"></i>
            Previous
        `;
        prevButton.style.cssText = `
            background: linear-gradient(135deg, #3498DB 0%, #2980B9 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                background: linear-gradient(135deg, #2980B9 0%, #2573a7 100%);
            }
            &:active {
                transform: translateY(0);
            }
        `;

        const monthYearDisplay = document.createElement('span');
        monthYearDisplay.id = 'current-month-year';
        monthYearDisplay.style.cssText = `
            font-weight: bold;
            font-size: 1.2em;
            color: #2C3E50;
            min-width: 200px;
            text-align: center;
        `;

        const nextButton = document.createElement('button');
        nextButton.onclick = nextMonth;
        nextButton.innerHTML = `
            Next
            <i class="fas fa-chevron-right"></i>
        `;
        nextButton.style.cssText = prevButton.style.cssText;

        controls.appendChild(prevButton);
        controls.appendChild(monthYearDisplay);
        controls.appendChild(nextButton);
        calendarGrid.parentElement.insertBefore(controls, calendarGrid);
    }

    updateMonthYearDisplay();

    const student = studentsData[rollNo];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create grid layout for calendar
    calendarGrid.style.display = 'grid';
    calendarGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendarGrid.style.gap = '5px';
    calendarGrid.style.padding = '10px';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        calendarGrid.appendChild(dayHeader);
    });

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    // Add calendar days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(year, month, i);
        const formattedDate = day.toISOString().split('T')[0];
        const holidayInfo = isHoliday(formattedDate);
        const attendanceStatus = !holidayInfo ? (student.attendance.find(entry => entry.date === formattedDate)?.status || "Absent") : "Holiday";

        const dayCell = document.createElement("div");
        dayCell.style.padding = "10px";
        dayCell.style.textAlign = "center";
        dayCell.style.borderRadius = "5px";
        dayCell.style.cursor = holidayInfo ? "pointer" : "pointer";
        dayCell.style.position = "relative";
        dayCell.style.transition = "all 0.3s ease";

        // Highlight Sundays
        if (day.getDay() === 0) { // 0 represents Sunday
            dayCell.style.backgroundColor = "#FFCCCB"; // Light red background for Sundays
            dayCell.style.color = "#2C3E50"; // Dark text color for contrast
            dayCell.innerHTML = `<div>${i}</div><div style="font-size: 0.8em;">Sunday</div>`;
            
            // Add click event for Sundays to show a popup
            dayCell.addEventListener("click", () => {
                alert("It's a Sunday!");
            });
        } else if (holidayInfo) {
            dayCell.style.background = createHolidayPattern();
            dayCell.style.color = "#2C3E50";
            dayCell.title = holidayInfo.name;
            dayCell.innerHTML = `<div>${i}</div><div style="font-size: 0.8em;">Holiday</div>`;
            
            // Add click event for holiday popup with improved positioning
            dayCell.addEventListener("click", (e) => {
                const rect = dayCell.getBoundingClientRect();
                const popupX = rect.left + window.scrollX;
                const popupY = rect.bottom + window.scrollY + 5;
                showHolidayPopup(holidayInfo, popupX, popupY);
                e.stopPropagation(); // Prevent event bubbling
            });

            // Add hover effect for holidays
            dayCell.addEventListener("mouseover", () => {
                dayCell.style.transform = "scale(1.1)";
                dayCell.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            });
            
            dayCell.addEventListener("mouseout", () => {
                dayCell.style.transform = "scale(1)";
                dayCell.style.boxShadow = "none";
            });
        } else {
            dayCell.style.backgroundColor = attendanceStatus === "Present" ? "#27AE60" : "#E74C3C";
            dayCell.style.color = "white";
            dayCell.innerHTML = `<div>${i}</div><div style="font-size: 0.8em;">${attendanceStatus}</div>`;
            
            dayCell.addEventListener("click", () => {
                toggleAttendance(rollNo, formattedDate);
            });

            // Add hover effect for attendance cells
            dayCell.addEventListener("mouseover", () => {
                dayCell.style.transform = "scale(1.1)";
                dayCell.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            });
            
            dayCell.addEventListener("mouseout", () => {
                dayCell.style.transform = "scale(1)";
                dayCell.style.boxShadow = "none";
            });
        }

        calendarGrid.appendChild(dayCell);
    }
}

// Profile dropdown functionality
const profileLink = document.getElementById('profile-link');
const dropdown = document.getElementById('profile-dropdown');

// Initially hide dropdown
dropdown.style.display = 'none';

// Toggle dropdown on click
profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    const isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';
    dropdown.style.opacity = isVisible ? 0 : 1;
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileLink.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
        dropdown.style.opacity = 0;
    }
});

// Toggle menu functionality (hamburger)
const menuToggle = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});
