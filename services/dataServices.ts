import axios from 'axios';
import { ITicket } from '@components/shared/ticket';
import myData from './../data/db.json';
const baseUrl = 'http://localhost:8000' || '';

class DataServices {
  public async updateConfirm(data1) {
    const res = await axios.post(baseUrl + `/data1/${data1}`, {
      machineLogStatus: 'Approved',
    });

    return res.data;
  }

  public async addDefault(data2) {
    let params = {
      checklistId: 3453646,
      checklistName: 'Demo_Chk1',
      defaultSelected: 'Y',
      id: 323,
    };

    let res = await axios.post('http://localhost:8000/checklist?323/', params);
  }
}

export default new DataServices();
