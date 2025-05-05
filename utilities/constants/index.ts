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
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInSeconds = Math.floor(
    (now.getTime() - notificationTime.getTime()) / 1000
  );

  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}
