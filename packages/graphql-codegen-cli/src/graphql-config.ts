import { loadConfig, GraphQLExtensionDeclaration, GraphQLConfig } from 'graphql-config';
import { CodeFileLoader, GraphQLFileLoader, JSONFileLoader, UrlLoader } from 'graphql-toolkit';

const CodegenExtension: GraphQLExtensionDeclaration = api => {
  // Schema
  api.loaders.schema.register(CodeFileLoader);
  api.loaders.schema.register(GraphQLFileLoader);
  api.loaders.schema.register(JSONFileLoader);
  api.loaders.schema.register(UrlLoader);
  // Documents
  api.loaders.documents.register(CodeFileLoader);
  api.loaders.documents.register(GraphQLFileLoader);

  // KAMIL: maybe we should let extensions return an array with schema and document loaders
  // instead of exposing an api for that

  return {
    name: 'graphql-codegen',
  };
};

export async function findAndLoadGraphQLConfig(filepath?: string): Promise<GraphQLConfig | void> {
  const config = await loadConfig({
    filepath,
    rootDir: process.cwd(),
    extensions: [CodegenExtension],
    throwOnEmpty: false,
    throwOnMissing: false,
  });

  return config;
}
