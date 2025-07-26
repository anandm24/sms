// Load teacher dropdown
async function loadTeachers() {
  const res = await fetch('http://localhost:5000/api/teachers');
  const data = await res.json();
  const select = document.getElementById('teacherSelect');
  data.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t._id;
    opt.textContent = t.name;
    select.appendChild(opt);
  });
}

// Submit attendance
document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const teacher = document.getElementById('teacherSelect').value;
  const date = document.getElementById('date').value;
  const status = document.getElementById('status').value;

  const res = await fetch('http://localhost:5000/api/attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teacher, date, status })
  });

  if (res.ok) {
    alert('Attendance marked!');
    loadAttendance();
  } else {
    alert('Error marking attendance');
  }
});

// Load all attendance
async function loadAttendance() {
  const res = await fetch('http://localhost:5000/api/attendance');
  const data = await res.json();
  const list = document.getElementById('attendanceList');
  list.innerHTML = '';
  data.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.teacher.name} - ${a.date.slice(0,10)} - ${a.status}`;
    list.appendChild(li);
  });
}

loadTeachers();
loadAttendance();
