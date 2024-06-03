export interface GetTypesResponse {
    success: boolean,
    status_code: number,
    message: string,
    data: [
        {
            id: number,
            ref_id: number,
            operator_id: number,
            operator_name: string,
            name: string,
            format_form: string
        }
    ]
}