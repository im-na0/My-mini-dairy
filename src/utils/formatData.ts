export function formatDate(dateString?: Date | undefined) {
  const createdAtDate = new Date(dateString ? dateString : new Date());

  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const month = monthArray[createdAtDate.getMonth()];
  const day = dayArray[createdAtDate.getDay()];
  let iDate = createdAtDate.getDate();
  const date = iDate < 10 ? `0${iDate}` : `${iDate}`;
  return { month, day, date };
}

export function formatDayTime(dateString?: Date | undefined) {
  const createdAtDate = new Date(dateString ? dateString : new Date());
  const year = createdAtDate.getFullYear().toString().substring(2);
  const month = (createdAtDate.getMonth() + 1).toString().padStart(2, "0");
  const date = createdAtDate.getDate().toString().padStart(2, "0");
  const hours = createdAtDate.getHours().toString().padStart(2, "0");
  const minutes = createdAtDate.getMinutes().toString().padStart(2, "0");

  return { year, month, date, hours, minutes };
}
