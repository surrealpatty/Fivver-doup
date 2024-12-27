// src/services.ts

interface Service {
  id: number;
  name: string;
}

export const createService = async (serviceData: {
  name: string;
}): Promise<Service> => {
  return { id: 1, name: serviceData.name };
};

export const getServices = async (): Promise<Service[]> => {
  return [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
  ];
};
