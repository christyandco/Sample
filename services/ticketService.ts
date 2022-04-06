import axios from 'axios';
import { ITicket } from '@components/shared/ticket';
import myData from './../data/db.json';
const baseUrl = 'http://localhost:8000' || '';

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

  public async editTicket(data1) {
    const formData = new FormData();
    formData.append('machineLogStatus', 'Approved');
    alert(formData.machineLogStatus);

    const res = await axios.patch(baseUrl + `/data/${data1}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      /*  data: {
        machineLogStatus: 'Approved',
      },*/
    });

    return res.data;
  }

  public async addComment(data2) {
    const res = await axios.post(baseUrl + `/checklist/${data2}`, {
      defaultSelected: 'Y',
    });
    return res.data;
  }
}

export default new TicketService();
