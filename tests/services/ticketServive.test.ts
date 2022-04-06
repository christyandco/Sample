import { ITicket } from '@components/shared/ticket';
import mockApi from '../mock-api';
import ticketService from '@services/ticketService';
import { IComment } from '@components/shared/comment';

describe('Ticket Service', () => {
  afterAll(() => {
    mockApi.reset();
  });
  it('Check the create ticket', async () => {
    mockApi.getMock().onPost('/tickets').reply(200, {
      ticketId: 'PTF-63',
      id: '2-398',
      summary: 'summary',
      description: null,
      appCode: '',
      applicationName: null,
      category: null,
      priority: null,
      status: null,
      createdByUser: null,
      createdDate: null,
      updatedDate: null,
      plantId: null,
      plantName: null,
      files: [],
      comments: [],
    });
    const ticket: ITicket = {
      appCode: 'app1',
      applicationName: 'Tool',
      category: 'Bug',
      priority: 'Normal',
      status: 'Reopened',
      summary: 'CXCXCXCXCXCXCXCXCXCXC',
      description: '<p>No comments for this ticket</p>',
      files: [],
    };

    const data = await ticketService.createTicket(ticket);
    expect(data.ticketId).not.toBeNull();
  });

  it('Check the create ticket with plant details.', async () => {
    mockApi.getMock().onPost('/tickets').reply(200, {
      ticketId: 'PTF-63',
      id: '2-398',
      summary: 'summary',
      description: null,
      appCode: '',
      applicationName: null,
      category: null,
      priority: null,
      status: null,
      createdByUser: null,
      createdDate: null,
      updatedDate: null,
      plantId: null,
      plantName: null,
      files: [],
      comments: [],
    });
    const ticket = {
      appCode: 'app1',
      applicationName: 'Tool',
      category: 'Bug',
      priority: 'Normal',
      plantId: 'plantid',
      plantName: 'plantname',
      status: 'Reopened',
      summary: 'CXCXCXCXCXCXCXCXCXCXC',
      description: '<p>No comments for this ticket</p>',
      files: [
        {
          filename: 'name',
        },
      ],
    };

    const data = await ticketService.createTicket(ticket as ITicket);
    expect(data.ticketId).not.toBeNull();
  });

  it('Check edit ticket.', async () => {
    mockApi.getMock().onPut('/tickets/PTF-63').reply(200, {
      ticketId: 'PTF-63',
      id: '2-398',
      summary: 'summary',
      description: null,
      appCode: '',
      applicationName: null,
      category: null,
      priority: null,
      status: null,
      createdByUser: null,
      createdDate: null,
      updatedDate: null,
      plantId: null,
      plantName: null,
      files: [],
      comments: [],
    });

    const ticket = {
      ticketId: 'PTF-63',
      appCode: 'app1',
      applicationName: 'Tool',
      category: 'Bug',
      priority: 'Normal',
      status: 'Reopened',
      summary: 'CXCXCXCXCXCXCXCXCXCXC',
      description: '<p>No comments for this ticket</p>',
      files: [
        {
          filename: 'name',
        },
      ],
    };

    const data = await ticketService.editTicket(ticket as ITicket);
    expect(data.ticketId).not.toBeNull();
  });

  it('Check edit ticket without description.', async () => {
    mockApi.getMock().onPut('/tickets/PTF-63').reply(200, {
      ticketId: 'PTF-63',
      id: '2-398',
      summary: 'summary',
      description: null,
      appCode: '',
      applicationName: null,
      category: null,
      priority: null,
      status: null,
      createdByUser: null,
      createdDate: null,
      updatedDate: null,
      plantId: null,
      plantName: null,
      files: [],
      comments: [],
    });

    const ticket = {
      ticketId: 'PTF-63',
      appCode: 'app1',
      applicationName: 'Tool',
      category: 'Bug',
      priority: 'Normal',
      status: 'Reopened',
      summary: 'CXCXCXCXCXCXCXCXCXCXC',
      files: [
        {
          filename: 'name',
        },
      ],
    };

    const data = await ticketService.editTicket(ticket as ITicket);
    expect(data.ticketId).not.toBeNull();
  });

  it('Check add comment', async () => {
    mockApi.getMock().onPost('/tickets/PTF-63/comments').reply(200, {
      commentId: '4-311',
      comments: '@Libin Babu: <p>New comment</p>',
      ticketId: 'PTF-63',
      author: 'user_slowimo_customer',
    });

    const comment: IComment = {
      comment: 'New Comment',
      ticketId: 'PTF-63',
      createdBy: '',
      createdDate: new Date(),
    };

    const data = await ticketService.addComment(comment);
    expect(data.id).not.toBeNull();
  });
});
