export interface ExecutorBundle {
  collections: string[];
  actions: string[];
}

export interface IExecutor {
  collection: string;
  action: string;
  query: string;
  body: string;
  params: string;
  spec_field?: string;
}
