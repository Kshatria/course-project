
type OperationAddFormSentProps = {
  amount: number
  category: string
  commandId: string;
  created_at: string;
  createdAt:string
  date: string;
  desc: string;
  name: string;
  type: 'Cost' | 'Profit';
  updatedAt:string;
}

type OperationAddFormProps = {
  closeFN: () => void;
}


export type { OperationAddFormProps,OperationAddFormSentProps  };
