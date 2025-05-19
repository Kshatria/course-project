type CategoryAddFormSentProps = {
  commandId: string;
  created_at: string;
  id: string;
  name: string;
  photo?: string;
  updated_at: string;
};

type CategoryAddFormProps = {
  closeFN: () => void;
};

export type { CategoryAddFormProps, CategoryAddFormSentProps };
