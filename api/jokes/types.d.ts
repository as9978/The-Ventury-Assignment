interface IResponse {
  type: string;
  value: {
    id: number;
    joke: string;
    categories: string[];
  };
}
