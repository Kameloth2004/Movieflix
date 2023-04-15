
type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER'

export type TokenData = {
    exp: number
    user_name: string
    authorities: Role[]
  };