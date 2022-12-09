function relativeDays(timestamp) {
    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    });
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / oneDayInMs,
    );
  
    return rtf.format(daysDifference, 'day');
  }
  export default relativeDays
  // (Today is 22nd Jan, 2022
  
