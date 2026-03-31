interface BaseResp {
  code: number
  success: boolean
  msg: string
}

interface Pagination {
  page: number
  pageSize: number
  total: number
}

export interface Result<T> extends BaseResp {
  data: T | null
}

export interface PageResult<T> extends BaseResp {
  data: T[] | []
  pagination: Pagination
}
