export interface UserModel {
    id: number;
    name: string;
    first_name: string;
    last_name?: any;
    sex?: any;
    status?: any;
    is_online: boolean;
    thumb?: any;
    _thumbSrc?: any;
    last_activity: number;
    last_activity_dt: string;
    city_id?: any;
    postcode?: any;
    street?: any;
    about?: any;
    complement?: any;
    number?: any;
    district?: any;
    phone?: any;
    cellphone?: any;
    skype?: any;
    email: string;
    birthday?: any;
    occupation?: any;
    notification: boolean;
    confirmed_at?: any;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    acl?: any;
}
