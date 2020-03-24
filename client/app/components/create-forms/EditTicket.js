import React from 'react';

export default function EditTicket({
  handleChange,
  toggle,
  handleSubmit,
  values,
  users: { users, idToName }
}) {
  const { category, priority, status, assignedTo, description } = values;
  const keys = Object.keys(idToName);

  return (
    <div className='row mb-5'>
      <div className='col-lg-8 m-auto mb-4'>
        <div className='card shadow'>
          <div className='card-header bg-gradient-purple d-flex justify-content-between'>
            Edit Ticket:
            <i onClick={toggle} className='fas fa-window-close fa-2x'></i>
          </div>
          <div className='card-body'>
            <form action='post'>
              <div className='form-group d-flex justify-content-between'>
                <label>Category:</label>
                <select
                  onChange={e => handleChange(e)}
                  name='category'
                  value={category.current}
                >
                  <option name='category' value='UI'>
                    UI
                  </option>
                  <option name='category' value='Routing'>
                    Routing
                  </option>
                  <option name='category' value='Backend'>
                    Backend
                  </option>
                  <option name='category' value='Redux'>
                    Redux
                  </option>
                  <option name='category' value='UX'>
                    UX
                  </option>
                </select>
              </div>
              <div className='form-group d-flex flex-column'>
                <label>Description:</label>
                <textarea
                  name='description'
                  cols='30'
                  rows='5'
                  onChange={e => handleChange(e)}
                  name='description'
                  value={description.current}
                ></textarea>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <label>Assigned To:</label>
                <select
                  name='assignedTo'
                  onChange={e => handleChange(e)}
                  value={assignedTo.current}
                >
                  {keys.map((item, ind) => {
                    return (
                      <option key={ind} value={item}>
                        {idToName[item]}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <label>Status:</label>
                <select
                  name='status'
                  value={status.current}
                  onChange={e => handleChange(e)}
                >
                  <option value='Open'>Open</option>
                  <option value='In progress'>In Progress</option>
                  <option value='Pending'>Pending Review</option>
                  <option value='Stuck'>Stuck</option>
                  <option value='Done'>Done</option>
                </select>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <label>Priority</label>
                <select
                  name='priority'
                  value={priority.current}
                  onChange={e => handleChange(e)}
                >
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
              <input
                type='submit'
                className='btn btn-success'
                value='Submit'
                onClick={e => handleSubmit(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
