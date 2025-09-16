import _ from "lodash";
function priceFixed(value, precision) {
  return parseFloat(
    Math.round(+(value?.toFixed(precision + 1) + 'e' + precision)) +
    'e-' +
    precision,
  );
}

export const formatVndPrice = (value) => {
  const price =
    value !== undefined
      ? `${priceFixed(value, 0).toFixed(0)} đ`.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )
      : "0 đ";
  return price;
};

export const formatDollarPrice = (value) => {
  const price =
    value !== undefined
      ? `$${priceFixed(value, 2).toFixed(2)}`.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )
      : "$0.00";
  return price;
}

export const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{9,10}$/;
  return phoneRegex.test(phone);
};

export const formatNumber = (num) => {
  if (num == 0 || num == '0' || num == null || num == undefined) {
    return '0';
  }
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else {
    return num.toString();
  }
}

export const formatLargeVndPrice = (value) => {
  if (value === undefined || value === null) {
    return "0 đ";
  }

  const units = ["đ", "K", "M", "B", "T"];
  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1000 && unitIndex < units.length - 1) {
    scaledValue /= 1000;
    unitIndex++;
  }

  const formattedValue = scaledValue.toFixed(0).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return `${formattedValue}${units[unitIndex]}`;
};

export const formatLargeNumber = (num) => {
  return num > 100 ? '99+' : num;
}

export const DATE_MMYY = (text = '') => {
  const cleanText = text.replace(/\D+/g, '');

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(0) === '0') {
    secondDigitMonthMask = /[1-9]/;
  } else if (cleanText.charAt(0) === '1') {
    secondDigitMonthMask = /[012]/;
  }

  return [
    /[0-1]/,
    secondDigitMonthMask,
    '/',
    /\d/,
    /\d/,
  ];
};

export const maskCardNumber = (number) => {
  // Convert number to string if it is not already
  const numStr = number.toString();

  // Separate the part to be masked and the part to be shown
  const visiblePart = numStr.slice(-5);
  const maskedPart = numStr.slice(0, -5).replace(/\d/g, '•');

  // Combine the masked part with the visible part
  const maskedNumber = maskedPart + visiblePart;

  // Add spaces between every 4 characters
  const maskedWithSpaces = maskedNumber.replace(/(.{4})/g, '$1 ');

  // Trim any trailing space
  return maskedWithSpaces.trim();
}