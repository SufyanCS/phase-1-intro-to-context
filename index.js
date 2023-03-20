// Your code here
function createEmployeeRecord ([firstName, familyName, title, payRate]) {
    return {
    firstName,
    familyName,
    title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: []
    }
}
function createEmployeeRecords(arrays) {
    return (
        arrays.map(createEmployeeRecord)
    )
}

function createTimeInEvent(record, dateTime) {
    const [date, hour] = dateTime.split(" ")
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return (record)
}

function createTimeOutEvent(record, dateTime) {
    const [date, hour] = dateTime.split(" ")
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return(record)
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(event => event.date === date)
    const timeOut = record.timeOutEvents.find(event => event.date === date)
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return (hoursWorked)
}

function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date)
    const payOwed = hoursWorked * record.payPerHour

    return (payOwed)
}

function allWagesFor(record) {
    const dates = record.timeInEvents.map(event => event.date)
    const wages = dates.map(date => wagesEarnedOnDate(record, date))
    const totalWages = wages.reduce((acc, curr) => acc + curr, 0)

    return (totalWages)
}

function calculatePayroll(records) {
    const allWages = records.map(record => allWagesFor(record))
    const totalPayroll = allWages.reduce((acc, curr) => acc + curr, 0)

    return(totalPayroll)
}