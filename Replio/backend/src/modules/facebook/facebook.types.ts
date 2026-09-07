export interface FacebookOAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  category_list: Array<{
    id: string;
    name: string;
  }>;
}

export interface FacebookPagesResponse {
  data: FacebookPage[];
  paging?: {
    cursors?: {
      after?: string;
      before?: string;
    };
  };
}

export interface FacebookPageDetails {
  id: string;
  name: string;
  category: string;
  picture?: {
    data: {
      url: string;
    };
  };
}
