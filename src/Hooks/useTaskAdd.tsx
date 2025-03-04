import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../constants";


const useTaskAdd = () => {
  const TaskAddFun = useCallback(async (workerId: number | null) => {
    if (!workerId) {
      toast.error("Sizning ID yingiz topilmadi");
      return;
    }

    try {
      const response = await axios.post(`${APIURL}/tasks/add`, {
        worker_id: workerId,
      });
      console.log("response task", response);
      toast.success("Task muvaffaqiyatli qo‘shildi! 🎉");
    } catch (error) {
      console.error("Error task", error);
      toast.error("Xatolik! Task qo‘shishda hatolik yuz berdi ❌");
    }
  }, []);

  return TaskAddFun;
};

export default useTaskAdd;
