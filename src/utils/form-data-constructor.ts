// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formDataBuilder(data: Record<string, any>) {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key].toString());
    }
  }

  return formData;
}
