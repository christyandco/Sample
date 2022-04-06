import axios from 'axios';
import { ITicket } from '@components/shared/ticket';
import { IComment } from '@components/shared/comment';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

class TicketService {
  public async createTicket(data: ITicket) {
    const formData = new FormData();
    formData.append('summary', data.summary);
    formData.append('description', data.description);
    formData.append('appId', data.appCode);
    if (data.plantId) {
      formData.append('plantId', data.plantId);
    }

    if (data.plantName) {
      formData.append('plantName', data.plantName);
    }

    formData.append('status', data.status);
    formData.append('category', data.category);
    formData.append('priority', data.priority);
    data.files?.forEach((file) => {
      formData.append('attachments', file);
    });

    const res = await axios.post(baseUrl + '/tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  }

  public async editTicket(data: ITicket) {
    const formData = new FormData();
    formData.append('summary', data.summary);
    formData.append('description', data.description || '');
    formData.append('appId', data.appCode);
    formData.append('status', data.status);
    formData.append('category', data.category);
    formData.append('priority', data.priority);
    data.files?.forEach((file) => {
      formData.append('attachments', file);
    });

    const res = await axios.put(
      baseUrl + `/tickets/${data.ticketId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res.data;
  }

  public async addComment(data: IComment) {
    const res = await axios.post(
      baseUrl + `/tickets/${data.ticketId}/comments`,
      {
        comments: data.comment,
      }
    );
    return res.data;
  }
}

export default new TicketService();
