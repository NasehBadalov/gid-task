export interface IOpportunity {
  id: string;
  title: string;
  cover_photo: {
    url: string;
    filename: null;
  };
  programme: IProgram;
  location: string;
  description: string;
  branch: any;
  opportunity_duration_type: any;
}

export interface IPaging {
  total_items: number;
  current_page: number;
  total_pages: number;
}

export interface IProgram {
  id: string;
  short_name_display: string;
}
