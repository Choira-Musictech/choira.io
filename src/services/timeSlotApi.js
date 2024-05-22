
import fileDownload from "js-file-download";
import api from "./api"

class slotapi{
  
 getonlyStudio = async () => {
  

  const response = await api.get(`/studios`, {
    
  });
  console.log("res ===>", response.data)
  return response.data;
 };

 getAllSolts = async (slotData) => {
  let {studioId,roomId,bookingDate,bookingHours} = slotData
  

  const response = await api.post(`/bookings/availability-check`, {
    studioId,roomId,bookingDate,bookingHours
  });
  console.log("res ===>", response.data)
  return response.data;
 };


 



}






export default new slotapi();

