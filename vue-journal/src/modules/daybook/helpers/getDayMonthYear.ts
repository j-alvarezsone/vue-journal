import { ref } from 'vue';

const months = ref<string[]>([
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'Julie',
  'August',
  'September',
  'October',
  'November',
  'December',
]);
const days = ref<string[]>(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

const getDateMonthYear = (dateString: string) => {
  const date = new Date(dateString);

  return {
    day: date.getDate(),
    month: months.value[date.getMonth()],
    year: `${date.getFullYear()}, ${days.value[date.getDay()]}`,
  };
};

export default getDateMonthYear;
