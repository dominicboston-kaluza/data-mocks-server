export type DefaultScenario =
  | Mock[]
  | {
      context?: Context;
      mocks: Mock[];
    };

export type Scenario =
  | Mock[]
  | {
      group?: string;
      context?: Context;
      mocks: Mock[];
    };

export type ScenarioMap = {
  [scenario: string]: Scenario;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type Override<TResponse> = {
  __override: ResponseProps<TResponse>;
};

export type ResponseFunction<TInput, TResponse> = (
  input: TInput & {
    updateContext: UpdateContext;
    context: Context;
  },
) => TResponse | Override<TResponse> | Promise<TResponse | Override<TResponse>>;

export type MockResponse<TInput, TResponse> =
  | TResponse
  | ResponseFunction<TInput, TResponse>;

type HttpResponse = Record<string, any> | string | null;

export type ResponseProps<TResponse> = {
  response?: TResponse;
  responseCode?: number;
  responseHeaders?: Record<string, string>;
  responseDelay?: number;
};

export type HttpMock = {
  url: string | RegExp;
  method: HttpMethod;
} & ResponseProps<
  MockResponse<
    {
      query: Record<string, string | Array<string>>;
      body: Record<string, any>;
      params: Record<string, string>;
    },
    HttpResponse
  >
>;

type GraphQlResponse = {
  data?: null | Record<string, any>;
  errors?: Array<any>;
};

export type Operation = {
  type: 'query' | 'mutation';
  name: string;
} & ResponseProps<
  MockResponse<
    {
      variables: Record<string, any>;
    },
    GraphQlResponse | HttpResponse
  >
>;

export type GraphQlMock = {
  url: string;
  method: 'GRAPHQL';
  operations: Array<Operation>;
};

export type Mock = HttpMock | GraphQlMock;

export type Options = {
  port?: number;
  uiPath?: string;
  modifyScenariosPath?: string;
  resetScenariosPath?: string;
  scenariosPath?: string;
  cookieMode?: boolean;
};

export type Context = Record<string, any>;
export type PartialContext = Context | ((context: Context) => Context);

export type UpdateContext = (partialContext: PartialContext) => Context;

export type GetContext = () => Context;

export type UiGroups = Array<{
  name: string;
  noneChecked: boolean;
  scenarios: Array<{
    name: string;
    checked: boolean;
  }>;
}>;

export type Groups = Array<{
  name: string;
  scenarios: Array<{
    id: string;
    selected: boolean;
  }>;
}>;

export type CookieValue = {
  context: Context;
  scenarios: string[];
};
