export interface LoginResponse {
    token: string;
    refresh_token:  string;
    role:  string;
    region:  number;
    province: number;
    commune: number;
}
