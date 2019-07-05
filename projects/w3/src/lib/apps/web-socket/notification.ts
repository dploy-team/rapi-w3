export class W3Notification {
    id?: number;
    type?: string;
    title?: string;
    message?: string;
    meta?: any;
    read_at?: string;
    created_at?: string;
    updated_at?: string;

    /**
     * Constructor
     *
     * @param obj
     */
    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id || null;
        this.type = obj.type || null;
        this.title = obj.title || null;
        this.message = obj.message || null;
        this.meta = obj.meta || null;
        this.read_at = obj.read_at || null;
        this.created_at = obj.created_at || null;
        this.updated_at = obj.updated_at || null;
    }
}
