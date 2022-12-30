export function getFullYear(d) {
  if (d instanceof Date) {
    return d.getFullYear();
  } else if (typeof d === "string" || typeof d === "number") {
    const date = new Date(d);
    return date.getFullYear();
  }
  return d;
}

export function getDate(d) {
  if (d instanceof Date) {
    return d.getDate();
  } else if (typeof d === "string" || typeof d === "number") {
    const date = new Date(d);
    return date.getDate();
  }
  return d;
}

export function getMonth(d) {
  const months_numeric = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  if (d instanceof Date) {
    return months_numeric[d.getMonth()];
  } else if (typeof d === "string" || typeof d === "number") {
    const date = new Date(d);
    return months_numeric[date.getMonth()];
  }
  return d;
}

export const formatDate = (dateString) => {
  if (typeof dateString === "string" || typeof dateString === "number") {
    try {
      const d = new Date(dateString);
      return getFullYear(d) + "-" + getMonth(d) + "-" + getDate(d);
    } catch (err) {
      return "";
    }
  }
  return "";
};
