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
    const formData = new FormData();
    const myJson;
    formData.append('defaultSelected', 'Y');

    axios.put(baseUrl + `/checklist?plantId=323/defaultSelected`, {
      defaultSelected: 'Y',
    });
    /*const res = await axios.post(
      baseUrl + `/checklist?plantId=323/defaultSelected`,
      {
        defaultSelected: 'Y',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res;*/
  }
}

export default new DataServices();
