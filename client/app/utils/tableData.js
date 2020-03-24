export const historyTableData = (ticket, userNames) => {
  return {
    columns: [
      {
        label: 'User',
        field: 'user',
        sort: 'asc'
      },
      {
        label: 'Description',
        field: 'desc',
        sort: 'asc'
      },
      {
        label: 'Time',
        field: 'time',
        sort: 'asc'
      }
    ],
    rows: ticket.history.map(item => {
      return {
        user: userNames[item.user],
        desc: item.description,
        time: item.time
      };
    })
  };
};

export const commentTableData = (ticket, userNames) => ({
  columns: [
    {
      label: 'User',
      field: 'user',
      sort: 'asc'
    },
    {
      label: 'Comment',
      field: 'text'
    },
    {
      label: 'Time',
      field: 'time',
      sort: 'asc'
    }
  ],
  rows: ticket.comments.map(item => {
    return (
      <tr key={item._id}>
        <td>{userNames[item.user]}</td>
        <td>{item.text}</td>
        <td>
          {' '}
          <Moment format='MM/DD/YYYY, h:mm a'>{item.date}</Moment>
        </td>
      </tr>
    );
  })
});
