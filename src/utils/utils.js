const getNext10WorkingDays = () => {
    const workingDays = [];
    let date = new Date();

    while (workingDays.length < 10) {
        date.setDate(date.getDate() + 1); // Move to the next day
        const dayOfWeek = date.getDay();

        // 0 = Sunday, 6 = Saturday
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workingDays.push({
                day: date.toLocaleString('en-US', { weekday: 'long' }), // e.g., "Monday"
                date: date.getDate(), // Day of the month
                month: date.toLocaleString('en-US', { month: 'long' }), // e.g., "January"
                year: date.getFullYear() // Full year
            });
        }
    }

    return workingDays;
};

const createTimeArray =() =>{
    const startTime = new Date();
    startTime.setHours(10, 0, 0); // 10:00 AM

    const endTime = new Date();
    endTime.setHours(16, 0, 0); // 04:00 PM
    const timeArray = [];
    let current = startTime;

    while (current <= endTime) {
        timeArray.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        current.setHours(current.getHours() + 1);
    }

    return timeArray;
}


const formatDate = (currentDate) => {
    const date = new Date(currentDate);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return formattedDate
}



export { getNext10WorkingDays, createTimeArray, formatDate };
