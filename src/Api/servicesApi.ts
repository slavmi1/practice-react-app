import api from "./api";

import type { Service } from "../Components/Pages/Services/types";

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>("/services");

  return response.data;
};
