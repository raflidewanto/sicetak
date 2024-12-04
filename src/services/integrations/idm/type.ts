export type ValidateTokenRequestBody = {
  username: string,
  user_type: number, // 2
  datetime: string,
  signature: string
};

export type AuthorizeResponse = {
  authorize: boolean,
  token: string,
  need_reset_password: boolean
}

export type LoginPayload = {
  username: string;
  password: string;
  ip: string;
  user_type: number;
  device: string;
  os: string;
  browser: string;
  device_id: string;
  datetime: string;
  signature: string;
};

export interface LoginResponse {
  force_reset_password: number;
  user_code: string;
  token: string;
  roles: Role[];
  menus: Menu[];
  is_internal_network: boolean;
}

interface Menu {
  menu_id: number;
  menu_code: string;
  menu_name: string;
  menu_description: string;
  menu_priority: number;
  url: string;
  app_code: string;
  sub_menu?: Submenu2[];
}

interface Submenu2 {
  menu_id: number;
  menu_code: string;
  menu_name: string;
  menu_description: string;
  menu_priority: number;
  url: string;
  app_code: string;
  sub_menu?: Submenu[];
}

interface Submenu {
  menu_id: number;
  menu_code: string;
  menu_name: string;
  menu_description: string;
  menu_priority: number;
  url: string;
  app_code: string;
  sub_menu?: any;
}

interface Role {
  role_id: number;
  role_code: string;
  role_name: string;
}