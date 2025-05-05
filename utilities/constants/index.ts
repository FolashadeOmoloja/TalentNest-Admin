export const validationRules = {
  firstName: {
    required: "First Name is required",
  },
  lastName: {
    required: "Last Name is required",
  },
  title: {
    required: "Title is required",
  },
  fullname: {
    required: "Full name is required",
  },
  role: {
    required: "Role is required",
  },
  review: {
    required: "This is required",
  },
  question: {
    required: "This is required",
  },
  answer: {
    required: "This is required",
  },

  author: {
    required: "Author fullname is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  },
  mobileNo: {
    required: "Mobile No. is required",
    pattern: {
      value: /^[0-9]/,
      message: "Invalid phone number",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },
  accountRole: {
    required: "This is required",
  },
};

export function formatTimeDifference(timestamp: string): string {
  const date = new Date(timestamp);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${weekday} ${day}${daySuffix} ${month}, ${year}`;
}
