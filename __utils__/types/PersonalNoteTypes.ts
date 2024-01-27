export interface IPersonalNotesResponse {
    id?: number
    name: string  
    type: string
    note: string
    task_id: number
    correspondenceEmailAddress: string
    createdBy: string
    createdOn: string
    modifiedBy?: string
    modifiedOn?: string
}

export interface IPersonalNotesRootProperties {
  name: string
  type: string
  note: string
}