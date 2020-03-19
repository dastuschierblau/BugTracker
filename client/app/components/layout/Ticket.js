import React from 'react';
import Navbar from './Navbar';

class Ticket extends React.Component {
  componentDidMount() {
    const { ticketId } = this.props.match.params;

    //this.props.getTicket(ticketId);
  }

  render() {
    return (
      <Navbar>
        <div>TICKET: {JSON.stringify(this.props.match.params.ticketId)}</div>
      </Navbar>
    );
  }
}

export default Ticket;
