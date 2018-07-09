// HELPERS - index.js

export const formatDate = function(date) {
  if (!date) {
    return "";
  }
  
  const dateOptions = { 
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  if (typeof date === "string") {
    date = new Date(date);
  }
  
  return date.toLocaleDateString("en-US", dateOptions);
};
