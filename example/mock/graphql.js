import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql, GraphQLScalarType, Kind } from 'graphql';
import Mock from 'mockjs';

const { Random } = Mock;

const typeDefs = `
  enum DATASTATE {
    NEW
    DELETE
    UPDATE
    NONE
  }
  enum SORTVALUE {
    ASC
    DESC
  }
  input Pagination{
    currentPage: Int
    pageSize: Int
  }
  input SortItem{
    field: String
    value: SORTVALUE
  }
  type WorkorderList {
    list: [Workorder]
    count: Int
  }
  type Workorder {
    id: ID
    woNum: String
    desc: String
    assocEQ(pagination:Pagination, where:String, sorter: [SortItem]): EquipmentList
    assocEQSelect(pagination:Pagination, where:String, sorter: [SortItem]): EquipmentList
  }
  type EquipmentList {
    list: [Equipment]
    count: Int
  }
  type Equipment {
    id: ID
    eqNum: String
    desc: String
    status: Int
  }
  type Query {
    workorder_find(app:String!, pagination:Pagination, where:String, sorter: [SortItem]) : WorkorderList
    workorder_findOne(app:String!, id:ID!) : Workorder
    equipment_find(app:String!, pagination:Pagination, where:String, sorter: [SortItem]) : EquipmentList
    equipment_findOne(app:String!, id:ID!) : Equipment
  }
`;

const typeResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const min = 100;
const max = 9999;

const mocks = {
  ID: () => Random.guid(),
  Int: () => Random.natural(min, max),
  Float: () => Random.float(min, max),
  String: () => Random.ctitle(10, 5),
  Date: () => Random.date(),
  Boolean: () => Random.natural(0, 1),
  Pagination: () => ({
    currentPage: 1,
    pageSize: 10,
  }),
  Query: () => ({
    workorder_find: () => ({
      list: () => new MockList(10, () => ({
        woNum: () => 'WO' + Random.natural(100, 999),
        assoc_eq: () => new MockList(10)
      })),
      count: () => 100,
    }),
    equipment_find: () => ({
      list: () => new MockList(10, () => ({
        eqNum: () => 'EQ' + Random.natural(100, 999),
        status: ()=> Random.natural(0, 1)
      })),
      count: () => 100,
    }),
  }),
};

const schema = makeExecutableSchema({
  typeDefs,
  typeResolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });

function graphqlQuery(req, res) {
  const { query, variables } = req.body;
  graphql(schema, query, null, null, variables).then(result => {
    return res.json(result);
  });
}

const proxy = {
  'POST /api/graphql': graphqlQuery,
};

export default proxy;
