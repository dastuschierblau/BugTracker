export default function getChartData(data) {
  const statusData = getStatuses(data);
  const historyData = getHistory(data);

  return {
    statusData,
    historyData
  };
}

function getHistory(data) {
  // Output will be an object with keys = dates, values = #entries for that date
  let results = {};

  // Get last 10 days from current date in millisecond format:
  let endDate = new Date();
  endDate = Date.parse(endDate);

  let startDate = endDate - 864000000;

  // History: { time, _id, user, desciption }
  // 'time' property is a date string.

  // inRangeHistory -> an array of timestamps belonging to only history entries in 10 day range
  let inRangeHistory = data
    .map(item => item.history)
    .map(entry => {
      return entry.map(time => time.time);
    })
    .reduce((group, item) => {
      group.push(...item);
      return group;
    }, [])
    .filter(item => {
      let milli = Date.parse(item);

      if (startDate <= milli && milli <= endDate) {
        return item;
      }
    })
    .sort()
    .map(item => {
      let date = new Date(item),
        month = date.getMonth(),
        day = date.getDate();

      return {
        month,
        day
      };
    })
    .reduce((group, item) => {
      let property = `${item.month + 1}/${item.day}`;

      group[property] ? group[property]++ : (group[property] = 1);
      return group;
    }, results);

  console.log(inRangeHistory);

  return results;
}

function getStatuses(data) {
  let status = data
    .map(ticket => ticket.status)
    .reduce((group, item) => {
      group[item] ? group[item]++ : (group[item] = 1);
      return group;
    }, {});

  return status;
}

/*
let dateStr = "2020-03-07T17:25:28.066Z";
let date = new Date(dateStr);
console.log(date);
*/
