import { GenerericTaskParam, GenericTaskGroup, BaseGeneratorDefinition } from '../base/tasks.mjs';
import { BaseApplication } from './types.mjs';

type Field = {
  fieldName: string;
  fieldType: string;
  fieldTypeBlobContent: string;
} & Record<string, any>;

type Relationship = {
  relationshipName: string;
} & Record<string, any>;

export type Entity = {
  fields: Field[];
  relationships: Relationship[];
} & Record<string, any>;

type ApplicationDefinition = {
  applicationType: BaseApplication;
  entityType: Entity;
};

type ConfiguringEachEntityTaskParam = {
  entityName: string;
  /** Entity storage */
  entityStorage: import('yeoman-generator/lib/util/storage');
  /** Proxy object for the entitystorage */
  entityConfig: Record<string, any>;
};

type LoadingEntitiesTaskParam = {
  entitiesToLoad: {
    entityName: string;
    /** Entity storage */
    entityStorage: import('yeoman-generator/lib/util/storage');
    /** Proxy object for the entitystorage */
    entityConfig: Record<string, any>;
  }[];
};

type ApplicationTaskParam<Definition extends ApplicationDefinition = GenerericTaskParam & ApplicationDefinition> = {
  application: Definition['applicationType'] & { user: Definition['entityType'] };
};

type EntitiesTaskParam<Definition extends ApplicationDefinition = ApplicationDefinition> = ApplicationTaskParam<Definition> & {
  entities: Definition['entityType'][];
};

type EachEntityTaskParam<Definition extends ApplicationDefinition = ApplicationDefinition> = ApplicationTaskParam<Definition> & {
  entity: Definition['entityType'];
  entityName: string;
  description: string;
};

export type BaseApplicationGeneratorDefinition<Definition extends ApplicationDefinition = ApplicationDefinition> = BaseGeneratorDefinition &
  Record<
    | 'loadingTaskParam'
    | 'preparingTaskParam'
    | 'writingTaskParam'
    | 'postWritingTaskParam'
    | 'preConflictsTaskParam'
    | 'installTaskParam'
    | 'postInstallTaskParam'
    | 'endTaskParam',
    ApplicationTaskParam<Definition>
  > &
  Record<'defaultTaskParam' | 'writingEntitiesTaskParam' | 'postWritingEntitiesTaskParam', EntitiesTaskParam<Definition>> & {
    applicationType: Definition['applicationType'];
    configuringEachEntityTaskParam: ConfiguringEachEntityTaskParam & GenerericTaskParam & ApplicationTaskParam<Definition>;
    loadingEntitiesTaskParam: LoadingEntitiesTaskParam & GenerericTaskParam & ApplicationTaskParam<Definition>;
    preparingEachEntityTaskParam: any;
    preparingEachEntityFieldTaskParam: any;
    preparingEachEntityRelationshipTaskParam: any;
    postPreparingEachEntityTaskGroup: any;
  };

type PreparingEachEntityFieldTaskParam<Definition extends GeneratorDefinition = GeneratorDefinition> = EachEntityTaskParam<Definition> & {
  field: Field;
  fieldName: string;
};
type PreparingEachEntityFieldTaskGroup<ThisType, Definition extends GeneratorDefinition = GeneratorDefinition> = GenericTaskGroup<
  ThisType,
  PreparingEachEntityFieldTaskParam<Definition>
>;

type PreparingEachEntityRelationshipTaskParam<Definition extends GeneratorDefinition = GeneratorDefinition> =
  EachEntityTaskParam<Definition> & {
    relationship: Relationship;
    relationshipName: string;
  };
type PreparingEachEntityRelationshipTaskGroup<ThisType, Definition extends GeneratorDefinition = GeneratorDefinition> = GenericTaskGroup<
  ThisType,
  PreparingEachEntityRelationshipTaskParam<Definition>
>;

type EntitiesTaskParam<Definition extends GeneratorDefinition = GeneratorDefinition> = ApplicationTaskParam<Definition>;

type EntitiesTaskGroup<ThisType, Definition extends GeneratorDefinition = GeneratorDefinition> = GenericTaskGroup<
  ThisType,
  EntitiesTaskParam<Definition>
>;
