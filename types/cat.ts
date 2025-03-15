export interface Cat {
    id: string;
    name: string;
    description: string;
    life_span: string;
    origin: string;
    image?: {
      url: string;
    };
  }