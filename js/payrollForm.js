window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });
});

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function () {
  output.textContent = salary.value;
});

const day = document.querySelector('#day');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const dateError = document.querySelector('.date-error');
[day, month, year].forEach(item => item.addEventListener('input', function () {
  if (month.value == 1) {
    if (isLeapYear(year.value)) {
      if (day.value > 29) {
        dateError.textContent = "Invalid Date!";
      } else dateError.textContent = "";
    } else {
      if (day.value > 28) {
        dateError.textContent = "Invalid Date!";
      } else dateError.textContent = "";
    }
  }
  if (month.value == 3 || month.value == 5 || month.value == 8 || month.value == 10) {
    if (day.value > 30) {
      dateError.textContent = "Invalid Date!";
    } else dateError.textContent = "";
  }
}));

const isLeapYear = (year) => {
  let result = false;
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {
        result = true;
      }
    } else {
      result = true;
    }
  }
  return result;
}

const save = () => {
  try {
    let employee = createEmployeePayroll();
    alert(employee);
  } catch (e) {
    alert(e);
  }
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    employeePayrollData.startDate = new Date(getInputValueById('#year'), getInputValueById('#month'),
      getInputValueById('#day'));
    return employeePayrollData;
  } catch (error) {
    throw error;
  }
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked)
      selItems.push(item.value);
  });
  return selItems;
}