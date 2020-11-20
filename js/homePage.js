let empList;
window.addEventListener('DOMContentLoaded', (event) => {
  empList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empList.length;
  createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
  const headerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
  </tr>`;
  let innerHtml = ` ${headerHtml}`;
  for (const employee of empList) {
    innerHtml = `${innerHtml}
        <tr>
          <td><img class="profile" src="${employee._profilePic}" alt = ""></td>
          <td>${employee._name}</td>
          <td>${employee._gender}</td>
          <td>${getDeptHtml(employee._department)}</td>
          <td>${employee._salary}</td>
          <td>${employee._startDate}</td>
          <td>
          <img name="${employee._id}" onclick="remove(this)" alt="delete" 
                  src="../assets/icons/delete-black-18dp.svg">
          <img name="${employee._id}" onclick="update(this)" alt="edit" 
                  src="../assets/icons/create-black-18dp.svg">
          </td>
        </tr>`;
  };
  document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (departmentList) => {
  let deptHtml = ``;
  for (const dept of departmentList) {
    deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
  }
  return deptHtml;
}