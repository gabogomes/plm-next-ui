export interface ITasksResponse {
    id?: number
    name: string  
    status: string
    type: string
    correspondenceEmailAddress: string
    createdBy: string
    createdOn: string
    modifiedBy?: string
    modifiedOn?: string
}

export interface ITaskRootProperties {
  name: string
  status: string
  type: string
}