export interface BaseModel {
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export const BaseModelField = {
  is_active: 'is_active' ,
  created_at: 'created_at', 
  updated_at: 'updated_at',
} as const;